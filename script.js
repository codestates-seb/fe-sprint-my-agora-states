// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

const localDiscuss=[];

if(localStorage.getItem('discuss')) {
  const tempArray=JSON.parse(localStorage.getItem('discuss'));
  agoraStatesDiscussions.unshift(...tempArray);
  localDiscuss.unshift(...tempArray);
}
console.log(agoraStatesDiscussions);

const pagination = document.querySelector(".pagination");
const openFormBtn = document.querySelector("#open_form");
const closeFormBtn = document.querySelector("#close_form");
const formContainer = document.querySelector(".form__container");
const form=document.querySelector("form");

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("a");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const infoBox = document.createElement("div");
  infoBox.className = "infoBox";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // avatar Photo
  const avatar = document.createElement("img");
  avatar.className = "discussion__avatar--image";
  avatar.src = obj.avatarUrl;
  avatarWrapper.appendChild(avatar);

  //info

  const disInfo = document.createElement("div");
  const disName = document.createElement("div");
  const disTime = document.createElement("div");
  disInfo.className = "discussion__information";
  disName.textContent = `${obj.author}`;
  disTime.textContent = `${timeParser(obj.createdAt)}에 작성됨`;
  disInfo.appendChild(disName);
  disInfo.appendChild(disTime);

  //is answered?
  const iconBlock=document.createElement("div")
  iconBlock.className="iconBlock";
  const icon=document.createElement("i")
  if(obj.answer) icon.className="fa-solid fa-circle-check";
  else icon.className="fa-solid fa-spinner";
  iconBlock.appendChild(icon);

  // title
  discussionContent.href = obj.url;
  const disTitle = document.createElement("h2");
  disTitle.textContent = obj.title;
  disTitle.className = "discussion__title";
  const detail = document.createElement("span");
  detail.classList="detail";
  detail.textContent = "> 자세히 보기";
  disTitle.appendChild(detail);
  discussionContent.appendChild(disTitle);

  //infoBox
  infoBox.appendChild(avatarWrapper);
  infoBox.appendChild(disInfo);
  infoBox.appendChild(iconBlock);

  li.append(infoBox, discussionContent);
  li.addEventListener('click', function () {
  })
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, page) => {
  //컨테이너 청소
  const removable = document.querySelector("ul");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  //렌더 시작
  let renderEnd = page * 10;
  const renderStart = renderEnd - 10;
  if (renderEnd > agoraStatesDiscussions.length) renderEnd = agoraStatesDiscussions.length;
  for (let i = renderStart; i < renderEnd; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  //페이지버튼 렌더함수
  renderPagination(page);
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 1);

// 시간을 예쁜 문자열로
function timeParser(foo) {
  let year, month, day, hour, min, sec;

  year = foo.slice(0, 4);
  month = Number(foo.slice(5, 7));
  day = Number(foo.slice(8, 10));
  hour = Number(foo.slice(11, 13));
  min = Number(foo.slice(14, 16));
  sec = Number(foo.slice(17, 19));
  if (hour > 12) hour = `오후 ${hour - 12}`;
  else if (hour === 12) hour = `오후 12`;
  else hour = `오전 ${hour}`;

  return `${year}년 ${month}월 ${day}일 ${hour}시 ${min}분 ${sec}초`;
}

//질문 추가
form.addEventListener('submit', function () {

  //change timezone utc to gmt
  let tempTime = new Date();
  let offset = tempTime.getTimezoneOffset() * 60000;
  tempTime = new Date(tempTime.getTime() - offset);

  //make new object
  newObj = {};
  newObj.author = document.querySelector("#name").value;
  newObj.title = document.querySelector("#title").value;
  newObj.bodyHTML = document.querySelector("#story").value;

  //clean the form
  document.querySelector("#name").value = "";
  document.querySelector("#title").value = "";
  document.querySelector("#story").value = "";

  newObj.url = "";
  newObj.answer=null;

  newObj.avatarUrl = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg";
  newObj.createdAt = tempTime.toISOString();
  
  
  localDiscuss.unshift(newObj);
  localStorage.setItem('discuss',JSON.stringify(localDiscuss));

  agoraStatesDiscussions.unshift(newObj);

  event.preventDefault();
  render(ul, 1);
  formContainer.classList.add("hide");
})

//페이지네이션
function renderPagination(nowPage) {
  //페이지 컨테이너 청소
  while (pagination.firstChild) {
    pagination.removeChild(pagination.firstChild);
  }

  //페이지버튼 생성
  for (let i = 1; i <= (Math.floor((agoraStatesDiscussions.length-1) / 10)) + 1; i++) {
    renderPageBtn(i);
  }
  //현재 페이지 강조
  const nowPageButton = document.querySelector(`.pagination button:nth-child(${nowPage})`);
  nowPageButton.style.fontWeight = 900;
}
//페이지 버튼
function renderPageBtn(page) {
  const tempButton = document.createElement("button");
  tempButton.textContent = `${page}`;
  tempButton.addEventListener('click', function () {
    render(ul, page);
  })
  pagination.appendChild(tempButton);
}

//질문 열기
openFormBtn.addEventListener('click', function () {
  formContainer.classList.remove("hide");
})

//질문 닫기
closeFormBtn.addEventListener('click', function () {
  formContainer.classList.add("hide");
})

const clearBtn=document.querySelector("#localClearBtn");
clearBtn.addEventListener('click',function(){
  localStorage.clear();
  location.reload()
})