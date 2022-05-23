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
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render2(ul, 0, 9);

// 새로운 질문 등록하기
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
    hadchildren(ul);
    render(ul);
    title.value = '';
    name.value = '';
    story.value = '';
  } else {
    alert('빈칸을 채워주세요');
    return false;
  }
}
// 페이지 몇개 만들거니!!
(function getPagination() {
  let getNum = 0;
  const length = JSON.parse(localStorage.getItem('newArr')).length;
  let pagination = document.querySelector('.pagination');
  if (length > 10) {
    if (length % 10) {
      getNum = parseInt(length / 10) + 1;
    } else {
      getNum = length / 10;
    }
  } else {
    getNum = 1;
  }
  function createPage(createEl, Elparent, clName, startNum, endNum) {
    for (let i = startNum; i <= endNum; i++) {
      if (getNum < i) {
        return;
      }
      const page = document.createElement(createEl);
      page.className = clName;
      page.textContent = i;
      document.querySelector(`.${Elparent}`).append(page);
    }
  }

  createPage('span', 'pagination', 'page', 1, 3);
  pagination.firstChild.classList.add('colored');

  if (getNum > 3) {
    // 맨 앞, 맨 뒤로가기 버튼
    document.querySelector('#goToOne').onclick = function () {
      let num = Number(pagination.firstChild.textContent);
      hadchildren(pagination);
      createPage('span', 'pagination', 'page', 1, 3);
      pagination.firstChild.classList.add('colored');
      hadchildren(ul);
      render2(ul, 0, 9);
      window.scrollTo(0, 0);
    };
    document.querySelector('#goToLast').onclick = function () {
      let num = getNum % 3;
      hadchildren(pagination);
      if (num === 0) {
        createPage('span', 'pagination', 'page', getNum - 2, getNum);
      } else {
        createPage('span', 'pagination', 'page', getNum - num + 1, getNum);
      }
      if (document.querySelector('.colored') !== null) {
        document.querySelector('.colored').classList.remove('colored');
      }
      pagination.lastChild.classList.add('colored');
      hadchildren(ul);
      render2(ul, (getNum - 1) * 10, getNum * 10 - 1);
      window.scrollTo(0, 0);
    };
    // 한칸씩 이동하는거로 짜봄!
    document.querySelector('#nextBtn').onclick = function () {
      let num = Number(document.querySelector('.colored').textContent);
      let numNext = document.querySelector('.colored').nextSibling;
      if (num === getNum) {
        return;
      }

      if ((num + 1) % 3 === 1) {
        hadchildren(pagination);
        createPage('span', 'pagination', 'page', num + 1, num + 3);

        if (document.querySelector('.colored') !== null) {
          document.querySelector('.colored').classList.remove('colored');
        }
        pagination.firstChild.classList.add('colored');
      } else {
        document.querySelector('.colored').classList.remove('colored');
        numNext.classList.add('colored');
      }
      hadchildren(ul);
      render2(ul, num * 10, (num + 1) * 10 - 1);
      window.scrollTo(0, 0);
    };
    document.querySelector('#beforeBtn').onclick = function () {
      let num = Number(document.querySelector('.colored').textContent);
      let numBefore = document.querySelector('.colored').previousSibling;
      if (num === 1) {
        return;
      }

      if ((num - 1) % 3 === 0) {
        hadchildren(pagination);
        createPage('span', 'pagination', 'page', num - 3, num - 1);

        if (document.querySelector('.colored') !== null) {
          document.querySelector('.colored').classList.remove('colored');
        }
        pagination.lastChild.classList.add('colored');
      } else {
        document.querySelector('.colored').classList.remove('colored');
        numBefore.classList.add('colored');
      }
      hadchildren(ul);
      render2(ul, (num - 2) * 10, (num - 1) * 10 - 1);
      window.scrollTo(0, 0);
    };
    // document.querySelector('#nextBtn').onclick = function () {
    //   let num = Number(pagination.lastChild.textContent);
    //   if (num === getNum) {
    //     return;
    //   }
    //   hadchildren(pagination);
    //   createPage('span', 'pagination', 'page', num + 1, num + 3);
    //   hadchildren(ul);
    //   render2(ul, num * 10, (num + 1) * 10 - 1);
    // };
    // document.querySelector('#beforeBtn').onclick = function () {
    //   let num = Number(pagination.firstChild.textContent);
    //   if (num === 1) {
    //     return;
    //   }
    //   hadchildren(pagination);
    //   createPage('span', 'pagination', 'page', num - 3, num - 1);
    //   hadchildren(ul);
    //   render2(ul, (num - 4) * 10, (num - 3) * 10 - 1);
    // };
  }

  return;
})(); // 즉시 실행함수!

//페이지 렌더링 갯수세기
document.querySelector('.pagination').onclick = function (e) {
  if (e.target.classList.contains('page')) {
    document.querySelector('.colored').classList.remove('colored');
    e.target.className = 'page colored';
    let startNum = (Number(e.target.textContent) - 1) * 10;
    let endNum = Number(e.target.textContent) * 10 - 1;
    hadchildren(ul);
    render2(ul, startNum, endNum);
    window.scrollTo(0, 0);
  }
};

// 기존의 ul지우기
const hadchildren = (el) => {
  while (el.hasChildNodes()) {
    el.removeChild(el.firstChild);
  }
};
