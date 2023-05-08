// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  li.style.border = "5px solid #ccc"; // 테두리 스타일 추가
  li.style.margin = "10px";

  

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  avatarWrapper.innerHTML = `<img class="discussion__avatar--image"
  src="${obj.avatarUrl}"
  alt="avatar of ${obj.author}">`

  discussionContent.innerHTML = `<h2 class="discussion__title"><a
  href=${obj.url}>${obj.title}</a></h2>
  <div class="discussion__information">${obj.author} / ${obj.createdAt}</div>
  </div>
  `

  if (obj.answer !== null) {
    discussionAnswered.innerHTML = `<p>Re:✅</p>`
  } else {
    discussionAnswered.innerHTML = `<p>Re:❌</p>`
  }
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


const toggleBtn = document.getElementById('toggleBtn');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');

toggleBtn.addEventListener('click', () => {
  navbar.classList.toggle('hide');
  header.style.transform = navbar.classList.contains('hide')
    ? 'translateY(-60px)'
    : 'translateY(0)'
});

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

const $topBtn = document.querySelector(".scroll-top-btn");

$topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });  
}
const $bottomBtn = document.querySelector(".moveBottomBtn");

$bottomBtn.onclick = () => {
  window.scrollTo({ 
    top: document.body.scrollHeight, 
    behavior: "smooth" 
  });
};


let hmm = document.getElementById('story');
const btnEnlarge = document.getElementById('btn-enlarge');
const formContainer = document.querySelector('.form__container');

btnEnlarge.addEventListener('click', function() {
  formContainer.classList.toggle('enlarge');
});

const myButton = document.getElementById('toggleBtn');
const myDiv = document.getElementById('toggleBtn');

myButton.addEventListener('click', function() {
  myDiv.classList.toggle('small');
});

const itemsPerPage = 10; // 페이지 당 아이템 개수
const items = document.querySelectorAll('.discussion__container'); // 아이템 요소들
const numPages = Math.ceil(items.length / itemsPerPage); // 전체 페이지 수
let currentPage = 1; // 현재 페이지


function showPage(page) {
  const startIndex = (page - 1) * itemsPerPage; // 시작 인덱스
  const endIndex = startIndex + itemsPerPage; // 끝 인덱스

  // 보여줄 아이템 요소들
  const pageItems = Array.from(items).slice(startIndex, endIndex);

  // 전체 아이템 요소들 숨기기
  items.forEach(item => {
    item.style.display = 'none';
  });

  // 보여줄 아이템 요소들 보이기
  pageItems.forEach(item => {
    item.style.display = 'block';
  });
}

function createPagination() {
  // 페이지네이션을 표시할 요소
  const paginationContainer = document.createElement('div');
  paginationContainer.classList.add('pagination');

  // 페이지 버튼들을 생성하여 페이지네이션 요소에 추가
  for (let i = 1; i <= numPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.textContent = i;
    pageBtn.addEventListener('click', () => {
      currentPage = i;
      showPage(currentPage);
      pageBtn.classList.add('page-button');
    });
    paginationContainer.appendChild(pageBtn);
  }

  

  // 페이지네이션 요소를 문서에 추가
  const discussionWrapper = document.querySelector('.discussion__wrapper');
  discussionWrapper.appendChild(paginationContainer);
}

// 초기 페이지 표시
showPage(currentPage);

// 페이지네이션 생성
createPagination();

toggleBtn.addEventListener('click', () => {

  if (toggleBtn.textContent === '⤵️') {
    toggleBtn.textContent = '⤴️';
  } else {
    toggleBtn.textContent = '⤵️';
  }
});

function updateTime() {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  document.getElementById("current-time").textContent = `${date} ${time}`;
}

setInterval(updateTime, 1000);

const form = document.querySelector('.form');
const discussionsContainer = document.querySelector('.discussions__container');


form.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameInput = document.querySelector('#name');
  const titleInput = document.querySelector('#title');
  const storyInput = document.querySelector('#story');

  const discussion = {
    author: nameInput.value,
    title: titleInput.value,
    content: storyInput.value,
    timestamp: new Date().toISOString(),
  };


  agoraStatesDiscussions.push(discussion);

  const newDiscussionElement = document.createElement('li');
  newDiscussionElement.classList.add('discussion__container');

newDiscussionElement.style.flexDirection = "column";
newDiscussionElement.style.height = "187.5px";
let pp = document.querySelector('.discussion__answered');
pp.style.flexDirection = "row";

  newDiscussionElement.innerHTML = `
    <div class="discussion__avatar--wrapper">
      <img class="discussion__avatar--image" src="https://cdn.discordapp.com/attachments/1104326739657773087/1104326800571629648/1619924286903.jpg" alt="avatar of ${discussion.author}">
    </div>
    <div class="discussion__content">
      <h2 class="discussion__title">${discussion.title}<button id ='show1'>내용</button></h2>
      <div class="discussion__information">${discussion.author} / ${discussion.timestamp}</div>
    </div>
    <div class="discussion__answered"><p>Re:❌</p></div>
  `;


discussionsContainer.insertBefore(newDiscussionElement, discussionsContainer.firstChild);

document.getElementById('show1').style.backgroundColor = "#a19e9e";
document.getElementById('show1').style.borderRadius = '15px';
document.getElementById('show1').style.width = '70px';
document.getElementById('show1').style.height = '20px';
document.getElementById('show1').style.marginLeft = '50px';

  nameInput.value = '';
  titleInput.value = '';
  storyInput.value = '';

  document.getElementById('show1').addEventListener('click', () => {
    const newBox = document.createElement('div');
    newBox.style.width = '50%';
    newBox.style.height = '50%';
    newBox.style.position = 'fixed';
    newBox.style.top = '25%';
    newBox.style.left = '25%';
    newBox.style.backgroundColor = '#929090';
    newBox.style.border = '5px solid #676666';
    newBox.style.borderRadius = '10px';
    newBox.style.padding = '20px';
   
    
    const content = document.createTextNode(DOMPurify.sanitize(discussion.content));
    newBox.appendChild(content);
    
    document.body.appendChild(newBox);
    
    const closeButton = document.createElement('button');
    closeButton.classList.add('ekerl');

    closeButton.style.position = 'fixed';
    closeButton.style.right = "26%";
    closeButton.style.bottom = '27%';
    closeButton.innerText = '닫기';
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '5px 10px';
    closeButton.style.borderRadius = '5px';
    closeButton.style.backgroundColor = '#000';
    closeButton.style.color = '#fff';
    closeButton.style.cursor = 'pointer';
    
    closeButton.addEventListener('click', () => {
      document.body.removeChild(newBox);
    });
    
    newBox.appendChild(closeButton);
  });
  


});
