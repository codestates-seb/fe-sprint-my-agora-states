// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

const ul = document.querySelector('ul.discussions__container');
const btnSubmit = document.querySelector('.form__submit');

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = obj => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  /////* avatar 생성 후 넣기 */////
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);

  /////* discussion content 내용 생성 */////
  // discussion 제목 생성
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  // discussion url 생성
  const discussionUrl = document.createElement('a');
  discussionUrl.href = obj.url;
  discussionUrl.textContent = obj.title;
  discussionTitle.append(discussionUrl);
  // discussion 작성 시간 생성
  const discussionTime = document.createElement('div');
  discussionTime.className = 'discussion__information';
  discussionTime.textContent = `${obj.author} / ${obj.createdAt}`;
  // discussion content 부모 요소에 해당 내용 append
  discussionContent.append(discussionTime, discussionTitle);

  /////* discussion__answered 생성 */////
  const descussionCheckbox = document.createElement('p');
  // title에 [notice]가 붙지 않은 경우에만 답변 여부 표시
  if (!obj.title.includes('[notice]')) {
    descussionCheckbox.textContent = obj.answer !== null ? '✔️' : '❌';
  }
  discussionAnswered.append(descussionCheckbox);

  // discussion 컴포넌트 append
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = element => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// 사용자 입력 데이터 저장
const makeInputToQuestion = function (e) {
  e.preventDefault();
  const userName = document.querySelector('#name').value;
  const userTitle = document.querySelector('#title').value;
  const userQuestion = document.querySelector('#story');
  const date = new Date();

  const obj = {
    avatarUrl: 'https://lh3.googleusercontent.com/a-/AFdZucpSPHlMgNuNOQUqhzdWeMA4yWl4vexd730dVTXllQ=s96-c-rg-br100',
    author: userName,
    url: 'https://github.com/codestates-seb/agora-states-fe/discussions',
    title: userTitle,
    createdAt: `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`,
  };

  // 리스트의 상단에 만들어진 li를 붙인다.
  let li = convertToDiscussion(obj);
  ul.prepend(li);

  // data배열에 새롭게 생성한 obj를 추가한다.
  agoraStatesDiscussions.unshift(obj);
};

btnSubmit.addEventListener('click', makeInputToQuestion);

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render(ul);
