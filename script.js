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
  // 이미지를 하나씩 넣어야 함.
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  // 타이틀, 정보 추가
  const discussionTitle = document.createElement("H2")
  discussionTitle.className = "discussion__title";
  const discussionTitleLink = document.createElement("a")
  discussionTitleLink.className = "search__title";
  const discussionInfomation = document.createElement("div")
  discussionInfomation.className = "discussion__information";
  discussionInfomation.textContent = `${obj.author} / ${obj.createdAt}`
  discussionTitleLink.href = obj.url
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink)
  discussionContent.append(discussionTitle, discussionInfomation);

  const discussionAnsweredCheck = document.createElement("div")
  if(obj.answer !== null){
    // 체크표시 추가(이후 답변 여부에 따라 수정해야 함)
    discussionAnswered.append(discussionAnsweredCheck)  
  } else {
    discussionAnsweredCheck.className = "wait-anser"
    discussionAnswered.append(discussionAnsweredCheck)
  }

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다. 가장 하단에서 실행중임.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


const popup = document.querySelector('#layer_popup')
const popupExit = document.querySelector('.form-exit')
const writeForm = document.querySelector('.write_form');

popup.onclick = function() {
  writeForm.classList.remove('hide')
}

popupExit.onclick = function() {
  writeForm.classList.add('hide')
}

const form = document.querySelector('form.form');
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea")

form.addEventListener("submit", (event) => {
  //submit 하면..
  event.preventDefault();
  const newData = {
    id: "unique id" + Math.round(Math.random() * 100000),
    createdAt: new Date().toISOString(), // 현재시간
    title: title.value, // 제목
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value, // 글쓴이
    answer: null,
    bodyHTML: textbox.value, // 질문의내용
    avatarUrl:
    "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
  }

  //새로 쓴 글 위로 오게 하려고
  agoraStatesDiscussions.unshift(newData);
  
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
  render(ul);
  
  writeForm.classList.add('hide');
  title.value = '';
  author.value = '';
  textbox.value = '';
})



/////////////////////////////////////////////////////////

// 페이지에 보여줄 갯수
let rows = document.querySelectorAll('.discussion__container')
const rowsPerPage = 10;
const rowsCount = rows.length;
const pageCount = Math.ceil(rowsCount / rowsPerPage);
const numbers = document.querySelector('#numbers');

let pageNumber = 0; // 이거 idx 값 받아와서 반영하는 게 좋을듯?
const prevPageBtn = document.querySelector('.prevBtn');
const nextPageBtn = document.querySelector('.nextBtn');

// 이전버튼, 다음버튼

prevPageBtn.addEventListener('click', ()=>{
  if(pageNumber !== 0){
    pageNumber -= 1
    displayRow(pageNumber);
  }
})

nextPageBtn.addEventListener('click', ()=>{
    // if문 쓰기, 0이 아닐 때 어쩌구..
    if(pageNumber !== pageCount-1){
      pageNumber += 1
      displayRow(pageNumber);  
    }
})

// 페이지네이션 생성
function paginationRe() {
for(let i = 1; i <= pageCount; i++){
	numbers.innerHTML += `<li><a href="">${i}</a></li>`
}
}

paginationRe()

const numberBtn = numbers.querySelectorAll('a');

numberBtn.forEach((item,idx)=>{
	item.addEventListener('click', (e)=>{
    e.preventDefault();
    
    // 출력 함수
    displayRow(idx)
	});
});

// 새로 랜더하면 밑의 함수가 안 됨..*

function displayRow(idx){
  let start = idx*rowsPerPage;
  let end = start+rowsPerPage;
  // let rowsArray = Array.from(rows)
  let rowsArray = [...rows];
  
  for(let ra of rowsArray){
    ra.style.display = 'none';
  }
  
  let newRows = rowsArray.slice(start,end);
  
  for(let nr of newRows){
    nr.style.display = '';
  }
  for(let nb of numberBtn){
    nb.classList.remove('active');
  }
  numberBtn[idx].classList.add('active');
  pageNumber = idx;
}

