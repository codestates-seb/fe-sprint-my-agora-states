// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  const avatarImg = document.createElement('img'); // 이미지
  const discussionContent = document.createElement('div');
  const discussionTitle = document.createElement('h2'); //제목
  const titleLink = document.createElement('a'); //제목링크
  const discussionInfo = document.createElement('div'); //글쓴이, 날짜 묶은거
  const discussionAnswered = document.createElement('div');
  const discussionUserInfo = document.createElement('span');
  const discussionIsAnswer = document.createElement('span');
  const discussionId = document.createElement('input');
  const date = new Date(obj.createdAt);

  //id값 넣기
  discussionId.className = 'discussionId';
  discussionId.type = 'hidden';
  discussionId.value = obj['id'];
  //avatarWrapper
  avatarWrapper.className = 'discussion__avatar--wrapper';
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);
  //discussionContent
  discussionContent.className = 'discussion__content';
  discussionTitle.className = 'discussion__title';
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionTitle.append(titleLink);
  //discussionAnswered&info
  discussionInfo.className = 'discussion__information';
  discussionAnswered.className = 'discussion__answered material-icons';
  discussionUserInfo.className = 'userInfo';
  discussionUserInfo.textContent = `${obj.author} / ${date
    .toLocaleString('ko-KR')
    .slice(-11)}`;
  if (obj.answer === null) {
    discussionAnswered.textContent = 'check_circle_outline';
    discussionIsAnswer.className = 'isAnswer';
    discussionIsAnswer.textContent = ' Unanswered';
  } else {
    discussionAnswered.textContent = 'check_circle';
    discussionIsAnswer.className = 'isAnswer yes';
    discussionIsAnswer.textContent += ` Answered`;
  }
  discussionInfo.append(
    discussionUserInfo,
    ' · ',
    discussionIsAnswer,
    discussionId
  );
  discussionContent.append(discussionTitle, discussionInfo);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
function toLocalStorage(arr) {
  if (JSON.parse(localStorage.getItem('newArr') === null)) {
    return window.localStorage.setItem('newArr', JSON.stringify([...arr]));
  }
  return;
}

const render = (element) => {
  toLocalStorage(agoraStatesDiscussions);
  let arr = JSON.parse(localStorage.getItem('newArr'));
  for (let i = 0; i < 10; i += 1) {
    element.append(convertToDiscussion(arr[i]));
  }
  return;
};
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);
let number = 0;

// 등록하기
function confirmForm() {
  const name = document.querySelector('#name');
  const title = document.querySelector('#title');
  const story = document.querySelector('#story');
  const date = new Date();

  if (name.value !== '' && title.value !== '' && story.value !== '') {
    const data = {
      title: title.value,
      author: name.value,
      createdAt: date,
      story: story.value,
      avatarUrl: './user-profile-icon-free-vector.jpg',
      answer: null,
    };
    let arr = JSON.parse(localStorage.getItem('newArr'));
    localStorage.setItem('newArr', JSON.stringify([data, ...arr]));

    ul.prepend(convertToDiscussion(data));
    title.value = '';
    name.value = '';
    story.value = '';
  } else {
    alert('빈칸을 채워주세요');
    return false;
  }
}
// 페이지 몇개 만들거니!
(function getPagination() {
  let getNum = 0;
  const length = JSON.parse(localStorage.getItem('newArr')).length;
  if (length > 10) {
    if (length % 10) {
      getNum = parseInt(length / 10) + 1;
    } else {
      getNum = length / 10;
    }
  } else {
    getNum = 1;
  }

  for (let i = 1; i <= getNum; i++) {
    const page = document.createElement('span');
    page.className = `page`;
    page.textContent = i;
    document.querySelector('.pagination').append(page);
  }
  return;
})(); // 즉시 실행함수!

//페이지 렌더링 갯수세기
document.querySelector('.pagination').onclick = function (e) {
  if (e.target.className === 'page') {
    let startNum = (Number(e.target.textContent) - 1) * 10;
    let endNum = Number(e.target.textContent) * 10 - 1;
    hadchildren(ul);
    render2(ul, startNum, endNum);
    window.scrollTo(0, 0);
  }
};
// 기존의 render 건드리기 싫어서 새로 만듦
const render2 = (element, num1, num2) => {
  let arr = JSON.parse(localStorage.getItem('newArr'));
  for (let i = num1; i <= num2; i += 1) {
    if (i === arr.length) {
      return;
    }
    element.append(convertToDiscussion(arr[i]));
  }
  return;
};

// 기존의 ul지우기
const hadchildren = (el) => {
  while (el.hasChildNodes()) {
    el.removeChild(el.firstChild);
  }
};
