// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // const avatarWrapper = document.createElement("div");
  // avatarWrapper.className = "discussion__avatar--wrapper"; //<div class="discussion__avatar--wrapper"></div>

  // const discussionContent = document.createElement("div");
  // discussionContent.className = "discussion__content"; //<div class="discussion__content"></div>
  
  // const discussionAnswered = document.createElement("div");
  // discussionAnswered.className = "discussion__answered"; //<div class="discussion__answered"></div>

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; //<div class="discussion__avatar--wrapper"></div>

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);

  
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content"; //<div class="discussion__content"></div>

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title"; //<h2 class="discussion__title"></h2>


  const discussionAnchor = document.createElement("a");
  discussionAnchor.href = obj.url;
  discussionAnchor.textContent = obj.title;
  discussionTitle.append(discussionAnchor); //<h2 class="discussion__title"><a></a></h2>

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information"; //<div class="discussion__information"></div>
  discussionInformation.textContent = obj.author + ' / ' + new Date(obj.createdAt).toLocaleTimeString();
  
  discussionContent.append(discussionTitle, discussionInformation);


  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered"; //<div class="discussion__answered"></div>
  
  const discussionAnsweredP =  document.createElement("p");
  discussionAnsweredP.textContent = obj.answer ? "☑︎" : "☒";
  if(discussionAnsweredP.textContent ===  "☒"){
    discussionAnsweredP.style.color = "red";
  }else{
    discussionAnsweredP.style.color = "darkgreen";
  }

  discussionAnswered.append(discussionAnsweredP);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// // agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

const render = (element, startIdx, endIdx) => {
  for (let i = startIdx; i < endIdx; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};



// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul,0,10);


// TO DO :  아이디, 본문을 입력하고 버튼을 누르면 실제 화면에 디스커션이 추가되어야 합니다.

//0. submit이 클릭되었을 때
//1. form에서 입력 받은 데이터를 가져온다
//2. 가져온 데이터를 배열에 앞쪽에 넣어 준다
//3. 그 배열을 뿌려주면 입력 받은 디스커션이 추가 되지 않을까?

const form = document.querySelector(".form");

form.addEventListener("submit", function(event){

  //submit을 사용해서 새로고침이 되기 때문에 꼭 필수!
  event.preventDefault();

  const form = document.querySelector(".form");

  const formAuthor = form.querySelector('.form__input--name > input').value;
  const formTitle = form.querySelector('.form__input--title > input').value;
  const formTextarea = form.querySelector('.form__textbox > textarea').value;

  const addDiscussion = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: formTitle,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: formAuthor,
    bodyHTML: formTextarea,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",

  }

  removeChildes(ul);

  //기존 배열에 입력창으로 받은 정보를 객체로 생성하여 맨 앞에 추가
  agoraStatesDiscussions.unshift(addDiscussion);


  //이 부분에 추가되면 출력을 어떻게 할 것인지 적기
  render(ul, startIdx, endIdx);

 

  //const forNewDiscussion = convertToDiscussion(addDiscussion); //li로 return 
  
  //Prepend 메소드를 사용하여 ul의 앞에 li 형태의 받은 디스커션 추가
  //페이지네이션 때문에 이 방법은 사용 안함
  //ul.prepend(forNewDiscussion);
  
  formReset();
});


// TO DO : 이전 데이터 삭제

const removeChildes = (el) => {
  while(el.firstChild){
    el.firstChild.remove();
  }
};


// TO DO : 이전 데이터 삭제
// form에 내용을 제출하고 나면 form 내용이 비워지도록 리셋

const formReset = () => {
  const nameValue = document.querySelector("div.form__input--name > input");
  const titleValue = document.querySelector("div.form__input--title > input");
  const textareaValue = document.querySelector("div.form__textbox > textarea");
  
  nameValue.value = "";
  titleValue.value = "";
  textareaValue.value = "";

};



// TO DO : 페이지네이션 기능
// 한페이지에 10개씩 디스커션 보이기
// 이전, 다음 페이지로 이동 가능
// 이전, 다음 페이지가 없는 경우 페이지 유지

const prevPageBtn = document.querySelector(".prev");
const nextPageBtn = document.querySelector(".next");

let startIdx = 0;
let endIdx = 10;

nextPageBtn.addEventListener("click", () => {
  if (endIdx > agoraStatesDiscussions.length) return;

  startIdx += 10;
  endIdx += 10;
  
  removeChildes(ul);

  render(ul, startIdx, endIdx);
});

prevPageBtn.addEventListener("click", () => {
  if (startIdx <= 0) return;

  startIdx -= 10;
  endIdx -= 10;
  
  removeChildes(ul);

  render(ul, startIdx, endIdx);
});

