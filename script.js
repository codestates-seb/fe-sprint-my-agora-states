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


  // bare minimum requirement 디스커션 나열 기능
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

    // img 불러오기 avatar  
  const discussionImg = document.createElement("img") // 새로운 <img> 요소 만들기
  discussionImg.src = obj.avatarUrl;
  avatarWrapper.append(discussionImg);  // 변수 disccusionimg에 담긴 새로운 <img>요소를 <avatarWrapper>요소에 append

  // * discussion__content 불러오기
  // discussion__title : h2로 되어있음
  // notice : h2 안의 <a>
  // 1) discussion__title 먼저 불러오기
  const discussionTitle = document.createElement("h2")
  const titleNotice = document.createElement("a");
  titleNotice.href = obj.url;             //링크 불러오기
  titleNotice.textContent = obj.title;    //타이틀 텍스트 불러오기
  discussionTitle.append(titleNotice);

  // 2) discussion__information 불러오기 타이틀 아래 이름, 시간
  const discussionInfo = document.createElement("div");
  discussionInfo.textContent = `< ${obj.author} > / < ${obj.createdAt} >` // 쓴 저자와 시간   // 수정
  discussionContent.append(discussionTitle, discussionInfo);

  const answer = document.createElement("p");
  answer.textContent = obj.answer ? "★" : "☆";  // 답변달렸으면 ★ 안달렸으면 ☆
  discussionAnswered.append(answer);
  // if( obj.answer !== null){
  // }

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



// bare minimum requirement 디스커션 추가 기능

// form에 입력한 값들 변수선언해서 넣기
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__itextbox > textarea");
// submit 누르면 질문 리스트에 디스커션 추가되야함

form.addEventListener("submit", (event) => {
  event.preventDefault();   // submit event


  // 내가 formdp 입력한 값들을 새로운 변수 안에 넣기
  const newAuthor = form.querySelector("div.form__input--name > input").value;
  const newTitle = form.querySelector("div.form__input--title > input").value;
  const newTextbox = form.querySelector("div.form__textbox > textarea").value;

  const newObj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: newTitle,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: newAuthor,
    bodyHTML: newTextbox,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  }
  agoraStatesDiscussions.unshift(newObj);
  const discussion = convertToDiscussion(newObj);

  ul.prepend(discussion);

  // form 내가 입력한 내용들 리셋하는 기능 추가
  form.querySelector("div.form__input--name > input").value = "";
  form.querySelector("div.form__input--title > input").value = "";
  form.querySelector("div.form__textbox > textarea").value = "";

})




// const elInputUsername = document.querySelector('#userName')
// const elSuccessMessage = document.querySelector('.success-message')

// elInputUsername.onkeyup = function(){
//   if(isMoreThan3Length(elInputUsername,value)){
//     elSuccessMessage.classList.remove('hide');
//   }else{
//     elSuccessMessage.classList.add('hide');
//   }
// }

// function isMoreThan3Length(value){
//   return value.length>=3;
// }