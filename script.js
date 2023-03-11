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

//로컬 스토리지에서 불러와 렌더링
let ul = document.querySelector("ul.discussions__container");
const render = (element) => {
  let arr = loadDataLocalStorage("localDiscussionArray");
  for (let i = 0; i < arr.length; i += 1) {
    element.append(convertToDiscussion(arr[i]));
  }
  return;
};

render(ul);

//질문 추가하기 구현
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e);
  let nameInput = e.target[0].value;
  let titleInput = e.target[1].value;
  let storyInput = e.target[2].value;
  let loadedLocalArr = loadDataLocalStorage("localDiscussionArray");

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

  ul.innerHTML = "";
  render(ul);
  rows = document.querySelectorAll(".discussion__container");
  displayPage(0);

  //폼 제출하면 내용 지우기
  document.querySelector("#name").value = "";
  document.querySelector("#title").value = "";
  document.querySelector("#story").value = "";
});

//페이지네이션 구현

const rowsPerPage = 10;
let rows = document.querySelectorAll(".discussion__container");
const rowsCount = rows.length;
const pageCount = Math.ceil(rowsCount / rowsPerPage); //(전체 목록 수)/(페이지당 목록 수)
const pageNumbers = document.querySelector("#page_numbers");

//페이지 숫자 화면에 생성
for (let i = 1; i <= pageCount; i++) {
  pageNumbers.innerHTML += `<li class='list'><a class='pg_num' href"">${i}</a></li>`;
}

const numberBtn = pageNumbers.querySelectorAll(".pg_num");

//클릭 이벤트(현재 페이지가 어디인지 숫자 스타일로 보여주고 그 페이지의 질문 목록을 화면에 표시)
numberBtn.forEach((item, idx) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    //현재 페이지 번호에만 스타일링: 먼저 활성화 상태를 전부 지운다
    for (nb of numberBtn) {
      nb.classList.remove("active");
    }
    //클릭하면 해당 버튼만 활성화된다
    e.target.classList.add("active");
    //화면에 목록 표시
    displayPage(idx);
  });
});

document.querySelector(".pg_num").classList.add("active");

//화면에 목록 표시
function displayPage(idx) {
  let start = idx * rowsPerPage;
  let end = start + rowsPerPage;
  let rowsArray = [...rows];

  //전부 화면에서 감추기
  for (ra of rowsArray) {
    ra.className = "discussion__container hide";
  }

  //표시할 목록만 띄우기
  let newRows = rowsArray.slice(start, end);
  for (nr of newRows) {
    nr.className = "discussion__container";
  }
  console.log(newRows);
}
//처음에 1페이지 표시
displayPage(0);
