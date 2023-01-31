// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = obj => {
  const li = document.createElement("li");
  li.className = "discussion__container";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  // Avatar
  const avatar = document.createElement("img");
  avatar.className = "discussion__avatar--image";
  avatar.setAttribute("src", obj.avatarUrl);
  avatarWrapper.append(avatar);

  // Content
  const title = document.createElement("h2");
  title.classList = "discussion__title";

  const link = document.createElement("a");

  const infoContainer = document.createElement("div");
  infoContainer.classList = "discussion__information-container";

  const info = document.createElement("div");
  info.classList = "discussion__information";

  const answered = document.createElement("div");
  answered.className = "discussion__answered";

  infoContainer.append(info, answered);
  discussionContent.append(title, infoContainer);
  title.append(link);

  const parsedDate = new Date(obj.createdAt).toLocaleString("ko-kr");
  link.textContent = obj.title;
  info.textContent = `${obj.author} / ${parsedDate}`;

  link.setAttribute("href", obj.url);
  link.setAttribute("target", "_blank");

  // Answered
  const p = document.createElement("p");
  answered.append(p);
  if (obj.answer === null) {
    p.classList = "unanswered";
    p.textContent = "Unanswered";
  } else {
    p.classList = "answered";
    p.textContent = "Answered";
  }

  li.append(avatarWrapper, discussionContent);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = element => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  // return;
};

// saveDiscussion 로컬 스토리지에 디스커션을 저장하는 함수입니다.
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
form.addEventListener("submit", event => {
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

const discussions = localStorage.getItem("Discussions"); // localStorage.Discussions
if (discussions) {
  const parsedDiscussions = JSON.parse(discussions);
  agoraStatesDiscussions = parsedDiscussions;
} else {
  localStorage.setItem("Discussions", JSON.stringify(agoraStatesDiscussions));
}

const ul = document.querySelector("ul.discussions__container");
render(ul);

// Scroll event
const h1 = document.querySelector("h1");
const h1Height = h1.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > h1Height) {
    h1.classList.add("font-small");
  } else {
    h1.classList.remove("font-small");
  }
});

// Arrow up
const formContainer = document.querySelector(".form__container");
const formContainerHeight = formContainer.getBoundingClientRect().height;
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  const height = h1Height + formContainerHeight;
  if (window.scrollY > height) {
    arrowUp.classList.remove("visible");
  } else {
    arrowUp.classList.add("visible");
  }
});

arrowUp.addEventListener("click", () => {
  const main = document.querySelector("main");
  main.scrollIntoView({ behavior: "smooth" });
});

// Submit button
const textarea = document.querySelector("textarea");
textarea.addEventListener("keyup", event => {
  const submit = document.querySelector(".form__submit input");
  const value = event.target.value;
  if (value) {
    submit.classList.add("active");
  } else {
    submit.classList.remove("active");
  }
});
