//index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//localStorage.clear();
//convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

const aDlength = agoraStatesDiscussions.length;
const ul = document.querySelector("ul.discussions__container");
let currentpage = 1;

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


/* AJAX를 이용한 구현 */
function render6(element,pagenum) {

  //li제거후 다시 랜더링
  let discussion_li = document.querySelectorAll(".discussion__container");
  for (let i = 0; i < discussion_li.length; i++) {
    discussion_li[i].remove()
  }

  const URI = `http://localhost:4000/discussions/page?pagenum=${pagenum}`
  fetch(URI)
    .then(response => response.json())
    .then(discussions => {
      for (let i = 0; i < discussions.length; i++) {
        element.append(convertToDiscussion(discussions[i]));
      }
    })

    pageCount();
}

///////////////
// submit구현 //
///////////////

function inputTweetHandle(event) {
  event.preventDefault();
  const input_name_title = document.querySelectorAll("#name");

  const URI = "http://localhost:4000/discussions/addTweet"
  const data = {
    title: input_name_title[1].value,
    author: input_name_title[0].value,
  }

  let Tweet = postData(URI, data);
  Tweet.then(render6(ul,1))
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

const submitBtn = document.querySelector("form.form");
submitBtn.addEventListener("submit", inputTweetHandle);


/////////////
// page구현 //
/////////////

function pageCount(){
  const URI = "http://localhost:4000/discussions/pageCount"
  fetch(URI)
  .then(response => response.json())
  .then(data => {
    pagerender(data)})
}


function pagerender(total){

  const ul_page = document.querySelector(".pagination--number");

  let pagenation_li = document.querySelectorAll(".pagination--number--li");
  if (pagenation_li !== null) {
     for (let i = 0; i < pagenation_li.length; i++) {
      pagenation_li[i].remove();
    }
  }
  
  for (let i = 1; i <= total; i++) {
    let li_page = document.createElement("li");
    li_page.textContent = i;
    li_page.classList.add("pagination--number--li");
    li_page.addEventListener("click", paginationHandle);
    ul_page.append(li_page);
  }
}

function paginationHandle(event){
  render6(ul,event.target.textContent)
}


render6(ul,1);



