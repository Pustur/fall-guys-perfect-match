// Functions
function removeFruitFromPlatform(platform) {
  platform.classList.remove(...[0, 1, 2, 3, 4, 5].map(num => `fruit-${num}`));
}

function keyDownHandler(e) {
  if (e.keyCode === R_KEYCODE) {
    platformButtons.forEach(removeFruitFromPlatform);
  }
}

function mouseDownHandler(e) {
  if (e.button === MOUSE_RIGHT) selectPlayerPlatform(e.currentTarget);

  if (e.button === MOUSE_LEFT) {
    const index = Array.from(e.target.parentNode.children).indexOf(e.target);

    removeFruitFromPlatform(e.currentTarget);

    if (e.target.tagName !== 'IMG') return;

    e.currentTarget.classList.add(`fruit-${index}`);
  }
}

function selectPlayerPlatform(clickedPlatform) {
  const hasClass = clickedPlatform.classList.contains('selected');

  platformButtons.forEach(button => {
    button.classList.remove('selected');
  });

  if (!hasClass) clickedPlatform.classList.add('selected');
}

function smoothScroll(e) {
  e.preventDefault();

  const href = e.currentTarget.getAttribute('href');
  const target = document.querySelector(href);

  window.scrollTo({
    top: target.offsetTop,
    left: window.screenLeft,
    behavior: 'smooth',
  });
}

// Variables
const MOUSE_LEFT = 0;
const MOUSE_RIGHT = 2;
const R_KEYCODE = 82;

// Cache DOM
const platforms = document.querySelector('.platforms');
const platformButtons = document.querySelectorAll('.platform');
const smoothLinks = document.querySelectorAll('a[href^="#"]');

// Events
window.addEventListener('keydown', keyDownHandler);

platforms.addEventListener('contextmenu', e => e.preventDefault());

platformButtons.forEach(button => {
  button.addEventListener('mousedown', mouseDownHandler);
  button.addEventListener('contextmenu', e => e.preventDefault());
});

smoothLinks.forEach(link => {
  link.addEventListener('click', smoothScroll);
});
