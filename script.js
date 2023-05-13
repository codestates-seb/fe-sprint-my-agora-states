// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
// let data = localStorage.getItem("agoraStatesDiscussions");
// let page = agoraStatesDiscussions.slice();
// console.log(page);
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => { // convertToDiscussion(obj) 함수 생성
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // div 요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper"; // 클래스 이름 지정
  const discussionContent = document.createElement("div"); // div 요소 생성
  discussionContent.className = "discussion__content"; // 클래스 지정
  const discussionAnswered = document.createElement("div"); // div 요소 생성
  discussionAnswered.className = "discussion__answered"; // 클래스 지정

  li.append(avatarWrapper, discussionContent, discussionAnswered); // li 요소의 자식으로 추가

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatarImg = document.createElement("img"); // img(이미지) 요소 생성
  avatarImg.className = "discussion__avatar--image"; // 클래스 이름 지정
  avatarImg.src = obj.avatarUrl; // src(소스) URL 지정
  avatarImg.alt = `avatar of ${obj.author}`; // alt(설명) 지정
  avatarWrapper.append(avatarImg); // li div.discussion__avatar--wrapper 요소의 자식으로 추가

  const titleH2 = document.createElement("h2"); // h2 요소 생성
  titleH2.className = "discussion__title"; // 클래스 지정
  discussionContent.append(titleH2); // li div.discussion__content 요소의 자식으로 추가

  const titleA = document.createElement("a"); // a(링크) 요소 생성
  titleA.href = obj.url; // href(참조) 지정
  titleA.target = "contentBox"; // target(보여줄 위치) 지정
  titleA.textContent = obj.title; // 여는 요소와 닫는 요소 사이에 있는 textContent(렌더링 될 문자) 입력
  titleH2.append(titleA); // li div.discussion__content h2 요소의 자식으로 추가
  
  const authorDiv = document.createElement("div"); // div 요소 생성
  authorDiv.className = "discussion__information"; // 클래스 지정
  authorDiv.textContent = `${obj.author} / ${obj.createdAt}`; // 여는 요소와 닫는 요소 사이에 있는 textContent(렌더링 될 문자) 입력
  discussionContent.append(authorDiv); // li div.discussion__content 요소의 자식으로 추가
  
  if(obj.answer === null){ // 답변자(answer)가 없다면
    discussionAnswered.textContent = `🖤`; // li div.discussion__answered 여는 요소와 닫는 요소 사이에 있는 textContent(렌더링 될 문자) 입력
  }
  else{
    discussionAnswered.textContent = `💗`; // li div.discussion__answered 여는 요소와 닫는 요소 사이에 있는 textContent(렌더링 될 문자) 입력
  }

  return li; // 모든 것이 후손 요소로 있는 li.discussion__container 를 반환한다
};

// agoraStatesDiscussions 배열 중 1개 페이지의 데이터를 화면에 렌더링하는 함수입니다.
let contentAll = agoraStatesDiscussions.length;
let pageNumber = 1;

let button1 = document.querySelector("button#button1");
let button2 = document.querySelector("button#button2");
let button3 = document.querySelector("button#button3");
let button4 = document.querySelector("button#button4");
let button5 = document.querySelector("button#button5");

const render = (pageUl) => { // 해당 페이지의 Ul pageUl, 해당 페이지의 첫 게시글 firstContent, 페이지 당 표시되는 게시글 수 contentLimit

  contentAll = agoraStatesDiscussions.length;
  
  while(pageUl.firstChild){
    pageUl.removeChild(pageUl.firstChild);
  }

  console.log(pageNumber);

  if(pageNumber-1 === 0){
    pageNumber = 1;
    for (let i = pageNumber; i < pageNumber*10; i++) {
      pageUl.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
  }
  else{
    for (let i = (pageNumber-1)*10; i < (pageNumber*10)-1; i++) { //질문 갯수만큼
      pageUl.append(convertToDiscussion(agoraStatesDiscussions[i])); //
    }
  }

  console.log(pageNumber);

  button1.textContent = pageNumber-2; button2.textContent = pageNumber-1; button3.textContent = pageNumber; button4.textContent = pageNumber+1; button5.textContent = pageNumber+2;

  if(pageNumber === 1 || pageNumber === 2 || pageNumber === 3){
    button1.textContent = 1; button2.textContent = 2; button3.textContent = 3; button4.textContent = 4; button5.textContent = 5;
  }
  if(pageNumber === Math.ceil(contentAll/10) || pageNumber === Math.ceil(contentAll/10)-1 || pageNumber === Math.ceil(contentAll/10)-2){
    button1.textContent = Math.ceil(contentAll/10)-4; button2.textContent = Math.ceil(contentAll/10)-3; button3.textContent = Math.ceil(contentAll/10)-2; button4.textContent = Math.ceil(contentAll/10)-1; button5.textContent = Math.ceil(contentAll/10);
  }

  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const pageUl = document.querySelector("ul.discussions__container"); // 변수 ul은 ul박스
render(pageUl);

// submit한 내용들을 배열 형태로 agoraStatesDiscussions에 추가
document.querySelector("form").addEventListener("submit",(e) => {
  e.preventDefault();

  pageNumber = 1;

  const resultSubmit = {
    author: document.querySelector("input#name").value,
    title: document.querySelector("input#title").value,
    createdAt: new Date(),
    bodyHTML: document.querySelector("textarea#story").value,
    answer: null,
    avatarUrl: 'https://www.shutterstock.com/image-vector/cute-cat-logo-symbol-design-260nw-2225970013.jpg'
  }

  agoraStatesDiscussions.unshift(resultSubmit);

  render(pageUl);
})

// button 누르면 페이지넘버 변화 후 다시 렌더링
document.querySelector("button#startButton").addEventListener("click",(e) => {
  e.preventDefault();

  pageNumber = 1;
  
  render(pageUl);
})
document.querySelector("button#frontButton").addEventListener("click",(e) => {
  e.preventDefault();

  if(pageNumber-1 <= 0){
    pageNumber = 1;
  }
  else{
    pageNumber--;
  }
  
  render(pageUl);
})
document.querySelector("button#button1").addEventListener("click",(e) => {
  e.preventDefault();

  pageNumber = Number(button1.textContent);
  
  render(pageUl);
})
document.querySelector("button#button2").addEventListener("click",(e) => {
  e.preventDefault();

  pageNumber = Number(button2.textContent);

  render(pageUl);
})
document.querySelector("button#button3").addEventListener("click",(e) => {
  e.preventDefault();

  pageNumber = Number(button3.textContent);

  render(pageUl);
})
document.querySelector("button#button4").addEventListener("click",(e) => {
  e.preventDefault();

  pageNumber = Number(button4.textContent);

  render(pageUl);
})
document.querySelector("button#button5").addEventListener("click",(e) => {
  e.preventDefault();

  pageNumber = Number(button5.textContent);

  render(pageUl);
})
document.querySelector("button#backButton").addEventListener("click",(e) => {
  e.preventDefault();
  contentAll = agoraStatesDiscussions.length;
  if(pageNumber >= Math.ceil(contentAll/10)){
    pageNumber = Math.ceil(contentAll/10)
  }
  else{
    pageNumber++;
  }

  render(pageUl);
})
document.querySelector("button#endButton").addEventListener("click",(e) => {
  e.preventDefault();
  contentAll = agoraStatesDiscussions.length;
  pageNumber = Math.ceil(contentAll/10);

  render(pageUl);
})