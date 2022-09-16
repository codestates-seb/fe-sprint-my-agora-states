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

  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);
  avatarImg.className = "discussion__avatar--image";

  const discussionTitle = document.createElement("h4");
  const title_anchor = document.createElement("a");
  title_anchor.href = obj.url;
  title_anchor.textContent = obj.title;
  discussionTitle.append(title_anchor);
  discussionTitle.className = "discussion__title";

  const discussion__write = document.createElement("div");
  discussion__write.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionContent.append(discussionTitle, discussion__write);
  discussion__write.className = "discussion__information";

  const checking = document.createElement("p");
  checking.textContent = obj.answer ? "☻" : "☾";
  discussionAnswered.append(checking);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector(".form");
const author = document.querySelector(".form__input--name > input");
const title = document.querySelector(".form__input--title > input");
const textArea = document.querySelector(".form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const obj = {
    id: "unique name",
    createdAt: new Date(),
    title: title.value,
    url: "https://google.com",
    author: author.value,
    avatarUrl: "profile.png",
  };
  agoraStatesDiscussions.unshift(obj);
  console.log(agoraStatesDiscussions);
  ul.prepend(convertToDiscussion(obj));
  title.value = "";
  author.value = "";
  textArea.value = "";
});

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
