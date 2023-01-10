import { qs, qsAll } from './utils.js';

const ITEM_COUNT_FOR_PAGE = 10;
const INITIAL_PAGE = 1;

export default function Discussions({ handleFilter, handlePage }) {
  this.currentPage = INITIAL_PAGE;

  this.listEl = qs('.discussions__list');
  this.filterEl = qs('.discussions__filter');
  this.pagenationEl = qs('.discussions__pagenation');

  this.filterEl.addEventListener('click', ({ target }) => {
    if (target.matches('.active') || !target.matches('.filter__btn')) return;

    qsAll('.filter__btn').forEach(btn => btn.classList.remove('active'));
    target.classList.add('active');
    this.currentPage = INITIAL_PAGE;

    handleFilter(target.textContent);
  });

  this.pagenationEl.addEventListener('click', ({ target }) => {
    if (target.matches('.active') || !target.matches('.page-btn')) return;

    const clickedPage = +target.textContent.trim();
    this.currentPage = clickedPage;

    handlePage();
  });

  this.templateItem = ({ createdAt, title, author, avatarUrl, answer }) => `
    <li class="discussion">
      <div class="discussion__content">
        <h4 class="discussion__title">${title}</h4>
        <div class="discussion__info">
          <span class="discussion__username">${author} asked on </span> ·
          <span class="discussion__create-date">${new Date(
            createdAt
          ).toDateString()}</span> ·
          <span class="discussion__is-answer ${answer ? 'answered' : ''}">
          ${answer ? 'Answered' : 'Unanswered'}
          </span>
        </div>
      </div>
      <div class="discussion__avatars">
        <img src="${avatarUrl}" alt=""/>
        ${answer ? `<img src=${answer.avatarUrl} alt="" />` : ''}
      </div>
      <div class="discussion__checked">
        <svg class="discussion__checked discussion__checked--${
          answer ? 'green' : 'gray'
        }" aria-hidden="true" width="20" height="20" viewBox="0 0 16 16" version="1.1" data-view-component="true">
          <path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM0 8a8 8 0 1116 0A8 8 0 010 8zm11.78-1.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z"></path>
        </svg>
      </div>
    </li>
  `;

  this.templatePagenation = pageCount => {
    return Array.from({ length: pageCount })
      .map((_, i) => {
        const page = i + 1;
        return `
        <button class='page-btn ${this.currentPage === page ? 'active' : ''}'>
          ${i + 1}
        </button>`;
      })
      .join('');
  };

  this.render = items => {
    const startIndex = (this.currentPage - 1) * ITEM_COUNT_FOR_PAGE;
    const renderItems = items.slice(startIndex, startIndex + ITEM_COUNT_FOR_PAGE);
    const listHTML = renderItems.map(itemData => this.templateItem(itemData)).join('');

    const pageCount = Math.ceil(items.length / ITEM_COUNT_FOR_PAGE);
    const pagenationHTML = this.templatePagenation(pageCount);

    this.listEl.replaceChildren();
    this.pagenationEl.replaceChildren();
    this.listEl.insertAdjacentHTML('beforeend', listHTML);
    this.pagenationEl.insertAdjacentHTML('beforeend', pagenationHTML);
  };
}
