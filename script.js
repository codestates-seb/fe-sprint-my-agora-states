// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
const ul = document.querySelector("ul.discussions__container");

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const buttonArea = document.createElement("div");
  buttonArea.className = "buttonArea";

  const contentArea = document.createElement("div");
  contentArea.className = "contentArea";

  // avatar
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // content
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // answered
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarImg.classList.add("discussion__avatar--image");
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement("h3");
  contentTitle.className = "discussion__title";
  const contentUrl = document.createElement("a");
  contentUrl.href = obj.url;
  contentUrl.textContent = obj.title;
  contentTitle.append(contentUrl);

  const contentInfo = document.createElement("div");
  contentInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  contentInfo.className = "discussion__information";

  discussionContent.append(contentTitle, contentInfo);

  const answered = document.createElement("div");
  answered.className = "discussion__answered";
  const answeredCheck = document.createElement("p");
  if (obj.answer !== null && "answer" in obj) {
    // 답변이 있는 경우, 답변 화면 렌더링(Advanced)
    answeredCheck.textContent = "☑";
    answeredCheck.href = obj.answer.url;
  } else {
    answeredCheck.textContent = "❏";
  }
  // answeredCheck.textContent = obj.answer ? "☑" : "❏";

  answered.append(answeredCheck);
  discussionAnswered.append(answered);

  // 자세히 보기 버튼과 콘텐츠 영역
  const discussionAnswerContent = document.createElement("div");
  discussionAnswerContent.className = "discussion__answer__content";

  const discussionAnswerButton = document.createElement("button");
  discussionAnswerButton.className = "discussion__answer__button";
  discussionAnswerButton.textContent = "show details";

  discussionAnswerButton.addEventListener("click", () => {
    alert("개발 진행 중...");
  });

  contentArea.append(
    avatarWrapper,
    discussionContent,
    discussionAnswered,
    discussionAnswerContent
  );

  buttonArea.append(discussionAnswerButton);

  li.append(contentArea, buttonArea);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // 한 페이지당 출력할 데이터 갯수
  const pageCount = Math.ceil(agoraStatesDiscussions.length / 10);
  const container = document.querySelector(".pagination-button");
  // 현재 페이지
  let currentPage = window.sessionStorage.getItem("currentPage")
    ? window.sessionStorage.getItem("currentPage")
    : 1;

  // 페이지 갯수
  for (let i = 1; i < pageCount + 1; i++) {
    const button = document.createElement("button");
    button.className = `page-button-${i}`;
    button.textContent = i;
    container.append(button);

    // 페이지 버튼 클릭 했을 때 reload, window.location.href가 reload를 한다는 의미!
    button.addEventListener("click", () => {
      // console.log(button.textContent);
      window.sessionStorage.setItem("currentPage", i); // reload로 인한 초기화를 방지 위해서 setItem 사용
      window.location.href = `${window.location.origin}${window.location.pathname}?pageNo=${i}`;
      window;
    });
  }

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  // 몇번째 페이지에 출력될 데이터를 보여주는 for문
  for (let j = startIndex; j < endIndex; j += 1) {
    // console.log(agoraStatesDiscussions[j]);
    element.append(convertToDiscussion(agoraStatesDiscussions[j]));
  }
  return;
};

// 1번 이슈
// discussion numbering이 된 데이터만 처리해주려고 했는데
// discussionn numbering이 안된 데이터까지 같이 처리하다보니 => window.localStorage.length를 범위로 잡아놨기 때문에
// 해당 discussion(numbering)이 없을 때 null과 에러가 반환됨^^

// 2번 이슈
// setItem에서 일어난 이슈
// 기존 let count = 0, count++ 에서 초기화가 되어 값이 쌓이지 못하고 겹치게 된 상황
// discussion의 numbering 된 애들은 계속 남아있는데 count 초기화 되기 때문에!
// 그래서 count도 localStorage에 넣어준 것(이때 count++이 아니라 ++count로!)
// count가 들어감에 따라 discussion만 바라보는 것이 아니므로 -1로 count를 제외한 localStorage의 길이를 가져왔다

