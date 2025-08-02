// awesome script of glitchy glitches

const glitchHeading = document.getElementById('glitchHeading');
const safeModeBtn = document.getElementById('safeModeToggle');

// logic for enabling/disabling animations start

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

function activateFlicker() {
  glitchHeading.classList.add('forward');
  setTimeout(() => glitchHeading.classList.remove('forward'), 300);
}

function activateReverseFlicker() {
  glitchHeading.classList.add('reverse');
  setTimeout(() => glitchHeading.classList.remove('reverse'), 300);
}

setInterval(() => {
  if (isSafeModeOn()) return;

  const randomNum = Math.random();
  if (randomNum >= 0.5) {
    activateFlicker();
  } else if (randomNum >= 0.75) {
    activateReverseFlicker();
  }
}, 1000 + Math.random() * 1500);

// function calculates random x and y values and sets css variable as the result 
function randomGlitch() {
  const x = Math.floor(Math.random() * 6 - 3); // -3 to 3 px
  const y = Math.floor(Math.random() * 6 - 3);
  glitchHeading.style.setProperty('--glitch-x', `${x}px`);
  glitchHeading.style.setProperty('--glitch-y', `${y}px`);
}

setInterval(() => {
  if (isSafeModeOn()) return;
  randomGlitch()
}, 90);

// logic for enabling/disabling animations end