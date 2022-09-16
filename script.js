const submitForm = document.querySelector(".form");
const formInput = document.querySelectorAll(".form input");
const discussionsContainer = document.querySelector(".discussions__container");
const textareaQuestion = document.querySelector(".textarea__question");
const pageNumContainer = document.querySelector(".pageNumber__list");
window.onload = function () {
  let getStorage = JSON.parse(localStorage.getItem("data"))
    ? JSON.parse(localStorage.getItem("data"))
    : agoraStatesDiscussions;
  displayOnScreen("", "", getStorage);
};
const autoResize = (e) => {
  let scrollHeight = textareaQuestion.scrollHeight;
  if (textareaQuestion.clientHeight < scrollHeight) {
    textareaQuestion.style.height = `${scrollHeight}px`;
  }
};
textareaQuestion.addEventListener("keyup", autoResize);
const convertDiscussionToDom = (obj) => {
  return `
  <li class="discussion__container" data-id=${obj.id}>
    <div class="discussion__avatar--wrapper">
      <img
        class="discussion__avatar--image"
        src="${
          obj.avatarUrl
            ? obj.avatarUrl
            : "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4"
        }"
        alt="avatar of ${obj.author}"
      />
    </div>
    <div class="discussion__content">
      <h5 class="discussion__title">
        <a
          href="${obj.url}"
          >${obj.title}</a
        >
      </h5>
      <div class="discussion__information">
        ${obj.author} / ${new Date(obj.createdAt).toLocaleDateString()}
      </div>
      <div class="discussion__detail">질문 펼치기</div>
  </div>
  <div class="discussion__answered"><p>${obj.answer ? "☑" : "▢"}</p></div>
  </li>`;
};

const countPage = () => {
  let getStorage = JSON.parse(localStorage.getItem("data"))
    ? JSON.parse(localStorage.getItem("data"))
    : agoraStatesDiscussions;
  for (let i = 1; i <= Math.ceil(getStorage.length / 10); i++) {
    const numberList = document.createElement("li");
    numberList.textContent = i;
    numberList.classList.add("pageNumber__list--item");
    pageNumContainer.appendChild(numberList);
  }
};
countPage();
const displayOnScreen = (e, page = 0, array) => {
  let loopCondition =
    page * 10 + 10 > array.length ? array.length : page * 10 + 10;
  for (let i = page * 10; i < loopCondition; i++) {
    discussionsContainer.innerHTML += convertDiscussionToDom(array[i]);
  }
};

let pageTarget;
const handleClickPageNum = (e) => {
  let getStorage = JSON.parse(localStorage.getItem("data"))
    ? JSON.parse(localStorage.getItem("data"))
    : agoraStatesDiscussions;
  pageTarget ? (pageTarget.style.color = "black") : null;
  pageTarget = e.target;
  e.target.style.color = "red";
  let page = e.target.textContent - 1;
  if (e.target.tagName === "LI") {
    discussionsContainer.innerHTML = "";
    displayOnScreen("", page, getStorage);
  }
};
pageNumContainer.addEventListener("click", handleClickPageNum);
/* 페이지네이션 의사코드
1.  10개씩 보여준다 치고, array의 index를 지정할 변수 하나 생성
2. 페이지 버튼 누르면 해당 인덱스부터 10개씩 보여주기.*/
const showQuestion = (e) => {
  let getStorage = JSON.parse(localStorage.getItem("data"))
    ? JSON.parse(localStorage.getItem("data"))
    : agoraStatesDiscussions;
  const questionsContainer = document.createElement("div");
  const parentEl = e.target.parentNode;
  const id = parentEl.parentNode.dataset.id;
  if (
    e.target.className === "discussion__detail" &&
    e.target.children.length === 0
  ) {
    const targetList = getStorage.filter((item) => item.id.toString() === id);
    e.target.innerHTML = "질문 접기";
    questionsContainer.innerHTML = targetList[0].bodyHTML;
    questionsContainer.classList.add("openQuestion");
    e.target.appendChild(questionsContainer);
  } else if (
    e.target.className === "discussion__detail" &&
    e.target.children.length !== 0
  ) {
    e.target.innerHTML = "질문 펼치기";
  }
};
discussionsContainer.addEventListener("click", showQuestion);

const submitQuestion = (e) => {
  let getStorage = JSON.parse(localStorage.getItem("data"))
    ? JSON.parse(localStorage.getItem("data"))
    : agoraStatesDiscussions;
  e.preventDefault();
  const author = formInput[0].value;
  const title = formInput[1].value;
  const question = document.querySelector(".textarea__question").value;
  const createdAt = new Date();
  const id = Date.now();
  const newObj = {
    id,
    createdAt,
    title,
    author,
    answer: null,
    bodyHTML: question,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
  };
  const newagoraStatesData = [newObj, ...getStorage];
  localStorage.setItem("data", JSON.stringify(newagoraStatesData));
  discussionsContainer.innerHTML = "";
  displayOnScreen("", 0, newagoraStatesData);
  formInput[0].value = "";
  formInput[1].value = "";
  document.querySelector(".textarea__question").value = "";
};
submitForm.addEventListener("submit", submitQuestion);
