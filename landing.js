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