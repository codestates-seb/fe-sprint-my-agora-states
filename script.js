// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

//sample시간 현지시간으로 바꾸기
const convertToTime = document.querySelector(".discussion__information");
convertToTime.textContent = `kimploo / ${new Date(
  "2022-04-22T14:08:33Z"
).toLocaleString()}`;

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className =
    obj.answer === null ? "discussion__unanswered" : "discussion__answered";

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionTitle.append(titleLink);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionContent.append(discussionInfo); // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const checkmark = document.createElement("p");
  checkmark.textContent = obj.answer === null ? "☒" : "☑︎";
  discussionAnswered.append(checkmark);

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

//이벤트 리스너
const form = document.querySelector(".form");
const enterName = document.querySelector(".form__input--name > input");
const titleName = document.querySelector(".form__input--title > input");
const question = document.querySelector(".form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault(); //submit을 눌렀을 때, 창 새로고침 방지

  //입력될 예시 객체를 하나 만들어서
  const obj = {
    id: "unique id", //순차적으로 올라감
    createdAt: new Date(),
    title: titleName.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: enterName.value,
    answer: null,
    bodyHTML: question.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  //그 객체를 convertToDiscussions에 첫번째 요소에 추가하여 넣어서 DOM으로 변환
  agoraStatesDiscussions.unshift(obj);
  console.log(agoraStatesDiscussions);
  //변환한 것을 render함수에 넣어서 브라우저에 렌더링
  ul.prepend(convertToDiscussion(obj)); //맨 앞에다 적용
  enterName.value = "";
  titleName.value = "";
  question.value = "";
});

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
