// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
if (localStorage.discussions === undefined) localStorage.setItem("discussions", JSON.stringify(agoraStatesDiscussions));
localStorage.setItem("filter-likes", JSON.stringify(false));

let discussions = [];
let likes = [];

const pageList = document.querySelector(".pages__container");
discussions = JSON.parse(localStorage.getItem("discussions"));

function saveDiscussion() {
  localStorage.setItem("discussions", JSON.stringify(discussions));
}

// form으로 제출된 정보를 저장합니다.
const form = document.querySelector(".form");
const author = document.querySelector("#name");
const title = document.querySelector("#title");
const story = document.querySelector("#story");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newDiscussion = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: title.value,
    author: author.value,
    bodyHTML: story.value,
    avatarUrl: "./rocket-boy.png",
    answer: null,
    like: false,
  };
  ul.prepend(convertToDiscussion(newDiscussion));
  discussions.unshift(newDiscussion);
  saveDiscussion();
});

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
  const discussionLiked = document.createElement("div");
  discussionLiked.className = "discussion__liked";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const image = document.createElement("img");
  image.classList.add("discussion__avatar--image");
  image.src = obj.avatarUrl;
  image.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(image);
  const content = document.createElement("a");
  content.href = obj.url ? obj.url : "#";
  if (!obj.url) content.classList.add("not-clickable");
  content.target = "_blank";
  const title = document.createElement("h2");
  title.classList.add("discussion__title");
  title.textContent = obj.url ? `${obj.title} 🔗` : obj.title;
  const story = document.createElement("p");
  story.classList.add("discussion__story");
  story.innerHTML = obj.url ? "클릭하여 본문 가기" : obj.bodyHTML;
  const information = document.createElement("div");
  information.classList.add("discussion__information");
  information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  content.append(title, story, information);
  discussionContent.append(content);

  const answer = document.createElement("p");
  answer.textContent = obj.answer === null ? "🌝" : "✅";
  discussionAnswered.append(answer);

  const like = document.createElement("input");
  like.type = "checkbox";
  if (obj.like) like.checked = true;
  else like.checked = false;
  like.addEventListener("click", () => {
    if (obj.like) {
      obj.like = false;
    } else {
      obj.like = true;
    }
    saveDiscussion();
  });
  discussionLiked.append(like);

  li.append(avatarWrapper, discussionContent, discussionAnswered, discussionLiked);
  return li;
};

const button = document.querySelector(".discussion__likes");
button.addEventListener("click", (event) => {
  event.preventDefault();
  if (JSON.parse(localStorage.getItem("filter-likes"))) {
    pageList.innerHTML = "";
    ul.innerHTML = "";
    render(ul, discussions);
    renderPage(discussions);
    localStorage.setItem("filter-likes", JSON.stringify(false));
  } else {
    pageList.innerHTML = "";
    ul.innerHTML = "";
    discussions = JSON.parse(localStorage.getItem("discussions"));
    likes = discussions.filter((discussion) => discussion.like);
    render(ul, likes);
    renderPage(likes);
    localStorage.setItem("filter-likes", JSON.stringify(true));
  }
});

const pageCount = 5;
const dataPerPage = 6;
const defaultPage = 1;
let currentPage = 1;
let totalData, totalPage, currentpageGroup, lastNumber, firstNumber, next, prev;

const renderPage = (currentData) => {
  totalData = currentData.length;
  totalPage = Math.ceil(totalData / dataPerPage) > 0 ? Math.ceil(totalData / dataPerPage) : defaultPage;
  currentpageGroup = Math.ceil(currentPage / pageCount);
  lastNumber = pageCount * currentpageGroup > totalPage ? totalPage : pageCount * currentpageGroup;
  firstNumber = lastNumber >= pageCount ? lastNumber - pageCount + 1 : defaultPage;
  next = lastNumber + 1;
  prev = firstNumber - 1;

  const goToPrevGroup = document.createElement("li");
  goToPrevGroup.className = "page__button";
  goToPrevGroup.textContent = "◀︎";
  goToPrevGroup.addEventListener("click", (event) => {
    if (prev < 1) return;
    event.preventDefault();
    currentPage = prev;
    pageList.innerHTML = "";
    ul.innerHTML = "";
    render(ul, currentData);
    renderPage(currentData);
  });
  pageList.append(goToPrevGroup);

  for (let number = firstNumber; number <= lastNumber; number++) {
    const li = document.createElement("li");
    li.className = "page__button";
    li.textContent = number;
    if (number === currentPage) li.classList.add("currentPage");
    li.addEventListener("click", (event) => {
      console.log("click");
      event.preventDefault();
      currentPage = Number(event.target.textContent);
      pageList.innerHTML = "";
      ul.innerHTML = "";
      render(ul, currentData);
      renderPage(currentData);
    });
    pageList.append(li);
  }

  const goToNextGroup = document.createElement("li");
  goToNextGroup.className = "page__button";
  goToNextGroup.textContent = "►";
  goToNextGroup.addEventListener("click", (event) => {
    if (next > totalPage) return;
    event.preventDefault();
    currentPage = next;
    pageList.innerHTML = "";
    ul.innerHTML = "";
    render(ul, currentData);
    renderPage(currentData);
  });
  pageList.append(goToNextGroup);
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, currentData) => {
  for (let i = pageCount * (currentPage - 1); i < pageCount * currentPage; i += 1) {
    if (currentData[i]) element.append(convertToDiscussion(currentData[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, discussions);
renderPage(discussions);
