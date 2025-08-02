let sceneEl = null,
    targetImage = null,
    arSystem = null;

let AR_READY = false;

const TIMELINE_DETAILS = {
    currentAnimationSeq: 1
};

// DOM Elements
const mainScreen = document.querySelector('#mainScreen');
const backBtn = document.querySelector('#backBtn');
const replayButton = document.querySelector('#replayButton');

let wakeLock = null;

// ✅ Keep Screen Awake
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

// ✅ Force resize of renderer and camera
function forceResize() {
    if (arSystem && sceneEl) {
        const renderer = sceneEl.renderer;
        const camera = sceneEl.camera;
        if (renderer && camera) {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            console.log(`Resized to ${window.innerWidth}x${window.innerHeight}`);
        } else {
            console.warn('Renderer or camera not ready');
        }
    }
}

// ✅ Initialize AR and set up video logic
function init() {
    mainScreen.classList.add('hide');
    document.querySelector('#mainScreen .btn-container').classList.remove('show');

    if (!AR_READY) {
        arSystem.start();
        AR_READY = true;
        forceRendererResize()
        setTimeout(forceResize, 100); // Delay to ensure renderer is ready
    } else {
        arSystem.unpause();
        forceResize();
        forceRendererResize()
    }

    // 📌 Target Found
    targetImage.addEventListener("targetFound", () => {
        const mainVideoEl = document.querySelector("#mainVideo");
        const aVideo = document.querySelector("#displayVideo");

        if (mainVideoEl) {
            mainVideoEl.play().catch(err => console.warn("Autoplay blocked", err));
        }
        if (aVideo) {
            aVideo.setAttribute("visible", "false");
        }
    });

    // 📌 Target Lost
    targetImage.addEventListener("targetLost", () => {
        const mainVideoEl = document.querySelector("#mainVideo");
        const aVideo = document.querySelector("#displayVideo");

        if (mainVideoEl) {
            mainVideoEl.pause();
        }
        if (aVideo) {
            aVideo.setAttribute("visible", "false");
        }
    });

    sceneEl.addEventListener("arError", () => {
        console.log("MindAR failed to start");
    });
}

// ✅ Go Back Button Handler
function goBack() {
    document.querySelector(".back-btn").style.display = "none";
    document.querySelector(".back-btn1").style.display = "none";
    document.getElementById("videoScreen").style.display = "none";
    document.getElementById("videoScreen").classList.remove("active");
    document.getElementById("mainScreen").style.display = "block";
    document.getElementById("mainScreen").classList.add("active");
    window.checkOrientation();
    document.querySelectorAll("video").forEach(video => {
        video.pause();
        video.currentTime = 0;
    });

    const btnContainer1 = document.querySelector(".btn-container1");
    btnContainer1.classList.add("hide");
    btnContainer1.classList.remove("show");
    btnContainer1.style.display = "none";

    const aVideo = document.querySelector("#displayVideo");
    if (aVideo) aVideo.setAttribute("visible", "false");

    if (arSystem && arSystem.running) {
        arSystem.stop();
        sessionStorage.setItem("cameraActive", "false");
    }

    mainScreen.classList.remove("hide");
    mainScreen.style.display = "flex";

    backBtn.classList.add("hide");
    backBtn.classList.remove("show");

    const btnContainer = document.querySelector("#mainScreen .btn-container");
    if (btnContainer) {
        btnContainer.classList.add("show");
        btnContainer.classList.remove("hide");
        btnContainer.style.display = "flex";
    }

    document.getElementById("scanText").style.display = "none";
    document.getElementById("scanning-overlay").classList.add("hidden");
}

// ✅ Go to Animation with Default Video Load
function goToAnimation() {
    // Initial renderer resize
    forceRendererResize();
    keepScreenAwake();
    document.querySelector(".back-btn").style.display = "block";
    document.querySelector(".back-btn1").style.display = "block";
    if (mainScreen) mainScreen.style.display = "none";

    const btnContainer = mainScreen.querySelector(".btn-container");
    if (btnContainer) {
        btnContainer.classList.add("hide");
        btnContainer.classList.remove("show");
        btnContainer.style.display = "none";
    }

    const btnContainer1 = document.querySelector(".btn-container1");
    if (btnContainer1) {
        btnContainer1.classList.remove("hide");
        btnContainer1.classList.add("show");
        btnContainer1.style.display = "flex";
    }

    const scanText = document.getElementById("scanText");
    if (scanText) scanText.style.display = "none";

    if (arSystem && arSystem.running) arSystem.stop();

    changeVideoSource("assets/video/Test-01.mp4");
    init();

    // Multiple resize calls to stabilize WebXR and canvas
    setTimeout(forceRendererResize, 50);
    setTimeout(forceRendererResize, 200);
    setTimeout(forceRendererResize, 500);
    setTimeout(forceRendererResize, 1000);
    checkOrientation();

    sessionStorage.setItem("cameraActive", "true");
}

// ✅ Change Video Path Dynamically
function changeVideo(videoPath) {
    changeVideoSource(videoPath);
}
function forceRendererResize() {
  const scene = document.querySelector('a-scene');
  if (scene && scene.renderer) {
    const renderer = scene.renderer;
    if (renderer) {
      // Increase size by 5% to ensure it covers the viewport
      const width = window.innerWidth * 1.05;
      const height = window.innerHeight * 1.05;
      renderer.setSize(width, height);
      scene.camera.aspect = width / height;
      scene.camera.updateProjectionMatrix();
      console.log(width, height); // Logs the calculated width and height
    }
  }
}
// ✅ Core Function to Change and Reload Video Source
function changeVideoSource(videoPath) {
    const mainVideoEl = document.querySelector('#mainVideo');
    const aVideo = document.querySelector('#displayVideo');

    if (!mainVideoEl || !aVideo) return;

    mainVideoEl.pause();
    mainVideoEl.setAttribute("src", videoPath);
    mainVideoEl.load();

    aVideo.setAttribute("src", "#mainVideo");
    aVideo.setAttribute("visible", "false");

    // Auto-play if target is already visible
    if (targetImage && targetImage.object3D.visible) {
        mainVideoEl.play().catch(e => console.warn("Autoplay blocked", e));
        aVideo.setAttribute("visible", "true");
    }
}

// ✅ DOM Ready Setup
document.addEventListener("DOMContentLoaded", () => {
    sceneEl = document.querySelector("a-scene");
    targetImage = document.querySelector("#targetImage");

    sceneEl.addEventListener("loaded", () => {
        arSystem = sceneEl.systems["mindar-image-system"];
        document.querySelector('#mainScreen .btn-container').classList.add('show');
        window.checkOrientation();
        setTimeout(forceResize, 100);
    });
});

// ✅ Listen for resize events
window.addEventListener('resize', () => {
    window.checkOrientation();
    setTimeout(forceResize, 100);
});

// ✅ Global Access
window.goToAnimation = goToAnimation;
window.goBack = goBack;
window.changeVideo = changeVideo;
window.forceResize = forceResize;