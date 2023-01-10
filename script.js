// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);

//중간에 큰 화살표 클릭시 없어지고 답변보기박스가 나오는 동작
const arrow__right = document.querySelector("#arrow-right");
const discussion__wrapper__right = document.querySelector(".discussion__wrapper")
function arrowRightClick(){
  arrow__right.classList.add("arrowRight");
  discussion__wrapper__right.classList.add("discussion__wrapper__right");
}
arrow__right.addEventListener("click", arrowRightClick);





//다크모드 토글을 위한 DOM
const arrowbox = document.querySelector('#arrow-right');
const toggleBtn = document.querySelector('.toggle');
const mainbox = document.querySelector('main');
const bodybox = document.querySelector('body');
const maintitlebox = document.querySelector('.main-title');
const container__box = document.querySelector('.container__box');
const questionbox = document.querySelector('.question');
const answerbox = document.querySelector('#question');
const discussion__wrapperbox = document.querySelector('.discussion__wrapper');
const pagibox = document.querySelectorAll('.pagi');
const page__numberbox = document.querySelectorAll('.page-number');

//다크모드 토글
var toggle = (function () {
  var isShow = false;
  return function () {
    arrowbox.style.color = isShow ? '#0071e3' : '#f5f5f7';
    mainbox.style.backgroundColor = isShow ? '#f5f5f7' : 'black';
    bodybox.style.backgroundColor = isShow ? '#f5f5f7' : 'black';
    maintitlebox.style.backgroundColor = isShow ? '#313132' : '#0071e3';
    container__box.style.backgroundColor = isShow ? '#f2f2f3' : 'rgba(0,0,0,0)';
    questionbox.style.color = isShow ? '#313132' : '#f5f5f7';
    discussion__wrapperbox.style.backgroundColor = isShow ? '#f2f2f3' : 'rgba(0,0,0,0)';
    answerbox.style.color = isShow ? '#313132' : '#f5f5f7';
    pagibox[0].style.color = isShow ? '#313132' : 'white';
    pagibox[1].style.color = isShow ? '#313132' : 'white';
    page__numberbox[0].style.color = isShow ? '#313132' : 'white';
    page__numberbox[1].style.color = isShow ? '#313132' : 'white';
    page__numberbox[2].style.color = isShow ? '#313132' : 'white';
    page__numberbox[3].style.color = isShow ? '#313132' : 'white';
    page__numberbox[4].style.color = isShow ? '#313132' : 'white';
    isShow = !isShow;
  };
})();
  toggleBtn.onclick = toggle;





//html에 부여되있는 첫번째 li지움
const liFirst = document.querySelector("#li-first");
const container = document.querySelector(".discussion__container");
const li = document.querySelector("li");
li.classList.add = "show";
liFirst.remove();

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
  //아바타
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //제목
  const title = document.createElement('h2');
  title.className = "discussion__title";
  const a = document.createElement('a');
  a.href = obj.url;
  a.textContent = obj.title;
  title.prepend(a);
  discussionContent.append(title);

//글쓴이와 시간
  const authorTime = document.createElement('div');
  authorTime.className = "discussion__information";
  authorTime.textContent = obj.author + " / " + obj.createdAt;
  discussionContent.append(authorTime);

  //체크표시
  const check = document.createElement('p');
  check.textContent = obj.answer ? '✔️' : '❌';
  //const icon = document.createElement('i');
  //icon.className = "fas fa-caret-down";
  discussionAnswered.append(check);
  //check.append(icon);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  li.classList.add("show");
  
  return li;
};


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < 5; i += 1) {
    //liFirst.remove();
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);



//페이지네이션을 위한 변수
const arrowIconBefore = document.querySelector(".arrow-icon-before");
const arrowIconNext = document.querySelector(".arrow-icon-next");
const pageNumber1 = document.querySelector(".pageNumber1");
const pageNumber2 = document.querySelector(".pageNumber2");
const pageNumber3 = document.querySelector(".pageNumber3");
const pageNumber4 = document.querySelector(".pageNumber4");
const pageNumber5 = document.querySelector(".pageNumber5");
//pageNumber5가 5일 때, next버튼을 누르면  678910


