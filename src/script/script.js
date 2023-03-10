let pageNumber = 1;
const PAGE_SIZE = 9;
const LOCAL_STORAGE_KEY = "agora";

const loadLocalStorageDate = () => {
  const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  return JSON.parse(data);
};

const saveLocalStorageDate = (data) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

// 페이징 작업 (0~8) (9~17) (18~26)
// 페이지는 1부터 시작이지만, 게시글은 인덱스 0번부터 불러온다.
const getPagedDiscussions = (pageNumber) => {
  const pageSize = PAGE_SIZE;
  const startIndex = pageSize * (pageNumber - 1);
  const endIndex = startIndex + (pageSize - 1);

  return loadLocalStorageDate().slice(startIndex, endIndex + 1);
};
const createNavi = (ul) => {
  const naviSize = Math.ceil(loadLocalStorageDate().length / PAGE_SIZE);
  const pageNavigator = document.querySelector(".page-container");

  // '<' 버튼을 누르면 pageNumber - 1 해주기
  const naviPrev = document.createElement("a");
  naviPrev.textContent = "<";
  naviPrev.className = "pagination-button";
  naviPrev.href = "#";
  naviPrev.addEventListener("click", (e) => {
    let $active = document.getElementById(`${pageNumber}`);
    $active.classList.remove("active");
    e.preventDefault();
    pageNumber = pageNumber - 1;
    if (pageNumber < 1) pageNumber = 1;

    $active = document.getElementById(`${pageNumber}`);
    $active.classList.add("active");
    console.log("page", pageNumber);

    render(ul);
  });
  pageNavigator.appendChild(naviPrev);

  // '숫자' 버튼을 누르면 해당 pageNumber로 렌더링
  for (let i = 0; i < naviSize; i++) {
    const navi = document.createElement("a");
    navi.textContent = i + 1;
    navi.id = i + 1;
    navi.className = "pagination-button";
    navi.addEventListener("click", (e) => {
      let $active = document.getElementById(`${pageNumber}`);
      $active.classList.remove("active");
      let num = e.target.textContent;
      // pageNumber = navi.id;
      pageNumber = Number(num);
      $active = document.getElementById(`${pageNumber}`);
      $active.classList.add("active");
      render(ul);
    });
    pageNavigator.appendChild(navi);
  }
  const init = document.getElementById("1");
  init.classList.add("active");

  // '>' 버튼을 누르면 pageNumber + 1 해주기
  const naviEnd = document.createElement("a");
  naviEnd.textContent = ">";
  naviEnd.className = "pagination-button";
  naviEnd.href = "#";
  naviEnd.addEventListener("click", (e) => {
    let $active = document.getElementById(`${pageNumber}`);
    $active.classList.remove("active");
    e.preventDefault();
    pageNumber = pageNumber + 1;
    if (pageNumber > naviSize) pageNumber = naviSize;
    $active = document.getElementById(`${pageNumber}`);
    $active.classList.add("active");
    render(ul);
  });
  pageNavigator.appendChild(naviEnd);
};

if (!loadLocalStorageDate()) {
  saveLocalStorageDate(agoraStatesDiscussions);
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const contentTitle = document.createElement("h2");
  contentTitle.className = "discussion__title";
  discussionContent.append(contentTitle);

  const contentTitleLink = document.createElement("a");
  contentTitleLink.href = obj.url;
  contentTitleLink.textContent = obj.title;
  contentTitle.append(contentTitleLink);

  const contentInformation = document.createElement("div");
  contentInformation.className = "discussion__information";
  discussionContent.append(contentInformation);

  contentInformation.textContent = `${obj.author} ${new Date(
    obj.createdAt
  ).toLocaleString("ko-KR")}`;

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  obj.answer
    ? (discussionAnswered.textContent = "☑")
    : (discussionAnswered.textContent = "☒");

  if (discussionAnswered.textContent === "☒") {
    discussionAnswered.className = "discussion__not-answered";
  }

  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarImg.className = "avatar--image";
  avatarWrapper.append(avatarImg);

  const discussionCard = document.createElement("div");
  discussionCard.className = "discussion__card";
  discussionCard.append(avatarWrapper, discussionContent, discussionAnswered);

  li.append(discussionCard);
  const ul = document.querySelector("ul.discussions__container");
  ul.append(li);

  if (obj.answer) {
    const answerContainer = document.createElement("div");
    answerContainer.className = "answer__container";

    const answerAvatarWrapper = document.createElement("div");
    answerAvatarWrapper.className = "answer__avatar--wrapper";
    const answerAvatarImage = document.createElement("img");
    answerAvatarImage.className = "answer__avatar--image";
    answerAvatarImage.src = obj.answer.avatarUrl;
    answerAvatarImage.alt = "avatar of " + obj.answer.author;
    answerAvatarWrapper.append(answerAvatarImage);

    const answerContentFolding = document.createElement("details");
    answerContentFolding.className = "answer__content--folding";
    const answerContentFoldingSummary = document.createElement("summary");
    answerContentFoldingSummary.className = "answer__content--folding-summary";
    answerContentFoldingSummary.textContent = `이 이슈에 대해 ${obj.answer.author}님의 답변이 있습니다.`;
    answerContentFolding.append(answerContentFoldingSummary);

    const answerContent = document.createElement("div");
    answerContent.className = "answer__content";
    answerContent.innerHTML = obj.answer.bodyHTML;

    const answerInformation = document.createElement("div");
    answerInformation.className = "answer__information";
    answerInformation.textContent = `${obj.answer.author} ${new Date(
      obj.answer.createdAt
    ).toLocaleString("ko-KR")}`;

    answerContentFolding.append(answerInformation, answerContent);
    answerContainer.append(answerAvatarWrapper, answerContentFolding);
    li.append(answerContainer);
  }
  return li;
};

const form = document.querySelector("form");
const submitButton = document.querySelector(".submit-button");
const inputName = document.querySelector(".name-field");
const inputTitle = document.querySelector(".title-field");
const inputContent = document.querySelector(".content-field");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!inputName.value || !inputTitle.value || !inputContent.value) {
    alert("입력 사항을 모두 입력해주세요.");
    return;
  }
  const newDiscussion = {
    id: "dummy_id",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "#",
    bodyHTML: inputContent.value,
    author: inputName.value,
    answer: null,
    avatarUrl: "https://avatars.githubusercontent.com/u/116490814?v=4",
  };
  const dataObj = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  dataObj.unshift(newDiscussion);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataObj));
  inputName.value = "";
  inputTitle.value = "";
  inputContent.value = "";
  render(ul);
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }

  const pagedDiscussions = getPagedDiscussions(pageNumber);
  for (let i = 0; i < pagedDiscussions.length; i += 1) {
    element.append(convertToDiscussion(pagedDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
createNavi(ul);
render(ul);
