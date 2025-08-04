// awesome script of glitchy glitches

const glitchHeading = document.getElementById('glitchHeading');
const safeModeBtn = document.getElementById('safeModeToggle');
const glitchRed = document.getElementById('glitchRed');
const glitchBlue = document.getElementById('glitchBlue');
const glitchPink = document.getElementById('glitchPink');

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

// section for infected and mutated text

let originalHeader = glitchHeading.innerText.split("");

let infectedChars = originalHeader.map(char => ({
  original: char,
  current: char,
  state: "healthy"
}));


function infect(index) {
  if (index < 0 || index >= infectedChars.length) return;

  const char = infectedChars[index];
  if (char.state === "healthy") {
    char.state = "infected";
    char.current = mutateChar();
    renderInfectedText();
    
  }
}

function mutateChar() {
  const glitchChars = ['█', '▓', '▒', '░', '#', '%', '&', '@', 'ø', '∆', '§'];
  return glitchChars[Math.floor(Math.random() * glitchChars.length)];
}

function renderInfectedText() {
  const infectedText = infectedChars.map(char => char.current).join('');
  glitchHeading.textContent = infectedText;
}

function infectRandomly() {
  const index = Math.floor(Math.random() * infectedChars.length);
  infect(index);

  const nextDelay = Math.floor(Math.random() * 3000);
  setTimeout(infectRandomly, nextDelay);
}

setTimeout(infectRandomly, 5000);

// review function below at later date

// function tapeDrag(red, blue, pink) {
//   if (red) {
//     const xRed = Math.floor(Math.random() * 4 - 3); 
//     const yRed = Math.floor(Math.random() * 2);
//     glitchRed.style.setProperty('--drag-x-red', `${xRed}px`);
//     glitchRed.style.setProperty('--drag-y-red', `${yRed}px`);
//   }
//   if (blue) {
//     const xBlue = Math.floor(Math.random() * 4 - 3); 
//     const yBlue = Math.floor(Math.random() * 2);
//     glitchBlue.style.setProperty('--drag-x-blue', `${xBlue}px`);
//     glitchBlue.style.setProperty('--drag-y-blue', `${yBlue}px`);
//   }
//   if (pink) {
//     const xpink = Math.floor(Math.random() * 4 - 3); 
//     const ypink = Math.floor(Math.random() * 2);
//     glitchPink.style.setProperty('--drag-x-pink', `${xpink}px`);
//     glitchPink.style.setProperty('--drag-y-pink', `${ypink}px`);
//   }

// }

// setInterval(() => {
//   if (isSafeModeOn()) return;
//   tapeDrag(true, true, true)
// }, 40);

// logic for enabling/disabling animations end