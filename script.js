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
  const avatarImg = document.createElement("img");       //이미지 
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarImg);

  /*** user avatar ***/

  const userTitle = document.createElement("h3");         //타이틀 
  const userAnchor = document.createElement("a");
  userTitle.className = "discussion__title";
  userTitle.href = obj.url;
  userTitle.textContent = obj.title
  discussionContent.append(userTitle)

  /***  user title ***/

  const userInfo = document.createElement("div");         //유저정보
  userInfo.className = "discussion__information";
  userInfo.textContent = obj.author + "/" + new Date(obj.createdAt).toLocaleDateString()
  discussionContent.append(userInfo)

  const answerd = document.createElement("p");
  if (obj.answer === null) {
    answerd.textContent = "😀";
  } else {
    answerd.textContent = "😡"
  }
  discussionAnswered.append(answerd)

  /*** answer ***/
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 더미 데이터

const form = document.querySelector("form.form"); // form 
const inputName = document.querySelector("div.form__input--name > input"); //username
const inputTitle = document.querySelector("div.form__input--title > input")//usertitle
const formTextBox = document.querySelector("div.form__textbox > textarea") //textbox
// console.log(inputTitle.value) // bug 안불려와짐

form.addEventListener("submit", (event) => { // submit event 발생
  event.preventDefault();                   //윈도우 기본설정 막음 안막을시 새로고침 초기화
  const obj = {             //새로운 객체생성
    id: "unique id",
    createdAt: new Date().toLocaleDateString(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: formTextBox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  agoraStatesDiscussions.unshift(obj)   // 더미객체 unshift 
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion)  // 새로운 더미객체 추가
})

//submit 이벤트


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {       //객체41개만큼 반복
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));  //반복하면서 index 추가
    agoraStatesDiscussions[1]
  }

  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); //랜더링 

//랜더링
