//아고라스테이츠데이터의 avatarUrl을 랜덤 이미지로 교체
const userPicChange = function () {
  for (let x of agoraStatesDiscussions) {
    x.avatarUrl = `./src/user${Math.floor(Math.random() * 10 + 1)}.png`;
  }
};
userPicChange();

// 아고라 스테이츠 데이터를 DOM으로 바꾸기
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //아바타 div 만들고 이미지 삽입
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img"); //이미지
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  //질문 내용 div 만들고 내용 삽입
  const discussionContent = document.createElement("div"); //전체 div
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h2"); //제목
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);
  const link = document.createElement("a"); //제목 내 링크
  link.href = obj.url;
  link.textContent = obj.title;
  discussionTitle.append(link);
  const discussionInfo = document.createElement("div"); //등록 일시
  discussionInfo.className = "discussion__information";

  //ISO 기준 시각을 한국 시각으로 변환
  let time = obj.createdAt;
  function ampm(hour) {
    let num = Number(hour) + 9;
    return num < 12
      ? "오전 " + num.toString().padStart(2, "0")
      : num === 12
      ? "오후 " + num.toString().padStart(2, "0")
      : "오후 " + (num - 12).toString().padStart(2, "0");
  }
  discussionInfo.textContent =
    obj.author +
    " / " +
    ampm(time.slice(11, 13)) +
    ":" +
    time.slice(14, 16) +
    ":" +
    time.slice(17, 19);
  discussionContent.append(discussionInfo);

  //답변 div 만들고 답변 여부 표시하기
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  if (obj.answer) discussionAnswered.textContent = "☑";
  else discussionAnswered.textContent = "☒";

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//로컬 스토리지 구현

//데이터 저장 함수
const saveDataLocalStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};
//데이터 로드 함수
const loadDataLocalStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};

//로컬 스토리지에 데이터가 없으면 데이터를 저장
if (!localStorage.getItem("localDiscussionArray")) {
  saveDataLocalStorage("localDiscussionArray", agoraStatesDiscussions);
}

//질문 추가하기 구현
const form = document.querySelector("form");
let loadedLocalArr = loadDataLocalStorage("localDiscussionArray");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let nameInput = e.target[0].value;
  let titleInput = e.target[1].value;
  let storyInput = e.target[2].value;

  const randomNum = Math.floor(Math.random() * 10 + 1);
  //로컬스토리지에 데이터 추가하기
  loadedLocalArr.unshift({
    id: null,
    createdAt: new Date().toISOString().replace(/\.\d+/, ""),
    title: titleInput,
    url: null,
    author: nameInput,
    answer: null,
    bodyHTML: storyInput,
    avatarUrl: `./src/user${randomNum}.png`,
  });
  saveDataLocalStorage("localDiscussionArray", loadedLocalArr);

  ul.replaceChildren();
  render(ul, 0);
  //폼 제출하면 내용 지우기
  document.querySelector("#name").value = "";
  document.querySelector("#title").value = "";
  document.querySelector("#story").value = "";
});

//페이지네이션 구현

//페이지 숫자 화면에 생성
const listsPerPage = 10;
const pageNumbers = document.querySelector("#page_numbers");
const ul = document.querySelector("ul.discussions__container");
let currentPage = 0;
let dataLength;
let pageCount;
let numberBtn;

const makePageNum = function () {
  pageNumbers.replaceChildren();
  for (let i = 1; i < pageCount + 1; i++) {
    pageNumbers.innerHTML += `<li class='list'><a class='pg_num' href"">${i}</a></li>`;
  }
  numberBtn = document.querySelectorAll(".pg_num");
  numberBtn[0].classList.add("active");
};

//클릭 이벤트 발생시
pageNumbers.addEventListener("click", (e) => {
  if (e.target.className === "pg_num") {
    let idx = parseInt(e.target.textContent) - 1;
    currentPage = idx;
    render(ul, currentPage);
    for (nb of numberBtn) {
      nb.classList.remove("active");
    }
    //클릭하면 해당 버튼만 활성화된다
    numberBtn[idx].classList.add("active");
  }
});

//렌더 함수
const render = (element, page) => {
  ul.replaceChildren();
  dataLength = loadedLocalArr.length;
  pageCount = Math.ceil(dataLength / listsPerPage);
  let start = page * listsPerPage;
  let end =
    page === pageCount - 1
      ? start + (dataLength % listsPerPage)
      : start + listsPerPage;
  console.log(start, end);

  for (let i = start; i < end; i += 1) {
    element.append(convertToDiscussion(loadedLocalArr[i]));
  }
  makePageNum();
  return;
};

render(ul, 0);
numberBtn[0].classList.add("active");
