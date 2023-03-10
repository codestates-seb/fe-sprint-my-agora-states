// // index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

// // data > notice + others 분리

// //notice discussion 나열
const convertToNotice = (obj) =>{
  const li = document.createElement("li");
  li.className = "discussion__container_li";
  li.id = obj.id;
 
  //li > div.userInfoSection + div.discussionSection
  //div.userInfoSection > avatarWrapper(avatarImg) + discussionInfo(author/date)
  //div.discussionSection > discussionContent(discussionTitle(discussionTitleA))
  const userInfoSection = document.createElement("div");
  userInfoSection.setAttribute('class', 'user_info_section');

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--wrapper--img";
  avatarImg.setAttribute("src", obj.avatarUrl);
  avatarImg.setAttribute("alt", obj.author);
  avatarWrapper.append(avatarImg);

  const discussionInfo = document.createElement("div");
  discussionInfo.setAttribute("class", "discussion__information");
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`; //현지시각 반영

  userInfoSection.append(avatarWrapper, discussionInfo);


  const discussionSection = document.createElement("div");
  discussionSection.setAttribute('class', 'discussion_section');

  const discussionTitle = document.createElement("div");
  discussionTitle.setAttribute("class", "discussion_title");
  const discussionTitleA = document.createElement("a");
  discussionTitleA.setAttribute("href", obj.url);
  discussionTitleA.setAttribute("class", "noticeA");
  discussionTitleA.textContent =  obj.title;
  discussionTitle.append(discussionTitleA);

  
  
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  discussionAnswered.innerHTML = obj.answer === null ? 
  '' : `<button><i class="fa-regular fa-comment"></i><span>${obj.answer.length}</span></button`;
  
  discussionSection.append(discussionTitle,discussionAnswered );
  
  const li_container = document.createElement("div");
  li_container.setAttribute("class", "li_container");
  li_container.append(userInfoSection, discussionSection);
 
  li.append(li_container);

  // 변경 전
  //li > div , avatarWrapper , discussionContent, discussionAnswered
  // const avatarWrapper = document.createElement("div");
  // avatarWrapper.className = "discussion__avatar--wrapper";

  //avatarWrapper > avartarImg(src, alt)
  // const avartarImg = document.createElement("img");
  // avartarImg.className = "discussion__avatar--wrapper--img";
  // avartarImg.setAttribute("src", obj.avatarUrl);
  // avartarImg.setAttribute("alt", obj.author);
  // avatarWrapper.append(avartarImg);

  //discussionContent > disscussion_title(h2>a), discussion__information
  // const discussionTitle = document.createElement("h2");
  // discussionTitle.setAttribute("class", "discussion_title");
  // const discussionTitleA = document.createElement("a");
  // discussionTitleA.setAttribute("href", obj.url);
  // discussionTitleA.setAttribute("class", "noticeA");
  // discussionTitleA.textContent =  obj.title;
  // discussionTitle.append(discussionTitleA);

  //discussion__information
  // const discussionInfo = document.createElement("div");
  // discussionInfo.setAttribute("class", "discussion__information");
  // // discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  // discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`; //현지시각 반영
  // discussionContent.append(discussionTitle, discussionInfo);

  //discussionAnswered > p
  // const answerAnswered = document.createElement("p");
  // answerAnswered.innerHTML = obj.answer === null ? '' : `<button><i class="fa-regular fa-comment"></i><span>${obj.answer.length}</span></button`;
  // discussionAnswered.append(answerChecked);

  // const li_container = document.createElement("div");
  // li_container.setAttribute("class", "li_container");
  // li_container.append(avatarWrapper, discussionContent, discussionAnswered);
  
  // li.append(li_container);
  return li;

}
// others discussion 나열
const convertToDiscussion = (obj) => {

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  li.id = obj.id;

  const userInfoSection = document.createElement("div");
  userInfoSection.setAttribute('class', 'user_info_section');

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avartarImg = document.createElement("img");
  avartarImg.className = "discussion__avatar--wrapper--img";
  avartarImg.setAttribute("src", obj.avatarUrl);
  avartarImg.setAttribute("alt", obj.author);
  avatarWrapper.append(avartarImg);

  const discussionInfo = document.createElement("div");
  discussionInfo.setAttribute("class", "discussion__information");
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`; //현지시각 반영

  userInfoSection.append(avatarWrapper, discussionInfo);


  const discussionSection = document.createElement("div");
  discussionSection.setAttribute('class', 'discussion_section');
  
  const discussionTitle = document.createElement("div");
  discussionTitle.setAttribute("class", "discussion_title");
  const discussionTitleA = document.createElement("a");
  discussionTitleA.setAttribute("href", obj.url);
  discussionTitleA.setAttribute("class", "othersA");
  discussionTitleA.textContent =  obj.title;
  discussionTitle.append(discussionTitleA);
 
 
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  discussionAnswered.innerHTML = obj.answer === null ? 
  `<button><i class="fa-regular fa-comment"></i></button><span>0</span>` : `<button><i class="fa-solid fa-comment"></i></button><span>${[obj.answer].length}</span>`;

 discussionSection.append(discussionTitle,discussionAnswered );

 const li_container = document.createElement("div");
 li_container.setAttribute("class", "li_container");
 li_container.append(userInfoSection, discussionSection);

 li.append(li_container);

//  변경 전
  // li > div.UserInfo + div.discussionSection  (.discussion_container {display:flex; flex-direction:column;})
  // div.UserInfo > avatarWrapper + discussionInfo 
  // div.discussionSection > discussionContent(discussionTitle + discussionTitleA) + discussionAnswered

  // discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  //  discussionContent.append(discussionTitle);
  // const discussion

  //li > avatarWrapper , discussionContent, discussionAnswered
  // const avatarWrapper = document.createElement("div");
  // avatarWrapper.className = "discussion__avatar--wrapper";
  // const discussionContent = document.createElement("div");
  // discussionContent.className = "discussion__content";
  // const discussionAnswered = document.createElement("div");
  // discussionAnswered.className = "discussion__answered";
 
  // //avatarWrapper > avartarImg(src, alt)
  // const avartarImg = document.createElement("img");
  // avartarImg.className = "discussion__avatar--wrapper--img";
  // avartarImg.setAttribute("src", obj.avatarUrl);
  // avartarImg.setAttribute("alt", obj.author);
  // avatarWrapper.append(avartarImg);

  //discussionContent > disscussion_title(h2>a), discussion__information
  // const discussionTitle = document.createElement("h2");
  // discussionTitle.setAttribute("class", "discussion_title");
  // const discussionTitleA = document.createElement("a");
  // discussionTitleA.setAttribute("href", obj.url);
  // discussionTitleA.setAttribute("class", "othersA");
  // discussionTitleA.textContent =  obj.title;
  // discussionTitle.append(discussionTitleA);

  //discussion__information
  // const discussionInfo = document.createElement("div");
  // discussionInfo.setAttribute("class", "discussion__information");
  // // discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  // discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`; //현지시각 반영
  // discussionContent.append(discussionTitle, discussionInfo);

  //discussionAnswered 
  // discussionAnswered.innerHTML = obj.answer === null ? `<button><i class="fa-regular fa-comment"></i></button><span>0</span>` : `<button><i class="fa-solid fa-comment"></i></button><span>${[obj.answer].length}</span>`;
 
  // const li_container = document.createElement("div");
  // li_container.setAttribute("class", "li_container");
  // li_container.append(avatarWrapper, discussionContent, discussionAnswered);
 
  // li.append(li_container);
 
  return li;
};
// discussion 추가

