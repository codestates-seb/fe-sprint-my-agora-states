const main = document.querySelector("main");
main.addEventListener("click", () =>
  document.querySelector(".avatar-select-menu").classList.add("hide")
);
// search
const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".btn-search");
// avatar
const myAvatar = document.querySelector("#myAvatar");
const defaultAvatarSrc =
  "avatar" in localStorage
    ? localStorage.getItem("avatar")
    : "./src/images/defaultAvatar.png";
const presetAvatarMenu = document.querySelector(
  "li.avatar-select-menu__preset"
);
const presetAvatarSrc = "src/images/mokokos/mokoko0";
const btnClearAvatar = document.querySelector(".btn-clear-avatar");
const btnClearLocal = document.querySelector(".btn-clear-local");
// input form
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const divQuestion = document.querySelector("#story");
const btnSubmit = document.querySelector("#questionSubmit");
// dialog
const btnOpenForm = document.querySelector("#btn-open-form");
const dialog = document.querySelector("#dialog");
const textbox = document.querySelector(".form__textbox");
const btnClose = document.querySelector("#btn-close");
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
// local storage
/*
const localStorageDiscussions =
  "discussions" in localStorage
    ? JSON.parse(localStorage.getItem("discussions"))
    : [];

const updateLocalStorage = (discussion) => {
  localStorageDiscussions.push(discussion);
  localStorage.setItem("discussions", JSON.stringify(localStorageDiscussions));
};
*/
const localStorageDiscussions = [];
const agoraStatesDiscussions = [];
fetch("http://localhost:4000/discussions", { method: "GET" })
  .then((res) => res.json())
  .then((data) => {
    for (let discussion of data) {
      agoraStatesDiscussions.push(discussion);
    }
    render(ul);
  });

const loadPresetAvatar = () => {
  for (let i = 1; i < 5; i++) {
    let img = document.createElement("img");
    img.alt = "preset";
    img.src = `${presetAvatarSrc}${i}.png`;
    img.classList.add("avatar-preset");
    presetAvatarMenu.append(img);
    img.addEventListener("click", function (event) {
      myAvatar.src = event.target.currentSrc;
      localStorage.setItem("avatar", event.target.currentSrc);
    });
  }
  return;
};

// Date Transform Fuctions
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
    //discussion.createdAt = new Date();
    //discussion.avatarUrl = myAvatar.currentSrc;
    discussion.url = "";
    fetch("http://localhost:4000/discussions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(discussion),
    })
      .then((res) => res.json)
      .then((data) => addDiscussion(Object.assign(discussion, data)));
    // addDiscussion(discussion);
    // updateLocalStorage(discussion);
    inputName.value = null;
    inputTitle.value = null;
    divQuestion.innerHTML = null;
    dialog.close();
    return;
  }
};
// object to discussions__container
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions[0].answer);
const addDiscussion = (obj) => {
  const discussions = document.querySelector("ul.discussions__container");
  const li = convertToDiscussion(obj);
  discussions.prepend(li);
  agoraStatesDiscussions.push(obj);
};

const fillAvatarWrapper = (obj) => {
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // child
  const avatar = document.createElement("img");
  avatar.classList.add("discussion__avatar--image");
  avatar.src = obj.avatarUrl ? obj.avatarUrl : defaultAvatarSrc;
  avatarWrapper.append(avatar);
  return avatarWrapper;
};
const fillNameDate = (obj) => {
  const divNameDate = document.createElement("div");
  divNameDate.classList.add("discussion__name-date");
  const divName = document.createElement("div");
  divName.classList.add("discussion__name");
  const divDate = document.createElement("div");
  divDate.classList.add("discussion__date");
  //children
  const now = customDate(dateToObject(obj.createdAt));
  divName.textContent = obj.author;
  divDate.textContent = now;
  divNameDate.append(divName, divDate);
  return divNameDate;
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

  h2Title.append(aLink);
  discussionContent.append(h2Title);
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
  discussionAnswered.append(avatarWrapper);
  discussionAnswered.append(discussionContent);
  return discussionAnswered;
};
const fillBodyHTML = (obj) => {
  const body = document.createElement("div");
  body.classList.add("discussion__body");
  body.classList.add("hide");
  body.setHTML(obj.bodyHTML);
  return body;
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const divInformation = document.createElement("div");
  const sponsor = document.createElement("div");
  sponsor.classList.add("discussion__sponsor");
  const avatarWrapper = fillAvatarWrapper(obj);
  const divNameDate = fillNameDate(obj);
  divInformation.classList.add("discussion__information");
  const body = fillBodyHTML(obj);
  // obj 안에 answer 있는 경우에만 함수 호출 => undefined는 나중에 꾸밀 때 조정하기
  const discussionAnswered = obj.answer ? fillDiscussionAnswered(obj) : void 0;
  const discussionContent = fillDiscussionContent(obj);
  divInformation.append(sponsor, avatarWrapper, divNameDate);
  if (discussionAnswered) {
    const p = document.createElement("p");
    p.textContent = "✅";
    divInformation.append(p);
    li.append(discussionAnswered);
  } else {
    const p = document.createElement("p");
    p.textContent = "☑️";
    divInformation.append(p);
  }
  li.prepend(body);
  li.prepend(discussionContent);
  li.prepend(divInformation);
  li.addEventListener("click", onDiscussionClick);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // localStorage rendering
  for (let i = localStorageDiscussions.length - 1; i > -1; i -= 1) {
    element.append(convertToDiscussion(localStorageDiscussions[i]));
  }
  // data rendering
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};
// search 버튼
btnSearch.addEventListener("click", function () {
  const id = inputSearch.textContent;
  const url = `http://localhost:4000/discussions/${id}`;
  fetch(url, { method: "GET" })
    .then((res) => res.json())
    .then((data) => {
      agoraStatesDiscussions.push(data);
      render(data);
    });
});
// modal 관련
btnOpenForm.addEventListener("click", function () {
  dialog.showModal();
});
textbox.addEventListener("click", function () {
  const story = document.querySelector("#story");
  story.click();
});
btnClose.addEventListener("click", function (event) {
  event.preventDefault();
  dialog.close();
});
// avatar + local storage
myAvatar.addEventListener("click", function () {
  const avatarSelectMenu = document.querySelector(".avatar-select-menu");
  avatarSelectMenu.classList.toggle("hide");
});
btnClearAvatar.addEventListener("click", function () {
  myAvatar.src = "./src/images/defaultAvatar.png";
});
btnClearLocal.addEventListener("click", () => localStorage.clear());

btnSubmit.addEventListener("click", onBtnSubmitClick);
// discussion container
const onDiscussionClick = (event) => {
  let node = event.target;
  while (node.tagName !== "LI") {
    node = node.parentElement;
  }
  const body = node.querySelector(".discussion__body");
  body.classList.toggle("hide");
};
// avatar preset 불러오기
loadPresetAvatar();
myAvatar.src = defaultAvatarSrc;
