// 0. 배열 불러오기
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

  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  discussionTitle.textContent = obj.title;
  // discussionTitle.innerHTML = `<a href="${obj.url}">${obj.title}</a>`
  discussionContent.append(discussionTitle);

  // 질문과 답변 모음
  function getBodyAndAnswer(id) {
    const data = require('./data');
    const qa = data.find(qa => qa.id === id);
    const bodyHTML = qa.bodyHTML;
    const answer = qa.answer.bodyHTML;
    return { bodyHTML, answer };
  }

  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;

  discussionContent.append(discussionInfo);

  const discussionCheckbox = document.createElement("p");
  discussionCheckbox.textContent = "☑";
  discussionAnswered.append(discussionCheckbox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 1. 새로운 값을 입력했을 때 배열 추가
const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // 기본 동작(페이지 새로고침) 방지

  const name = document.querySelector('#name').value;
  const title = document.querySelector('#title').value;
  const story = document.querySelector('#story').value;

  // 새로운 데이터 생성
  const newDiscussion = {
    author: name,
    avatarUrl: "https://via.placeholder.com/150",
    title: title,
    createdAt: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    content: story,
  };

  // 로컬 스토리지에 값을 저장합니다.
  localStorage.setItem('agoraStatesDiscussions', JSON.stringify([newDiscussion, ...JSON.parse(localStorage.getItem('agoraStatesDiscussions') || "[]")]));

  agoraStatesDiscussions.unshift(newDiscussion); // 새로운 데이터를 배열에 추가

  // 화면에 렌더링
  const ul = document.querySelector("ul.discussions__container");
  const newDiscussionElement = convertToDiscussion(newDiscussion);
  ul.insertBefore(newDiscussionElement, ul.firstChild);

  // 입력창 초기화
  document.querySelector('#name').value = "";
  document.querySelector('#title').value = "";
  document.querySelector('#story').value = "";
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

// 2. 페이지네이션
// 페이지네이션 요소 불러오기
const pagination = document.querySelector("#pagination");
const firstPage = pagination.querySelector(".pageDivision:first-child");
const prevPage = pagination.querySelector(".pageDivision:nth-child(2)");
const currentPage = pagination.querySelector(".current-page");
const nextPage = pagination.querySelector(".pageDivision:nth-child(4)");
const lastPage = pagination.querySelector(".pageDivision:last-child");

// 페이지네이션 정보 설정
const discussionsPerPage = 10;
const totalPages = Math.ceil(agoraStatesDiscussions.length / discussionsPerPage);
let currentPageIndex = 1;

// 페이지네이션 요소 업데이트
const updatePagination = () => {
  currentPage.textContent = currentPageIndex;

  if (currentPageIndex === 1) {
    firstPage.classList.add("disabled");
    prevPage.classList.add("disabled");
  } else {
    firstPage.classList.remove("disabled");
    prevPage.classList.remove("disabled");
  }

  if (currentPageIndex === totalPages) {
    nextPage.classList.add("disabled");
    lastPage.classList.add("disabled");
  } else {
    nextPage.classList.remove("disabled");
    lastPage.classList.remove("disabled");
  }
};

// 페이지 버튼 클릭 시 페이지 이동
firstPage.addEventListener("click", () => {
  if (currentPageIndex !== 1) {
    currentPageIndex = 1;
    updatePagination();
    renderDiscussions();
  }
});

prevPage.addEventListener("click", () => {
  if (currentPageIndex !== 1) {
    currentPageIndex -= 1;
    updatePagination();
    renderDiscussions();
  }
});

nextPage.addEventListener("click", () => {
  if (currentPageIndex !== totalPages) {
    currentPageIndex += 1;
    updatePagination();
    renderDiscussions();
  }
});

lastPage.addEventListener("click", () => {
  if (currentPageIndex !== totalPages) {
    currentPageIndex = totalPages;
    updatePagination();
    renderDiscussions();
  }
});

// 페이지에 따라 토론 목록 렌더링
const renderDiscussions = () => {
  const startIndex = (currentPageIndex - 1) * discussionsPerPage;
  const endIndex = startIndex + discussionsPerPage;
  const discussions = agoraStatesDiscussions.slice(startIndex, endIndex);

  const ul = document.querySelector("ul.discussions__container");
  ul.innerHTML = "";

  for (let i = 0; i < discussions.length; i += 1) {
    ul.append(convertToDiscussion(discussions[i]));
  }
};

// 초기화
updatePagination();
renderDiscussions();

//