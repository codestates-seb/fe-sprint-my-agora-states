// DESC: 로컬스토리지에 새로 등록된 질문이 있을 경우 기존 배열의 앞에 포함시킴
const newAsk = localStorage.getItem('newStory');

if (newAsk) {
  const newAskArr = JSON.parse(newAsk);
  for (let ask of newAskArr) {
    agoraStatesDiscussions.unshift(ask);
  }
}

// 페이지네이션

let discussions = agoraStatesDiscussions.slice(0, 6);
const totalContents = agoraStatesDiscussions.length;
const limit = 6;
const pages = Math.ceil(totalContents / limit);
const pagesArr = Array.from({ length: pages }, (v, i) => i + 1);
let page = 1;
let startIndex = (page - 1) * limit;

const main = document.querySelector('main');
const pagenationSection = document.createElement('section');
pagenationSection.className = 'pagenation';
const before = document.createElement('span');
before.textContent = '〈';
const after = document.createElement('span');
after.textContent = '〉';

const makeButtons = (element) => {
  for (let page of pagesArr) {
    const pageButton = document.createElement('button');
    pageButton.textContent = page;
    pageButton.id = 'page';
    element.append(pageButton);
  }
  return;
};

main.append(pagenationSection);
makeButtons(pagenationSection);
pagenationSection.prepend(before);
pagenationSection.append(after);

const pagenationClickEvent = pagenationSection.addEventListener('click', (e) => {
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.lastChild);
  }
  if (e.target.nodeName === 'BUTTON') {
    page = Number(e.target.textContent);
  } else if (e.target.nodeName === 'SPAN') {
    e.target.textContent === '〈' ? page !== 1 && --page : page !== pagesArr.length && ++page;
  }

  startIndex = (page - 1) * limit;
  discussions = agoraStatesDiscussions.slice(startIndex, startIndex + limit);
  render(ul);
});

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';

  const discussionTitle = document.createElement('div');
  discussionTitle.className = 'discussion__title';

  const h2 = document.createElement('h2');

  const discussionAnswered = document.createElement('span');
  discussionAnswered.className = 'discussion__answered';
  discussionAnswered.textContent = obj.answer ? '✅ 답변 완료' : '🆘 진행중';

  const titleA = document.createElement('a');
  // DESC: 새로 작성된 질문은 URL이 없으므로 제목 클릭시 a 태그의 이동 이벤트 방지
  titleA.href = obj.url ?? 'javascript:void(0)';
  titleA.textContent = obj.title;

  const contents = document.createElement('p');
  contents.className = 'discussion__detail';
  contents.innerHTML = obj.bodyHTML.replaceAll('\n', '<br>');

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';

  const avatar = document.createElement('img');
  avatar.className = 'discussion__avatar--image';
  avatar.src = obj.avatarUrl;
  avatar.alt = `avatar of ${obj.author}`;

  const discussionInfor = document.createElement('div');
  discussionInfor.className = 'discussion__information';

  const nickname = document.createElement('span');
  nickname.textContent = obj.author;
  const createDate = document.createElement('span');
  createDate.textContent = dateConverter(obj.createdAt);

  li.append(discussionContent);
  discussionContent.append(discussionTitle, avatarWrapper);
  // DESC: 기존 배열과 새로 작성된 데이터를 id의 type으로 구분하여 본문 렌더링 여부 결정
  typeof obj.id === 'number' && discussionContent.append(contents);
  discussionTitle.append(h2, discussionAnswered);
  h2.append(titleA);
  avatarWrapper.append(avatar, discussionInfor);
  discussionInfor.append(nickname, createDate);

  obj.answer ? discussionAnswered.classList.add('done') : discussionAnswered.classList.add('ongoing');

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < discussions.length; i++) {
    element.append(convertToDiscussion(discussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);

// DESC: 질문 작성하기 버튼 클릭시 form 토글
const writeButton = document.querySelector('#write');
const form = document.querySelector('.form__input--wrapper');

writeButton.addEventListener('click', () => {
  form.classList.toggle('hide');
});

// DESC: 질문 등록
const writeForm = document.querySelector('.form');
const userName = document.querySelector('#name');
const title = document.querySelector('#title');
const story = document.querySelector('#story');

const writeFunc = (e) => {
  e.preventDefault();

  const newStory = {
    id: Math.random(),
    avatarUrl: 'https://t1.kakaocdn.net/together_image/common/avatar/avatar.png',
    author: userName.value,
    title: title.value,
    createdAt: new Date(),
    answer: null,
    bodyHTML: story.value,
    url: null,
  };

  // DESC: 새로고침 해도 질문이 남아있도록 하기
  appendToStorage('newStory', newStory);

  ul.prepend(convertToDiscussion(newStory));
  userName.value = '';
  title.value = '';
  story.value = '';
  form.classList.toggle('hide');
  alert('질문 등록이 완료되었습니다!');
};

writeForm.addEventListener('submit', writeFunc);
