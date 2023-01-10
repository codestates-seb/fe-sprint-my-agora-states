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

  // avatarWrapper
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);

  // discussionContent
  const contentTitle = document.createElement('h2');
  contentTitle.className = 'discussion__title';
  const contentTitleLink = document.createElement('a');
  contentTitleLink.href = obj.url;
  contentTitleLink.textContent = obj.title;
  contentTitle.append(contentTitleLink);

  const contentInfo = document.createElement('div');
  contentInfo.className = 'discussion__information';
  const dt = new Date(obj.createdAt)
  contentInfo.textContent = dt.toLocaleString();
  discussionContent.append(contentTitle, contentInfo);

  // discussionAnswered
  const answered = document.createElement('p');
  answered.textContent = '●';
  answered.className = "answered"
  const nonAnswered = document.createElement('p');
  nonAnswered.textContent = '○';
  nonAnswered.className = "non-answered"
  if (obj.answer !== null){
    discussionAnswered.append(answered);
  } else{
    discussionAnswered.append(nonAnswered);
  }

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const datArr = [];
const render = (element) => {
  const notices = []; // notice는 따로저장
  for (let i = 0; i < 10; i += 1) { //agoraStatesDiscussions.length
    if (agoraStatesDiscussions[i].title.includes('[notice]')) {
      notices.push(agoraStatesDiscussions[i]);
    } else {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    } 
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

/* ----------------------------Local storage 만들기 ------------------------------ */
// submit 이벤트를 사용
// 입력된 값을 객체에 저장
// 객체를 로컬 스토리지에 저장
// data.js의 0번째 인덱스로 로컬스토리지 저장 내용을 불러와서 집어 넣음
// 근데 왜 안되징

const form = document.querySelector("form.form");
const author = document.querySelector("div.form__input--name > input");
const title = document.querySelector("div.form__input--title > input");
const textbox = document.querySelector("div.form__textbox > textarea");

function saveLocal(name, newData){
  const add = localStorage.setItem(name, JSON.stringify(newData));
}

const keysLocal = [];
function outLocal(name){
  const added = JSON.parse(localStorage.getItem(name));
  agoraStatesDiscussions.unshift(added);
  keysLocal.unshift(added);
  // return added;
}

form.addEventListener("submit", (event)=>{
  event.preventDefault(); // 기본동작을 막는다.
  const newData ={
    id: 'unique id' + Math.round(Math.random() * 100000),
    createdAt: new Date().toISOString(), // 현재시간을 입력
    title: title.value,
    url: "",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl: "https://c-fa.cdn.smule.com/rs-s26/arr/63/46/a03e127d-5066-4368-b4f3-22d81c32480a.jpg"
  }
  
  saveLocal(newData.id, newData);
  outLocal(newData.id);

  while (ul.firstChild){
    ul.removeChild(ul.firstChild);
  }
  render(ul);

  author.value ='';
  title.value ='';
  textbox.value ='';

  console.log('여기');
  console.log(keysLocal);
});

for(i = 0; i < keysLocal.length; i++){
  ul.append(convertToDiscussion(keysLocal[i]));
}

// window.onbeforeunload = function() {
//   ul.append(convertToDiscussion(agoraStatesDiscussions[0]));
// };




/*-----------------------------------------------------------------------------*/

// paging
const rowsPerPage = 10; // 한 페이지에 게시글 10개
const rows = [...agoraStatesDiscussions]; //querySelectAll은 유사 배열로 리턴함
const rowsCount = agoraStatesDiscussions.length;
const pageCount = Math.ceil(rowsCount/rowsPerPage);
const numbers = document.querySelector('.pagination')

// 페이지네이션 생성
// 아래 li를 페이지 개수만큼 생성 -> pagecount
// 대상.innerHtml = <li><a href =''>1</a></li>

for(let i = 1; i<=pageCount; i++){
  numbers.innerHTML += `<li class = li__page ><a href = '' class = page ${i}>${i}</a></li>` // a 태그 안에 페이징 정보 담김
}

// 페이지 번호 클릭하면 이동하기
const numberBtn = numbers.querySelectorAll('a'); // a 태그 요소만 저장
numberBtn.forEach((item, index)=>{ //numbers의 모든 아이템과 인덱스를 받아서
  item.addEventListener('click', (el)=>{ // item이 클릭될 때마다 이벤트를 실행시킴
    el.preventDefault(); // .preventDefault()메소드는 a 요소의 기본 기능을 없앤다. 
    for(nb of numberBtn){ // 클릭된 페이지만 active를 위해
      nb.classList.remove('active'); // 모든 페이지를 비활성화하고 
    } 
    el.target.classList.add('active'); // el.target은 function의 this와 같은 역할 // 클릭한 요소에 active 클래스를 추가함 
    
    // 테이블 출력함수 만들기
    displayRow(index);
  });
}); // numberBtn

function displayRow(index){
  let start = index * rowsPerPage; // 1이라면 discussions data 10 인덱스부터 출력
  let end = start + rowsPerPage; // start에서 10개 더 보여주기 위함

  while (ul.firstChild){
    ul.removeChild(ul.firstChild);
  }

  for(i = start; i < end; i++){
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
} //displayRow

