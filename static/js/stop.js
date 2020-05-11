function stopClickEvent(selector) {
  const elements = document.querySelectorAll(selector);
  for (const current of elements) {
    current.onclick = (event) => {
      event.stopPropagation();
    }
  }
}

(() => {
  stopClickEvent('.day');
  stopClickEvent('.js-year-link');
})();