const discussionForm = document.querySelector('.form');

//로컬 스토리지 데이터 받아오기
const localDiscussion = () => {
  //localstorage에 저장된 local_discussion 을 얻어옴
  const savedDiscussion = localStorage.getItem("local__discussion"); 
  if(savedDiscussion === null){
    return [];
  }
  else {
    return JSON.parse(savedDiscussion);
   } //JSON 문자열을 js 객체로 반환
};

// 로컬 스토리지에 데이터 저장하기
const savedLocalDiscussion = (value) => {
  //value 값 = js 값 을 JSON 문자열로 반환
  localStorage.setItem("local__discussion", JSON.stringify(value));
}

// submit 이벤트 리스너
const submitDiscussion = (event) => {
  const newDiscussion = {
    id : localDiscussion().length + 1,
    createdAt : new Date().toISOString(),
    title : event.target[1].value,
    author : event.target[0].value,
    answer : null,
    url : "",
    avatarUrl:`https://picsum.photos/seed/${event.target[0].value}/200/200`,

  }
  //form 입력칸 리셋  
  event.target[0].value = "";
  event.target[1].value = "";
  event.target[2].value = "";

  const updatedDiscussion = [newDiscussion, ...localDiscussion()];  //기존의 localDiscussion()에 unshift 
  
  savedLocalDiscussion(updatedDiscussion); //key, value 저장
}

discussionForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitDiscussion(event);
  rendering(1);
  setActivePage();
  setToggleIcon();
  
});



// 페이지네이션

const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const paginationBtns = document.querySelector('#pagination-numbers');
const paginationLimit = 10;
let currentPage;

// 페이지 버튼 만들기
const makePaginationBtn = (index) => {
  const paginationBtn = document.createElement("button");
  paginationBtn.setAttribute('class','pagination-number');
  paginationBtn.innerHTML = index;
  paginationBtn.setAttribute('page-index', index);
  paginationBtn.setAttribute('label', 'Page' + index);

  paginationBtns.append(paginationBtn);
  
}

// discussion 을 돌면서 페이지 버튼을 동적을 생성하면서 discussion 분류
const getPaginationBtns = () => {
  paginationBtns.innerHTML = "";
  const {noticeDiscussions, othersDiscussions} = seperateDiscussion();
  const pageCount = Math.ceil(othersDiscussions.length / Number(paginationLimit));
  for(let i = 1;  i <= pageCount ; i++){
    makePaginationBtn(i);
  }
  return {noticeDiscussions, othersDiscussions};
}

// 현재 페이지, 배열의 범위 알아오기
const setCurrentPage = (pageNum) => {
  currentPage = pageNum;//현재페이지 설정

  setActivePage();
  handlePageSetting();

  const prevRange = (pageNum - 1) * Number(paginationLimit);
  const curRange = pageNum * Number(paginationLimit);

  return {prevRange, curRange};

}

//현재 페이지 표시하기 - active class 추가
const setActivePage = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute('page-index'));
    if(pageIndex === currentPage){
      button.classList.add("active");
    }
  });
};

//notice + others 분류하기
const seperateDiscussion = () => {
  let localDiscussion = JSON.parse(localStorage.getItem("local__discussion"));
  if(localDiscussion === null) localDiscussion = [];
  const allDiscussions = localDiscussion.concat(agoraStatesDiscussions);


  return{
    noticeDiscussions : allDiscussions.filter((e) => e.author === 'kimploo'),
    othersDiscussions : allDiscussions.filter((e) => e.author !== 'kimploo')
  };
}
//이전, 다음 페이지 버튼 설정
const handlePageSetting = () => {
  pageCount = paginationBtns.querySelectorAll("button").length;

  if (currentPage === 1) {
    disableButton(prevBtn);
  } else {
    enableButton(prevBtn);
  }

  if (pageCount === currentPage) {
    disableButton(nextBtn);
  } else {
    enableButton(nextBtn);
  }
}

