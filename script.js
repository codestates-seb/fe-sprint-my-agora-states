// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
let agoraArr = [];
let submitBtn = document.querySelector(".form__submit input");
let naming = document.querySelector(".form__input--name input");
let question = document.querySelector(".form__textbox textarea");

// localStorage 초기 설정
if (!window.localStorage.agora) {
  window.localStorage.setItem("agora", JSON.stringify(agoraStatesDiscussions));
}

// 포스팅 시간 설정
let now = new Date();

let year = now.getFullYear();
let month = now.getMonth() + 1;
let day = now.getDate();

let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();

if (month < 10) {
  month = "0" + month;
}
if (day < 10) {
  day = "0" + day;
}
if (hours < 10) {
  hours = "0" + hours;
}
if (minutes < 10) {
  minutes = "0" + minutes;
}
if (seconds < 10) {
  seconds = "0" + seconds;
}

// 제출 클릭 시 로컬스토리지에 질문 추가
submitBtn.onclick = () => {
  agoraArr = JSON.parse(window.localStorage.getItem("agora"));
  agoraArr.unshift({
    id: "D_kwDOHOApLM4APjJi",
    createdAt: `${year}-${month}-${day} ${hours}-${minutes}-${seconds}`,
    title: question.value,
    url: "#",
    author: naming.value,
    answer: null,
    bodyHTML:
      '<p dir="auto">--------------- 여기서부터 복사하세요 ---------------</p>\n<p dir="auto">운영 체제: 예) macOS</p>\n<p dir="auto">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?<br>\nPair 과제 / JavaScript Koans</p>\n<p dir="auto">npm install 명령어 입력 시 env: node: No such file or directory 라고 뜹니다</p>\n<p dir="auto">에러 발생하여 아래 명령어 실행 했는데도 불구하고 똑같은 에러가 발생했습니다<br>\nnpm cache clean --force</p>\n<p dir="auto">rm package-lock.json</p>\n<p dir="auto">rm -rf ./node_modules/</p>\n<p dir="auto">npm --verbose install</p>\n<p dir="auto">폴더 자체가 문제가 있다고 생각하여 github에서 다시 fork 후 진행했는데도 같은 에러가 발생했습니다<br>\n리눅스 기초 챕터 때 npm 설치해서 마지막 submit까지는 잘 됐는데 현재 짝수 생성기 폴더도 똑같이 npm install 시 no such file or directory가 발생합니다</p>\n<p dir="auto">에러가 출력된 곳에서, 이유라고 생각하는 부분을 열 줄 이내로 붙여넣기 해 주세요. (잘 모르겠으면 에러라고 생각하는 곳을 넣어주세요)</p>\n<div class="highlight highlight-source-js position-relative overflow-auto" data-snippet-clipboard-copy-content="minjun@dubi fe-sprint-javascript-koans-main % pwd \n/Users/minjun/Documents/fe_frontand_39/fe-sprint-javascript-koans-main\nminjun@dubi fe-sprint-javascript-koans-main % npm install \nenv: node: No such file or directory"><pre><span class="pl-s1">minjun</span>@<span class="pl-s1">dubi</span> <span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span> <span class="pl-c1">%</span> <span class="pl-s1">pwd</span> \n<span class="pl-c1">/</span><span class="pl-v">Users</span><span class="pl-c1">/</span><span class="pl-s1">minjun</span><span class="pl-c1">/</span><span class="pl-v">Documents</span><span class="pl-c1">/</span><span class="pl-s1">fe_frontand_39</span><span class="pl-c1">/</span><span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span>\n<span class="pl-s1">minjun</span><span class="pl-kos"></span>@<span class="pl-s1">dubi</span> <span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span> <span class="pl-c1">%</span> <span class="pl-s1">npm</span> <span class="pl-s1">install</span> \nenv: node: <span class="pl-v">No</span> <span class="pl-s1">such</span> <span class="pl-s1">file</span> <span class="pl-s1">or</span> <span class="pl-s1">directory</span></pre></div>\n<p dir="auto">검색했던 링크가 있다면 첨부해 주세요.<br>\n<a href="https://mia-dahae.tistory.com/89" rel="nofollow">https://mia-dahae.tistory.com/89</a></p>\n<p dir="auto"><a href="https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory" rel="nofollow">https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory</a></p>\n<p dir="auto"><a href="https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0" rel="nofollow">https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0</a></p>\n<p dir="auto"><a href="https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346" rel="nofollow">https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346</a></p>\n<p dir="auto"><a href="https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80" rel="nofollow">https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80</a></p>\n<p dir="auto"><a href="https://hellowworlds.tistory.com/57" rel="nofollow">https://hellowworlds.tistory.com/57</a></p>',
    avatarUrl: "./programmer.png",
  });
  window.localStorage.setItem("agora", JSON.stringify(agoraArr));
};

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
  // 1. avatarWrapper.append
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarImg);

  // 2. discussionContent.append
  const title = document.createElement("h2");
  title.className = "discussion__title";
  const titleA = document.createElement("a");
  titleA.href = obj.url;
  titleA.textContent = obj.title;
  title.append(titleA);
  discussionContent.append(title);

  const info = document.createElement("div");
  info.className = "discussion__information";
  info.textContent =
    obj.author + " | " + obj.createdAt.replace("T", " ").replace("Z", " ");
  discussionContent.append(info);

  // 3. discussionAnswered.append
  const p = document.createElement("p");
  if (obj.answer === null) {
    p.textContent = "✖️";
  } else {
    p.textContent = "✅";
  }
  discussionAnswered.append(p);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// Page 요소 조회
const page1 = document.querySelector("#page1");
const page2 = document.querySelector("#page2");
const page3 = document.querySelector("#page3");
const page4 = document.querySelector("#page4");
const page5 = document.querySelector("#page5");
const ul = document.querySelector("ul.discussions__container");
let newArr = [];

// Page 클릭 시
page1.onclick = () => {
  removeChildren();
  newArr = JSON.parse(window.localStorage.getItem("agora")).slice(0, 10);
  render(ul);
};

page2.onclick = () => {
  removeChildren();
  newArr = JSON.parse(window.localStorage.getItem("agora")).slice(10, 20);
  render(ul);
};

page3.onclick = () => {
  removeChildren();
  newArr = JSON.parse(window.localStorage.getItem("agora")).slice(20, 30);
  render(ul);
};

page4.onclick = () => {
  removeChildren();
  newArr = JSON.parse(window.localStorage.getItem("agora")).slice(30, 40);
  render(ul);
};

page5.onclick = () => {
  removeChildren();
  newArr = JSON.parse(window.localStorage.getItem("agora")).slice(40, 50);
  render(ul);
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.

newArr = JSON.parse(window.localStorage.getItem("agora")).slice(0, 10);

const render = (element) => {
  for (let i = 0; i < newArr.length; i += 1) {
    element.append(convertToDiscussion(newArr[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render(ul);

function removeChildren() {
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}
