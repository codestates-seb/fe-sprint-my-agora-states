'use strict';
//처음에 바로 저장.
localStorage.setItem('lists', JSON.stringify(agoraStatesDiscussions));
//로컬에서 가져오기 //takedata[i]는 객체 takedata는 배열
const existingLists = JSON.parse(localStorage.getItem('lists'));
let newLists =
  JSON.parse(localStorage.getItem('newlist')) !== null
    ? JSON.parse(localStorage.getItem('newlist'))
    : [];
//로컬에 새로운 리스트 저장하는 함수
const storeData = obj => {
  localStorage.setItem('newlist', JSON.stringify(obj));
};

const makeEl = el => {
  return document.createElement(el);
};
const getEl = el => {
  return document.querySelector(el);
};

//데이터를 DOM으로 바꿔
const convertToDiscussion = obj => {
  const li = makeEl('li'); //li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = makeEl('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = makeEl('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = makeEl('div');
  discussionAnswered.className = 'discussion__answered';

  const avatarImg = makeEl('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = makeEl('h2');
  const titleAnchor = makeEl('a');
  discussionTitle.className = 'discussion__title';
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  const discussionInformation = makeEl('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  discussionContent.append(discussionTitle, discussionInformation);

  const checked = makeEl('p');
  checked.innerHTML = obj.answer
    ? '<i class="fa-solid fa-check"></i>'
    : '<i class="fa-solid fa-x"></i>';
  discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//모든 데이터를 화면에 렌더링하는 함수
const render = (element, listArray) => {
  for (let i = 0; i < listArray.length; i += 1) {
    element.append(convertToDiscussion(listArray[i]));
  }
  return;
};

// ul 요소에 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');

//pagination
const pagination = (num, page = 1) => {
  let allList = [...newLists, ...existingLists];
  ul.innerHTML = '';
  render(ul, allList.slice((page - 1) * num, page * num));
};
pagination(10, 1);

const pageUl = document.querySelector('.pageUl');
const pagePrev = document.querySelector('.btnPrev');
const pageNext = document.querySelector('.btnNext');
const pageNums = document.querySelectorAll('.number');

let currentPage = 1;
pageUl.addEventListener('click', e => {
  let key = e.target;
  if (key === pageUl) return;
  if (key === pagePrev) {
    if (currentPage === 1) return;
    else {
      --currentPage;
      pagination(10, currentPage);
    }
  } else if (key === pageNext) {
    if (currentPage === 5) return;
    else {
      ++currentPage;
      pagination(10, currentPage);
    }
  } else {
    currentPage = Number(key.textContent);
    pagination(10, currentPage);
  }
});

// 이전 다음으로

//새로운 질문 등록
const inputName = getEl('.input__name');
const inputTitle = getEl('.input__title');
const inputQuestion = getEl('.text__question');
const submitBtn = getEl('.form__submit');

//초기화
const resetInput = () => {
  inputName.value = '';
  inputTitle.value = '';
  inputQuestion.value = '';
};

//제출하기.
let newlist = [];
const submitEl = function (e) {
  if (inputName.value === '' || inputTitle.value === '' || inputQuestion === '')
    return;
  ul.innerHTML = '';
  e.preventDefault();

  let newObj = {};
  let currentDay = new Date();
  newObj.id = 'D_kwDOHOApLM4APXTN';
  newObj.createdAt = `${currentDay}`;
  newObj.title = inputTitle.value;
  newObj.url = `https://github.com/codestates-seb/agora-states-fe/discussions/2`;
  newObj.author = inputName.value;
  newObj.answer = null;
  newObj.bodyHTML =
    '<h1 dir="auto">Question Template</h1>\n<h3 dir="auto">제목은 질문의 맥락을 파악할 수 있게 작성해주세요. 아래의 예시를 참고해주세요.</h3>\n<blockquote>\n<p dir="auto">토이 18번 문제가 이해가 잘 안됩니다. (X)<br>\n토이 18_getItemFromTwoSortedArrays 레퍼런스에서 O(logK)로직의 조건문들이 이해가 잘 되지 않습니다.(O)</p>\n</blockquote>\n<p dir="auto">--------------- 여기서부터 복사하세요 ---------------</p>\n<ul dir="auto">\n<li>\n<p dir="auto">운영 체제: 예) macOS, Ubuntu</p>\n</li>\n<li>\n<p dir="auto">Node.js 버전(<code class="notranslate">node -v</code>): 예)v14.16.0</p>\n</li>\n<li>\n<p dir="auto">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?</p>\n</li>\n<li>\n<p dir="auto">어떠한 부분에서 이해가 안 되었나요?</p>\n</li>\n<li>\n<p dir="auto">에러 코드를 붙여넣기 해 주세요.</p>\n</li>\n<li>\n<p dir="auto">에러가 출력된 곳에서, 이유라고 생각하는 부분을 열 줄 이내로 붙여넣기 해 주세요. (잘 모르겠으면 에러라고 생각하는 곳을 넣어주세요)<br>\n```jsx<br>\n//여기에 작성해 주세요<br>\n```</p>\n</li>\n<li>\n<p dir="auto">검색했던 링크가 있다면 첨부해 주세요.</p>\n</li>\n</ul>\n<hr>\n<h2 dir="auto">saved reply 사용법</h2>\n<blockquote>\n<p dir="auto">잠깐! saved reply란?<br>\n원하는 문구를 저장해서 간단하게 꺼내 쓸 수 있는 github discussions만의 기능입니다.<br>\n매번 질문 템플릿을 복사하지 말고, 저장한 뒤에 꺼내서 쓰세요!</p>\n</blockquote>\n<ol dir="auto">\n<li>Discussions에서 newdiscussion 버튼을 클릭합니다.</li>\n</ol>\n<p><a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/59815596/113290773-0fa1b780-932d-11eb-81fe-f031408bfc9f.png"><img width="1071" alt="스크린샷 2021-04-01 오후 8 57 36" src="https://user-images.githubusercontent.com/59815596/113290773-0fa1b780-932d-11eb-81fe-f031408bfc9f.png" style="max-width: 100%;"></a></p>\n<ol start="2" dir="auto">\n<li>에디터의 맨 오른쪽 "꺾인 화살표" 모양을 클릭합니다.</li>\n</ol>\n<p><a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/59815596/113253588-6349dc00-9300-11eb-9065-d483b86cd773.png"><img width="735" alt="1" src="https://user-images.githubusercontent.com/59815596/113253588-6349dc00-9300-11eb-9065-d483b86cd773.png" style="max-width: 100%;"></a></p>\n<ol start="3" dir="auto">\n<li>이러한 창이 나오게 됩니다.</li>\n</ol>\n<p><a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/59815596/113253613-6ba21700-9300-11eb-8e93-59cf45121822.png"><img width="1021" alt="2" src="https://user-images.githubusercontent.com/59815596/113253613-6ba21700-9300-11eb-8e93-59cf45121822.png" style="max-width: 100%;"></a></p>\n<ol start="4" dir="auto">\n<li>제목(본인이 구분하기에 편한 이름)을 작성하고, 위에 있는 템플릿을 복사하여 내용에 붙여넣은 뒤, Add saved reply 버튼을 클릭하면 템플릿이 저장됩니다.</li>\n</ol>\n<p><a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/59815596/113253654-7eb4e700-9300-11eb-90ff-8d1bc1a1f5cf.png"><img width="775" alt="3" src="https://user-images.githubusercontent.com/59815596/113253654-7eb4e700-9300-11eb-90ff-8d1bc1a1f5cf.png" style="max-width: 100%;"></a></p>\n<ol start="5" dir="auto">\n<li>사용하실 때, 에디터의 맨 오른쪽 "꺾인 화살표" 모양을 클릭하면 저장해 두었던 템플릿이 나옵니다. 클릭해서 사용하시면 됩니다.</li>\n</ol>\n<p><a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/59815596/113253666-85435e80-9300-11eb-9224-736a8625c84c.png"><img width="718" alt="4" src="https://user-images.githubusercontent.com/59815596/113253666-85435e80-9300-11eb-9224-736a8625c84c.png" style="max-width: 100%;"></a></p>\n<ol start="6" dir="auto">\n<li>완성</li>\n</ol>\n<p><a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/59815596/113253681-8c6a6c80-9300-11eb-9409-b299de50aea3.png"><img width="720" alt="5" src="https://user-images.githubusercontent.com/59815596/113253681-8c6a6c80-9300-11eb-9409-b299de50aea3.png" style="max-width: 100%;"></a></p>';
  newObj.avatarUrl =
    'https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4';
  // convertToDiscussion(newObj)

  //객체 배열에 저장.
  agoraStatesDiscussions.unshift(newObj);
  newlist.unshift(newObj);

  //newlist 키에 로컬에 저장.
  localStorage.setItem('newlist', JSON.stringify(newlist));
  newLists = JSON.parse(localStorage.getItem('newlist'));
  //처음화면으로 돌아감.
  pagination(5, 1);
  resetInput();
  return newLists;
};
submitBtn.addEventListener('click', submitEl);
