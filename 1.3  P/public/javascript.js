// public/javascript.js
// Robust, small script that attaches event listeners and changes heading text.

(function () {
  const texts = [
    "SIT 725",
    "Welcome — ready to learn!",
    "Fast, clean, and simple.",
    "This text changed — nice!",
    "Karan's demo — working fine!"
  ];

  function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
  }

  function changeText() {
    const heading = document.getElementById('heading');
    const subtitle = document.getElementById('subtitle');
    const idx = getRandomIndex(texts.length);
    heading.textContent = texts[idx];
    subtitle.textContent = `Current: "${texts[idx]}" — clicked at ${new Date().toLocaleTimeString()}`;
  }

  function resetText() {
    const heading = document.getElementById('heading');
    const subtitle = document.getElementById('subtitle');
    heading.textContent = 'SIT 725';
    subtitle.textContent = 'Click the button to change this text.';
  }

  // attach listeners after DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    const changeBtn = document.getElementById('changeBtn');
    const resetBtn = document.getElementById('resetBtn');

    if (!changeBtn || !resetBtn) {
      // defensive: log if elements are missing
      console.error('Required buttons not found in DOM.');
      return;
    }

    changeBtn.addEventListener('click', changeText);
    resetBtn.addEventListener('click', resetText);

    // allow Enter key to trigger change when focused on button
    changeBtn.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') changeText();
    });
  });
})();
