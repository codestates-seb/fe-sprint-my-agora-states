// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  
  // 이미지에 들어갈 div 생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  // 이미지 생성
    const avatarImg = document.createElement("img");
    avatarImg.src = obj.avatarUrl; // 이미지 URL 지정
    avatarImg.alt = "avatar of " + obj.author;
    avatarWrapper.append(avatarImg);


  // 제목, 이름, 시간 들어갈 div 생성
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  // 제목 생성
  const discussionTitle = document.createElement("a");
  discussionTitle.href = obj.url;
  discussionTitle.textContent = obj.title;
  
  // 이름, 시간 생성
  const discussionInformation = document.createElement("div"); 
  discussionInformation.textContent = obj.author + " / " + obj.createdAt;
  

  // 제목, 이름, 시간 출력
  discussionContent.append(discussionTitle, discussionInformation);


  // 체크표시 들어갈 div 생성
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 체크 생성
  const checkBox = document.createElement("p");
  checkBox.textContent = "☑";
  discussionAnswered.append(checkBox);

  // li 전체 출력
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

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, agoraStatesDiscussions);

