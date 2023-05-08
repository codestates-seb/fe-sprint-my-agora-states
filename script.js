// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

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

  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image';
  avatarImage.setAttribute('src', obj.avatarUrl);
  avatarWrapper.append(avatarImage);

  // discussion content
  // discussion title
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';

  const discussionAnchor = document.createElement('a');
  discussionAnchor.textContent = obj.title;
  discussionAnchor.setAttribute('href', obj.url);

  discussionTitle.append(discussionAnchor);
  discussionContent.append(discussionTitle);

  //discussion information
  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';

  discussionInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString('ko-KR')}`;

  discussionContent.append(discussionInfo);

  //discussion answered
  const discussionAnswerCheck = document.createElement('p');
  if (obj.answer === null) {
    discussionAnswerCheck.textContent = '☒';
    discussionAnswerCheck.className = 'isnull';
  } else {
    discussionAnswerCheck.textContent = '☑';
    discussionAnswerCheck.className = 'isNotNull';
  }

  discussionAnswered.append(discussionAnswerCheck);

  const deleteDiscussion = document.createElement('div');
  deleteDiscussion.className = 'option';

  const deleteIcon = document.createElement('span');
  deleteIcon.className = 'material-symbols-outlined';
  deleteIcon.textContent = '☒';

  deleteDiscussion.append(deleteIcon);

  li.append(
    avatarWrapper,
    discussionContent,
    discussionAnswered,
    deleteDiscussion
  );
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);

const informationForm = document.querySelector('.form');
const newName = document.querySelector('#name');
const newTitle = document.querySelector('#title');
const newQuestion = document.querySelector('#story');

//데이터 추가
const insertData = (event) => {
  let newObj = {};
  newObj['avatarUrl'] =
    'https://avatars.githubusercontent.com/u/79903256?s=64&v=4';
  newObj['answer'] = null;
  newObj['author'] = newName.value;
  newObj['title'] = newTitle.value;
  newObj['createdAt'] = new Date();

  agoraStatesDiscussions.unshift(newObj);
  // console.log('activate click');
  // console.log(agoraStatesDiscussions)
  // render(ul);

  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));

  const totalPages = Math.ceil(agoraStatesDiscussions.length / limit);
  if (thisPage === totalPages) {
    // 현재 페이지가 마지막 페이지인 경우 다음 페이지로 이동
    changePage(totalPages + 1);
  } else {
    loadList();
  }

  event.preventDefault();
};

informationForm.addEventListener('submit', insertData);

// delete list
const deleteArea = document.querySelectorAll('.option');
// delete
//  deleteArea.classList.add('test');
// const deleteFucntion = (event) => {
let currentElement = '';
let parent = '';
// }
for (let i = 0; i < agoraStatesDiscussions.length; i++) {
  deleteArea[i].addEventListener('click', function (e) {
    // console.log(e.currentTarget);
    // console.log(e.target);
    currentElement = e.target;
    console.log(currentElement);

    parent = currentElement.closest('li');
    console.log(parent.childNodes[1].childNodes[0].firstChild.textContent);
    console.log(parent.childNodes[1]);

    for (let j = 0; j < agoraStatesDiscussions.length; j++) {
      // console.log(agoraStatesDiscussions[j]['title']);
      if (
        agoraStatesDiscussions[j]['title'] ===
        parent.childNodes[1].childNodes[0].firstChild.textContent
      ) {
        agoraStatesDiscussions.splice(j, 1);
        // e.preventDefault();
        parent.remove();
        e.preventDefault();

        console.log(agoraStatesDiscussions);
      }
    }
  });
}

/* 페이지네이션 */
/* thisPage:현재 페이지 limit:한페이지에 보이는 list : li */
let thisPage = 1;
let limit = 5;
let list = document.querySelectorAll('.discussion__container');

function loadList() {
  /* 5 * (0) => 0 */
  // if(InputInser()){
  list = document.querySelectorAll('.discussion__container');
  // }
  let biginGet = limit * (thisPage - 1);
  /* 5 *1-1 => 4 */
  let endGet = limit * thisPage - 1;
  /* 만약 글이 하나 더 추가되면?  */
  /* item=> 현재요소 key => index */
  list.forEach((item, key) => {
    if (key >= biginGet && key <= endGet) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
  listPage();
}
loadList();

function listPage() {
  /* 41/5 => 페이지 수 */
  let count = Math.ceil(list.length / limit);
  document.querySelector('.listPage').innerHTML = '';
  //
  if (thisPage !== 1) {
    let prev = document.createElement('li');
    prev.innerText = 'PREV';
    prev.setAttribute('onclick', 'changePage(' + (thisPage - 1) + ')');
    document.querySelector('.listPage').appendChild(prev);
  }

  //페이지 count 구성
  for (let i = 1; i <= count; i++) {
    let newPage = document.createElement('li');
    newPage.innerText = i;
    if (i === thisPage) {
      newPage.classList.add('active');
    }
    newPage.setAttribute('onclick', 'changePage(' + i + ')');
    document.querySelector('.listPage').appendChild(newPage);
  }

  if (thisPage !== count) {
    let next = document.createElement('li');
    next.innerText = 'NEXT';
    next.setAttribute('onclick', 'changePage(' + (thisPage + 1) + ')');
    document.querySelector('.listPage').appendChild(next);
  }
}

function changePage(i) {
  thisPage = i;
  loadList();
}

let observer = new IntersectionObserver((e) => {
  e.forEach((x) => {
    if (x.isIntersecting) {
      x.target.style.opacity = 1;
    } else {
      x.target.style.opacity = 0;
    }
  });
});

// nav 컬러

const span = document.querySelector('.color-text');

span.addEventListener('mouseenter', function () {
  span.style.backgroundImage = 'none'; // 배경 그라데이션 제거
  span.style.color = '#3a1078;'; // 원하는 색상으로 변경
});

span.addEventListener('mouseleave', function () {
  span.style.backgroundImage =
    'linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)'; // 배경 그라데이션 복원
  span.style.color = 'transparent'; // 텍스트 숨김
});
