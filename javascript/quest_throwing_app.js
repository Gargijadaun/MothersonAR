
import * as THREE from 'three';
import { XRButton } from 'xrbutton';
import { XRControllerModelFactory } from 'XRControllerModelFactory';
import { XRHandModelFactory } from 'XRHandModelFactory';

let container;
let camera, scene, renderer;
let hand1, hand2;
let controller1, controller2;
let controllerGrip1, controllerGrip2;

let hand1_timeout_open = false
let hand2_timeout_open = false
let p_1i = new THREE.Vector3()
let p_2i = new THREE.Vector3()
let v_1i = new THREE.Vector3()
let v_2i = new THREE.Vector3()
let p_1f = new THREE.Vector3()
let p_2f = new THREE.Vector3()


let clock = new THREE.Clock()

init();
animate();

// calculate trajectory 
let gravity_value = 9.8
let trajectory_count = 50
let dratio = 0.02
function calc_trajectory(v_i, p_i){
    console.log(v_i)
    console.log(p_i)
    let positions = []
    for(let dt=0; dt<trajectory_count; dt++){
        positions.push(
            new THREE.Vector3(
                p_i.x + v_i.x*dratio*dt,
                p_i.y + v_i.y*dratio*dt - 9.8/2*(dratio*dt)**2,
                p_i.z + v_i.z*dratio*dt
            )
        )
    }
    
    return positions
}

function draw_lines(lines_pos){
    const geometry = new THREE.BufferGeometry();
	const material = new THREE.LineBasicMaterial( { 
        color: 0x33ccff,
        linewidth: 3
    } );
	const positions = [];
	const colors = [];
	for ( let i = 0; i < trajectory_count; i ++ ) {
		// positions
        let pos = lines_pos[i]
		positions.push( pos.x, pos.y, pos.z );
	}
	geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
	geometry.computeBoundingSphere();
	let line = new THREE.Line( geometry, material );
	scene.add( line );
    setTimeout(()=>{
        scene.remove(line)
        geometry.dipose()
        material.dispose()
    },15000)
}

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x444444 );

    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 10 );
    camera.position.set( 0, 1.6, 3 );

    scene.add( new THREE.HemisphereLight( 0xbcbcbc, 0xa5a5a5, 3 ) );

    const light = new THREE.DirectionalLight( 0xffffff, 3 );
    light.position.set( 0, 6, 0 );
    light.castShadow = true;
    light.shadow.camera.top = 2;
    light.shadow.camera.bottom = - 2;
    light.shadow.camera.right = 2;
    light.shadow.camera.left = - 2;
    light.shadow.mapSize.set( 4096, 4096 );
    scene.add( light );

    //

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.xr.enabled = true;

    container.appendChild( renderer.domElement );

    const sessionInit = {
        requiredFeatures: [ 'hand-tracking'],
        optionalFeatures: [ 'depth-sensing']
    };

    document.body.appendChild( XRButton.createButton( renderer, sessionInit ) );

    // controllers

    controller1 = renderer.xr.getController( 0 );
    scene.add( controller1 );

    controller2 = renderer.xr.getController( 1 );
    scene.add( controller2 );

    const controllerModelFactory = new XRControllerModelFactory();
    const handModelFactory = new XRHandModelFactory();

    // Hand 1
    controllerGrip1 = renderer.xr.getControllerGrip( 0 );
    controllerGrip1.add( controllerModelFactory.createControllerModel( controllerGrip1 ) );
    scene.add( controllerGrip1 );

    hand1 = renderer.xr.getHand( 0 );
    hand1.add( handModelFactory.createHandModel( hand1 ) );

    scene.add( hand1 );

    // Hand 2
    controllerGrip2 = renderer.xr.getControllerGrip( 1 );
    controllerGrip2.add( controllerModelFactory.createControllerModel( controllerGrip2 ) );
    scene.add( controllerGrip2 );

    hand2 = renderer.xr.getHand( 1 );
    hand2.add( handModelFactory.createHandModel( hand2 ) );
    scene.add( hand2 );

    window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
//

function calc_vel(p_i, p_f, dt){
    return p_i.clone().sub(p_f).divideScalar(dt)
}

function hand_cm(hand){
    return (hand.children[15].position.clone().add(hand.children[5].position).divideScalar(2.0)).add(hand.position)
    //.add(hand.children[5].position).divideScalar(2.0)
}


function hand_is_open(hand){
    // condition for openness. two fingers are far apart.
    return hand.children[15].position.clone().sub(hand.children[5].position).length()>0.09
}
function animate() {
    renderer.setAnimationLoop( render );
    
}

function render() {
    let dt = clock.getDelta()
    // timeout
    try{
        p_1i = hand_cm(hand1)
        if(hand_is_open(hand1) && !hand1_timeout_open){
            console.log('thrown 1')
            hand1_timeout_open = true
            setTimeout(()=>{
                hand1_timeout_open = false
            }, 5000)

            v_1i = calc_vel(p_1i, p_1f, dt)
            let traj1 = calc_trajectory(v_1i, p_1i)
            console.log(traj1)
            draw_lines(traj1)
        }
    }catch(e){
        console.log(e.stack)
        // likely hand1 is unavailable
    }
    try{
        p_2i = hand_cm(hand2)
        if(hand_is_open(hand2) && !hand2_timeout_open){
            console.log('thrown 2')
            hand2_timeout_open = true
            setTimeout(()=>{
                hand2_timeout_open = false
            }, 5000)
            
            v_2i = calc_vel(p_2i, p_2f, dt)
            let traj2 = calc_trajectory(v_2i, p_2i)
            draw_lines(traj2)
        }
    }catch(e){
        console.log(e.stack)
        // likely hand2 is unavailable
    }
    renderer.render( scene, camera );
    p_1f = p_1i
    p_2f = p_2i
}
