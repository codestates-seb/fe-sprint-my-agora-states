const ul = document.querySelector('ul.discussions__container');

const askingButton = document.getElementById('asking');

const formContainer = document.querySelector('.form__container');
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputQuestion = document.querySelector('#story');
const submitButton = document.querySelector('#submit-button');

const nothingFiltered = document.querySelector('.nothing-image--wrapper');

const sidebarContainer = document.querySelector('.side-bar__container');
const solvedFilterOption = document.querySelector('#option-solved');
const unsolvedFilterOption = document.querySelector('#option-unsolved');
const noticeFilterOption = document.querySelector('#option-notice');
const recentSortOption = document.querySelector('#option-recent');
const oldSortOption = document.querySelector('#option-old');
const dictionarySortOption = document.querySelector('#option-dictionary');

let currentDiscussions;
let currentSortStatus = recentSortOption;

askingButton.addEventListener('click', () => {
  formContainer.classList.toggle('show');
  sidebarContainer.classList.toggle('lower');
});

/**
 * 질문 등록하기 버튼 클릭 시 발생할 이벤트
 */
submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  formContainer.classList.toggle('show');

  agoraStatesDiscussions.push({
    createdAt: new Date().toISOString(),
    title: inputTitle.value,
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl: 'img/user.png',
  });

  render(ul);
});

/**
 * 답변 완료 선택 시 발생할 이벤트
 */
solvedFilterOption.addEventListener('click', async () => {
  ul.innerHTML = '';
  if (solvedFilterOption.checked) {
    currentDiscussions = await filterSolved();
  } else {
    currentDiscussions = await unfilterSolved();
  }
  currentSortStatus.dispatchEvent(new MouseEvent('click'));
});

/**
 * 답변 대기중 선택 시 발생할 이벤트
 */
unsolvedFilterOption.addEventListener('click', async () => {
  ul.innerHTML = '';
  if (unsolvedFilterOption.checked) {
    currentDiscussions = await filterUnsolved();
  } else {
    currentDiscussions = await unfilterUnsolved();
  }
  currentSortStatus.dispatchEvent(new MouseEvent('click'));
});

/**
 * 공지 선택 시 발생할 이벤트
 */
noticeFilterOption.addEventListener('click', async () => {
  ul.innerHTML = '';
  if (noticeFilterOption.checked) {
    currentDiscussions = await filterNotice();
  } else {
    currentDiscussions = await unfilterNotice();
  }
  currentSortStatus.dispatchEvent(new MouseEvent('click'));
});

/**
 * 최근 등록 순 선택 시 발생할 이벤트
 */
recentSortOption.addEventListener('click', () => {
  currentSortStatus = recentSortOption;
  ul.innerHTML = '';
  render(ul, sortRecentOrder(currentDiscussions));
});

/**
 * 오래된 등록 순 선택 시 발생할 이벤트
 */
oldSortOption.addEventListener('click', () => {
  currentSortStatus = oldSortOption;
  ul.innerHTML = '';
  render(ul, sortOldOrder(currentDiscussions));
});

/**
 * 제목 가나다 순 선택 시 발생할 이벤트
 */
dictionarySortOption.addEventListener('click', () => {
  currentSortStatus = dictionarySortOption;
  ul.innerHTML = '';
  render(ul, sortDictionaryOrder(currentDiscussions));
});

/**
 * @returns {string} - 시간을 현지 시간에 맞춰 변경해 주는 함수
 */
const parseCreatedTime = (time) => {
  return new Date(time).toLocaleString('ko-KR');
};

/**
 * @returns {number} - 현재 체크된 필터링 항목 개수
 */
const getCheckedCount = () => {
  const selectedElements = document.querySelectorAll('input[name="filter"]:checked');

  return selectedElements ? selectedElements.length : 0;
};

/**
 * @returns {array} - 공지 게시물 목록
 */
const filterNotice = () => {
  const checkedCount = getCheckedCount();

  if (checkedCount === 1 || checkedCount === 0) {
    return agoraStatesDiscussions.filter((e) => e.title.includes('notice'));
  }
  return currentDiscussions.concat(
    agoraStatesDiscussions.filter((e) => e.title.includes('notice'))
  );
};

/**
 * @returns {array} - 공지를 제외한 게시물 목록
 */
const unfilterNotice = () => {
  return currentDiscussions.filter((e) => !e.title.includes('notice'));
};

