// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

const STORAGE_KEY = "discussions";

const submitBtn = document.querySelector(".form__submit");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");
const discussionNumInfo = document.querySelector("#discussion--num");
const pageBtns = document.querySelector("#page--btns");
const modeBtn = document.querySelector("#theme--btn");
let pageBtn = document.querySelectorAll(".page--btn");

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

let savedDiscussions = localStorage.getItem(STORAGE_KEY);
let parsedDiscussions = JSON.parse(savedDiscussions);

let isDark = true;
const darkBg = "dark--bg";
const darkComponent = "dark--component";
const darkFont = "dark--font";
const darkBorder = "dark--border";
const darkBtn = "dark--btn";
const darkNotice = "dark--notice";
const darkCurrentPageBtn = "dark--current-btn";

const lightBg = "light--bg";
const lightComponent = "light--component";
const lightFont = "light--font";
const lightBorder = "light--border";
const lightBtn = "light--btn";
const lightNotice = "light--notice";
const lightCurrentPageBtn = "light--current-btn";

const avatarLength = "64px";
const showNum = 10;
let page = 0;
let maxPage = Math.ceil(parsedDiscussions.length / showNum);
const pageBtnColor = "#2dcddf";
const currentPageBtnColor = "#6C00FF";
const numInfoSentence = "현재 Discussion 개수: ";

const saveDiscussions = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(agoraStatesDiscussions));

  savedDiscussions = localStorage.getItem(STORAGE_KEY);
  parsedDiscussions = JSON.parse(savedDiscussions);
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  if (isDark) {
    li.classList.add(darkComponent);
    li.classList.add(darkBorder);
  } else {
    li.classList.add(lightComponent);
    li.classList.add(lightBorder);
  }

  // 아바타
  // 1. discussion__avatar--wrapper 생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  // 2. discussion__avatar--image 생상
  const avatarImg = document.createElement("img");
  avatarImg.classList.add("iscussion__avatar--image");

  // 3. img의 src 지정
  avatarImg.src = obj.avatarUrl;
  avatarImg.style.width = avatarLength;
  avatarImg.style.height = avatarLength;

  // 4. img의 alt 지정
  avatarImg.alt = "avatar of " + obj.author;

  // 5. avatar wrapper에 avatar image를 append
  avatarWrapper.append(avatarImg);

  // ======================================================================

  // discussion content

  // 1. discussion content 생성
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  // 2. discussion title 생성
  const discussionTitle = document.createElement("h2");
  discussionTitle.classList.add("discussion__title");

  // 3. a 생성
  const discussionA = document.createElement("a");

  // 4. a의 textContent를 추가
  discussionA.textContent = obj.title;

  // 5. a에 href 추가
  discussionA.href = obj.url;

  // 5-1. discussion title에 discussion a 를 append
  discussionTitle.append(discussionA);

  // 6. information 생성
  const discussionInformation = document.createElement("div");
  discussionInformation.classList.add("discussion__information");

  // 7. information의 textContent 추가
  discussionInformation.textContent = `${obj.id} / ${obj.createdAt}`;

  // 8. discussion content에 title을 append
  discussionContent.append(discussionTitle);

  // 9.discussio content에 information을 append
  discussionContent.append(discussionInformation);

  // ======================================================================

  // answered

  // 1. discussion answered 생성
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 2. p 생성
  const discussionCheckIcon = document.createElement("p");

  // 3. p에 체크 이모티콘 삽입
  discussionCheckIcon.textContent = obj.answer ? "☑️" : "❌";

  // 4. discussion informationd에 p를 append
  discussionAnswered.append(discussionCheckIcon);

  // ======================================================================

  // 전부 합치기

  // 1. li에 avatar를 append
  li.append(avatarWrapper);

  // 2. li에 content를 append
  li.append(discussionContent);

  // 3. li에 answered를 append
  li.append(discussionAnswered);

  // li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }

  return;
};

const pageRender = (element) => {
  const lastIndex =
    page * showNum + showNum > parsedDiscussions.length
      ? parsedDiscussions.length
      : page * showNum + showNum;

  for (let i = page * showNum; i < lastIndex; ++i) {
    element.append(convertToDiscussion(parsedDiscussions[i]));
  }

  return;
};

// 페이지 버튼을 만드는 함수
const makePageBtn = (pageNum) => {
  // 페이지 버튼은 div.page--btn
  // textContent는 주어진 번호
  const pageBtn = document.createElement("div");
  pageBtn.classList.add("page--btn");
  pageBtn.textContent = pageNum;

  if (isDark) {
    pageBtn.classList.add(darkBtn);
    pageBtn.classList.add(darkBorder);
    pageBtn.classList.add(darkFont);
  } else {
    pageBtn.classList.add(lightBtn);
    pageBtn.classList.add(lightBorder);
    pageBtn.classList.add(lightFont);
  }

  // 만약 버튼의 숫자가 현재 페이지 번호(인덱스이므로 +1)과 같다면 색깔을 바꿔줌
  if (pageNum === page + 1) {
    pageBtn.classList.remove(darkBtn);
    pageBtn.classList.add(darkCurrentPageBtn);
  }

  // 만든 페이지 버튼을 반환
  return pageBtn;
};

const renderPageBtns = () => {
  for (let i = 0; i < maxPage; ++i) {
    pageBtns.append(makePageBtn(i + 1));
  }

  pageBtn = document.querySelectorAll(".page--btn");

  pageBtnCheck();
};

