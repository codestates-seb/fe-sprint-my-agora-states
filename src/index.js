import './style.css';
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);
let agoraStatesDiscussions;

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 아바타 영역
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 콘텐츠 영역
  const titleName = document.createElement('h2');
  titleName.className = "discussion__title";
  const titleLink = document.createElement('a');
  titleLink.setAttribute("href",obj.url);
  // titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  titleName.append(titleLink);

  const information = document.createElement('div');
  information.className = "discussion__information";
  information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(titleName, information);

  // 체크박스 영역
  const answered_emoji = document.createElement('p');
  answered_emoji.className = "discussion__answered";
  answered_emoji.textContent = obj.answer ? '☑' : '☒';
  discussionAnswered.append(answered_emoji);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
// render(ul);

const form = document.querySelector('.form');
let elName =  document.querySelector('.form__input--name > input');
let elTitle =  document.querySelector('.form__input--title > input');
let elStory =  document.querySelector('.form__textbox > textarea');

form.addEventListener('submit', (event) =>{
  // 새로고침 발생하지 않게
  event.preventDefault();
  let newDisscussion = new Object();
  newDisscussion.id = "unique number";
  newDisscussion.author = elName.value;
  newDisscussion.title = elTitle.value;
  newDisscussion.createdAt = new Date();
  newDisscussion.answer = null;
  newDisscussion.avatarUrl = 'https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4';
  agoraStatesDiscussions.unshift(newDisscussion);
  ul.prepend(convertToDiscussion(newDisscussion));
  // console.log(agoraStatesDiscussions);
  elTitle.value = "";
  elStory.value = "";
  elName.value = "";
})

fetch('http://localhost:4000/discussions')
.then(res => res.json())
.then(discussions => {
  agoraStatesDiscussions = discussions;
  // console.log(agoraStatesDiscussions);
  const ul = document.querySelector("ul.discussions__container");
  render(ul);
})