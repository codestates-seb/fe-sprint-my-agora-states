// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

//함수 시작 ----------------------------------
var stringToHTML = function (str) { //string 형태의 HTML문을 사용할수있게 바꿔주는 함수
  var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body;
};

const createdAtToSmart =  function (str){ //createAt 보기좋게 바꿔주는 함수
  // "2022-05-16T01:02:17Z"
  const date = str.slice(0,10);
  let hour = Number(str.slice(11,13));
  const minute =  Number(str.slice(14,16));
  const second = Number(str.slice(17,19));
  let befoAfter = "";
  if(hour > 13) {
    befoAfter = "오후";
    hour %= 12;
  }else {
    befoAfter = "오전";
  }
  return `${date} ${befoAfter} ${hour}시 ${minute}분 ${second}초`
}

//함수 끝 ------------------------------------

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //이미지 부분
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image'
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //중앙 제목부분
  const discussion__title = document.createElement("h2");
  discussion__title.className = 'discussion__title';
  discussion__title.textContent = obj.title;

  const discussion__information = document.createElement("div");
  discussion__information.className = 'discussion__information';
  discussion__information.textContent = `${obj.author} / ${createdAtToSmart(obj.createdAt)}`;

  discussionContent.append(discussion__information, discussion__title)

  //질문체크 부분
  const discussion__answered = document.createElement("div")
  discussion__answered.className = 'discussion__answered';

  const discussion__answered_check = document.createElement("p");
  discussion__answered_check.className = "discussion__answered_check"
  if(obj.answer === null){
    discussion__answered_check.textContent = "X"
    discussion__answered_check.style.color = "red"
  }else{
    discussion__answered_check.textContent = "O"
    discussion__answered_check.style.color = "green"
  }
  

  const discussion__title_btn = document.createElement("button");
  discussion__title_btn.className = "discussion__title_btn";
  discussion__title_btn.textContent = "Link"
  discussion__title_btn.id = obj.id
  
  discussion__answered.append(discussion__answered_check,discussion__title_btn )

  li.append(avatarWrapper, discussionContent, discussion__answered);
  return li;
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
render(ul);

//질문작성 시 리스트에 추가해주는거 구현 시작
const form = document.querySelector(".form")
form.addEventListener("submit", addList = (event) =>{
  event.preventDefault();
  console.log(event.target["name"].value, event)

  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;  //미국시간 -> 한국시간으로 바꾸기위한 오프셋
  
  const addObj = {
    id: "D_kwDOHOApLM4APjJi",
    createdAt: new Date(new Date().getTime() + KR_TIME_DIFF).toISOString(), //기록하자
    title: event.target["title"].value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: event.target["name"].value,
    answer: null,
    bodyHTML: event.target["story"].value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  ul.append(convertToDiscussion(addObj));
  pageNationGo(document.querySelector(".pageButtons").childElementCount-1);
  event.target['title'].value = ''
  event.target['name'].value = ''
  event.target['story'].value = ''
  console.dir(document.querySelector('.discussion__wrapper'))
})
//질문작성 시 리스트에 추가해주는거 구현 끝

//날먹 
const open = (event) => {
    document.querySelector(".modal").classList.remove("hidden");
}
const close = () => {
  document.querySelector(".modal").classList.add("hidden");
}
document.querySelector(".openBtn").addEventListener("click", open);
document.querySelector(".bg").addEventListener("click", close);
//날먹  끝

//모달 2 만들기 구역 시작
//1. 버튼을 누르면 버튼의 아이디로 객체를 찾는다.
//2. 찾은 객체로 질문과 답변을 <div>요소를 생성해 담는다
//3. 켜진 모달창에 append 한다
//4. 모달창이 닫힌경우 모든 내용을 지워준다

const show = (event) => { //모달2 그려주눈 함수
  console.log(event)
  document.querySelector('.modal_2').classList.remove('hidden')
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    if(agoraStatesDiscussions[i].id === event.target.id){
      const question = document.createElement("q")
      question.className = "questionArea"
      const answer = document.createElement("q")
      answer.className = "answerArea"
      
      
      if(agoraStatesDiscussions[i].answer === null){  //질문이 없는지 확인
        answer.innerHTML = ""}
      else{
        answer.append(stringToHTML(agoraStatesDiscussions[i].answer.bodyHTML))
      }
      question.append(stringToHTML(agoraStatesDiscussions[i].bodyHTML))
      modalBox_2.append(question, answer)
    }
  }
}

const showEnd = (event) => {  //모달2 삭제하는 함수
  modalBox_2.innerHTML = ""  //
  document.querySelector('.modal_2').classList.add('hidden')
}

for(const i of document.querySelectorAll('.discussion__title_btn')){
  i.addEventListener("click", show);
}

const modalBox_2 = document.querySelector('.modalBox_2')
document.querySelector(".bg_2").addEventListener("click", showEnd);
//모달 2 만들기 구역 끝

//페이지 네이션 시작
//렌더링된 리스트 개수를 받아옴
//모든 게시물 리스트들 hide 처리 
//한 페이지에 10개의 게시물이라고 가정, 리스트의 개수는 45개라고 가정
//페이지 개수는 Math.ceil(45/10) -> 5개
//페이지 네이션 버튼 구현 [1][2][3][4][5]
//기본 설정은 1페이지, 3페이지 누를경우 20~29번 게시물 리스트 remove('hide') 

const pageNation = (num) => {
  const pageUl = document.querySelector('ul.discussions__container')
  const pageNation = document.querySelector(".pageNation")
  for(let i=0; i<pageUl.childElementCount; i++){
    pageUl.children[i].classList.add('hidden')
  }
  const pageNumbers = Math.ceil(pageUl.childElementCount/num)
  const pageButtons = document.createElement('div')
  pageButtons.className = 'pageButtons'
  for(let i=0; i<pageNumbers; i++){
    const pageButton = document.createElement('button')
    pageButton.className = 'pageButton'
    pageButton.textContent = i+1
    pageButtons.append(pageButton)
  }
  pageNation.append(pageButtons)
}

const pageNationGo = (go) => {
  const pageUl = document.querySelector('ul.discussions__container')
  for(let i=0; i<pageUl.childElementCount; i++){
    if(pageUl.children[i].localName === 'li'){
      pageUl.children[i].classList.add('hidden')
    }
  }
  go *= 10
  for(let i=go; i<=go+9; i++){
    pageUl.children[i].classList.remove('hidden')
  }
}

pageNation(10)    //페이지 10개 기준으로 나눔
pageNationGo(0)   //기본설정 1페이지
const pageButton = document.querySelectorAll('.pageButton')
for(const Button of pageButton){
  Button.addEventListener('click', function(){pageNationGo(Number(Button.textContent)-1)})
} 

