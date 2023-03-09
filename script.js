// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
// 댭변 상태에 따라 아이콘 사용
const ANSWERED_MARK = "☑︎";
const UNANSERED_MARK = "◻︎";
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");  //이미지 묶음
  avatarWrapper.className = "discussion__avatar--wrapper";
 
  const avatarImg = document.createElement("img");  //이미지

  avatarImg.src = obj.avatarUrl;  //data.js와 연동
  avatarImg.alt = "avatar of" + obj.author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");  //컨텐츠 박스
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h2"); //컨텐츠 제목
  discussionTitle.className = "discussion__title";

  const discussionUrl = document.createElement("a");  //링크 연결
  discussionUrl.href = obj.url;   //data.js와 연동
  discussionUrl.textContent = obj.title;

  discussionTitle.append(discussionUrl);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = obj.createdAt;
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInformation);

  const discussionAnswered = document.createElement("div"); //질문 체크
  discussionAnswered.className = "discussion__answered";

  const discussionIcon = document.createElement("p"); //질문 체크
  discussionIcon.textContent = "☑";
  discussionAnswered.append(discussionIcon);

  const discussionPreview = document.createElement("button"); //미리보기
  discussionPreview.className = "discussion__preview";
  discussionPreview.textContent = "미리 보기";

  li.append(avatarWrapper, discussionContent, discussionAnswered,discussionPreview);  //질문 체크 o,x
  if (obj.answer === null) {
    discussionIcon.textContent = UNANSERED_MARK;
  } else {
    discussionIcon.textContent = ANSWERED_MARK;
  }
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