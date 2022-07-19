// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const dateToLocaleString = (dateString) => {
  let dt = new Date(dateString);
  return dt.toLocaleString();
};

const getLocalStorageData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const setBodyHTML = (text) => {
  let lines = text.split("\n");
  let resultString = "";
  for (let i = 0; i < lines.length; i++) {
    resultString += lines[i] + "<br>\n";
  }
  return DOMPurify.sanitize(`<p dir="auto">${resultString}</p>`);
};

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
  // avatarWrapper
  let avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avatarImage);

  // discussionContent
  let discussionTitle = document.createElement("h2");
  let discussionTitleLink = document.createElement("a");
  discussionTitle.className = "discussion__title";
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink);
  discussionContent.append(discussionTitle);

  let discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${dateToLocaleString(
    obj.createdAt
  )} ・ `;
  let discussionInformationSpan = document.createElement("span");
  discussionInformationSpan.textContent = obj.answer
    ? "Answered"
    : "Unanswered";
  if (obj.answer) {
    discussionInformationSpan.classList.add("active");
  } else {
    discussionInformationSpan.classList.remove("active");
  }
  discussionInformation.append(discussionInformationSpan);
  discussionContent.append(discussionInformation);

  // discussionAnswered
  let isDiscussionAnswered = document.createElement("img");
  isDiscussionAnswered.src = obj.answer
    ? "./img/answered.png"
    : "./img/unanswered.png";
  isDiscussionAnswered.alt = obj.answer ? "Answered" : "Unanswered";
  // let isDiscussionAnswered = document.createElement("p");
  // isDiscussionAnswered.textContent = obj.answer ? "☑" : "☒";
  discussionAnswered.append(isDiscussionAnswered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const onClickSubmitBtn = (event) => {
  // event.preventDefault();
  const { target } = event;
  const discussionArray = {
    id: `D_${Math.random().toString(36).substring(2)}`,
    createdAt: new Date().toISOString(),
    title: target[1].value,
    url: "#",
    author: target[0].value,
    answer: null,
    bodyHTML: setBodyHTML(target[2].value),
    avatarUrl: "https://joeschmoe.io/api/v1/random",
  };

  const localStorageJsonArray = getLocalStorageData("discussion_array");
  let JsonArray = [];
  if (!localStorageJsonArray) {
    JsonArray = [discussionArray];
  } else {
    JsonArray = [discussionArray, ...localStorageJsonArray];
  }

  localStorage.setItem("discussion_array", JSON.stringify(JsonArray));
};

const form = document.querySelector(".form__container > form");
form.addEventListener("submit", onClickSubmitBtn);

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  const localStorageJsonArray = getLocalStorageData("discussion_array");
  agoraStatesDiscussions.unshift(...localStorageJsonArray);

  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
