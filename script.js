// import { v4 as uuid4 } from 'uuid'; // .js 붙여야되는데...? 바닐라에서는 npm 모듈을 사용하지 못하나...?
import { v4 as uuid4 } from 'https://jspm.dev/uuid';
import { $, $$ } from './utils/selector.js';

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const likeBtnWrapper = document.createElement('div');
  likeBtnWrapper.className = 'discussion__like';
  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  const discussionContents = document.createElement('div');

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  likeBtnWrapper.innerHTML = `
  <button>좋아요</button>
  <span>0</span>
  `;
  avatarWrapper.innerHTML = `
  <img class="discussion__avatar--image"
  src="${obj.avatarUrl}"
  alt="avatar">
  `;

  discussionContent.innerHTML = `
  <h2 class="discussion__title"><a href="${obj.url}">${obj.title}</a></h2>
  <div class="discussion__information">${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}</div>
  `;

  discussionAnswered.innerHTML = answerButton(obj);

  discussionContents.innerHTML = `
    ${obj.bodyHTML};
  `;

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 답변 여부의 따라 버튼의 컴포넌트를 렌더링 합니다.
const answerButton = ({ answer }) => {
  return `
    <div class="discussion__answered--state">
    <span class="elipse" style="${
      answer !== null ? '' : 'background-color:red'
    }"></span>
    <span class="text">${answer !== null ? '답변완료' : '미답변'}</span>
  </div>
  `;
};

// 디스커션 추가

const localStorage = window.localStorage; // 로컬스토리지 객체 생성

const addDiscussionHandler = (e) => {
  e.preventDefault();
  // console.log(e.target);

  const author = e.target[0].value;
  const title = e.target[1].value;
  const bodyHTML = e.target[2].value;
  const createdAt = new Date();
  const answer = null;
  const avatarUrl = 'https://avatars.githubusercontent.com/u/87750478?s=64&v=4';

  const newDiscussion = {
    id: uuid4(),
    createdAt,
    title,
    url: '#',
    author,
    answer,
    bodyHTML,
    avatarUrl,
  };

  agoraStatesDiscussions.unshift(newDiscussion);
  // ul.prepend(convertToDiscussion(newdiscussion));
  render(ul);
  pagination(1);

  localStorage.setItem(newDiscussion.id, JSON.stringify(newDiscussion));

  e.target[0].value = '';
  e.target[1].value = '';
  e.target[2].value = '';
};

// Advanced Challenge - Pagenation
// let currentPage = 1;
const limit = 10; // 한 페이지 당 보여줄 discussion
const elDiscussionPagination = $('.discussion__pagination');

const pagination = (currentPage) => {
  const totalCount = agoraStatesDiscussions.length;
  let totalPage = Math.ceil(totalCount / limit);

  let html = `
  <button class='pagination__prev' data-fn='prev'><</button>
  <div class="pagination__wrapper">
    <span class="pagination__current">${
      currentPage < 10 ? '0' + currentPage : currentPage
    }</span> / ${totalPage}
  </div>
  <button class='pagination__next' data-fn='next'>></button>
  `;

  elDiscussionPagination.innerHTML = html;

  const paginationBtns = $$('.discussion__pagination button');

  paginationBtns.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.dataset.fn === 'prev') {
        currentPage = currentPage - 1 <= 0 ? 1 : currentPage - 1;
      } else if (button.dataset.fn === 'next') {
        currentPage =
          currentPage + 1 >= totalPage ? totalPage : currentPage + 1;
      }
      pagination(currentPage);
      render(ul, (currentPage - 1) * limit);
    });
  });
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, startIndex = 0) => {
  element.innerHTML = '';
  for (let i = startIndex; i < startIndex + 10; i += 1) {
    if (i >= agoraStatesDiscussions.length) break;
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }

  return element;
};

// navbar 요소
const navbar = $('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
const newDiscussionBtn = $('#navbar .navbar__btn__wrapper .navbar__btn--add');

document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = $('ul.discussions__container');

// form 요소
const elFormContainer = $('.form__container');
const formHeight = elFormContainer.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  let opacity = 1 - window.scrollY / formHeight;
  elFormContainer.style.opacity = opacity;

  if (opacity < 0) {
    newDiscussionBtn.style.opacity = 1;
  } else {
    newDiscussionBtn.style.opacity = 0;
  }
});

const elDiscussionForm = $('.form');
elDiscussionForm.addEventListener('submit', addDiscussionHandler);

// init
if (localStorage.length > 0) {
  const uuids = Object.keys(localStorage);
  for (let i = 0; i < localStorage.length; i++) {
    agoraStatesDiscussions.unshift(JSON.parse(localStorage.getItem(uuids[i])));
  }
  render(ul);
  pagination(1);
} else {
  render(ul);
  pagination(1);
}

// modal 요소
const elFormModal = $('.form__modal');
const elFormModalCloseBtn = $('.form__btn--close');
const elFormModalSubmit = $('.form__modal .form');
const dim = $('.dim');
newDiscussionBtn.addEventListener('click', () => {
  dim.style.display = 'block';
  elFormModal.style.display = 'block';
});
elFormModalCloseBtn.addEventListener('click', () => {
  dim.style.display = 'none';
  elFormModal.style.display = 'none';
});
elFormModalSubmit.addEventListener('submit', (event) => {
  dim.style.display = 'none';
  elFormModal.style.display = 'none';

  addDiscussionHandler(event);

  e.target[0].value = '';
  e.target[1].value = '';
  e.target[2].value = '';
});
