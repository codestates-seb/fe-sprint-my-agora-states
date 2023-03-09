const container = document.querySelector('.container');

container.addEventListener('click', function(event) {
  if (event.target.classList.contains('foldable-header')) {
    const content = event.target.nextElementSibling;
    if (content.style.display === 'none') {
      content.style.display = 'block';
    } else {
      content.style.display = 'none';
    }
  }
});