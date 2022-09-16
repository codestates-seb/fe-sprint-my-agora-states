// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

//새로고침 시 local storage 불러오기

const storageItems = JSON.parse(localStorage.getItem('agoraStatesDiscussions'));
//localstorage에서 꺼내옴
// if (storageItems) {
//   storageItems.forEach((e) => {

//     agoraStatesDiscussions.push(e);
//   });
// }

//디스커션 로컬 스토리지에 저장
//수업
const form = document.querySelector('.form');
const userName = document.querySelector('.form__input--name >input');
const newTitle = document.querySelector('.form__input--title>input');
const newStory = document.querySelector('.form__textbox>textarea');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  //1.객체를 하나 만든다
  //2.그 객체를 convertToDiscussion에 넣어서 DOM으로 변환
  //3.그걸 렌더함수에 넣어서 브라우저에 렌더링

  const obj = {
    id: 'unique number',
    createdAt: new Date(),
    title: newTitle.value,
    url: 'https://github.com/codestates-seb/agora-states-fe/discussions/45',
    author: userName.value,
    answer: null,
    bodyHTML: newStory.value,
    avatarUrl: 'https://avatars.githubusercontent.com/u/79903256?s=64&v=4',
  };
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  userName.value = '';
  newTitle.value = '';
  newStory.value = '';
  //로컬 스토리지에 저장
  localStorage.setItem(
    'agoraStatesDiscussions',
    JSON.stringify(agoraStatesDiscussions) //localStorage에 저장
  );
});

// const btnAddDiscusstion = document.querySelector('.form__submit input'); //submit 가져옴

// btnAddDiscusstion.addEventListener('click', (e) => {
//   //클릭 시 렌더, 컨버트
//   e.preventDefault();

//   const userName = document.querySelector('#username');
//   const newTitle = document.getElementById('title');
//   const newStory = document.getElementById('story');

//   agoraStatesDiscussions.unshift({
//     id: 'D_kwDOHOApLM4APjJi',
//     createdAt: new Date(),
//     title: newTitle.value,
//     url: 'https://github.com/codestates-seb/agora-states-fe/discussions/45',
//     author: userName.value,
//     answer: null,
//     bodyHTML: newStory.value,
//     avatarUrl: 'https://avatars.githubusercontent.com/u/79903256?s=64&v=4',
//   });
//   localStorage.setItem(
//     'agoraStatesDiscussions',
//     JSON.stringify(agoraStatesDiscussions) //localStorage에 저장
//   );

//   const ul = document.querySelector('ul.discussions__container');
//   while (ul.hasChildNodes()) {
//     ul.removeChild(ul.firstChild);
//   }
//   render(ul);

//   //input clear
//   userName.value = '';
//   newTitle.value = '';
//   newStory.value = '';
// });

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  //객체를 매개변수로 받는다!
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //li 1. 아바타 영역
  const avatarImg = document.createElement('img'); //img 요소 생성
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  //li 2. 콘텐츠 영역
  //2-1. 제목
  const discussionTitle = document.createElement('h2'); //h2 요소 만들기
  discussionTitle.className = 'discussion__title'; //클래스 이름 지정

  const discussionUrl = document.createElement('a'); //'a'요소 만들기
  discussionUrl.href = obj.url;
  discussionUrl.textContent = obj.title; //text 삽입
  discussionTitle.append(discussionUrl); //h2의 자식 요소로 추가
  //2-2. 정보
  const discussionInfo = document.createElement('div'); //div요소
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent =
    obj.author + ' / ' + new Date(obj.createdAt).toLocaleString(); //날짜 표기변경
  discussionContent.append(discussionTitle, discussionInfo); //discussionContent에 추가

  //li 3. 체크박스
  const discussionAnswer = document.createElement('p'); //div 요소 만들기
  discussionAnswer.className = 'discussion__answered'; //클래스 이름 지정
  discussionAnswer.textContent = obj.answer ? '☑️' : '❎️'; //3항연산자 사용, 답변이 있으면 체크표시
  discussionAnswered.append(discussionAnswer); //discussionAnsered에 추가*/

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const render = (element) => {
  //여기서 element는 ul
  //더미데이터 객체의 길이만큼 모든 요소를 탐색
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    //i번째 요소를 convertToDiscussion에 전달해서 그 결과를 ul에 append
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const ul = document.querySelector('ul.discussions__container');

render(ul);

//페이지네이션
/*function makePagenation() {
  if (storageItems) {
    for (let i = 1; i < Math.ceil(storageItems.length / 10); i++) {
      const pageNum = document.createElement('span');
      const pagination = document.querySelector('.pagination_pageNum');
      pageNum.textContent = i;
      pageNum.className = 'pagination_pageNum--num num${i}';
      pagination.append(pageNum);
    }
  } else {
    for (let i = 1; i < Math.ceil(agoraStatesDiscussions.length / 10); i++) {
      const pageNum = document.createElement('span');
      const pagination = document.querySelector('.pagination_pageNum');
      pageNum.textContent = i;
      pageNum.className = 'pagination_pageNum--num num${i}';
      pagination.append(pageNum);
    }
  }
}

makePagenation();

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, pageNum) => {
  //여기서 element는 ul
  if (pageNum) {
    element.innerHTML = '';
  }
  if (storageItems) {
    for (
      let i = pageNum * 10 - 10;
      i < Math.min(pageNum * 10, storageItems.length);
      i++
    )
      element.append(convertToDiscussion(storageItems[i]));
  } else {
    for (
      let i = pageNum * 10 - 10;
      i < Math.min(pageNum * 10, agoraStatesDiscussions.length);
      i += 1
    ) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');

render(ul, 1);

let pageNumObject = {};
for (
  let i = 1;
  i < document.querySelectorAll('.pagination_pageNum--num').length;
  i++
) {
  pageNumObject['num${i}'] = document.querySelector('.num${i}');
  pageNumObject['num${i}'].addEventListener('click', () => {
    render(ul, pageNumObject['num${i}'].textContent);
  });
}*/

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
