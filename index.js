// -------------------------------- 초기 설정 --------------------------------
const AGORA_DATA = "AGORA_DATA";
if (!localStorage.getItem(AGORA_DATA)) {
  localStorage.setItem(AGORA_DATA, JSON.stringify(agoraStatesDiscussions));
}
const agoraData = JSON.parse(localStorage.getItem(AGORA_DATA));
const agoraDataArr = [...agoraData];

let start = 0;
const discussionsPerLoad = 10;
let loading = false;
let discussions = getData(start, discussionsPerLoad);
const ul = document.querySelector(".discussions__container");

function getData(start, limit) {
  return agoraData.slice(start, start + limit);
}

function appendData(element, data) {
  for (let i = 0; i < data.length; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
}

appendData(ul, discussions);

let answerBtns = document.querySelectorAll(".answer");
let questionBtns = document.querySelectorAll(".content");
answerModal();
questionModal();
// ---------------------------------------------------------------------------------

// ------------------ 이전 스크롤 위치를 기억하는 것을 무효화하기 ------------------
if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}
// ---------------------------------------------------------------------------------

// -------------------------------- 인피니티 스크롤 --------------------------------
window.addEventListener("scroll", function () {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // 데이터를 가져오는 중이거나 모든 데이터를 다 가져왔으면 더 이상 작업 X
  if (loading || start >= agoraData.length) {
    return;
  }

  if (scrollTop + clientHeight >= scrollHeight) {
    const loader = document.querySelector(".loader");
    loader.style.display = "block";
    loading = true;
    setTimeout(() => {
      loader.style.display = "none";
      if (agoraData.length - start < 10) {
        start += discussionsPerLoad;
      } else {
        start += discussionsPerLoad;
      }
      discussions = getData(start, discussionsPerLoad);
      appendData(ul, discussions);
      loading = false;
      getBtns();
    }, 1000);
  }
});
// ---------------------------------------------------------------------------------

// ------------------------------- answer-modal -------------------------------
const answerModalContainer = document.querySelector(".answer-modal-container");
function answerModal() {
  answerBtns.forEach((answerBtn) => {
    answerBtn.addEventListener("click", (e) => {
      const contentId = e.target.parentElement;
      const getData = JSON.parse(localStorage.getItem(AGORA_DATA));
      const data = getData.find((v) => v.id === contentId.id);
      if (!data.answer) {
        alert("답변 대기중");
        return;
      }
      answerModalContainer.style.display = "block";
      const answer = data.answer;
      const answerModalTitle = document.querySelector(".answer-modal-title");
      answerModalTitle.textContent = data.title;
      const answerContent = document.querySelector(".answer-content");
      answerContent.innerHTML = answer.bodyHTML;
      const answerAvartar = document.querySelector(".answer-avartar");
      answerAvartar.src = answer.avatarUrl;
      const answerAuthor = document.querySelector(".answer-author");
      answerAuthor.textContent = answer.author;
      const answerDate = document.querySelector(".answer-date");
      answerDate.textContent = new Date(answer.createdAt).toLocaleString();
    });
  });
}

const answerModalCloseButton = document.querySelector(".answer-modal-close");
answerModalCloseButton.addEventListener("click", () => {
  closeModal();
});

answerModalContainer.addEventListener("click", function (event) {
  if (event.target === answerModalContainer) {
    closeModal();
  }
});
// ----------------------------------------------------------------------------

// ------------------------------- question-modal -------------------------------
const questionModalContainer = document.querySelector(
  ".question-modal-container"
);

function questionModal() {
  questionBtns.forEach((questionBtn) => {
    questionBtn.addEventListener("click", (e) => {
      contentId = e.target.parentElement.parentElement.parentElement;
      const getData = JSON.parse(localStorage.getItem(AGORA_DATA));
      const data = getData.find((v) => v.id === contentId.id);
      questionModalContainer.style.display = "block";
      const questionModalTitle = document.querySelector(
        ".question-modal-title"
      );
      questionModalTitle.textContent = data.title;
      const questionContent = document.querySelector(".question-content");
      questionContent.innerHTML = data.bodyHTML;
      const questionAvartar = document.querySelector(".question-avartar");
      questionAvartar.src = data.avatarUrl;
      const questionAuthor = document.querySelector(".question-author");
      questionAuthor.textContent = data.author;
      const questionDate = document.querySelector(".question-date");
      questionDate.textContent = new Date(data.createdAt).toLocaleString();
    });
  });
}

