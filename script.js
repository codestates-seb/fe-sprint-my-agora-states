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
  // Avatar
  const avatar = document.createElement("img");
  avatar.className = "discussion__avatar--image";
  avatar.setAttribute("src", obj.avatarUrl);
  avatarWrapper.append(avatar);

  // Content
  const contentTitle = document.createElement("h2");
  const contentLink = document.createElement("a");
  const contentInfo = document.createElement("div");
  contentTitle.classList = "discussion__title";
  contentInfo.classList = "discussion__information";
  contentTitle.append(contentLink);
  discussionContent.append(contentTitle, contentInfo);
  contentLink.textContent = obj.title;
  contentLink.setAttribute("href", obj.url);
  contentLink.setAttribute("target", "_blank");
  contentInfo.textContent = `${obj.author} / ${obj.createdAt}`;

  // Answered
  const answered = document.createElement("p");
  discussionAnswered.append(answered);
  if (!(obj.answer === null)) {
    answered.textContent = "☑";
  }

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

// saveDiscussion 로컬 스토리지에 디스커션 저장하는 함수
const saveDiscussion = () => {
  localStorage.setItem("Discussions", JSON.stringify(agoraStatesDiscussions));
};

const createNewDiscussion = (name, title) => {
  const newDiscussion = {};

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  newDiscussion.createdAt = `${year}-${month}-${day} 
  ${hours}:${minutes}:${seconds}`;
  newDiscussion.title = title;
  newDiscussion.url = "";
  newDiscussion.author = name;
  newDiscussion.answer = null;
  newDiscussion.avatarUrl =
    "https://avatars.githubusercontent.com/u/87750478?s=64&v=4";

  return newDiscussion;
};

// input form
const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputName = document.querySelector(".form__input--name input");
  const inputTitle = document.querySelector(".form__input--title input");
  const inputTextbox = document.querySelector(".form__textbox textarea");

  const name = inputName.value;
  const title = inputTitle.value;

  inputName.value = "";
  inputTitle.value = "";
  inputTextbox.value = "";

  const newDiscussion = createNewDiscussion(name, title);
  agoraStatesDiscussions.unshift(newDiscussion);
  ul.prepend(convertToDiscussion(newDiscussion));
  saveDiscussion();
});

const discussions = localStorage.getItem("Discussions");
if (discussions) {
  const parsedDiscussions = JSON.parse(discussions);
  agoraStatesDiscussions = parsedDiscussions;
} else {
  localStorage.setItem("Discussions", JSON.stringify(agoraStatesDiscussions));
}

const ul = document.querySelector("ul.discussions__container");
render(ul);
