// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const mainli = document.createElement("li");
  mainli.className = "discussions__item";
  const ul = document.createElement("ul");
  ul.className = '"discussions__question__answer__container';
  mainli.append(ul);

  const liQuestion = document.createElement("li");
  const liAnswer = document.createElement("li");

  function createChildNodes(target, data) {
    if (target === liQuestion) {
      target.className = "discussion__question";
    } else if (target === liAnswer) {
      target.className = "discussion__answer";
    }

    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content";

    const avatarImg = document.createElement("img");
    avatarImg.className = "discussion__avatar--image";
    avatarImg.src = data.avatarUrl;
    avatarImg.src = data.avatarUrl;
    avatarImg.alt = "avatar of " + data.author;
    avatarWrapper.append(avatarImg);

    //   discussionContent 하위요소 만들기
    const discussionInformation = document.createElement("div");
    discussionInformation.className = "discussion__information";
    const discussionTitle = document.createElement("h2");
    discussionTitle.className = "discussion__title";
    const discussionAnswered = document.createElement("div");
    discussionAnswered.className = "discussion__answered";

    // 1. information
    const span1 = document.createElement("span");
    span1.className = "discussion__author";
    span1.textContent = data.author;
    const span2 = document.createElement("span");
    span2.className = "discussion__createdAt";
    span2.textContent = new Date(data.createdAt).toLocaleString();
    discussionInformation.append(span1, span2);
    // 2. title
    const a = document.createElement("a");
    a.href = data.url;
    a.textContent = data.title;
    discussionTitle.append(a);
    // 3. answered
    const iconImg = document.createElement("img");
    iconImg.className = "discussion__answered--chat-icon";
    iconImg.src = "./assets/img/chat.svg";
    iconImg.alt = "chat icon";
    const numberOfAnswer = document.createElement("span");
    numberOfAnswer.className = "discussion__answered--number-of-answer";
    if (target === liQuestion && data.answer !== null) {
      numberOfAnswer.textContent = "1";
    }
    discussionAnswered.append(iconImg, numberOfAnswer);
    // 4. append 해주기
    discussionContent.append(
      discussionInformation,
      discussionTitle,
      discussionAnswered
    );
    target.append(avatarWrapper, discussionContent);
  }

  createChildNodes(liQuestion, obj);

  // 답변이 있는 경우
  if (obj.answer !== null) {
    createChildNodes(liAnswer, obj.answer);
  }

  obj.answer === null ? ul.append(liQuestion) : ul.append(liQuestion, liAnswer);

  return mainli;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const $ul = document.querySelector("ul.discussions__container");

// localStorage 에 데이터 저장하고 화면에 뿌려주기
const LOCAL_STORAGE_KEY = "discussion";
let newDiscussionArr = [];

function saveDiscussions() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newDiscussionArr));
}

function paintDiscussion(newDiscussion) {
  // newDiscussion === convertToDiscussion(obj) : return mainli
  $ul.prepend(newDiscussion);
}

function handleDiscussionSubmit(event) {
  event.preventDefault();
  const author = document.querySelector("#author");
  const title = document.querySelector("#title");
  const questionBody = document.querySelector("#story");

  // 랜덤 아바타 이미지 저장
  const avatars = [
    { avatarUrl: "./assets/img/avatar/1.png" },
    { avatarUrl: "./assets/img/avatar/2.png" },
    { avatarUrl: "./assets/img/avatar/3.png" },
    { avatarUrl: "./assets/img/avatar/4.png" },
    { avatarUrl: "./assets/img/avatar/5.png" },
    { avatarUrl: "./assets/img/avatar/6.png" },
    { avatarUrl: "./assets/img/avatar/7.png" },
    { avatarUrl: "./assets/img/avatar/8.png" },
    { avatarUrl: "./assets/img/avatar/9.png" },
    { avatarUrl: "./assets/img/avatar/10.png" },
    { avatarUrl: "./assets/img/avatar/11.png" },
    { avatarUrl: "./assets/img/avatar/12.png" },
    { avatarUrl: "./assets/img/avatar/13.png" },
    { avatarUrl: "./assets/img/avatar/14.png" },
    { avatarUrl: "./assets/img/avatar/15.png" },
    { avatarUrl: "./assets/img/avatar/16.png" },
  ];
  // 아바타 배열 중 하나를 랜덤으로 선택
  const randomAvatar = avatars[Number.parseInt(Math.random() * avatars.length)];

  let newObj = {
    id: "",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "",
    author: author.value,
    answer: null,
    bodyHTML: `<p>${questionBody.value}</p>`,
    avatarUrl: randomAvatar.avatarUrl,
  };

  author.value = "";
  title.value = "";
  questionBody.value = "";

  newDiscussionArr.push(newObj);
  paintDiscussion(convertToDiscussion(newObj));
  saveDiscussions();
}

