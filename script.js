// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

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
  // 1. 이미지
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avatarImg);

  // 2. 제목
  const contentTitle = document.createElement("h2");
  const contentLink = document.createElement("a");
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  contentTitle.append(contentLink);
  discussionContent.append(contentTitle);

  // 3. 정보 (작성자, 날짜)
  const contentInformation = document.createElement("div");
  contentInformation.className = "discussion__information";
  contentInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionContent.append(contentInformation);

  // 4. 체크박스
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑︎" : "☒";
  discussionAnswered.append(checked);

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

// 질문 등록
const form = document.querySelector(".form");
const userName = document.querySelector(".form__input--name input");
const newTitle = document.querySelector(".form__input--title input");
const newTextbox = document.querySelector(".form__textbox textarea");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const obj = {
    id: "unique number",
    createdAt: new Date(),
    title: newTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: userName.value,
    answer: null,
    bodyHTML: newTextbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
  };

  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  userName.value = "";
  newTitle.value = "";
  newTextbox.value = "";
});
