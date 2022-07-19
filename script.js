// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "d-flex discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  /*const avatarImage = document.createElement("img");
   avatarImage.src = agoraStatesDiscussions[i].avatarUrl;
    avatarImage.alt = 'avatar of' + agoraStatesDiscussions[i].author;
  avatarWrapper.append(avatarImage); */

  const discussionContent = document.createElement("div");
  discussionContent.className = "column-box discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // AgorastatesDisscussion에 세 개 div append
  //content title , url
  //answered answer 전부 0에서 끝까지 세기

  const avatarImage = document.createElement("img");
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = "avatar of" + obj.author;
  avatarImage.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImage);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";

  const discussionUrl = document.createElement("a");
  discussionUrl.textContent = obj.title;
  discussionUrl.href = obj.url;
  discussionUrl.className = "column_a";

  discussionTitle.append(discussionUrl);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = obj.author + "/" + obj.createdAt;

  discussionContent.append(discussionTitle, discussionInfo);

  const discussionAnswer = document.createElement("p");
  if (obj.answer === null) {
    discussionAnswer.textContent = "☒";
  } else {
    discussionAnswer.textContent = "☑";
  }
  discussionAnswered.append(discussionAnswer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector("form.form");
const userName = document.querySelector("div.form__input--name > input");
const userTitle = document.querySelector("div.form__input--title > input");
const textBox = document.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const obj = {
    id: "unique id",
    createdAt: new Date().toLocaleString(),
    title: userTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: userName.value,
    answer: null,
    bodyHTML: textBox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
  };

  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion);
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
