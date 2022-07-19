// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj, j) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const avatarImg = document.createElement('img'); // 사진 요소 생성
  avatarImg.src = obj.avatarUrl; // img태그의 src속성 초기화
  avatarImg.alt = 'avatar of ' + obj.author; // img태그의 alt속성 초기화
  avatarWrapper.append(avatarImg); // avatarWrapper요소안에 img요소 추가
  
  const discussionTitle = document.createElement('h2'); // 질문 h2 요소 생성
  discussionTitle.className = 'discussion__title'; //h2요소 class 이름 초기화
  const titleUrl = document.createElement('a'); // titleUrl요소 a태그로 생성
  titleUrl.href = obj.url; // agoraStatesDiscussions의 객체 url속성값 초기화
  titleUrl.textContent = obj.title; // titleUrl에 텍스트 초기화
  discussionTitle.append(titleUrl); //discussionTitle안에 titleUrl 요소 추가
  
  const disccusionQuestion = document.createElement('div'); //질문내용 div 요소 생성
  disccusionQuestion.classList  = 'discussion__question';
  // disccusionQuestion.textContent = obj.bodyHTML;
  disccusionQuestion.textContent = obj.bodyHTML.replace(/(<([^>]+)>)/ig,"");

  const discussionInformation = document.createElement('div'); //정보 div 요소 생성
  discussionInformation.className = 'discussion__information'; //discussionInformation요소 class 이름 초기화
  discussionInformation.textContent =  obj.author +' / '+ obj.createdAt; // discussionInformation요소 값 초기화
  discussionContent.append( discussionTitle, disccusionQuestion ,discussionInformation); // discussion_content 요소안에 h2, div요소 추가
  
  const answeredCheckBox = document.createElement('p'); // answered 여부 확인 표시 요소 생성
  answeredCheckBox.textContent = isAnswered(obj);//answered에 체크여부 데이터 할당
  const deleteBox = document.createElement('div');// delete box 요소 생성
  deleteBox.className = 'discussion__delete'; //클래스 네임 정의
  const buttonBox = document.createElement('button'); //버튼 박스 생성
  buttonBox.textContent = '삭제';
  deleteBox.append(buttonBox);

  //렌더링하면서 인덱스를 만들어줌
  const index = document.createElement('div'); // 인덱스 붙일 요소 생성
  index.className = 'hidden';
  index.textContent = j; //순서대로 인덱스 할당

  discussionAnswered.append(answeredCheckBox );// discussionAnswered div요소안에 answeredCheckBox p요소 추가
  li.append(avatarWrapper, discussionContent, discussionAnswered, deleteBox, index); //li에 div요소 붙임
  return li;
};



const isAnswered = function(obj){ // 객체 answer 속성에 따른 체크 표시 리턴하는 함수.
  if(!obj.answer){ //
    return '☒';
  }
  else{
    return '☑';
  }
};

const returnNowtime = function(){ //현재 시간 출력하는 함수.
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 일
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes();  // 분
  let seconds = today.getSeconds();  // 초

  month = ('00'+month.toString()).slice(-2);
  date = ('00'+date.toString()).slice(-2);
  hours = ('00'+hours.toString()).slice(-2);
  isAmPm = Number(('00'+hours.toString()).slice(-2)) >= 12 ? '오후' : '오전';
  minutes = ('00'+minutes.toString()).slice(-2);
  seconds = ('00'+seconds.toString()).slice(-2);

  return `${year}.${month}.${date} - ${isAmPm} ${hours}:${minutes}:${seconds}`;
};


const formInputName = document.querySelector('.form__input--name > input');
const formInputTitle = document.querySelector('.form__input--title > input');
const formInputTextbox = document.querySelector('.form__textbox > textarea');
const formSubmit = document.querySelector('.form');
let tempSpace;
let insertDataForm = {
  id: null,
  createdAt: null,
  title: null,
  url: null,
  author: null,
  answer: null,
  bodyHTML: null,
  avatarUrl: 'https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4',
  };





//submit 이벤트 발생시 agoraStatesDiscussions에 객체타입으로 데이터 넣는 함수.
const addSubmittedDiscussion = function(){
  if(Object.keys(localStorage).length>0){
    console.log('오브젝트키'+Object.keys(localStorage));
    tempSpace = arrayFromLocalStorage();
    initInsertDataForm();
    tempSpace.push(insertDataForm);
  }else{
    initInsertDataForm();
    tempSpace = [insertDataForm]
  }

  setToLocalStorage();//submit으로 추가한 값은 localStorage에 따로 저장한다.
  render(ul);
  console.log(agoraStatesDiscussions);
  return;
};
formSubmit.addEventListener('submit', addSubmittedDiscussion); //  submit 제출 이벤트 발생시 작동하는 함수 (submit 이벤트는 form 요소에서만 잡힌다.)
//event.preventDefault();넣어줘야한다.


//delete 이벤트 발생시 li요소삭제하는 함수.
const discussionList = document.querySelector('.discussions__container');// ul요소
const removeSubmittedDiscussion = function(event){
  let eventEl = event.target; //이벤트 타켓 요소 (버튼요소)
  eventEl.parentNode.parentNode.remove(); // li요소 삭제
  removeLocalStorage();
};
discussionList.addEventListener('click', removeSubmittedDiscussion); //remove 버튼 클릭 이벤트 발생시 작동


//삭제되는 li요소 인덱스에 맞춰 localstorage 해당 인덱스 배열데이터도 삭제하는 함수
const removeLocalStorage = function(delete_index){
  tempSpace = arrayFromLocalStorage();
  tempSpace.splice(delete_index-1, 1);
  console.log(tempSpace);
  setToLocalStorage();
};


//submit할때의 데이터로 초기화시켜주는 함수
const initInsertDataForm = function() { 
  insertDataForm.createdAt = returnNowtime();
  insertDataForm.title = formInputTitle.value;
  insertDataForm.author = formInputName.value;
  insertDataForm.bodyHTML = formInputTextbox.value;
  return;
};

// agoraStatesDiscussions배열값을 localStorage 에 그대로 넣어주는 함수
const setToLocalStorage = function() {
  localStorage.setItem("userData", JSON.stringify(tempSpace)); //로컬에 데이터값 저장
  return;
};

// localstorage에 저장되어있는 값을 원 배열의 형태로 리턴하는 함수
const arrayFromLocalStorage = function() {
  return JSON.parse(localStorage.getItem("userData")); // agoraStatesDiscussions에 로컬저장값을 원배열로 파싱해서 할당
};







// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i++) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  console.log(arrayFromLocalStorage());
  console.log(arrayFromLocalStorage().length);
  if(Object.keys(localStorage.length >0)){ //localstorage에 있는 데이터 렌더링
    for(let j =0; j< arrayFromLocalStorage().length; j++){
      element.prepend(convertToDiscussion(arrayFromLocalStorage()[j], j));

    }
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
