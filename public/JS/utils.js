const accessibilityToggleBtn = document.getElementById('safe-mode-toggle');
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

export function initSafeModeToggle() {
  if (localStorage.getItem('safeMode') === null) {
    localStorage.setItem('safeMode', prefersReducedMotion.toString());
  }

  updateButtonLabel();

  accessibilityToggleBtn.addEventListener('click', () => {
    const currentMode = isSafeModeOn();
    const toggledMode = !currentMode;
    localStorage.setItem('safeMode', toggledMode.toString());
    updateButtonLabel();
  });
}

export function isSafeModeOn() {
  return localStorage.getItem('safeMode') === 'true';
}

export function updateButtonLabel() {
  accessibilityToggleBtn.textContent = isSafeModeOn()
    ? 'Disable Safe Mode'
    : 'Enable Safe Mode';
}
