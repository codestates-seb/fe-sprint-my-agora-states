const ul = document.querySelector("ul.discussions__container");
const perPage = document.querySelector("#selection");
const submitBtn = document.querySelector("input[type=submit]");
const form = document.querySelector("form");
const pages = document.querySelector(".pages");

class newDiscussion {
  constructor(arr, time) {
    [this.author, this.title, this.bodyHTML] = arr;
    this.createdAt = time;
  }
}

/* 날짜시간 변환 함수 */
function dateConverter(time) {
  if (typeof time === "string") {
    time = new Date(time);
  };
  return new Intl.DateTimeFormat("ko-KR", { dateStyle: "long", timeStyle: "short" }).format(time);
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

  /* 1. avatar 이미지 삽입 */
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl || "";
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  /* 2-1. 질문 제목, 세부 사항 삽입 */
  const titleContainer = document.createElement("h2");
  const titleLink = document.createElement("a");
  titleContainer.className = "discussion__title";
  titleLink.href = obj.url;
  titleLink.append(obj.title);
  titleContainer.append(titleLink);

  /* 2-2. 작성자, 작성시각 삽입 */
  const discussionInfo = document.createElement("div");
  const infos = `${obj.author} / ${dateConverter(obj.createdAt)}`
  discussionInfo.className = "discussion__information";
  discussionInfo.append(infos);

  discussionContent.append(titleContainer, discussionInfo);  // discussion_container에 삽입

  /* 3. 답변완료 표시 */
  const answered = document.createElement("img");
  answered.className = obj.answer ? "" : "notAnswered";
  discussionAnswered.append(answered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (target, elementArr, pageGroup = 1) => {
  let start = (pageGroup - 1) * articlesPerPage;
  let end = start + articlesPerPage;

  ul.querySelectorAll("li").forEach((el) => { el.remove(); });

  for (let i = start; i < end; i += 1) {
    if (i >= elementArr.length) break;
    target.append(convertToDiscussion(elementArr[i]));
  }
};

function saveLocalStorage(arr) {
  const discussionArr = JSON.stringify(arr);
  localStorage.setItem("discussions", discussionArr);
}

function loadLocalStorage() {
  discussionArr = JSON.parse(localStorage.getItem("discussions")) || agoraStatesDiscussions;
  perPage.value = articlesPerPage;
  render(ul, discussionArr);
}


submitBtn.addEventListener("click", (e) => {
  let formData = new FormData(form).getAll("discussion");
  const now = new Date();
  const discussion = new newDiscussion(formData, now);

  discussionArr.unshift(discussion);
  saveLocalStorage(discussionArr);
})

function pageCalculator(event) {

}

pages.addEventListener("click", (e) => {
  const currentPageNode = pages.querySelector("#current-page");
  const currentPage = Number(currentPageNode.textContent);
  let nextPage = lastPage(discussionArr);

  if (e.target.tagName !== "SPAN") {
    return
  };

  if (e.target.id === "prev") {
    nextPage = currentPage - 1 || 1;
    currentPageNode.previousElementSibling.id = "current-page";
  };

  if (e.target.id === "next") {
    nextPage = currentPage + 1;
    if (nextPage >= lastPage) nextPage = lastPage;
    currentPageNode.nextElementSibling.id = "current-page";
  };

  if (e.target.parentNode.className.match(/page-number/g)) {
    e.target.id = "current-page"
    nextPage = Number(e.target.textContent);
  };

  currentPageNode.id = "";
  render(ul, discussionArr, nextPage);
  scrollTo(0, ul.offsetTop);
});

perPage.addEventListener("change", (e) => {
  const currentPageNode = pages.querySelector("#current-page");
  const firstPageNode = pages.querySelectorAll(".page-number span")[0];

  currentPageNode.id = "";
  firstPageNode.id = "current-page";
  articlesPerPage = Number(e.target.value);
  render(ul, discussionArr);
  localStorage.setItem("articlesPerPage", articlesPerPage);
})

loadLocalStorage();
