import DiscussionItem from './components/DiscussionItem.js';

window.localStorage.getItem('discussions') === null &&
  window.localStorage.setItem(
    'discussions',
    JSON.stringify(agoraStatesDiscussions)
  );

const getLocalDiscussions = () => {
  const localDiscussions = window.localStorage.getItem('discussions');
  return JSON.parse(localDiscussions);
};

const addDiscussion = (discussion) => {
  const localDiscussions = getLocalDiscussions();
  localDiscussions.unshift(discussion);
  window.localStorage.setItem('discussions', JSON.stringify(localDiscussions));
};
const deleteDiscussion = (id) => {
  const localDiscussions = getLocalDiscussions();
  const newDiscussions = localDiscussions.filter(
    (discussion) => discussion.id !== id
  );
  window.localStorage.setItem('discussions', JSON.stringify(newDiscussions));
};

let discussions = getLocalDiscussions();

const syncDiscussion = () => {
  discussions = getLocalDiscussions();
};

// 페이지 정보
const pageStore = {
  _currentPage: 1,
  _totalPage: 1,
  perPage: 10,
  setCurrentPage(page) {
    this._currentPage = page;
  },
  getCurrentPage() {
    return this._currentPage;
  },
  setTotalPage(length) {
    this._totalPage = Math.ceil(length / this.perPage);
  },
  getTotalPage() {
    return this._totalPage;
  },
};

// Discussion 렌더링
const discussion = document.querySelector('ul.discussions__container');
const renderDiscussion = () => {
  if (discussions.length === 0) {
    discussion.innerHTML = '<p>등록된 질문이 없습니다.</p>';
    return;
  }
  const fragment = document.createDocumentFragment();
  discussion.innerHTML = '';
  const startIndex = (pageStore.getCurrentPage() - 1) * pageStore.perPage;
  const endIndex = pageStore.getCurrentPage() * pageStore.perPage;
  for (let i = startIndex; i < endIndex; i += 1) {
    if (i >= discussions.length) {
      break;
    }
    const discussionItem = new DiscussionItem({
      className: 'discussion__container',
      props: discussions[i],
    }).el;
    fragment.appendChild(discussionItem);
  }
  discussion.appendChild(fragment);
  return;
};

// 게시글 등록
const submitBtnEl = document.querySelector('input[type="submit"]');
const authorEl = document.getElementById('author');
const titleEl = document.getElementById('title');
const textareaEl = document.getElementById('story');

submitBtnEl.addEventListener('click', (e) => {
  e.preventDefault();
  if (authorEl.value === '') {
    alert('작성자를 입력해주세요.');
    return;
  }
  if (titleEl.value === '') {
    alert('제목을 입력해주세요.');
    return;
  }
  if (textareaEl.value === '') {
    alert('내용을 입력해주세요.');
    return;
  }
  postDiscussion(authorEl.value, titleEl.value, textareaEl.value);
  titleEl.value = '';
  textareaEl.value = '';
  alert('질문이 등록되었습니다.');
});

const postDiscussion = (author, title, body) => {
  const date = new Date();
  const newDiscussion = {
    id: author + date,
    createdAt: date.toISOString(),
    title,
    url: 'javascript:void(0)',
    author,
    answer: null,
    bodyHTML: body,
    avatarUrl: 'https://avatars.githubusercontent.com/u/60064471?v=4',
  };
  addDiscussion(newDiscussion);
  syncDiscussion();
  renderDiscussion();
};

// 페이지네이션
const pagination = document.querySelector('.pagination');
const renderPagination = () => {
  pagination.innerHTML = '';
  const fragment = document.createDocumentFragment();
  // 이전 페이지 이동 버튼
  if (pageStore.getCurrentPage() !== 1) {
    const prevPage = document.createElement('li');
    prevPage.textContent = '〈';
    prevPage.className = 'pagination__page pagination__page--move';
    prevPage.addEventListener('click', () => {
      pageStore.setCurrentPage(pageStore.getCurrentPage() - 1);
      renderPagination();
      renderDiscussion();
    });
    fragment.appendChild(prevPage);
  }

  // 페이지 버튼
  for (let i = 1; i <= pageStore.getTotalPage(); i += 1) {
    const page = document.createElement('li');
    page.className = 'pagination__page';
    page.textContent = i;
    if (i === pageStore.getCurrentPage()) {
      page.classList.add('pagination__page--active');
    }
    page.addEventListener('click', () => {
      pageStore.setCurrentPage(i);
      renderPagination();
      renderDiscussion();
    });
    fragment.appendChild(page);
  }

  // 다음 페이지 이동 버튼
  if (pageStore.getCurrentPage() !== pageStore.getTotalPage()) {
    const nextPage = document.createElement('li');
    nextPage.textContent = '〉';
    nextPage.className = 'pagination__page pagination__page--move';
    nextPage.addEventListener('click', () => {
      pageStore.setCurrentPage(pageStore.getCurrentPage() + 1);
      renderPagination();
      renderDiscussion();
    });
    fragment.appendChild(nextPage);
  }
  pagination.appendChild(fragment);
};

// 최초 렌더링
pageStore.setTotalPage(discussions.length);
renderPagination();
renderDiscussion();
