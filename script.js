// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const ul = document.querySelector("ul.discussions__container");
const $paginationNumbers = document.querySelector("#pagination-numbers");
const $paginationContainer = document.querySelector("#pagination-container");
const paginationLimit = 10;
let pagenationCurrentNum = 1;

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = ({ title, author, avatarUrl, url, createdAt }) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

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
  avatarImg.src = avatarUrl;
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
  const removeButton = document.createElement("p");
  removeButton.textContent = "☑";
  discussionAnswered.append(removeButton);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

$paginationNumbers.addEventListener("click", (event) => {
  const $a = event.target.closest("a");

  if (!$a) {
    return;
  }

  pagenationCurrentNum = $a.id;
  render(ul, $a.id);
});

$paginationContainer.addEventListener("click", (event) => {
  const $a = event.target.closest("a");
  const pageCount = Math.ceil(agoraStatesDiscussions.length / paginationLimit);

  if (!$a) {
    return;
  }

  if ($a.id !== "prev-button" && $a.id !== "next-button") {
    return;
  }

  const signal = event.id === "prev-button" ? -1 : 1;
  const nextPage = pagenationCurrentNum + signal;

  // 더이상 이동할 곳이 없는 경우
  if (nextPage === 0 || nextPage > pageCount) {
    return;
  }

  pagenationCurrentNum = nextPage;

  render(ul, pagenationCurrentNum);
});

const renderPageNations = () => {
  removeAllchild($paginationNumbers);
  const pageCount = Math.ceil(agoraStatesDiscussions.length / paginationLimit);

  for (let i = 1; i <= pageCount; i++) {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = i;
    a.id = i;
    $paginationNumbers.append(a);
  }
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, pageNum = 1) => {
  renderPageNations();

  removeAllchild(element);
  const displayDiscussions = agoraStatesDiscussions.slice(
    (pageNum - 1) * 10,
    pageNum * 10
  );

  for (let i = 0; i < displayDiscussions.length; i += 1) {
    element.append(convertToDiscussion(displayDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render(ul);

//디스커션 추가 기능
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
  };

  agoraStatesDiscussions = [discussionItem, ...agoraStatesDiscussions];
  render(ul);
});

//입력 받은 요소의 자식 노드를 모두 삭제하는 함수
function removeAllchild(div) {
  while (div.hasChildNodes()) {
    div.removeChild(div.firstChild);
  }
}
