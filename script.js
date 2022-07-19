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
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 이미지 추가
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //제목, 링크, 작성자, 작성일시 추가
  const discussionTit = document.createElement("h2");
  discussionTit.className = "discussion__title"
  const discussionTitLink = document.createElement("a");
  discussionTitLink.href = obj.url;
  discussionTitLink.textContent = obj.title;
  discussionTit.append(discussionTitLink);

  const discussionInfortmaion = document.createElement("div");
  discussionInfortmaion.className = "discussion__information"
  const localCreatedAt = new Date(obj.createdAt).toLocaleString()
  discussionInfortmaion.textContent = obj.author + ' / ' + localCreatedAt;

  discussionContent.append(discussionTit,discussionInfortmaion)

  //답변 여부 체크박스 추가
  const discussionAnsweredCheckbox = document.createElement('p')
  discussionAnsweredCheckbox.className = "discussion__answered"
  obj.answer === null ? discussionAnsweredCheckbox.textContent = '☒' : discussionAnsweredCheckbox.textContent = '☑'
  discussionAnswered.append(discussionAnsweredCheckbox)

  let answerLi = undefined;

  if(obj.answer !== null){
    answerLi = document.createElement('div')
    answerLi.className = "answer__container"

    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "answer__avatar--wrapper";
    const answerContent = document.createElement("div");
    answerContent.className = "answer__content";

    //답변 아이콘 추가
    const answerIcon = document.createElement('div');
    answerIcon.innerHTML =`<ion-icon name="return-down-forward-outline"></ion-icon>`
    answerIcon.className = "answer__icon"
    
    // 답변 이미지 추가
    const avatarImg = document.createElement('img');
    avatarImg.className = "answer__avatar--image"
    avatarImg.src = obj.answer.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.answer.author;
    avatarWrapper.append(avatarImg);

    //제목, 링크, 작성자, 작성일시 추가
    const answerTit = document.createElement("h2");
    answerTit.className = "answer__title"
    const answerTitLink = document.createElement("a");
    answerTitLink.href = obj.answer.url;
    answerTitLink.textContent = obj.author + "님 질문에 대한 답변";
    answerTit.append(answerTitLink);
    
    const answerInfortmaion = document.createElement("div");
    answerInfortmaion.className = "answer__information"
    const localCreatedAt = new Date(obj.answer.createdAt).toLocaleString()
    answerInfortmaion.textContent = obj.answer.author + ' / ' + localCreatedAt;
    
    answerContent.append(answerTit,answerInfortmaion)

    answerLi.append(answerIcon,avatarWrapper, answerContent)
  } 

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  if(answerLi){li.append(answerLi)}
  return li;
};


function assembleArr(){
  if(window.localStorage.length !== 0){
    for(let i=0; i<window.localStorage.length; i++){
      agoraStatesDiscussions.unshift(JSON.parse(window.localStorage.getItem(i)))
    }
  }
}

let liPerPage = 10; //한 페이지당 보이는 li 수
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  //1. 일단 agoraStatesDiscussions 데이터랑 localstorage의 데이터랑 합치기
  assembleArr();
  //2. 총 길이가 한페이지당 보여야 하는 li개수보다 작으면 총 길이 만큼만 로드
  if(agoraStatesDiscussions.length < liPerPage){
    liPerPage = agoraStatesDiscussions.length
  }
  //3. 총 길이가 한페이지당 보여야 하는 li개수보다 많으면 미리정해놓은 liPerPage만큼만 로드
  for (let i = 0; i < liPerPage ; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }

  //4. 여기까지 하고 페이지네이션 만들기
  setPagination()
  return;
};

function createPaginationBtn(startIndex,endIndex,currentPage){
  //페이지네이션 버튼 엘레먼트 만들기
  const paginationBtn = document.createElement("button");
  paginationBtn.className = 'pagination__btn';
  paginationBtn.dataset.start = startIndex;
  paginationBtn.dataset.end = endIndex;
  paginationBtn.textContent = currentPage;

  paginationBtn.addEventListener('click',()=>{
    ul.innerHTML =''
    for (let i = startIndex; i <= endIndex ; i += 1) {
      ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    window.scrollTo({top: ul.offsetTop , behavior: 'smooth'});

    //현재 활성화된 페이지 버튼에 now클래스 추가
    let previousPageBtn = document.querySelector('.pagination__btn.now');
    if(previousPageBtn){
      previousPageBtn.classList.remove('now')
    }
    paginationBtn.classList.add('now')
  })

  return paginationBtn
}

function setPagination(){
  //페이지네이션 이벤트 리스너에 들어갈 정보 전달해서
  //createPaginationBtn으로 페이지네이션 버튼 만들고
  //페이지네이션 버튼 DOM에 넣어주기
  const paginationContainer = document.querySelector('.pagination__container');
  let totalData = agoraStatesDiscussions.length; 
  let totalPage = Math.ceil(totalData / liPerPage)
  let startIndex = 0;
  let endIndex = 9;
  let currentPage = 1;
  let maxBtn = 5

  for(let i = 1; i <= totalPage ; i += 1){ 
    const paginationBtn = createPaginationBtn(startIndex,endIndex,currentPage)
    paginationContainer.append(paginationBtn)
    startIndex += liPerPage 
    endIndex += liPerPage 
    if(endIndex > totalData){
      endIndex = totalData - 1
    }
    currentPage += 1;
  }

  let resultBtns = document.querySelectorAll('.pagination__btn');
  //기본으로 첫번째 페이지네이션 버튼에 now더해주기
  resultBtns[0].classList.add('now')
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 디스커션 추가기능
const addToDiscussion = function(event){
  event.preventDefault();
  const nameVal = document.querySelector('#name').value
  const titleVal = document.querySelector('#title').value
  const questionVal = document.querySelector('#story').value

  const newObj = {
    id: window.localStorage.length,
    createdAt: new Date().toISOString(),
    title: titleVal,
    url:'/',
    author: nameVal,
    answer: null,
    avatarUrl: "https://picsum.photos/48/48"
  }

  agoraStatesDiscussions.unshift(newObj)
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]))
  //localStorage에 저장하기
  localStorage.setItem(window.localStorage.length,JSON.stringify(agoraStatesDiscussions[0]))
  window.location.reload()
}

const submitform = document.querySelector('form.form');
submitform.addEventListener('submit',addToDiscussion)

