console.log(agoraStatesDiscussions);




const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); //아바타 사진 요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper";
    const avatarImage = document.createElement('img'); //사진 img 요소 생성
    avatarImage.src = obj.avatarUrl;
    avatarImage.alt = 'avatar of '+obj.author;
    avatarWrapper.append(avatarImage); 
  const discussionContent = document.createElement("div"); // 이름, 제목, 질문내용 담을 콘테이너 요소 생성
  discussionContent.className = "discussion__content";
    const title = document.createElement('h2'); // 제목 h2 요소 생성
    title.className = 'discussion__title';
      const titleLink = document.createElement('a'); // 제목 h2 요소 생성
      titleLink.href = obj.url;
      titleLink.textContent = obj.title;
      title.append(titleLink);
    const information = document.createElement('div'); //  이름/날짜시간 div 요소 생성
    information.className = 'discussion__information';
    information.textContent = obj.author+' / '+obj.createdAt;
    discussionContent.append(title, information);
  const discussionAnswered = document.createElement("div"); // 질문 체크 확인 요소 생성
  discussionAnswered.className = "discussion__answered";
  
  const deleteBoxContainer = document.createElement('div');
  deleteBoxContainer.className = 'delete_box_ontainer';
  const deleteBox = document.createElement('button');
  deleteBox.textContent = '삭제';
  deleteBox.className = 'delete_box';
  deleteBox.addEventListener('click', deleteDiscussion);
  deleteBoxContainer.append(deleteBox);

  li.append(avatarWrapper, discussionContent, discussionAnswered, deleteBoxContainer);
  return li;
};


///////////////////////////////////////////////////////////////////////////
//시간 형식 출력 함수
const returnNowtime = function(){
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 일
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes();  // 분
  let seconds = today.getSeconds();  // 초
  month = ('00'+month.toString()).slice(-2);
  date = ('00'+date.toString()).slice(-2);
  hours = ('00'+hours.toString()).slice(-2);
  isAmPm = Number(('00'+hours.toString()).slice(-2)) >= 12 ? '오후' : '오전';
  minutes = ('00'+minutes.toString()).slice(-2);
  seconds = ('00'+seconds.toString()).slice(-2);
  return `${year}.${month}.${date} - ${isAmPm} ${hours}:${minutes}:${seconds}`;
};
///////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////
//새로운 디스커션 생성 추가 함수
const submitOccur = document.querySelector('.form');
const addDiscussion = function(event){
  event.preventDefault();
  const idValue = document.querySelector('.idValue');
  const titleValue = document.querySelector('.titleValue');
  const questionValue = document.querySelector('.questionValue');
  const addDisscussionData = { //생성하는 li 리스트에 넣을 데이터 객체형식
    id: null,
    createdAt: null,
    title: null,
    url: null,
    author: null,
    bodyHTML: null,
    avatarUrl: null,
  };

  addDisscussionData.id = idValue.value;
  addDisscussionData.title = titleValue.value;
  addDisscussionData.bodyHTML = questionValue.value;
  addDisscussionData.avatarUrl = 'https://avatars.githubusercontent.com/u/77476348?s=64&u=64243db62117de5c254c9a76184753b76d7303ff&v=4';
  addDisscussionData.author = "dubipy"
  addDisscussionData.createdAt= returnNowtime();
  dataFromLocal.unshift(addDisscussionData);
  

  localStorage.setItem('agoraStatesDiscussionsKey' , JSON.stringify(dataFromLocal));

  render(ul);
};
submitOccur.addEventListener('submit', addDiscussion);
///////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////////////////
//디스커션 삭제 함수
const ulul = document.querySelector("ul.discussions__container");
const deleteBox = document.querySelector('.delete_box');

const deleteDiscussion = function(event){
  const li_elements = event.target.parentElement.parentElement;
  const ul_elements = [...li_elements.parentElement.children];
  let event_el_index = ul_elements.indexOf(li_elements);
  console.log(dataFromLocal.length)
  dataFromLocal.splice(event_el_index, 1);  
  console.log(dataFromLocal.length)
  localStorage.setItem('agoraStatesDiscussionsKey' ,JSON.stringify(dataFromLocal));
  render(ul);
};








///////////////////////////////////////////////////////////////////////////
// ///페이지 이동 함수
// const pageMoveLeftButton = document.querySelector('.page_move_left');
// const pageMoveRightButton = document.querySelector('.page_move_right');
// const pageMoveLeft = function(event){
//   start -= 6;
//   end -=6;
//   console.log(start)
//   console.log(end)
//   render(ul, start, end);
// };
// const pageMoveRight = function(event){
//   if(nowpage < Math.ceil(dataFromLocal.length/printNum)){
//     nowpage +=1;  
//   }else{
//     return;
//   }
//   start += printNum; 0~9까지 10~19 20~29 30~39 40~41  
//   if(nowpage === Math.ceil(dataFromLocal.length/printNum)){
//     end  =  (printNum-1) +(dataFromLocal.length % printNum); 
//   }
//   else{
//     end  =  (printNum-1);
//   }
//   consle.log(start)
//   console.log(end)
//   render(ul, start, end);
// };
// pageMoveLeftButton.addEventListener('click',pageMoveLeft );
// pageMoveRightButton.addEventListener('click',pageMoveRight);
// let start =0;
// let end = 6;
// let nowpage = 1;
// let printNum = 10;




if(localStorage.getItem('agoraStatesDiscussionsKey')){
  dataFromLocal = JSON.parse(localStorage.getItem('agoraStatesDiscussionsKey'));
}
else{
  dataFromLocal = agoraStatesDiscussions.slice();
}


///////////////////////////////////////////////////////////////////////////
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const ul = document.querySelector("ul.discussions__container");
const render = (element) => {
  while(ul.firstChild){
    element.removeChild(element.firstChild);
  }
  
  for (let i = 0; i < dataFromLocal.length; i += 1) {
    element.append(convertToDiscussion(dataFromLocal[i]));
  }

  
  return;
};
///////////////////////////////////////////////////////////////////////////

render(ul);








