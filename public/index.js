const toggleButton = document.getElementById('toggle-button');
const data = document.getElementById('data');

toggleButton.addEventListener('click', () => {
  if (data.style.display === 'none') {
    data.style.display = 'block';
    toggleButton.textContent = 'Hide Saved Events';
  } else {
    data.style.display = 'none';
    toggleButton.textContent = 'Show Saved Events';
  }
});
