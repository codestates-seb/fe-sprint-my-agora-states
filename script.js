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
  /* 1. 아바타 이미지 구현 */
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  /* 2. discussionContent 정보 구현 */

  // 2-1. discussionTitle 구현
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const discussionAtag = document.createElement('a')
  discussionAtag.href = obj.url;
  discussionAtag.textContent = obj.title;
  discussionTitle.append(discussionAtag);

  // 2-2. discussionInformation 구현
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;

  // 2-3. discussionContent에 하위 요소들 append
  discussionContent.append(discussionTitle, discussionInformation);

  /* 3. discussionAnswerd 정보 구현 */
  const disAnsChecking = document.createElement('p');
  // disAnsChecking.textContent = '☑'
  if (obj.answer === null){
    disAnsChecking.textContent = '☒';
  }
  else{
    disAnsChecking.textContent = '☑';
  }
  discussionAnswered.append(disAnsChecking);

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


//TODO: form에 작성된 요소를 display에 추가
// const formsubmit =  document.querySelector('.form')
// formsubmit.addEventListener('submit', function(event)) {
//   console.log(event);
// }