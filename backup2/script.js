// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
fetch('http://localhost:4000/discussions')
  .then(res => res.json())
  .then(json => {
    agoraStatesDiscussions = json;
    render(ul);
    displayRow(0);
  })

// js 스크립트로 가져오는 data
// console.log(agoraStatesDiscussions);

let paginationCheck = 0;

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

const popup = document.querySelector('#layer_popup')
const resetKEY = document.querySelector('.writing-delet')
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
const textbox = form.querySelector("div.form__textbox > textarea");
let dataSave = [];

function savedDate() {
    localStorage.setItem('savedata', JSON.stringify(dataSave));
}

form.addEventListener("submit", (event) => {
  //submit 하면..
  event.preventDefault();
  const newData = {
    id: Math.round(Math.random() * 100000),
    createdAt: new Date().toISOString(), // 현재시간
    title: title.value, // 제목
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value, // 글쓴이
    answer: null,
    bodyHTML: textbox.value, // 질문의내용
    avatarUrl:
    "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
  }

  fetch('http://localhost:4000/discussions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData),
    })
    .then(json => {
      agoraStatesDiscussions = json;
      render(ul);
      displayRow(0);
    })

  //(02.09)이제 이걸 서버로 put 해줘야하는거네..
  // dataSave.push(newData)
  // agoraStatesDiscussions.unshift(newData);
  // savedDate()
  
  // while (ul.firstChild) {
  //   ul.removeChild(ul.firstChild)
  // }
  // render(ul);
  // displayRow(0);

  
  writeForm.classList.add('hide');
  title.value = '';
  author.value = '';
  textbox.value = '';
})

const savedDateArray = localStorage.getItem('savedata')

// if(savedDateArray){
//   const parseData = JSON.parse(savedDateArray)
//   // parseData.forEach(() => {
//   //   console.log(dataSave)
//   // });
//   for(let index in parseData) {
//     let p = parseData[index]
//     // p의 index가 8개라서 8번 반복됨. 내가 가져온 블로그에선 왜 하단의 for in문을 썼는지 궁금해서 남겨둔다.
//     // for(let key in p){
//     //   console.log(`${p.author} + ${p.title} + ${p.createdAt}`)
//     // }

//     agoraStatesDiscussions.unshift(p);
//     /* 배열을 가장 상단 파일에 넣을 수 있다면 그보다 좋은 게 없지않을까... */
//   }
//   render(ul);
// }

// if(savedDateArray !== null){
//   const parseData = JSON.parse(savedDateArray);
//   dataSave = parseData;
// } else {
//   render(ul)
// }

resetKEY.onclick = function() {
  fetch('http://localhost:4000/discussions', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({}),
  })
  .then(res => res.json())
  .then(json => {
    agoraStatesDiscussions = json;
    render(ul);
    displayRow(0);
  })
}


/////////////////////////////////////////////////////////

// 페이지에 보여줄 갯수
// const rows = document.querySelectorAll('.discussion__container')

const rowsPerPage = 10;

// 하아..
const rowsCount = 43;
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

//페이지에 흩뿌리기
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
  // 여기서 discussion__container을 다시 불러오면 해결될 거 같아서 재할당 했더니 됐다..! 이제 최대 5개까지인 걸 적용하면 될듯?
  let rowss = document.querySelectorAll('.discussion__container')
  
  let start = idx*rowsPerPage;
  let end = start+rowsPerPage;
  // let rowsArray = Array.from(rows)
  let rowsArray = [...rowss];
 
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


// ★★★★★여기 수정해야함 안 하면 페이지네이션 안 됨★★★★★
// displayRow(0);

/////////////////////////////////////////////////////////


const paginationHide = document.querySelector(".pagination")
const searchVar = document.querySelector('#search')

searchVar.onkeyup = function() {
  if (window.event.keyCode == 13) {
    searchVar.value = '';
    // 여기서도 페이지네이션이 제대로 적용 안 되는데 흠.... 이건 어떻게 해결할지 나중에 생각해보는 거로..
    render(ul);
    displayRow(0);
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

///////////////////////


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다. 가장 하단에서 실행중임.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
  element.append(convertToDiscussion(agoraStatesDiscussions[i]));
}
return;
};


/////////////////////////


// 하단은 내가 처음 한 방법인데, 이러면 새로운 li를 제일 위에 생성하게 되므로 페이지가 넘어가도 생성한 li가 계속 상단에 있게 되는 문제가 발생..
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


