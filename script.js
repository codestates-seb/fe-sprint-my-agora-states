// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatarImg = document.createElement('img'); //img 요소 생성
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;

  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2'); //h2 요소 만들기
  discussionTitle.className = 'discussion__title'; //클래스 이름 지정
  discussionTitle.textContent = obj.title; //text 삽입
  discussionContent.append(discussionTitle); //discussionContent에 추가

  //const discussionUrl = document.createAttribute('a'); //'a'요소 만들기

  const discussionAnswer = document.createElement('div'); //div 요소 만들기
  discussionAnswer.className = 'discussion__answered'; //클래스 이름 지정
  if (obj.answer !== null) {
    discussionAnswer.textContent = '☑'; //만약 답변이 있으면 체크표시
  }
  discussionAnswered.append(discussionAnswer); //discussionAnsered에 추가*/

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  //element는 ul
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);
