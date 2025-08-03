let arSystem = null;
let selectedVideo = null;

function goToAnimation() {
  // Hide main screen and show AR scene
  document.getElementById("mainScreen").style.display = "none";
  document.getElementById("mainScreen").classList.remove("active");
  document.getElementById("scanning-overlay").classList.remove("hidden");
  document.getElementById("scanning-overlay").style.display = "block";
  document.getElementById("backBtn").classList.remove("hide");
  document.querySelector("a-scene").style.display = "block";

  // Initialize AR system
  const scene = document.querySelector("a-scene");
  arSystem = scene.systems["mindar-image-system"];
  
  // Start AR system
  arSystem.start();

  // Show loading animation
  const scanText = document.getElementById("scanText");
  scanText.style.display = "block";
  gsap.to(scanText, {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out"
  });

  // Handle target found event
  const targetImage = document.getElementById("targetImage");
  targetImage.addEventListener("targetFound", () => {
    // Hide scanning overlay and scan text
    document.getElementById("scanning-overlay").style.display = "none";
    document.getElementById("scanText").style.display = "none";

    // Show video
    const video = document.getElementById("displayVideo");
    const videoAsset = document.getElementById("mainVideo");
    
    // Set default video if none selected
    if (!selectedVideo) {
      selectedVideo = "assets/video/Video1.mp4";
    }
    
    videoAsset.src = selectedVideo;
    video.setAttribute("visible", "true");
    videoAsset.play();
  });

  // Handle target lost event
  targetImage.addEventListener("targetLost", () => {
    // Show scanning overlay again
    document.getElementById("scanning-overlay").style.display = "block";
    document.getElementById("scanText").style.display = "block";
    
    // Pause video
    const video = document.getElementById("displayVideo");
    const videoAsset = document.getElementById("mainVideo");
    videoAsset.pause();
    video.setAttribute("visible", "false");
  });

  checkOrientation();
}

// Modified playVideo to set selected video for AR
function playVideo(videoSrc) {
  selectedVideo = videoSrc;
  goToAnimation();
}

// Modified goBack function to handle AR cleanup
function goBack() {
  if (arSystem && arSystem.running) {
    arSystem.stop();
  }
  
  // Reset video
  const videoAsset = document.getElementById("mainVideo");
  videoAsset.pause();
  videoAsset.src = "";
  
  // Reset visibility
  document.getElementById("displayVideo").setAttribute("visible", "false");
  document.getElementById("scanning-overlay").style.display = "none";
  document.getElementById("scanText").style.display = "none";
  document.getElementById("backBtn").classList.add("hide");
  
  // Return to main screen
  document.getElementById("videoScreen").style.display = "none";
  document.getElementById("videoScreen").classList.remove("active");
  document.getElementById("mainScreen").style.display = "block";
  document.getElementById("mainScreen").classList.add("active");
  
  checkOrientation();
}