function showSources() {
  document.querySelectorAll('section').forEach(s => {
    s.querySelector('.to').textContent =
      s.querySelector('.from').outerHTML.replace(/\n\s+/g, '\n')
  })
}
