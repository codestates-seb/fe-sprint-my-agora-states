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
  const face = document.createElement("img"); // 프로필 사진
  face.src = obj.avatarUrl;
  face.alt = "avatar of" + obj.author;
  face.width = "50";
  face.height = "50";
  avatarWrapper.append(face);

  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  discussionContent.append(discussionTitle);

  //시간 표시 형식 변경
  const discussionInfo = document.createElement("div");
  discussionInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString("ko-KR", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  })}`;
  discussionContent.append(discussionTitle, discussionInfo);

  //답변 체크
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑︎" : "☒";
  discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//Data.js 파일에 배열에 집어 넣는 함수
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링
const ul = document.querySelector("ul.discussions__container");
render(ul);
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");
const discussionUI = document.querySelector(".discussions__container");

const discussionCreate = function () {
  const now = new Date().toISOString();

  const newDiscussion = {
    author: author.value,
    title: title.value,
    story: textbox.value,
    createdAt: now,
    avatarUrl: "myimg.png",
  };
  agoraStatesDiscussions.unshift(newDiscussion);

  const newDiscussionEl = convertToDiscussion(newDiscussion);
  discussionUI.prepend(newDiscussionEl);

  const objToStr = JSON.stringify(newDiscussion);
  localStorage.setItem(newDiscussion.author, objToStr);
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("제출!!!!!!!!!!!!!!!!!!!!!!!");
  console.log(author.value, title.value, textbox.value);
  discussionCreate();
});
