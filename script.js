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

  // 1. 아바타 프로필사진 img 요소 추가
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 2. Discussion 컨텐츠
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const discussionTitleLink = document.createElement('a');
  discussionTitleLink.setAttribute('href', obj.url);
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink);

  // 3. 작성정보
  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionTitle, discussionInfo);

  // 4. 우측 체크
  const isAnswered = document.createElement('p');
  isAnswered.textContent = obj.answer ? '✅' : '🤔';
  discussionAnswered.append(isAnswered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// ------------------- form -------------------
const form = document.querySelector('form.form');
const inputName = document.querySelector('.form__input--name > input');
const inputTitle = document.querySelector('.form__input--title > input');
const inputQuestion = document.querySelector('.form__textbox > textarea');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // 아바타 이미지 랜덤 출력
  const images = [
    'img_01.jpeg',
    'img_02.jpeg',
    'img_03.png',
    'img_04.png',
    'img_05.jpeg',
    'img_06.jpeg',
    'img_07.jpeg',
    'img_08.jpeg',
    'img_09.jpeg',
    'img_10.jpeg',
  ];
  const randomImg = images[Math.floor(Math.random() * images.length)];
  const randomAvatarImg = document.createElement('img');
  randomAvatarImg.className = 'discussion__avatar--image';
  randomAvatarImg.src = `img/${randomImg}`;

  const obj = {
    id: '000',
    createdAt: new Date(),
    title: inputTitle.value,
    url: 'https://github.com/codestates-seb/agora-states-fe/discussions/45',
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl: randomAvatarImg.src,
  };

  // 입력 받은 form을 기존 discussions 데이터의 맨 앞에 추가
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  // form 초기화
  inputName.value = '';
  inputTitle.value = '';
  inputQuestion.value = '';
});

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

// -------------------- 페이지네이션 --------------------
const paginationNumber = document.querySelector('#pagination');
const discussionList = document.querySelectorAll('.discussion__container');

const paginationLimit = 10; // 한 페이지에서 보일 디스커션 갯수
let paginationCount = Math.ceil(agoraStatesDiscussions.length / paginationLimit); // 총 페이지 갯수

let currentPage; // 현재 페이지

// 페이지 버튼 추가
const makePageNumButtons = (index) => {
  const pageNumButton = document.createElement('button');
  pageNumButton.className = 'page-num';
  pageNumButton.textContent = index;

  paginationNumber.appendChild(pageNumButton);
};

// 페이지 버튼 그룹 생성
const makePageGroup = () => {
  let lastPageNum = paginationNumber.lastElementChild;
  while (lastPageNum) {
    paginationNumber.removeChild(lastPageNum);
    lastPageNum = paginationNumber.lastElementChild;
  }
  for (let i = 1; i <= paginationCount; i++) {
    makePageNumButtons(i);
  }

  // 페이지 버튼 누를 때마다 페이지 전환
  document.querySelectorAll('.page-num').forEach((button) => {
    const pageIndex = button.textContent;
    if (pageIndex === '1') {
      button.classList.add('active');
    }

    if (pageIndex) {
      button.addEventListener('click', () => {
        setCurrentPage(pageIndex);
        let buttons = paginationNumber.children;
        for (button of buttons) {
          button.classList.remove('active');
        }
        buttons[pageIndex - 1].classList.add('active');
      });
    }
  });
};

// window가 load 되면 페이지 그룹 생성, 1페이지부터 보이게 시작
window.addEventListener('load', () => {
  makePageGroup();
  setCurrentPage(1);
});

// 한 페이지에서 디스커션이 10개만 보이도록 계산
const setCurrentPage = (paginationNumber) => {
  // 전체 디스커션 갯수, 전체 페이지 갯수, 페이지 그룹의 마지막 페이지를 다시 계산
  currentPage = paginationNumber;
  const prevRange = (paginationNumber - 1) * paginationLimit;
  const currentRange = paginationNumber * paginationLimit;

  discussionList.forEach((item, index) => {
    item.classList.add('hide');
    if (index >= prevRange && index < currentRange) {
      item.classList.remove('hide');
    }
  });
};
