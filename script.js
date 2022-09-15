

// // convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// const convertToDiscussion = (obj) => {
//   const li = document.createElement("li"); // li 요소 생성
//   li.className = "discussion__container"; // 클래스 이름 지정

//   const avatarWrapper = document.createElement("div");
//   avatarWrapper.className = "discussion__avatar--wrapper";
//   const discussionContent = document.createElement("div");
//   discussionContent.className = "discussion__content";
//   const discussionAnswered = document.createElement("div");
//   discussionAnswered.className = "discussion__answered";

//   // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.



//   li.append(avatarWrapper, discussionContent, discussionAnswered);
//   return li;
// };

// // agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
// render(ul);





////////////////////
// 필요한 DOM 요소
const ul = document.querySelector('ul.discussions__container');
const btnSubmit = document.querySelector('.form__submit');
const form = document.querySelector('.form');
const btns = document.querySelector('.btn__page--wrapper');

// 로컬 스토리지의 데이터 불러오는 과정
// 1. 데이터를 담을 변수를 선언한다.
// 2. 로컬 스토리지에서 'agora...'를 키 값으로 하는 데이터를 불러온다.
// 3. 만약 데이터가 존재할 경우 data 변수안에 파싱하여 저장
// 4. 없다면 더미데이터를 slice 하여 저장.
// data에 배열 > 객체들 형태로 담기게 된다. (더미데이터와 동일하게 생겼음)
let data;
const dataFromLocalStorage = localStorage.getItem('agoraStatesDiscussions');
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage);
} else {
  data = agoraStatesDiscussions.slice();
}

/////////////////////////////////////////////////////////////////////
//페이지네이션

// 페이지네이션 구현에 필요한 데이터
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

/////////////////////////////////////////////////////////////////////
// DATA => DOM 생성 함수

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
  discussionTime.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  // discussion content 부모 요소에 해당 내용 append
  discussionContent.append(discussionTime, discussionTitle);

  /////* discussion__answered 생성 */////
  const descussionCheckbox = document.createElement('p');
  // title에 [notice]가 붙지 않은 경우에만 답변 여부 표시
  if (!obj.title.includes('[notice]')) {
    descussionCheckbox.textContent = obj.answer !== null ? '✅' : '❎';
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
    // 특정 버튼을 클릭하면 활성화, 다른 버튼은 비활성화 ***
    // btns.children이 유사 배열이기 때문에 forEach를 사용하기 위해 다른 방법을 썼다.
    Array.prototype.forEach.call(btns.children, btn => {
      if (btn.dataset.num) btn.classList.remove('active');
    });
    e.target.classList.add('active');
    // 페이지 번호를 넣어 렌더 함수 호출
    renderContent(ul, parseInt(e.target.dataset.num));
  });
  return btn;
};

/////////////////////////////////////////////////////////////////////
// DOM => 화면 렌더링 함수

// 데이터 렌더링 함수
const renderContent = (element, page) => {
  // 글 목록 초기화
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }

  // 현재 페이지부터 표시될 최대 컨텐츠까지 반복하여 리스트 생성 함수 실행 후 컨텐츠 표시
  // ... 직전 페이지로부터 넘어온 현재 i값을 한 페이지의 최대 컨텐츠 그리고 전체 컨텐츠 이내의 범위에서 증감시키며, 배열의 i번째 요소로 DOM 생성함수를 호출하여 element(ul)에 추가.
  for (let i = (page - 1) * maxContent; i < page * maxContent && i <= numOfContent; i++) {
    // 로컬 스토리지에 저장된 data[i]가 존재하는 경우,
    // data[i]에 대하여 DOM 생성함수를 실행한 뒤 화면에 렌더링한다.
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

  // 페이지 이동 버튼 필요 여부 확인
  // 현재 페이지가 최대 버튼 갯수보다 같거나 작으면 prev가 없어도 됨.
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
  // data배열에 새롭게 생성한 obj를 추가한다.
  data.unshift(obj);

  // 로컬 스토리지에 obj 가 추가된 data 배열을 새롭게 추가한다.
  // 'agora...'를 키로 한 전체 data 배열이 저장된다.
  // 렌더링 할 때 for문으로 하나씩 꺼내서 렌더링 하는 것임.
  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(data));

  // 리스트의 상단에 만들어진 li를 붙인다.
  render(page);
};

// form 이벤트 리스너
form.addEventListener('submit', makeInputToQuestion);

// 첫 실행 시 화면에 데이터 표시
render(page);