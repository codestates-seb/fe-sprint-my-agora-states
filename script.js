// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => { 
  //obj 에 agoraStatesDiscussions[0]부터 차례대로 들어가짐. 
 
  // li 요소 생성-------------
  const li = document.createElement("li"); 
  li.className = "discussion__container"; // 클래스 이름 지정

  //이미지 박스 만들기/-------------
  const avatarWrapper = document.createElement("div");//이미지랩박스
  avatarWrapper.className = "discussion__avatar--wrapper"; 
  const userimg = document.createElement("img");//이미지태그생성
  userimg.classList.add("discussion__avatar--image");
  userimg.setAttribute("src",obj["avatarUrl"]);
  userimg.setAttribute("alt",obj["author"]);
  avatarWrapper.append(userimg);

//질문내용 박스---------------------------------------
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  //h2 만들기 클래스 추가 
  const questionTitle = document.createElement("h2");
  questionTitle.classList.add("discussion__title");
  //a 만들기 href 추가 textcontent
  const qustionTitleLink = document.createElement("a");
   qustionTitleLink.setAttribute("href",obj["url"]);
   qustionTitleLink.textContent=obj.title;
   //h2안에 a 연결
   questionTitle.append(qustionTitleLink);

  //div 만들기 클래스 추가 textcontent 
  const qustionDate =document.createElement("div");
  qustionDate.className ="discussion__information";
  qustionDate.textContent = `${obj.author} / ${obj["createdAt"]}`;

  // console.log( qustionDate.textContent );
  //질문 내용 박스에 h2와 div 연결 
  discussionContent.append(questionTitle);
  discussionContent.append(qustionDate);

//체크박스---------------------------------------------
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  // 체크박스 안에 버튼  만들기 
  const checkbox = document.createElement("div");
  checkbox.classList.add("done");
  checkbox.textContent="답변완료";
  discussionAnswered.append(checkbox);
 
//체크 박스 안에 버튼 한개 더 
const checkbox2 = document.createElement("div");
  checkbox2.classList.add("notyet");
  checkbox2.textContent="답변 대기중";
  
  discussionAnswered.append(checkbox2);
  discussionContent.append(discussionAnswered);
 //hide  그 안에 엔서가 있으면 조건식 
 //console.log(obj["answer"]);
 if(obj["answer"]){
  checkbox2.classList.add("hide");

 }else{
  checkbox.classList.add("hide");
 }
 //console.log(checkbox);
   
 // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  ul.innerHTML="";
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//버튼 만들기 
const submitbutton = document.querySelector("#submit");
//console.log(submitbutton);
//버튼을 눌렀을떄 함수 실행 

//작성시간 알려줌
const dateMaker = () => {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};



submitbutton.addEventListener("click",(e)=>{
e.preventDefault();


const addquestion ={};
const username = document.querySelector("#name");
const usertitle = document.querySelector("#title");
const userstory = document.querySelector("#story");
const clickdate = dateMaker();

//빈객체만들기

//데이터  세개 가져와서 
//그림 


//짱이사진 랜덤으로 10개 
//그림 디폴트 로 넣기 배열로 만든다 
//서브밋한 날짜 초 를 흑흑 다음에 넣고 
//링크 태그를 
//사진을 
addquestion["avatarUrl"] = `./asset/${Math.ceil(Math.random()*10)}.jpg`;
addquestion["author"]=username.value;
addquestion["title"]=usertitle.value;
addquestion["bodyHTML"]=userstory.value;
addquestion["createdAt"]=clickdate;
//createdAt
//`../asset/${Math.ceil(Math.random()*10)}.jpg`;
//빈객체에 데이터 새개 넣기 
//console.log(addquestion);
//agoraStatesDiscussions 안에 빈객체 위에 추가 
agoraStatesDiscussions.unshift(addquestion);
render(ul);
//랜더링 다시하기 






});

//모듈창 열기 
const openpopup = document.querySelector("#openpop");
//console.log(openpopup);

const modal = document.querySelector(".modal");
openpopup.addEventListener("click", (e)=>{

  e.preventDefault();
console.log("working");
modal.classList.remove("hide");
});

const cancelpopup = document.querySelector("#goout");

cancelpopup.addEventListener("click", (e)=>{
  e.preventDefault();
console.log("working");
modal.classList.add("hide");
});
