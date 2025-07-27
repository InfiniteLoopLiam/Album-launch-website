const form = document.getElementById('survey-form');
const confirmation = document.getElementById('confirmation-message');
const header = document.getElementById('page-top')

form.addEventListener('submit', function(event) {
  event.preventDefault();
  form.style.display = 'none';
  confirmation.classList.remove('hidden');
  header.scrollIntoView({behavior: 'smooth'});
});