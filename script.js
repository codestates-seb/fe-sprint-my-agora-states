// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);

// local storage data 확인
let localStorageObj = localStorage.getItem('obj');
if (localStorageObj) {
  localStorageObj = JSON.parse(localStorage.getItem('obj'));
} else {
  localStorageObj = agoraStatesDiscussions.slice();
}
localStorage.setItem('obj', JSON.stringify(localStorageObj));

// 총 페이지 수
let allPagingNum = Math.ceil(localStorageObj.length / 10);
// 현재 페이지
let nowPage = 1;

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
  const btnPrev = document.createElement('button');
  btnPrev.textContent = '<';
  btnPrev.type = 'button';
  btnPrev.className = 'btn_nav btn_prev';

  const btnNext = document.createElement('button');
  btnNext.textContent = '>';
  btnNext.type = 'button';
  btnNext.className = 'btn_nav btn_next';

  discussionPaging.append(btnPrev);
  for (let i = 0; i < allPagingNum; i += 1) {
    discussionPaging.append(convertToPaging(i + 1));
  }
  discussionPaging.append(btnNext);
  return;
};
renderPaging(allPagingNum);

// local storage 삭제
const btnClStorage = document.querySelector('.clear_local_storage');
btnClStorage.addEventListener('click', function () {
  localStorage.removeItem('obj');
  localStorageObj = agoraStatesDiscussions.slice();
  ul.textContent = '';
  const itemStartNum = 0;
  render(ul, itemStartNum);

  allPagingNum = Math.ceil(localStorageObj.length / 10);
  discussionPaging.textContent = '';
  renderPaging(allPagingNum);
});

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul, 0);

const agoForm = document.querySelector('.form');
const agoName = document.querySelector('#name');
const agoTitle = document.querySelector('#title');
const agoStory = document.querySelector('#story');
let agoCreatedAt = '';
let agoCreatedAtValue = '';

agoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  agoCreatedAt = new Date();
  agoCreatedAtValue = `${agoCreatedAt.getFullYear()}-${agoCreatedAt.getMonth()}-${agoCreatedAt.getDate()}T${agoCreatedAt.getHours()}:${agoCreatedAt.getMinutes()}:${agoCreatedAt.getSeconds()}Z`;
  //2022-05-16T01:02:17Z

  const objItem = {
    id: '',
    createdAt: agoCreatedAtValue,
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
  nowPage = 1;
});

let arrBtnNav = document.querySelectorAll('.btn_nav');

const onClickNav = (e) => {
  let itemStartNum = e.target.textContent * 10 - 10;
  ul.textContent = '';
  render(ul, itemStartNum);
  e.target.classList.add('on');
  nowPage = +e.target.textContent;
};

const onClickPrev = (arrBtnNav, nowPageNum) => {
  let itemStartNum = nowPageNum * 10 - 20;
  ul.textContent = '';
  render(ul, itemStartNum);
  console.log(arrBtnNav[nowPageNum]);
  arrBtnNav.forEach((btnNav) => {
    btnNav.classList.remove('on');
  });
  nowPage = nowPageNum - 1;
  arrBtnNav[nowPage].classList.add('on');
};

const onClickNext = (arrBtnNav, nowPageNum) => {
  let itemStartNum = nowPageNum * 10;
  ul.textContent = '';
  render(ul, itemStartNum);
  console.log(arrBtnNav[nowPageNum]);
  arrBtnNav.forEach((btnNav) => {
    btnNav.classList.remove('on');
  });
  nowPage = nowPageNum + 1;
  arrBtnNav[nowPage].classList.add('on');
};

document.addEventListener('click', function (e) {
  arrBtnNav = document.querySelectorAll('.btn_nav');
  if (e.target && e.target.className === 'btn_nav') {
    arrBtnNav.forEach((btnNav) => {
      btnNav.classList.remove('on');
    });
    onClickNav(e);
  }

  if (e.target && e.target.className === 'btn_nav btn_prev') {
    if (nowPage !== 1) {
      onClickPrev(arrBtnNav, nowPage);
    }
  }

  if (e.target && e.target.className === 'btn_nav btn_next') {
    console.log(nowPage);
    if (nowPage < arrBtnNav.length - 2) {
      onClickNext(arrBtnNav, nowPage);
    }
  }
});
