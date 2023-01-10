// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  // 이미지 래퍼
  const avatarWrapper = document.createElement("div"); 
  avatarWrapper.className = "discussion__avatar--wrapper";
  // 컨탠츠 내용
  const discussionContent = document.createElement("div"); 
  discussionContent.className = "discussion__content";
  // 체크 박스
  const discussionAnswered = document.createElement("div"); 
  discussionAnswered.className = "discussion__answered";
  
  // 이미지
  const avatarImg = document.createElement('img'); 
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);
  // 제목
  const contentTitle = document.createElement('h2'); 
  contentTitle.className = 'discussion__title';
  discussionContent.append(contentTitle);
  // 링크
  const contentLink = document.createElement('a')
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  contentTitle.append(contentLink);
  // 정보
  const contentInfo = document.createElement('p');
  contentInfo.className = 'discussion__info';
  contentInfo.textContent = obj.author + ' / ' + obj.createdAt;
  discussionContent.append(contentInfo);
  // 체크박스
  const contentAnswered = document.createElement('p');
  contentAnswered.className = 'discussion__answered'
  discussionAnswered.append(contentAnswered)
  if(obj.answer !== null){
    contentAnswered.textContent = '✅';
  } else {
    contentAnswered.textContent = '❌';
  }
  
  li.append(avatarWrapper, discussionContent, discussionAnswered); // 자식요소로 추가
  
  //배열의 모든 요소 화면에 출력
  const ul = document.querySelector('ul.discussions__container');
  ul.append(li);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, i) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// discussion 추가 
const form = document.querySelector('.form__container')

