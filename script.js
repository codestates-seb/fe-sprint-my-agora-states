// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// Local Storage
if (!localStorage.getItem("dataSet")) {
  localStorage.setItem("dataSet", JSON.stringify(agoraStatesDiscussions));
}
const dataSet = JSON.parse(localStorage.getItem("dataSet"));
// localStorage.clear(); // Local Storage 초기화

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
  // Avatar Image
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  // Discussion Content - Title & URL
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionUrl = document.createElement("a");
  discussionUrl.href = obj.url;
  discussionUrl.textContent = obj.title;
  discussionTitle.append(discussionUrl);
  discussionContent.append(discussionTitle);

  // Discussion Content - Information
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionContent.append(discussionInfo);

  // Discussion Answered
  const checkAnswered = document.createElement("p");
  checkAnswered.textContent = obj.answer ? "☑︎" : "☒";
  if (checkAnswered.textContent === "☒") {
    checkAnswered.style.color = "#b9d7ea";
  }
  discussionAnswered.append(checkAnswered);

  // 답변 항목 추가(수정 예정)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// Input Form
const form = document.querySelector("form.form");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputQuestion = document.querySelector("#story");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Submit할 때 새로고침 막기
  const obj = {
    id: "randomValue",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  // 기존 배열 가장 앞에 추가하기
  dataSet.unshift(obj);
  localStorage.setItem("dataSet", JSON.stringify(dataSet));
  ul.prepend(convertToDiscussion(obj));

  // Submit 후 빈 값으로 바꾸기
  inputName.value = "";
  inputTitle.value = "";
  inputQuestion.value = "";
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < dataSet.length; i += 1) {
    element.append(convertToDiscussion(dataSet[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
