// create element function
function createEl(tagname, classname, textcontent){
  const el = document.createElement(tagname);
  el.className = classname;
  el.textContent = textcontent;
  return el;
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = createEl("li", "discussion__container");

  const avatarWrapper = createEl("div", "discussion__avatar--wrapper");
  const discussionContent = createEl("div", "discussion__content");
  const discussionAnswered = createEl("div", "discussion__answered");

  /* avatar */
  const avatarImg = createEl("img", "discussion__avatar--image");
  avatarImg.setAttribute("src", obj.avatarUrl);
  avatarWrapper.append(avatarImg);

  /* discussion content */
  const discussionTitle = createEl("h1", "discussion__title");
  const href = createEl("a", null, obj.title);
  href.setAttribute("href", obj.url)
  discussionTitle.append(href);
  const todayDate = processDate(obj.createdAt);
  const discussionInfo = createEl("div", "discussion__information", `${obj.author} / ${todayDate}`);
  discussionContent.append(discussionTitle, discussionInfo);

  /* discussion answered */
  const checkBox = createEl("p");
  if(obj.answer === null){
    checkBox.textContent = '☒';
  } else {
    checkBox.textContent = '☑';
    discussionAnswered.classList.add('true');
  }
  discussionAnswered.append(checkBox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

/* ----------------------------- pagination ----------------------------- */
// base
const ul = document.querySelector(".discussions__container");
const nav = document.querySelector(".nav__container");
let currentPage = 1;
let itemsInPage = 10;

// display page
const renderDisplay = (wrapper, page, rows_per_page) => {
  if(localStorage.getItem("discussionStorage") !== null){
    agoraStatesDiscussions = JSON.parse(localStorage.getItem("discussionStorage"));
  }

  wrapper.innerHTML = "";
  page--; // page를 0으로 만들면 반복문에 사용하기 편함

  let start = page * rows_per_page; // 선택한 페이지의 제일 처음으로 들어갈 요소
  let end = start + rows_per_page; // 한 페이지에 들어갈 수 있는 아이템 개수만큼
  let paginated_items = agoraStatesDiscussions.slice(start, end);

  for(let i = 0; i < paginated_items.length; i++){
    wrapper.append(convertToDiscussion(paginated_items[i]));
  }
  return;
}
// make nav buttons
function setupPagination (wrapper, rows_per_page){
  wrapper.innerHTML = "";

  let page_count = Math.ceil(agoraStatesDiscussions.length / rows_per_page);
  for(let i = 1; i < page_count + 1; i++){
    let btn = paginationButton(i);
    wrapper.appendChild(btn);
  }
}
function paginationButton(page){
  let num = document.createElement('p');
  num.textContent = page;
  let button = createEl('button', 'nav__btn');
  button.append(num);

  if(currentPage === page) { button.classList.add('active'); }

  button.addEventListener('click', function () {
    currentPage = page;
    renderDisplay(ul, currentPage, itemsInPage);

    let current_btn = document.querySelector('.nav__btn.active');
    current_btn.classList.remove('active');
    button.classList.add('active');
  })

  return button;
}

// ul 요소에 agoraStatesDiscussions 배열 일부 데이터를 화면에 렌더링합니다.
renderDisplay(ul, currentPage, itemsInPage);
setupPagination(nav, itemsInPage);

/* ----------------------------- pagination ----------------------------- */

// date calculate function
function getDate(){
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  if(month < 9){ month = '0' + (parseInt(month) + 1); } else { (parseInt(month) + 1) } 
  let day = today.getDate();
  if(day < 10){ day = '0' + day; }
  let hour = today.getHours();
  let minute = today.getMinutes();
  let second = today.getSeconds();
  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
}

// date processing function
function processDate(date){
  let arr = date.split('T');
  
  arr[1] = arr[1].replace('Z', '');
  let timeArr = arr[1].split(':').map(Number);
  if(timeArr[0] < 12){
    timeArr[0] = `오전 ${timeArr[0]}시`;
  } else if (timeArr[0] === 12){
    timeArr[0] = `오후 ${timeArr[0]}시`;
  } else {
    timeArr[0] -= 12;
    timeArr[0] = `오후 ${timeArr[0]}시`;
  }

  return `${arr[0]} / ${timeArr[0]} ${timeArr[1]}분`
}

// adding new discussion
function submitDiscussion(){
  let discussionObject = {};
  const author = document.querySelector("#name");
  const title = document.querySelector("#title");
  const question = document.querySelector("#story"); // 나중에 사용할 것
  let date = getDate();

  discussionObject.id = '';
  discussionObject.createdAt = date;
  discussionObject.title = title.value;
  discussionObject.url = '';
  discussionObject.author = author.value;
  discussionObject.answer = null;
  discussionObject.bodyUrl = '';
  discussionObject.avatarUrl = "https://avatars.githubusercontent.com/u/92296499?v=4";
  
  return discussionObject
}

// click submit
const submitBtn = document.querySelector("input[type='submit']");
submitBtn.onclick = () => {
  const author = document.querySelector("#name");
  const title = document.querySelector("#title");
  const question = document.querySelector("#story"); 

  if(author.value && title.value && question.value){
    let newDiscussion = submitDiscussion();
    agoraStatesDiscussions.unshift(newDiscussion);
    localStorage.setItem("discussionStorage", JSON.stringify(agoraStatesDiscussions));

    currentPage = 1;
    renderDisplay(ul, currentPage, itemsInPage);
    setupPagination(nav, itemsInPage);
  }
}

// click start asking
const cover = document.querySelector(".cover__container");
const askBtn = document.querySelector(".hide__button");
askBtn.onclick = () => {
  cover.classList.add('hide');
}