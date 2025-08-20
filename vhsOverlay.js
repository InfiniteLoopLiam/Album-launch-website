// VHS overlay

import { isSafeModeOn } from "./utils.js";

// Create instance of 2d object

const canvas = document.getElementById('vhsCanvas');
const canvasState = {
  velocity: 0,
  displacementMap: [],
  sliceHeight: 20,
  ctx: canvas.getContext('2d'),
  lastScrollY: window.scrollY
};

// Resize canvas to fill screen
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const numSlices = Math.ceil(canvas.height / canvasState.sliceHeight);
  canvasState.displacementMap = new Array(numSlices).fill(0);
}

window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// Draw one frame of VHS distortion
function drawFrame() {
  canvasState.ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!isSafeModeOn()) {
    drawStatic(canvasState);
    drawScanlines(canvasState);
    drawGlitchBar(canvasState);
    drawTears(canvasState);
  }
  requestAnimationFrame(drawFrame);
}

// Static noise specks
function drawStatic(state) {
  const noiseCount = canvas.width * canvas.height * 0.002;
  for (let pixel = 0; pixel < noiseCount; pixel++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const shade = Math.floor(Math.random() * 255);
    state.ctx.fillStyle = `rgba(${shade},${shade},${shade},0.4)`;
    state.ctx.fillRect(x, y, 1, 1);
  }
}

// Horizontal scanlines
function drawScanlines(state) {
  state.ctx.fillStyle = 'rgba(150, 4, 4, 0.05)';
  for (let y = 0; y < canvas.height; y += 2) {
    state.ctx.fillRect(0, y, canvas.width, 1);
  }
}

// Occasional glitch bar
function drawGlitchBar(state) {
  if (Math.random() < 0.1) {
    const height = 20 + Math.random() * 30;
    const y = Math.random() * (canvas.height - height);
    state.ctx.fillStyle = 'rgba(255,255,255,0.05)';
    state.ctx.fillRect(0, y, canvas.width, height);
  }
}

// Scroll tracking and scroll velocity logic
let lastRecdTime = performance.now();
function calcVelocity(state) {
  const currentScrollY = window.scrollY;
  const currentTime = performance.now();
  const deltaY = currentScrollY - state.lastScrollY;
  const deltaTime = currentTime - lastRecdTime;
  state.lastScrollY = currentScrollY;
  lastRecdTime = currentTime;
  state.velocity = deltaY / deltaTime;
}

function scrollTrack(state) {
  calcVelocity(state);
  calcSliceDisplacement(state);
  requestAnimationFrame(() => scrollTrack(state));
}

// Horizontal tearing based on velocity of scroll
function calcSliceDisplacement(state) {
  if (Math.abs(state.velocity) > 3) {
    applyDisplacement(state.displacementMap, state.velocity);
  } else {
    decayDisplacement(state.displacementMap)
  }
}

function applyDisplacement(displacementMap, velocity) {
  for (let sliceIndex = 0; sliceIndex < displacementMap.length; sliceIndex++) {
      const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
      const intensity = velocity * randomFactor;
      displacementMap[sliceIndex] += intensity;
    }
}

function decayDisplacement(displacementMap) {
  // Decay toward zero when velocity is low
  for (let i = 0; i < displacementMap.length; i++) {
    if (Math.abs(displacementMap[i]) < 0.01) {
      displacementMap[i] = 0;
    } else {
      displacementMap[i] *= 0.8;
    }
  }

}
function drawTears(state) {
  for (let sliceIndex = 0; sliceIndex < state.displacementMap.length; sliceIndex++) {
    const displacement = state.displacementMap[sliceIndex];
    const { threshold, opacity } = getTearIntensity(state.velocity);
    const { red, green, blue } = getTearColour(displacement);
  if (Math.abs(displacement) > threshold) {
    const dy = sliceIndex * state.sliceHeight + displacement;  
    state.ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    state.ctx.fillRect(0, dy, canvas.width, state.sliceHeight);
    }
  }
}

function getTearIntensity(velocity) {
  const velocityMagnitude = Math.abs(velocity);
  const threshold = Math.min(1, velocityMagnitude * 0.5 + 0.2);
  const opacity = Math.min(0.5, velocityMagnitude * 0.3);
  return {
    threshold,
    opacity
  }  
}

function getTearColour(displacement) {
  const red = Math.max(0, displacement * 10);
  const blue = Math.max(0, -displacement * 10);
  const green = 20;
  return { red, green, blue };    
}

export function initVhsOverlay() {
  // Start the animation loop
  window.addEventListener('load', () => {
    resizeCanvas();
    scrollTrack(canvasState);
    drawFrame();
  });
}