//페이지네이션 함수
function nextPage(){
    pageNumber1.classList.add("grayColor");
    pageNumber2.classList.remove("grayColor");
    pageNumber3.classList.remove("grayColor");
    pageNumber4.classList.remove("grayColor");
    pageNumber5.classList.remove("grayColor");
    if(pageNumber5.innerHTML == 5){
        pageNumber1.innerHTML = 6;
        pageNumber2.innerHTML = 7;
        pageNumber3.innerHTML = 8;
        pageNumber4.innerHTML = 9;
        pageNumber5.innerHTML = 10;
        console.log("2페이지");
    }else if(pageNumber5.innerHTML == 10){
        pageNumber1.innerHTML = 11;
        pageNumber2.innerHTML = 12;
        pageNumber3.innerHTML = 13;
        pageNumber4.innerHTML = 14;
        pageNumber5.innerHTML = 15;
        console.log("3페이지");
    }else if(pageNumber5.innerHTML == 15){
        pageNumber1.innerHTML = 16;
        pageNumber2.innerHTML = 17;
        pageNumber3.innerHTML = 18;
        pageNumber4.innerHTML = 19;
        pageNumber5.innerHTML = 20;
        console.log("4페이지");
    }else if(pageNumber5.innerHTML == 20){
        pageNumber1.innerHTML = 21;
        pageNumber2.innerHTML = 22;
        pageNumber3.innerHTML = 23;
        pageNumber4.innerHTML = 24;
        pageNumber5.innerHTML = 25;
        console.log("5페이지");
    }else if(pageNumber5.innerHTML == 25){
        pageNumber1.innerHTML = 26;
        pageNumber2.innerHTML = 27;
        pageNumber3.innerHTML = 28;
        pageNumber4.innerHTML = 29;
        pageNumber5.innerHTML = 30;
        console.log("6페이지");
    }
    else if(pageNumber5.innerHTML == 30){
        pageNumber1.innerHTML = 31;
        pageNumber2.innerHTML = 32;
        pageNumber3.innerHTML = 33;
        pageNumber4.innerHTML = 34;
        pageNumber5.innerHTML = 35;
        console.log("7페이지");
    }else if(pageNumber5.innerHTML == 35){
        pageNumber1.innerHTML = 36;
        pageNumber2.innerHTML = 37;
        pageNumber3.innerHTML = 38;
        pageNumber4.innerHTML = 39;
        pageNumber5.innerHTML = 40;
        console.log("8페이지");
    }

}
function beforePage(){
    pageNumber1.classList.add("grayColor");
    pageNumber2.classList.remove("grayColor");
    pageNumber3.classList.remove("grayColor");
    pageNumber4.classList.remove("grayColor");
    pageNumber5.classList.remove("grayColor");
    if(pageNumber5.innerHTML == 10){
        pageNumber1.innerHTML = 1;
        pageNumber2.innerHTML = 2;
        pageNumber3.innerHTML = 3;
        pageNumber4.innerHTML = 4;
        pageNumber5.innerHTML = 5;
        console.log("1페이지");
    }else if(pageNumber5.innerHTML == 15){
        pageNumber1.innerHTML = 6;
        pageNumber2.innerHTML = 7;
        pageNumber3.innerHTML = 8;
        pageNumber4.innerHTML = 9;
        pageNumber5.innerHTML = 10;
        console.log("2페이지");
    }else if(pageNumber5.innerHTML == 20){
        pageNumber1.innerHTML = 11;
        pageNumber2.innerHTML = 12;
        pageNumber3.innerHTML = 13;
        pageNumber4.innerHTML = 14;
        pageNumber5.innerHTML = 15;
        console.log("3페이지");
    }else if(pageNumber5.innerHTML == 25){
        pageNumber1.innerHTML = 16;
        pageNumber2.innerHTML = 17;
        pageNumber3.innerHTML = 18;
        pageNumber4.innerHTML = 19;
        pageNumber5.innerHTML = 20;
        console.log("4페이지");
    }else if(pageNumber5.innerHTML == 30){
        pageNumber1.innerHTML = 21;
        pageNumber2.innerHTML = 22;
        pageNumber3.innerHTML = 23;
        pageNumber4.innerHTML = 24;
        pageNumber5.innerHTML = 25;
        console.log("5페이지");
    }else if(pageNumber5.innerHTML == 35){
        pageNumber1.innerHTML = 26;
        pageNumber2.innerHTML = 27;
        pageNumber3.innerHTML = 28;
        pageNumber4.innerHTML = 29;
        pageNumber5.innerHTML = 30;
        console.log("6페이지");
    }
    else if(pageNumber5.innerHTML == 40){
        pageNumber1.innerHTML = 31;
        pageNumber2.innerHTML = 32;
        pageNumber3.innerHTML = 33;
        pageNumber4.innerHTML = 34;
        pageNumber5.innerHTML = 35;
        console.log("7페이지");
    }
}

