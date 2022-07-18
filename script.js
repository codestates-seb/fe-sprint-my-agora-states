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

  // 이미지
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = agoraStatesDiscussions[0].avatarUrl;
  avatarImg.alt = "avatar of " + agoraStatesDiscussions[0].author;
  avatarWrapper.append(avatarImg);

  // 콘텐츠 내용
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionInsideTitle = document.createElement("p");
  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionContent.append(discussionTitle);
  discussionTitle.append(titleLink);
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionInformation);

  // 그 옆에 아이콘 하여튼 그
  // div 만들고
  // 만든 div에 클래스 이름으로 "discussion__answered" 넣어주고
  // p만들고
  // p의 innerHTML에 ☑ 넣어주고
  // div에 p를 append 해주고
  // div는 discussionAnswered에 append해주고

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