const handleSubmit = (event) => {
  event.preventDefault();

  if (
    inputName.value === "" ||
    inputTitle.value === "" ||
    inputStory.value === ""
  ) {
    return;
  }

  const today = new Date();

  const newDiscussion = {
    id: inputName.value,
    createdAt: `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}T${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}Z`,
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/6",
    author: inputName.value,
    answer: null,
    bodyHTML: inputStory.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };

  agoraStatesDiscussions.unshift(newDiscussion);
  saveDiscussions();

  if (parsedDiscussions.length % 10 == 1) {
    maxPage = Math.ceil(parsedDiscussions.length / showNum);
    pageBtns.append(makePageBtn(maxPage));
    pageBtn = document.querySelectorAll(".page--btn");

    pageBtnCheck();
  }

  discussionNumInfo.textContent = `${numInfoSentence}${agoraStatesDiscussions.length}개`;

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  pageRender(ul);
};

// page 버튼이 눌렸을 경우
const handlePageBtnClick = (event) => {
  event.preventDefault();

  // 기존의 페이지 버튼의 색을 일반 버튼의 색으로 바꾼다
  if (isDark) {
    pageBtn[page].classList.remove(darkCurrentPageBtn);
    pageBtn[page].classList.add(darkBtn);
  } else {
    pageBtn[page].classList.remove(lightCurrentPageBtn);
    pageBtn[page].classList.add(lightBtn);
  }

  // 페이지를 눌린 페이지로 갱신한다.
  page = event.target.textContent - 1;

  // 새롭게 갱신된 페이지의 버튼의 색을 바꾼더
  if (isDark) {
    pageBtn[page].classList.add(darkCurrentPageBtn);
    pageBtn[page].classList.remove(darkBtn);
  } else {
    pageBtn[page].classList.add(lightCurrentPageBtn);
    pageBtn[page].classList.remove(lightBtn);
  }

  // 기존에 존재하던 이전 페이지의 discussion들을 전부 삭제한다.
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  // 현재 페이지의 discussion들을 새롭게 render한다.
  pageRender(ul);
};

const pageBtnCheck = () => {
  pageBtn.forEach((btn) => btn.addEventListener("click", handlePageBtnClick));
};

const changeTheme = () => {
  if (isDark) {
    const darkBgs = document.querySelectorAll(".dark--bg");
    console;
    darkBgs.forEach((b) => {
      b.classList.remove(darkBg);
      b.classList.add(lightBg);
    });

    const darkComponents = document.querySelectorAll(".dark--component");
    darkComponents.forEach((c) => {
      c.classList.remove(darkComponent);
      c.classList.add(lightComponent);
    });

    const darkFonts = document.querySelectorAll(".dark--font");
    darkFonts.forEach((fnt) => {
      fnt.classList.remove(darkFont);
      fnt.classList.add(lightFont);
    });

    const darkBorders = document.querySelectorAll(".dark--border");
    darkBorders.forEach((b) => {
      b.classList.remove(darkBorder);
      b.classList.add(lightBorder);
    });

    const darkBtns = document.querySelectorAll(".dark--btn");
    darkBtns.forEach((b) => {
      b.classList.remove(darkBtn);
      b.classList.add(lightBtn);
    });

    const darkNotices = document.querySelectorAll(".dark--notice");
    darkNotices.forEach((ntc) => {
      ntc.classList.remove(darkNotice);
      ntc.classList.add(lightNotice);
    });

    const darkCurrentBtns = document.querySelectorAll(".dark--current-btn");
    darkCurrentBtns.forEach((b) => {
      b.classList.remove(darkCurrentPageBtn);
      b.classList.add(lightCurrentPageBtn);
    });

    isDark = false;
    modeBtn.textContent = "🌙";
  } else {
    const lightBgs = document.querySelectorAll(".light--bg");
    lightBgs.forEach((b) => {
      b.classList.remove(lightBg);
      b.classList.add(darkBg);
    });

    const lightComponents = document.querySelectorAll(".light--component");
    lightComponents.forEach((c) => {
      c.classList.remove(lightComponent);
      c.classList.add(darkComponent);
    });

    const lightFonts = document.querySelectorAll(".light--font");
    lightFonts.forEach((fnt) => {
      fnt.classList.remove(lightFont);
      fnt.classList.add(darkFont);
    });

    const lightBorders = document.querySelectorAll(".light--border");
    lightBorders.forEach((b) => {
      b.classList.remove(lightBorder);
      b.classList.add(darkBorder);
    });

    const lightBtns = document.querySelectorAll(".light--btn");
    lightBtns.forEach((b) => {
      b.classList.remove(lightBtn);
      b.classList.add(darkBtn);
    });

    const lightNotices = document.querySelectorAll(".light--notice");
    lightNotices.forEach((ntc) => {
      ntc.classList.remove(lightNotice);
      ntc.classList.add(darkNotice);
    });

    const lightCurrentBtns = document.querySelectorAll(".light--current-btn");
    lightCurrentBtns.forEach((b) => {
      b.classList.remove(lightCurrentPageBtn);
      b.classList.add(darkCurrentPageBtn);
    });

    isDark = true;
    modeBtn.textContent = "☀️";
  }
};

// render(ul);
saveDiscussions();
pageRender(ul);
renderPageBtns();

modeBtn.addEventListener("click", changeTheme);
submitBtn.addEventListener("click", handleSubmit);
pageBtnCheck();
// pageBtn.forEach((btn) => btn.addEventListener("click", handlePageBtnClick));
/* for (let i = 0; i < pageBtn.length; ++i) {
  pageBtn[i].addEventListener("click", handlePageBtnClick);
} */
