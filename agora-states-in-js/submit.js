const submitBtn = document.querySelector(".form"),
  inputId = document.querySelector(".form__input--name > input"),
  inputTitle = document.querySelector(".form__input--title > input"),
  inputQuestion = document.querySelector(".form__textbox > textarea"),
  inputSubmit = document.querySelector(".form__submit > input");

const NEWOBJ_LS = "newobj";
let newObjs = [];

function discussionObj(author, title, text) {
  return {
    id: String(Date.now()),
    createdAt: new Date().toISOString(),
    answer: null,
    avatarUrl:
      "https://user-images.githubusercontent.com/77045939/169451509-9ea1287e-e8d2-4818-8900-2a7c87452da1.png", // 같은사진
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author,
    title,
    text,
  };
}

function handleSubmit(e) {
  e.preventDefault();
  const discussions = discussionObj(
    inputId.value,
    inputTitle.value,
    inputQuestion.value
  );
  agoraStatesDiscussions.unshift(discussions); //배열에 추가

  paintObj(discussions);
  inputId.value = "";
  inputTitle.value = "";
  inputQuestion.value = "";
}

function paintObj(task) {
  const ul = document.querySelector("ul.discussions__container");
  const li = convertToDiscussion(task);
  ul.prepend(li); // 첫번째에 추가

  newObjs.push(task);
  saveObj();
}

function saveObj() {
  const objString = JSON.stringify(newObjs);
  localStorage.setItem(NEWOBJ_LS, objString);
}

function loadObj() {
  const loadedObjs = localStorage.getItem(NEWOBJ_LS);
  if (loadedObjs) {
    const parsedObjs = JSON.parse(loadedObjs);
    parsedObjs.forEach((task) => {
      paintObj(task);
    });
  }
}

function init() {
  loadObj();
  submitBtn.addEventListener("submit", handleSubmit);
}
init();
