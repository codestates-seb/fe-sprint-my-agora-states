// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

const { localStorage } = window;

console.log(JSON.parse(localStorage.getItem('data')));

const form = document.querySelector('.form');
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputStory = document.querySelector('#story');
const inputAvatar = document.querySelectorAll('.avatar');

let selectedImg;

inputAvatar.forEach(ele => {
  ele.addEventListener('click', () => {
    selectedImg = ele.getAttribute('src');
  });
});

const ul = document.querySelector('ul.discussions__container');

// 새로운 디스커션 데이터 생성
const makeDiscussionData = () => {
  return {
    author: inputName.value,
    title: inputTitle.value,
    url: inputStory.value,
    createdAt: new Date(),
    answer: null,
    avatarUrl: selectedImg,
  };
};

// createdAt를 local date로 변환
const convertDate = date => {
  return new Date(date).toLocaleString();
};

// form element submit event handler
form.addEventListener('submit', e => {
  // 다시 렌더링하기 위해 주석 처리.
  // 주석 처리 안할시, submit은 작동하지만 다시 렌더링되지 않음. 아래 코드는 실행된다.
  // e.preventDefault();

  const newDiscussionData = makeDiscussionData();

  const database = JSON.parse(localStorage.getItem('data'));

  database.unshift(newDiscussionData);

  localStorage.setItem('data', JSON.stringify(database));
});

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = obj => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const { createdAt, title, author, avatarUrl, answer, url } = obj;

  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion_avatar--image';
  avatarImg.src = avatarUrl;
  avatarImg.alt = `avatar of ${author}`;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion_title';

  const discussionUrl = document.createElement('a');
  discussionUrl.textContent = title;
  discussionUrl.href = url;
  discussionTitle.append(discussionUrl);

  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion_information';
  discussionInfo.textContent = `${author} / ${convertDate(createdAt)}`;
  discussionContent.append(discussionTitle, discussionInfo);

  const answerCheck = document.createElement('p');
  answerCheck.textContent = answer
    ? String.fromCharCode(0x2713) // 유니코드로 체크 표시
    : String.fromCharCode(0x2716); // 유니코드로 엑스 표시
  discussionAnswered.append(answerCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const renderData = element => {
  const database = JSON.parse(localStorage.getItem('data'));

  database.forEach(data => element.append(convertToDiscussion(data)));
  return;
};

renderData(ul);

// 페이지네이션
// 한 페이지당 디스커션 10개
// 다음 페이지 버튼, 이전 페이지 버튼 필요
// 처음 페이지에서 이전 페이지 버튼 불가
// 마지막 페이지에서 다음 페이지 버튼 불가

// 페이지 넘버들이 들어갈 곳
const paginationNumbers = document.querySelector('#pagination_numbers');
// 이전 / 다음 버튼
const nextButton = document.querySelector('#next_button');
const prevButton = document.querySelector('#prev_button');
// 총 디스커션 목록
const listItems = document.querySelectorAll('li');
// 한 페이지당 디스커션 개수
const paginationLimit = 10;
// 총 페이지 수
const pageCount = Math.ceil(listItems.length / 10);
// 현재 페이지
let currentPage;

// 페이지 넘버 버튼 생성 후 append
const appendPageNumber = index => {
  const pageNumber = document.createElement('button');
  pageNumber.className = 'pagination_number';
  pageNumber.textContent = index;
  pageNumber.setAttribute('page-index', index);
  pageNumber.setAttribute('aria-label', 'page ' + index);

  paginationNumbers.append(pageNumber);
};

// 페이지 넘버 생성 후 appendPageNumber 호출 -> 최종적으로 페이지 넘버 버튼이 생성된다.
const getPaginationNumbers = () => {
  for (i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

// 현재 페이지 설정 : 페이지 넘버를 전달받으면 해당 페이지를 렌더링해준다.
const setCurrentPage = pageNum => {
  currentPage = pageNum;

  handleActiveClass();
  handleDisableButton();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add('hidden'); // 전체 디스커션을 숨긴다.
    if (index >= prevRange && index < currRange) {
      item.classList.remove('hidden'); // 범위에 해당하는 디스커션만 보여준다.
    }
  });
};

// 현재 페이지 넘버 버튼에 active 클래스 추가 그 외 페이지는 제거
const handleActiveClass = () => {
  const allPageNum = document.querySelectorAll('.pagination_number');

  allPageNum.forEach(button => {
    Number(button.textContent) === currentPage
      ? button.classList.add('active')
      : button.classList.remove('active');
  });
};

// 이전 / 다음 페이지 버튼 활성화, 비활성화 처리
const handleDisableButton = () => {
  currentPage === 1
    ? prevButton.setAttribute('disabled', true)
    : prevButton.removeAttribute('disabled');

  currentPage === pageCount
    ? nextButton.setAttribute('disabled', true)
    : nextButton.removeAttribute('disabled');
};

// 페이지 로딩 시 실행되는 이벤트 핸들러
window.addEventListener('load', () => {
  getPaginationNumbers(); // 페이지 넘버 버튼 생성
  setCurrentPage(1); // 현재 페이지 1페이지로 설정

  // 클릭 시 setCurrentPage에 이전 페이지 넘버 전달
  prevButton.addEventListener('click', () => {
    setCurrentPage(currentPage - 1);
  });

  // 클릭 시 setCurrentPage에 다음 페이지 넘버 전달
  nextButton.addEventListener('click', () => {
    setCurrentPage(currentPage + 1);
  });

  // 페이지 넘버 버튼 클릭 이벤트 생성
  const allPageNum = document.querySelectorAll('.pagination_number');

  allPageNum.forEach(button => {
    const pageIndex = Number(button.getAttribute('page-index'));

    if (pageIndex) {
      button.addEventListener('click', () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});
