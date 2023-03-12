// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

if (localStorage.getItem("submit") !== null) {
  agoraStatesDiscussions = [...JSON.parse(localStorage.getItem("submit"))];
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = obj => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; // Wrapper안에 img
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);
  // ---------------------------
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content"; // content안에 h2안에 a, h2옆에 inf
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionTitle.style.display = "flex";
  const aNotice = document.createElement("a");
  aNotice.href = obj.url;
  aNotice.textContent = obj.title;
  discussionTitle.append(aNotice);
  discussionContent.append(discussionTitle);
  const discussionbodyHtml = document.createElement("p");
  discussionbodyHtml.className = "discussion__bodyHtml hide";
  discussionbodyHtml.textContent = obj.bodyHTML;
  discussionContent.append(discussionbodyHtml);
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = obj.author + " / " + obj.createdAt;
  discussionContent.append(discussionInformation);
  // ---------------------------
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const pCheck = document.createElement("p");
  if (obj.answer === null) {
    pCheck.textContent = "❌";
  } else {
    pCheck.textContent = "⭕";
  }
  discussionAnswered.append(pCheck);
  discussionContent.append(discussionAnswered);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// --- PAGE ---
let pageCount = 5; // 화면에 보여줄 페이지 갯수
let limit = 6; // 한 페이지에 나올 데이터
let currentPage = 1; // 현재 페이지
let totalCount = 41; // 총 데이터 (li)

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = element => {
  ul.innerHTML = ""; // 초기화
  for (let i = 0; i < element.length; i += 1) {
    const discussion = agoraStatesDiscussions[element[i]];
    ul.append(convertToDiscussion(discussion)); // 페이지네이션을 위해 변경
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

(function () {
  // 맨 처음 6개만 렌더링
  for (let i = 0; i < 6; i++) {
    let onlyOne = agoraStatesDiscussions[i];
    ul.append(convertToDiscussion(onlyOne));
  }
})();
// SUBMIT BTN

const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const textInput = document.querySelector("#story");
const inputForm = document.querySelector(".form");
const now = new Date();

// SUBMIT BTN ..Img Random
const imagePaths = [
  (src = "/fe-sprint-my-agora-states/img/ava1.png"),
  (src = "/fe-sprint-my-agora-states/img/ava2.png"),
  (src = "/fe-sprint-my-agora-states/img/ava3.jpg"),
  (src = "/fe-sprint-my-agora-states/img/ava4.png"),
];

function showRandomImage() {
  let randomIndex = Math.floor(Math.random() * imagePaths.length);
  let randomImagePath = imagePaths[randomIndex];
  let img = new Image();
  img.src = randomImagePath;
  return img.src;
}

inputForm.addEventListener("submit", event => {
  event.preventDefault();
  const newObj = {};

  newObj.id = null;
  newObj.createdAt = now.toISOString();
  newObj.title = inputTitle.value;
  newObj.url = null;
  newObj.author = inputName.value;
  newObj.answer = null;
  newObj.bodyHTML = textInput.value;
  newObj.avatarUrl = showRandomImage();

  agoraStatesDiscussions.unshift(newObj);
  ul.prepend(convertToDiscussion(newObj));
  localStorage.setItem("submit", JSON.stringify(agoraStatesDiscussions));

  inputName.value = ""; // 초기화
  inputTitle.value = "";
  textInput.value = "";
  totalCount++; // 총 데이터 갯수 증가

  totalPage = Math.ceil(totalCount / limit);
});

// ----------------------------------------------------
// currentPage 현재페이지
// totalCount 총 데이터의 갯수
// pageCount 화면에 나타날 페이지 갯수
// limit 한 페이지 당 나타낼 데이터의 갯수

// --- 총 페이지 계산하기---
// totalPage = Math.ceil(totalCount / limit)

// --- 현제 페이지의 그룹 계산하기 ---
// 현재 페이지 그룹을 구하려면 현재 페이지 / 보여줄 페이지
// pageGroup = Math.ceil(currentPage / pageCount)

// --- 현재 페이지 그룹의 첫번째, 마지막 페이지 숫자 구하기 ---

let totalPage = Math.ceil(totalCount / limit);
let pageGroup = Math.ceil(currentPage / pageCount);
let lastNumber = pageGroup * pageCount;
if (lastNumber > totalPage) {
  lastNumber = totalCount;
}
let firstNumber = lastNumber - (pageCount - 1);

let nextBtn = document.querySelector(".nextBtn");
let prevBtn = document.querySelector(".prevBtn");

const nextPage = () => {
  let lastBtn = document.getElementsByClassName("pageNumber");
  if (!totalCount - limit * lastBtn[lastBtn.length - 1].textContent < 6) {
    pageGroup++;
    lastNumber = pageGroup * pageCount;
    if (lastNumber > totalPage) {
      lastNumber = Math.ceil(totalCount / 6);
    }
    firstNumber = lastNumber - (pageCount - 1);
    makePages();
  }
};
const prevPage = () => {
  if (pageGroup !== 1) {
    pageGroup--;
    lastNumber = pageGroup * pageCount;
    if (lastNumber > totalPage) {
      lastNumber = Math.ceil(totalCount / 6);
    }
    firstNumber = lastNumber - (pageCount - 1);
    makePages();
  }
};
nextBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", prevPage);
let pageBtnsEvent = document.getElementsByClassName("pageNumber");
// 페이지 버튼 생성
let makePages = function () {
  let parent = document.querySelector(".pageBtns");
  let children = parent.querySelectorAll(".pageNumber");
  children.forEach(function (child) {
    child.remove(); // 초기화
  });

  for (let i = firstNumber; i <= lastNumber; i++) {
    let pageBtnsTag = document.querySelector(".pageBtns");
    let makePagesBtn = document.createElement("button");
    makePagesBtn.classList.add("pageNumber");
    makePagesBtn.id = `page_${i}`;
    makePagesBtn.textContent = i;
    pageBtnsTag.append(makePagesBtn);
  }
  doEveryThing();
};
makePages();

// curPage에 맞게 6개씩 렌더링
function doEveryThing() {
  for (let i = 0; i < pageBtnsEvent.length; i++) {
    pageBtnsEvent[i].addEventListener("click", function (e) {
      currentPage = Number(e.target.textContent);
      let startIndex = (currentPage - 1) * 6;
      const pageRender = Array.from(
        { length: 6 },
        (_, i) => startIndex + i
      ).filter(i => agoraStatesDiscussions[i]);
      render(pageRender);
    });
  }
}
doEveryThing();
