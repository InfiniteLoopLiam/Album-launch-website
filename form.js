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

console.log(isSafeModeOn());

safeModeBtn.addEventListener('click', () => {
  const currentMode = isSafeModeOn();
  const toggledMode = !currentMode;
  localStorage.setItem('safeMode', toggledMode.toString());
  updateButtonLabel();
  console.log(`Safe Mode is now: ${toggledMode}`)
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

