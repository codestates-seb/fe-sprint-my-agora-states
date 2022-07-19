// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

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
  // image
  const avatarImg = document.createElement('img');
  avatarImg.className = ".discussion__avatar--image";
  avatarImg.setAttribute('src', obj.avatarUrl);
  avatarImg.setAttribute('alt', obj.author);
  avatarWrapper.appendChild(avatarImg);

  // contents
  const newTitle = document.createElement('h2');
  newTitle.className = "discussion__title";
  const newA = document.createElement('a');
  newA.setAttribute('href', obj.url);
  newA.textContent = obj.title;
  newTitle.appendChild(newA);
  discussionContent.appendChild(newTitle);

  const newInformation = document.createElement('div');
  newInformation.className = "discussion__information";
  newInformation.textContent = obj.author + ` / ` + obj.createdAt.slice(0, 10);
  discussionContent.appendChild(newInformation);

  // Answered
  const newAnswer = document.createElement('p');
  if (obj.answer) {
    discussionAnswered.innerHTML = `<input type="checkbox" class="active" checked />`;
  } else {
    discussionAnswered.innerHTML = `<input type="checkbox" class="active"  />`;
  }
  discussionAnswered.appendChild(newAnswer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//discussion add
//정보 추가
const newDiscussion = document.querySelector("form");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputQuestion = document.querySelector("#story");
const inputImage = document.querySelector(".image")

newDiscussion.addEventListener('submit', (event) =>{
  event.preventDefault(); 
  const newQuestion = {};
  newQuestion.createdAt = addNowTime();
  newQuestion.title = inputTitle.value;
  newQuestion.author = inputName.value;
  newQuestion.bodyHTML = inputQuestion.value;
  
  //랜덤 아이콘
  const IMG_NUMBER = iconSum.length;

  function genRandom() {
    console.log(Math.round(Math.random() *IMG_NUMBER));
    const number = Math.round(Math.random() *IMG_NUMBER);
    return number;
  }

  function init() {
    const randomNumber = genRandom();
    return iconSum[randomNumber];
  }
  console.log(init());
  newQuestion.avatarUrl = init();

  agoraStatesDiscussions.unshift(newQuestion);

  const newDisc = convertToDiscussion(newQuestion);
  ul.prepend(newDisc);

  inputName.value = "";
  inputTitle.value = "";
  inputQuestion.value = "";
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//현지 시간 적용
const addNowTime = () => {
  const date = new Date();
  let hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  if(hour >= 12){
    hour = hour - 12;
    return `오후${hour}:${minute}:${second}`;
  }else{
    return `오전${hour}:${minute}:${second}`;
  }
}

//페이지네이션
// $(function () {
//   let container = $('#pagination');
//   container.pagination({
//       dataSource: agoraStatesDiscussions,
//       pageSize:10,
//       callback: function (data, pagination) {
//           let dataHtml = '<ul class="discussions__container">';
//           $.each(data, function (index, item) {
//               dataHtml += '<li class="discussion__container">' + item.name + '</li>';
//           });

//           dataHtml += '</ul>';
          
//           $("#data-container").html(dataHtml);
//       }
//   })
// })

//디스커션 유지
// localStorage.setItem('discussions', JSON.stringfy(agoraStatesDiscussions));

// let getStorageData = JSON.parse(localStorage.getItem('discussions'));


//랜덤 백그라운드//
// const body = document.querySelector('body');
// const IMG_NUMBER = 10;

// /* 이미지를 가져오는 함수 */
// function paintImage(imgNumber) {
//     const image = new Image();      /* 1. new 를 사용하여 object 만들기 */
//     image.src = `images/${imgNumber + 1}.jpg`;      /* 2. object에 이미지 주소(레퍼런스) 연결하기 */
//     image.classList.add('bgImage');     /* + 1를 하는 이유는 Math.random() 함수가 0을 줄 수 있기 때문이다.*/
//     body.prepend(image);      /* body 안에 image 넣기 */
// }

// function genRandom() {
//     const number = Math.floor(Math.random() *IMG_NUMBER);
//     return number;
// }

// function init() {
//     const randomNumber = genRandom();   /* 이미지(갯수) 함수와 randeomNumber변수(랜덤숫자생성함수)를 인자로 설정 */
//     paintImage(randomNumber);
// }

// init();