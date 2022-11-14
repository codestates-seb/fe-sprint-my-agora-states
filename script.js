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
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement("h2");
  const contentLink = document.createElement("a");
  contentTitle.className = "discussion__title";
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  contentTitle.append(contentLink);
  discussionContent.append(contentTitle);

  const contentInfo = document.createElement("div");
  contentInfo.className = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(contentInfo);

  const contentAnswered = document.createElement("p");
  contentAnswered.className = "discussion__answered";
  contentAnswered.textContent = obj.answer ? "☑︎" : "☒";
  discussionAnswered.append(contentAnswered);

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

// 디스커션 추가 구현

// 문서 내용 가져오기.
const form = document.querySelector("form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

// submit을 클릭하면 자료를 가져옴
form.addEventListener("submit", (event) => {
  event.preventDefault(); //서브밋 이벤트로 사용시 꼭 함께 사용해주어야함
  const obj = {
    id: "new id",
    createdAt: new Date().toLocaleString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    bodyHTML: textbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  agoraStatesDiscussions.unshift(obj);
  const discussion = convertToDiscussion(obj);
  ul.prepend(discussion);
  event.target.reset();
});
