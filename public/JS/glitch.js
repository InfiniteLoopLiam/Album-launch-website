// awesome script of glitchy glitches

import { isSafeModeOn } from './utils.js';

const glitchHeading = document.getElementById('glitch-heading');

export function initGlitch() {
  if (isSafeModeOn()) return;

  setInterval(() => {
    randomGlitch();
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
  return 1000 + Math.random() * 1500;
}

function applyFlickerEffect(direction) {
  glitchHeading.classList.add(direction);
  setTimeout(() => glitchHeading.classList.remove(direction), 300);
}

// function calculates random x and y values and sets CSS variable as the result
function randomGlitch() {
  const x = Math.floor(Math.random() * 6 - 3); // -3 to 3 px
  const y = Math.floor(Math.random() * 6 - 3);
  glitchHeading.style.setProperty('--glitch-x', `${x}px`);
  glitchHeading.style.setProperty('--glitch-y', `${y}px`);
}

// section for infected and mutated text

const originalHeader = glitchHeading.innerText.split('');

const infectedChars = originalHeader.map((char) => ({
  original: char,
  current: char,
  state: 'healthy',
}));

function infect(index) {
  if (index < 0 || index >= infectedChars.length) return;

  const char = infectedChars[index];
  if (char.state === 'healthy') {
    char.state = 'infected';
    char.current = mutateChar();
    renderInfectedText();
  }
}

function mutateChar() {
  const glitchChars = ['█', '▓', '▒', '░', '#', '%', '&', '@', 'ø', '∆', '§'];
  return glitchChars[Math.floor(Math.random() * glitchChars.length)];
}

function renderInfectedText() {
  glitchHeading.innerHTML = infectedChars
    .map((newChar) => {
      return `<span class="glitch-char ${newChar.state}">${newChar.current}</span>`;
    })
    .join('');
}

function infectRandomly() {
  const index = Math.floor(Math.random() * infectedChars.length);
  infect(index);
  const nextDelay = Math.floor(Math.random() * 3000);
  setTimeout(infectRandomly, nextDelay);
}

// logic for enabling/disabling animations end
