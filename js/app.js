import {
  fetchState,
  addDiscussion,
  changePage,
  completeSubmit,
  changeModeState,
} from './state.js';

const $form = document.querySelector('.form');
const $nameInput = document.querySelector('#name');
const $titleInput = document.querySelector('#title');
const $discussionContainer = document.querySelector('.discussion__wrapper');
const $toggleButton = document.querySelector('.toggleButton');
const $goToTopButton = document.querySelector('.goToTopButton');

window.addEventListener('DOMContentLoaded', () => {
  fetchState();

  const OSMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

  localStorage.getItem('mode') ?? localStorage.setItem('mode', OSMode);
  const curentMode = localStorage.getItem('mode');

  changeModeState(curentMode);

  const transitionDuration =
    getComputedStyle(document.documentElement).getPropertyValue(
      '--transition-duration'
    ) * 1000;

  setTimeout(() => {
    document.body.classList.remove('hide');
  }, transitionDuration);
});

$form.addEventListener('submit', (e) => {
  e.preventDefault();

  const newDiscussion = {
    id: null,
    createdAt: new Date().toLocaleString(),
    title: $titleInput.value,
    url: '#',
    author: $nameInput.value,
    answer: null,
    avatarUrl: 'https://avatars.githubusercontent.com/u/101828759?v=4',
  };

  addDiscussion(newDiscussion);

  completeSubmit();

  $form.reset();
});

$discussionContainer.addEventListener('click', (e) => {
  if (e.target.tagName !== 'A') return;
  if (e.target.className !== 'discussion__Link') e.preventDefault();

  const moveValue = e.target.dataset.move;

  if (moveValue === 'toPage') changePage(Number(e.target.textContent));
  if (moveValue === 'toPrev') {
    const prevValue =
      Number(
        e.target.parentElement.nextElementSibling.firstElementChild.textContent
      ) - 1;

    changePage(prevValue);
  }
  if (moveValue === 'toNext') {
    const nextValue =
      Number(
        e.target.parentElement.previousElementSibling.firstElementChild
          .textContent
      ) + 1;

    changePage(nextValue);
  }
  if (moveValue === 'toFirst') changePage(1);
  if (moveValue === 'toLast') changePage('totalPage');
});

$toggleButton.addEventListener('click', () => {
  const currentMode =
    localStorage.getItem('mode') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('mode', currentMode);

  changeModeState(currentMode);
});

window.addEventListener(
  'scroll',
  _.throttle(() => {
    $goToTopButton.classList.toggle('moveDownAndHide', window.scrollY <= 500);
  }, 100)
);

$goToTopButton.addEventListener('click', () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});
