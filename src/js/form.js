const formContainer = document.querySelector(".form__container");
const searchContainer = document.querySelector(".search__container");
const formClose = document.querySelector(".form__close--symbol");
const form = document.querySelector("form");

const title = document.querySelector(".form__input--title > input");
const author = document.querySelector(".form__input--name > input");
const bodyHTML = document.querySelector("#story");
const submitBtn = document.querySelector(".form__submit > button");

const navContainer = document.querySelector(".navigator__container");

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
  event.preventDefault();
  // 입력받은 값을 오브젝트에 저장
  // 저장할 것들 (id, 시간, 제목, url, 작성자, 답변 유무, 내용, 작성자 사진, 태그 )

  console.log(navContainer);
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
  const avatarUrl = `https://velog.velcdn.com/images/gksqls020/profile/cb03d8e1-57b8-4ec5-8471-55925ba8f8d8/image.png`;

  // 태그
  const tags = [];
  for (let i = 0; i < event.srcElement.length; i++) {
    if (event.srcElement[i].checked) {
      tags.push(event.srcElement[i].value);
    }
  }
  if (tags.length === 0) tags.push("기타");

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

  // local storage 동기화
  const prevData = JSON.parse(localStorage.getItem("data"));
  prevData.unshift(item);
  localStorage.setItem("data", JSON.stringify(prevData));

  // form 초기화
  title.value = "";
  author.value = "";
  bodyHTML.value = "";
  for (let i = 0; i < event.srcElement.length; i++) {
    if (event.srcElement[i].checked) event.srcElement[i].checked = false;
  }

  // 다시 검색으로 창 전환
  closeForm();
  reRender(ul);
}

function closeForm(event) {
  formContainer.classList.add("hidden");
  searchContainer.classList.remove("hidden");
  navContainer.classList.remove("hidden");
}

// 새 포스트 생성시 1페이지로
const reRender = (element) => {
  localStorage.setItem("pageNum", 1);
  navCenter.textContent = 1;
  render(element);
  return;
};

// 포스트 조건 검사기
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

p.textContent = "제목을 입력하세요.";
form.addEventListener("submit", handleFormEvent);

formClose.addEventListener("click", closeForm);

title.addEventListener("keyup", formValidator);
bodyHTML.addEventListener("keyup", formValidator);
author.addEventListener("keyup", formValidator);
