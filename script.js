// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

// 페이지네이션 구현부1 

let pageNum = localStorage.pageNum;
if (pageNum === undefined || pageNum <= 0 || pageNum === 'NaN'){
  pageNum = 1;
  localStorage.pageNum = 1;
}
if (pageNum >= Math.ceil((agoraStatesDiscussions.length)/10)){
  localStorage.pageNum = Math.ceil((agoraStatesDiscussions.length)/10)
  pageNum = localStorage.pageNum;
}

const pageInput = document.querySelector("#currentPage");
pageInput.value = pageNum;
pageInput.placeholder = pageNum; 

// 로컬스토리지 서밋 구현부

if (agoraStatesDiscussions[0].createdAt != localStorage.createdAt){
  agoraStatesDiscussions.unshift(localStorage);
}
if (localStorage.author === undefined){
  agoraStatesDiscussions.shift()
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // 아바타 이미지

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.setAttribute("src", obj.avatarUrl);
    if(!(obj.avatarUrl)){

    }
  avatarWrapper.append(avatarImg);


  // 질문 타이틀, 정보

  const discussionTitle = document.createElement("h2");
  const discussionTitleAnchor = document.createElement("a");
  const discussionInfo = document.createElement("div");
  discussionTitle.className = "discussion__title";
  discussionTitleAnchor.setAttribute("href", obj.url);
  discussionTitleAnchor.textContent = obj.title;
  discussionInfo.className = "discussion__information";
  discussionTitle.append(discussionTitleAnchor);
  discussionContent.append(discussionTitle, discussionInfo);
  

  // 시간 포맷 변경

  let time = obj.createdAt;
  let date = new Date(time);
  let amPm = function () {
    if (date.getHours() >= 12) {
      return `🌞오후 ${(date.getHours()-12)}시`
    }
    else {
      return `🌝오전 ${date.getHours()}시`
    }
  }
  discussionInfo.textContent = `∙ ${obj.author} / ${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${amPm()} ${date.getMinutes()}분`


  // 작성후 지난 시간

  let now = Date.now();
  const timeStamp = date.getTime();
  let timeOver = Math.floor((now-timeStamp)/60000);
  let timePassed = pass(timeOver);
  function pass(time) {
    if (time >= 43200){
      return `${(Math.floor(time/43200))}달 전`
    }
    else if (time >= 1440){
      return `${(Math.floor(time/1440))}일 전`;
    }
    else if (time >= 60){
      return `${(Math.floor(time/60))}시간 전`;
    }
    else{
      return `${(Math.floor(time))}분 전`;
    }
  }
  discussionInfo.textContent += ' (' + timePassed + ') ∙';


  // 답변 존재시 아바타 띄움

  const answerAnchor = document.createElement("a");
  const an_avatarImg = document.createElement("img");
  an_avatarImg.className = "answered__avatar--image";
  answerAnchor.append(an_avatarImg);
  discussionAnswered.append(answerAnchor);

  if (obj.answer){
    answerAnchor.setAttribute("href", obj.answer.url);
    an_avatarImg.setAttribute("src", obj.answer.avatarUrl);
  }
  if (!(obj.answer)){
    an_avatarImg.setAttribute("src", "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdMTOVF%2FbtqSsSo6WFN%2FLzQuJmqCEQNE1T9Z2XZUC1%2Fimg.png");
  }

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// submit 구현

const submit = document.querySelector('.form');
submit.onsubmit = function (){
  localStorage.setItem ("author", this.name.value);
  localStorage.setItem ("title", this.title.value);
  localStorage.setItem ("question", this.story.value);
  localStorage.setItem ("createdAt", Date(Date.now()));
  localStorage.setItem ("avatarUrl", "https://w.namu.la/s/b09197ebc6f4c2d077c0d4ff9d290facd11621ae53aad1c5721fdec668c605a5940d226499c76d0867fa11d36397069d2418ab8892ae2e84d9d5dd2865796cba5160ab80b9e9bbe4a33ca845bfab30cec71474d2995f94d69acde4660c80cbb3");
}

// // agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.(원함수)

// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };


// 페이지네이션을 위해 변형한 렌더링함수

const render = (element) => {
  for (i = (pageNum*10) - 10; i < (pageNum*10) && i < agoraStatesDiscussions.length-1; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.

const ul = document.querySelector("ul.discussions__container");
render(ul);

// 페이지네이션 구현부2

const buttonPageMinus2 = document.querySelector('#btnPage-2');
const buttonPageMinus1 = document.querySelector('#btnPage-1');
const buttonPagePlus1 = document.querySelector('#btnPage1');
const buttonPagePlus2 = document.querySelector('#btnPage2');


buttonPageMinus2.onclick = function () {
  localStorage.pageNum -= buttonPageMinus2.value
  location.reload()
}
buttonPageMinus1.onclick = function () {
  localStorage.pageNum -= buttonPageMinus1.value
  location.reload()
}
buttonPagePlus1.onclick = function () {
  localStorage.pageNum -= buttonPagePlus1.value
  location.reload()
}
buttonPagePlus2.onclick = function () {
  localStorage.pageNum -= buttonPagePlus2.value
  location.reload()
}
pageInput.onchange = function () {
  localStorage.pageNum = pageInput.value
  location.reload()
}