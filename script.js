// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// 페이지 네이션, 디스커션 유지
// + 시간순 나열, notice 는 고정 + 검색(제목 , 저자)
// 랜덤 아바타 이미지 


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// data > notice + others 분리
const convertToNotice = (obj) =>{
  const li = document.createElement("li");
  li.className = "discussion__container";
  li.id = obj.id;

  //li > avatarWrapper , discussionContent, discussionAnswered
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
 
  //avatarWrapper > avartarImg(src, alt)
  const avartarImg = document.createElement("img");
  avartarImg.className = "discussion__avatar--wrapper--img";
  avartarImg.setAttribute("src", obj.avatarUrl);
  avartarImg.setAttribute("alt", obj.author);
  avatarWrapper.append(avartarImg);

  //discussionContent > disscussion_title(h2>a), discussion__information
  const discussionTitle = document.createElement("h2");
  discussionTitle.setAttribute("class", "discussion_title");
  const discussionTitleA = document.createElement("a");
  discussionTitleA.setAttribute("href", obj.url);
  discussionTitleA.textContent =  obj.title;
  discussionTitle.append(discussionTitleA);

  //discussion__information
  const discussionInfo = document.createElement("div");
  discussionInfo.setAttribute("class", "discussion__information");
  // discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`; //현지시각 반영
  discussionContent.append(discussionTitle, discussionInfo);

  //discussionAnswered > p
  const answerChecked = document.createElement("p");
  answerChecked.textContent = obj.answer === null ? '☒' : '☑';
  discussionAnswered.append(answerChecked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;

}
const convertToDiscussion = (obj) => {
  // const container = document.createElement("div");
  
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  li.id = obj.id;

  //li > avatarWrapper , discussionContent, discussionAnswered
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
 
  //avatarWrapper > avartarImg(src, alt)
  const avartarImg = document.createElement("img");
  avartarImg.className = "discussion__avatar--wrapper--img";
  avartarImg.setAttribute("src", obj.avatarUrl);
  avartarImg.setAttribute("alt", obj.author);
  avatarWrapper.append(avartarImg);

  //discussionContent > disscussion_title(h2>a), discussion__information
  const discussionTitle = document.createElement("h2");
  discussionTitle.setAttribute("class", "discussion_title");
  const discussionTitleA = document.createElement("a");
  discussionTitleA.setAttribute("href", obj.url);
  discussionTitleA.textContent =  obj.title;
  discussionTitle.append(discussionTitleA);

  //discussion__information
  const discussionInfo = document.createElement("div");
  discussionInfo.setAttribute("class", "discussion__information");
  // discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`; //현지시각 반영
  discussionContent.append(discussionTitle, discussionInfo);

  //discussionAnswered > p
  const answerChecked = document.createElement("p");
  answerChecked.textContent = obj.answer === null ? '☒' : '☑';
  discussionAnswered.append(answerChecked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  // container.append(li);

  // return container;
  return li;
};


// discussion 추가

const discussionForm = document.querySelector('.form');

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
const savedLocalDiscussion = (value) => {
  //value 값 = js 값 을 JSON 문자열로 반환
  localStorage.setItem("local__discussion", JSON.stringify(value));
}

const submitDiscussion = (event) => {
  const newDiscussion = {
    id : localDiscussion().length + 1,
    createdAt : new Date().toISOString(),
    title : event.target[1].value,
    author : event.target[0].value,

    url : "",
    avatarUrl:`https://picsum.photos/seed/${event.target[0].value}/200/200`,

  }
  //form 입력칸 리셋  
  event.target[0].value = "";
  event.target[1].value = "";
  event.target[2].value = "";
  console.log(newDiscussion);

  const updatedDiscussion = [newDiscussion, ...localDiscussion()];  //기존의 localDiscussion()에 unshift 
  
  savedLocalDiscussion(updatedDiscussion); //key, value 저장
}

discussionForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitDiscussion(event);
  rendering(1);
  
});
// discussion 추가
// const form= document.querySelector('.form__container');
// let elInputUserName = document.querySelector('#name');
// let elInputTitle = document.querySelector('#title');
// let elInputTextBox = document.querySelector('#story');

// form.addEventListener('submit', function(e) {
//   e.preventDefault();

//   const newDiscussion = {
//     createdAt : new Date().toLocaleString(),
//     title : elInputTitle.value,
//     url: "https://github.com/codestates-seb/agora-states-fe/discussions",
//     author : elInputUserName.value,
//     answer : null,
//     bodyHTML : elInputTextBox.value,
//     avatarUrl : 'https://velog.velcdn.com/images/jeongjwon/profile/b4c71781-8b27-4f09-bb22-400d72d0e8cc/image.png'
//   };
  
  
//  agoraStatesDiscussions.unshift(newDiscussion);
//  const newArr = convertToDiscussion(newDiscussion);
//  ul.prepend(newArr);
// });




// 페이지네이션

const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');
const paginationBtns = document.querySelector('#pagination-numbers');
const paginationLimit = 10;
let currentPage;

const makePaginationBtn = (index) => {
  const paginationBtn = document.createElement("button");
  paginationBtn.setAttribute('class','pagination-number');
  paginationBtn.innerHTML = index;
  paginationBtn.setAttribute('page-index', index);
  paginationBtn.setAttribute('label', 'Page' + index);

  paginationBtns.append(paginationBtn);
  
}
const getPaginationBtns = () => {
  paginationBtns.innerHTML = "";
  const {noticeDiscussions, othersDiscussions} = seperateDiscussion();
  const pageCount = Math.ceil(othersDiscussions.length / Number(paginationLimit));
  for(let i = 1;  i <= pageCount ; i++){
    makePaginationBtn(i);
  }
  return {noticeDiscussions, othersDiscussions};
}
const setCurrentPage = (pageNum) => {
  currentPage = pageNum;//현재페이지 설정

  const prevRange = (pageNum - 1) * Number(paginationLimit);
  const curRange = pageNum * Number(paginationLimit);

  return {prevRange, curRange};

}
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


const rendering = (num) => {
  console.log('rendering ', num);
    const { noticeDiscussions, othersDiscussions } = getPaginationBtns();
    const { prevRange, curRange } = setCurrentPage(num);

    render(noticeDiscussions, othersDiscussions, prevRange, curRange);
    
    document.querySelectorAll(".pagination-number").forEach((button) => {
      const pageIndex = Number(button.getAttribute('page-index'));
      console.log('pageIndex',pageIndex);
      if(pageIndex){
        button.addEventListener('click', () =>{
          const {prevRange, curRange} = setCurrentPage(pageIndex);
          render(noticeDiscussions, othersDiscussions, prevRange, curRange);
        });
      }
    });  
  };
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (noticeDiscussions, othersDiscussions, prevRange, curRange)=>{ // noticeElement, othersElement) => {
  console.log('render' );
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

window.addEventListener('load', ()=>{
  rendering(1);
})

