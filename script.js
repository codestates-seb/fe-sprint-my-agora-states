const PAGE_LIMIT = 10;
const randomAvatarUrlArr = [
  "https://img.freepik.com/premium-vector/pixel-art-dog-character-design_534389-4.jpg",
  "https://img.freepik.com/free-vector/astronaut_53876-26804.jpg?size=338&ext=jpg&ga=GA1.2.217230763.1678411160&semt=ais",
  "https://img.freepik.com/free-vector/professional-people_53876-35835.jpg?size=338&ext=jpg&ga=GA1.2.217230763.1678411160&semt=ais",
  "https://img.freepik.com/free-vector/illustration-of-avatar-man-with-afro-hairstyle_53876-26806.jpg?size=338&ext=jpg&ga=GA1.1.217230763.1678411160&semt=ais",
  "https://img.freepik.com/free-icon/mushroom_318-759393.jpg?size=338&ext=jpg&ga=GA1.2.217230763.1678411160&semt=ais",
];

const convertDate = (str) => {
  str = str.split("");
  str.pop();
  str = str.join("");
  let temp = str.split("T");
  let date = temp[0].split("-");
  let time = temp[1].split(":");
  let am_pm = parseInt(time[0]) < 12 ? "오전" : "오후";
  let year = date[0][2] + date[0][3];
  let month = parseInt(date[1]);
  let day = date[2];

  return `${year}년 ${month}월 ${day}일 ${am_pm} ${time[0]}:${time[1]}:${time[2]}`;
};

const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h3");
  discussionTitle.className = "discussion__title";
  const discussionA = document.createElement("a");
  discussionA.href = `${obj.url}`;
  discussionA.textContent = `${obj.title}`;
  discussionTitle.append(discussionA);
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${convertDate(obj.createdAt)}`;
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInfo);

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const p = document.createElement("p");
  obj.answer !== null ? (p.textContent = "✅") : (p.textContent = "😥");
  discussionAnswered.append(p);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const saveLocalStorage = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    localStorage.setItem(i, JSON.stringify(arr[i]));
  }
};

const loadLocalStorage = () => {
  const arr = [];
  for (let i = 0; i < localStorage.length; i++) {
    arr.push(JSON.parse(localStorage.getItem(i)));
  }
  return arr;
};

const makeStars = () => {
  const numStars = 200;
  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    document.body.appendChild(star);
  }
};

const $inputName = document.querySelector("#name");
const $inputTitle = document.querySelector("#title");
const $inputQuestion = document.querySelector("#story");
const $formContainer = document.querySelector(".form__container");
const $form = document.querySelector(".form");
const $inputSubmit = document.querySelector(".form__submit");
const $btnShowForm = document.querySelector(".btn_show-form");
const $pages = document.querySelector(".pages");
const $ul = document.querySelector("ul.discussions__container");

let formStatus = false;

// 페이지 네이션
let currentPage = 0;
let totalDiscussons = 0;

const totalPages = () => {
  return Math.ceil(agoraStatesDiscussions.length / PAGE_LIMIT);
};

const totalDiscussonCalculate = (arr) => {
  totalDiscussons = arr.length;
  const totalDiscussionsDiv = document.createElement("div");
  totalDiscussionsDiv.classList.add("totalDiscussions");
  totalDiscussionsDiv.textContent = `Total: ${totalDiscussons}`;
  $pages.append(totalDiscussionsDiv);
};

const addPagesNumber = () => {
  $pages.replaceChildren();
  for (let i = 1; i < totalPages() + 1; i++) {
    const span = document.createElement("span");
    span.classList.add("page");
    span.textContent = i;
    if (currentPage === i) span.classList.add("page-highlight");
    else span.classList.remove("page-highlight");
    $pages.append(span);
  }
};

$pages.addEventListener("click", (e) => {
  if (e.target.className === "page") {
    currentPage = parseInt(e.target.textContent);
    renderPage($ul, currentPage);
  }
});

// 질문 폼 submit 이벤트
$form.addEventListener("submit", (e) => {
  e.preventDefault();
  let date = new Date();
  let month = date.getMonth() + 1;
  let minutes =
    date.getMinutes().length < 2 ? "0" + date.getMinutes() : date.getMinutes();
  let seconds =
    date.getSeconds().length < 2 ? "0" + date.getSeconds() : date.getSeconds();

  date = `${date.getFullYear()}-${month}-${date.getDate()}T${date.getHours()}:${minutes}:${seconds}Z`;
  const randomIdx = Math.floor(Math.random() * 5);

  // 새로운 질문 객체 생성
  const newDiscussion = {
    id: new Date().getTime() + Math.random(),
    createdAt: date,
    title: $inputTitle.value,
    author: $inputName.value,
    answer: null,
    avatarUrl: randomAvatarUrlArr[randomIdx],
  };

  // 로컬 스토리지에 있는 데이터 불러오기, 없다면 기존 데이터 불러오기
  // 불러온 데이터에 새로운 객체 넣기
  // 업데이트된 데이터를 로컬스토리지에 저장하기
  const existingData = localStorage.length
    ? loadLocalStorage()
    : agoraStatesDiscussions;
  existingData.unshift(newDiscussion);
  saveLocalStorage(existingData);

  // 질문 칸 모두 비우고 닫기
  $inputName.value = "";
  $inputTitle.value = "";
  $inputQuestion.value = "";
  $modal.style.display = "none";

  renderPage($ul, currentPage);
});

const renderPage = (element, currentPage) => {
  const loadData = localStorage.length
    ? loadLocalStorage()
    : agoraStatesDiscussions;
  // 로컬스토리지에 데이터가 있으면 불러오고, 없으면 기존 데이터 불러오기
  addPagesNumber();
  totalDiscussonCalculate(loadData);
  element.replaceChildren(); // 모두 지우고 새로 넣으려고
  const start = currentPage === 0 ? 0 : (currentPage - 1) * 10;
  const end = start + PAGE_LIMIT;
  for (let i = start; i < end; i++) {
    if (i >= loadData.length) break;
    element.append(convertToDiscussion(loadData[i]));
  }
  return;
};

// 처음 화면 렌더링
makeStars();
renderPage($ul, currentPage);

// 모달
const $modal = document.querySelector("#myModal");
const $btn_close = document.querySelector(".close");

$btnShowForm.addEventListener("click", (e) => {
  $modal.style.display = "block";
});
$btn_close.addEventListener("click", (e) => {
  $modal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === $modal) $modal.style.display = "none";
});
