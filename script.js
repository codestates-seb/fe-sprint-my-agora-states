// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // AvatarImg 생성
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarWrapper.append(avatarImg);
  // Content 내용 생성  (title, information)
  const discussionTitle = document.createElement('h2');
  discussionTitle.classList = "discussion__title";
  const ahref = document.createElement('a');
  ahref.textContent = obj.title;
  ahref.href = obj.url;
  discussionTitle.append(ahref);
  const discussionInformation = document.createElement('div');
  discussionInformation.classList = "discussion__information";
  discussionInformation.textContent = obj.author + ' / ' + obj.createdAt;
  discussionContent.append(discussionTitle, discussionInformation);
  // answered 생성
  const isAnswered = document.createElement('p');
  isAnswered.textContent = '☑';
  discussionAnswered.append(isAnswered)
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
let page = 1;
let pageStart = 0;
let pageEnd = 0;
let newData;
let renderData = agoraStatesDiscussions.slice();
const render = (element , newElement) => {
  renderData = agoraStatesDiscussions.slice(); //원본 데이터 가져오기
  newData = getLocalData(); // localStorage 에서 저장된 데이터 불러오기
  
  page = Math.floor(renderData.length/10);
  pageStart = page * 10;
  pageEnd = pageStart + 9;
  for(let i = 0; i < page; i++){
    pageContainer.append(createPagination(i));
  }
  
  for (let i = 0; i < 10; i += 1) {
    element.append(convertToDiscussion(renderData[i]));
  }
  if(newElement){
    element.prepend(convertToDiscussion(newElement));
  }

  // console.log(renderData[0], newElement);
  console.log(pageStart, pageEnd, page);
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
const pageContainer = document.querySelector(".pagenation__container");
render(ul);

// pagenation 생성
function createPagination(num){
  const page = document.createElement('li');
  page.textContent = num + 1;
  page.addEventListener('click', changePage);
  return page
}

// page 변경
function changePage(){
  ul.remove('li');

  
  console.log('변경!');
}

// submit
const submitBtn = document.querySelector('.form__submit input');

submitBtn.addEventListener('click', addToDiscussions);

function addToDiscussions(){
  event.preventDefault();
  const inputName = document.querySelector('#name').value;
  const inputTitle = document.querySelector('#title').value;
  const inputQuestion = document.querySelector('#story').value;
  const time = new Date();

  if(inputName === ''){
    alert('이름을 작성해주세요');
    return;
  }
  if(inputTitle === ''){
    alert('제목을 작성해주세요');
    return;
  }
  if(inputQuestion === ''){
    alert('질문을 작성해주세요');
    return;
  }

  const addObj = {
    author: inputName,
    title: inputTitle,
    createdAt: time,
    avatarUrl:"https://avatars.githubusercontent.com/u/61141988?s=64&u=92c71910d9f6409d38d40d7d5a0a094d8ec647ed&v=4",
    url: ''
  }
  newData.push(addObj);

  // 로컬저장소에 저장
  saveLocalData();
  render(ul, addObj);
}

// localStorage 데이터 저장하기
function saveLocalData(){
  const objString = JSON.stringify(newData);
  window.localStorage.removeItem('data');
  window.localStorage.setItem('data', objString);
}

// localStorage 데이터 받아오기
function getLocalData(){
  const localData = window.localStorage.getItem('data');
  
  let getData = JSON.parse(localData);
  for(let obj of getData){
    renderData.unshift(obj);
  }
  return getData;
}