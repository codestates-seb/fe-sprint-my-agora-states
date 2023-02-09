
let agoraStatesDiscussions = [];
const ul = document.querySelector("ul.discussions__container");
fetch("http://localhost:4000/discussions")
.then(res => res.json())
.then(json => {
   agoraStatesDiscussions = json;
  render(ul);
  
});



// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

//사진
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const photo = document.createElement('img')
  //사진 =avatarURL;
  //alt= author
  photo.src = obj.avatarUrl;
  photo.alt = 'avatar of' + obj.author;
  photo.title = obj.id; //마우스 오버하면 작성자의 아이디
  avatarWrapper.append(photo);

  //가운데내용
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  //생성했고 
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;
  //author / createdAt
  // toLocaleDateString() 
  // new Date().toLocaleTimeString()
  discussionContent.append(discussionTitle, discussionInformation);


  //끝에 표시
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  
  const checked = document.createElement("p");
   
 checked.textContent = obj.answer ? "☑" : "☒" ;

 discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return ;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
//const ul = document.querySelector("ul.discussions__container");
//render(ul);


/*여기서부터는 submit버튼 누르면 추가되는항목 */

//submit을 클릭하면 밑에항목에 추가된다.
//이름은 <div class="discussion__information">kimploo 
//title은 <h2 class="discussion__title">
//your question의 textarea는 a href



//일단 뭔가를 누군가가 적겟지
//그럼 name도 쓰고 title도 쓰고 question도 쓰겟지
//그럼 그걸 일단 crud중 create하겟지

//그게 공중부양하면 append하면 밑에 창에 보여지겠지

/* 그럼 일단 create해보자 */
//const newForm = document.createElement("div") //밑에꺼 전체 집합이라고 생각했다
//const newName = document.createElement("form__input--name > input");
//const newTitle = document.createElement("form__input--title > input");
//const newTextbox = document.createElement("form__textbox > textarea");
//현재 공중부양상태이다 

/*연결하게되면 */
//newname은 discussionTitle
//newtitle은 discussion_title
//newtextbox는 href???
/*클릭했을때 동작하는 이벤트니까 addEventListener메서드 이용하면될듯*/

//newForm.addEventListener("submit", (event) {
//  event.preventDefault();  // 입력이 되지않았으면 전송취소하는거!
// console.log("22222");

 // }
//)
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

//submit이라는 이벤트가 있다.
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const obj = {
    id: "new id" ,
    createdAt : new Date().toISOString(),  //toISOString() datajs에 써잇는 시간식으로 표현하는방법때문이다
    title: title.value, 
    url: "https://github.com/codestates-seb/agora-states-fe/discussions" ,
    author: author.value, 
    answer : null,
    bodyHTML: textbox.value ,
    avatarUrl: "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
  };
  //만든 배열을 data더미의 배열에 추가해준다(맨앞요소로)
  agoraStatesDiscussions.unshift(obj);
//전체 데이터 더미를 ul로 append해준다( 근데 맨앞으로니까 prepend)
ul.prepend(convertToDiscussion(obj));
//입력한 값을 submit에서 댓글창으로 append되면 값을 초기화한다.
author.value = " ";
title.value = " ";
textbox.value = " ";

});

