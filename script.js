// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
// 디스커션 유지 기능: 새로고침해도 새로 추가한 디스커션이 유지되도록
let discussions; // 로컬 스토리지에 있는 데이터를 넣을 변수 선언
const newDiscussions = localStorage.getItem('Discussions');
if (newDiscussions) { // 디스커션 데이터가 로컬 스토리지에 있는 경우, 그 값을 discussions에 넣기
  discussions = JSON.parse(newDiscussions); 
} else { // 없는 경우, 원래 배열(agoraStatesDiscussions) 복사해서 넣기
  discussions = agoraStatesDiscussions.slice(); 
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

  // avatar img
  const avatarImg = document.createElement("img"); // 요소 생성
  avatarImg.className = "discussion__avatar--image"; // 클래스 이름 지정
  avatarImg.src = obj.avatarUrl; // src 속성 설정
  avatarImg.alt = "avatar of " + obj.author; // alt 속성 설정
  avatarWrapper.append(avatarImg); // append

  // discussion title
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  // title url
  const titleUrl = document.createElement("a");
  titleUrl.href = obj.url;
  titleUrl.textContent = obj.title;
  discussionTitle.append(titleUrl);
  // discussion information(author, createdAt)
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  // 날짜 포맷 변경해서 넣어주기
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
    ).toLocaleString()}`;
    
    // discusstion content에 새로 생성한 두 요소 append
    discussionContent.append(discussionTitle, discussionInformation);
    
    // discussion answered 내 Check 아이콘
    const answeredCheck = document.createElement("a");
    if (obj.answer !== null && "answer" in obj) {
      // 답변이 있는 경우, 답변 화면 렌더링(Advanced)
      answeredCheck.textContent = "✅";
      answeredCheck.href = obj.answer.url;
    } else {
      answeredCheck.textContent = "❌";
    }
    discussionAnswered.append(answeredCheck);
    
    li.append(avatarWrapper, discussionContent, discussionAnswered);
    return li;
  };
// discussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다. (버튼 누르면 렌더링 된 데이터 싹 지우고 범위 내 데이터 다시 렌더링)
const render = (element, from, to) => {
  console.log(from, to);
  if (!from && !to) { // from, to가 둘 다 없는 경우, 아래 값 할당
    from = 0;
    to = discussions.length - 1
  }
  // 다 지우고 배열에 있는 내용 다 보여주기
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = from; i < to; i += 1) {
    element.append(convertToDiscussion(discussions[i]));
  }
  return;
};

// Discussion 추가 기능
const form = document.querySelector(".form");
const yourName = document.querySelector("#name");
const yourTitle = document.querySelector("#title");
const yourQuestion = document.querySelector("#story");

// submit 이벤트 발생 시 기존 배열에 데이터 추가시키는 이벤트리스너
form.addEventListener("submit", addDiscussion);

function addDiscussion(e) {
  e.preventDefault(); // submit 이벤트 발생 시 reload 안하게 막아주기
  
  const obj = {
    createdAt: new Date(),
    title: yourTitle.value,
    author: yourName.value,
    answer: null,
    bodyHTML: yourQuestion.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/119473025?v=4",
  };
  
  // 맨 위에 추가 해주기
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));
  // 로컬 스토리지에 저장하기
  discussions.unshift(obj);
  localStorage.setItem('Discussions', JSON.stringify(discussions)); // 로컬스토리지에는 문자열만 저장 가능
  
  // 폼 제출하면 초기화
  yourName.value = "";
  yourTitle.value = "";
  yourQuestion.value = "";
}

// 페이지네이션 기능 구현
// 한 페이지에 10개씩 게시물을 보여주기
// 이전, 다음 페이지로 갈 수 있게하고, 다음 페이지나 이전 페이지가 없는 경우 현재 페이지 유지 (얼랏 창 띄워주기)
let limit = 10; // 한 페이지에 들어갈 게시물 갯수
let page = 1;

const getPageStartEnd = (limit, page) => {
  const len = discussions.length -1;
  let pageStart = Number(page - 1) * Number(limit);
  let pageEnd = Number(pageStart) + Number(limit);
  if (page <= 0) {
    pageStart = 0;
  }
  if (pageEnd >= len) {
    pageEnd = len;
  }
  return { pageStart, pageEnd };
};
// 이전, 다음, 로컬스토리지 초기화 버튼 설정
const buttons = document.querySelector(".buttons");
buttons.children[0].addEventListener("click", () => {
  if (page > 1) {
    page = page - 1;
  }
  else {
    alert("첫 페이지입니다.");
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});

buttons.children[1].addEventListener("click", () => {
  if (limit * page < discussions.length - 1) {
    page = page + 1;
  }
  else {
    alert("마지막 페이지입니다.")
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});
// locaStorage 초기화
buttons.children[2].addEventListener("click", () => {
  localStorage.removeItem("Discussions");
  discussions = agoraStatesDiscussions.slice();
  limit = 10;
  page = 1;
  render(ul, 0, limit);
});

// ul 요소에 discussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 0, limit);

// 다크모드
const checkbox = document.querySelector(".check");
const themeMode = document.querySelector(".theme-mode");

const isUserColorTheme = localStorage.getItem("color-theme");
// const isOsColorTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
//   ? "dark"
//   : "light";

// const getUserTheme = () =>
//   isUserColorTheme ? isUserColorTheme : isOsColorTheme;

// 최초 접속 시 테마 적용 시켜두기
window.onload = function () {
  if (isUserColorTheme === "dark") {
    // localStorage.setItem("color-theme", "dark");
    document.documentElement.setAttribute("color-theme", "dark");
    checkbox.setAttribute("checked", true);
    themeMode.textContent = "🌙";
  } else {
    // localStorage.setItem("color-theme", "light");
    document.documentElement.setAttribute("color-theme", "light");
    themeMode.textContent = "☀️";
  }
};
// 체크박스 클릭 시 테마 변경
checkbox.addEventListener("click", (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute("color-theme", "dark");
    localStorage.setItem("color-theme", "dark");
    themeMode.textContent = "🌙";
  } else {
    document.documentElement.setAttribute("color-theme", "light");
    localStorage.setItem("color-theme", "light");
    themeMode.textContent = "☀️";
  }
});
