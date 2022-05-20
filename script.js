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

  //객체에 담긴 정보 가져오기
  // 아바타 이미지 가져오기
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl
    ? obj.avatarUrl
    : 'https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4';
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 디스커션 콘텐츠 (title, 작성시간) 가져오기
  const discussionTitle = document.createElement('h2');
  const discussionAnchor = document.createElement('a');
  discussionAnchor.href = obj.url;
  discussionAnchor.textContent = obj.title;
  discussionTitle.classList.add('discussion__title');
  discussionTitle.append(discussionAnchor);
  discussionContent.append(discussionTitle);

  // 디스커션 콘텐츠 (작성자 정보) 가져오기
  const discussionInfo = document.createElement('div');
  discussionInfo.classList.add('discussion__information');
  discussionInfo.textContent = `${obj.author}/ ${obj.createdAt}`;
  discussionContent.append(discussionInfo);

  // 답변 등록 정보 가져오기
  const discussionAnswerChecked = document.createElement('p');
  discussionAnswerChecked.textContent = obj.answer ? '☑' : '☒'; //조건문 ? :
  discussionAnswered.append(discussionAnswerChecked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  element.innerHTML = ''; // discord
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);

//입력값 디스커션 추가 기능
const formSubmit = document.querySelector('.form');

// //list 화면에 보여주기(append)
// function showList(value1, value2, value3) {
//   console.log(value1, value2, value3);
// }

//input 입력값 저장
function onFormSumbit(event) {
  event.preventDefault(); //submit으로 페이지 새로고침되는 기본동작 막기
  const inputName = document.querySelector('#name').value;
  const inputTitle = document.querySelector('#title').value;
  const inputQuestion = document.querySelector('#story').value;

  const currentTime = new Date();
  const hours = ('0' + currentTime.getHours()).slice(-2);
  const minutes = ('0' + currentTime.getMinutes()).slice(-2);
  const seconds = ('0' + currentTime.getSeconds()).slice(-2);

  const timeString = `오전 ${hours}:${minutes}:${seconds}`;

  agoraStatesDiscussions.unshift({
    title: inputTitle,
    author: inputName,
    createdAt: timeString,
    bodyHTML: `${inputQuestion}`,
  });
  console.log(agoraStatesDiscussions);
  render(ul);
}

//submit 이벤트리스터
formSubmit.addEventListener('submit', onFormSumbit);
