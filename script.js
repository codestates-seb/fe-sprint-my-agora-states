// agoraStatesDiscussions의 내용이 discussion에 보이게 함
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

//페이지네이션 변수 선언
const pagenation = document.querySelector('#pagenation');
const totalData = agoraStatesDiscussions.length;
const rows = 5;
const pagePerData = 7;
const totalPage = Math.ceil(totalData / pagePerData);
let firstData = 0;
let lastData = firstData + pagePerData;

//페이지네이션
function fnPrintPage() {
  for (i = 0; i < totalPage; i++) {
    let pageNum = document.createElement('div');
    pageNum.classList.add('pageNum');
    pageNum.textContent = i + 1;
    pagenation.append(pageNum);
  }
}
fnPrintPage();

const elPageNum = document.querySelectorAll('.pageNum');
console.log(elPageNum);

elPageNum[2].addEventListener('click', (event) => {
  const li = document.querySelectorAll('.discussion__container');
  for (let j = 0; j < li.length; j++) {
    ul.removeChild(ul.firstChild);
  }
  event.preventDefault();
  firstData = (Number(event.target.textContent) - 1) * pagePerData;
  lastData = Number(event.target.textContent) * pagePerData;
  console.log(firstData);
  console.log(lastData);
  console.log(ul);
  render(ul);
});

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';
  li.append(avatarWrapper, discussionContent, discussionAnswered);

  //image
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //discussion__content
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  discussionContent.append(discussionTitle);

  const discussionTitleLink = document.createElement('a');
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink);

  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';

  let hour = new Date(obj.createdAt).getHours();
  const min = new Date(obj.createdAt).getMinutes();
  const sec = new Date(obj.createdAt).getSeconds();
  let amPm = '';
  if (Number(hour) <= 12) {
    amPm = '오전';
  } else {
    amPm = '오후';
    hour = hour - 12;
  }

  discussionInformation.textContent = `${obj.author} / ${amPm} ${hour}:${min}:${sec}`;
  discussionContent.append(discussionInformation);

  const discussionAnsweredCheck = document.createElement('p');
  if (obj.answer === null) {
    discussionAnsweredCheck.textContent = '🔴';
  } else {
    discussionAnsweredCheck.textContent = '🟢';
  }

  discussionAnswered.append(discussionAnsweredCheck);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

//여기
//페이지테이션 데이터 렌더링
const render = (element) => {
  for (let i = firstData; i < lastData; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);

// 질문 추가 기능
const form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); //안넣으면 새로고침

  const formInputName = document.querySelector('#name');
  const formInputTitle = document.querySelector('#title');

  let newDiscussion = {
    id: 'id',
    createdAt: new Date(),
    title: formInputTitle.value,
    url: 'https://github.com/codestates-seb/agora-states-fe/discussions/45',
    author: formInputName.value,
    avatarUrl:
      'https://item.kakaocdn.net/do/da00ff39e703c5948ac951fed6ec9f127154249a3890514a43687a85e6b6cc82',
  };

  agoraStatesDiscussions.unshift(newDiscussion);
  ul.prepend(convertToDiscussion(newDiscussion)); //새로운 데이터를 돔으로 만들어줌 => ul의 맨 앞의 자식으로 삽입
});

// const listItems = agoraStatesDiscussions;
// const listElement = document.querySelector('.discussion__wrapper');
// const pagenationElement = document.querySelector('#pagenation');

// let currentPage = 1;
// let rows = 5;

// function displayList(items, wrapper, rowsPerPage, page) {
//   // wrapper.textContent = '';
//   page--;

//   let start = rowsPerPage * page;
//   let end = start + rowsPerPage;
//   let pagenatedItems = items.slice(start, end);

//   for (i = start; i < pagenatedItems.length + 1; i++) {
//     let item = pagenatedItems[i];
//     console.log(item);
//   }
// }

// displayList(agoraStatesDiscussions, listElement, rows, 3);
