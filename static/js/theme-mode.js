function switchTheme() {
  const currentStyle = currentTheme();
  const iconElement = document.getElementById('github-icon');

  if (currentStyle === 'light') {
    setTheme('dark');
    setIconTheme('dark')
    if (iconElement) {
      iconElement.setAttribute('class', 'octicon');
      iconElement.setAttribute('color', '#f0f6fc');
    }
  }
  else {
    setTheme('light');
    setIconTheme('light')
    if (iconElement) {
      iconElement.removeAttribute('color');
      iconElement.removeAttribute('class');
    }
  }
}

function setTheme(style) {
  document.querySelectorAll('.isInitialToggle').forEach(elem => {
    elem.classList.remove('isInitialToggle');
  });
  document.documentElement.setAttribute('data-color-mode', style);
  localStorage.setItem('data-color-mode', style);
}

function setIconTheme(theme) {
  twitterIconElement = document.getElementById('twitter-icon');
  if (theme === 'light') {
    twitterIconElement.setAttribute("fill", "black")
  } else if (theme === 'dark') {
    twitterIconElement.setAttribute("fill", "white")
  }
}

function currentTheme() {
  const localStyle = localStorage.getItem('data-color-mode');
  const systemStyle = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return localStyle || systemStyle;
}

(() => {
  setTheme(currentTheme());
})();
