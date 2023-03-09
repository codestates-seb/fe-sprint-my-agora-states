// Date Transform Fuctions
/* offset
const offsetDate = (date) => {
  const d = new Date("yy-mm-dd/hh:mm:ss");
  const offset = d.getTimezoneOffset();
  return d;
};
*/
const dateToObject = (str) => {
  const d = new Date(str);
  return {
    year: d.getFullYear(),
    month: d.getMonth(),
    day: d.getDay(),
    hour: d.getHours(),
    minute: d.getMinutes(),
  };
};

// object to discussions__container
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions[0]);

const fillAvatarWrapper = (obj) => {
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // child
  const avatar = document.createElement("img");
  avatar.src = obj.avatarUrl;
  avatarWrapper.appendChild(avatar);
  return avatarWrapper;
};

const fillDiscussionContent = (obj) => {
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // children
  // h2 - discussion__title obj.title
  const h2Title = document.createElement("h2");
  // h2 > a - link and obj.title
  const aLink = document.createElement("a");
  aLink.href = obj.url;
  aLink.textContent = obj.title;
  // div - discussion__information obj.author, obj.createdAt
  const divInfo = document.createElement("div");
  obj.createdAt = getCustomDate(obj.createdAt);
  console.log(obj.createdAt);
  divInfo.textContent = `${obj.author} / ${obj.createdAt}`;

  h2Title.appendChild(aLink);
  discussionContent.appendChild(h2Title);
  discussionContent.appendChild(divInfo);
  return discussionContent;
};

const fillDiscussionAnswered = (obj) => {
  // obj 안의 obj와 동일한 구조를 가진 answer 객체에 대하여 작업 실행
  obj = obj.answer;
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered hide";
  // children
  const avatarWrapper = fillAvatarWrapper(obj);
  const discussionContent = fillDiscussionContent(obj);

  discussionAnswered.appendChild(avatarWrapper);
  discussionAnswered.appendChild(discussionContent);
  return discussionAnswered;
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  console.log(obj.answer);
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const avatarWrapper = fillAvatarWrapper(obj);
  const discussionContent = fillDiscussionContent(obj);
  // obj 안에 answer 있는 경우에만 함수 호출 => undefined는 나중에 꾸밀 때 조정하기
  const discussionAnswered = obj.answer ? fillDiscussionAnswered(obj) : void 0;

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
const ul = document.querySelector("ul.discussions__container");
render(ul);

const onBtnSubmitClick = (event) => {
  event.preventDefault();
  // 제출 버튼을 누를 때 name, title, question 등의 정보를 받아와서 새로운 질문 만들기
  const name = document.querySelector("#name");
  const title = document.querySelector("#title");
  const question = document.querySelector("#story");

  const discussion = {};
  discussion.author = name.value;
  discussion.title = title.value;
  discussion.bodyHTML = question.value;
  discussion.createdAt = getDate();
  discussion.avatarUrl = null;
  console.log(discussion);
  console.log(transformDate());
};

const btnSubmit = document.querySelector("#questionSubmit");
btnSubmit.addEventListener("click", onBtnSubmitClick);

//  obj 만들기

// 현재 시각 => obj.createdAt
