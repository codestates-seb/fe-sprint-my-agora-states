// createElement 함수
function createEl(tagname, classname, textcontent) {
  const el = document.createElement(tagname);
  el.className = classname;
  el.textContent = textcontent;
  return el;
}

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = createEl("li", "discussion__container"); // 클래스 이름 지정

  const avatarWrapper = createEl("div", "discussion__avatar--wrapper");
  const discussionContent = createEl("div", "discussion__content");
  const discussionAnswered = createEl("div", "discussion__answered");
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // avatar
  const avatarImg = createEl("img", "discussion__avatar--image");
  avatarImg.setAttribute("src", obj.avatarUrl);
  avatarWrapper.append(avatarImg);

  // content
  const discussionTitle = createEl("h2", "discussion__title");
  const discussHref = createEl("a", null, obj.title);
  const writeDay = createEl(
    "div",
    "discussion__information",
    `${obj.author} / ${obj.createdAt}`
  );
  discussHref.setAttribute("href", obj.url);
  discussionTitle.append(discussHref);
  discussionContent.append(discussionTitle, writeDay);

  // answered
  const checkBox = createEl("p");
  if (obj.answer === null) {
    checkBox.textContent = "☒";
  } else {
    checkBox.textContent = "☑";
    discussionAnswered.classList.add("true");
  }
  discussionAnswered.append(checkBox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const ul = document.querySelector(".discussions__container");

// 로컬스토리지;
if (localStorage.getItem("discussionStorage") !== null) {
  agoraStatesDiscussions = JSON.parse(
    localStorage.getItem("discussionStorage")
  );
}

//agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
let renderStart = 0;
let renderEnd = 5;
const render = (element) => {
  ul.innerHTML = "";
  for (let i = renderStart; i < renderEnd; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render(ul);
// ul.append(li);

// 제출 시간
function getDate() {
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  if (month < 9) {
    month = "0" + (parseInt(month) + 1);
  } else {
    parseInt(month) + 1;
  }
  let day = today.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
}

const author = document.querySelector("#name");
const title = document.querySelector("#title");
const question = document.querySelector("#story");
// 새로운 질문 추가
function submitDiscussion() {
  let discussionObject = {};
  let date = getDate();
  // console.log(date);
  discussionObject["bodyHTML"] = question.value;
  discussionObject["createdAt"] = date;
  discussionObject["title"] = title.value;
  discussionObject["url"] = `./images/${Math.ceil(Math.random() * 7)}.jpg`;
  discussionObject["author"] = author.value;
  discussionObject["answer"] = null;
  discussionObject["avatarUrl"] = `./images/${Math.ceil(
    Math.random() * 7
  )}.jpg`;
  return discussionObject;
}

// 제출 버튼
const submitForm = document.querySelector("form.form");
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let newDiscussion = submitDiscussion();
  agoraStatesDiscussions.unshift(newDiscussion);
  localStorage.setItem(
    "discussionStorage",
    JSON.stringify(agoraStatesDiscussions)
  );
  render(ul);
  author.value = "";
  title.value = "";
  question.value = "";
});

// 질문시작버튼
const cover = document.querySelector(".cover__container");
const askBtn = document.querySelector(".hide__button");
askBtn.addEventListener("click", () => {
  cover.classList.add("hide");
});

// 페이지네이션
// const btnDiv=document.querySelector(".nav__container");
// 페이지 갯수 구하기
let rows_page = 5;
let pageTotal = Math.ceil(agoraStatesDiscussions.length / rows_page);
let currentPage = 1;
let group = Math.ceil(currentPage / rows_page);
let lastNum = group * 5;
if (lastNum > pageTotal) {
  lastNum = pageTotal;
}
let firstNum = lastNum - 4 ? currentPage : 1;
// 179번. 숫자들 써있는 버튼을 클릭시 게시물보여짐
function godDaeun(event) {
  console.log(event.currentTarget);
  let btnNum = event.currentTarget.textContent;
  renderStart = (btnNum - 1) * 5;
  renderEnd =
    renderStart + 5 > agoraStatesDiscussions.length
      ? agoraStatesDiscussions.length // renderStart보다 작으면 더 렌더링 할필요없으니 length까지만 렌더링 시키면된다.
      : renderStart + 5;
  ul.innerHTML = "";
  console.log("firstNum" + firstNum);
  console.log("renderStart" + renderStart);
  console.log("lastNum" + lastNum);
  console.log("renderEnd" + renderEnd);
  render(ul);
}
function addBtn() {
  const $div = createEl("div", "nav__container");
  const $prevBtn = createEl("button", "prevBtn");
  $prevBtn.addEventListener("click", clickPrevBtn);
  $prevBtn.textContent = "이전";
  $div.append($prevBtn);
  const $nextBtn = createEl("button", "nextBtn");
  $nextBtn.addEventListener("click", clickNextBtn);
  $nextBtn.textContent = "다은";
  for (let i = firstNum; i <= lastNum; i++) {
    const btn = createEl("button", "pageBtn");
    btn.textContent = `${i}`;
    btn.addEventListener("click", godDaeun);
    $div.append(btn);
  }
  $div.append($nextBtn);
  return $div;
}
const navWrap = document.querySelector(".nav__wrapper");
navWrap.append(addBtn());

const nextBtn = document.querySelector(".nextBtn");
function clickNextBtn(event) {
  console.log(event.currentTarget.previousElementSibling);
  let nextNum = event.currentTarget.previousElementSibling.textContent;
  if (nextNum >= pageTotal) {
    //event.currentTarget.previousElementSibling.textContent는 event.currentTarget의 앞에있는 요소의textContent
    return;
  }
  currentPage = lastNum + 1;
  // currentpage는 1 / 6 / 11 순으로 돈다
  group = Math.ceil(currentPage / rows_page);
  lastNum = group * 5;
  if (lastNum > pageTotal) {
    lastNum = pageTotal;
  }
  firstNum = currentPage;
  navWrap.innerHTML = "";
  navWrap.appendChild(addBtn());
}

const prevBtn = document.querySelector(".prevBtn");
function clickPrevBtn(event) {
  const prevNum = event.currentTarget.nextElementSibling.textContent;
  if (prevNum === "1") {
    return;
  }
  currentPage = prevNum - 5;
  group = Math.ceil(currentPage / rows_page);
  lastNum = group * 5;
  if (lastNum > pageTotal) {
    lastNum = pageTotal;
  }
  firstNum = lastNum - 4 ? currentPage : 1;
  navWrap.innerHTML = "";
  navWrap.appendChild(addBtn());
}
