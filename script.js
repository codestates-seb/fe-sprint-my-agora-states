// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
for (let i = 0; i < window.localStorage.length; i++) {
  agoraStatesDiscussions.unshift(
    JSON.parse(window.localStorage.getItem(`${i}`))
  );
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

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //avatarWrapper - img 추가
  const avatearImg = document.createElement("img");
  avatearImg.className = "discussion__avatar--image";
  avatearImg.src = obj.avatarUrl;
  avatearImg.alt = `avatar of ${obj.author}`;
  avatarWrapper.appendChild(avatearImg);

  //discussionContent - h3 > author
  const discuccionAuthor = document.createElement("h3");
  discuccionAuthor.className = "discussio__athor";
  discuccionAuthor.textContent = obj.author;
  discussionContent.appendChild(discuccionAuthor);

  //discussionContent - h4 > a (title) 추가
  const discussionTitle = document.createElement("h4");
  discussionTitle.className = "discussion__title";
  const titleA = document.createElement("a");
  titleA.href = obj.url;
  titleA.textContent = obj.title;
  discussionTitle.appendChild(titleA);

  discussionContent.appendChild(discussionTitle);

  //discussionContent - div(discuccion information) 추가
  const discuccionInformation = document.createElement("div");
  discuccionInformation.className = "discussion__information";

  const discuccionTime = document.createElement("p");
  discuccionTime.textContent = `${obj.createdAt}`;
  discuccionInformation.appendChild(discuccionTime);
  discussionContent.appendChild(discuccionInformation);

  //discussionAnswered - p 추가
  const discussionAnsweredP = document.createElement("p");
  if (obj.answer !== null) {
    discussionAnsweredP.textContent = "✅";
    discussionAnswered.appendChild(discussionAnsweredP);
  } else {
    discussionAnsweredP.textContent = "❎";
    discussionAnswered.appendChild(discussionAnsweredP);
  }
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

function addPageNation(number) {
  const pageList = document.querySelector(".page__list");
  const p = document.createElement("p");
  p.className = `p${number}`;
  p.textContent = `${number}`;

  p.addEventListener("click", movePage);

  if (number === 1) {
    p.classList.add("current__page");
  }
  pageList.appendChild(p);
}

//현재 페이지
let currentPage = 1;

//페이지 개수 (기본 1)
let pageCount = 1;

//배열 데이터 개수
const listCount = agoraStatesDiscussions.length;

//페이지 개수 설정 (10개 단위)
if (listCount < 10) {
  pageCount = 1;
} else {
  if (listCount % 10 === 0) {
    pageCount = Math.floor(listCount / 10);
  } else {
    pageCount = Math.floor(listCount / 10) + 1;
  }
}

//페이지 네이션 추가
for (let i = 1; i <= pageCount; i++) {
  addPageNation(i);
}
// agoraStatesDiscussions 배열의 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  ///10개만 렌더링
  let start = (currentPage - 1) * 10;
  let end = currentPage * 10;
  if (currentPage * 10 > listCount) {
    end = listCount;
  }
  for (let i = start; i < end; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//discusion추가 기능
const formQuestionSubmitDiv = document.querySelector(".form");

//submit handler -> 질문 제출시 로컬에 저장하고 화면에 출력
function handleSubmit(event) {
  //submit때문에 페이지가 다시 렌더링 되는 것은 방지
  // event.preventDefault();

  const name = document.querySelector("#name");
  const title = document.querySelector("#title");
  const question = document.querySelector("#story");
  console.log(
    `질문자: ${name.value} / 제목: ${title.value} / 질문 내용: ${question.value}`
  );

  //현재시간
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);

  let dateString = year + "-" + month + "-" + day;

  let hours = ("0" + today.getHours()).slice(-2);
  let minutes = ("0" + today.getMinutes()).slice(-2);
  let seconds = ("0" + today.getSeconds()).slice(-2);

  let timeString = hours + ":" + minutes + ":" + seconds;
  const newQuestion = {
    author: `${name.value}`,
    avatarUrl: "./person.png",
    title: `${title.value}`,
    bodyHTML: `${question.value}`,
    createdAt: `${dateString} ${timeString}`,
    answer: null,
  };

  const objString = JSON.stringify(newQuestion);

  window.localStorage.setItem(`${window.localStorage.length}`, objString);

  console.log(newQuestion.createdAt);
  // 배열에 등록
  // agoraStatesDiscussions.unshift(newQuestion);

  //ul을 다시 렌더...함..
  ul.insertBefore(newQuestion);

  //리셋!
  name.value = "";
  title.value = "";
  question.value = "";
}

formQuestionSubmitDiv.addEventListener("submit", handleSubmit);

//pageNation
const pageDownButton = document.querySelector(".page__down");
function pageDowner() {
  if (currentPage === 1) {
    console.log("첫 번째 페이지 입니다.");
  } else {
    currentPage--;
    const beforepageCheck = document.querySelector(`.p${currentPage + 1}`);
    const currentpageCheck = document.querySelector(`.p${currentPage}`);

    ul.textContent = "";
    render(ul);
    console.log(currentPage);
    beforepageCheck.classList.remove("current__page");
    currentpageCheck.classList.add("current__page");
  }
}
pageDownButton.addEventListener("click", pageDowner);

const pageUpButton = document.querySelector(".page__up");
function pageUpper() {
  if (currentPage === pageCount) {
    console.log("마지막 페이지 입니다.");
  } else {
    currentPage++;
    const beforepageCheck = document.querySelector(`.p${currentPage - 1}`);
    const currentpageCheck = document.querySelector(`.p${currentPage}`);
    ul.textContent = "";
    render(ul);
    console.log(currentPage);
    beforepageCheck.classList.remove("current__page");
    currentpageCheck.classList.add("current__page");
  }
}
pageUpButton.addEventListener("click", pageUpper);

//pageNation 첫페이지, 마지막 페이지 이동
const firstPageButton = document.querySelector(".page__first");
function showFirstPage() {
  const beforepageCheck = document.querySelector(`.p${currentPage}`);
  const currentpageCheck = document.querySelector(`.p${1}`);
  currentPage = 1;
  ul.textContent = "";
  render(ul);
  beforepageCheck.classList.remove("current__page");
  currentpageCheck.classList.add("current__page");
}
firstPageButton.addEventListener("click", showFirstPage);

const lastPageButton = document.querySelector(".page__last");
function showLastPage() {
  const beforepageCheck = document.querySelector(`.p${currentPage}`);
  const currentpageCheck = document.querySelector(`.p${pageCount}`);
  currentPage = pageCount;
  ul.textContent = "";
  render(ul);
  //current__page
  beforepageCheck.classList.remove("current__page");
  currentpageCheck.classList.add("current__page");
}
lastPageButton.addEventListener("click", showLastPage);

function movePage(event) {
  const clickPage = event.target.className;
  console.log(clickPage);
  const beforepageCheck = document.querySelector(`.p${currentPage}`);
  const currentpageCheck = document.querySelector(`.${clickPage}`);
  currentPage = parseInt(clickPage.slice(1));
  ul.textContent = "";
  render(ul);
  console.log(currentPage);
  beforepageCheck.classList.remove("current__page");
  currentpageCheck.classList.add("current__page");
}
