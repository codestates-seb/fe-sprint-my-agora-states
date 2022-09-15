// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);

localStorage.setItem('obj', JSON.stringify(agoraStatesDiscussions));

let localStorageObj = JSON.parse(localStorage.getItem('obj'));
console.log(localStorageObj);

let allPagingNum = Math.ceil(localStorageObj.length / 10);

console.log(allPagingNum);

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

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  const avataImage = document.createElement('img');
  avataImage.src = obj.avatarUrl;
  avataImage.alt = 'avatar of ' + obj.author;
  avataImage.className = 'discussion__avatar--image';
  avatarWrapper.append(avataImage);

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const discussionTitleLink = document.createElement('a');
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;
  discussionTitleLink.target = '_blank';
  discussionTitle.append(discussionTitleLink);

  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionTitle, discussionInformation);

  const discussionAnsweredCheck = document.createElement('span');

  if (obj.answer !== null) {
    discussionAnsweredCheck.textContent = '✔';
    discussionAnsweredCheck.className = 'discussion__done';
  } else {
    discussionAnsweredCheck.textContent = 'X';
    discussionAnsweredCheck.className = 'discussion__open';
  }
  discussionAnswered.append(discussionAnsweredCheck);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, itemStartNum) => {
  itemStartNum = itemStartNum ? itemStartNum : 0;
  let itemLastNum = itemStartNum + 10;
  if (itemLastNum > localStorageObj.length) {
    itemLastNum = localStorageObj.length;
  }

  for (let i = itemStartNum; i < itemLastNum; i += 1) {
    element.append(convertToDiscussion(localStorageObj[i]));
  }
  return;
};

const discussionPaging = document.querySelector('.discussion__paging');
const convertToPaging = (pagingNum) => {
  const btnPaging = document.createElement('button');
  btnPaging.textContent = pagingNum;
  btnPaging.type = 'button';
  btnPaging.className = 'btn_nav';
  if (pagingNum === 1) {
    btnPaging.classList.add('on');
  }
  return btnPaging;
};
const renderPaging = (allPagingNum) => {
  for (let i = 0; i < allPagingNum; i += 1) {
    discussionPaging.append(convertToPaging(i + 1));
  }
  return;
};
renderPaging(allPagingNum);

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul, 0);

const agoForm = document.querySelector('.form');
const agoName = document.querySelector('#name');
const agoTitle = document.querySelector('#title');
const agoStory = document.querySelector('#story');
let agoCreatedAt = '';

agoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  agoCreatedAt = new Date();

  const objItem = {
    id: '',
    createdAt: agoCreatedAt,
    title: agoTitle.value,
    url: '',
    author: agoName.value,
    answer: null,
    bodyHTML: `<div>${agoStory.value}</div>`,
    avatarUrl:
      'https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4',
  };

  localStorageObj.unshift(objItem);
  localStorage.setItem('obj', JSON.stringify(localStorageObj));
  console.log(localStorageObj);

  agoName.value = '';
  agoTitle.value = '';
  agoStory.value = '';
  agoCreatedAt = '';

  console.log(123);
  ul.textContent = '';
  render(ul, 0);

  allPagingNum = Math.ceil(localStorageObj.length / 10);
  discussionPaging.textContent = '';
  renderPaging(allPagingNum);
});

let ArrBtnNav = document.querySelectorAll('.btn_nav');

const onClickNav = (e) => {
  let itemStartNum = e.target.textContent * 10 - 10;
  console.log(itemStartNum);
  ul.textContent = '';
  render(ul, itemStartNum);
  e.target.classList.add('on');
};

document.addEventListener('click', function (e) {
  console.log(e.target.className);
  ArrBtnNav = document.querySelectorAll('.btn_nav');
  if (e.target && e.target.className === 'btn_nav') {
    ArrBtnNav.forEach((btnNav) => {
      btnNav.classList.remove('on');
    });
    onClickNav(e);
  }
});
