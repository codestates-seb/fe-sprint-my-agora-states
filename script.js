// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
let data = localStorage.getItem("agoraStatesDiscussions");
let page = data.slice();
console.log(page)
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
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
/*
// agoraStatesDiscussions 배열 중 1개 페이지의 데이터를 화면에 렌더링하는 함수입니다.
const render = (pageUl, firstContent, contentLimit) => { //element를 넣으면
  if(firstContent<=0){
    firstContent = 1;
  }
  else{
    firstContent = (pageNumber*10)-9;
  }
  123124124125-
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) { //질문 갯수만큼
    pageUl.append(convertToDiscussion(agoraStatesDiscussions[i])); //
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container"); // 변수 ul은 ul박스
render(ul);

// submit한 내용들을 배열 형태로 agoraStatesDiscussions에 추가
document.querySelector("form").addEventListener("submit",(e) => {
  e.preventDefault();

  while(ul.firstChild){
    ul.removeChild(ul.firstChild);
  } 

  const resultSubmit = {
    author: document.querySelector("input#name").value,
    title: document.querySelector("input#title").value,
    createdAt: new Date(),
    bodyHTML: document.querySelector("textarea#story").value,
    answer: null,
    avatarUrl: 'https://www.shutterstock.com/image-vector/cute-cat-logo-symbol-design-260nw-2225970013.jpg'
  }

  agoraStatesDiscussions.unshift(resultSubmit);

  render(ul);
})

// 페이지네이션
// ul
// const buttonBox = document.querySelector("div#buttonBox");

// const allContent = agoraStatesDiscussions.length;
// const showContent = 10;
// const showButton = 5;
// const maxPage = Math.ceil(allContent/showContent);
// let page = 1;