// console.log(window.localStorage.length);
if (window.localStorage.length) {
  for (let i = 0; i < window.localStorage.length - 2; i++) {
    // count 값을 뺴주기 위해서 -1 처리
    const discussionString = window.localStorage.getItem(`discussion${i}`);
    const discussionObj = JSON.parse(discussionString);
    agoraStatesDiscussions.unshift(discussionObj);
  }
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
render(ul);

// 아이디, 제목, 본문을 입력하고 누르면 실제 화면에 디스커션이 추가
// agoraStatesDiscussions 배열에 들어가 있는 요소는 객체형태로 들어가 있다 { title, author, createdAt, avatarUrl, url }
// agoraStatesDiscussions 배열에 추가한 데이터가 실제 쌓여야 한다
// 등록한 시간까지 같이 나올 수 있게(advanced)

const form = document.querySelector(".form");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputText = document.querySelector("#story");
let count = window.localStorage.getItem("count")
  ? window.localStorage.getItem("count")
  : 0;

// input 태그 id를 가져와야 value를 사용할 수 있다
form.addEventListener("submit", (e) => {
  e.preventDefault(); // submit 이벤트 발생 시, 값 초기화를 막기위한 코드

  const newDiscussion = {
    createdAt: new Date().toISOString(),
    title: inputText.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/4",
    author: inputName.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };

  agoraStatesDiscussions.unshift(newDiscussion);
  ul.prepend(convertToDiscussion(newDiscussion));

  // 초기화
  inputName.value = "";
  inputTitle.value = "";
  inputText.value = "";

  // localStorage 만드는 함수
  function setLocalStorage() {
    // submit 하면 객체 newDiscussion을 localStorage에 저장
    const objString = JSON.stringify(newDiscussion);
    // window.localStorage.setItem("discussion", objString);
    window.localStorage.setItem(`discussion${count}`, objString);
    // 기존 count에 +1 된 값
    window.localStorage.setItem("count", ++count);
  }
  setLocalStorage();
});

/*
 * 1. data.js -> script.js로 더미 데이터(agoraStatesDiscussions)를 가져옴
 * 2. script.js 에서 agoraStatesDiscussions를 기준으로 render, 이때 localStorage에 데이터가 존재한다면 agoraStatesDiscussions에 추가 후 render
 * 3. 새로 추가되는 데이터는 localStorage(setItem)에 추가
 * 4. 화면에 어떻게 출력을 해줄건가?... 문제해결...
 */

//scrolltotop
const scrollButton = document.querySelector(".scroll");
let intervalId = 0;

function scrollStep(scrollStepHeight) {
  if (window.pageYOffset === 0) {
    clearInterval(intervalId);
  }
  window.scrollTo(0, window.pageYOffset - scrollStepHeight);
}

function scrollToTop(scrollStepHeight, delay) {
  if (scrollStepHeight <= 0) {
    alert("The specified scroll step height must be positive!");
  } else if (delay <= 0) {
    alert("The specified scroll delay must be positive!");
  }
  intervalId = setInterval(() => scrollStep(scrollStepHeight), delay);
}

scrollButton.addEventListener("click", () => scrollToTop(90, 16.6));

// dark mode
const themeMode = document.querySelector(".mode");
const isUserColorTheme = localStorage.getItem("color-theme");

// 최초 접속 시 테마 적용 시켜두기
window.onload = function () {
  if (isUserColorTheme === "dark") {
    // localStorage.setItem("color-theme", "dark");
    document.documentElement.setAttribute("color-theme", "dark");
    themeMode.setAttribute("checked", true);
    themeMode.textContent = "dark";
  } else {
    // localStorage.setItem("color-theme", "light");
    document.documentElement.setAttribute("color-theme", "light");
    themeMode.textContent = "light";
  }
};
// 체크박스 클릭 시 테마 변경
themeMode.addEventListener("click", (e) => {
  if (themeMode.textContent === "light") {
    document.documentElement.setAttribute("color-theme", "dark");
    localStorage.setItem("color-theme", "dark");
    themeMode.textContent = "dark";
  } else {
    document.documentElement.setAttribute("color-theme", "light");
    localStorage.setItem("color-theme", "light");
    themeMode.textContent = "light";
  }
});
