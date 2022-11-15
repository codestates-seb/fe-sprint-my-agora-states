// agoraStatesDiscussions의 내용이 discussion에 보이게 함
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//localStorage 설정

// <data를 DOM으로 바꿔주는 함수>
const convertToDiscussion = (obj) => {
  //li
  const li = document.createElement('li');
  li.className = 'discussion__container';

  //div1. discussion__avatar--wrapper
  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //div2. discussion__content
  //discussion__content-h2
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const discussionTitleLink = document.createElement('a');
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink);
  //discussion__content-div
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  discussionContent.append(discussionTitle, discussionInformation);

  //div3. discussion__answered
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';
  const discussionAnsweredCheck = document.createElement('p');
  obj.answer === null
    ? (discussionAnsweredCheck.textContent = '🔴')
    : (discussionAnsweredCheck.textContent = '🟢');
  discussionAnswered.append(discussionAnsweredCheck);

  //div 3개를 li에 연결
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// <submit 이벤트가 일어나면 게시글 추가되는 기능>
//번수 선언
const form = document.querySelector('.form');
const formInputName = document.querySelector('#name');
const formInputTitle = document.querySelector('#title');
const formInputStory = document.querySelector('#story');

form.addEventListener('submit', (event) => {
  //새로고침 방지
  event.preventDefault();

  const newDiscussion = {
    id: 'D_kwDOHOApLM4APjJi',
    createdAt: new Date(),
    title: formInputTitle.value,
    url: 'https://github.com/codestates-seb/agora-states-fe/discussions/45',
    author: formInputName.value,
    answer: null,
    bodyHTML: formInputStory.value,
    avatarUrl:
      'https://item.kakaocdn.net/do/da00ff39e703c5948ac951fed6ec9f127154249a3890514a43687a85e6b6cc82',
  };

  //새로운 데이터를 DOM으로 변환하는 함수 실행
  //ul 첫번째 자식으로 넣어줌
  ul.prepend(convertToDiscussion(newDiscussion));
  //데이터 배열에 추가
  agoraStatesDiscussions.unshift(newDiscussion);
  //배열 추가 후 리렌더링
  render();
  localStorage.setItem('data', JSON.stringify(agoraStatesDiscussions));
});

//<페이지네이션 기능>
//변수 선언
const elPagenation = document.querySelector('#pagenation');
const totalData = agoraStatesDiscussions.length;
const dataPerPage = 10;
const totalPage = Math.ceil(totalData / dataPerPage);
let firstData = 0;
let lastData = 9;

//페이지 번호 프린트하는 함수
const fnPrintPage = () => {
  for (i = 0; i < totalPage; i++) {
    const pageNum = document.createElement('div');
    pageNum.classList.add('pageNum');
    pageNum.textContent = i + 1;
    elPagenation.append(pageNum);
  }
};
fnPrintPage();

//페이지 번호를 누르면 렌더링할 배열 번호를 알아내는 기능
const page = document.querySelectorAll('.pageNum');
for (const prop of page) {
  prop.addEventListener('click', () => {
    firstData = (Number(prop.textContent) - 1) * dataPerPage;
    lastData = firstData + dataPerPage - 1;
    console.log(prop, firstData, lastData);
  });
}

//렌더링 함수
const ul = document.querySelector('ul.discussions__container');
function render() {
  //이전 ul 자식 제거
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  //새로운 ul 자식 추가
  for (let i = firstData; i <= lastData; i += 1) {
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
}

//페이지 로드 시 기본 렌더링
window.onload = render();

//페이지 번호를 클릭하면 렌더링 함수 실행
for (const prop2 of page) {
  prop2.addEventListener('click', render);
}
