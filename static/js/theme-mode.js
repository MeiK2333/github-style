function switchTheme() {
  const currentStyle = currentTheme();
  var iconElement = document.getElementById('github-icon');

  if (currentStyle == 'light') {
    setTheme('dark');
    iconElement.setAttribute('class', 'octicon');
    iconElement.setAttribute('color', '#f0f6fc');
  }
  else {
    setTheme('light');
    iconElement.removeAttribute('color');
    iconElement.removeAttribute('class');
  }
}

function setTheme(style) {
  document.querySelectorAll('.isInitialToggle').forEach(elem => {
    elem.classList.remove('isInitialToggle');
  });
  document.documentElement.setAttribute('data-color-mode', style);
  localStorage.setItem('data-color-mode', style);
}

function currentTheme() {
  const localStyle = localStorage.getItem('data-color-mode');
  const systemStyle = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return localStyle || systemStyle;
}

(() => {
  setTheme(currentTheme());
})();
