// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

//디스커션 로컬 스토리지에 저장

const btnAddDiscusstion = document.querySelector('.form__submit input'); //submit 가져옴
btnAddDiscusstion.addEventListener('click', (e) => {
  e.preventDefault();

  const userName = document.querySelector('#username');
  const newTitle = document.getElementById('title');
  const newStory = document.getElementById('story');

  agoraStatesDiscussions.unshift({
    id: 'D_kwDOHOApLM4APjJi',
    createdAt: new Date(),
    title: newTitle.value,
    url: 'https://github.com/codestates-seb/agora-states-fe/discussions/45',
    author: userName.value,
    answer: null,
    bodyHTML: newStory.value,
    avatarUrl: 'https://avatars.githubusercontent.com/u/79903256?s=64&v=4',
  });
  localStorage.setItem(
    'agoraStatesDiscussions',
    JSON.stringify(agoraStatesDiscussions)
  );

  const ul = document.querySelector('ul.discussions__container');
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.firstChild);
  }
  render(ul);

  //input clear
  userName.value = '';
  newTitle.value = '';
  newStory.value = '';
});

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
  //li 1번
  const avatarImg = document.createElement('img'); //img 요소 생성
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  //li 2번
  const discussionTitle = document.createElement('h2'); //h2 요소 만들기
  discussionTitle.className = 'discussion__title'; //클래스 이름 지정

  const discussionUrl = document.createElement('a'); //'a'요소 만들기
  discussionUrl.href = obj.url;
  discussionUrl.textContent = obj.title; //text 삽입
  discussionTitle.append(discussionUrl); //h2의 자식 요소로 추가

  discussionContent.append(discussionTitle); //discussionContent에 추가

  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = obj.author + ' / ' + obj.createdAt;
  discussionContent.append(discussionInfo);

  //li 3번
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
  //여기서 element는 ul
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');

render(ul);
