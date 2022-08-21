// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions[1].author);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // <avatarWrapper> 부분
  const avatarWrapper = document.createElement("div"); // div 요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper";  // 클래스 이름 지정

  const avatarImg = document.createElement('img'); // img 요소 생성
  avatarImg.className = "discussion__avatar--image"; // img 요소의 클래스 이름 지정 (빼먹어서 문제 발생!)
  avatarImg.src = obj.avatarUrl; // img 요소의 속성 추가  ?? setAttribute 안쓰고?
  avatarImg.alt = 'avatar of' + obj.author;

  avatarWrapper.append(avatarImg);      // 한번에 여러개의 자식 요소를 추가할 때는 appendChild 대신 append

  // console.log(avatarWrapper); // 확인용 [문제해결] 위에서 클래스 이름 생성을 안해줘서 css 적용이 계속 안됐음 ㅠ

  // <discussionContent> 부분
  const discussionContent = document.createElement("div"); // div 요소 생성
    discussionContent.className = "discussion__content";  // 클래스 이름 지정

  const discussionContentTitle = document.createElement("h2"); // h2 요소 생성
    discussionContentTitle.className = "discussion__title" // 클래스 이름 지정

  const discussionContentTitleAnchor = document.createElement("a"); // a 요소 생성
    discussionContentTitleAnchor.href = obj.url; // a 요소 속성 href 추가
    discussionContentTitleAnchor.textContent = obj.title;  // a 요소 내용 추가

  discussionContentTitle.appendChild(discussionContentTitleAnchor); // h2 태그 안에 생성한 a 요소 넣기

  const dicussionContentInformation = document.createElement("div"); // div 요소 생성
    dicussionContentInformation.className = "discussion__information";  // 클래스 이름 지정
    dicussionContentInformation.textContent = obj.author + " / " + obj.createdAt; // div 요소 내용 작성자, 작성시간 추가

  discussionContent.appendChild(discussionContentTitle, dicussionContentInformation);

  // console.log(discussionContent);  // 확인용

  // <discussionAnswered> 부분
  const discussionAnswered = document.createElement("div");  // div 요소 생성

  const discussionAnsweredContent = document.createElement("p"); // p 요소 생성
  discussionAnsweredContent.className = "discussion__answered" // 클래스 이름 지정

  console.log(discussionAnsweredContent);

    discussionAnswered.append(discussionAnsweredContent); // div 안에 생성한 p 요소 삽입

    const isAnswerNull = (answer) => answer === null ? "☒" : "☑"; // answer 가 null인 경우와 아닌 경우 판별 함수
    discussionAnswered.textContent = isAnswerNull(obj.answer); // answer 데이터 판별 결과를 내용에 넣기

  

  // 작성한 div 요소 3부분 append
    discussionContent.append(discussionContentTitle, dicussionContentInformation, discussionAnswered);



  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;

};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// for of 를 이용한 방식 적용 해보기
// 배열 요소의 각각인 el 에 convertToDiscussion 함수를 적용해서 append 해줘
const render = (element) => {
  for (let el of agoraStatesDiscussions) {
    element.append(convertToDiscussion(el));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
