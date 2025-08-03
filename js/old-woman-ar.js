let sceneEl = null,
    targetImage = null,
    arSystem = null;

const ANIMATION_DELAY_CONSTANT = 1000
const TIMELINE_DETAILS = {
    currentAnimationSeq: 1,
    isAnimationPlaying: false,
    isStopAnimation: false
}

const TIMEOUTS = []
let AR_READY = false

// AR Elements
const baseBlurLayer = document.querySelector('#baseBlurLayer');
const baseFaceWithFiller = document.querySelector('#baseFaceWithFiller');
const baseFaceWithBotox = document.querySelector('#baseFaceWithBotox');
const baseFace = document.querySelector('#baseFace');
const faceLine = document.querySelector('#faceLine');
const chin = document.querySelector('#chin');
const forehead = document.querySelector('#forehead');
const lips = document.querySelector('#lips');
const leftCheek = document.querySelector('#leftCheek');
const rightCheek = document.querySelector('#rightCheek');
const leftCheekBotox = document.querySelector('#leftCheekBotox');
const rightCheekBotox = document.querySelector('#rightCheekBotox');
const syringeSpritesheet = document.querySelector('#syringeSpritesheet');
const syringeSpritesheet01 = document.querySelector('#syringeSpritesheet01');
const syringeSpritesheet02 = document.querySelector('#syringeSpritesheet02');
const syringeSpritesheet03 = document.querySelector('#syringeSpritesheet03');
const methodsSpritesheet = document.querySelector('#methodsSpritesheet');
const fillerMethodsSpritesheet = document.querySelector('#fillerMethodsSpritesheet');
const botoxMethodsSpritesheet = document.querySelector('#botoxMethodsSpritesheet');
const threadMethodsSpritesheet = document.querySelector('#threadMethodsSpritesheet');
const botoxLineMethodsSpritesheet = document.querySelector('#botoxLineMethodsSpritesheet');
// const fillerLineMethodsSpritesheet = document.querySelector('#fillerLineMethodsSpritesheet');
// const threadLineMethodsSpritesheet = document.querySelector('#threadLineMethodsSpritesheet');
const purpleMask = document.querySelector('#purpleMask');
const maskLineSprite = document.querySelector('#maskLineSprite');
const threadLineSprite = document.querySelector('#threadLineSprite');
const whiteCircle = document.querySelector('#whiteCircle');
const whiteCircleRight1 = document.querySelector('#whiteCircleRight1');
const whiteCircleRight2 = document.querySelector('#whiteCircleRight2');
const needle = document.querySelector('#needle');

// Audio Elements
const audioElement = document.querySelector('#audioElement');
const audioSource = document.querySelector('#audioSource');

// DOM Elements
const mainScreen = document.querySelector('#mainScreen');
const backBtn = document.querySelector('#backBtn');
const reloadButton = document.querySelector('#reloadButton');

// const testimonialContainer = document.querySelector('#testimonial-container');
const treatmentsBtn = document.querySelector('#treatmentsBtn');
const testimonialsBtn = document.querySelector('#testimonialsBtn');
const infoTextBottom = document.querySelector('#infoText');
const infoTextParaBottom = document.querySelector('#infoText p');

const ALL_ELEMENTS = [
    baseBlurLayer,
    baseFaceWithFiller,
    baseFaceWithBotox,
    baseFace,
    faceLine,
    chin,
    forehead,
    lips,
    leftCheek,
    rightCheek,
    leftCheekBotox,
    rightCheekBotox,
    syringeSpritesheet,
    syringeSpritesheet01,
    syringeSpritesheet02,
    syringeSpritesheet03,
    methodsSpritesheet,
    fillerMethodsSpritesheet,
    botoxMethodsSpritesheet,
    threadMethodsSpritesheet,
    botoxLineMethodsSpritesheet,
    purpleMask,
    maskLineSprite,
    threadLineSprite,
    whiteCircle,
    whiteCircleRight1,
    whiteCircleRight2,
    needle,
    treatmentsBtn,
    testimonialsBtn,
    infoTextBottom
]

