const form = document.getElementById('survey-form');
const confirmation = document.getElementById('confirmation-message');
const header = document.getElementById('page-top');
const landing = document.getElementById('landing');
const startScanBtn = document.getElementById('startScan');
const trackGallery = document.getElementById('track-gallery');
const reflectionForm = document.getElementById('reflection-form');
const glitchHeading = document.getElementById('glitchHeading');
const safeModeBtn = document.getElementById('safeModeToggle');

// logic for disabling animations start

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

if (localStorage.getItem("safeMode") === null) {
  localStorage.setItem("safeMode", prefersReducedMotion.toString());
}

updateButtonLabel();

function isSafeModeOn() {
  return localStorage.getItem('safeMode') === 'true';
}

safeModeBtn.addEventListener('click', () => {
  const currentMode = isSafeModeOn();
  const toggledMode = !currentMode;
  localStorage.setItem('safeMode', toggledMode.toString());
  updateButtonLabel();
})

function updateButtonLabel() {
  const label = isSafeModeOn() ? "Disable Safe Mode" : "Enable Safe Mode";
  document.getElementById('safeModeToggle').textContent = label;
}

function activateGlitch() {
  glitchHeading.classList.add('forward');
  setTimeout(() => glitchHeading.classList.remove('forward'), 300);
}

function activateReverseGlitch() {
  glitchHeading.classList.add('reverse');
  setTimeout(() => glitchHeading.classList.remove('reverse'), 300);
}

setInterval(() => {
  if (isSafeModeOn()) return;

  const randomNum = Math.random();
  if (randomNum >= 0.5) {
    activateGlitch();
  } else if (randomNum >= 0.75) {
    activateReverseGlitch();
  }
}, 1000 + Math.random() * 1500);

// logic for disabling animations end

startScanBtn.addEventListener('click', () => {
  landing.classList.add('hidden');
  header.classList.remove('hidden');
  trackGallery.classList.remove('hidden');
  reflectionForm.classList.remove('hidden');
})

form.addEventListener('submit', function(event) {
  event.preventDefault();
  form.style.display = 'none';
  confirmation.classList.remove('hidden');
  header.scrollIntoView({behavior: 'smooth'});
});

document.querySelectorAll('.track-card').forEach(card => {
  const button = card.querySelector('.play-button');
  const audio = card.querySelector('audio');
  button.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      button.textContent = '▶ REFLECT';
    } else {
      audio.pause();
      button.textContent = '▶ ENDURE';
    }
  });
});

// VHS overlay

// Create instance of 2d object

const canvas = document.getElementById('vhsCanvas');
const ctx = canvas.getContext('2d');

let displacementMap = [];

// Resize canvas to fill screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const sliceHeight = 10;
  const numSlices = Math.ceil(canvas.height / sliceHeight);
  displacementMap = new Array(numSlices).fill(0);
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// Draw one frame of VHS distortion
function drawFrame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawStatic();
  drawScanlines();
  drawGlitchBar();
  drawTears();
  requestAnimationFrame(drawFrame);
}

// Static noise specks
function drawStatic() {
  const noiseCount = canvas.width * canvas.height * 0.002;
  for (let pixel = 0; pixel < noiseCount; pixel++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const shade = Math.floor(Math.random() * 255);
    ctx.fillStyle = `rgba(${shade},${shade},${shade},0.4)`;
    ctx.fillRect(x, y, 1, 1);
  }
}

// Horizontal scanlines
function drawScanlines() {
  ctx.fillStyle = 'rgba(150, 4, 4, 0.05)';
  for (let y = 0; y < canvas.height; y += 2) {
    ctx.fillRect(0, y, canvas.width, 1);
  }
}

// Occasional glitch bar
function drawGlitchBar() {
  if (Math.random() < 0.1) {
    const height = 20 + Math.random() * 30;
    const y = Math.random() * (canvas.height - height);
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, y, canvas.width, height);
  }
}

// Start the animation loop
drawFrame();


// Scroll tracking and scroll velocity logic
let lastScrollY = window.scrollY;
let lastRecdTime = performance.now();
let velocity;

function scrollTrack() {
  const currentScrollY = window.scrollY;
  const currentTime = performance.now();
  const deltaY = currentScrollY - lastScrollY;
  lastScrollY = currentScrollY;
  const deltaTime = currentTime - lastRecdTime;
  lastRecdTime = currentTime;
  velocity = deltaY / deltaTime;

  horizontalTear();

  requestAnimationFrame(scrollTrack);
}

scrollTrack();

// Horizontal tearing based on velocity of scroll

function horizontalTear() {
  if (Math.abs(velocity) > 5) {
    for (let i = 0; i < displacementMap.length; i++) {
      const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
      const intensity = velocity * randomFactor;
      displacementMap[i] += intensity;
    }
  } else {
    // Decay toward zero when velocity is low
    for (let i = 0; i < displacementMap.length; i++) {
      if (Math.abs(displacementMap[i]) < 0.01) {
        displacementMap[i] = 0;
      } else {
        displacementMap[i] *= 0.9;
      }
    }
  }
}

function drawTears() {
  const sliceHeight = 10;
  for (let i = 0; i < displacementMap.length; i++) {
    const displacement = displacementMap[i];
    if (Math.abs(displacement) > 0.5) {
      const dy = i * sliceHeight + displacement;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.fillRect(0, dy, canvas.width, sliceHeight);
    }
  }
}

