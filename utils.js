const accessibilityToggleBtn = document.getElementById('safeModeToggle');
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function isSafeModeOn() {
    return localStorage.getItem('safeMode') === 'true';
  }

export function updateButtonLabel() {
  const label = isSafeModeOn() ? "Disable Safe Mode" : "Enable Safe Mode";
  accessibilityToggleBtn.textContent = label;
}

export function initSafeModeToggle() {

  if (localStorage.getItem("safeMode") === null) {
    localStorage.setItem("safeMode", prefersReducedMotion.toString());
  }

  updateButtonLabel();

  accessibilityToggleBtn.addEventListener('click', () => {
    const currentMode = isSafeModeOn();
    const toggledMode = !currentMode;
    localStorage.setItem('safeMode', toggledMode.toString());
    updateButtonLabel();
  })
}