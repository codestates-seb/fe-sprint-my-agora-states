const ul = document.querySelector('ul.discussions__container');
const btnSubmit = document.querySelector('.form__submit');
const form = document.querySelector('.form');
const btns = document.querySelector('.btn__page--wrapper');

let data;
const dataFromLocalStorage = localStorage.getItem('agoraStatesDiscussions');
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage);
} else {
  data = agoraStatesDiscussions.slice();
}

//페이지네이션
const numOfContent = agoraStatesDiscussions.length;
const maxContent = 8;
const maxButton = 5;
const maxPage = Math.ceil(numOfContent / maxContent);
let page = 1;

// 페이지 이동 함수
const goPrevPage = () => {
  page -= maxButton;
  render(page);
};

const goNextPage = () => {
  page += maxButton;
  render(page);
};

// prev 버튼 생성
const prev = document.createElement('button');
prev.classList.add('btn', 'prev');
prev.textContent = '< 이전';
prev.addEventListener('click', goPrevPage);

const next = document.createElement('button');
next.classList.add('btn', 'next');
next.textContent = '다음 >';
next.addEventListener('click', goNextPage);

// 데이터 => DOM 생성 함수
const convertToDiscussion = obj => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  // avatar 생성
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);

  // 콘텐츠 영역 
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
  discussionTime.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  // discussion content 부모 요소에 해당 내용 append
  discussionContent.append(discussionTime, discussionTitle);

  // discussion__answered
  const descussionCheckbox = document.createElement('p');
  // title에 [notice]가 붙지 않은 경우에만 답변 여부 표시
  if (!obj.title.includes('[notice]')) {
    descussionCheckbox.textContent = obj.answer !== null ? '✓' : '✖︎';
  }
  discussionAnswered.append(descussionCheckbox);

  // discussion 컴포넌트 append
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 버튼 생성 함수
const makeButton = id => {
  const btn = document.createElement('button');
  btn.className = 'btn__page--btn';
  btn.dataset.num = id;
  btn.textContent = id;
  btn.addEventListener('click', e => {
    
    Array.prototype.forEach.call(btns.children, btn => {
      if (btn.dataset.num) btn.classList.remove('active');
    });
    e.target.classList.add('active');
    // 페이지 번호를 넣어 렌더 함수 호출
    renderContent(ul, parseInt(e.target.dataset.num));
  });
  return btn;
};

// 데이터 렌더링 함수
const renderContent = (element, page) => {
  // 글 목록 초기화
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }

  for (let i = (page - 1) * maxContent; i < page * maxContent && i <= numOfContent; i++) {

    if (data[i]) {
      element.append(convertToDiscussion(data[i]));
    }
  }
  return;
};

// 버튼 렌더링 함수
const renderButton = page => {
  // 버튼 목록 초기화
  while (btns.hasChildNodes()) {
    btns.removeChild(btns.lastChild);
  }

  // 현재 페이지부터 최대 페이지까지 번호를 매겨 버튼을 생성
  for (let i = page; i < page + maxButton && i <= maxPage; i++) {
    btns.append(makeButton(i));
  }

  // 첫 버튼 활성화
  btns.children[0].classList.add('active');

  // 페이지 이동 버튼 앞 뒤로 추가
  btns.prepend(prev);
  btns.append(next);

  if (page <= maxButton) btns.removeChild(prev);
  // 현재 페이지가 max 페이지 갯수보다는 작으면서
  if (maxPage - page < page && page <= maxPage) btns.removeChild(next);
};

// 컨텐츠, 버튼 렌더링 실행 함수
function render(page) {
  renderContent(ul, page);
  renderButton(page);
}

// 사용자 입력 데이터 저장 후 렌더
const makeInputToQuestion = function (e) {
  e.preventDefault();
  const userName = document.querySelector('#name').value;
  const userTitle = document.querySelector('#title').value;
  const userQuestion = document.querySelector('#story');
  const date = new Date();
  const obj = {
    id: 'unique id',
    createdAt: date,
    title: userTitle,
    url: 'https://github.com/codestates-seb/agora-states-fe/discussions',
    author: userName,
    answer: null,
    bodyHTML: null,
    avatarUrl: 'https://lh3.googleusercontent.com/a-/AFdZucpSPHlMgNuNOQUqhzdWeMA4yWl4vexd730dVTXllQ=s96-c-rg-br100',
  };

  data.unshift(obj);
  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(data));
  render(page);
};

form.addEventListener('submit', makeInputToQuestion);
render(page);