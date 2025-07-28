const form = document.getElementById('survey-form');
const confirmation = document.getElementById('confirmation-message');
const header = document.getElementById('page-top');
const landing = document.getElementById('landing');
const startScanBtn = document.getElementById('startScan');
const trackGallery = document.getElementById('track-gallery');
const reflectionForm = document.getElementById('reflection-form');

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