const questionModalCloseButton = document.querySelector(
  ".question-modal-close"
);
questionModalCloseButton.addEventListener("click", () => {
  closeModal();
});

questionModalContainer.addEventListener("click", function (event) {
  if (event.target === questionModalContainer) {
    closeModal();
  }
});
// --------------------------------------------------------------------------------

// ----------------------------- 질문 등록 -----------------------------
const authorName = document.getElementById("name");
const title = document.getElementById("title");
const story = document.getElementById("story");
const submitBtn = document.getElementById("submit_btn");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const titleVal = title.value;
  const authorVal = authorName.value;
  const storyVal = story.value;
  const data = {
    id: random(),
    createdAt: new Date(),
    title: titleVal,
    url: "https://agora.io/",
    author: authorVal,
    answer: null,
    bodyHTML: storyVal,
    avatarUrl: `https://avatars.dicebear.com/api/avataaars/[${authorName.value}].svg`,
  };
  if (
    titleVal.trim() === "" ||
    authorVal.trim() === "" ||
    storyVal.trim() === ""
  ) {
    alert("값을 입력해주세요.");
    return;
  }
  agoraDataArr.unshift(data);
  localStorage.setItem(AGORA_DATA, JSON.stringify(agoraDataArr));
  ul.prepend(convertToDiscussion(data));
  getBtns();
  alert("질문 등록이 완료되었습니다.");
  title.value = "";
  authorName.value = "";
  story.value = "";
});

// ------------------------------------------------------------------------

// ------------------------------- li 생성기 -------------------------------
function convertToDiscussion(obj) {
  const li = document.createElement("li");
  li.className = "discussion__container";
  li.id = obj.id;

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const avatarContainer = document.createElement("div");
  avatarContainer.className = "avatar__container";
  const avatar = document.createElement("img");
  avatar.className = "avatar";
  avatar.src = obj.avatarUrl;
  avatarContainer.append(avatar);

  const contentContainer = document.createElement("div");
  contentContainer.className = "content__container";
  const content = document.createElement("div");
  content.className = "content";
  content.textContent = obj.title;

  const authorDateContainer = document.createElement("div");
  authorDateContainer.className = "author__date__container";
  const author = document.createElement("span");
  author.className = "author";
  author.textContent = `${obj.author} /`;
  const date = document.createElement("span");
  date.className = "date";
  date.textContent = `${new Date(obj.createdAt).toLocaleString()}`;
  authorDateContainer.append(author, date);

  contentContainer.append(content, authorDateContainer);

  discussionContent.append(avatarContainer, contentContainer);

  const viewAnswer = document.createElement("div");
  viewAnswer.className = "answer";
  if (obj.answer) {
    viewAnswer.textContent = "답변 보기";
  } else {
    viewAnswer.textContent = "답변 대기중";
  }

  li.append(viewAnswer, discussionContent);
  return li;
}

// ------------------------------------------------------------------------

// --------------------------- randim id 생성기 ---------------------------
function random(length = 18) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let str = "";

  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
}
// ------------------------------------------------------------------------

// --------------------------- 모달 창 닫기 함수 --------------------------
function closeModal() {
  answerModalContainer.style.display = "none";
  questionModalContainer.style.display = "none";
}
// ------------------------------------------------------------------------

// --------------------------- Esc 모달 창 닫기 이벤트 ---------------------------
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
// ----------------------------------------------------------------------------

// --------------------------- 최상단으로 이동하기 ---------------------------
const scrollUpButton = document.querySelector(".scroll-up");
scrollUpButton.addEventListener("click", function () {
  window.scroll({
    behavior: "smooth",
    top: document.body.offsetTop,
  });
});
// ----------------------------------------------------------------------------

// --------------------------- 최하단으로 이동하기 ---------------------------
const scrollDownButton = document.querySelector(".scroll-down");
scrollDownButton.addEventListener("click", function () {
  window.scrollTo({
    behavior: "smooth",
    top: document.documentElement.scrollHeight,
  });
});
// ----------------------------------------------------------------------------

// ----------------------- 게시글 등록시 모달 업데이트 -----------------------
function getBtns() {
  answerBtns = document.querySelectorAll(".answer");
  questionBtns = document.querySelectorAll(".content");
  answerModal();
  questionModal();
}
// ----------------------------------------------------------------------------