function startAnimationCommonCauses() {

    if (TIMELINE_DETAILS.isAnimationPlaying)
        return

    if (TIMELINE_DETAILS.isStopAnimation)
        return
    mainScreen.classList.add('hide')
    backBtn.classList.add('show')
   // reloadButton.classList.add("show");
    TIMELINE_DETAILS.isAnimationPlaying = true
    TIMELINE_DETAILS.currentAnimationSeq = 1
    audioSource.setAttribute('src', './assets/audio/old-lady/botox/femaleVO_OldLady_Botox_Filler_Overview_v1.mp3')
    infoTextParaBottom.innerHTML = 'Many people turn to Botox and Fillers treatments to maintain a youthful appearance, enhancing their confidence and rejuvenating their look.'
    infoTextBottom.classList.add('show')
    baseBlurLayer.setAttribute('animation', 'property: material.opacity; to: .85; dur: 600')
    baseFaceWithFiller.setAttribute('animation', 'property: material.opacity; to: 1; dur: 500')
    baseFaceWithFiller.setAttribute('animation__1', 'property: scale; to: 1 1 1; dur: 500')
    baseFace.setAttribute('animation', 'property: material.opacity; to: 1; dur: 500')
    baseFace.setAttribute('animation__1', 'property: scale; to: 1 1 1; dur: 500')
    audioElement.load()
    audioElement.play()

    // Animating Facelines
    TIMEOUTS.push(setTimeout(() => {
        if (TIMELINE_DETAILS.isStopAnimation)
            return
        faceLine.setAttribute('animation', 'property: material.opacity; to: .75; dur: 500')
       

        let animation = { progress: 0 };

        const tween = gsap.timeline(
            {
                repeat: 3,
                onUpdate: function () {
                    faceLine.setAttribute('sprite-sheet', 'progress', animation.progress);
                },
            }
        );
        tween
            .to(animation,
                {
                    progress: 1,
                    duration: (1.25 * ANIMATION_DELAY_CONSTANT) / 1000,
                    ease: 'none'
                }
            )
        baseFace.setAttribute('animation', 'property: material.opacity; to: 0; dur: 2500')
      
        // tween.start();

    }, 1.5 * ANIMATION_DELAY_CONSTANT))

    // Animate syringe and botox items
    TIMEOUTS.push(setTimeout(() => {
        if (TIMELINE_DETAILS.isStopAnimation)
            return
        audioSource.setAttribute('src', './assets/audio/old-lady/botox/femaleVO_OldLady_Botox_v1.mp3')
          infoTextParaBottom.innerHTML = 'Botox relaxes facial muscles to smooth wrinkles and fine lines, giving you a youthful refreshed look. Safe, quick and effective for timeless beauty.'
        audioElement.load()
        audioElement.play()

        faceLine.setAttribute('animation', 'property: material.opacity; to: 0; dur: 250')
        baseFaceWithFiller.setAttribute('animation', 'property: material.opacity; to: 1; dur: 250')
        baseFaceWithBotox.setAttribute('animation', 'property: material.opacity; to: 1; dur: 250')
        baseFace.setAttribute('animation', 'property: material.opacity; to: 1; dur: 250')

            // Show first spritesheet
syringeSpritesheet01.setAttribute('animation', 'property: material.opacity; to: 1; dur: 250');
syringeSpritesheet01.setAttribute('animation__1', 'property: scale; to: 1 1 1; dur: 1000; easing: easeInOutElastic;');

// Show first spritesheet
syringeSpritesheet01.setAttribute('animation', 'property: material.opacity; to: 1; dur: 250');
syringeSpritesheet01.setAttribute('animation__1', 'property: scale; to: 1 1 1; dur: 1000; easing: easeInOutElastic;');

// After 6 seconds, first one disappears
// setTimeout(() => {
   
// }, 6000);

// At 7 seconds, third sheet appears
setTimeout(() => {
    syringeSpritesheet03.setAttribute('animation', 'property: material.opacity; to: 1; dur: 250');
    syringeSpritesheet03.setAttribute('animation__1', 'property: scale; to: 1 1 1; dur: 1000; easing: easeInOutElastic;');
}, 6000);

// At 10 seconds, second sheet appears (AFTER the third)
setTimeout(() => {
    syringeSpritesheet02.setAttribute('animation', 'property: material.opacity; to: 1; dur: 250');
    syringeSpritesheet02.setAttribute('animation__1', 'property: scale; to: 1 1 1; dur: 1000; easing: easeInOutElastic;');
}, 10000);

// At 13 seconds, both second and third disappear
setTimeout(() => {
    syringeSpritesheet01.setAttribute('animation', 'property: material.opacity; to: 0; dur: 150');
    syringeSpritesheet03.setAttribute('animation', 'property: material.opacity; to: 0; dur: 150');
    syringeSpritesheet02.setAttribute('animation', 'property: material.opacity; to: 0; dur: 150');
}, 13000);


        
       // 2-second delay
        
        // 4-second delay (another 2 seconds after syringeSpritesheet02)
        
        TIMEOUTS.push(setTimeout(() => {
            if (TIMELINE_DETAILS.isStopAnimation)
                return
          
            // Start Animating Stress
            syringeSpritesheet.setAttribute('rotation', '0 0 90')

            let animation = { progress: 0 };

            const tween = gsap.timeline(
                {
                    onUpdate: function () {
                        syringeSpritesheet.setAttribute('sprite-sheet', 'progress', animation.progress);
                    },
                }
            );
            tween
                .to(animation,
                    {
                        progress: 1,
                        duration: (1.5 * ANIMATION_DELAY_CONSTANT) / 1000
                    },
                    "<"
                ).pause()

            // Start Animating Notepad & Medicine strip
           
            syringeSpritesheet.setAttribute('animation', 'property: material.opacity; to: 1; dur: 500;')
            syringeSpritesheet.setAttribute('animation__1', `property: position; to: 0.375 -0.09 .15; dur: ${1.5 * ANIMATION_DELAY_CONSTANT}`)
            TIMEOUTS.push(setTimeout(() => {
                if (TIMELINE_DETAILS.isStopAnimation)
                    return
                tween.play();
            }, 1.5 * ANIMATION_DELAY_CONSTANT))

            chin.setAttribute('animation', `property: material.opacity; to: 1;delay:2000; dur: ${.75 * ANIMATION_DELAY_CONSTANT}`)

            syringeSpritesheet.setAttribute('animation__2', `property: rotation; to: 0 0 210; delay:3500; dur: ${1.5 * ANIMATION_DELAY_CONSTANT}`)
            syringeSpritesheet.setAttribute('animation__3', `property: position; from:0.375 -0.09 .15; to: -0.2 0.625 .15;delay:3500; dur: ${1.5 * ANIMATION_DELAY_CONSTANT}`)
            syringeSpritesheet.setAttribute('sprite-sheet', 'progress', 0);
            TIMEOUTS.push(setTimeout(() => {
                if (TIMELINE_DETAILS.isStopAnimation)
                    return
                tween.restart(true, false);
            }, 5.25 * ANIMATION_DELAY_CONSTANT))

            forehead.setAttribute('animation', `property: material.opacity; to: 1; delay:6000; dur: ${1 * ANIMATION_DELAY_CONSTANT}`)
          


            // syringeSpritesheet01.setAttribute('animation', 'property: material.opacity; to: 0; dur: 150;delay:0')
            // syringeSpritesheet02.setAttribute('animation', 'property: material.opacity; to: 0; dur: 150;delay:0')
            // syringeSpritesheet03.setAttribute('animation', 'property: material.opacity; to: 0; dur: 150;delay:0')
            syringeSpritesheet.setAttribute('animation__4', `property: position;from:-0.2 0.625 .15; to: -0.515 0.135 .15;delay:7500; dur: ${1.5 * ANIMATION_DELAY_CONSTANT}`)
            syringeSpritesheet.setAttribute('animation__5', `property: rotation;from:0 0 210; to: 0 0 270;delay:7500; dur: ${1.5 * ANIMATION_DELAY_CONSTANT}`)
            syringeSpritesheet.setAttribute('sprite-sheet', 'progress', 0);
            TIMEOUTS.push(setTimeout(() => {
                if (TIMELINE_DETAILS.isStopAnimation)
                    return
                tween.restart(true, false);
            }, 9 * ANIMATION_DELAY_CONSTANT))
          
          
            leftCheek.setAttribute('animation', `property: material.opacity; to: 1; delay:9000; dur: ${.75 * ANIMATION_DELAY_CONSTANT}`)
            rightCheek.setAttribute('animation', `property: material.opacity; to: 1; delay:9000; dur: ${.75 * ANIMATION_DELAY_CONSTANT}`)

        }, 1000))


    }, 11.5 * ANIMATION_DELAY_CONSTANT))

    // Removing Notepad & Medicine strip, Start Animating stress
    TIMEOUTS.push(setTimeout(() => {
        if (TIMELINE_DETAILS.isStopAnimation)
            return
        audioSource.setAttribute('src', './assets/audio/old-lady/botox/femaleVO_OldLady_Filler_v1.mp3')
        audioElement.load()
        audioElement.play()
      
     
       
        syringeSpritesheet.setAttribute('animation', 'property: material.opacity; to: 0; dur: 250;')
        syringeSpritesheet.removeAttribute('animation__1')
        syringeSpritesheet.removeAttribute('animation__2')
        syringeSpritesheet.removeAttribute('animation__3')
        syringeSpritesheet.removeAttribute('animation__4')
        syringeSpritesheet.removeAttribute('animation__5')


        TIMEOUTS.push(setTimeout(() => {
            if (TIMELINE_DETAILS.isStopAnimation)
                return
            infoTextParaBottom.innerHTML = 'Fillers restore volume, enhance contours and smooth wrinkles, giving you a natural, youthful appearance instantly'
            // Start Animating Stress

            let animation = { progress: 0 };

            const tween = gsap.timeline(
                {
                    onUpdate: function () {
                        syringeSpritesheet.setAttribute('sprite-sheet', 'progress', animation.progress);
                    },
                }
            );
            tween
                .to(animation,
                    {
                        progress: 1,
                        duration: (2 * ANIMATION_DELAY_CONSTANT) / 1000
                    },
                    "<"
                ).pause()


            // Animate lips & cheeks
            syringeSpritesheet.setAttribute('position', '0.5 0 0.15')
            syringeSpritesheet.setAttribute('rotation', '0 0 90')
         
            syringeSpritesheet.setAttribute('animation', 'property: material.opacity; to: 1; dur: 500;')
            syringeSpritesheet.setAttribute('animation__1', `property: position; to: 0.375 -0.09 .15; dur: ${1.5 * ANIMATION_DELAY_CONSTANT}`)
            // syringeSpritesheet.setAttribute('animation__2', `property: rotation; to: 0 0 90; delay:3500; dur: ${1.5 * ANIMATION_DELAY_CONSTANT}`)
            TIMEOUTS.push(setTimeout(() => {
                if (TIMELINE_DETAILS.isStopAnimation)
                    return
                tween.play();
            }, 1.25 * ANIMATION_DELAY_CONSTANT))
            lips.setAttribute('animation', 'property: material.opacity; to: 1; dur: 1500;delay:1250;')

            
            syringeSpritesheet.setAttribute('animation__3', `property: rotation; to: 0 0 270; delay:3500; dur: ${1.5 * ANIMATION_DELAY_CONSTANT}`)
            syringeSpritesheet.setAttribute('animation__4', `property: position; from: 0.375 -0.09 .1; to: -0.45 0.115 .15;delay:3400; dur: ${1.5 * ANIMATION_DELAY_CONSTANT}`)
            syringeSpritesheet.setAttribute('sprite-sheet', 'progress', 0);
            TIMEOUTS.push(setTimeout(() => {
                if (TIMELINE_DETAILS.isStopAnimation)
                    return
                tween.restart(true, false);
            }, 5 * ANIMATION_DELAY_CONSTANT))
            leftCheekBotox.setAttribute('animation', 'property: material.opacity; to: 1; dur: 1000; delay: 5500;')
            rightCheekBotox.setAttribute('animation', 'property: material.opacity; to: 1; dur: 1000; delay: 5500;')


            TIMEOUTS.push(setTimeout(() => {
                if (TIMELINE_DETAILS.isStopAnimation)
                    return
                syringeSpritesheet.setAttribute('animation', 'property: material.opacity; to: 0; dur: 500;')
               
                infoTextParaBottom.innerHTML = ''
                // capsuleGroup.object3D.visible = false;
                // fastFood.object3D.visible = false;
                treatmentsBtn.classList.add('show-single')
                showReplayButton();
                replayButton.classList.add("show");
                TIMELINE_DETAILS.isAnimationPlaying = false
                TIMELINE_DETAILS.currentAnimationSeq = 1
            }, 7500))
        }, 1000))

    }, 25 * ANIMATION_DELAY_CONSTANT))

}

