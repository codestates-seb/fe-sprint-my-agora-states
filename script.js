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

  // 제목
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const titleUrl = document.createElement("a");
  titleUrl.href = obj.url;
  titleUrl.textContent = obj.title;
  discussionTitle.append(titleUrl);

  // 작성 정보
  const information = document.createElement("div");
  information.className = "discussion__information";
  information.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionContent.append(discussionTitle, information);

  // 답변 여부
  const check = document.createElement("p");
  // if (obj.answer) {
  //   check.textContent = "☑";
  // }
  check.textContent = obj.answer ? "☑" : "";
  discussionAnswered.append(check);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//submit
const form = document.querySelector("form.form");
const inputName = document.querySelector("div.form__input--name > input");
const inputTitle = document.querySelector("div.form__input--title > input");
const inputStory = document.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const addObj = {
    id: "unique id",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: inputStory.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  agoraStatesDiscussions.unshift(addObj);
  const newDiscussion = convertToDiscussion(addObj);
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
