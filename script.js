const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const divQuestion = document.querySelector("#story");
const imgAvatar = document.querySelector("#myAvatar");
const defaultAvatarSrc = "src/images/defaultAvatar.png";
const button = document.querySelector("#button");
const dialog = document.querySelector("#dialog");
button.addEventListener("click", () => {
  dialog.showModal();
});

imgAvatar.addEventListener("click", function () {
  const inputLoadAvatar = document.querySelector("#load-Avatar");
  inputLoadAvatar.click();
});
const localStorageDiscussions =
  "discussions" in localStorage
    ? JSON.parse(localStorage.getItem("discussions"))
    : [];
console.log(localStorageDiscussions);
const updateLocalStorage = (discussion) => {
  console.log(discussion);
  localStorageDiscussions.push(discussion);
  localStorage.setItem("discussions", JSON.stringify(localStorageDiscussions));
};
// Date Transform Fuctions
/* offset
const offsetDate = (date) => {
  const d = new Date("yy-mm-dd/hh:mm:ss");
  const offset = d.getTimezoneOffset();
  return d;
};
*/
const dateToObject = (str = new Date()) => {
  const d = new Date(str);
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1, // 조심하기
    day: d.getDate(),
    hour: d.getHours(),
    minute: d.getMinutes(),
  };
};

const customDate = (dataObj) => {
  const d = new Date();
  let date = "";
  if (dataObj.year === d.getFullYear()) {
    date = `${dataObj.month}월 ${dataObj.day}일 ${dataObj.hour}시 ${dataObj.minute}분`;
  } else {
    date = `${dataObj.year}년 ${dataObj.month}월 ${dataObj.day}일 ${dataObj.hour}시 ${dataObj.minute}분`;
  }
  return date;
};

const onBtnSubmitClick = (event) => {
  event.preventDefault();
  // 제출 버튼을 누를 때 inputName, inputTitle, textareaQuestion 의 value를 받아와서 새로운 질문 만들기
  const discussion = {};
  discussion.author = inputName.value;
  discussion.title = inputTitle.value;
  discussion.bodyHTML = divQuestion.innerHTML;
  // 하나라도 null이면 진행하지 않음
  if (discussion.author && discussion.title && discussion.bodyHTML) {
    discussion.createdAt = new Date();
    discussion.avatarUrl = imgAvatar.currentSrc;
    addDiscussion(discussion);
    updateLocalStorage(discussion);
    return;
  }
};

const btnSubmit = document.querySelector("#questionSubmit");
btnSubmit.addEventListener("click", onBtnSubmitClick);
// object to discussions__container
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions[0].createdAt);

const addDiscussion = (obj) => {
  const discussions = document.querySelector("ul.discussions__container");
  const li = convertToDiscussion(obj);
  discussions.insertBefore(li, discussions.children[0]);
  agoraStatesDiscussions.push(obj);
};

const fillAvatarWrapper = (obj) => {
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // child
  const avatar = document.createElement("img");
  avatar.src = obj.avatarUrl ? obj.avatarUrl : defaultAvatarSrc;
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
  const now = customDate(dateToObject(obj.createdAt));
  divInfo.textContent = `${obj.author} / ${now}`;

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
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const avatarWrapper = fillAvatarWrapper(obj);
  const discussionContent = fillDiscussionContent(obj);
  // obj 안에 answer 있는 경우에만 함수 호출 => undefined는 나중에 꾸밀 때 조정하기
  const discussionAnswered = obj.answer ? fillDiscussionAnswered(obj) : void 0;

  li.append(avatarWrapper, discussionContent);
  if (discussionAnswered) {
    li.append(discussionAnswered);
  }
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // localStorage rendering
  for (let i = localStorageDiscussions.length - 1; i > -1; i -= 1) {
    element.append(convertToDiscussion(localStorageDiscussions[i]));
  }
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
