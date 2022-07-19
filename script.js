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

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";

  const title = document.createElement("h2");
  title.className = "discussion__title";

  const info = document.createElement("div");
  info.className = "discussion__information";

  const titleLink = document.createElement("a");

  // pagenation

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  //이미지 처리
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  //title 처리
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  title.append(titleLink);
  // info
  info.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString(
    "ko-KR"
  )}`;
  // title, info 삽입
  discussionContent.append(title, info);
  // answered
  const answered = document.createElement("p");
  answered.textContent = obj.answer ? `☑` : "☒";
  discussionAnswered.append(answered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, start, end) => {
  for (let i = start; i < end; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

let minPage = 0;
let maxPage = 10;
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, minPage, maxPage);

const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");

let submitBtn = document.querySelector("#submitBtn");

inputName.addEventListener("keyup", () => {
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

const inputDataCheck = () => {
  if (inputName.value && inputTitle.value && inputStory.value) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
};

// pagenation

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

nextBtn.addEventListener("click", () => {
  if (maxPage > agoraStatesDiscussions.length) {
    return;
  }
  while (ul.firstChild) {
    ul.firstChild.remove();
  }
  minPage += 10;
  maxPage += 10;

  render(ul, minPage, maxPage);
});

prevBtn.addEventListener("click", () => {
  if (minPage <= 0) return;
  while (ul.firstChild) {
    ul.firstChild.remove();
  }
  minPage -= 10;
  maxPage -= 10;
  render(ul, minPage, maxPage);
});
