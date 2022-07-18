// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // div요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper"; // 클래스 이름 지정
  const discussionContent = document.createElement("div"); // div요소 생성
  discussionContent.className = "discussion__content"; // 클래스 이름 지정
  const discussionAnswered = document.createElement("div"); // div요소 생성
  discussionAnswered.className = "discussion__answered"; // 클래스 이름 지정

  /* 아바타 생성 구간 */
  const avatarlogo = document.createElement('img'); // 아바타 이미지 요소 생성
  avatarlogo.className = "discussion__avatar--image"; // 클래스 이름 지정
  avatarlogo.src = obj.avatarUrl; // 아바타 주소 넣어주기
  avatarlogo.alt = obj.author; // 이미지 정보는 이름으로 대체
  avatarWrapper.append(avatarlogo); // avatarWrapper에 아바타 이미지 요소 생성한 엘리먼트 넣어주기 

  /* 콘텐츠 생성 구간 */
  const contentH2 = document.createElement('h2'); // H2 요소 생성
  contentH2.className = "discussion__title"; // H2 클래스 이름 지정

  const contentA = document.createElement('a'); // a 요소 생성
  contentA.href = obj.url; // a 요소의 링크 지정
  contentA.textContent = obj.title; // a 요소의 텍스트 지정
  contentH2.append(contentA); // 지정한 a 요소를 H2 요소에 집어넣음

  const contentInfo = document.createElement('div'); // div 요소 생성
  contentInfo.className = "discussion__information"; // div 클래스 이름 지정
  contentInfo.textContent = obj.author + ' / ' + obj.createdAt; // div의 텍스트는 객체의 author + / + createdAt 3개 포함
  discussionContent.append(contentH2, contentInfo); // 생성된 H2요소와 div요소를 discussionContent에 집어넣음

  /* 체크포인트 생성 구간 */
  const answerCheck = document.createElement('p'); // p 요소 생성
  answerCheck.textContent = obj.answer ? "☑︎" : "◻︎"; // 조건문 obj.answer 두고 참일때 체크있는박스, 거짓일때 체크없는박스
  discussionAnswered.append(answerCheck) // discussionAnswered 요소 안에 answerCheck 요소 추가

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