function startAnimationTreatments() {

    if (TIMELINE_DETAILS.isAnimationPlaying)
        return

    mainScreen.classList.add('hide')
    backBtn.classList.add('show')
   // reloadButton.classList.add("show");
    TIMELINE_DETAILS.isAnimationPlaying = true
    TIMELINE_DETAILS.currentAnimationSeq = 2
    audioSource.setAttribute('src', './assets/audio/old-lady/facelift/femaleVO_OldLady_FaceLift_Overview_v1.mp3')
     infoTextParaBottom.innerHTML = 'Many people turn to facelift treatment to maintain a youthful appearance, enhancing their confidence and rejuvenating their look.'
    audioElement.load()
    audioElement.play()

    treatmentsBtn.classList.remove('show-single')
    replayButton.classList.add("hide");
    baseBlurLayer.setAttribute('animation', 'property: material.opacity; to: .85; dur: 600')
    baseFaceWithFiller.setAttribute('animation', 'property: material.opacity; to: 1; dur: 500')
    baseFaceWithFiller.setAttribute('animation__1', 'property: scale; to: 1 1 1; dur: 500')
    baseFace.setAttribute('animation', 'property: material.opacity; to: 1; dur: 500')
    baseFace.setAttribute('animation__1', 'property: scale; to: 1 1 1; dur: 500')
    // Start Animating Capsule & Lotion
    TIMEOUTS.push(setTimeout(() => {
        if (TIMELINE_DETAILS.isStopAnimation)
            return
        faceLine.setAttribute('animation', 'property: material.opacity; to: .75; dur: 500')
       
        infoTextBottom.classList.add('show')

        let animation = { progress: 0 };

        const tween = gsap.timeline(
            {
                repeat: -1,
                onUpdate: function () {
                    faceLine.setAttribute('sprite-sheet', 'progress', animation.progress);
                },
            }
        );
        tween
            .to(animation,
                {
                    progress: 1,
                    duration: (1.5 * ANIMATION_DELAY_CONSTANT) / 1000,
                    ease: 'none'
                }
            )
        baseFace.setAttribute('animation', 'property: material.opacity; to: 0; dur: 2500')

        // tween.start();

    }, 1.5 * ANIMATION_DELAY_CONSTANT))

    // Animate methods
    TIMEOUTS.push(setTimeout(() => {
        if (TIMELINE_DETAILS.isStopAnimation)
            return
        audioSource.setAttribute('src', './assets/audio/old-lady/facelift/femaleVO_OldLady_Facelift_Methods_v1.mp3')
        audioElement.load()
        audioElement.play()

        infoTextParaBottom.innerHTML = 'Facelift can be done through Botox, needleless treatment or dermal fillers.'
        setTimeout(() => {
            infoTextParaBottom.innerHTML = 'Our clinic offers non-invasive treatments to treat fine lines, deep creases, slack skin, thinning lips, sunken cheeks, big pores, acne scarring and loss of face volume.'; // Clears the text
        }, 6000);
        setTimeout(() => {
            infoTextParaBottom.innerHTML = ''; // Clears the text
        }, 19000);

        methodsSpritesheet.setAttribute('animation', 'property: material.opacity; to: 1; dur: 300;')

        let animation = { progress: 0 };

        const tween = gsap.timeline(
            {
                onUpdate: function () {
                    methodsSpritesheet.setAttribute('sprite-sheet', 'progress', animation.progress);
                },
            }
        );
        tween
            .to(animation,
                {
                    delay: 0.5,
                    progress: 1,
                    duration: (1.5 * ANIMATION_DELAY_CONSTANT) / 1000,
                    ease: 'none'
                }
            )

        botoxLineMethodsSpritesheet.setAttribute('animation', 'property: material.opacity; to: 1; dur: 300; delay: 1500;')

        let animationMethodsLine = { progress: 0 };

        const tweenAnimLine = gsap.timeline(
            {
                onUpdate: function () {
                    botoxLineMethodsSpritesheet.setAttribute('sprite-sheet', 'progress', animationMethodsLine.progress);
                },
            }
        );
        tweenAnimLine
            .to(animationMethodsLine,
                {
                    delay: 1.5,
                    progress: 1,
                    duration: (2.75 * ANIMATION_DELAY_CONSTANT) / 1000,
                    ease: 'none'
                }
            )
        botoxMethodsSpritesheet.setAttribute('animation', 'property: material.opacity; to: 1; dur: 300; delay: 1500;')

        let animationBotox = { progress: 0 };

        const tweenBotox = gsap.timeline(
            {
                onUpdate: function () {
                    botoxMethodsSpritesheet.setAttribute('sprite-sheet', 'progress', animationBotox.progress);
                },
            }
        );
        tweenBotox
            .to(animationBotox,
                {
                    delay: 1.5,
                    progress: 1,
                    duration: (1.5 * ANIMATION_DELAY_CONSTANT) / 1000,
                    ease: 'none'
                }
            )

        fillerMethodsSpritesheet.setAttribute('animation', 'property: material.opacity; to: 1; dur: 300; delay: 2500;')

        let animationFiller = { progress: 0 };

        const tweenFiller = gsap.timeline(
            {
                onUpdate: function () {
                    fillerMethodsSpritesheet.setAttribute('sprite-sheet', 'progress', animationFiller.progress);
                },
            }
        );
        tweenFiller
            .to(animationFiller,
                {
                    delay: 2.5,
                    progress: 1,
                    duration: (1.5 * ANIMATION_DELAY_CONSTANT) / 1000,
                    ease: 'none'
                }
            )

        threadMethodsSpritesheet.setAttribute('animation', 'property: material.opacity; to: 1; dur: 300; delay: 3500;')

        let animationThreadMethods = { progress: 0 };

        const tweenThreadMethods = gsap.timeline(
            {
                onUpdate: function () {
                    threadMethodsSpritesheet.setAttribute('sprite-sheet', 'progress', animationThreadMethods.progress);
                },
            }
        );
        tweenThreadMethods
            .to(animationThreadMethods,
                {
                    delay: 3.5,
                    progress: 1,
                    duration: (1.5 * ANIMATION_DELAY_CONSTANT) / 1000,
                    ease: 'none'
                }
            )

    }, 9.5 * ANIMATION_DELAY_CONSTANT))

    // Remove Laser & Add Next Button
    TIMEOUTS.push(setTimeout(() => {
        if (TIMELINE_DETAILS.isStopAnimation)
            return
        audioSource.setAttribute('src', './assets/audio/old-lady/facelift/femaleVO_OldLady_FaceLift_End_v1.mp3')
        audioElement.load()
        audioElement.play()

        methodsSpritesheet.setAttribute('animation', 'property: material.opacity; to: 0; dur: 2000; delay:0;')
        botoxMethodsSpritesheet.setAttribute('animation', 'property: material.opacity; to: 0; dur: 2000; delay:0;')
        botoxLineMethodsSpritesheet.setAttribute('animation', 'property: material.opacity; to: 0; dur: 2000; delay:0;')
        fillerMethodsSpritesheet.setAttribute('animation', 'property: material.opacity; to: 0; dur: 2000; delay:0;')
        threadMethodsSpritesheet.setAttribute('animation', 'property: material.opacity; to: 0; dur: 2000; delay:0;')

        lips.setAttribute('animation', 'property: material.opacity; to: 0; dur: 300;')
        leftCheek.setAttribute('animation', 'property: material.opacity; to: 0; dur: 300;')
        leftCheekBotox.setAttribute('animation', 'property: material.opacity; to: 0; dur: 300;')
        rightCheek.setAttribute('animation', 'property: material.opacity; to: 0; dur: 300;')
        rightCheekBotox.setAttribute('animation', 'property: material.opacity; to: 0; dur: 300;')
        forehead.setAttribute('animation', 'property: material.opacity; to: 0; dur: 300;')
        chin.setAttribute('animation', 'property: material.opacity; to: 0; dur: 300;')

        TIMEOUTS.push(setTimeout(() => {
            if (TIMELINE_DETAILS.isStopAnimation)
                return
            faceLine.setAttribute('animation', 'property: material.opacity; to: 0; dur: 1000')
            baseFace.setAttribute('animation', 'property: material.opacity; to: 0; dur: 2500')
            testimonialsBtn.classList.add('show-single')
            showReplayButton();
            replayButton.classList.add('show');
            TIMELINE_DETAILS.isAnimationPlaying = false

        }, 1000))

    }, 16 * ANIMATION_DELAY_CONSTANT))

}

