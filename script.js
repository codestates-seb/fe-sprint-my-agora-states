// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
let discussions = agoraStatesDiscussions;

// 디스커션 추가하기 함수
function addDiscussion() {
  const author = document.querySelector('#name').value;
  const title = document.querySelector('#title').value;
  const bodyHTML = document.querySelector('#story').value;

  if (!bodyHTML || !title || !author) {
    // 입력값이 없을 경우 내용이 등록되지 않도록 alert 생성
    return alert('내용을 입력하세요.');
  }

  const newDiscussion = {
    id: Math.floor(Math.random * 1000),
    author,
    title,
    bodyHTML: `<div>${document.querySelector('#story').value}</div>`,
    createdAt: new Date(),
    answer: null,
    url: 'codestates.com',
    avatarUrl: 'https://avatars.githubusercontent.com/u/66160243?v=4',
  };

  discussions.unshift(newDiscussion);
  localStorage.setItem('discussions', JSON.stringify(discussions));
  render();
}

// submit 버튼의 클릭 이벤트에 addDiscussion 함수 할당
document.querySelector('.form__submit>input').addEventListener('click', (e) => {
  e.preventDefault();
  addDiscussion();
});

// 디스커션 삭제하기 함수
function removeDiscussion(id) {
  discussions = discussions.filter((obj) => obj.id !== id);
  localStorage.setItem('discussions', JSON.stringify(discussions));
  render();
}

// 디스커션 타이틀 클릭 시 상세 정보 렌더링 함수
function makeDetail(discussionContent, obj) {
  // 제목 클릭 시 토글 구현을 위한 if문
  if (discussionContent.querySelector('.discussion__detail')) {
    discussionContent.querySelector('.discussion__detail').remove();
    discussionContent.querySelector('.answer__container').remove();
  } else {
    const discussionDetail = document.createElement('div');
    discussionDetail.className = 'discussion__detail';

    const discussionDetailContent = document.createElement('div');
    discussionDetailContent.innerHTML = obj.bodyHTML;

    discussionDetail.append(discussionDetailContent);
    discussionContent.append(discussionDetail);

    // 답변 있을 시 답변 컴포넌트 생성하기
    if (obj.answer) {
      const answerContainer = document.createElement('div');
      answerContainer.className = 'answer__container';

      const avatarWrapper = document.createElement('div');
      avatarWrapper.className = 'answer__avatar--wrapper';

      const avatarImg = document.createElement('img');
      avatarImg.src = obj.avatarUrl;
      avatarImg.alt = 'avatar of ' + obj.author;

      const avatarUsername = document.createElement('div');
      avatarUsername.textContent = obj.answer.author;

      const answerCreatedAt = document.createElement('div');
      answerCreatedAt.textContent = new Date(obj.answer.createdAt).toLocaleDateString();

      avatarWrapper.append(avatarImg, avatarUsername, answerCreatedAt);

      const answerDetail = document.createElement('div');
      answerDetail.innerHTML = obj.answer.bodyHTML;

      answerContainer.append(avatarWrapper, answerDetail);
      discussionContent.append(answerContainer);
    }
  }
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';

  // 체크박스 생성하기
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';
  const answsered = document.createElement('i');
  answsered.className = `fa-regular ${obj.answer ? 'fa-square-check' : 'fa-square'}`;
  discussionAnswered.append(answsered);

  // 아바타 이미지 생성하기
  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 타이틀 생성하기
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  discussionTitle.textContent = obj.title;

  // 작성자 정보 및 날짜 생성하기
  const discussionInfo = document.createElement('div');
  const infoWrapper = document.createElement('div');
  infoWrapper.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleDateString()}`;

  // 삭제 버튼 생성하기
  let removeBtn = document.createElement('i');
  removeBtn.className = 'fa-solid fa-trash';
  removeBtn.addEventListener('click', () => {
    removeDiscussion(obj.id);
  });
  discussionInfo.append(infoWrapper, removeBtn);

  // 타이틀 클릭 시 질문 내용 및 답변 생성하기
  discussionTitle.addEventListener('click', () => makeDetail(discussionContent, obj));
  discussionContent.append(discussionTitle, discussionInfo, discussionAnswered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
function chunkArray(array, chunkSize) {
  let result = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    let chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }

  return result;
}

const render = (page = 0) => {
  let savedData = localStorage.getItem('discussions');

  if (!savedData) {
    // 로컬 스토리지에 데이터가 없다면 discussions의 데이터를 로컬 스토리지에 저장
    localStorage.setItem('discussions', JSON.stringify(discussions));
  } else {
    // 로컬 스토리지에 데이터가 있다면 해당 데이터로 discussions을 재할당
    discussions = JSON.parse(savedData);
  }

  const ul = document.querySelector('ul.discussions__container');
  // page 매개변수가 전달되지 않았다면 디폴트로 가장 앞의 5개의 데이터가 들어간다.
  const limit = 5;
  // 전체 디스커션 데이터를 5개씩 잘라서 이중배열로 pages에 넣는다.
  const pages = chunkArray(discussions, limit);
  // pages -> [[{},{},{},{},{}], [{},{},{},{},{}], ... ]

  if (ul.hasChildNodes()) {
    // 새로운 데이터 렌더링을 위해 기존 li 요소 지우기
    ul.innerHTML = '';
  }

  for (let i = 0; i < pages[page].length; i += 1) {
    ul.append(convertToDiscussion(pages[page][i]));
  }

  renderPagination(pages.length, page);
  return;
};

const renderPagination = (pageNum, current) => {
  // 데이터 갯수에 맞춰서 동적으로 페이지 목록을 생성
  const container = document.querySelector('.pagination__container');

  if (container.hasChildNodes()) {
    // 새로운 페이지 목록 생성을 위해 기존 페이지 목록 지우기
    container.innerHTML = '';
  }

  const pagesContainer = document.createElement('ol');
  pagesContainer.classList.add('pages__container');

  for (let i = 0; i < pageNum; i++) {
    const pageEl = document.createElement('li');
    pageEl.textContent = i + 1;
    pageEl.classList.add('page_item');

    if (current === i) {
      // 현재 선택된 페이지 번호일 경우 컬러 강조하기
      pageEl.classList.add('focus');
    }

    pageEl.addEventListener('click', (e) => {
      const ul = document.querySelector('ul.discussions__container');
      // 페이지에 해당하는 디스커션 목록을 가져오기 전 기존 데이터 삭제
      ul.innerHTML = '';
      // 현재 클릭한 페이지 넘버 가져오기
      let currentPage = Number(e.target.textContent) - 1;

      render(currentPage);
    });

    pagesContainer.append(pageEl);
  }

  container.append(pagesContainer);
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render();
