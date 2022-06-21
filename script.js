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

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  const titleLink = document.createElement('a');
  titleLink.textContent = obj.title;
  titleLink.href = obj.url;
  discussionTitle.append(titleLink);

  const idCreatedAt = document.createElement('div');
  idCreatedAt.textContent = `${obj.id} / ${obj.createdAt}`
  idCreatedAt.className = "discussion__information";
  discussionContent.append(idCreatedAt);

  const checkbox = document.createElement('p');
  checkbox.textContent = "☑";
  discussionAnswered.append(checkbox);

  // obj.answer // ? <- 
  // obj.bodyHTML // ? <-

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


const questionForm = document.querySelector(".form");
const nameInput = document.querySelector("#name");
const titleInput = document.querySelector("#title");
const questionInput = document.querySelector("#story");

const names_KEY = "names";
const titles_KEY = "titles";

const names = [];
const titles = [];

function saveNamesAndTitle() {
  localStorage.setItem(names_KEY, JSON.stringify(names));
  localStorage.setItem(titles_KEY, JSON.stringify(titles));
}

function handleQuestionSubmit(event) {
  event.preventDefault();
  const newName = nameInput.value;
  const newTitle = titleInput.value;
  // const newQuestion = questionInput.value; // 링크 타고 들어가야 있는 질문 내용은 어떻게 구현?
  nameInput.value = "";
  titleInput.value = "";
  questionInput.value = "";

  const newQuestions = { id: newName, createdAt: getTime(), title: newTitle, url: "https://github.com/codestates-seb/agora-states-fe/discussions/6", author: newName, avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4" }
  agoraStatesDiscussions.unshift(newQuestions); // 배열에 추가 데이터 쌓음
  ul.prepend(convertToDiscussion(newQuestions)); // 실제 화면에 디스커션이 추가

  saveNamesAndTitle();
}

questionForm.addEventListener("submit", handleQuestionSubmit);

// const savedNamesAndTitle = localStorage.getItem(names_KEY);

function getTime() {
  const date = new Date();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  let AMPM = "오전";

  if (hours > 12) {
    hours = hours - 12
    AMPM = "오후"
  }

  return `${AMPM} ${hours}:${minutes}:${seconds}`;
}


// 서버 데이터 받아오기 fetch
fetch("http://localhost:3001/discussions")
  .then(res => res.json())
  .then(data => {
    agoraStatesDiscussions = data;
    // const ul = document.querySelector("ul.discussions__container");
    render(ul);
  })