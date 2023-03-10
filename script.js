// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.classList.add("discussion__container");

  // avatarWrapper, discussionInfo, discussionContent, discussionAnswered div 태그 생성
  const avatarWrapper = document.createElement("div");
  const discussionInfo = document.createElement("div");
  const discussionContent = document.createElement("div");
  const discussionAnswered = document.createElement("div");

  // avatarWrapper, discussionInfo, discussionContent, discussionAnswered 클래스명 지정
  avatarWrapper.className = "discussion__avatar--wrapper";
  discussionInfo.className = "discussion__information";
  discussionContent.className = "discussion__content";
  discussionAnswered.className = "discussion__answered";

  // img 태그 생성, 아바타 이미지 src에 URL 추가하여 avatarWrapper 자식 태그로 추가
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarWrapper.append(avatarImg);

  // 인자로 받은 객체의 제목, 글쓴이, 글쓴 시간 선언
  const author = obj.author;
  let time = obj.answer?.createdAt
    .slice(11)
    .match(/[0-9]+/g)
    .join(":");
  if (time) {
    time = Number(time.slice(0, 2)) >= 12 ? "오전 " + time : "오후 " + time;
  } else {
    time = "";
  }

  // author와 time을 info 변수에 저장

  // 전구 그림  img 태그 생성 (on/off)
  const on = document.createElement("img");
  on.src = "./img/cartoon-1294877_640.png";
  const off = document.createElement("img");
  off.src = "./img/idea-305335_640.png";
  on.className = "light_bulb";
  off.className = "light_bulb";
  // 응답 있을 시 전구가 켜지도록 구현
  const response = obj.answer?.bodyHTML;
  response ? discussionAnswered.append(on) : discussionAnswered.append(off);

  // title에 url 적용
  const title = obj.title;
  const linkedTitle = document.createElement("A");
  linkedTitle.setAttribute("href", obj.answer?.url);
  linkedTitle.append(title);

  // li tag 자식 노드로 추가
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  li.className = "discussion__container";

  // discussion__content 태그에 제목, info 변수(author, time) 자식 노드로 추가
  const info = author + " / " + time;
  const discussion = document.createElement("div");
  discussion.className = "discussion__content";
  discussionInfo.innerText = info;
  discussionContent.append(linkedTitle, discussionInfo);

  return li;
};

// submit 클릭 시 질문 리스트에 추가되도록 구현
const form = document.querySelector("form.form");
const title = document.querySelector("input#title");
const author = document.querySelector("input#name");
const story = document.querySelector("textarea#story");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // 하나의 객체를 만들어서, cd함수에 넣어서 li로 만든 다음 ul요소에 append
  const newDiscussion = {
    id: Math.random(),
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/6",
    author: author.value,
    answer: null,
    bodyHTML: story?.value,
    avatarUrl: "./img/bg.jpeg",
  };
  ul.prepend(convertToDiscussion(newDiscussion));
  title.value = "";
  author.value = "";
  story.value = "";
});

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
