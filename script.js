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

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // 이미지 추가
  const avatarsImg = document.createElement('img');
    avatarsImg.className = "discussion__avatar--image"
    avatarsImg.src = obj.avatarUrl;
    avatarsImg.alt = 'avatar of '+ obj.author;
    avatarWrapper.append(avatarsImg);

  // 제목 추가
  const discussTitle = document.createElement("h2");
  discussTitle.className = 'discuission_title';
  // discussionContent.append(discussTitle);

  const titleLink = document.createElement("a");
  titleLink.setAttribute('href', obj.url);
  titleLink.textContent = obj.title;
  discussTitle.append(titleLink);

  // 작성자/시간 추가
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toISOString()}`; //toLocalString
  discussionContent.append(discussTitle, discussionInformation);

  // 체크 추가
  const paraCheck = document.createElement('p');
  // paraCheck.textContent = '☑';
  paraCheck.textContent = obj.answer ? '☑' : 'x';
  discussionAnswered.append(paraCheck);



  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (ul) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


// 디스커션 추가


const form = document.querySelector('form.form');
const inputName = document.querySelector('.form__input-name > input');
const inputTitle = document.querySelector('.form__input-title > input');
const inputQuestion = document.querySelector('.form__input-text > textarea');


form.addEventListener('submit', (event) => {
  event.preventDefault()
  const obj = {
    id: "0won",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  // 기존 데이터 가장 앞에 추가
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  inputName.value = '';
  inputTitle.value = '';
  inputQuestion.value = '';
})



// 페이징 처리

// const main = document.querySelector('main');
// const pageButtons = document.createElement('div');
// pageButtons.classList = 'buttons';
// main.append(pageButtons);

// const buttons = document.querySelector('.buttons');

// const numOfContent = agoraStatesDiscussions.length;
// const showContent = 10;
// const showButton = 5;
// const maxPage = Math.ceil(numOfContent / 10);
// let page = 1;




// const makeButton = (id) => {
//   const button = document.createElement("button");
//   button.classList.add('button');
//   button.dataset.num = id;
//   button.textContent = id;
//   button.addEventListener('click', (e) => {
//     Array.prototype.forEach.call(buttons.children, (button) => {
//       if(button.dataset.num) button.classList.remove("active");
//     });
//     e.target.classList.add('active');
//     renderContent(parseInt(e.target.dataset.num));
//   });
//   return button;
// }

// const renderContent = (page) => {
//   // 목록 리스트 초기화
  

//   while(contents.hasChildNodes()) {
//     contents.removeChild(contents.lastChild);
//   }

//   // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
//   for(let id = (page -1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
//     contens.appendChild(makeContent(id));
//   }
// };

// const renderButton = (page) => {
//   // 버튼 리스트 초기화
//   while (buttons.hasChildNodes()) {
//     buttons.removeChild(buttons.lastChild);
//   }

//   // 화면에 최대 5개의 페이지 버튼 생성
//   for(let id = page; id < page + 5 && id <= maxPage; id++) {
//     buttons.appendChild(makeButton(id));
//   }
//   // 첫 버튼 활성화 (class = 'active')
//   buttons.childen[0].classList.add('active');

//   buttons.prepend(prev);
//   buttons.append(next);

//   // 이전, 다음 페이지 버튼이 필요한지 체크
//   if(page - 5 < 1) buttons.removeChild(prev);
//   if(page + 5 > maxPage) buttons.removeChild(next);
// };

// const rendering = (page) => {
//   renderButton(page);
// };

// rendering(page);


// const goPrevPage = () => {
//   page -= 5;
//   render(page);
// };

// const goNextPage = () => {
//   page += 5;
//   render(page);
// };

// const prev = document.createElement("button");
// prev.classList.add("button", "prev");
// prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
// prev.addEventListener("click", goPrevPage);

// const next = document.createElement("button");
// next.classList.add("button", "next");
// next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
// next.addEventListener("click", goNextPage);



// let onAdd = document.querySelector('#form');
// let submit = document.querySelector('#submit')

// const dataForm = () => {
  
//   let yourName = document.querySelector('#yourname').value;
//   let yourTitle = document.querySelector('#yourtitle').value;
//   let yourStory = document.querySelector('#yourstory').value;

//   console.log(yourName);
//   console.log(yourTitle);
//   console.log(yourStory);
  

//  agoraStatesDiscussions.unshift({
//     id: null,
//     createdAt: null,
//     title: yourTitle,
//     url: null,
//     author: yourName,
//     answer: {
//       id: "DC_kwDOHOApLM4AKg6M",
//       createdAt: "2022-05-16T02:09:52Z",
//       url: "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236",
//       author: 'abc',
//       bodyHTML:
//         yourStory,
//       avatarUrl: null,
//     },
//     bodyHTML:null ,
//     avatarUrl:
//       "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
//   });
  
//   console.log(agoraStatesDiscussions);
//   convertToDiscussion();
// }

// submit.addEventListener('click', () => {
//   dataForm();
// })


// 모달 

let modal_open = document.querySelector("#add-btn");
let btn_x = document.querySelector('#close1_btn')
let btn_y = document.querySelector('#close2_btn')
let modal = document.querySelector("#modal");

modal_open.onclick = function(){
  console.log("click event")
  modal.classList.add("show");
}

btn_x.onclick = function(){
  console.log("click event");
  modal.classList.remove("show");
}

btn_y.onclick = function(){
  console.log("click event");
  modal.classList.remove("show");
}

submit.onclick = function(){
  console.log("click event");
  modal.classList.remove("show");
}