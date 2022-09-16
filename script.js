// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => { //객체를 매개변수로 받음.
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 이미지
  const avatarImg =document.createElement("img") ;
  avatarImg.className = "discussion__avatar--image" ;
  avatarImg.src = obj.avatarUrl ;
  avatarImg.alt = 'avatar of ' + obj.author; 
  avatarWrapper.append(avatarImg) ;

  //타이틀
const title = document.createElement("h2") ;
title.className = "discussion__title" ;
discussionContent.append(title);

const titleLink = document.createElement("a") ;
titleLink.textContent = obj.title ;
titleLink.href = obj.url ;
title.append(titleLink) ; 

//인포메이션
const information = document.createElement("div") ; 
information.className = "discussion__information" ;
information.textContent = `${obj.author} | ${new Date(obj.createdAt).toLocaleString()}`;
discussionContent.append(information) ;

//답변 체크
const answer = document.createElement("p");
answer.textContent = obj.answer ? "☑︎" : "◻";
discussionAnswered.append(answer); 


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  //더미데이터의 길이만큼, 더미데이터 안에 있는 모든 요소를 탐색
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // i 번째 요소를 convertToDiscussion에 전달해서 결과를 낸 append
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

