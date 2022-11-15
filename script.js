// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; // <div class="discussion__avatar--wrapper">
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content"; // <div class="discussion__content">
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered"; // <div class="discussion__answered">

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // avatarWrapper 조립
  const discussionAvatarImg = document.createElement("img");
  discussionAvatarImg.className =
    obj.id !== "" ? "discussion__avatar--image" : "newImg-circle";
  discussionAvatarImg.src = obj.avatarUrl;
  discussionAvatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(discussionAvatarImg);

  // discussionContent 조립
  const discussionLink = document.createElement("a");
  discussionLink.href = obj.url;
  discussionLink.target = "_blank";
  discussionLink.textContent = obj.title;
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionTitle.append(discussionLink);
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = obj.author + " / " + obj.createdAt;
  discussionContent.append(discussionTitle, discussionInfo);

  // discussionAnswered 조립
  const answerObj = obj.answer;
  const discussionAnswer = document.createElement("p");
  discussionAnswer.textContent = answerObj === null ? "x" : "☑";
  discussionAnswered.append(discussionAnswer);

  // append to li
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// Session
const form = document.querySelector("form.form");
const inputName = document.querySelector("input#name");
const inputTitle = document.querySelector("input#title");
const inputContent = document.querySelector("input#story");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // animation -> main
  const mainSpin = [
    { transform: 'rotate(0) scale(1)' },
    { transform: 'rotate(360deg) scale(0)' }
  ];
  const mainTiming = {
    duration: 700,
  }
  const main = document.querySelector('main');
  main.animate(mainSpin, mainTiming);

  let randomIdx = (max) => Math.floor(Math.random() * max);
  const newQuestion = {
    id: "",
    createdAt: new Date().toISOString(),
    title: "Search on Google: " + inputTitle.value,
    url: "https://www.google.com/search?q=" + inputContent.value,
    author: inputName.value,
    answer: null,
    bodyHTML: inputContent.value,
    avatarUrl: profileImgArray[randomIdx(profileImgArray.length)],
  };
  agoraStatesDiscussions.unshift(newQuestion);
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));

  // 초기화
  inputName.value = "";
  inputTitle.value = "";
  inputContent.value = "";

  // 저장
});


// 질문 작성 애니메이션
// const divInputName = document.querySelector("div.form__input--name");
// const divInputTitle = document.querySelector("div.form__input--title");
// inputContent.addEventListener("focus", (e) => {
//   divInputName.classList.add("display-none");
//   divInputTitle.classList.add("display-none");
//   inputContent.classList.add("w100-h100");
// });
// inputContent.addEventListener("blur", (e) => {
//   divInputName.classList.remove("display-none");
//   divInputTitle.classList.remove("display-none");
//   inputContent.classList.remove("w100-h100");
// });

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
