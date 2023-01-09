// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

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

  const data = {};
  data.createdAt = "2022-04-22T14:08:33Z";
  data.title = title;
  data.url = "";
  data.author = name;
  data.answer = null;
  data.avatarUrl =
    "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4";

  agoraStatesDiscussions.push(data);

  render(ul);
});

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; // image - avatarUrl
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content"; // title, info(author, createdAt)
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered"; // answered

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

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
