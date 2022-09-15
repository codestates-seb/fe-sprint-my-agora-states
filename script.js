// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
//답변 상태에 따라 체크 아이콘 표시하기
const ANSWERED_MARK = "☑︎";
const UNANSERED_MARK = "◻︎";

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  //프로필 사진 커버 DOM 생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement("img");

  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarImg.className = "discussion__avatar--image";

  avatarWrapper.append(avatarImg);
 //디스커션 컴포넌트 DOM 생성
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
//컴포넌트 title을 data.js에서 가져오기
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionUrl = document.createElement("a");

  //질문 클릭시 깃헙 페이지로 넘어가게 한다.
  discussionUrl.href = obj.url;

  discussionUrl.textContent = obj.title;

  discussionTitle.append(discussionUrl);
//data.js에서 시간 가져오기
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
//질문 시간 브라우저 화면에 보여주기
  let questionDate = new Date(obj.createdAt).toLocaleString()

  discussionInformation.textContent = obj.createdAt;
  //질문자 닉네임 화면에 보이게 하기
  discussionInformation.textContent = `${obj.author} / ${questionDate}`;

  //디스커션 콘텐트안으로 제목과 현지시간 넣기
  discussionContent.append(discussionTitle,discussionInformation);

//답변 체크 부분 DOM 생성
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionIcon = document.createElement("p");
  discussionIcon.textContent = "☑";
  //답변이 없으면 체크표시가 비어있도록 해주는 조건문
  if (obj.answer === null) {
    discussionIcon.textContent = UNANSERED_MARK;
  } else {
    discussionIcon.textContent = ANSWERED_MARK;
  }
  discussionAnswered.append(discussionIcon);

  //답변보기 버튼 화면에 렌더링하기
  const discussionAnswerButton = document.createElement("button");
  discussionAnswerButton.classList = "discussion__answer__button";
  discussionAnswerButton.textContent = "답변 보기";
//li안으로 프로필, 질문 제목과 현지시간, 답변부분 넣어주기
  li.append(avatarWrapper, discussionContent, discussionAnswered,discussionAnswerButton);

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