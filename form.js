const formContainer = document.querySelector(".form__container");
const searchContainer = document.querySelector(".search__container");
const formClose = document.querySelector(".form__close--symbol");
const form = document.querySelector("form");

const title = document.querySelector(".form__input--title > input");
const author = document.querySelector(".form__input--name > input");
const bodyHTML = document.querySelector("#story");
const submitBtn = document.querySelector(".form__submit > button");

const p = document.querySelector(".form__input--name > p");

class IDGenerator {
  #count = 0;
  getID() {
    const timestamp = new Date().getTime().toString(16);
    const randomNumber = Math.floor(Math.random() * 2 ** 20).toString(16);

    const count = this.#count.toString(16);
    this.#count = (this.#count + 1) % 2 ** 12;

    return timestamp + randomNumber.padStart(5, "0") + count.padStart(3, "0");
  }
}

function handleFormEvent(event) {
  console.log("in");
  event.preventDefault();
  // 입력받은 값을 오브젝트에 저장
  // 저장할 것들 (id, 시간, 제목, url, 작성자, 답변 유무, 내용, 작성자 사진, 태그 )

  const target = event.target;

  // id
  const id = new IDGenerator().getID();

  // 시간
  const date = new Date();
  const createdAt = timeFormater(date);

  // 제목

  // url
  const url = "null";

  // 작성자

  // 답변
  const answer = null;

  // 내용

  // 작성자 사진
  const avatarUrl = null;

  // 태그
  const tags = [];
  for (let i = 0; i < event.srcElement.length; i++) {
    if (event.srcElement[i].checked) tags.push(event.srcElement[i].value);
  }

  // 객체화
  const item = {
    id,
    createdAt,
    title: title.value,
    url,
    author: author.value,
    answer,
    bodyHTML: bodyHTML.value,
    avatarUrl,
    tags,
  };
  agoraStatesDiscussions.push(item);

  // form 초기화
  title.value = "";
  author.value = "";
  bodyHTML.value = "";
  for (let i = 0; i < event.srcElement.length; i++) {
    if (event.srcElement[i].checked) event.srcElement[i].checked = false;
  }

  reRender(ul);
}

function closeForm(event) {
  console.dir(event.target);
  formContainer.classList.add("hidden");
  searchContainer.classList.remove("hidden");
}

const reRender = (element) => {
  element.prepend(
    convertToDiscussion(
      agoraStatesDiscussions[agoraStatesDiscussions.length - 1]
    )
  );
  return;
};

function titleValidator() {
  if (title.value !== "".trim()) {
    return true;
  }
  return false;
}

function storyValidator() {
  if (bodyHTML.value !== "".trim()) {
    return true;
  }
  return false;
}

function authorValidator() {
  if (author.value !== "".trim()) {
    return true;
  }
  return false;
}

function formValidator() {
  if (!titleValidator()) {
    p.textContent = "제목을 입력하세요.";
    p.classList.remove("hidden");
    submitBtn.disabled = true;
    return false;
  }

  if (!storyValidator()) {
    p.textContent = "내용을 작성해 주세요.";
    p.classList.remove("hidden");
    submitBtn.disabled = true;
    return false;
  }
  if (!authorValidator()) {
    p.textContent = "닉네임을 작성해 주세요.";
    p.classList.remove("hidden");
    submitBtn.disabled = true;
    return false;
  }
  p.classList.add("hidden");
  p.textContent = "";
  submitBtn.disabled = false;
}

form.addEventListener("submit", handleFormEvent);

formClose.addEventListener("click", closeForm);

title.addEventListener("keyup", formValidator);
bodyHTML.addEventListener("keyup", formValidator);
author.addEventListener("keyup", formValidator);
