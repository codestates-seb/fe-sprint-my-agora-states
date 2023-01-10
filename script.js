// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);


let body = document.body;


// Click Me 눌렀을 때
const showContentBtn = document.querySelector('.show__content');
const start__display = document.querySelector('.start__display');
const discussionWrapper = document.querySelector('.discussion__wrapper');
const formContainer = document.querySelector('.form__container');
const main = document.querySelector('main');

showContentBtn.addEventListener('click', function() {
  start__display.classList.add('change__opacity__zero');
});


// 페이지네이션
const listElement = document.querySelector('.discussions__container');  // 디스커션 담을 ul 가져오기
const pageList = document.querySelector('.page_list');  // 페이지 목록 넣을 곳 가져오기

let discussionsCount = document.querySelector('.discussions__count');

let currentPage = 1;  //초기화하면 시작 페이지
let rows = 10; //한 목록에 보여줄 아이템

let firstPage = 1;  // 처음 펲이지

function displayList(items, wrapper, rows_per_page, page){  // 화면에 렌더링 함수
  wrapper.innerHTML = '';
  page--; // 배열 0부터 돌아야되니까 -- 해주기

  let start = rows_per_page * page;  // 현재 페이지에 보여줄 첫번째 아이템 몇번째 인지
  let end = start + rows_per_page;  // 현재 페이지에 보여줄 마지막 아이템 몇번째인지
  let paginatedItems = items.slice(start, end);  // 배열에서 현재 페이지 첫번째 아이템부터 마지막 아이템까지 가져오기
  
  for(let i = 0; i < paginatedItems.length; i++){ // 현재 페이지의 아이템 불러오기
    let item = paginatedItems[i]; // 현재 페이지에 들어갈 아이템 넣어주기

    let itemElement = document.createElement('li'); // 한 디스커션이 하나의 li이므로 li 생성
    itemElement.className = "discussion__container";

    wrapper.append(itemElement);  // ul에 li 넣어주고

    convertToDiscussion(item, itemElement); // 만든 li에 각 객체 요소 넣어주기

  }
}


 // 페이지 이동 제어 함수
function setupPagination(items, wrapper, rows_per_page) {
  wrapper.innerHTML = '';

  let page_count = Math.ceil(items.length / rows_per_page); // 총 필요한 페이지 수 구하기
  for(let i = 1; i < page_count + 1 ; i++){
    let btn = paginationButton(i, items);
    pageList.append(btn);
  }
}

let rightBtn = document.querySelector('.right');
let leftBtn = document.querySelector('.left');


// 페이지 버튼 생성 + 버튼 누르면 페이지 이동해주는 함수 생성
function paginationButton(page, items) {
  let paginationBtn = document.createElement('button');

  paginationBtn.innerText = page;

  if(currentPage === page) {
    paginationBtn.classList.add('active');
  }

  paginationBtn.addEventListener('click', function() {
    currentPage = page;
    displayList(items, listElement, rows, currentPage);

    let currentBtn = document.querySelector('.page_list .active');  // 현재 active 되어있는 버튼 가져와서
    currentBtn.classList.remove('active');  // active 지워주고

    paginationBtn.classList.add('active');  // 지금 누른 버튼에 active 해주기
  })  

  return paginationBtn;
}

leftBtn.addEventListener('click', function(clickedPage) {
  if(currentPage > firstPage){  // 1페이지일 경우 전 페이지로 안간다.
    let currentBtn = document.querySelector('.page_list .active');
    currentBtn.classList.remove('active');  // 지금 활성화 되어있는 버튼 끄고
    let prevBtn = currentBtn.previousSibling; // 지금 활성화 되어있는 버튼의 이전 형제를 가져온다.
    prevBtn.classList.add('active');
    currentPage = currentPage - 1;  // 현재 페이지를 지금 페이지 - 1 해주기
    displayList(JSON.parse(localStorage.getItem('Discussions')), listElement, rows, currentPage); // items를 전달받지 못해서 현재 데이터로 렌더링 해주기
  }
  else{
    alert('첫번째 페이지입니다.');
  }
});

rightBtn.addEventListener('click', function() {
  let lastPage = Math.ceil(JSON.parse(localStorage.getItem('Discussions')).length / rows);  // 마지막 페이지
  if(currentPage < lastPage) {  // 마지막 페이지일 경우 다음 페이지로 안간다.
    let currentBtn = document.querySelector('.page_list .active');
    currentBtn.classList.remove('active');
    let nextBtn = currentBtn.nextSibling;
    nextBtn.classList.add('active');
    currentPage = currentPage + 1;
    displayList(JSON.parse(localStorage.getItem('Discussions')), listElement, rows, currentPage);
  }
  else{
    alert('마지막 페이지입니다.');
  }
});



// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj, itemLi) => {
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  
  // 프로필 이미지 추가
  const avatarImg = document.createElement('img');  
  avatarImg.className = "discussion__avatar--image";

  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);


  // 질문 제목(링크 포함)), 작성자 추가
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement("a");

  discussionLink.href = obj.url;
  discussionLink.textContent = obj.title;
  discussionTitle.append(discussionLink);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  let localeDate = new Date(obj.createdAt).toLocaleString();
  discussionInformation.textContent = obj.author + ' / ' + localeDate;
  
  discussionContent.append(discussionTitle, discussionInformation);


  // 체크박스 추가
  const answeredCheck = document.createElement('div');
  answeredCheck.className = 'answered__check';

  if(obj.answer !== null){
    answeredCheck.textContent = '💬';
  }
  discussionAnswered.append(answeredCheck);


  // 질문 박스 완성하기
  itemLi.append(avatarWrapper, discussionContent, discussionAnswered);


  // 답변 있으면 답변도 추가
  if(obj.answer !== null) {
    // 답변 전체 박스
    const answeredContainer = document.createElement("div");
   answeredContainer.className = "answered__container";
   answeredContainer.classList.add('hide');


    itemLi.append(answeredContainer);

    answeredCheck.addEventListener('click', function() {
      answeredContainer.classList.toggle('hide');
    });

      
    //답변 아바타 박스
    const answeredAvatarWrapper = document.createElement("div");
    answeredAvatarWrapper.className = "answered__avatar--wrapper";

    const answeredAvatarImg = document.createElement('img');  
    answeredAvatarImg.className = "answered__avatar--image";

    answeredAvatarImg.src = obj.answer.avatarUrl;
    answeredAvatarImg.alt = 'avatar of ' + obj.answer.author;
    answeredAvatarWrapper.append(answeredAvatarImg);

    
    //답변 작성자, 시간
    const answeredInformation = document.createElement("div");

    answeredInformation.className = "answered__information";
    const answeredWriter = document.createElement("div");
    answeredWriter.className = "answered__writer"
    answeredWriter.textContent = obj.answer.author;

    const answeredDate = document.createElement("div");
    answeredDate.className = "answered__date";
    answeredDate.textContent = new Date(obj.answer.createdAt).toLocaleString();

    answeredInformation.append(answeredWriter, answeredDate);


    // 답변 내용
    const answeredContent = document.createElement("div");
    answeredContent.className = "answered__content";
    answeredContent.innerHTML = obj.answer.bodyHTML;


    answeredContainer.append(answeredAvatarWrapper,answeredInformation, answeredContent);
  }
  return itemLi;
};


// submit 누르면 디스커션 추가하는 기능 만들기
const submitBtn = document.querySelector('.form__submit');
let discussions= [];  // 로컬 스토리지에 있는 데이터 담을 배열 선언

submitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  let nameValue = document.querySelector('#name').value;
  let titleValue = document.querySelector('#title').value;
  let storyValue = document.querySelector('#story').value;
  let form = document.querySelector('.form');
  let currentTime = new Date();
  
  const newDiscussion = {
    id: 'random id',
    createdAt: currentTime,
    author: nameValue,
    title: titleValue,
    body: storyValue,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    avatarUrl: "./images/계피_.png",
    answer: null  // 안 넣어주면 answer null 아닌거 if문에 걸려서 오류난다.
  };
  if(nameValue !== '' && titleValue !== '' && storyValue !== '' ){
    agoraStatesDiscussions.unshift(newDiscussion);  // 데이터 배열에 새로만든 객체 추가

    discussions.unshift(newDiscussion); // 원래 discussions 배열에 추가한 데이터 객체 추가해주고

    localStorage.setItem('Discussions', JSON.stringify(discussions)); // 추가한 데이터가 더해진 discussions를 다시 로컬 스토리지에 데이터로 넣어준다.
    
    discussionsCount.innerText = '( ' + discussions.length + ' )';  // 디스커션 개수 업데이트

    displayList(JSON.parse(localStorage.getItem('Discussions')), listElement, rows, currentPage); // 새로운 데이터 추가했을 때도 화면에 그려줘야 하므로 호출
    setupPagination(JSON.parse(localStorage.getItem('Discussions')), pageList, rows); // 데이터가 늘었을 때 페이지 수가 늘어날 수 있으므로 호출
    
    form.reset();
  }
  else {
    alert('모두 입력해주세요.');
  }
});



