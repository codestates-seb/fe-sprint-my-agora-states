// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //1. 프로필 사진
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author; //이미지를 넣을때 이미지가 보이지 않는 것을 설명하기 위해 넣는다
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  //2. 디스커션 컴포넌트
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  //컴포넌트 title을 data.js에서 가져오기
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionUrl = document.createElement("a");
  discussionUrl.textContent = obj.title;
  //질문 클릭시 깃헙 페이지로 넘어가게 한다.
  discussionUrl.href = obj.url;
  discussionTitle.append(discussionUrl);

  //2-2. 정보 가져오기
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  //현지시간과 아바타 닉네임 보여주기
  const questionDate = new Date(obj.createdAt).toLocaleString();
  discussionInformation.textContent = `${obj.author} / ${questionDate}`;
  discussionContent.append(discussionTitle, discussionInformation);

  //3. 체크박스 영역
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionIcon = document.createElement("p");
  discussionAnswered.append(discussionIcon);
  //답변 유무에 따라 체크박스가 다르게 표시되도록 하는 조건문
  if (obj.answer === null) {
    discussionIcon.textContent = "◻︎";
  } else {
    discussionIcon.textContent = "☑︎";
  }

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