//페이지숫자를 클릭하면 배경색이 회색으로 바뀌고 페이지가 바뀌는 함수
function pageNumberGray(event){
    let pages = ["pageNumber1", "pageNumber2", "pageNumber3", "pageNumber4", "pageNumber5"];
    let pagesNumbers = [pageNumber1, pageNumber2, pageNumber3, pageNumber4, pageNumber5];
    for(let i=0; i<5; i++){
        if(event.target.classList[1] == pages[i]){
            pagesNumbers[i].classList.add("grayColor");

            //만약 이벤트 타겟이 아니고 클래스리스트에 회색이 있으면 -> 회색지우기
            for(let e=0; e<5; e++){
                if(pages[e] !== event.target.classList[1] && pagesNumbers[e].classList.contains("grayColor")){
                    pagesNumbers[e].classList.remove("grayColor");
                }
            }
        }
    }



    
    if(pageNumber2.classList.contains("grayColor")){
      const render = (element) => {
        for (let i = 9; i > 4; i -= 1) {
          element.prepend(convertToDiscussion(agoraStatesDiscussions[i]));
        }
        return;
      };
      const ul = document.querySelector("ul.discussions__container");
      render(ul);
    }else if(pageNumber1.classList.contains("grayColor")){
      const render = (element) => {
        for (let i = 4; i >= 0; i-=1) {
          element.prepend(convertToDiscussion(agoraStatesDiscussions[i]));
        }
        return;
      };
      const ul = document.querySelector("ul.discussions__container");
      render(ul);
    }else if(pageNumber3.classList.contains("grayColor")){
      const render = (element) => {
        for (let i = 14; i > 9; i-=1) {
          element.prepend(convertToDiscussion(agoraStatesDiscussions[i]));
        }
        return;
      };
      const ul = document.querySelector("ul.discussions__container");
      render(ul);
    }else if(pageNumber4.classList.contains("grayColor")){
      const render = (element) => {
        for (let i = 19; i > 14; i-=1) {
          element.prepend(convertToDiscussion(agoraStatesDiscussions[i]));
        }
        return;
      };
      const ul = document.querySelector("ul.discussions__container");
      render(ul);
    }else if(pageNumber5.classList.contains("grayColor")){
      const render = (element) => {
        for (let i = 24; i > 19; i-=1) {
          element.prepend(convertToDiscussion(agoraStatesDiscussions[i]));
        }
        return;
      };
      const ul = document.querySelector("ul.discussions__container");
      render(ul);
    }

}

//페이지숫자를 클릭하면 배경색이 회색으로 바뀌고 페이지가 바뀌는 이벤트
arrowIconNext.addEventListener("click", nextPage);
arrowIconBefore.addEventListener("click", beforePage);
pageNumber1.addEventListener("click", pageNumberGray);
pageNumber2.addEventListener("click", pageNumberGray);
pageNumber3.addEventListener("click", pageNumberGray);
pageNumber4.addEventListener("click", pageNumberGray);
pageNumber5.addEventListener("click", pageNumberGray);



//질문하기박스에서 정보를 입력하고 submit을 누르면 답변보기에서 업데이트되는 동작을 위한 변수
const formName = document.querySelector(".form-name");
const formTitle = document.querySelector(".form-title");
const formText = document.querySelector(".form-text");
const formSubmit = document.querySelector(".input__submit");

formSubmit.addEventListener("click", submitClick);


