const convertToDiscussion = (obj) => {
  

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");        // 아바타 박스
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement('img');              // 아바타 이미지
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");    // 제목과 저자, 날짜 박스
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h2")          // 제목
  discussionTitle.className = "discussion__title"
  discussionContent.append(discussionTitle)

  const titleLink = document.createElement("a")                 // 제목 링크
  titleLink.setAttribute("href", obj.url) 
  titleLink.setAttribute("target", "_blank")
  titleLink.textContent = obj.title
  discussionTitle.append(titleLink)
  

  const discussionInfo = document.createElement("div")          // 저자, 날짜
  discussionInfo.className = "discussion__information"
  discussionInfo.textContent = obj.author + " / " + obj.createdAt
  discussionContent.append(discussionInfo)

  const discussionAnswered = document.createElement("div");   // 대답 여부 박스
  discussionAnswered.className = "discussion__answered";
  discussionAnswered.textContent = "☑"
 
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

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
render(ul);
