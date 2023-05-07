import DiscussionItem from './components/DiscussionItem.js';
import {
  resetLocalDiscussions,
  getLocalDiscussions,
  addLocalDiscussion,
  deleteLocalDiscussion,
} from './model/localDiscussion.js';

// 디스커션 정보
const discussionStore = {
  _data: getLocalDiscussions(),
  getData() {
    return this._data;
  },
  updateData() {
    this._data = getLocalDiscussions();
  },
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
const discussionsContainerEl = document.querySelector(
  'ul.discussions__container'
);

const renderDiscussion = (discussions) => {
  if (discussions.length === 0) {
    discussionsContainerEl.innerHTML = '<p>등록된 질문이 없습니다.</p>';
    return;
  }
  const fragmentEl = document.createDocumentFragment();
  discussionsContainerEl.innerHTML = '';
  const startIndex = (pageStore.getCurrentPage() - 1) * pageStore.perPage;
  const endIndex = pageStore.getCurrentPage() * pageStore.perPage;

  for (let i = startIndex; i < endIndex; i += 1) {
    if (i >= discussions.length) {
      break;
    }
    const discussionItemEl = new DiscussionItem({
      className: 'discussion__container',
      props: discussions[i],
    }).el;

    const discussionRemoveEl = discussionItemEl.querySelector(
      '.discussion__remove'
    );
    discussionRemoveEl.addEventListener('click', () => {
      const isDelete = confirm('정말 삭제하시겠습니까?');
      if (isDelete) {
        deleteLocalDiscussion(discussions[i].id);
        discussionStore.updateData();
        renderDiscussion(discussionStore.getData());
        alert('삭제되었습니다.');
      }
    });

    fragmentEl.appendChild(discussionItemEl);
  }
  discussionsContainerEl.appendChild(fragmentEl);
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
  const date = new Date().toISOString();
  const newDiscussion = {
    id: author + date,
    createdAt: date,
    title,
    url: 'javascript:void(0)',
    author,
    answer: null,
    bodyHTML: body,
    avatarUrl: 'https://avatars.githubusercontent.com/u/60064471?v=4',
  };
  addLocalDiscussion(newDiscussion);
  discussionStore.updateData();
  renderDiscussion(discussionStore.getData());
};

// 페이지네이션
const paginationEl = document.querySelector('.pagination');
const renderPagination = () => {
  paginationEl.innerHTML = '';
  const fragmentEl = document.createDocumentFragment();
  // 이전 페이지 이동 버튼
  if (pageStore.getCurrentPage() !== 1) {
    const prevPageEl = document.createElement('li');
    prevPageEl.textContent = '〈';
    prevPageEl.className = 'pagination__page pagination__page--move';
    prevPageEl.addEventListener('click', () => {
      pageStore.setCurrentPage(pageStore.getCurrentPage() - 1);
      renderPagination();
      renderDiscussion(discussionStore.getData());
    });
    fragmentEl.appendChild(prevPageEl);
  }

  // 페이지 버튼
  for (let i = 1; i <= pageStore.getTotalPage(); i += 1) {
    const pageEl = document.createElement('li');
    pageEl.className = 'pagination__page';
    pageEl.textContent = i;
    if (i === pageStore.getCurrentPage()) {
      pageEl.classList.add('pagination__page--active');
    }
    pageEl.addEventListener('click', () => {
      pageStore.setCurrentPage(i);
      renderPagination();
      renderDiscussion(discussionStore.getData());
    });
    fragmentEl.appendChild(pageEl);
  }

  // 다음 페이지 이동 버튼
  if (pageStore.getCurrentPage() !== pageStore.getTotalPage()) {
    const nextPageEl = document.createElement('li');
    nextPageEl.textContent = '〉';
    nextPageEl.className = 'pagination__page pagination__page--move';
    nextPageEl.addEventListener('click', () => {
      pageStore.setCurrentPage(pageStore.getCurrentPage() + 1);
      renderPagination();
      renderDiscussion(discussionStore.getData());
    });
    fragmentEl.appendChild(nextPageEl);
  }
  paginationEl.appendChild(fragmentEl);
};

// 최초 렌더링
resetLocalDiscussions();
pageStore.setTotalPage(discussionStore.getData().length);
renderPagination();
renderDiscussion(discussionStore.getData());
