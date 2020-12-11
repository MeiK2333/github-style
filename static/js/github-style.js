function switchTheme() {
  const currentStyle = currentTheme();

  if (currentStyle == 'light') {
    setTheme('dark');
  }
  else {
    setTheme('light');
  }
}

function setTheme(style) {
  console.log(`set theme ${style}`);
  document.documentElement.setAttribute('data-theme', style);
  localStorage.setItem('data-theme', style);
}

function currentTheme() {
  const localStyle = localStorage.getItem('data-theme');
  const systemStyle = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return localStyle || systemStyle;
}

(() => {
  setTheme(currentTheme());
})();