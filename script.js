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

// 페이지네이션
const ul = document.querySelector(".discussions__container");

// const renderDisplay = (wrapper, page, rows_page) => {

if (localStorage.getItem("discussionStorage") !== null) {
  agoraStatesDiscussions = JSON.parse(
    localStorage.getItem("discussionStorage")
  );
}

//   wrapper.innerHTML = "";
//   page--; //page를 0으로 만들어서 반복문에 사용하기좋게함

//   let start = page * rows_page; // 선택한 페이지의 제일 처음요소
//   let end = start + rows_page; // 한 페이지에 들어갈 수 있는 아이템개수만큼
//   let paginated_items = agoraStatesDiscussions.slice(start, end);

//   for (let i = 0; i < paginated_items.length; i++) {
//     wrapper.append(convertToDiscussion(paginated_items[i]));
//   }
//   return;
// };

// // 페이지 버튼
// function setupPagination(wrapper, rows_page) {
//   // wrapper.innerHTML = "";

//   let page_count = Math.ceil(agoraStatesDiscussions.length / rows_page);
//   for (let i = 1; i < page_count + 1; i++) {
//     let btn = paginationBtn(i);
//     // wrapper.appendChild(btn);
//   }
// }
// function paginationBtn(page) {
//   let num = document.createElement("p");
//   num.textContent = page;
//   let button = createEl("button", "nav_btn");
//   button.append(num);

//   if (currentPage === page) {
//     button.classList.add("active");
//   }
//   button.addEventListener("click", () => {
//     currentPage = page;
//     renderDisplay(ul, currentPage, itemsInPage);

//     let current_btn = document.querySelector(".nav_btn.active");
//     current_btn.classList.remove("active");
//     button.classList.add("active");
//   });
//   return button;
// }

// renderDisplay(ul, currentPage, itemsInPage);
// setupPagination(nav, itemsInPage);
//agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  ul.innerHTML = "";
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
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
  // currentPage = 1;
  // render(ul, currentPage, itemsInPage);
  // setupPagination(nav, itemsInPage);
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
