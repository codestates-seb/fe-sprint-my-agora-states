// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const { localStorage } = window;

const form = document.querySelector('.form');
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputStory = document.querySelector('#story');

const makeDiscussionData = () => {
  return {
    author: inputName.value,
    title: inputTitle.value,
    url: inputStory.value,
    createdAt: new Date(),
    answer: null,
  };
};

const convertDate = createdAt => {
  return new Date(createdAt).toLocaleString();
};

form.addEventListener('submit', e => {
  e.preventDefault();

  const newDiscussionData = makeDiscussionData();

  agoraStatesDiscussions.unshift(newDiscussionData);

  const li = convertToDiscussion(newDiscussionData);
  ul.prepend(li);

  console.log(agoraStatesDiscussions);
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
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion_information';
  discussionInfo.textContent = `${author} / ${convertDate(createdAt)}`;
  discussionContent.append(discussionInfo);

  const answerCheck = document.createElement('p');
  answerCheck.textContent = answer
    ? String.fromCharCode(0x2713)
    : String.fromCharCode(0x2716);
  discussionAnswered.append(answerCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const ul = document.querySelector('ul.discussions__container');

const makeListItems = element => {
  for (i = 0; i < agoraStatesDiscussions.length; i++) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};
makeListItems(ul);

const paginationNumbers = document.querySelector('#pagination_numbers');

const nextButton = document.querySelector('#next_button');
const prevButton = document.querySelector('#prev_button');

const listItems = document.querySelectorAll('li');
console.log(listItems);

const paginationLimit = 10;
const pageCount = Math.ceil(listItems.length / 10);
let currentPage;

// 페이지 버튼 생성 후 append
const appendPageNumber = index => {
  const pageNumber = document.createElement('button');
  pageNumber.className = 'pagination_number';
  pageNumber.textContent = index;
  pageNumber.setAttribute('page-index', index); // 알아보기
  pageNumber.setAttribute('aria-label', 'page ' + index); // 알아보기

  paginationNumbers.append(pageNumber);
};

// 페이지 번호 생성 후 appendPageNumber 호출
const getPaginationNumbers = () => {
  for (i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

// 현재 페이지 설정
const setCurrentPage = pageNum => {
  currentPage = pageNum;

  handleActivePageNumber();
  disableButton();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add('hidden');
    if (index >= prevRange && index < currRange) {
      item.classList.remove('hidden');
    }
  });
};

// 클릭한 페이지에 active 클래스 추가
const handleActivePageNumber = () => {
  document.querySelectorAll('.pagination_number').forEach(button => {
    button.classList.remove('active');

    const pageIndex = Number(button.getAttribute('page-index'));

    if (pageIndex === currentPage) {
      button.classList.add('active');
    }
  });
};

// 페이지 이동 버튼 활성화, 비활성화
const disableButton = () => {
  currentPage === 1
    ? prevButton.setAttribute('disabled', true)
    : prevButton.removeAttribute('disabled');

  currentPage === pageCount
    ? nextButton.setAttribute('disabled', true)
    : nextButton.removeAttribute('disabled');
};
// 페이지 로딩 시 페이지 번호 생성, 현재 페이지 첫 번째 페이지로 설정
window.addEventListener('load', () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener('click', () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener('click', () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll('.pagination_number').forEach(button => {
    const pageIndex = Number(button.getAttribute('page-index'));

    if (pageIndex) {
      button.addEventListener('click', () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});
