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

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  const avatarImage = document.createElement("div");
  avatarImage.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImage); //avatar wrapper에 image div 추가 ((유저명을 여기 쓸지 고민))

  const discussionTitle = document.createElement("div");
  discussionTitle.className = "discussion__title";
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionContent.append(discussionTitle, discussionInformation); //discussionContent에 제목, 저자명, 시간 div 추가

//디스커션에 대답이 달린 것을 어떻게 표현할지? 


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
