// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  //image
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  //title
  const title = document.createElement("h2");
  title.className = "discussion__title";

  //title link
  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  title.append(titleLink);

  // info

  const info = document.createElement("div");
  info.className = "discussion__information";
  info.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString(
    "ko-KR"
  )}`;

  // title, info 삽입
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  discussionContent.append(title, info);

  // answered
  const answered = document.createElement("p");
  answered.textContent = obj.answer ? `☑` : "☒";
  if (obj.answer) {
    answered.textContent = `☑`;
  } else {
    answered.textContent = "☒";
    answered.classList.add("nope");
  }
  discussionAnswered.append(answered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, start, end) => {
  for (let i = start; i < end; i += 1) {
    // 10개까지만 렌더링
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// pagenation에 사용될 변수들
let minPage = 0;
let maxPage = 10;

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, minPage, maxPage);

const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");
let submitBtn = document.querySelector("#submitBtn");

const inputDataCheck = () => {
  //모든 폼을 작성하면 버튼 활성화
  if (inputName.value && inputTitle.value && inputStory.value) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
};

inputName.addEventListener("keyup", () => {
  //작성 시에
  inputDataCheck();
});

inputTitle.addEventListener("keyup", () => {
  inputDataCheck();
});

inputStory.addEventListener("keyup", () => {
  inputDataCheck();
});

const btn = (e) => {
  e.preventDefault();

  const newQuestion = {
    //새로운객체
    id: new Date(),
    createdAt: new Date().toString(),
    author: inputName.value,
    title: inputTitle.value,
    bodyHTML: inputStory.value,
    answer: "",
    url: "",
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };

  inputName.value = "";
  inputTitle.value = "";
  inputStory.value = "";

  agoraStatesDiscussions.unshift(newQuestion);
  ul.prepend(convertToDiscussion(newQuestion));
};

submitBtn.addEventListener("click", btn);

// pagenation
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

prevBtn.addEventListener("click", () => {
  // 뒤로가기
  if (minPage <= 0) return;
  while (ul.firstChild) {
    //기존 요소 없애기
    ul.firstChild.remove();
  }
  minPage -= 10; //감소
  maxPage -= 10;
  render(ul, minPage, maxPage);
});

nextBtn.addEventListener("click", () => {
  // 앞으로 가기
  if (maxPage > agoraStatesDiscussions.length) {
    return;
  }
  while (ul.firstChild) {
    //기존 요소 없애기
    ul.firstChild.remove();
  }
  minPage += 10; //증가
  maxPage += 10;

  render(ul, minPage, maxPage);
});
