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
  <div class="discussion__information">${obj.author} / ${obj.createdAt}</div>
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
const addDiscussionHandler = (e) => {
  e.preventDefault();
  const author = e.target[0].value;
  const title = e.target[1].value;
  const bodyHTML = e.target[2].value;
  const createdAt = new Date().toLocaleTimeString();
  const answer = null;
  const avatarUrl = 'https://avatars.githubusercontent.com/u/87750478?s=64&v=4';

  const newdiscussion = {
    id: uuid4(),
    createdAt,
    title,
    url: '#',
    author,
    answer,
    bodyHTML,
    avatarUrl,
  };

  agoraStatesDiscussions.unshift(newdiscussion);
  ul.prepend(convertToDiscussion(newdiscussion));
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return element;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = $('ul.discussions__container');
// form 요소
const elDiscussionForm = $('.form');
elDiscussionForm.addEventListener('submit', addDiscussionHandler);

render(ul);
