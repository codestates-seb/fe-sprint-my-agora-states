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
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement("h2");
  contentTitle.className = "discussion__title";

  const contentInfo = document.createElement("div");
  contentInfo.className = "discussion__infomation";
  contentInfo.textContent = `${obj.author} / ${obj.createdAt}`;

  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;

  contentTitle.append(titleAnchor);
  discussionContent.append(contentTitle, contentInfo);

  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "✔️" : "❌";
  discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const formTag = document.querySelector("form.form");
const newName = document.querySelector("input#name");
const newTitle = document.querySelector("input#title");
const newP = document.querySelector("input#story");

formTag.addEventListener("submit", (e) => {
  e.preventDefault();
  const newQuestion = {
    id: "D_kwDOHOApLM4APfUN",
    createdAt: new Date(),
    title: newTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/24",
    author: newName.value,
    bodyHTML: newP.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/104333249?s=64&v=4",
  };
  ul.prepend(convertToDiscussion(newQuestion));
  newName.value = "";
  newTitle.value = "";
  newP.value = "";
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
