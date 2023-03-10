// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// // convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// const convertToDiscussion = (obj) => {
//   const li = document.createElement("li"); // li 요소 생성
//   li.className = "discussion__container"; // 클래스 이름 지정

//   const avatarWrapper = document.createElement("div");
//   avatarWrapper.className = "discussion__avatar--wrapper";
//   const discussionContent = document.createElement("div");
//   discussionContent.className = "discussion__content";
//   const discussionAnswered = document.createElement("div");
//   discussionAnswered.className = "discussion__answered";

//   // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

//   li.append(avatarWrapper, discussionContent, discussionAnswered);
//   return li;
// };

// // agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
// render(ul);
/* ------------------------------ querySelector ----------------------------- */
const discussionsContainer = document.querySelector('.discussions__container');
const $form = document.querySelector('.form');

/* -------------------------------- function -------------------------------- */

const convertDateTime = (date) => {
  // return format: Fri Apr 22 2022 23:08:33 GMT+0900 -> '2022-04-22 14:08:33'
  // return new Date(date).toString().replace('T', ' ').slice(0, -5);
  const DATE = new Date(date);
  const DAY = ['일', '월', '화', '수', '목', '금', '토'];

  return `${DATE.getFullYear()}년 ${DATE.getMonth()}월 ${DATE.getDate()}일 ${DAY[DATE.getDay()]}요일`;
};

const render = () => {
  console.log('AGRA', agoraStatesDiscussions);
  discussionsContainer.innerHTML = `${agoraStatesDiscussions
    .map(
      ({ id, createdAt, title, url, author, answer, avatarUrl }) => `
      <li class="discussion__container">
        <div class="discussion__avatar--wrapper"> 
          <img class="discussion__avatar--image" src= "${avatarUrl}" />
        </div>
        <div class="discussion__content">
          <h2 class="discussion__title"><a href="${url}">${title}</a></h2>
          <div class="discussion__information">${author} / ${convertDateTime(createdAt)}</div>
        </div>
        <div class="discussion__answered"><p>${answer === null ? '❌' : '✅'}</p></div>
      </li>
    `
    )
    .join('')}`;
};

const setState = (newState) => {
  agoraStatesDiscussions = [newState, ...agoraStatesDiscussions];
  render();
};

const fetchTodo = () => {
  render();
};

/* ---------------------------- addEventListener ---------------------------- */
window.addEventListener('DOMContentLoaded', fetchTodo);

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  // const name = document.querySelector('#name').value;

  const questionForm = {
    id: Date.now() + '',
    createdAt: new Date().toISOString() + '',
    title: document.querySelector('#title').value,
    url: '#',
    author: document.querySelector('#name').value,
    answer: null,
    avatarUrl: 'https://zzsza.github.io/assets/img/me.jpeg',
  };

  setState(questionForm);

  document.querySelector('#title').value = '';
  document.querySelector('#name').value = '';
  document.querySelector('#story').value = '';
});
