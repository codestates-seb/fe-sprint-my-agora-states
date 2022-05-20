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
  discussionInformation.textContent =
    obj.author + " / " + new Date(obj.createdAt).toLocaleTimeString();
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

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
  // ul.prepend + 로컬스토리지
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

const form = document.querySelector(".form");
const submitBtn = form.querySelector("#submit");

const username = form.querySelector("#name");
const title = form.querySelector("#title");
const story = form.querySelector("#story");
submitBtn.onclick = function (event) {
  alert("올리겠는가");
  event.preventDefault();
  let info = {
    createdAt: new Date(),
    title: title.value,
    answer: null,
    author: username.value,
    bodyHTML: story.value,
    avatarUrl: "https://kanghyew0n.github.io/assets/images/kangkkama.jpg",
  };

  agoraStatesDiscussions.push(info);

  localStorage.setItem(
    "agoraStatesDiscussions",
    JSON.stringify(agoraStatesDiscussions)
  );
  localDiscussions = JSON.parse(localStorage.getItem("agoraStatesDiscussions"));

  ul.prepend(
    convertToDiscussion(localDiscussions[localDiscussions.length - 1])
  );
};