function showTestimonials() {

    if (TIMELINE_DETAILS.isAnimationPlaying)
        return

    testimonialsBtn.classList.remove('show-single')
    replayButton.classList.add("hide");
    audioSource.setAttribute('src', './assets/audio/old-lady/thread/femaleVO_OldLady_ThreadLift_Overview_v1.mp3')
    infoTextParaBottom.innerHTML = 'Many people turn to thread lift treatment to maintain a youthful appearance, enhancing their confidence and rejuvenating their look.'
    audioElement.load()
    audioElement.play()
    mainScreen.classList.add('hide')
    backBtn.classList.add('show')
   // reloadButton.classList.add("show");
    TIMELINE_DETAILS.isAnimationPlaying = true
    TIMELINE_DETAILS.currentAnimationSeq = 3

    treatmentsBtn.classList.remove('show-single')
    replayButton.classList.add("hide");
    baseBlurLayer.setAttribute('animation', 'property: material.opacity; to: .85; dur: 600')
    baseFaceWithFiller.setAttribute('animation', 'property: material.opacity; to: 1; dur: 500')
    baseFaceWithFiller.setAttribute('animation__1', 'property: scale; to: 1 1 1; dur: 500')
    baseFace.setAttribute('animation', 'property: material.opacity; to: 1; dur: 500')
    baseFace.setAttribute('animation__1', 'property: scale; to: 1 1 1; dur: 500')
    audioElement.play()
    // Start Animating Capsule & Lotion
    TIMEOUTS.push(setTimeout(() => {
        if (TIMELINE_DETAILS.isStopAnimation)
            return
        faceLine.setAttribute('animation', 'property: material.opacity; to: .75; dur: 500')
        
        infoTextBottom.classList.add('show')

        let animation = { progress: 0 };

        const tween = gsap.timeline(
            {
                repeat: -1,
                onUpdate: function () {
                    faceLine.setAttribute('sprite-sheet', 'progress', animation.progress);
                },
            }
        );
        tween
            .to(animation,
                {
                    progress: 1,
                    duration: (1.5 * ANIMATION_DELAY_CONSTANT) / 1000,
                    ease: 'none'
                }
            )
        baseFace.setAttribute('animation', 'property: material.opacity; to: 0; dur: 2500')

        // tween.start();

    }, 1.5 * ANIMATION_DELAY_CONSTANT))

    // Animate methods
    TIMEOUTS.push(setTimeout(() => {
      
        if (TIMELINE_DETAILS.isStopAnimation)
            return
         
        baseFaceWithFiller.setAttribute('animation', 'property: material.opacity; to: 0; dur: 100')
        faceLine.setAttribute('animation', 'property: material.opacity; to: 0; dur: 100')
        baseFace.setAttribute('animation', 'property: material.opacity; to: 1; dur: 500')
        infoTextParaBottom.innerHTML = 'ThreadLift is a non-invasive outpatient surgery that is marketed over the world as a lunchtime facelift or a weekend facelift.'
         
        audioSource.setAttribute('src', './assets/audio/old-lady/thread/femaleVO_OldLady_ThreadLift_Scene1_Part1_v1.mp3')
        audioElement.load()

        let animationMaskLine = { progress: 0 },
            animationThreadLine = { progress: 0 },
            animationWhiteCircleL = { progress: 0 },
            animationWhiteCircleR1 = { progress: 0 };

        const tweenCircleL = gsap.timeline(
            {
                onUpdate: function () {
                    whiteCircle.setAttribute('sprite-sheet', 'progress', animationWhiteCircleL.progress);
                },
            }
        );
        tweenCircleL
            .to(animationWhiteCircleL,
                {
                    progress: 1,
                    duration: (2 * ANIMATION_DELAY_CONSTANT) / 1000,
                    ease: 'none'
                }
            ).pause()

        const tweenMaskLine = gsap.timeline(
            {
                onComplete: function () {
                    maskLineSprite.setAttribute('sprite-sheet', 'progress', 1);
                },
                onUpdate: function () {
                    maskLineSprite.setAttribute('sprite-sheet', 'progress', animationMaskLine.progress);
                },
            }
        );
        tweenMaskLine
            .to(animationMaskLine,
                {
                    progress: 1,
                    duration: (4 * ANIMATION_DELAY_CONSTANT) / 1000,
                    delay: 3,
                    ease: 'none'
                }
            ).pause()

        const tweenThreadLine = gsap.timeline(
            {
                onStart: function () {
                },
                onUpdate: function () {
                    threadLineSprite.setAttribute('sprite-sheet', 'progress', animationThreadLine.progress);
                },
            }
        );
        tweenThreadLine
            .to(animationThreadLine,
                {
                    progress: 1,
                    duration: (1.5 * ANIMATION_DELAY_CONSTANT) / 1000,
                    delay: 9.5,
                    ease: 'none'
                }
            ).pause()

        const tweenCircleR1 = gsap.timeline(
            {
                onUpdate: function () {
                    whiteCircleRight1.setAttribute('sprite-sheet', 'progress', animationWhiteCircleR1.progress);
                },
            }
        );
        tweenCircleR1
            .to(animationWhiteCircleR1,
                {
                    progress: 1,
                    duration: (2.5 * ANIMATION_DELAY_CONSTANT) / 1000,
                    delay: 9,
                    ease: 'none'
                }
            ).pause()


        audioElement.play()
        whiteCircle.setAttribute('animation', 'property: material.opacity; to: 1; dur: 150;')
        tweenCircleL.play()
        purpleMask.setAttribute('animation', 'property: material.opacity; to: .8; dur: 1000;delay:2000;')
        maskLineSprite.setAttribute('animation', 'property: material.opacity; to: 1; dur: 150;delay:3000;')
        tweenMaskLine.play()

        needle.setAttribute('animation', 'property: material.opacity; to: 1; dur: 150;delay:8500;')
        needle.setAttribute('animation__1', 'property: position; to: -0.244 -0.21 0.01; dur: 1000;delay:8500;')

        needle.setAttribute('animation__2', 'property: position;from: -0.244 -0.21 0.01; to: -0.292 -0.3 0.01; dur: 1350;delay:9500;')
        threadLineSprite.setAttribute('animation', 'property: material.opacity; to: 1; dur: 150;delay:5000;')
        whiteCircleRight1.setAttribute('animation', 'property: material.opacity; to: 1; dur: 150;delay:6000;')

        TIMEOUTS.push(setTimeout(() => {
            infoTextParaBottom.innerHTML = 'This process normally takes about an hour and is done under local anesthesia which is often combined with conscious sedation'
            audioSource.setAttribute('src', './assets/audio/old-lady/thread/femaleVO_OldLady_ThreadLift_Scene1_Part2_v1.mp3')
            audioElement.load()
            audioElement.play()
        }, 9500))

        tweenThreadLine.play()
        tweenCircleR1.play()
        needle.setAttribute('animation__3', 'property: position;from: -0.292 -0.3 0.01; to: -2.15 -0.3 0.01; dur: 1500;delay:11500;')
        needle.setAttribute('animation__4', 'property: material.opacity; to: 0; dur: 1500;delay:11500;')
        // threadLineSprite.setAttribute('animation', 'property: material.opacity; to: 0; dur: 150;delay:10500;')
        purpleMask.setAttribute('animation__1', 'property: material.opacity; to: 0; dur: 500;delay:12500;')


    }, 10 * ANIMATION_DELAY_CONSTANT))

    // Remove Laser & Add Next Button
    TIMEOUTS.push(setTimeout(() => {
        if (TIMELINE_DETAILS.isStopAnimation)
            return
infoTextParaBottom.innerHTML = 'The patient gains a more youthful, rested appearance in a relatively short period of time with little social downtime and minimal scarring.'
setTimeout(() => {
    infoTextParaBottom.innerHTML = ''; // Clears the text
}, 9000);       
audioSource.setAttribute('src', './assets/audio/old-lady/thread/femaleVO_OldLady_ThreadLift_End_v1.mp3')
        audioElement.load()
        audioElement.play()

        whiteCircle.setAttribute('animation', 'property: material.opacity; to: 0; dur: 150;delay:0;')
        purpleMask.setAttribute('animation', 'property: material.opacity; to: 0; dur: 150;delay:0;')
        maskLineSprite.setAttribute('animation', 'property: material.opacity; to: 0; dur: 150;delay:0;')
        needle.setAttribute('animation', 'property: material.opacity; to: 0; dur: 500;delay:0;')
        needle.removeAttribute('animation__1')
        needle.removeAttribute('animation__2')
        needle.removeAttribute('animation__3')
        needle.removeAttribute('animation__4')
        threadLineSprite.setAttribute('animation', 'property: material.opacity; to: 0; dur: 150;delay:0;')

        TIMEOUTS.push(setTimeout(() => {
            if (TIMELINE_DETAILS.isStopAnimation)
                return
            let animationWhiteCircleR2 = { progress: 0 };
            const tweenCircleR2 = gsap.timeline(
                {
                    onUpdate: function () {
                        whiteCircleRight2.setAttribute('sprite-sheet', 'progress', animationWhiteCircleR2.progress);
                    },
                }
            );
            tweenCircleR2
                .to(animationWhiteCircleR2,
                    {
                        progress: 1,
                        duration: (3 * ANIMATION_DELAY_CONSTANT) / 1000,
                        delay: 1,
                        ease: 'none'
                    }
                ).pause()

            chin.setAttribute('animation', `property: material.opacity; to: 1;delay:0; dur: ${2.5 * ANIMATION_DELAY_CONSTANT}`)
            whiteCircleRight2.setAttribute('animation', 'property: material.opacity; to: 1; dur: 500;')
            whiteCircleRight1.setAttribute('animation__1', 'property: material.opacity; to: 0; dur: 150;delay:500;')
            tweenCircleR2.play()
            replayButton.classList.remove("hide");
            document.getElementById("reloadButton").style.display = "block"; 
            document.getElementById("replayButton").style.left = "41%";
            showReplayButton();
            replayButton.classList.add("show");
            TIMELINE_DETAILS.isAnimationPlaying = false
            whiteCircleRight2.setAttribute('animation', 'property: material.opacity; to: 0; dur: 500;')
        }, 500))


    }, 29 * ANIMATION_DELAY_CONSTANT))
}

