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

  // avatar
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  //title => a
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);
  const discussionTitleLink = document.createElement("a");
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink);

  //information
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = obj.author + " / " + obj.createdAt;
  discussionContent.append(discussionInformation);

  //answered
  const answered = document.createElement("p");
  const answeredIcon = document.createElement("i");
  answeredIcon.className = "fa-solid fa-circle-check";
  answered.append(answeredIcon);
  //const redIcon = (answered.style.color = "red");
  //const greenIcon = (answered.style.color = "green");

  if (obj.answer === null) {
    answered.style.color = "red";
    discussionAnswered.append(answered);
  } else {
    answered.style.color = "green";
    discussionAnswered.append(answered);
  }

  // //submit
  // const form = document.querySelector(".form");
  // const name = document.querySelector("#name");
  // const title = document.querySelector("#title");
  // const story = document.querySelector("#story");

  // const getInputValue = (event) => {
  //   alert("실패~!!!!!!!");
  //   event.preventDefault();
  //   let nameValue = name.value;
  //   let titleValue = title.value;

  //   discussionInformation.textContent = nameValue + " / " + date;
  //   discussionContent.append(discussionInformation);

  //   discussionTitleLink.textContent = titleValue;
  //   discussionTitle.append(discussionTitleLink);
  // };

  // const init = () => {
  //   form.addEventListener("submit", getInputValue);
  // };

  // init();

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

// const form = document.querySelector(".form");
// const username = document.querySelector("#name");
// const title = document.querySelector("#title");
// //const story = document.querySelector("#story");

// function addList(event) {
//   alert("실패~!!!!!!!");
//   event.preventDefault();
//   const newTitle = title.value;
//   const newInfo = username.value;
// }

// form.addEventListener("submit", addList);

//submit
const form = document.querySelector(".form");
const name = document.querySelector("#name");
const title = document.querySelector("#title");
const story = document.querySelector("#story");

const getInputValue = (event) => {
  alert("실패~!!!!!!!");
  event.preventDefault();
  let nameValue = name.value;
  let titleValue = title.value;

  discussionInformation.textContent = nameValue;
  discussionContent.append(discussionInformation);

  discussionTitleLink.textContent = titleValue;
  discussionTitle.append(discussionTitleLink);
};

const init = () => {
  form.addEventListener("submit", getInputValue);
};

init();

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
