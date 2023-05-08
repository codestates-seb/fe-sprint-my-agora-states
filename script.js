// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; //  img Wrap
  const elContentImg = document.createElement('img')
  elContentImg.className = "discussion__avatar--image";  //  img
  const discussionContent = document.createElement("div"); 
  discussionContent.className = "discussion__content";    //Title
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const elCreatedAtInfo = document.createElement("div");
  elCreatedAtInfo.className = "discussion__information"; //date
  const elAnswered = document.createElement("discussion__answered");
  elAnswered.className = "discussion__answered";          //  Answered
  const elContentBoxWrap = document.createElement("div");
  elContentBoxWrap.className = "contentBoxWrap";          //Wrapped Title, data, answer

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  discussionContent.textContent = obj.title;
  elCreatedAtInfo.textContent = obj.createdAt;
  elContentImg.src = obj.avatarUrl;
  discussionAnswered.textContent = ".";

  avatarWrapper.appendChild(elContentImg);
  elContentBoxWrap.appendChild(discussionContent);
  elContentBoxWrap.appendChild(discussionAnswered);
  elContentBoxWrap.appendChild(elCreatedAtInfo);

  li.append(avatarWrapper, elContentBoxWrap);

  return li;
};




const discussionsWrapper = document.querySelector(".discussions__wrapper");
let idx = 0;
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element,idx) => {
  let = startNum = (idx * 10) - 10;
  let end = startNum + 9
  if(idx === 0){
    for (let start = 0 ; start <= 9 ; start += 1) {
      console.log(start,end)
      element.append(convertToDiscussion(agoraStatesDiscussions[start]));
    }
  }else{
    for (let start = (idx * 10) - 10 ; start <= end ; start += 1) {
      console.log(start,end)
      element.append(convertToDiscussion(agoraStatesDiscussions[start]));
    }
  }
  return;
};




// PagiNation Function 

let pageTotalCount = Math.ceil(agoraStatesDiscussions.length / 10);
console.log(pageTotalCount)
let elPageContainer = document.querySelector(".paginationCountainer")

function pagiNationFunc(){
  while(elPageContainer.firstChild){
    elPageContainer.removeChild(elPageContainer.firstChild)
    }
  for(let pageNum = 1; pageNum <= pageTotalCount; pageNum++ ){
    elPageContainer.innerHTML += `<a href="#" class="pagination" onclick=pagiNationHandler("${pageNum}") id=${pageNum}>${pageNum}</a>`;
    elPageContainer.append();
  }
}
pagiNationFunc()


let elPagiNation = document.querySelectorAll(".pagination")

console.log(elPagiNation);


const pagiNationHandler = (id) =>{
  console.log(typeof(id))
  if(id === '1'){
    id = 0;
    console.log(idx);
    while (ul.firstChild){
      ul.removeChild(ul.firstChild)
    }
    render(ul,id);
 
  }else{
    idx = id
    console.log(idx);
    console.log((id * 10 )- 10)
    while (ul.firstChild){
      ul.removeChild(ul.firstChild)
    }
    render(ul,id);
  }
}



// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, idx);

const elInputForm = document.querySelector(".form");
const elUlTag = document.querySelector("ul.discussions__container")
let elUserName = document.querySelector("#name");
let elUserTitle = document.querySelector("#title");
let elUserQuestion = document.querySelector("#story");
let today = new Date().toISOString();

let inputFormInfo = {
    answer: null,
    author: "JoeunNAL",
    avatarUrl: "#################",
    bodyHTML: "",
    createdAt: "2023-11-11T11:11:11Z",
    id: "D_kwDOHOApLM4APjIj",
    title: "THIS IS TEST TEST",
    url: "https://github.com/test.test.test/",
    question:"TESTTEST"
};

elUserName.onkeyup = function(){
  inputFormInfo.author = elUserName.value;
  console.log(inputFormInfo);
}
elUserTitle.onkeyup = function(){
  inputFormInfo.title = elUserTitle.value;
  console.log(inputFormInfo);
}
elUserQuestion.onkeyup = function(){
  inputFormInfo.question = elUserQuestion.value;
  console.log(inputFormInfo);
}


elInputForm.addEventListener("submit", submitButton);

function submitButton(event){ //after clicked the submit button, add a content in the object as a last object. bring it up to screen.
  event.preventDefault();
  inputFormInfo.createdAt = today;

  agoraStatesDiscussions.unshift({...inputFormInfo});
  pageTotalCount = Math.ceil(agoraStatesDiscussions.length / 10);
  console.log("pushed", agoraStatesDiscussions);

  // ul.insertBefore(convertToDiscussion(agoraStatesDiscussions[0]),elUlTag.firstChild);
  while (ul.firstChild){
    ul.removeChild(ul.firstChild)
  }
  render(ul,0)
  
  pagiNationFunc()

}


console.log(agoraStatesDiscussions);





