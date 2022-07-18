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

  const avatarImg = document.createElement('img'); // 사진 요소 생성
  avatarImg.src = obj.avatarUrl; // img태그의 src속성 초기화
  avatarImg.alt = 'avatar of ' + obj.author; // img태그의 alt속성 초기화
  avatarWrapper.append(avatarImg); // avatarWrapper요소안에 img요소 추가
  
  const discussionTitle = document.createElement('h2'); // 질문내용 h2 요소 생성
  discussionTitle.className = 'discussion__title'; //h2요소 class 이름 초기화
  const titleUrl = document.createElement('a'); // titleUrl요소 a태그로 생성
  titleUrl.href = obj.url; // agoraStatesDiscussions의 객체 url속성값 초기화
  titleUrl.textContent = obj.title; // titleUrl에 텍스트 초기화
  discussionTitle.append(titleUrl); //discussionTitle안에 titleUrl 요소 추가
  
  const discussionInformation = document.createElement('div'); //정보 div 요소 생성
  discussionInformation.className = 'discussion__information'; //discussionInformation요소 class 이름 초기화
  discussionInformation.textContent =  obj.author +' / '+ obj.createdAt; // discussionInformation요소 값 초기화
  discussionContent.append( discussionTitle, discussionInformation); // discussion_content 요소안에 h2, div요소 추가
  
  const answeredCheckBox = document.createElement('p'); // answered 여부 확인 표시 요소 생성
  if(!obj.answer){ // 객체의 answer값 확인으로 구분
    answeredCheckBox.textContent = '☒';
  }
  else{
    answeredCheckBox.textContent = '☑';
  }
  discussionAnswered.append(answeredCheckBox);// discussionAnswered div요소안에 answeredCheckBox p요소 추가


  li.append(avatarWrapper, discussionContent, discussionAnswered); //li에 div요소 붙임
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
