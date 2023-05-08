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

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avatarImg);

  const titleH2 = document.createElement("h2");
  titleH2.className = "discussion__title";
  discussionContent.append(titleH2);

  const titleA = document.createElement("a");
  titleA.href = obj.url;
  titleA.target = "contentBox";
  titleA.textContent = obj.title;
  titleH2.append(titleA);
  
  const authorDiv = document.createElement("div");
  authorDiv.className = "discussion__information";
  authorDiv.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(authorDiv);
  
  if(obj.answer === null){
    discussionAnswered.textContent = `🖤`;
  }
  else{
    discussionAnswered.textContent = `💗`;
  }

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => { //element를 넣으면
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) { //질문 갯수만큼
    element.append(convertToDiscussion(agoraStatesDiscussions[i])); //
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
const buttonBox = document.querySelector("div#buttonBox");

const allContent = agoraStatesDiscussions.length;
const showContent = 10;
const showButton = 5;
const maxPage = Math.ceil(allContent/showContent);
let page = 1;
