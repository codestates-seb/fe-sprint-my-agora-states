// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  // 답변 정보 추가
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  if (obj.answer === null) {
    discussionAnswered.textContent = "답변❌";
  } else {
    const answerLink = document.createElement("a");
    answerLink.href = obj.answer.url;
    answerLink.textContent = "답변보기"
    discussionAnswered.appendChild(answerLink);
  }

  // My Agora States
  const discussionTitle = document.createElement('h1');
  discussionTitle.classList.add('discussion__title');
  
  // 링크 정보
  const discussionAnchor = document.createElement('a');
  discussionAnchor.textContent = obj.title;
  discussionAnchor.href = obj.url;

  if(obj.url === "null"){

  }
  // 새창으로 여는 함수
  discussionAnchor.target = '_black'

  // author 정보 추가
  const authorInfo = document.createElement('div');
  authorInfo.textContent = `${obj.author}`;
  authorInfo.classList.add('discussion__author');

  // 시간 정보 추가(yy/mm/dd hh:mm 표기 추가)
  const time = document.createElement('div');
  const createdAt = new Date(obj.createdAt);
  const formattedDate = `${createdAt.getYear() % 100}/${createdAt.getMonth() + 1}/${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}`;
  time.textContent = formattedDate;
  time.classList.add('discussion__time');

  // 기본 이미지 등록하기
  const avatarImg = document.createElement('img')
  avatarImg.classList.add('discussion__avartar--image');
  if (obj.avatarUrl === "URL-of-avatar-image") {
    avatarImg.src = "https://images.mypetlife.co.kr/content/uploads/2022/11/30083521/AdobeStock_141644461-scaled.jpeg";
  } else {
    avatarImg.src = obj.avatarUrl
  }




  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  avatarWrapper.append(avatarImg);
  discussionTitle.append(discussionAnchor);
  discussionContent.append(discussionTitle, authorInfo, time);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 렌더함수
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


// 모달이벤트
const questionBtn = document.querySelector('#questionBtn');
const modalContainer = document.querySelector('.modal__container');

const openModal = () => {
  modalContainer.classList.add('show');
}

const closeModal = (event) => {
  if (event.target === modalContainer) {
    modalContainer.classList.remove('show');
  }
}

questionBtn.addEventListener("click", openModal);
window.addEventListener("click", closeModal);

// 이전에 저장된 게시물 목록을 로드합니다.
function addDiscussionToLocalStorage(newDiscussion) {
  const storedDiscussions = localStorage.getItem('discussions');

  let discussions = [];

  if (storedDiscussions) {
    discussions = JSON.parse(storedDiscussions);
  }

  discussions.unshift(newDiscussion); // 새로운 게시물을 목록 맨 위에 추가

  // 로컬 스토리지에 업데이트된 게시물 목록을 저장합니다.
  localStorage.setItem('discussions', JSON.stringify(discussions));
}

// 새 게시물 등록하기
const updateDiscussionList = () => {
  const discussionsContainer = document.querySelector('.discussions__container');
  discussionsContainer.innerHTML = '';

  for (const discussion of agoraStatesDiscussions) {
    const discussionElement = document.createElement('li');
    discussionElement.innerHTML = discussion.bodyHTML;
    discussionsContainer.appendChild(discussionElement);
  }
};

// Submit 버튼을 클릭하는 이벤트 핸들러
document.querySelector('.form').addEventListener('submit', (event) => {
  event.preventDefault(); // 폼이 실제로 제출되지 않도록 기본 동작을 막음

  // 입력한 내용 가져오기
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const story = document.getElementById('story').value;

  // 새로운 게시물을 생성
  const newDiscussion = {
    id: "unique-id-here", // 고유한 ID를 생성하거나 서버에서 받아와서 사용해야 합니다.
    createdAt: new Date().toISOString(), // 현재 날짜와 시간을 사용하거나 서버에서 받아와야 합니다.
    title,
    author: name,
    bodyHTML: `<p>${story}</p>`,
    avatarUrl: "URL-of-avatar-image",
    answer: "null",
    url: "null",
  };

  // 새 게시물을 로컬 스토리지에 추가
  addDiscussionToLocalStorage(newDiscussion);

  // 생성한 게시물을 목록의 맨 위에 추가
  agoraStatesDiscussions.unshift(newDiscussion);

  // 생성한 게시물을 현재 화면에 추가
  const ul = document.querySelector("ul.discussions__container");
  ul.prepend(convertToDiscussion(newDiscussion));

  // 입력 필드 초기화
  document.getElementById('name').value = '';
  document.getElementById('title').value = '';
  document.getElementById('story').value = '';
  console.log(agoraStatesDiscussions);

  
});


const discussionsPerPage = 9;
let currentPage = 1;

// 초기 페이지 렌더링
renderDiscussions(currentPage);

// 이전 페이지로 이동
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    renderDiscussions(currentPage);
  }
}

// 다음 페이지로 이동
function nextPage() {
  const totalDiscussions = agoraStatesDiscussions.length;
  const totalPages = Math.ceil(totalDiscussions / discussionsPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    renderDiscussions(currentPage);
  }
}

// 페이지를 렌더링하는 함수
function renderDiscussions(page) {
  const discussionsContainer = document.querySelector('.discussions__container');
  discussionsContainer.innerHTML = '';

  const startIndex = (page - 1) * discussionsPerPage;
  const endIndex = startIndex + discussionsPerPage;
  const discussionsToRender = agoraStatesDiscussions.slice(startIndex, endIndex);

  for (const discussion of discussionsToRender) {
    discussionsContainer.appendChild(convertToDiscussion(discussion));
  }

  updatePaginationButtons();
}

// 페이지네이션 버튼을 업데이트하는 함수
function updatePaginationButtons() {
  const totalDiscussions = agoraStatesDiscussions.length;
  const totalPages = Math.ceil(totalDiscussions / discussionsPerPage);

  const previousButton = document.getElementById('previousButton');
  const nextButton = document.getElementById('nextButton');

  if (currentPage === 1) {
    previousButton.disabled = true;
  } else {
    previousButton.disabled = false;
  }

  if (currentPage === totalPages) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}

// 이전 페이지와 다음 페이지 버튼에 이벤트 리스너 추가
document.getElementById('previousButton').addEventListener('click', previousPage);
document.getElementById('nextButton').addEventListener('click', nextPage);

// 초기 페이지 렌더링
renderDiscussions(currentPage);


// ** discussion 추가하기 **
// 1. submit 버튼을 쿼리셀렉터로 가져온 후 변수에 할당
// 2. 버튼의 클릭 이벤트에 할당할 함수 작성
// 3. input에 입력된 작성자, 제목, 내용을 querySelector로 가져온다
// 4. 정보들을 모아 하나의 discussion 객체로 만든다.
// 5. ul태그 안 자식 태그(기존 discussion) 을 모두 지운다.
// 6. discussion 배열에 만들어놓은 객체를 추가한다.
// 7. render method를 다시 호출하여 새로운 객체가 추가된 배열을 rendering하게 만든다.