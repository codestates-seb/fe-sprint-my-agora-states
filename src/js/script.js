// TODO:  답변 등록(html, css완료), 글 삭제(수정), 이미지 업로드, 로그인, 회원가입, 답변완료 체크

// discussion 목록 컨테아너
const ul = document.querySelector("ul.discussions__container");

// page navigator
const navLeft = document.querySelector(".navigator__left");
const navRight = document.querySelector(".navigator__right");
const navCenter = document.querySelector(".navigator__center");

// data 시간 포매터
function timeFormater(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const h = date.getHours();
  const minute = date.getMinutes();
  const s = date.getSeconds();
  return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(
    2,
    "0"
  )}T${String(h).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(
    s
  ).padStart(2, "0")}Z`;
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const discussionTags = document.createElement("div");
  discussionTags.className = "discussion__tags";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  // tag 있으면 적용, 없으면 '기타'로 적용
  if (obj.tags) {
    for (i of obj.tags) {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = i;
      discussionTags.append(tag);
    }
  } else {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = "기타";
    discussionTags.append(tag);
  }

  // discussionContet 적용
  // 1) title
  const title = document.createElement("h2");
  title.textContent = obj.title;
  title.classList.add("discussion__title");

  discussionContent.append(title);

  // 2) discussionMain 적용
  const main = document.createElement("div");
  main.classList.add("discussion__main");

  // 2-1) author
  const author = document.createElement("div");
  author.classList.add("discussion__author");
  author.textContent = `${obj.author}: `;
  main.append(author);

  // 2-2) story
  const story = document.createElement("div");
  story.classList.add("discussion__story");
  story.textContent = `${obj.bodyHTML}`;
  main.append(story);

  discussionContent.append(main);

  // discussionAnswered 적용
  // 1) comments
  // TODO 답변 등록 기능 구현시 숫자를 답변 수만큼 출력으로 바꿈 (현재는 1 or 0)
  const comment = document.createElement("p");
  comment.className = "discussion__comments";
  if (obj.answer === null) comment.textContent = `💬0`;
  else {
    obj.answer.length === undefined
      ? (comment.textContent = "💬1")
      : (comment.textContent = `💬${obj.answer.length}`);
  }
  discussionAnswered.append(comment);

  // 2) time
  const time = document.createElement("div");
  time.className = "discussion__time";
  const date = new Date(timeFormater(new Date()));

  // node에서는 moment라는 모듈을 쓸 수 있다. (경과시간 표기 가능 (ex.1달전))
  const dataDate = new Date(obj.createdAt);
  const elapsedDay =
    (date.getTime() - dataDate.getTime()) / (1000 * 60 * 60 * 24);

  if (elapsedDay >= 365) {
    time.textContent = `${parseInt(elapsedDay / 365)}년 전`;
  } else if (elapsedDay >= 31) {
    time.textContent = `${parseInt(elapsedDay / 31)}달 전`;
  } else if (elapsedDay >= 1) {
    time.textContent = `${parseInt(elapsedDay)}일 전`;
  } else if (elapsedDay * 24 >= 1) {
    time.textContent = `${parseInt(elapsedDay * 24)}시간 전`;
  } else if (elapsedDay * 24 * 60 >= 1) {
    time.textContent = `${parseInt(elapsedDay * 24 * 60)}분 전`;
  } else {
    time.textContent = `방금 전`;
  }

  discussionAnswered.append(time);

  // 1. avatarWrapper 적용
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarImg.classList.add("discussion__avatar--image");
  avatarWrapper.append(avatarImg);

  li.append(
    discussionTags,
    discussionContent,
    discussionAnswered,
    avatarWrapper
  );

  // modal open 할떄 필요한 id를 data의 id로 지정
  li.dataset.id = obj.id;
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  const discussionData = JSON.parse(localStorage.getItem("data"));
  pageNum = localStorage.getItem("pageNum");

  // 현재 페이지 불러오기
  if (pageNum === null) {
    localStorage.setItem("pageNum", 1);
    pageNum = parseInt(localStorage.getItem("pageNum"));
  } else {
    pageNum = parseInt(pageNum);
  }

  // 현재 페이지에 맞추어 렌더링
  if (pageNum === 1) {
    navCenter.textContent = pageNum;
    navLeft.classList.add("hidden");
    navRight.classList.remove("hidden");
  } else if (pageNum === parseInt(discussionData.length / 10) + 1) {
    navCenter.textContent = pageNum;
    navLeft.classList.remove("hidden");
    navRight.classList.add("hidden");
  } else {
    navCenter.textContent = pageNum;
    navLeft.classList.remove("hidden");
    navRight.classList.remove("hidden");
  }
  while (element.firstChild) {
    element.firstChild.remove();
  }
  for (let i = 10 * (pageNum - 1); i < 9 + 10 * (pageNum - 1); i += 1) {
    if (i === discussionData.length) break;
    element.append(convertToDiscussion(discussionData[i]));
  }

  // 각 질문들에 모달 등록
  const discussions = document.querySelectorAll(".discussion__container");
  discussions.forEach((discussion) => {
    discussion.addEventListener("click", openModal);
  });
  return;
};

// 네비게이터 이벤트
function handleRightNavigator() {
  localStorage.setItem("pageNum", parseInt(pageNum) + 1);
  navCenter.textContent = Number(navCenter.textContent) + 1;
  render(ul);
}
function handleLeftNavigator() {
  localStorage.setItem("pageNum", parseInt(pageNum) - 1);
  navCenter.textContent = Number(navCenter.textContent) - 1;
  render(ul);
}

async function getData() {
  await fetch("http://localhost:4000/discussions")
    .then((res) => res.json())
    .then((res) => localStorage.setItem("data", JSON.stringify(res)));
  render(ul);
}

// 초기 데이터 불러오기
const savedData = localStorage.getItem("data");
let pageNum = localStorage.getItem("pageNum");

if (savedData === null) {
  getData();
} else {
  // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
  render(ul);
}

navLeft.addEventListener("click", handleLeftNavigator);
navRight.addEventListener("click", handleRightNavigator);