// 배경에 원 그려주는 부분
let canvas = document.createElement('canvas');  // 원들이 움직일 캔버스 생성
canvas.id = "canvas";
body.prepend(canvas);

let getCanvas = document.querySelector('#canvas'); // 캔버스 가져오기
let ctx = getCanvas.getContext('2d');

getCanvas.setAttribute("width", window.innerWidth);
getCanvas.setAttribute("height", window.innerHeight);

let canvasWidth = getCanvas.width, canvasHeight = getCanvas.height;  // 캔버스 크기 담기

let circle = [
  { x: 100, y: 100, radius: 80} // 공 좌표, 반지름 
]
let dx = 4;
let dy = 4; // 공 속도 조절

let anim; // 애니메이션 담을 변수

// 초기화, draw 함수 호출 함수
function init() {
  anim = window.requestAnimationFrame(draw);  // 적절한 타이밍에 draw 함수를 계속 호출한다.
}

// 실제 그려주는 함수
function draw() {
  clear();

  for(let i = 0; i < circle.length; i++){
    ball(circle[i].x, circle[i].y, circle[i].radius);
    circle[i].x += dx;  // x 좌표가 계속 늘어나게
    circle[i].y += dy;  // y 좌표가 계속 늘어나게
 
    if(circle[i].x >= canvasWidth - circle[i].radius || circle[i].x <= 0 + circle[i].radius){
      dx = -dx; // 왼쪽이나 오른쪽 벽에 닿으면 - 값을 곱해줘서 반대 방향으로 가게끔
    }
    if( circle[i].y >= canvasHeight - circle[i].radius || circle[i].y <= 0 + circle[i].radius){
      dy = -dy;
    }
  }
  
 
    anim = window.requestAnimationFrame(draw);

}

// canvas 초기화함수
function clear() {  // 매 호출 시 캔버스를 비워준다.
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}


// 공 그려주는 함수
function ball(x, y, r) {
  let img = new Image();
  img.src = './images/cinnamon.png';
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();

  ctx.drawImage(img, x-80, y-80, 160, 160);
}



/* 메뉴 버튼 누르면 */
let exitBtn = document.querySelector('.exitBtn');
let downBtn = document.querySelector('.downBtn');
let smallBtn = document.querySelector('.smallBtn');
let agorastatesTab = document.querySelector('.agorastatesTab');


exitBtn.addEventListener('click', function() {
  main.classList.add('exit');
});

downBtn.addEventListener('click', function() {
  agorastatesTab.classList.remove('change__opacity__zero');
  agorastatesTab.classList.add('change__opacity__one');
  main.classList.add('down');
  main.classList.remove('up');
});


agorastatesTab.addEventListener('click', function() {
  agorastatesTab.classList.remove('change__opacity__one');
  agorastatesTab.classList.add('change__opacity__zero');
  main.classList.add('up');
  main.classList.remove('down');
});


smallBtn.addEventListener('click', function() {
  if(main.classList.contains('sizeBig')){
    main.classList.remove('sizeBig');
    main.classList.add('sizeSmall');
  }
  else {
    main.classList.add('sizeBig');
    main.classList.remove('sizeSmall');
  }
});

  // 경우의 수 두개 나누지 않으면 discussions이 계속 초기화 되서 추가한 데이터가 날아감.
if(localStorage.length === 0){  // 저장된 데이터가 없으면 (내가 추가한 거 없을 때)
  localStorage.setItem('Discussions', JSON.stringify(agoraStatesDiscussions));  // 로컬 스토리지에 이미 주어진 agoraStatesDiscussion 데이터 저장
  discussions = JSON.parse(localStorage.getItem('Discussions'));  // 로컬 스토리지에 저장한 데이터 담아주기
  discussionsCount.innerText = '( ' + discussions.length + ' )'; // 디스커션 개수 업데이트
  displayList(discussions, listElement, rows, currentPage); // 화면에 담아온 데이터 그려주기
  setupPagination(discussions, pageList, rows); // 페이지네이션 그려주기
}

else{ // 추가 한 게 있을 때
  discussions = JSON.parse(localStorage.getItem('Discussions'));  // 추가한게 있을 경우에는 로컬 스토리지에 이미 저장되어 있는 데이터를 받아온다.(내가 추가한 데이터까지 포함되어있음)
  discussionsCount.innerText = '( ' + discussions.length + ' )'; // 디스커션 개수 업데이트
  displayList(discussions, listElement, rows, currentPage);
  setupPagination(discussions, pageList, rows);
}

window.onload = function() {
  init(); // 뒤에 공 튀기는 함수 호출
}



/*
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
*/
