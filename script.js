const body = document.querySelector("body");
const modal = document.querySelector(".modal__overlay");
const modalCloseButton = document.querySelector(".modal__close-area");
const questionButton = document.querySelector(".discussion__question-button");
const questionUsername = document.querySelector("#name");
const questionTitle = document.querySelector("#title");
const questionStory = document.querySelector("#story");
const submitButton = document.querySelector(".form__submit");
const pageBar = document.querySelector(".page-bar");
const ul = document.querySelector(".discussions__ul");

let currentPage = 1;

const changeUtcToLocal = (date) => {
  let localDate = new Date(date);

  let nowMonth = (localDate.getMonth() + 1).toString();
  if ((nowMonth).length === 1) nowMonth = "0" + nowMonth;

  let nowDate = localDate.getDate().toString();
  if (nowDate.length === 1) nowDate = "0" + nowDate;

  let nowHours = localDate.getHours().toString();
  if (nowHours.length === 1) nowHours = "0" + nowHours;

  let nowMinutes = localDate.getMinutes().toString();
  if (nowMinutes.length === 1) nowMinutes = "0" + nowMinutes;

  const changedDate = `${localDate.getFullYear()}-${nowMonth}-${nowDate} ${nowHours}:${nowMinutes}`;

  return changedDate;
};

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
  discussionAnswered.textContent = (obj.answer) ? "☑️" : "❎";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImage);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionTitle.append(titleLink);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${changeUtcToLocal(obj.createdAt)}`;
  discussionContent.append(discussionInfo);

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

const makeButtonElement = (className, textContent, appendTarget, id) => {
  const button = document.createElement("button");
  if (id) button.id = id;
  button.className = className;
  button.textContent = textContent;
  appendTarget.append(button);
};

const resetPage = () => {
  const pageBarButtons = document.querySelectorAll(".page-bar__button");
  const prevButton = document.querySelector(".page-bar__button--prev");
  const nextButton = document.querySelector(".page-bar__button--next");

  pageBarButtons.forEach((button) => {
    button.remove();
  });

  prevButton.remove();
  nextButton.remove();

  const discussions = document.querySelectorAll(".discussion__container");
  discussions.forEach((element) => {
    element.remove();
  });
};

const paginate = (clickType) => {
  const numOfData = agoraStatesDiscussions.length; // 총 데이터 갯수
  const pageLimit = 5; // 화면에 나타날 페이지 갯수
  const dataLimit = 5; // 한 페이지 당 나타날 데이터 갯수
  const totalPage = Math.ceil(numOfData / dataLimit);
  const half = Math.floor(pageLimit / 2);
  let firstNumberOfPage, lastNumberOfPage;

  // currentPage (현재 페이지) 계산
  if (clickType === "prev") {
    currentPage = (currentPage === 1)
    ? 1
    : currentPage - 1;
  } else if (clickType === "next") {
    currentPage = (currentPage !== totalPage)
    ? currentPage + 1
    : currentPage;
  } else if (typeof(clickType) === "number") {
    currentPage = clickType;
  } else {
    currentPage = 1;
  }

  // currentPage에 따른 pageBar 시작, 끝 계산
  if (currentPage <= half + 1) {
    firstNumberOfPage = 1;
    lastNumberOfPage = firstNumberOfPage + pageLimit;
  } else if (currentPage < totalPage - half) {
    firstNumberOfPage = currentPage - half;
    lastNumberOfPage = currentPage + half + 1;
  } else {
    firstNumberOfPage = totalPage - pageLimit + 1;
    lastNumberOfPage = totalPage + 1;
  }

  // 버튼 생성
  makeButtonElement("page-bar__button--prev", "이전", pageBar);

  for (let i = firstNumberOfPage; i < lastNumberOfPage; i++) {
    makeButtonElement("page-bar__button", i, pageBar, `page_${i}`);
  }

  makeButtonElement("page-bar__button--next", "다음", pageBar);

  // 데이터 목록 렌더
  const firstIndex = (currentPage - 1) * dataLimit;
  const lastIndex = currentPage * dataLimit - 1;

  for (let i = firstIndex; i <= lastIndex; i++) {
    if (i >= numOfData) break;

    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }

  // 페이지 버튼 클릭 시 배열의 모든 데이터를 다시 화면에 렌더링할 수 있도록 이벤트 부착
  const pageBarButtons = document.querySelectorAll(".page-bar__button");
  const prevButton = document.querySelector(".page-bar__button--prev");
  const nextButton = document.querySelector(".page-bar__button--next");

  pageBarButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      resetPage();
      paginate(Number(event.target.textContent));
    });
  });

  prevButton.addEventListener("click", (event) => {
    resetPage();
    paginate("prev");
  });

  nextButton.addEventListener("click", (event) => {
    resetPage();
    paginate("next");
  });
};

const openModal = () => {
  modal.classList.remove("hide");
  body.classList.add("modal__scroll--disabled");
};

const closeModal = () => {
  modal.classList.add("hide");
  body.classList.remove("modal__scroll--disabled");
};

const addQuestion = () => {
  const username = questionUsername.value;
  const title = questionTitle.value;
  const story = questionStory.value;

  const utcDate = new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000);

  const newQuestion = {
    createdAt: changeUtcToLocal(utcDate),
    title,
    author: username,
    bodyHTML: `<p>${story}</p>`,
    avatarUrl : "https://avatars.githubusercontent.com/u/87750478?s=64&v=4"
  };

  agoraStatesDiscussions.push(newQuestion);
  resetPage();
  paginate();
};

questionButton.addEventListener("click", openModal);
modalCloseButton.addEventListener("click", closeModal);

submitButton.addEventListener("click", () => {
  addQuestion();
  closeModal();
});

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
paginate();