/**
 * @returns {array} - 답변 완료 게시물 목록
 */
const filterSolved = () => {
  const checkedCount = getCheckedCount();

  if (checkedCount === 1 || checkedCount === 0) {
    return agoraStatesDiscussions.filter((e) => e.answer);
  }
  return currentDiscussions.concat(agoraStatesDiscussions.filter((e) => e.answer));
};

/**
 * @returns {array} - 답변 완료를 제외한 게시물 목록
 */
const unfilterSolved = () => {
  return currentDiscussions.filter((e) => !e.answer);
};

/**
 * @returns {array} - 답변 대기중 게시물 목록
 */
const filterUnsolved = () => {
  const checkedCount = getCheckedCount();

  if (checkedCount === 1 || checkedCount === 0) {
    return agoraStatesDiscussions.filter((e) => !e.answer && !e.title.includes('notice'));
  }
  return currentDiscussions.concat(
    agoraStatesDiscussions.filter((e) => !e.answer && !e.title.includes('notice'))
  );
};

/**
 * @returns {array} - 답변 대기중을 제외한 게시물 목록
 */
const unfilterUnsolved = () => {
  return currentDiscussions.filter((e) => e.answer || e.title.includes('notice'));
};

/**
 * @params {[]} - 정렬 전 배열
 * @returns {array} - 최근 등록 순 정렬 후 배열
 */
const sortRecentOrder = (array) => {
  return array.sort((a, b) => {
    if (a.createdAt > b.createdAt) return -1;
    if (a.createdAt < b.createdAt) return 1;
    return 0;
  });
};

/**
 * @params {[]} - 정렬 전 배열
 * @returns {array} - 오래된 등록 순 정렬 후 배열
 */
const sortOldOrder = (array) => {
  return array.sort((a, b) => {
    if (a.createdAt > b.createdAt) return 1;
    if (a.createdAt < b.createdAt) return -1;
    return 0;
  });
};

/**
 * @params {[]} - 정렬 전 배열
 * @returns {array} - 제목 가나다 순 정렬 후 배열
 */
const sortDictionaryOrder = (array) => {
  return array.sort((a, b) => {
    if (a.title > b.title) return 1;
    if (a.title < b.title) return -1;
    return 0;
  });
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = ({
  id,
  createdAt,
  title,
  url,
  author,
  answer,
  bodyHTML,
  avatarUrl,
}) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionAuthor = document.createElement('div');
  discussionAuthor.className = 'discussion__author';
  const discussionCreatedTime = document.createElement('div');
  discussionCreatedTime.className = 'discussion__created-time';

  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image';
  avatarImage.src = avatarUrl;
  avatarImage.alt = `avatar of ${author}`;
  avatarWrapper.append(avatarImage);

  discussionAuthor.textContent = author;
  discussionCreatedTime.textContent = parseCreatedTime(createdAt);

  discussionInformation.append(avatarWrapper);
  discussionInformation.append(discussionAuthor);
  discussionInformation.append(discussionCreatedTime);

  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionContentInformation = document.createElement('div');
  discussionContentInformation.className = 'discussion__content-information';
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const discussionUrl = document.createElement('a');
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';
  const discussionAnsweredStatus = document.createElement('p');

  discussionUrl.href = url;
  discussionUrl.textContent = title;
  discussionTitle.append(discussionUrl);

  if (answer) {
    discussionAnswered.classList.add('solved');
    discussionAnsweredStatus.textContent = '답변 완료';
  } else if (!answer && !title.includes('notice')) {
    discussionAnswered.classList.add('unsolved');
    discussionAnsweredStatus.textContent = '답변 대기중';
  } else {
    discussionAnswered.classList.add('notice');
    discussionAnsweredStatus.textContent = '공지';
  }

  discussionAnswered.append(discussionAnsweredStatus);
  discussionContentInformation.append(discussionTitle, discussionAnswered);
  discussionContent.append(discussionContentInformation);

  li.append(discussionInformation, discussionContent, document.createElement('hr'));
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, discussions = agoraStatesDiscussions) => {
  currentDiscussions = discussions;

  if (currentDiscussions.length === 0) {
    nothingFiltered.classList.remove('hide');
    return;
  }
  nothingFiltered.classList.add('hide');

  for (let i = 0; i < discussions.length; i += 1) {
    element.append(convertToDiscussion(discussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render(ul);