function showBeforeAfterImages() {
    if (TIMELINE_DETAILS.isAnimationPlaying)
        return

    TIMELINE_DETAILS.currentAnimationSeq = 3
    TIMELINE_DETAILS.isAnimationPlaying = false

    document.querySelector('#info-container').classList.remove('show')
    document.querySelector('#testimonial-image-container').classList.add('show')
}


function startAnimation() {

    switch (TIMELINE_DETAILS.currentAnimationSeq) {
        case 1:
            startAnimationCommonCauses()
            break;
        case 2:
            startAnimationTreatments()
            break;
        case 3:
            showTestimonials()
            break;

        default:
            break;
    }
}

function resetAnimation() {
    document.querySelector("#syringeSpritesheet01").setAttribute("material", "opacity", 0);
    document.querySelector("#syringeSpritesheet02").setAttribute("material", "opacity", 0);
    document.querySelector("#syringeSpritesheet03").setAttribute("material", "opacity", 0);
    // TIMELINE_DETAILS.currentAnimationSeq = 1
    TIMELINE_DETAILS.isAnimationPlaying = false
    for (var i = 0; i < TIMEOUTS.length; i++) {
        clearTimeout(TIMEOUTS[i]);
    }

    audioElement.pause();
    audioElement.currentTime = 0;
    treatmentsBtn.classList.remove('show-single')
    testimonialsBtn.classList.remove('show-single')
    replayButton.classList.add("hide");
    ALL_ELEMENTS.forEach(element => {

        if (element.getAttribute('animation'))
            element.removeAttribute('animation')

        if (element.getAttribute('animation__1'))
            element.removeAttribute('animation__1')

        if (element.getAttribute('animation__2'))
            element.removeAttribute('animation__2')

        if (element.getAttribute('animation__3'))
            element.removeAttribute('animation__3')

        if (element.getAttribute('animation__4'))
            element.removeAttribute('animation__4')

        if (element.getAttribute('animation__5'))
            element.removeAttribute('animation__5')

        if (element.classList.contains('show'))
            element.classList.remove('show')

        if (element.classList.contains('show-single'))
            element.classList.remove('show-single')

        if (element.getAttribute('material'))
            element.setAttribute('material', 'opacity', 0);

        if (element.getAttribute('sprite-sheet'))
            element.setAttribute('sprite-sheet', 'progress', 0);
    });
}

