import {
  fetchState,
  addDiscussion,
  completeSubmit,
  changePage,
  changeFilter,
  changeModeState,
} from './state.js';

const $form = document.querySelector('.form');
const $idInput = document.querySelector('#name');
const $titleInput = document.querySelector('#title');
const $discussionContainer = document.querySelector('.discussion__wrapper');
const $discussionFilters = document.querySelector('.discussion__filters');
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
    id: $idInput.value,
    createdAt: new Date().toLocaleString(),
    title: $titleInput.value,
    url: '#',
    author: $idInput.value,
    answer: null,
    avatarUrl: `https://github.com/${$idInput.value}.png`,
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

$discussionFilters.addEventListener('click', (e) => 
  changeFilter(e.target.dataset.filter));

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
