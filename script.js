import {
  removeAllchild,
  getAgoraStatesDiscussions,
  setLocalStorage,
} from "./common.js";

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

let agoraStatesDiscussions = getAgoraStatesDiscussions();
const DEFAULT_AVATOR_IMAGE = "./avator_default.png";

const $ul = document.querySelector("ul.discussions__container");
const $discussions__area = document.querySelector(".discussions__area");

const $paginationNumbers = document.querySelector("#pagination-numbers");
const $paginationContainer = document.querySelector("#pagination-container");
const ITEM_SHOW_LIMIT = 10;
const PAGENATION_SHOW_LIMIT = 5;
let pagenationCurrentNum = 1;

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = ({
  title,
  author,
  avatarUrl,
  url,
  createdAt,
  answer,
}) => {
  const $li = document.createElement("li"); // $li 요소 생성
  $li.className = "discussion__container"; // 클래스 이름 지정

  const $iconX = document.createElement("i");
  $iconX.className = "fa-regular fa-square-xmark";

  const $iconCheckbox = document.createElement("i");
  $iconCheckbox.className = "fa-regular fa-square-check";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //image
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = avatarUrl ? avatarUrl : DEFAULT_AVATOR_IMAGE;
  avatarImg.alt = "avatar of " + author;
  avatarWrapper.append(avatarImg);

  // content
  const contentTitle = document.createElement("h2");
  contentTitle.className = "discussion__title";

  const contentTitleLink = document.createElement("a");
  contentTitleLink.href = url;
  contentTitleLink.textContent = title;
  contentTitle.append(contentTitleLink);
  discussionContent.append(contentTitle);

  const createdAtToLocale = new Date(createdAt).toLocaleString();
  const contentInfo = document.createElement("div");
  contentInfo.className = "discussion__information";
  contentInfo.textContent = `${author} / ${createdAtToLocale}`;
  discussionContent.append(contentInfo);

  // checkbox
  const checkbox = document.createElement("p");
  answer ? checkbox.append($iconCheckbox) : checkbox.append($iconX);
  discussionAnswered.append(checkbox);

  $li.append(avatarWrapper, discussionContent, discussionAnswered);
  return $li;
};

// page 버튼 클릭 이벤트
$paginationNumbers.addEventListener("click", (event) => {
  const $a = event.target.closest("a");

  if (!$a) {
    return;
  }

  pagenationCurrentNum = parseInt($a.id, 10);
  render();
});

// next / prev button 클릭
$paginationContainer.addEventListener("click", (event) => {
  const $a = event.target.closest("a");
  const pageCount = Math.ceil(agoraStatesDiscussions.length / ITEM_SHOW_LIMIT);

  if (!$a) {
    return;
  }

  if ($a.id !== "prev-button" && $a.id !== "next-button") {
    return;
  }

  const signal = $a.id === "prev-button" ? -1 : 1;
  const nextPage = parseInt(pagenationCurrentNum, 10) + parseInt(signal, 10);

  // 더이상 이동할 곳이 없는 경우
  if (nextPage === 0 || nextPage > pageCount) {
    return;
  }

  pagenationCurrentNum = nextPage;

  render();
});

// 하단 pagenation 리스트 출력
const renderPageNations = () => {
  $paginationNumbers.textContent = "";

  const pageCount = Math.ceil(agoraStatesDiscussions.length / ITEM_SHOW_LIMIT);
  const divPageNum = pagenationCurrentNum % PAGENATION_SHOW_LIMIT;
  const addNum = divPageNum === 0 ? -PAGENATION_SHOW_LIMIT + 1 : 1;

  const displayStartPageNum = pagenationCurrentNum - divPageNum + addNum;
  const displayEndPageNum = displayStartPageNum + PAGENATION_SHOW_LIMIT - 1;

  if (displayEndPageNum > pageCount) {
    displayEndPageNum = pageCount;
  }

  for (let i = displayStartPageNum; i <= displayEndPageNum; i++) {
    const $a = document.createElement("a");
    $a.href = "#";
    $a.textContent = i;
    $a.id = i;
    $a.className = pagenationCurrentNum === i ? "active" : "";
    $paginationNumbers.append($a);
  }
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = () => {
  const $ul = document.createElement("ul");
  $ul.className = "discussions__container";

  $discussions__area.textContent = "";

  const displayDiscussions = agoraStatesDiscussions.slice(
    (pagenationCurrentNum - 1) * 10,
    pagenationCurrentNum * 10
  );

  for (let i = 0; i < displayDiscussions.length; i += 1) {
    $ul.append(convertToDiscussion(displayDiscussions[i]));
  }

  $discussions__area.append($ul);
  renderPageNations();
  return;
};

// $ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render();

//form submit 기능, Discussions 배열에 요소 추가 후 재출력
const formSubmitButton = document.querySelector(".form__submit > input");
formSubmitButton.addEventListener("click", (event) => {
  const { name, title, story } = event.target.form;
  const createdAt = new Date().toISOString();

  if (!name.value || !title.value || !story.value) {
    return;
  }

  const discussionItem = {
    createdAt,
    title: title.value,
    author: name.value,
    url: "",
    avatarUrl: "",
    answer: null,
  };

  agoraStatesDiscussions = [discussionItem, ...agoraStatesDiscussions];
  setLocalStorage("agoraStatesDiscussions", agoraStatesDiscussions);
  render();

  name.value = "";
  title.value = "";
  story.value = "";
});