sceneEl = document.querySelector('a-scene');
targetImage = document.querySelector('#targetImage');

sceneEl.addEventListener("arReady", (event) => {
    console.log("MindAR is ready")
});
sceneEl.addEventListener('loaded', function () {
    arSystem = sceneEl.systems["mindar-image-system"];
    document.querySelector('#mainScreen .btn-container').classList.add('show')
});

function init() {
    // if (sceneEl)
    mainScreen.classList.add('hide')
    backBtn.classList.add('show')
    document.getElementById("reloadButton").style.display = "none"; 
    document.querySelector('#mainScreen .btn-container').classList.remove('show')
    TIMELINE_DETAILS.isStopAnimation = false

    if (!AR_READY) {
        arSystem.start(); // start AR 
    } else {
        arSystem.unpause()
    }
    targetImage.addEventListener("targetLost", resetAnimation);
    targetImage.addEventListener("targetFound", startAnimation);
    // arError event triggered when something went wrong. Mostly browser compatbility issue
    sceneEl.addEventListener("arError", (event) => {
        console.log("MindAR failed to start")
    });

}

// function goToAnimation(animationSeq) {

//     TIMELINE_DETAILS.currentAnimationSeq = Number(animationSeq)
//     console.log(animationSeq, TIMELINE_DETAILS.currentAnimationSeq);
//     init()
// }

