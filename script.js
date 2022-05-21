const ul = document.querySelector("ul.discussions__container");
const perPage = document.querySelector("#selection");
const isAnswered = document.querySelector("#filtering");
const submitBtn = document.querySelector("input[type=submit]");
const form = document.querySelector("form");
const pages = document.querySelector(".pages");
let discussionArr;

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
  answered.className = obj.answer ? "answered" : "notAnswered";
  discussionAnswered.append(answered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

/* 데이터 배열의 모든 값을 화면에 렌더링하는 함수 */
const render = (target, elementArr, pageGroup = 1) => {
  let start = (pageGroup - 1) * articlesPerPage;
  let end = start + articlesPerPage;

  target.querySelectorAll("li").forEach((el) => { el.remove(); }); // 리스트 초기화

  for (let i = start; i < end; i += 1) {
    if (i >= elementArr.length) break;
    target.append(convertToDiscussion(elementArr[i]));
  }
};

/* localStorage 저장 */
function saveLocalStorage(arr) {
  const dataArr = JSON.stringify(arr);
  localStorage.setItem("discussions", dataArr);
}

/* localStorage 불러오기 */
function loadLocalStorage() {
  discussionArr = JSON.parse(localStorage.getItem("discussions")) || agoraStatesDiscussions;
  perPage.value = articlesPerPage;
  render(ul, discussionArr);
  initializePageNodes(discussionArr, pages.children[1]);
}

/* discussion 전송 버튼 이벤트 */
submitBtn.addEventListener("click", (e) => {
  let formData = new FormData(form).getAll("discussion");
  const now = new Date();
  const discussion = new newDiscussion(formData, now);
console.log(formData[0]);
  if (!formData[0]) return;
  discussionArr.unshift(discussion);
  saveLocalStorage(discussionArr);
})

/* 페이지 넘기기 이벤트 */
pages.addEventListener("click", (e) => {
  const currentPageNode = pages.querySelector("#current-page");
  const currentPage = Number(currentPageNode.textContent);
  let lastPage = getLastPage(filteredData());  // 필터링 했을 때는 다른 배열 
  let nextPage;

  if (e.target.tagName !== "SPAN") return;

  if (e.target.id === "prev") {
    nextPage = currentPage - 1;
  };

  if (e.target.id === "next") {
    nextPage = currentPage + 1;
  };

  if (e.target.parentNode.className.match(/page-number/g)) {
    nextPage = Number(e.target.textContent);
  };

  if (nextPage < 1 || nextPage > lastPage) return;

  relabeling(pages.children[1], lastPage, nextPage);
  render(ul, filteredData(), nextPage);
  scrollTo(0, ul.offsetTop);
});

/* 페이지 당 게시글 수 변경 이벤트 */
perPage.addEventListener("change", (e) => {
  const currentPageNode = pages.querySelector("#current-page");

  currentPageNode.id = "";
  articlesPerPage = Number(e.target.value);
  render(ul, filteredData());
  initializePageNodes(filteredData(), pages.children[1]);
  localStorage.setItem("articlesPerPage", articlesPerPage);
})

/* 답변 완료 여부 필터링 이벤트 */
isAnswered.addEventListener("change", (e) => {
  const filtering = e.target.value;
  const filteredArr = discussionArr.filter((obj) => {
    if (filtering === "answered") return obj.answer;
    if (filtering === "notAnswered") return !obj.answer;
    return true;
  })
  filteredData(filteredArr);
  render(ul, filteredArr);
  initializePageNodes(filteredArr, pages.children[1]);
})

loadLocalStorage();

const filteredData = (function () {
  let data = discussionArr;

  return function (filtered) {
    if (filtered) return (data = filtered);
    return data;
  }
})();