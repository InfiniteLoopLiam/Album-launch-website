// awesome script of glitchy glitches

import { isSafeModeOn } from "./utils.js";

const glitchHeading = document.getElementById('glitchHeading');
// const glitchRed = document.getElementById('glitchRed');
// const glitchBlue = document.getElementById('glitchBlue');
// const glitchPink = document.getElementById('glitchPink');

export function initGlitch() {
  if (isSafeModeOn()) return;

  setInterval(() => {
    randomGlitch()
  }, 90);

  setTimeout(runFlickerLoop, scheduleFlicker());

  setTimeout(infectRandomly, 5000);
}

function runFlickerLoop() {
  if (isSafeModeOn()) return;
  
  const randomNum = Math.random();
 
  if (randomNum >= 0.5 && randomNum < 0.75) {
    applyFlickerEffect('forward');
  } else if (randomNum >= 0.75) {
    applyFlickerEffect('reverse');
  } 

  setTimeout(runFlickerLoop, scheduleFlicker());
}

function scheduleFlicker() {
  return 1000 + Math.random() * 1500
}

function applyFlickerEffect(direction) {
  glitchHeading.classList.add(direction);
  setTimeout(() => glitchHeading.classList.remove(direction), 300);
}

// function calculates random x and y values and sets css variable as the result 
function randomGlitch() {
  const x = Math.floor(Math.random() * 6 - 3); // -3 to 3 px
  const y = Math.floor(Math.random() * 6 - 3);
  glitchHeading.style.setProperty('--glitch-x', `${x}px`);
  glitchHeading.style.setProperty('--glitch-y', `${y}px`);
}

// section for infected and mutated text

const originalHeader = glitchHeading.innerText.split("");

const infectedChars = originalHeader.map(char => ({
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
  const infectedHTML = infectedChars.map(char => {
    return `<span class="glitch-char ${char.state}">${char.current}</span>`;
  }).join('');
  glitchHeading.innerHTML = infectedHTML;
} 

function infectRandomly() {
  const index = Math.floor(Math.random() * infectedChars.length);
  infect(index);
  const nextDelay = Math.floor(Math.random() * 3000);
  setTimeout(infectRandomly, nextDelay);
}

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