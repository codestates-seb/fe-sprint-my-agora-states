// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

let localData = JSON.parse(localStorage.getItem(agoraStatesDiscussions));

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 작성자 프로필
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  // 프로필 이미지 넣기
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avatarImage);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionContentTitle = document.createElement("h2");
  discussionContentTitle.className = "discussion__title";
  const discussionContentUrl = document.createElement("a");
  discussionContentUrl.href = obj.url;
  discussionContentUrl.textContent = obj.title;
  const discussionContentInfo = document.createElement("div");
  discussionContentInfo.className = "discussion__information";
  let day = new Date(obj.createdAt).toISOString().split("T")[0];
  let time = new Date(obj.createdAt).toISOString().split("T")[1].split(".")[0];
  discussionContentInfo.textContent = `${obj.author} / ${day} ${time}`;
  discussionContentTitle.append(discussionContentUrl);
  discussionContent.append(discussionContentTitle, discussionContentInfo);

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionAnsweredBox = document.createElement("p");
  if (obj.answer !== null) discussionAnsweredBox.textContent = "☑️";
  else discussionAnsweredBox.textContent = "❌";
  discussionAnswered.append(discussionAnsweredBox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const render = (element, currentPage, limit) => {
  let start = currentPage * 5 - 5;
  let renderData = dataSetup(localData);
  for (let i = start; i < start + limit; i += 1) {
    element.append(convertToDiscussion(renderData[i]));
  }
  return;
};

const openFormButton = document.querySelector(".open__form");
const formContainer = document.querySelector(".form__container");

openFormButton.addEventListener("click", function (event) {
  const target = event.target;
  const buttonContent = target.textContent;

  if (buttonContent === "질문 등록하기") {
    formContainer.classList.remove("hide");
    openFormButton.textContent = "질문 등록 숨기기";

    window.scrollTo(0, 0);
  }

  if (buttonContent === "질문 등록 숨기기") {
    formContainer.classList.add("hide");
    openFormButton.textContent = "질문 등록하기";
  }
});

const resetHomeButton = document.querySelector(".reset__home");
resetHomeButton.addEventListener("click", function (event) {
  window.scrollTo(0, 0);
});

const formSubmit = document.querySelector("form.form");
let inputName = formSubmit.querySelector("div.form__input--name > input");
let inputTitle = formSubmit.querySelector("div.form__input--title > input");
let inputTextBox = formSubmit.querySelector("div.form__textbox > textarea");

formSubmit.addEventListener("submit", function (event) {
  event.preventDefault();

  let id = uuidv4();

  const obj = {
    id,
    createdAt: new Date().toISOString(),
    title: inputTitle.value,
    author: inputName.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/6",
    answer: null,
    bodyHTML: inputTextBox.value,
    avatarUrl:
      "https://cdn.imweb.me/upload/S201712205a3a0910b89f5/9e19def61ad24.jpg",
  };

  localData.unshift(obj);

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  render(ul, currentPage, limit);

  window.scrollTo(0, 0);
});

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function dataSetup(data) {
  if (data.length === 0) data = agoraStatesDiscussions;
  localStorage.setItem(agoraStatesDiscussions, JSON.stringify(data));
  return JSON.parse(localStorage.getItem(agoraStatesDiscussions));
}

let currentPage = 1;
let limit = 5;
let pageCount = 5;
let totalCount = localData.length;
let totalPage = Math.ceil(totalCount / limit);
let pageGroup = Math.ceil(currentPage / pageCount);

function pagination(currentPage, limit) {
  currentPage = Number(currentPage);
  render(ul, currentPage, limit);
}

function paginationButton(element, currentPage, totalPage, pageGroup) {
  console.log(totalPage, pageGroup);

  let start = pageGroup * 5 - 4;
  let last = pageGroup * 5;

  if (totalPage < last) last = totalPage;

  const left = document.createElement("button");
  left.className = "left__button";
  left.textContent = "<";

  element.append(left);

  for (let i = start; i <= last; i++) {
    const button = document.createElement("button");
    button.className = "page__button";
    button.textContent = i;
    element.append(button);
  }

  const right = document.createElement("button");
  right.className = "right__button";
  right.textContent = ">";
  element.append(right);
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
const buttonUl = document.querySelector("ul.buttons__container");
pagination(currentPage, limit);
paginationButton(buttonUl, currentPage, totalPage, pageGroup);

const pageButton = document.querySelector(".page__buttons");
pageButton.addEventListener("click", function (event) {
  const target = event.target;
  const buttonContent = target.textContent;

  currentPage = buttonContent;

  if (buttonContent.indexOf("<")) {
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }

    pagination(buttonContent, limit);
  }
});
