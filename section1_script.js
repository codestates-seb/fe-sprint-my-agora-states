// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

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

  // Img
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl ? obj.avatarUrl : './webare.png';  // 이미지 경로가 없을 경우에는 기본 이미지로 
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  
  // Title
  const discussionTitle = document.createElement('h4');
  discussionTitle.className = 'discussion__title';
  const discussionA = document.createElement('a');
  discussionA.href = obj.url;
  discussionA.textContent = obj.title;
  discussionTitle.append(discussionA);
  
  // 작성한 사람 정보
  const discussionInform = document.createElement('div');
  discussionInform.className = 'discussion__information';
  discussionInform.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString('ko-kr')}`;
  
  discussionContent.append(discussionTitle, discussionInform);

  // answer 확인
  const discussionAnswer = document.createElement('p');
  obj.answer !== null ? discussionAnswer.textContent = '♥' : discussionAnswer.textContent = '♡';
  discussionAnswered.append(discussionAnswer);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// localStorage 함수
const renderlocalStorage = (element) => {
  const objLocalData = JSON.parse(localStorage.getItem('agoraDatas'));
  if (objLocalData) {
    for (let i = 0; i < objLocalData.length; i++) {
      element.prepend(convertToDiscussion(objLocalData[i]));
    }
  }
  return;
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
renderlocalStorage(ul);


// Form 데이터 삽입
const formInput = document.querySelector('.form');
const formNameInput = document.querySelector('#name');
const formTitleInput = document.querySelector('#title')
const formQuestionInput = document.querySelector('#story');

formInput.addEventListener('submit', (event) => {
  event.preventDefault();  // 기본 브라우저 기본 동작인 새로고침이 되는 현상 방지

  const newObj = {
    id: "D_kwDOHOApLM4APjJim",
    createdAt: new Date().toISOString(),
    title: formTitleInput.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: formNameInput.value,
    answer: null,
    bodyHTML: formQuestionInput.value,
    avatarUrl: null
  }

  // window.localStorage.clear();
  let objData = [];
  if (localStorage.length > 0) {
    let bjLocalData = JSON.parse(localStorage.getItem('agoraDatas'));
    for (let i = 0; i < bjLocalData.length; i++) {
      objData.push(bjLocalData[i]);
    }
  }
  objData.push(newObj);
  localStorage.setItem('agoraDatas', JSON.stringify(objData));

  agoraStatesDiscussions.unshift(newObj);  
  ul.prepend(convertToDiscussion(newObj));

  formInput.reset(); 
  // 2. ul에 있는 거 다 지우고 새롭게 렌더링하는 방법
  // while (ul.firstChild) { // ul에 있는거 다지우고 새롭게 렌더링
  //   ul.removeChild(ul.firstChild);
  // }
  // render(ul);
})