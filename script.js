// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); //avatarWrapper 라는 div를 만듬
  avatarWrapper.className = "discussion__avatar--wrapper"; //avatarWrapper 의 className은"dis~"
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.





  //img 
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl; 
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  
//title 
  const titleText = document.createElement('h2');
  titleText.className = "discussion__title"

  discussionContent.append(titleText);
//title link
  const titleLink = document.createElement('a');
  titleLink.textContent = obj.title;
  titleLink.href = obj.url;
  titleText.append(titleLink);
//information
  const informationDiv = document.createElement('div');
  const date = ` ${obj.author} / ${obj.createdAt}`
  informationDiv.className = "discussion__information"
  informationDiv.textContent = date;
  discussionContent.append(informationDiv);
//checkbox
  // const checkBox = document.createElement('div');
  // checkBox.className = "discussion__answered"
  // discussionAnswered.append(checkBox);

  const checkBoxP = document.createElement('p')
  checkBoxP.textContent = obj.answer ? "💜": "🆘"; //?=if 앞은 true ,  뒤는 fales
  discussionAnswered.append(checkBoxP);

// TODO}


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


//submit 이라는 함수가 있따.

const elForm = document.querySelector('.form')

elForm.addEventListener('submit',function(event){ 

event.preventDefault()


const formName = event.target[0].value
const formTitle = event.target[1].value
const formQuestion = event.target[2].value

const formObject =  {
  id: "1",
  createdAt: new Date().toISOString(),
  title: formTitle,
  url: "1",
  author: formName,
  answer: null,
  bodyHTML:
  formQuestion,
  avatarUrl:
  "https://avatars.githubusercontent.com/u/86960007?s=64&u=4863a873d78f406d658e8a50d9b91f3045006920&v=4"
  }

ul.prepend(convertToDiscussion(formObject))
agoraStatesDiscussions.unshift(formObject)

console.log(event)
}
)
// // 페이지네이션
// const contents = document.querySelector(".contents");
// const buttons = document.querySelector(".buttons");
// const Id = agoraStatesDiscussions.id

// const numOfContent = 41;
// const maxContent = 10;
// const maxButton = 5;
// const maxPage = Math.ceil(numOfContent / maxContent);
// let page = 1;

// const makeContent = (Id) => {
//   const content = document.createElement("li");
//   content.classList.add("content");
//   content.innerHTML = `
//     <span class="content__id">${Id}</span>
//     <span class="content__title">게시물 제목</span>
//     <span class="content__author">작성자</span>
//     <span class="content__date">2022.01.01</span>
//   `;
//   return content;
// };


// const makeButton = (Id) => {
//   const button = document.createElement("button");
//   button.classList.add("button");
//   button.dataset.num = Id;
//   button.innerText = Id;
//   button.addEventListener("click", (e) => {
//     Array.prototype.forEach.call(buttons.children, (button) => {
//       if (button.dataset.num) button.classList.remove("active");
//     });
//     e.target.classList.add("active");
//     renDerContent(parseInt(e.target.dataset.num));
//   });
//   return button;
// };

// const renDerContent = (page) => {
//   // 목록 리스트 초기화
//   while (contents.hasChildNodes()) {
//     contents.removeChild(contents.lastChild);
//   }
//   // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성
//   for (let Id = (page - 1) * maxContent + 1; Id <= page * maxContent && Id <= numOfContent; Id++) {
//   contents.appendChild(makeContent(Id));
//   }
// };

// const renDerButton = (page) => {
//   // 버튼 리스트 초기화
//   while (buttons.hasChildNodes()) {
//     buttons.removeChild(buttons.lastChild);
//   }
//   // 화면에 최대 5개의 페이지 버튼 생성
//   for (let Id = page; Id < page + maxButton && Id <= maxPage; Id++) {
//     buttons.appendChild(makeButton(Id));
//   }
//   // 첫 버튼 활성화(class="active")
//   buttons.children[0].classList.add("active");

//   buttons.prepend(prev);
//   buttons.append(next);

//   // 이전, 다음 페이지 버튼이 필요한지 체크
//   if (page - maxButton < 1) buttons.removeChild(prev);
//   if (page + maxButton > maxPage) buttons.removeChild(next);
// };

// //페이지이동 함수구현
// const renDer = (page) => {
//   renDerContent(page);
//   renDerButton(page);
// };
// renDer(page);

// const goPrevPage = () => {
//   page -= maxButton;
//   renDer(page);
// };

// const goNextPage = () => {
//   page += maxButton;
//   renDer(page);
// };

// const prev = document.createElement("button");
// prev.classList.add("button", "prev");
// prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
// prev.addEventListener("click", goPrevPage);

// const next = document.createElement("button");
// next.classList.add("button", "next");
// next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
// next.addEventListener("click", goNextPage);