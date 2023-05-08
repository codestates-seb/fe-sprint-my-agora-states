//const { zalgo } = require("colors");

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
const headerContent = document.querySelector('.header__content');


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const liDiv = document.createElement("div");
  liDiv.className = "li_wrapper";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  //timestamp
changeDate = function(date){
  let timeStamp = ``;
  let change = new Date(date);
  timeStamp = `Date: ${change.getFullYear()}년 ${(change.getMonth()+1)}월 ${change.getDate()}일 Time: ${change.getHours()}시
  ${change.getMinutes()}분 ${change.getSeconds()}초`
  return timeStamp;
};

const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

const title = document.createElement("a");
title.textContent = obj.title;
title.href = obj.url;

const h2 = document.createElement("h2");
h2.className = "discussion__title";
h2.append(title);
discussionContent.append(h2);

const information = document.createElement("div");
information.className = "discussion__information";
information.textContent = `${obj.id}  / ` + changeDate(obj.createdAt);
discussionContent.append(information);

const answered = document.createElement("input");
answered.type = "checkbox";
discussionAnswered.append(answered);

//checkbox
if(obj.answer){
  answered.checked = true;
}

//information hover & out
hover = function(){
  if(information.style.display === 'none'){
  information.style.display = "block";
  console.log(information.style.display);
  } 
}

hoverout = function(){
  if(information.style.display === 'block'){
    information.style.display = 'none';
  }
}

information.style.display = 'none';
title.addEventListener("mouseover", hover);
title.addEventListener("mouseout", hoverout)

//팝업 클로즈
// const popUpLayer = document.createElement('div');
// popUpLayer.className = "popup__layer";
// popUpLayer.id = "popup__layer";
// const popUpBox = document.createElement('div');
// popUpBox.className = "popup__box";
// const popUpStyle = document.createElement('div');
// popUpStyle.className = "popup__style";
// const popUpClose = document.createElement('a');
// a.className = "popup__close";

// popUpLayer.append(popUpBox);
// popUpBox.append(popUpStyle);
// //팝업 컨텐츠
// const popUpContent = document.createElement('div');
// popUpContent.className = "popup __content";
// const id = document.createElement('div');
// id.className = 'user_id';
// id = 




  li.append(avatarWrapper, discussionContent, discussionAnswered);
  liDiv.append(li);
  return liDiv;

  
};


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

//submit, 객체정보 추가
const form = document.querySelector("form");

function add(event){
  let id = document.querySelector('#name');
  let title = document.querySelector('#title');
  let story = document.querySelector('#story');

  agoraStatesDiscussions.unshift({
    id : id.value,
    title : title.value,
    url : "",
    createdAt : new Date(),
    avatarUrl:
    "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    bodyHTML : story.value,
  });
  event.preventDefault();
  console.log('go');
  ul.innerHTML = '';
  render(ul);


//value값 초기화
  id.value = null;
  title.value = null;
  story.value = null;

}


render(ul);


form.addEventListener("submit", add);


//새로고침시 정보유지
//list형식, 이미지형식 두 버전
//answer_popup
//top버튼
//목록이동버튼
//페이지네이션
//target&render하기, render함수 건드리기
// 페이지네이션

// const pageNumber = document.querySelector(".pagenumber")
// let currentPage = 1;
// const limit = 5;

// const pageChange = function (currentPage) {

//   const totalCount = agoraStatesDiscussions.length;
//   const pageCount = 5;

//   let totalPage = Math.ceil(totalCount / limit);
//   let pageGroup = Math.ceil(currentPage / pageCount);
//   let lastNum = pageGroup * pageCount;
//   let firstNum = lastNum - (pageCount - 1);
//   if (totalPage < lastNum) {
//     lastNum = totalPage;
//   }
//   if (firstNum <= 1) {
//     firstNum = 1;
//   };

//   // 페이지 버튼 초기화
//   pageNumber.textContent = "";
//   // 페이지 버튼 5개 만들기
//   for (let i = firstNum; i <= lastNum; i++) {
//     const buttons = document.createElement("button");
//     buttons.id = `page${i}`;
//     buttons.textContent = `${i}`;
//     pageNumber.append(buttons);
//   };
//   //페이지 이전 버튼 만들기
//   if (!(currentPage === 1)) {
//     const buttons = document.createElement("button");
//     buttons.id = pre_btn;
//     buttons.className = 'pages';
//     buttons.textContent = '<';
//     pageNumber.prepend(buttons);
//   }
//   //페이지 다음 버튼 만들기
//   if (!(currentPage === totalPage)) {
//     const buttons = document.createElement("button");
//     buttons.id = `aft_btn`;
//     buttons.className = 'pages';
//     buttons.textContent = '>';
//     pageNumber.append(buttons);
//   }

//   const buttonss = document.querySelectorAll('.pages');

//   //target
//   buttonss.addEventListener("click", function (e) {
//     let target = e.target;
//     let buttonContents = target.textContent;// 이런 경우는 스트링으로 받아옴
//     console.log(buttonContents);
//     if (buttonContents === "<") {
//       currentPage = (Number(currentPage) - 1);
//     } else if (buttonContents === ">") {
//       currentPage = (Number(currentPage) + 1);
//     } else {
//       currentPage = Number(buttonContents);
//       console.log(buttonContents);
//     }

//     ul.innerHTML = '';

//     render(ul);
//   });

//   return;
// };

// // agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = limit * (currentPage - 1); i < limit * currentPage; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// render(ul);

// // 기본 첫페이지 작동
// pageChange(1);
//dark/light모드버튼