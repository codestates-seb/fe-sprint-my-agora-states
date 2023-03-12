// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// local storage 구현을 위한 data 변수 선언
let data;
const dataFromLocalStorage = localStorage.getItem("agoraStatesDiscussions");
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage);
} else {
  data = agoraStatesDiscussions.slice();
}

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

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionContent.append(discussionTitle, discussionInformation);
  discussionInformation.textContent = `${obj["author"]} / ${new Date(
    obj["createdAt"]
  ).toLocaleString()}`;

  const discussionTitleLink = document.createElement("a");
  discussionTitleLink.href = obj["url"];
  discussionTitleLink.textContent = obj["title"];
  discussionTitle.append(discussionTitleLink);

  const avaterImg = document.createElement("img");
  avaterImg.className = "discussion__avatar--image";
  avaterImg.src = obj["avatarUrl"];
  avaterImg.art = "avatar of " + obj["author"];
  avatarWrapper.append(avaterImg);

  const answerCheck = document.createElement("img");
  answerCheck.className = "answerCheck";
  if (obj["answer"]) {
    answerCheck.src =
      "https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_1280.png";
  } else {
    answerCheck.src =
      "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_1280.png";
  }
  discussionAnswered.append(answerCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// local storage 구현을 위해 배열을 data로 수정
const render = (element, from, to) => {
  console.log(from.to);
  if (!from && !to) {
    from = 0;
    to = data.length - 1;
  }

  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = from; i < to; i++) {
    element.append(convertToDiscussion(data[i]));
  }
};

// 페이지네이션 이전,다음 기능 구현

let limit = 10,
  page = 1;

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 0, limit);

const getPageStartEnd = (limit, page) => {
  const length = agoraStatesDiscussions.length - 1;
  let pageStart = Number(page - 1) * Number(limit);
  let pageEnd = Number(pageStart) + Number(limit);
  if (page <= 0) {
    pageStart = 0;
  }
  if (pageEnd >= length) {
    pageEnd = length;
  }
  return { pageStart, pageEnd };
};

const buttons = document.querySelector("section.buttons");

buttons.firstElementChild.addEventListener("click", () => {
  if (page > 1) {
    page = page - 1;
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});

buttons.lastElementChild.addEventListener("click", () => {
  if (limit * page < agoraStatesDiscussions.length - 1) {
    page = page + 1;
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});

// local storage reset 버튼 구현

const resetButton = document.querySelector("section.localStorage_reset");
resetButton.addEventListener("click", () => {
  localStorage.removeItem("agoraStatesDiscussions");
  data = agoraStatesDiscussions.slice();
  limit = 10;
  page = 1;
  render(ul, 0, limit);
});

// 페이지네이션 (1,2,3,..) 기능 구현

const totalItems = agoraStatesDiscussions.length;
const totalPages = Math.ceil(Number(totalItems) / Number(limit));

const paginationContainer = document.querySelector(".numberingButtons");

const createPaginationClickHandler = (i) => {
  return () => {
    page = i;
    const { pageStart, pageEnd } = getPageStartEnd(limit, page);
    render(ul, pageStart, pageEnd);
  };
};

for (let i = 1; i <= totalPages; i++) {
  const paginationItem = document.createElement("button");
  paginationItem.textContent = i;
  paginationContainer.appendChild(paginationItem);

  paginationItem.addEventListener("click", createPaginationClickHandler(i));
}

// 디스커션 추가 기능 구현
// limit 변수 선언 뒤로 위치 변경

const form = document.querySelector(".form");

const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputQuesiton = document.querySelector("#story");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newdiscussion = {
    id: "none",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://sebfe-codestates.zendesk.com/hc/ko",
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuesiton.value,
    avatarUrl:
      "https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635449_1280.png",
  };

  // ul.prepend(convertToDiscussion(newdiscussion));
  // ul의 자식으로 넣는 대신 앞에서부터 data 배열에 추가
  data.unshift(newdiscussion);

  // local storage에 저장
  localStorage.setItem("agoraStatesDiscussions", JSON.stringify(data));

  render(ul, 0, limit);

  inputName.value = inputTitle.value = inputQuesiton.value = "";
});
