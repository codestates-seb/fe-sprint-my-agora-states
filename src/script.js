// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

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
  // 프로필사진 넣기
  const avatarImag = document.createElement('img');
  avatarImag.className = 'discussion__avatar--image';
  avatarImag.src = obj.avatarUrl;
  avatarImag.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImag);

  // content에 내용 넣기
  // h2생성
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  //h2안의 a링크 생성, 내용 넣기
  const discussionTitleLink = document.createElement('a');
  discussionTitleLink.innerText = obj.title;
  discussionTitleLink.href = obj.url;
  // 타이틀 인포 생성 후 내용 넣기
  const discussionInform = document.createElement('div');
  discussionInform.className = 'discussion__information';
  discussionInform.innerText = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  // a태그 h2에 넣기
  discussionTitle.append(discussionTitleLink);
  //엔서에들어갈 p 태그 생성
  let discussionAnsweredIcon = document.createElement('p');
  discussionAnsweredIcon.innerText = obj.answer ? '🤓' : '😵';
  // 앤서에 체크 or 엑스 넣기
  discussionAnswered.append(discussionAnsweredIcon);
  //콘텐츠에 모든 내용 넣기
  discussionContent.append(discussionTitle, discussionInform);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// input 받는값을 submit했을때 새로운 li 생성
const submitForm = document.querySelector('.form__container > form');
const inputName = document.querySelector('.form__input--name > input');
const inputTitle = document.querySelector('.form__input--title > input');
const inputQuestion = document.querySelector('.form__textbox > textarea');

//form 객체에 eventListener 만들어주기
submitForm.addEventListener('submit', submitMyQeustion);

// eventListener에 사용할 함수 만들기
function submitMyQeustion(event) {
  event.preventDefault();

  let inputObj = {
    id: '123456789',
    createdAt: new Date(),
    title: inputTitle.value,
    url: null,
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl:
      'https://cdn.pixabay.com/photo/2018/07/22/20/02/horse-3555391_960_720.jpg',
  };

  agoraStatesDiscussions.unshift(inputObj);

  ul.prepend(convertToDiscussion(inputObj));

  inputName.value = '';
  inputTitle.value = '';
  inputQuestion.value = '';

  makedObj.push(JSON.stringify(inputObj));
  saveMyQuestions();
}

// 페이지네이션 구현하기
//총 페이지 갯수 계산하기
let totalPages = Math.ceil(agoraStatesDiscussions.lenght / 10);

// 디스커션 유지 기능
let makedObj = [];
function saveMyQuestions() {
  localStorage.setItem('questions', makedObj);
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);
