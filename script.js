// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// localhost에서 데이터를 가져와 기존 데이터에 더하는 과정

const getData = () => {
  const URL = `http://localhost:4000/discussions`;
  const data = fetch(URL).then((res) => res.json());
  // .then((data) => data);
  console.log(data);
  return data;
};

const localData = JSON.parse(localStorage.getItem('answer'));

let newData = []; // localStorage에 기존 데이터를 남기기 위한 변수
let newAgoraStatesDiscussions = []; // 현재 페이지에 표시하기 위한 변수
const start = async () => {
  // console.log(getData());
  let agoraData = await getData();
  // console.log(agoraData);
  if (localData) {
    newAgoraStatesDiscussions = [...localData, ...agoraData];
    newData = [...localData];
  } else {
    newAgoraStatesDiscussions = [...agoraData];
  }
  render(ul, 0, limit);
};

start();

// 모달 구현
const formBtn = document.querySelector('.addQ');
const modal = document.querySelector('.modal');
const close = document.querySelector('.close');
formBtn.onclick = function () {
  modal.classList.remove('hidden');
  console.log('??');
};

close.onclick = function () {
  modal.classList.add('hidden');
};

// 페이지 네이션 기능 구현

let limit = 8,
  page = 1;

// let totalCount = newAgoraStatesDiscussions.length;
// const limit = 10;
// let currentPage = 1;
// let offset = (currentPage - 1) * limit;
// let totalPage = Math.ceil(totalCount / limit);

// const pageBtn = document.querySelector('.page');
// const preBtn = document.querySelector('.pre');
// const nextBtn = document.querySelector('.next');

// preBtn.disabled = true;

// preBtn.onclick = function () {
//   currentPage = currentPage - 1;
//   nextBtn.disabled = false;
//   if (currentPage === 1) {
//     preBtn.disabled = true;
//   } else {
//     preBtn.disabled = false;
//   }
// };

// nextBtn.onclick = function () {
//   currentPage = currentPage + 1;
//   preBtn.disabled = false;
//   if (currentPage === totalPage) {
//     nextBtn.disabled = true;
//   } else {
//     nextBtn.disabled = false;
//   }
// };

// const pagenation = (currentPage) => {
//   // const numBtn = document.createElement('button');
//   pageBtn.innerHTML = Array(totalPage)
//     .fill()
//     .map(
//       (_, i) =>
//         `<button
//         key=${i}
//         onclick=${() => (currentPage = i + 1)}
//         disabled=${currentPage === i + 1}
//       >
//         ${i + 1}
//       </button>`
//     );
// };

// pagenation(1);

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

  // 질문자 정보
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl
    ? obj.avatarUrl
    : 'https://cdn.pixabay.com/photo/2016/10/08/18/35/help-1724292_1280.png';
  avatarImg.alt = `${obj.author}의 이미지`;
  const name = document.createElement('p');
  name.className = 'discussion__avatar--name';
  name.innerText = obj.author;

  avatarWrapper.append(avatarImg, name);

  // 질문 정보

  // 타이틀
  const discussionTitle = document.createElement('h3');
  discussionTitle.className = 'discussion__title';
  discussionTitle.innerText = obj.title;

  // 내용
  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionInfo.classList.add('hidden');
  discussionInfo.innerText = obj.contents ? obj.contents : obj.title;

  if (obj.url) {
    const linkBox = document.createElement('div');
    linkBox.className = 'discussionLink';
    const discussionLink = document.createElement('a');
    discussionLink.href = obj.url;
    discussionLink.innerText = '- 링크로 이동하기';
    linkBox.append(discussionLink);
    discussionInfo.append(linkBox);
  }

  const discussionDate = document.createElement('p');
  discussionDate.className = 'discussion__date';
  discussionDate.innerText = new Date(obj.createdAt).toLocaleDateString();

  discussionInfo.append(discussionDate);

  discussionContent.append(discussionTitle, discussionInfo);

  li.onclick = function () {
    discussionInfo.classList.toggle('hidden');
    li.classList.toggle('clicked');
  };

  // 답변 유무
  discussionAnswered.innerHTML = obj.answer
    ? '<ion-icon name="checkbox"></ion-icon>'
    : '<ion-icon name="square-outline"></ion-icon>';

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   // newAgoraStatesDiscussions = newAgoraStatesDiscussions.slice(
//   //   offset,
//   //   offset + limit
//   // );
//   for (let i = 0; i < newAgoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(newAgoraStatesDiscussions[i]));
//   }
//   return;
// };

const render = (element, from, to) => {
  if (newAgoraStatesDiscussions.length === 0) {
    return;
  } else {
    if (!from && !to) {
      from = 0;
      to = newAgoraStatesDiscussions.length - 1;
    }
    // 다 지우고 배열에 있는 내용 다 보여주기
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    for (let i = from; i < to; i += 1) {
      element.append(convertToDiscussion(newAgoraStatesDiscussions[i]));
    }
    return;
  }
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
// render(ul);

render(ul, 0, limit);

const getPageStartEnd = (limit, page) => {
  const len = newAgoraStatesDiscussions.length - 1;
  let pageStart = Number(page - 1) * Number(limit);
  let pageEnd = Number(pageStart) + Number(limit);
  if (page <= 0) {
    pageStart = 0;
  }
  if (pageEnd >= len) {
    pageEnd = len;
  }
  return { pageStart, pageEnd };
};

const preBtn = document.querySelector('.pre');
const nextBtn = document.querySelector('.next');

preBtn.addEventListener('click', () => {
  if (page > 1) {
    page = page - 1;
  }
  nextBtn.disabled = false;
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
  if (page === 1) {
    preBtn.disabled = true;
  }
});

nextBtn.addEventListener('click', () => {
  if (limit * page < newAgoraStatesDiscussions.length - 1) {
    page = page + 1;
  }
  preBtn.disabled = false;
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
  if (limit * page >= newAgoraStatesDiscussions.length - 1) {
    nextBtn.disabled = true;
  }
});

// newData

const newForm = document.querySelector('.form');
const newName = document.querySelector('#name');
const newTitle = document.querySelector('#title');
const newStory = document.querySelector('#story');
const formSubmit = document.querySelector('.form__submit');

// localStorage

function saveAnswer() {
  localStorage.setItem('answer', JSON.stringify(newData)); // toDos를 string화해서 localStorage에 저장
}

newForm.onsubmit = function (event) {
  event.preventDefault();
  const newObj = {
    author: newName.value,
    createdAt: new Date().toLocaleDateString(),
    title: newTitle.value,
    contents: newStory.value,
  };
  newData.unshift(newObj);
  saveAnswer();
  ul.prepend(convertToDiscussion(newObj));

  newName.value = '';
  title.value = '';
  newStory.value = '';

  modal.classList.add('hidden');
};
