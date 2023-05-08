// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
let j = 0;

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
  const discussionTitle = document.createElement("div");
  discussionTitle.className = "discussion__title";
  const discussionUrl = document.createElement("a");

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  // const discussionCheckBox = document.createElement("div");
  // discussionCheckBox.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img');
  avatarImg.src = agoraStatesDiscussions[j].avatarUrl;
  avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[j].author;
  avatarWrapper.append(avatarImg);

  discussionUrl.href = obj.url;
  const discussionAnchor = obj.title;
  discussionTitle.append(discussionUrl);
  discussionUrl.append(discussionAnchor);
  discussionContent.append(discussionTitle);

  const discussionAuthor = obj.author;
  const discussionTime = new Date(obj.createdAt).toLocaleString();

  discussionInformation.append(discussionAuthor,' / ',discussionTime);
  discussionContent.append(discussionInformation);

  const checkedAnswer = obj.answer;

  if(checkedAnswer === null){
    discussionAnswered.append('☐');
  }else{
    discussionAnswered.append('☑');
  }



  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    j++;
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
//render(ul);


const submitForm = document.querySelector('.form');
const formInputName = document.querySelector('.form__input--name #name');
const formInputTitle = document.querySelector('.form__input--title #title');
const formTextBox = document.querySelector('.form__textbox #story');
const getPageNation = document.querySelector('.pagenation');

let saveDatas = [];

function savedDatasFnc() {
    localStorage.setItem('keys', JSON.stringify(saveDatas));
}

function reset(){
  formInputName.value = '';
  formInputTitle.value = '';
  formTextBox.value = ''
}

function saveSubmitData(event){
 event.preventDefault();

 const newData = {
  id: "unique id",
  createdAt: new Date(),
  title: formInputTitle.value,
  url: "https://github.com/codestates-seb/agora-states-fe/discussions/",
  author: formInputName.value,
  bodyHTML: formTextBox.value,
  answer: null,
  avatarUrl: "https://avatars.githubusercontent.com/u/77476348?s=64&u=64243db62117de5c254c9a76184753b76d7303ff&v=4",
  
};
agoraStatesDiscussions.unshift(newData);
ul.prepend(convertToDiscussion(newData));
reset();
totalCount = agoraStatesDiscussions.length;
saveDatas.push(newData);
savedDatasFnc();

while(ul.hasChildNodes()){
  ul.removeChild(ul.firstChild);
}
    renderContent();

while(getPageNation.hasChildNodes()){
  getPageNation.removeChild(getPageNation.firstChild);
}

    renderButton();
    // click();
   
    const buttons = document.querySelectorAll('.pagenation button');
     buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => btn.classList.remove('active')); // 모든 버튼에서 active 클래스 제거
      button.classList.add('active'); // 클릭한 버튼에 active 클래스 추가
  
      if(button.classList.contains('prev') && currentPage > 1){
        buttons[parseInt(currentPage) - 1].classList.add('active');
      }else if(currentPage == 1){
        buttons.forEach((btn) => btn.classList.remove('active'));
        buttons[parseInt(button.id )].classList.add('active');
      }
  
      if(button.classList.contains('next')&& currentPage < totalPage){
        buttons[parseInt(currentPage) + 1].classList.add('active');
      }else if(currentPage == totalPage){
        buttons.forEach((btn) => btn.classList.remove('active'));
        buttons[parseInt(button.id )].classList.add('active');
      }
  
      currentPage = button.id;
      
      
      if(currentPage > 1){
        prev.id = parseInt(currentPage);
      }else if(currentPage == 1){
        prev.id = parseInt(currentPage);
      }
  
      if(currentPage < totalPage){
      
        next.id = parseInt(currentPage);
      } else if(currentPage == totalPage){
        next.id = parseInt(totalPage);
      }
  
      while(ul.hasChildNodes()){
        ul.removeChild(ul.firstChild);
        j=button.id -1;
      }
          renderContent();
         
    });
  });
  
    }


submitForm.addEventListener('submit',saveSubmitData);

const savedDatas = localStorage.getItem('keys');

if (savedDatas !== null){
  let parsedSavedDatas = JSON.parse (savedDatas);
  saveDatas = parsedSavedDatas;
  for(let i=0; i< saveDatas.length; i++){
    
   // ul.prepend(convertToDiscussion(toDos[i]));
    agoraStatesDiscussions.unshift(saveDatas[i]);
  }
}

let totalCount = agoraStatesDiscussions.length;
let currentPage = 1;
const limit = 10;
const pageCount = 5

let totalPage = Math.ceil(totalCount/limit); //42    5


function createButton (pageNumber) {
  const button = document.createElement('button');
  button.classList.add("button");
  button.textContent = pageNumber;
  button.id = pageNumber;
  

  return button;
}



  const prev = document.createElement('button');
  prev.classList.add('button','prev');
  prev.textContent = '이전';
  prev.id = currentPage;


  const next = document.createElement('button');
  next.classList.add('button','next');
  next.textContent = '다음';
  next.id = currentPage + 1;


function renderButton(){
  for(let i = 1; i<=totalPage; i++){
    const pageButton = createButton(i, i);
  
    if (i === currentPage) {
      pageButton.classList.add('active');
    }
    getPageNation.append(pageButton);
}
  getPageNation.prepend(prev);
  getPageNation.append(next);
}

function renderContent(){
  for(let i = (currentPage-1)*limit; i<limit*currentPage; i++){
    if(i === agoraStatesDiscussions.length){
      return;
    }
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
    j++;
  }
}
renderButton();
renderContent();
click();

function click(){
  const buttons = document.querySelectorAll('.pagenation button');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((btn) => btn.classList.remove('active')); // 모든 버튼에서 active 클래스 제거
      button.classList.add('active'); // 클릭한 버튼에 active 클래스 추가
  
      if(button.classList.contains('prev') && currentPage > 1){
        buttons[parseInt(currentPage) - 1].classList.add('active');
      }else if(currentPage == 1){
        buttons.forEach((btn) => btn.classList.remove('active'));
        buttons[parseInt(button.id )].classList.add('active');
      }
  
      if(button.classList.contains('next')&& currentPage < totalPage){
        buttons[parseInt(currentPage) + 1].classList.add('active');
      }else if(currentPage == totalPage){
        buttons.forEach((btn) => btn.classList.remove('active'));
        buttons[parseInt(button.id )].classList.add('active');
      }
  
      currentPage = button.id;
      
      
      if(currentPage > 1){
        prev.id = parseInt(currentPage) - 1;
      }else if(currentPage == 1){
        prev.id = parseInt(currentPage);
      }
  
      if(currentPage < totalPage){
      
        next.id = parseInt(currentPage) + 1;
      } else if(currentPage == totalPage){
        next.id = parseInt(totalPage);
      }
  
      while(ul.hasChildNodes()){
        ul.removeChild(ul.firstChild);
        j=button.id -1;
      }
          renderContent();
         
    });
  });

}