const $form = document.querySelector("#discussion__form");
$form.addEventListener("submit", handleDiscussionSubmit);

const savedDiscussion = localStorage.getItem(LOCAL_STORAGE_KEY); // string value 값

if (savedDiscussion !== null) {
  const parsedDiscussions = JSON.parse(savedDiscussion); // [{…}, {…}, {…}]
  newDiscussionArr = parsedDiscussions; // 새로 고침하면 배열이 빈 배열이 되기 때문에 local storage에 있는 값을 배열에 넣어주는 과정
  parsedDiscussions.forEach((element) =>
    paintDiscussion(convertToDiscussion(element))
  );
}

// @description Pagenation 작업

// 1. 필요한 변수 지정
// contents === $ul : 이미 $ul 선언되어 있음
const $btns = document.querySelector(".pagination__wrapper"); // 페이지 버튼을 담기 위한 부모 리스트 요소

const NUMBER_OF_CONTENTS =
  agoraStatesDiscussions.length + newDiscussionArr.length;
const MAX_CONTENT = 10;
const MAX_BUTTON = 3;
const MAX_PAGE = Math.ceil(NUMBER_OF_CONTENTS / MAX_CONTENT);
let page = 1;
let arrForRendering = [];

// 4. 페이지 이동 함수 : 이전 페이지, 다음 페이지 이동
const goPrevPage = () => {
  page -= MAX_BUTTON;
  render(page);
};

const goNextPage = () => {
  page += MAX_BUTTON;
  render(page);
};

const prev = document.createElement("button");
prev.classList.add("button", "prev");
prev.addEventListener("click", goPrevPage);

const next = document.createElement("button");
next.classList.add("button", "next");
next.addEventListener("click", goNextPage);

// 2. discussion 목록 & 페이지 이동 버튼 생성 함수 선언
// makeContent === convertToDiscussion 함수 이미 선언되어 있음 : return mainli
const makeButtons = (id) => {
  const button = document.createElement("button");
  button.classList.add("button");
  button.dataset.num = id;
  button.textContent = id;
  button.addEventListener("click", (event) => {
    Array.prototype.forEach.call($btns.children, (button) => {
      if (button.dataset.num) button.classList.remove("active");
    });
    event.target.classList.add("active");
    renderContent(parseInt(event.target.dataset.num));
  });
  return button;
};

// 3. 렌더링 함수 : 화면에 discussion 목록과 페이지 이동 버튼 보여주기
function renderContent(page) {
  // 목록 리스트 초기화
  while ($ul.hasChildNodes()) {
    $ul.removeChild($ul.lastChild);
  }

  // 최종 렌더링 전에 arrforRendering 배열에 기존 dummy Data와 form 제출로 새로 생성한 local storage 데이터 합치기
  arrForRendering = [...agoraStatesDiscussions];
  newDiscussionArr.forEach((element) => {
    arrForRendering.unshift(element);
  });

  // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 MAX_CONTENT 개의 글 생성
  for (
    let id = (page - 1) * MAX_CONTENT + 1;
    id <= page * MAX_CONTENT && id <= NUMBER_OF_CONTENTS;
    id++
  ) {
    $ul.append(convertToDiscussion(arrForRendering[id - 1]));
  }
}

const renderButton = (page) => {
  // 버튼 리스트 초기화
  while ($btns.hasChildNodes()) {
    $btns.removeChild($btns.lastChild);
  }
  // 화면에 최대 MAX_BUTTON 개개의 페이지 버튼 생성
  for (let id = page; id < page + MAX_BUTTON && id <= MAX_PAGE; id++) {
    $btns.appendChild(makeButtons(id));
  }
  // 첫 버튼 활성화 : class='active'
  $btns.children[0].classList.add("active");

  $btns.prepend(prev);
  $btns.append(next);

  // 이전, 다음 페이지 버튼이 필요한지 체크
  if (page - MAX_BUTTON < 1) $btns.removeChild(prev);
  if (page + MAX_BUTTON > MAX_PAGE) $btns.removeChild(next);
};

const render = (page) => {
  renderContent(page);
  renderButton(page);
};
render(page);
