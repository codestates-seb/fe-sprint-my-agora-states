// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (agoraStatesDiscussions) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("h3");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionTitle = document.createElement('a');
  discussionTitle.className = "discussion__title";
  discussionTitle.textContent = agoraStatesDiscussions.title;
  discussionTitle.href = agoraStatesDiscussions.url

  discussionContent.append(discussionTitle);

  const discussionInformation = document.createElement('div');
  discussionInformation.className = "discussion__information"
  discussionInformation.textContent = agoraStatesDiscussions.createdAt;
  discussionContent.appendChild(discussionInformation);

  const discussionCheckbox = document.createElement('p');
  discussionCheckbox.className = "discussion__answered"
  discussionCheckbox.textContent = '☑'
  discussionAnswered.append(discussionCheckbox);

  

  


  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  
  const avatarImg = document.createElement('img');
  avatarImg.src = agoraStatesDiscussions.avatarUrl;
  avatarImg.alt = 'avatar of ' + agoraStatesDiscussions.author;
  avatarWrapper.append(avatarImg);

  

  
  
 
  

  li.append(avatarWrapper, discussionContent, discussionAnswered);
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
const ul = document.querySelector("ul.discussions__container");
render(ul);

const discussionsPerPage = 10; // 한 페이지에 보여줄 데이터 개수
const discussionsContainer = document.querySelector('.discussions__container');
const pagination = document.querySelector('.page-btns');

// 페이지 개수 계산
const totalPages = Math.ceil(agoraStatesDiscussions.length / discussionsPerPage);

// 페이지 버튼 생성
for (let i = 1; i <= totalPages; i++) {
  const btn = document.createElement('button');
  btn.textContent = i;
  pagination.appendChild(btn);
}

// 페이지 버튼 클릭 시 해당 페이지 데이터 보여주기
pagination.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const pageNum = parseInt(event.target.textContent);
    const start = (pageNum - 1) * discussionsPerPage;
    const end = start + discussionsPerPage;
    const discussions = agoraStatesDiscussions.slice(start, end);
    renderDiscussions(discussions);
  }
});

// 초기 데이터 렌더링
renderDiscussions(agoraStatesDiscussions.slice(0, discussionsPerPage));

// 데이터 렌더링 함수
function renderDiscussions(discussions) {
  let html = '';
  discussions.forEach((discussion) => {
    const { avatarUrl, title, url, author, createdAt, isAnswered } = discussion;
    html += `
      <li class="discussion__container">
        <div class="discussion__avatar--wrapper">
          <img class="discussion__avatar--image"
            src="${avatarUrl}"
            alt="avatar of ${author}">
        </div>
        <div class="discussion__content">
          <h3 class="discussion__title"><a href="${url}">${title}</a></h3>
          <div class="discussion__information">${author} / ${createdAt}</div>
        </div>
        ${isAnswered ? '<div class="discussion__answered"><p>☑</p></div>' : ''}
      </li>
    `;
  });
  discussionsContainer.innerHTML = DOMPurify.sanitize(html);
}
function handleSubmit(event) {
  event.preventDefault(); // 폼의 기본 동작(새로고침)을 막는다
  const nameInput = document.querySelector("#name");
  const titleInput = document.querySelector("#title");
  const storyInput = document.querySelector("#story");

  const newDiscussion = {
    author: nameInput.value,
    title: titleInput.value,
    content: storyInput.value,
    date: new Date(),
    comments: [],
  };

  agoraStatesDiscussions.unshift(newDiscussion);
  
  renderDiscussions();
  nameInput.value = "";
  titleInput.value = "";
  storyInput.value = "";
}
function init() {
  // ... 이전 코드들

  const form = document.querySelector(".form");
  form.addEventListener("submit", handleSubmit);
}

init();
