// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log("dummy data: ", agoraStatesDiscussions);

const LOCAL_STORAGE_KEY = "discussion";
const savedDiscussion = localStorage.getItem(LOCAL_STORAGE_KEY); // string value 값
let data;
if (savedDiscussion) {
  data = JSON.parse(savedDiscussion); // [{…}, {…}, {…}]
} else {
  // localStorage에 저장된 데이터가 없다면 data 변수에 더미 데이터를 복사
  data = agoraStatesDiscussions.slice();
}

// Pagenation 작업
// 1. 필요한 변수 지정
const $ul = document.querySelector("ul.discussions__container");
const $btns = document.querySelector(".pagination__wrapper"); // 페이지 버튼을 담기 위한 부모 리스트 요소

const NUMBER_OF_CONTENTS = data.length;
const MAX_CONTENT = 10;
const MAX_BUTTON = 3;
const MAX_PAGE = Math.ceil(NUMBER_OF_CONTENTS / MAX_CONTENT);
let page = 1;

// 2. discussion 목록 & 페이지 이동 버튼 생성 함수 선언
const makeContent = (obj) => {
  const mainli = document.createElement("li");
  mainli.className = "discussions__item";
  const ul = document.createElement("ul");
  ul.className = '"discussions__question__answer__container';
  mainli.append(ul);

  const liQuestion = document.createElement("li");
  const liAnswer = document.createElement("li");

  // @param target: liQuestion or liAnswer
  // @param data: obj or obj.answer (데이터를 써야할 객체가 어느 것인지 지정)
  function createChildNodes(target, data) {
    switch (target) {
      case liQuestion:
        target.className = "discussion__question";
        break;
      case liAnswer:
        target.className = "discussion__answer";
        break;
    }

    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content";

    const avatarImg = document.createElement("img");
    avatarImg.className = "discussion__avatar--image";
    avatarImg.src = data.avatarUrl;
    avatarImg.alt = "avatar of " + data.author;
    avatarWrapper.append(avatarImg);

    // discussionContent 하위요소 만들기
    const discussionInformation = document.createElement("div");
    discussionInformation.className = "discussion__information";
    const discussionTitle = document.createElement("p");
    discussionTitle.className = "discussion__title";
    const discussionAnswered = document.createElement("div");
    discussionAnswered.className = "discussion__answered";

    // 1. discussionInformation
    const span1 = document.createElement("span");
    span1.className = "discussion__author";
    span1.textContent = data.author;
    const span2 = document.createElement("span");
    span2.className = "discussion__createdAt";
    span2.textContent = new Date(data.createdAt).toLocaleString();
    discussionInformation.append(span1, span2);
    // 2. discussionTitle
    const a = document.createElement("a");
    a.href = data.url;
    a.textContent = data.title;
    discussionTitle.append(a);
    // 3. discussionAnswered
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
    // 4. discussionContent에 append 해주기
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

// 3. 페이지 이동 함수 : 이전 페이지, 다음 페이지 이동
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

// 4. 렌더링 함수 : 화면에 discussion 목록과 페이지 이동 버튼 보여주기
function renderContent(page) {
  // 목록 리스트 초기화
  while ($ul.hasChildNodes()) {
    $ul.removeChild($ul.lastChild);
  }

  // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 MAX_CONTENT 개의 글 생성
  for (
    let id = (page - 1) * MAX_CONTENT + 1;
    id <= page * MAX_CONTENT && id <= NUMBER_OF_CONTENTS;
    id++
  ) {
    $ul.append(makeContent(data[id - 1]));
  }
}

function renderButton(page) {
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
}

const render = (page) => {
  renderContent(page);
  renderButton(page);
};
render(page);

// new Discussion 등록
function handleNewDiscussion(event) {
  event.preventDefault();
  const author = document.querySelector("#author");
  const title = document.querySelector("#title");
  const questionBody = document.querySelector("#story");

  // 랜덤 아바타 이미지 저장 (16종 이미지 준비)
  const avatars = [];
  for (let i = 1; i <= 16; i++) {
    avatars.push({ avatarUrl: `./assets/img/avatar/${i}.png` });
  }
  // 아바타 배열 중 하나를 랜덤으로 선택
  const randomAvatar = avatars[Number.parseInt(Math.random() * avatars.length)];

  const newObj = {
    id: "",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML: `<p>${questionBody.value}</p>`,
    avatarUrl: randomAvatar.avatarUrl,
  };

  author.value = "";
  title.value = "";
  questionBody.value = "";

  // 데이터 배열에 새로운 질문 추가
  data.unshift(newObj);

  // 로컬 스토리지에 저장
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

  // 렌더링
  render(page);
}

const $form = document.querySelector("#discussion__form");
$form.addEventListener("submit", handleNewDiscussion);
