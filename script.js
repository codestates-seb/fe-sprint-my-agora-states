const convertToDiscussion = (obj) => {
  const li = document.createElement('li');
  li.className = 'discussion__container';

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);

  const title = document.createElement('h2');
  title.className = 'discussion__title';

  const tag = document.createElement('a');
  tag.href = obj.url;
  tag.textContent = obj.title;

  const inpo = document.createElement('div');
  inpo.className = 'discussion__information';
  inpo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;

  title.append(tag);
  discussionContent.append(title, inpo);

  const answer = document.createElement('p');
  answer.textContent = obj.answer !== null ? '☑' : 'X';
  discussionAnswered.append(answer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  let lastmemory = localStorage.getItem('discussions')
    ? JSON.parse(localStorage.getItem('discussions'))
    : agoraStatesDiscussions;
  agoraStatesDiscussions = lastmemory;
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(lastmemory[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('.discussions__container');
render(ul);

//제출버튼을 눌렀을때 추가되는 이벤트
const form = document.querySelector('.form');
const user = document.querySelector('#name');
const title = document.querySelector('#title');
const story = document.querySelector('#story');
form.addEventListener('submit', function (e) {
  const newObj = {
    id: '',
    createdAt: new Date(),
    title: title.value,
    author: user.value,
    answer: null,
    story: story.value,
    avatarUrl: 'https://avatars.githubusercontent.com/u/87750478?s=64&v=4',
  };

  agoraStatesDiscussions.unshift(newObj);
  localStorage.setItem('discussions', JSON.stringify(agoraStatesDiscussions));
  // console.log(agoraStatesDiscussions);
  ul.prepend(convertToDiscussion(newObj));
  // user.value = '';
  // title.value = '';
  // story.value = '';
  form.reset();
});
//pagination 구현하기
const rowsPerPage = 10;
const rows = document.querySelectorAll('.discussion__wrapper ul li');
const rowsCount = rows.length;
const pageCount = Math.ceil(rowsCount / rowsPerPage);
const numbers = document.querySelector('#numbers');
const prevPageBtn = document.querySelector('.pagenation .fa-arrow-left');
const nextPageBtn = document.querySelector('.pagenation .fa-arrow-right');
let pageActiveidx = 0;
let currentPageNum = 0;
let maxPageNum = 1;
// console.log(rows);
// console.log(agoraStatesDiscussions);
for (let i = 1; i <= pageCount; i++) {
  numbers.innerHTML += `<li class="pagenum"><a href="">${i}</a></li>`;
}
const numberBtn = [...numbers.querySelectorAll('a')];
// const numberBtn2 = Array.from(numbers.querySelectorAll('a'));
numberBtn.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    pageActiveidx = index;

    displayRow(index);
    displayPage(index);
  });
});

function displayRow(index) {
  let start = index * rowsPerPage;
  let end = start + rowsPerPage;
  let rowsArray = [...rows];
  for (ra of rowsArray) {
    ra.style.display = 'none';
  }

  let newRows = rowsArray.slice(start, end);
  for (nr of newRows) {
    nr.style.display = 'flex';
  }
  for (nb of numberBtn) {
    nb.classList.remove('active');
  }
  numberBtn[index].classList.add('active');
}
displayRow(0);

function displayPage(num) {
  //페이지네이션 번호 감추기
  // for (nb of numberBtn) {
  //   nb.style.display = 'none';
  // }
  console.log(num);
  let totalPageCount = Math.ceil(pageCount / maxPageNum);
  let pageArr = [...numberBtn];
  let start = num * maxPageNum;
  let end = start + maxPageNum;
  let pageListArr = pageArr.slice(start, end);

  for (let item of pageListArr) {
    item.style.display = 'flex';
  }

  numberBtn[0].className === 'active' ? (prevPageBtn.style.display = 'none') : (prevPageBtn.style.display = 'flex');
  numberBtn[totalPageCount - 1].className === 'active'
    ? (nextPageBtn.style.display = 'none')
    : (nextPageBtn.style.display = 'flex');
}
displayPage(0);

nextPageBtn.addEventListener('click', () => {
  let nextPageNum = pageActiveidx * maxPageNum + maxPageNum;
  displayRow(nextPageNum);
  ++pageActiveidx;
  displayPage(pageActiveidx);
});
prevPageBtn.addEventListener('click', () => {
  let prevPageNum = pageActiveidx * maxPageNum - maxPageNum;
  displayRow(prevPageNum);
  --pageActiveidx;
  displayPage(pageActiveidx);
});
