function showSources() {
  document.querySelectorAll('section').forEach(s => {
    if (s.querySelector('.to') && s.querySelector('.from')) {
      s.querySelector('.to').textContent =
      s.querySelector('.from').outerHTML.replace(/\n\s+/g, '\n')
    }
  })
}