//질문하기박스에서 정보를 입력하고 submit을 누르면 답변보기에서 업데이트되는 동작을 위한 함수
let arr = {};
//submit누르면 data.js 로 보내고 1페이지 자동 클릭되게 하기
function submitClick(event){
  event.preventDefault();

  if(arr!=={}){
  arr.avatarUrl = "https://play-lh.googleusercontent.com/38AGKCqmbjZ9OuWx4YjssAz3Y0DTWbiM5HB0ove1pNBq_o9mtWfGszjZNxZdwt_vgHo=s200";
  arr.author = formName.value;
  arr.title = formTitle.value;
  arr.bodyHTML = formText.value;

  let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth()+1;
    let day = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let date = year+"-"+(("00"+month.toString()).slice(-2))+"-"+(("00"+day.toString()).slice(-2))+"T"+hours+":"+minutes+":"+seconds+"Z";
    arr.createdAt = date;
  
  //agoraStatesDiscussions.unshift(arr);
  console.log(arr);
  //localStorage.setItem("arrarr", JSON.stringify(arr));
  console.log(agoraStatesDiscussions);
  page1();
  pageNumberGray(event);
  //1번 화면으로 돌아오기

  let inputAgoraDatas = [];
  let inputAgoraData = arr;
  // localStorage
  if (window.localStorage.length > 0) {
    const getInputAgoraDatas = window.localStorage.getItem('inputAgoraDatas');
    const inputAgoraDatasArr = JSON.parse(getInputAgoraDatas);
    for(let i = 0; i < inputAgoraDatasArr.length; i++) {
      inputAgoraDatas.push(inputAgoraDatasArr[i]);
    }
    inputAgoraDatas.push(inputAgoraData);
    const inputAgoraDataString = JSON.stringify(inputAgoraDatas);
    window.localStorage.setItem('inputAgoraDatas',inputAgoraDataString);
  } else {
    inputAgoraDatas.push(inputAgoraData);
    const inputAgoraDataString = JSON.stringify(inputAgoraDatas);
    window.localStorage.setItem('inputAgoraDatas',inputAgoraDataString);
  }

  agoraStatesDiscussions.unshift(inputAgoraData);
  console.log(agoraStatesDiscussions);
  const render = (element) => {
    for (let i = 0; i < 1; i += 1) {
      element.prepend(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    return;
  };
  
  render(ul);
  arr = {};
  }
}

//LocalStorage 렌더링
const renderLocalStorage = (element) => {
  const agoraDatas = window.localStorage.getItem('inputAgoraDatas');
  const agoraDataObj = JSON.parse(agoraDatas);

  if (agoraDataObj) {
    for (let i = 0; i < agoraDataObj.length; i++) {
      element.prepend(convertToDiscussion(agoraDataObj[i]));
    }
  }
  return;
}
renderLocalStorage(ul);



pageNumber1.addEventListener("click", page1);
function page1(){
  pageNumber1.classList.add("grayColor");
  pageNumber2.classList.remove("grayColor");
  pageNumber3.classList.remove("grayColor");
  pageNumber4.classList.remove("grayColor");
  pageNumber5.classList.remove("grayColor");
}





//  let newarr = toDos;
//  let arrString = JSON.stringify(newarr);
//  localStorage.setItem('agora', arrString);
//  agoraArray();
  //console.log(length);
//}
//function agoraArray(){
//  const agoraString = localStorage.getItem('agora');
//  const agoraArr = JSON.parse(agoraString);
//  console.log(agoraArr);

  //agoraArr[0].author
  //최신 글쓴이는 ul에 prepend




//function saveToDos(){
//  localStorage.setItem("todos", JSON.stringify(toDos));
//}
//let savedToDos = localStorage.getItem(TODOS_KEY);
//let savedArr = JSON.parse(savedToDos);
//console.log(savedArr);
//지금 localstorage에 저장은 되는데, 새로고침하고 다시 저장하면 원래꺼 사라짐 덮어쓰기됨


//if(saveToDos !== null){ 
//    const parsedToDos = JSON.parse(savedToDos); //savedToDos를 js array형태로 바꾸기
//   toDos = parsedToDos;
//    convertToDiscussion.forEach((item) => console.log("this is the turn of", item));
//}





//localstorage 공부해서 새로고침해도 data.js그대로 남아있게 만들기
//다음 페이지 넘어가면 678910에도 바른 data.js오도록 만들기
//localstorage 초기회하기 삭제기능
//제목검색기능도 만들기
//야간모드도 만들기 토글로 낮과밤

//처음 새로고침했을 때 상단의 검은색에 아고라스테이츠 글씨, 2초 후 서서히 위로 올라가기
////중간에 화살표 클릭하면 답변하기 보이게 하기
