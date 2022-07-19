// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // div 요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper";  // 클래스 이름 지정

  const discussionContent = document.createElement("div"); // div 요소 생성
    discussionContent.className = "discussion__content";  // 클래스 이름 지정
  const discussionContentTitle = document.createElement("h2"); // h2 요소 생성
    discussionContentTitle.className = "discussion__title" // 클래스 이름 지정
  const discussionContentTitleAnchor = document.createElement("a"); // a 요소 생성
    discussionContentTitleAnchor.href = agoraStatesDiscussions[0].url; // a 요소 속성 href 추가
    discussionContentTitleAnchor.textContent = agoraStatesDiscussions[0].title;  // a 요소 내용 추가

  const dicussionContentInformation = document.createElement("div"); // div 요소 생성
    dicussionContentInformation.className = "discussion__information";  // 클래스 이름 지정
    dicussionContentInformation.textContent = agoraStatesDiscussions[0].author + " / " + agoraStatesDiscussions[0].createdAt; // div 요소 내용 작성자, 작성시간 추가


  const discussionAnswered = document.createElement("div");  // div 요소 생성
    discussionAnswered.className = "discussion__answered";  // 클래스 이름 지정

    const isAnswerNull = (answer) => answer === null ? "☒" : "☑";
    discussionAnswered.textContent = isAnswerNull(agoraStatesDiscussions[0].answer);


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatarImg = document.createElement('img'); // img 요소 생성
    avatarImg.src = agoraStatesDiscussions[0].avatarUrl; // img 요소의 속성 추가  ?? setAttribute 안쓰고?
    avatarImg.alt = 'avatar of' + agoraStatesDiscussions[0].author;
    avatarWrapper.append(avatarImg);      // 한번에 여러개의 자식 요소를 추가할 때는 appendChild 대신 append



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