displayRow(0);

/////////////////////////////////////////////////////////


const paginationHide = document.querySelector(".pagination")
const searchVar = document.querySelector('#search')

searchVar.onkeyup = function() {
  if (window.event.keyCode == 13) {
    searchVar.value = '';
    render(ul);
    paginationHide.style.display = "";
  }
  else{
    filter()
  }
}

function filter() {
  let search = document.getElementById("search").value.toLowerCase();
//let rows = document.querySelectorAll('.discussion__container')
 
  paginationHide.style.display = "none";
  for (let i = 0; i < rows.length; i++) {
      titleDate = rows[i].getElementsByClassName("search__title");
      if (titleDate[0].innerHTML.toLowerCase().indexOf(search) != -1) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
  }
}


// 하단은 내가 한 방법인데, 이러면 새로운 li를 제일 위에 생성하게 되므로 페이지가 넘어가도 생성한 li가 계속 상단에 있게 되는 문제가 발생..
// 또한 내용이 너무 길어져서 위의 방식으로 하는 게 맞는듯. 나중에 공부용으로 남겨둔다. submit 부분이 삭제되서 이전 파일 참고해야함.

// function handleSubmit(event) {
//   event.preventDefault()
// }

// const elUserId = document.querySelector('#user-id')
// const elUserName = document.querySelector('#user-name')
// const elStory = document.querySelector('#story')

// submit.onclick = function() {
  //   if(elUserId.value !== '' && elUserName.value !== '' && elStory.value !== ''){
//     const firstLi = document.querySelector('.discussion__container')
//     firstLi.after(convertDiscussion());
//     //위쪽은 일단 공지사항 반영을 위해 저렇게 박아두었따.. 페이지가 넘어가면 어떻게 해야할지 생각해야할듯
//     // ul.prepend(convertDiscussion()); 
//     writeForm.classList.add('hide');
    
//     elUserId.value = '';
//     elUserName.value = '';
//     elStory.value = '';
//   }
// }



// function convertDiscussion() {
//   const randomNum3 = Math.floor(Math.random() * 41 + 1);

//   const li = document.createElement("li"); // li 요소 생성
//   li.className = "discussion__container"; // 클래스 이름 지정

//   const avatarWrapper = document.createElement("div");
//   avatarWrapper.className = "discussion__avatar--wrapper";
//   const discussionContent = document.createElement("div");
//   discussionContent.className = "discussion__content";
//   const discussionAnswered = document.createElement("div");
//   discussionAnswered.className = "discussion__answered";

//   // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
//   // 이미지를 하나씩 넣어야 함.
//   const avatarImg = document.createElement('img');
//   avatarImg.src = agoraStatesDiscussions[randomNum3].avatarUrl;
//   avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[randomNum3].author;
//   avatarImg.className = "discussion__avatar--image";
//   avatarWrapper.append(avatarImg);

//   // 타이틀, 정보 추가
//   const discussionTitle = document.createElement("H2")
//   discussionTitle.className = "discussion__title";
//   // 이렇게 createElement로 추가하는 방법 말고 하단 innerHTML을 통해 하는 게 나을 수도 있을듯. 이건 좀 더 찾아보자. **
//   const discussionTitleLink = document.createElement("a")
//   const discussionInfomation = document.createElement("div")
//   discussionInfomation.className = "discussion__information";
//   discussionInfomation.textContent = `${elUserId.value} / 현재시간`
//   discussionTitleLink.href = agoraStatesDiscussions[randomNum3].url
//   discussionTitleLink.textContent = elUserName.value;
//   discussionTitle.append(discussionTitleLink)
//   discussionContent.append(discussionTitle, discussionInfomation);

//   // 체크표시 추가(이후 답변 여부에 따라 수정해야 함)
//   const discussionAnsweredCheck = document.createElement("div")
//   discussionAnsweredCheck.className = "wait-anser"
//   discussionAnswered.append(discussionAnsweredCheck)

//   li.append(avatarWrapper, discussionContent, discussionAnswered);
//   return li;
// }





