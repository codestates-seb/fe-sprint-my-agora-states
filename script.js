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

  // avatar img
  const avatarImg = document.createElement("img"); // 요소 생성
  avatarImg.className = "discussion__avatar--image"; // 클래스 이름 지정
  avatarImg.src = obj.avatarUrl; // src 속성 설정
  avatarImg.alt = 'avatar of ' + obj.author; // alt 속성 설정
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
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;

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

// Discussion 추가 기능
const form = document.querySelector(".form");
const yourName = document.querySelector("#name");
const yourTitle = document.querySelector("#title");
const yourQuestion = document.querySelector("#story");
// submit 이벤트 발생 시 기존 배열에 데이터 추가시키는 이벤트리스너
form.addEventListener("submit", addDiscussion);

function addDiscussion(e) {
  e.preventDefault(); // submit 이벤트 발생 시 reload 안하게 막아주기
  console.log('test')
  const obj = {
    createdAt: new Date(),
    title: yourTitle.value,
    author: yourName.value,
    answer: null,
    bodyHTML: yourQuestion.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/119473025?v=4",
  };
  console.log(obj.createdAt)
  // 맨 위에 추가 해주기
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj))

  // 폼 제출하면 초기화
  yourName.value = '';
  yourTitle.value = '';
  yourQuestion.value = '';
}

// 다크모드
const checkbox = document.querySelector('.check');
const themeMode = document.querySelector('.theme-mode')

const isUserColorTheme = localStorage.getItem('color-theme');
const isOsColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const getUserTheme = () => (isUserColorTheme ? isUserColorTheme : isOsColorTheme);

window.onload = function () {
  if (getUserTheme === 'dark') {
    localStorage.setItem('color-theme', 'dark');
    document.documentElement.setAttribute('color-theme', 'dark');
    checkbox.setAttribute('checked', true);
    themeMode.textContent = '🌙'
  } else {
    localStorage.setItem('color-theme', 'light');
    document.documentElement.setAttribute('color-theme', 'light');
    themeMode.textContent = '☀️'
  }
};

checkbox.addEventListener('click', e => {
  if (e.target.checked) {
    document.documentElement.setAttribute('color-theme', 'dark');
    themeMode.textContent = '🌙'
  } else {
    document.documentElement.setAttribute('color-theme', 'light');
    themeMode.textContent = '☀️'
  }
});