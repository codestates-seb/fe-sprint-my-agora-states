// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

console.log(agoraStatesDiscussions);

 



// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
function convertToDiscussion(obj) {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //이미지 담기 
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avator of ${obj.author}`;
  avatarWrapper.append(avatarImg);

  //질문 내용 담기 
  const discussionTitle = document.createElement("h2");
  const discussionInfo = document.createElement("div");
  const discussionHyper = document.createElement("a");

  discussionHyper.href = obj.url;
  discussionHyper.textContent = obj.title; //a태그안에 있는 textContent이기 때문에.
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;


  discussionTitle.append(discussionHyper);
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInfo);

  //answerer상자 
  const checkbox = document.createElement("p");
  // const balletBox = document.
  checkbox.textContent = '☑'; //"<span>&#9745;</span>"
  discussionAnswered.append(checkbox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
}
//--------------------------------------------------
//pagnation 구현 
// 배열의 길이를 구한 다음에 10으로 나누고, 그 수 + 1 만큼(나머지 처리)
// pageNumbers 하위로 추가하는 함수생성 

let pagenationNumbers = document.querySelector(".pageNumbers");
let currentPage = 1; //페이지에 맞는 배열을 추출하기 위한 인덱스 
//let numbersForm = document.createElement("form");
function makePageNumbers(array){
  //let numberObj = {};
  for(let i  = 1 ; i <= parseInt(array.length / 10) + 1 ; i++){
    let newNumberLocal = document.createElement("button");
    newNumberLocal.type = "button"
    newNumberLocal.textContent = i; 
    newNumberLocal.name = `${i}`

    pagenationNumbers.append(newNumberLocal);

    //let objectName = {}
    //objectName.i = newNumberLocal;
    //newNumberLocal[0].addEventListener("click",  changeNum );
    
  }
  console.log(pagenationNumbers)
}
makePageNumbers(agoraStatesDiscussions);

function changeNum(){
  currentPage = this.textContent // 1, 2, 3, 4,5
  render(ul);
}

function moveNum(){
  if(this.textContent === "back"){
    currentPage = currentPage -1  
  } else if (this.textContent === "next"){
    currentPage = currentPage +1  
  }
};

let oneme = document.getElementsByName("1");
let twome = document.getElementsByName("2");
let threeme = document.getElementsByName("3");
let fourme = document.getElementsByName("4");
let fiveme = document.getElementsByName("5");

oneme[0].addEventListener("click",  changeNum );
twome[0].addEventListener("click",  changeNum );
threeme[0].addEventListener("click",  changeNum );
fourme[0].addEventListener("click",  changeNum );
fiveme[0].addEventListener("click",  changeNum );


//let backBtn = document.getElementsByClassName(".back");
//let nextBtn = document.getElementsByClassName(".next");
//
//backBtn[0].addEventListener("click", moveNum );


///===============================================
//TO-DO: form submit으로, 클릭하면 랜더링 되게끔하는 것 
// 클릭한 값의 TextContent에 맞는 숫자값 저장

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
   element.innerHTML=""
   for (let i = (currentPage - 1) * 10; i < currentPage * 10; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


 //discussion 추가기능 
  //이름과 타이틀, 내용을 입력하고, submit을 누르면,
  //배열에 객체를 생성하고,
  //이름고 타이틀에 맞는 요소 agoraStatesDiscussions에 
  // clickSubmit.preventDefault();
  let clickSubmit = document.querySelector(".form__submit > input");
  let inputName = document.querySelector(".form__input--name > input");
  let inputTitle = document.querySelector(".form__input--title > input");
  let questionForm = document.querySelector(".form__container form");

  function onsubmit(event) {
    event.preventDefault(); // 새로고침 방지함.

    let today = new Date();   

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜
    //let day = today.getDay();  // 요일
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    let seconds = today.getSeconds();  // 초
    //let milliseconds = today.getMilliseconds(); // 밀리


  
    let obj1 = {}  
       obj1.author = inputName.value;
        obj1.title = inputTitle.value;
        obj1.createdAt = `${year}-${month}-${date}T${hours}:${minutes}:${seconds}Z`;
        obj1.avatarUrl = "https://avatars.githubusercontent.com/u/79903256?s=64&v=4"
        obj1.url = "https://github.com/codestates-seb/agora-states-fe/discussions/45"
        agoraStatesDiscussions.unshift(obj1);
  
    console.log(agoraStatesDiscussions);
    render(ul); // 랜더링을 한 번 더 해야 수정된 배열이 반영된다.
  };
  

  questionForm.addEventListener("submit", onsubmit);
  //form.submit메서드를 호출하면 폼을 서버로 전송할 수 있음.
  //form.submit 메서드는 폼을 동적 생성한 다음 폼을 서버로 전송하고자 할때 주로사용.
  
// let event = clickSubmit.addEventListener("click", function(a) {
//  // a.defaultPrevented(); 
//   console.log("버튼이 클릭 됐습니다.");
//    
//   
//    // let textArea = document.querySelector("textarea")
//    
//    let obj1 = {}  
//    obj1.author = inputName.value;
//    obj1.title = inputTitle.value;
//    obj1.createdAt = "";
//    obj1.avatarUrl = "https://avatars.githubusercontent.com/u/79903256?s=64&v=4"
//    obj1.url = "https://github.com/codestates-seb/agora-states-fe/discussions/45"
//    agoraStatesDiscussions.unshift(obj1);
//    render(ul);
//  

/// 페이지네이션 기능 
// 1. 한 페이지에 10개씩 
//  1.1  배열에 앞에 10개를 출력하기 
//  1.1.1 for문을 통해서 맨앞에 10개 출력
//  1.2 페이즈1로 default되어 있어야함. 

// 2. 오른쪽 클릭하면 10개 
//  2.1  배열에 앞에 10개를 제외하고 10개를 출력하기
//  2,1,1
// 3. 왼쪽 클릭하면 전 페이지 


// 1.일단 페이지를 나타내는 버튼만들자 