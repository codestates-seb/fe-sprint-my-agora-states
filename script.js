// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// localhost에서 데이터를 가져와 기존 데이터에 더하는 과정
const localData = JSON.parse(localStorage.getItem('answer'));
let newData = []; // localStorage에 기존 데이터를 남기기 위한 변수
let newAgoraStatesDiscussions = []; // 현재 페이지에 표시하기 위한 변수
const start = () => {
  if (localData) {
    newAgoraStatesDiscussions = [...localData, ...agoraStatesDiscussions];
    newData = [...localData];
  } else {
    newAgoraStatesDiscussions = [...agoraStatesDiscussions];
  }
};

start();

// 모달 구현
const formBtn = document.querySelector('.addQ');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
formBtn.onclick = function () {
  modal.classList.remove('hidden');
  console.log('??');
};

close.onclick = function () {
  modal.classList.add('hidden');
};

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

  // 질문자 정보
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl
    ? obj.avatarUrl
    : 'https://cdn.pixabay.com/photo/2016/10/08/18/35/help-1724292_1280.png';
  avatarImg.alt = `${obj.author}의 이미지`;
  const name = document.createElement('p');
  name.className = 'discussion__avatar--name';
  name.innerText = obj.author;

  avatarWrapper.append(avatarImg, name);

  // 질문 정보

  // 타이틀
  const discussionTitle = document.createElement('h3');
  discussionTitle.className = 'discussion__title';
  discussionTitle.innerText = obj.title;

  // 내용
  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionInfo.classList.add('hidden');
  discussionInfo.innerText = obj.contents ? obj.contents : obj.title;

  if (obj.url) {
    const linkBox = document.createElement('div');
    linkBox.className = 'discussionLink';
    const discussionLink = document.createElement('a');
    discussionLink.href = obj.url;
    discussionLink.innerText = '- 링크로 이동하기';
    linkBox.append(discussionLink);
    discussionInfo.append(linkBox);
  }

  const discussionDate = document.createElement('p');
  discussionDate.className = 'discussion__date';
  discussionDate.innerText = new Date(obj.createdAt).toLocaleDateString();

  discussionInfo.append(discussionDate);

  discussionContent.append(discussionTitle, discussionInfo);

  li.onclick = function () {
    discussionInfo.classList.toggle('hidden');
    li.classList.toggle('clicked');
  };

  // 답변 유무
  discussionAnswered.innerHTML = obj.answer
    ? '<ion-icon name="checkbox"></ion-icon>'
    : '<ion-icon name="square-outline"></ion-icon>';

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < newAgoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(newAgoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);

// newData

const newForm = document.querySelector('.form');
const newName = document.querySelector('#name');
const newTitle = document.querySelector('#title');
const newStory = document.querySelector('#story');
const formSubmit = document.querySelector('.form__submit');

// localStorage

function saveAnswer() {
  localStorage.setItem('answer', JSON.stringify(newData)); // toDos를 string화해서 localStorage에 저장
}

newForm.onsubmit = function (event) {
  event.preventDefault();
  const newObj = {
    author: newName.value,
    createdAt: new Date().toLocaleDateString(),
    title: newTitle.value,
    contents: newStory.value,
  };
  newData.unshift(newObj);
  saveAnswer();
  ul.prepend(convertToDiscussion(newObj));

  newName.value = '';
  title.value = '';
  newStory.value = '';

  modal.classList.add('hidden');
};
