// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
let currentPage = 0;
const limit = 10;

function isAM(date) {
  return date.getHours() < 12;
}

function formattingTimes(date) {
  const dateObj = new Date(date);

  const amPm = isAM(dateObj) ? "오전" : "오후";
  const hours = (dateObj.getHours() % 12).toString().padStart(2, '0');
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getSeconds().toString().padStart(2, '0');

  return `${amPm} ${hours}:${minutes}:${seconds}`;
}

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

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const link = document.createElement("a");
  link.href = obj.url;
  link.textContent = obj.title;
  discussionTitle.append(link);
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${formattingTimes(obj.createdAt)}`;
  discussionContent.append(discussionTitle, discussionInformation);
  const checkBox = document.createElement("p");
  checkBox.textContent = "☑";
  discussionAnswered.append(checkBox);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 일부 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  element.innerHTML = '';

  for (let i = currentPage * limit; i < (currentPage + 1) * limit; i += 1) {
    if (agoraStatesDiscussions[i] === undefined) break;
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }

  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const inputNameValue = document.querySelector("#name")
const inputTitleValue = document.querySelector("#title")
const inputQuestionValue = document.querySelector("#story")

function addDiscussions(event) {
  event.preventDefault();
  console.log("잘 되나?");
  agoraStatesDiscussions.unshift({
    id: "D_kwDOHOApLM4APjJu",
    createdAt: new Date().toISOString().split(".")[0]+"Z",
    title: inputTitleValue.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputNameValue.value,
    answer: null,
    bodyHTML:
      `<p dir="auto">${inputQuestionValue.value}</p>`,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  });
  console.log(agoraStatesDiscussions);
  localStorage.setItem('discussions', JSON.stringify(agoraStatesDiscussions))
  render(ul);
}

function movePrevDiscussions() {
  if (currentPage > 0) {
    currentPage -= 1;
    render(ul);
  }
}

function moveNextDiscussions() {
  if ((currentPage + 1) * limit < agoraStatesDiscussions.length) {
    currentPage += 1;
    render(ul);
  }
}

const addInputEvent = document.querySelector("#submitBtn");
console.log(addInputEvent);
addInputEvent.addEventListener("click", addDiscussions);

const prevBtnEvent = document.querySelector("#prevBtn");
prevBtnEvent.addEventListener("click", movePrevDiscussions);

const nextBtnEvent = document.querySelector("#nextBtn");
nextBtnEvent.addEventListener("click", moveNextDiscussions);