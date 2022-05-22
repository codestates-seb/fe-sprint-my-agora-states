// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// 새 입력값을 저장하는 newList가 존재하는지 확인하고 없으면 새로 만든다.
// updatedList = 기존 데이터 + newList
const checkNewList = localStorage.getItem('newList')
if(checkNewList === null){
  localStorage.setItem('newList', '[]')
}else{
  console.log('newList exists')
}
const newList = JSON.parse(localStorage.getItem('newList'))
let updatedList = [...newList, ...agoraStatesDiscussions]
console.log(updatedList)


// 아고라 스테이츠 데이터를 DOM으로 바꾸는 함수 convertToDiscussion
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  //img 정보 불러와서 avataWrapper에 붙이기
  const avatarImg = document.createElement('img');
    avatarImg.className = 'discussion__avatar--image';
    avatarImg.src = obj.avatarUrl? obj.avatarUrl : "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4";
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

  //h2와 a, information 불러와서 discussionContent에 붙이기
  const contentTitle = document.createElement('h2');
    contentTitle.className = 'discussion__title';
  const contentA = document.createElement('a');
    contentA.href = obj.url;
    contentA.innerText = obj.title;
    contentTitle.append(contentA);
  const contentInfo = document.createElement('div');
    contentInfo.className = 'discussion__information';
    contentInfo.textContent = `${obj.author} / ${obj.createdAt}`
  discussionContent.append(contentTitle, contentInfo);

  //p태그 가져와서 answered에 붙이기
  const answered = document.createElement('p');
    answered.textContent = obj.answer === null ? '□' : '☑'
    discussionAnswered.append(answered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;

};


// 데이터 중 10개씩 ul에 DOM으로 붙여 렌더링하는 함수
const ul = document.querySelector("ul.discussions__container");
function renderContent(page) {
  while (ul.hasChildNodes()){
    ul.removeChild(ul.lastChild);
  }
  for (let i = (page-1) * contentsPerPage + 1 ; i <= page * contentsPerPage && i <=numOfContent; i++){
    ul.append(convertToDiscussion(updatedList[i-1]));
  }
  return ul;
};

//페이지네이션 리스트/버튼 구현하는 함수
const pageNav = document.querySelector('.pageNav')
const numOfContent = updatedList.length
const contentsPerPage = 10
const totalPage = Math.ceil(numOfContent/contentsPerPage)
const btnPerPage = 5
let currentPage = 1

function makeBtn(page) {
  const navBtn = document.createElement('button');
  navBtn.classList.add('navBtn');
  navBtn.dataset.num = page;
  navBtn.innerText = page;
  //숫자버튼 eventlistener : click 시 화면 렌더하기
  navBtn.addEventListener('click', (e)=>{
    Array.prototype.forEach.call(pageNav.children, (navBtn) => {
      if (navBtn.dataset.num) navBtn.classList.remove("active");
      });
      navBtn.classList.add("active"); 
      renderContent(page);
  });
  return navBtn;
}


// 페이지네이션 버튼목록 렌더링하기
function renderPageNav(page) {
  //기존 버튼 없애기
  while (pageNav.hasChildNodes()) {
    pageNav.removeChild(pageNav.lastChild);
  }
  //새로 렌더할 페이지 범위 정하기 (최대 btnPerPage개)
  startNum = page - (page % btnPerPage) + 1
  lastNum = page - (page % btnPerPage) + btnPerPage
  for (let i = startNum; i <= lastNum && i <= totalPage; i++){
    pageNav.appendChild(makeBtn(i));
  }

  //이전, 다음 버튼 생성
  const prev = document.createElement('button');
  prev.classList.add('navBtn', 'prev');
  prev.innerText = '<';
  prev.addEventListener('click', ()=> {renderPageNav(page-1)});
  pageNav.prepend(prev);

  const next = document.createElement('button');
  next.classList.add('navBtn', 'next');
  next.innerText = '>';
  pageNav.append(next);
  document.querySelector('.next').addEventListener('click', ()=> {renderPageNav(page+1)});

    //해당 범위에서 이전, 다음 페이지 버튼이 필요한지 체크
  if(page - btnPerPage < 1) pageNav.firstChild.classList.add('disabled');
  if(page + btnPerPage > totalPage) pageNav.lastChild.classList.add('disabled');

}

//새로고침 시 1페이지 렌더링하기
renderPageNav(1);
pageNav.children[1].classList.add("active");
renderContent(1);


//글쓰기 폼이 업데이트되면 해당 내용을 newList에 업데이트한다
let form = document.querySelector('.form');
form.addEventListener('submit', update);

function update(event) {
  event.preventDefault();

  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() +1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const hours = ('0' + today.getHours()).slice(-2);
  const minutes = ('0' + today.getMinutes()).slice(-2);
  const seconds = ('0' + today.getSeconds()).slice(-2);
  const timestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`

  const newObj = {
    id: '',
    createdAt: timestamp,
    title: document.querySelector('.input--title').value,
    url: '/',
    author: document.querySelector('.input--name').value,
    answer: null,
    bodyHTML: document.querySelector('.input--story').value,
    bodyHTML: '',
    avatarUrl:
    "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4"
  }
  newList.unshift(newObj);
  localStorage.setItem('newList', JSON.stringify(newList))
  updatedList = [...newList, ...agoraStatesDiscussions]
  renderPageNav(1);
}