//렌더링
const rendering = (num) => {
  
    const { noticeDiscussions, othersDiscussions } = getPaginationBtns();
    const { prevRange, curRange } = setCurrentPage(num);
    
    const noticeTitle = document.querySelector(".notice_discussion_container").children[2];
    noticeTitle.textContent = `Notice(${noticeDiscussions.length})`;
    
    const othersTitle = document.querySelector(".others_discussion_container").children[0];
    othersTitle.textContent = `Discussions(${othersDiscussions.length})`
    
    render(noticeDiscussions, othersDiscussions, prevRange, curRange);
    
    document.querySelectorAll(".pagination-number").forEach((button) => {
      const pageIndex = Number(button.getAttribute('page-index'));
     
      if(pageIndex){
        button.addEventListener('click', () =>{
          const {prevRange, curRange} = setCurrentPage(pageIndex);
          render(noticeDiscussions, othersDiscussions, prevRange, curRange);
          moveToBottom();
        });
      }
    });  
  };
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (noticeDiscussions, othersDiscussions, prevRange, curRange)=>{ // noticeElement, othersElement) => {
  
  const ul = document.querySelectorAll(".discussions__container");
  ul.forEach((e) => {
    e.innerHTML ="";
  })
  noticeDiscussions.forEach((noticeDiscussion)=>{
    ul[0].append(convertToNotice(noticeDiscussion));
    
  })
  othersDiscussions.forEach((otherDiscussion, index)=>{
    if(index >= prevRange && index < curRange){
      ul[1].append(convertToDiscussion(otherDiscussion));
    }
  
  })
  return;
};

//disable 활성화
const disableButton = (button) => {
  button.classList.add("disabled");
}
//enable 활성화
const enableButton = (button) => {
  button.classList.remove("disabled");
}

window.addEventListener('load', ()=>{
  rendering(1);
  setActivePage();
  moveToBottom();
})


//토글 기능 - 클릭 이벤트 시 discussion을 펼쳤다가 접기
const toggleOpenBtn = document.querySelector('.toggleOpen');
const toggleCloseBtn = document.querySelector('.toggleClose');

toggleOpenBtn.addEventListener('click', () =>{
  disableButton(toggleOpenBtn);
  enableButton(toggleCloseBtn);
  const noticeEl = document.querySelectorAll('.discussion__container_li');
  noticeEl.forEach((e)=>{

    disableButton(e);
  })
});
toggleCloseBtn.addEventListener('click', () => {
  disableButton(toggleCloseBtn);
  enableButton(toggleOpenBtn);

  const noticeEl = document.querySelectorAll('.discussion__container_li');
  noticeEl.forEach((e)=>{
    enableButton(e);
  })
});

//이전 버튼 이벤트 리스너
prevBtn.addEventListener('click', () =>{
  rendering(currentPage - 1);
  moveToBottom();
  
});
//다음 버튼 이벤트 리스너
nextBtn.addEventListener('click', () => {
  rendering(currentPage + 1);
  moveToBottom();
});


const topBtn = document.querySelector('.topBtn');
//스크롤 감지하여 topBtn display 조절
const checkScroll = () => {
  let pageYOffset = window.pageYOffset;
  if(pageYOffset !== 0){

    topBtn.classList.remove('disabled');
  }else{
    topBtn.classList.add('disabled');
  }
}
//위로 내려가기
const moveToTop = () => {
  if(window.pageYOffset > 0){
    window.scrollTo({top:0, behavior:"smooth"});
  }
}
//아래로 내려가기
const moveToBottom = () => {
  window.scrollTo(0,document.body.scrollHeight, 'smooth');
  
}

//마우스 scroll 이벤트 리스너
window.addEventListener('scroll', checkScroll);

//top 버튼 이벤트 리스너
topBtn.addEventListener('click', moveToTop);

//filter
// const filter = (num) => {
//   const inputSearchText = document.querySelector('#input_search_text');
//   console.log(inputSearchText);
//   const {noticeDiscussions, othersDiscussions} = seperateDiscussion();

//   const filterNoticeDiscussions = noticeDiscussions.filter((e)=> e.title.includes(inputSearchText));
//   const filterOthersDiscussions = othersDiscussions.filter((e)=> e.title.includes(inputSearchText));


//   const { prevRange, curRange } = setCurrentPage(num);
   
//   render(filterNoticeDiscussions, filterOthersDiscussions,prevRange, curRange);
 
// }

// const searchIcon = document.querySelector('.search_icon');
// const searchLabel = document.querySelector('.search_container_label');
// searchIcon.addEventListener('click', ()=>{
  
//   filter(1);
// });