let wakeLock = null;

async function keepScreenAwake() {
    try {
        if ('wakeLock' in navigator) {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log("Screen Wake Lock is active");
        } else {
            console.warn("Wake Lock API not supported");
        }
    } catch (err) {
        console.error(`Wake Lock Error: ${err.message}`);
    }
}
function goBack() {
    document.getElementById("replayButton").style.left = "50%";
    resetAnimation();
    TIMELINE_DETAILS.isStopAnimation = true;
    arSystem.pause(); // Stop the camera

    // Show the main screen again
    document.getElementById("mainScreen").style.display = "block"; 
    document.getElementById("scanText").style.display = "none"; // Hide scan text

    infoTextBottom.classList.remove('show');
    mainScreen.classList.remove('hide');
    backBtn.classList.remove('show');
    document.getElementById("reloadButton").style.display = "none"; 
    document.querySelector('#mainScreen .btn-container').classList.add('show');

    // ✅ Hide the replay button
    const replayButton = document.getElementById('replayButton');
    if (replayButton) {
        replayButton.classList.add('hide'); 
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const replayButton = document.querySelector('#replayButton');

    // ✅ Hide the replay button initially
    replayButton.classList.add('hide');
    replayButton.classList.remove('show');

    replayButton.addEventListener('click', function () {
        console.log('Replay button clicked!'); // Debugging log
        
        // ✅ Hide the replay button immediately after clicking
        replayButton.classList.add('hide');
        replayButton.classList.remove('show');
        document.getElementById("reloadButton").style.display = "none";
        resetAnimation();

        setTimeout(() => {
            if (TIMELINE_DETAILS.currentAnimationSeq === 1) {
                startAnimationCommonCauses();
            } else if (TIMELINE_DETAILS.currentAnimationSeq === 2) {
                startAnimationTreatments();
            } else if (TIMELINE_DETAILS.currentAnimationSeq === 3) {
                showTestimonials(); // Restart animation for sequence 3
            }
        }, 100);
    });
});

function showReplayButton() {
    replayButton.classList.remove('hide'); 
    replayButton.classList.add('show'); 
}


function goToAnimation(animationSeq) {
    keepScreenAwake();
    
    // Hide the main screen
    document.getElementById("mainScreen").style.display = "none";

    // Show the full-screen white background with scan text
    const scanText = document.getElementById("scanText");
    scanText.style.display = "flex"; // Make it visible

    // Wait for 2 seconds, then hide scan text and start animation
    setTimeout(() => {
        scanText.style.display = "none"; // Hide message
        TIMELINE_DETAILS.currentAnimationSeq = Number(animationSeq);
        console.log(animationSeq, TIMELINE_DETAILS.currentAnimationSeq);
        init();
    }, 2000);
}

document.addEventListener('visibilitychange', function () {
    console.log(document.hidden);

    if (document.hidden)
        resetAnimation()
}, false);


function reloadPage() {
    window.location.href = "index.html"; // Navigate to index.html on click
}

window.resetAnimation = resetAnimation
window.startAnimationCommonCauses = startAnimationCommonCauses
window.startAnimationTreatments = startAnimationTreatments
window.showTestimonials = showTestimonials
window.showBeforeAfterImages = showBeforeAfterImages
window.goToAnimation = goToAnimation

