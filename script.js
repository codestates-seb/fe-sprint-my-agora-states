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
  // 아바타
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  // discussion 콘텐츠
  const contentTitle = document.createElement("h2");
  const titleUrl = document.createElement("a");
  contentTitle.className = "discussion__title";
  titleUrl.href = obj.url;
  titleUrl.textContent = obj.title;
  contentTitle.append(titleUrl);

  const contentInfo = document.createElement("div");
  const createDate = new Date(obj.createdAt).toLocaleTimeString();
  contentInfo.className = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${createDate}`;
  discussionContent.append(contentTitle, contentInfo);

  // answered
  const answeredMark = document.createElement("p");
  if (obj.answer === null) {
    answeredMark.textContent = "🅇";
  } else {
    answeredMark.textContent = "🅅";
  }
  discussionAnswered.append(answeredMark);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  element.innerHTML = "";

  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 질문 폼
const questionForm = document.querySelector(".form__container form");
const formName = document.querySelector(".form__input--name input");
const formTitle = document.querySelector("div.form__input--title input");
const formContent = document.querySelector(".form__textbox #story");

function onFormSubmit(event) {
  event.preventDefault();

  const writeDate = new Date();

  agoraStatesDiscussions.unshift({
    createdAt: writeDate,
    title: formTitle.value,
    author: formName.value,
    bodyHTML: formContent.value,
  });

  console.log(agoraStatesDiscussions);
  render(ul);
}

questionForm.addEventListener("submit", onFormSubmit);
