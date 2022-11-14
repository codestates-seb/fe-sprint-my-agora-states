
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__big--container'; // 클래스 이름 지정

  const elContainer = document.createElement('div');
  elContainer.className = 'discussion__container'
  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image'
  const title = document.createElement('h2');
  title.className = 'discussion__title'
  const information = document.createElement('div');
  information.className = 'discussion__information';
  const url = document.createElement('a');
  const checkbox = document.createElement('p');
  checkbox.className = 'checkbox';

  avatarImage.setAttribute('src', obj.avatarUrl);
  url.textContent = obj.title;
  information.textContent = `${obj.author} / ${makeCreateTime(obj.createdAt)}`;
  url.setAttribute('href', obj.url);
  checkbox.textContent = '□';

  li.append(elContainer);
  elContainer.append(avatarWrapper, discussionContent, discussionAnswered);
  avatarWrapper.append(avatarImage);
  discussionContent.append(title, information);
  discussionAnswered.append(checkbox);
  title.append(url);

  //answer 
  if(obj.answer !== null) {
    const ansWrapper = document.createElement('ul'); // 이중 ul 요소
    ansWrapper.className = 'answer__wrapper';
    
    const answer = document.createElement('li'); // 첫번째 답변 
    answer.className = 'answer';

    const ansAvartarImg = document.createElement('img');
    ansAvartarImg.className = 'answer__avartar--image'

    const ansTitle = document.createElement('h2');
    ansTitle.className = 'answer__title'
    const url = document.createElement('a');
    const ansContent = document.createElement('div');
    ansContent.className = 'answer__content';
    const ansInformation = document.createElement('div');
    ansInformation.className = 'answer__Information';

    url.textContent = '답변';
    checkbox.textContent = '☑';
    url.href = obj.answer.url;
    ansAvartarImg.src = obj.answer.avatarUrl;
    ansInformation.textContent = `${obj.answer.author} / ${makeCreateTime(obj.answer.createdAt)}`
    

    li.append(ansWrapper);
    ansWrapper.append(answer);
    answer.append(ansAvartarImg, ansContent);
    ansContent.append(ansTitle,ansInformation);
    ansTitle.append(url);


  }
    
  return li;
};

let year, month, day, hour;
function makeCreateTime(time) {
  year = time.slice(0, 4);
  month = time.slice(5, 7);
  day = time.slice(8, 10);
  hour = time.slice(11, 19);
  return `${year}년 ${month}월 ${day}일 ${hour}` 
}


// 페이지네이션 구현
const discussionsContainer = document.querySelector('.discussions__container');
const pageButtons = document.querySelector('.page__buttons');
let newCount;
let numOfContent = agoraStatesDiscussions.length + 1 +  newCount;
const maxContent = 10;
const maxButton = 5;
let maxPage = Math.ceil(numOfContent / maxContent);
let page = 1;


// (1-5)페이지 버튼 만들기
const makeButton = (id) => {
  const button = document.createElement("button");
  button.classList.add("button");
  button.dataset.num = id;
  button.innerText = id;
  button.addEventListener("click", (e) => {
    Array.prototype.forEach.call(pageButtons.children, (button) => {
      if (button.dataset.num) button.classList.remove("active");
    });
    e.target.classList.add("active");
    renderContent(parseInt(e.target.dataset.num));
  });
  return button;
};

//렌더링 함수
const renderContent = (page) => {
  // 목록 리스트 초기화
  while (discussionsContainer.hasChildNodes()) {
    discussionsContainer.removeChild(discussionsContainer.lastChild);
  }
  // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
  for (let id = (page - 1) * maxContent; id < (page * maxContent) && id < numOfContent; id++) {
    discussionsContainer.appendChild(convertToDiscussion(agoraStatesDiscussions[id]));
    console.dir(agoraStatesDiscussions[id])
  }
};

const renderButton = (page) => {
  // 버튼 리스트 초기화
  while (pageButtons.hasChildNodes()) {
    pageButtons.removeChild(pageButtons.lastChild);
  }
  // 화면에 최대 5개의 페이지 버튼 생성
  for (let id = page; id < page + maxButton && id <= maxPage; id++) {
    pageButtons.appendChild(makeButton(id));
    console.dir(makeButton(id))
  }
  // 첫 버튼 활성화(class="active")
  console.dir(pageButtons)
  console.dir(pageButtons.children[0])
  pageButtons.children[0].classList.add("active");

  let prev = document.createElement('button');
  prev.textContent = 'prev';
  let next = document.createElement('button');
  next.textContent = 'next';
  pageButtons.prepend(prev);
  pageButtons.append(next);

  // 이전, 다음 페이지 버튼이 필요한지 체크
  if (page - maxButton < 1) {
    pageButtons.removeChild(prev);
    
  }
  
  if (page + maxButton > maxPage) {
    pageButtons.removeChild(next);
    
  }
  
};

const render = (page) => {
  renderContent(page);
  renderButton(page);
};
render(page);
//페이지 이동 함수 구현
const goPrevPage = () => {
  page -= maxButton;
  render(page);
};

const goNextPage = () => {
  page += maxButton;
  render(page);
};


const prev = document.createElement("button");
prev.classList.add("button", "prev");
prev.textContent = 'prev';
prev.addEventListener("click", goPrevPage);

const next = document.createElement("button");
next.classList.add("button", "next");
next.textContent = 'next';
next.addEventListener("click", goNextPage);


// // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector('ul.discussions__container');
// renderContent(ul);



// 새로운 질문 추가 기능

const submit = document.querySelector('#submitbtn');
let elTitle = document.querySelector('#title');
let elName = document.querySelector('#name');
let elStory = document.querySelector('#story');
newCount = 0;

let elNewTitle, elNewName, elNewStory, today;

const makeNewdiscussion = (elNewTitle, elNewName, today) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__big--container'; // 클래스 이름 지정

  const elContainer = document.createElement('div');
  elContainer.className = 'discussion__container';
  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image'
  const title = document.createElement('h2');
  title.className = 'discussion__title'
  const information = document.createElement('div');
  information.className = 'discussion__information'
  const checkbox = document.createElement('p');

  avatarImage.src = "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
  title.textContent = elNewTitle; 
  information.textContent = `${elNewName} / ${today}`;

  document.querySelector('.discussions__container').prepend(li);
  li.append(elContainer)
  elContainer.append(avatarWrapper, discussionContent, discussionAnswered);
  avatarWrapper.append(avatarImage);
  discussionContent.append(title, information);
  discussionAnswered.append(checkbox);
  checkbox.textContent = '□';
 
  newCount ++;
  return li;
}


const getInformations = function() {
  elNewTitle = elTitle.value;
  elNewName = elName.value;
  elNewStory = elStory.value;
  today = `${new Date().getFullYear()}년 ${new Date().getMonth()}월 ${new Date().getDate()}일 ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
  console.log(elNewTitle)
  console.log(elNewName)
  console.log(elNewStory)
  makeNewdiscussion(elNewTitle, elNewName, today)
}

submit.addEventListener('click', getInformations);



