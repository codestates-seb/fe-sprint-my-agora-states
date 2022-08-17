//index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//localStorage.clear();
//convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

const aDlength = agoraStatesDiscussions.length;

const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const subElementobj = subConvertToDiscussion(obj);

  // 이미지
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  avatarWrapper.append(subElementobj.image);

  //내용
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  discussionContent.append(subElementobj.title);
  discussionContent.append(subElementobj.info);

  //답변여부
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  discussionAnswered.append(subElementobj.answer);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const subConvertToDiscussion = (obj) => {

  const elementObj = {};

  //이미지
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarImg.classList.add("discussion__avatar--image");
  elementObj.image = avatarImg;

  //제목
  const discussionTitle = document.createElement("h2");
  const discussionTilte_aTag = document.createElement("a");
  discussionTilte_aTag.href = obj.url;
  discussionTilte_aTag.textContent = obj.title;
  discussionTitle.classList = "discussion__title";
  discussionTitle.append(discussionTilte_aTag);
  elementObj.title = discussionTitle;

  //날짜
  const discussionInformation = document.createElement("div");
  //console.log(obj["createdAt"]);

  discussionInformation.textContent = `${obj["author"]} / ${convertTime(obj["createdAt"])}`;
  //discussionInformation.textContent = `${obj["author"]} / ${obj["createdAt"]}`;
  discussionInformation.classList = "discussion__information";
  elementObj.info = discussionInformation;

  //답변여부
  const IsAnswered = document.createElement("p");
  obj.answer === null ? IsAnswered.textContent = "☹︎" : IsAnswered.textContent = "☻";
  elementObj.answer = IsAnswered;

  return elementObj;
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {

  for (let i = 0; i < agoraStatesDiscussions.length; i++) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const render2 = (element) => {

  let objarr = JSON.parse(localStorage.getItem(localStorage.key(0)))

  if (objarr !== null) {
    for (let i = 0; i < objarr.length; i++) {
      console.log(objarr[i]);
      element.prepend(convertToDiscussion(objarr[i]));
    }
    return;
  }
};

const render3 = (element, obj) => {

  element.prepend(convertToDiscussion(obj));
  return;
};

//새로추가할때
function render4(element, min, max) {

  //li제거후 다시 랜더링
  let t = document.querySelectorAll(".discussion__container");
  for (let i = 0; i < t.length; i++) {
    t[i].remove()
  }

  for (let i = min; i <= max; i++) {
    if (agoraStatesDiscussions[i] === undefined)
      break;
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

//새로고침, 초기 실행
function render5(element, min, max) {

  let localStoragearr = JSON.parse(localStorage.getItem(localStorage.key(0)));  //배열이고 요소가 객체 
  if (localStoragearr !== null) {
    for (let i = 0; i < localStoragearr.length; i++) {
      agoraStatesDiscussions.unshift(localStoragearr[i]);
    }
  }

  let t = document.querySelectorAll(".discussion__container");
  for (let i = 0; i < t.length; i++) {
    t[i].remove()
  }

  for (let i = min; i <= max; i++) {
    if (agoraStatesDiscussions[i] === undefined)
      break;
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

//서버와 통신
function render6(element) {

  //li제거후 다시 랜더링
  let discussion_li = document.querySelectorAll(".discussion__container");
  for (let i = 0; i < discussion_li.length; i++) {
    discussion_li[i].remove()
  }

  const URI = "http://localhost:4000/discussions";
  fetch(URI)
    .then(response => response.json())
    .then(discussions => {
      for (let i = 0; i < discussions.length; i++) {
        element.append(convertToDiscussion(discussions[i]));
      }
    })
}



// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
let df = document.createDocumentFragment();
const ul = document.querySelector("ul.discussions__container");
//render(df);
//render(ul);
//ul.append(df);
//render2(ul);

const submitBtn = document.querySelector("form.form");
submitBtn.addEventListener("submit", inputTweetHandle);

//submit이벤트
function readInput(event) {
  event.preventDefault();
  const input_name_title = document.querySelectorAll("#name");
  const input_question = document.querySelector("#story");

  if (input_name_title[0].value !== "" && input_name_title[1].value !== "" && input_question.value !== "") {

    let obj = {};
    obj.createdAt = new Date().toISOString();
    // obj.createdAt = new Date().toISOString();
    obj.title = input_name_title[1].value;
    obj.author = input_name_title[0].value;
    obj.avatarUrl = "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4";
    obj.content = input_question.value;
    obj.answer = null;
    addLocalStorage(obj);
  }
}

function inputTweetHandle(event) {
  event.preventDefault();
  const input_name_title = document.querySelectorAll("#name");

  const URI = "http://localhost:4000/discussions/addTweet"
  const data = {
    title: input_name_title[1].value,
    author: input_name_title[0].value,
  }

  let Tweet = postData(URI, data);
  console.log(Tweet)
  Tweet.then((data)=>{
    ul.prepend(convertToDiscussion(data))})
}

async function postData(url = '', data = {}) {
  // 옵션 기본 값은 *로 강조

  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE 등
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
  });
  return response.json(); // JSON 응답을 네이티브 JavaScript 객체로 파싱
}

function addLocalStorage(obj) {

  //배열을 가져와서 그 뒤에 추가. localStorage는 key ,value 만 보장하고 순서는 보장하지 않는 문제.
  let localStoragearr = JSON.parse(localStorage.getItem(localStorage.key(0)));
  localStorage.clear();

  if (localStoragearr === null) {
    localStoragearr = [];
  }

  //입력한 값 객체로만든뒤 배열에 추가.
  localStoragearr.push(obj);  //배열이고 요소하나하나는 객체
  localStorage.setItem("temp", JSON.stringify(localStoragearr));
  agoraStatesDiscussions.unshift(obj);
  totalpage();
  render4(ul, 0, 9);
}

function convertTime(time) {
  let temp = time.split("T");
  let hourminsecond = temp[1].split(":");
  let second = hourminsecond[2].slice(0, 2);
  let datetime = "";
  if (Number(hourminsecond[0]) > 12) {
    datetime = `${temp[0]} 오후 ${Number(hourminsecond[0]) - 12}:${hourminsecond[1]}:${second}`;
  }
  else {
    datetime = `${temp[0]} 오전 ${hourminsecond[0]}:${hourminsecond[1]}:${second}`;
  }
  return datetime;
}

const ul_page = document.querySelector(".pagination--number")

//page구현
function totalpage() {
  // let objarr = JSON.parse(localStorage.getItem(localStorage.key(0)))
  // let total = objarr === null ? agoraStatesDiscussions.length / 10 : (objarr.length + agoraStatesDiscussions.length) / 10;
  // total % 10 === 0 ? total : total++;

  let objarr = JSON.parse(localStorage.getItem(localStorage.key(0)))
  let total = objarr === null ? aDlength / 10 : (objarr.length + aDlength) / 10;
  (total * 10) % 10 === 0 ? total : total++;
  console.log(total);

  let t = document.querySelectorAll(".pagination--number--li");
  if (t !== null) {
    for (let i = 0; i < t.length; i++) {
      t[i].remove()
    }
  }

  // const paginationleft = document.createElement("li");
  // const paginationright = document.createElement("li");

  // paginationleft.classList.add("pagination--left")  
  // paginationright.classList.add("pagination--right")

  // paginationleft.textContent = "<";
  // paginationright.textContent = ">";

  // ul_page.append(paginationleft);

  for (let i = 1; i <= total; i++) {
    let li_page = document.createElement("li");
    li_page.textContent = i;
    li_page.classList.add("pagination--number--li");
    li_page.addEventListener("click", pagination);
    ul_page.append(li_page);
  }

  //ul_page.append(paginationright)

}

function pagination(event) {

  let target = event.currentTarget;
  let min = target.textContent * 10 - 10;
  let max = target.textContent * 10 - 1;

  render4(ul, min, max);
  //페이지 수 클릭시 해당값 전달
  //전달한 값을 기준으로 append
  //추가했을 때 페이지 구성 달라지는 것 고려해야함.(localstorage + data.js)        
}



//totalpage();
// render5(ul, 0, 9)
render6(ul);

//document.querySelector(".discussion__information").textContent = convertTime(document.querySelector(".discussion__information").textContent);

