// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// array로 기존 질문 정보가 있음 (obj   id, createdAt, title, url)
//let agoraStatesDiscussions;
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




 const avatarImg = document.createElement("img");  // 아바타 프로필 사진이 들어갈 img 추가
 avatarImg.className = "discussion__avatar--image";
 avatarImg.src = obj.avatarUrl;                     // agoraStatesDiscussions의 첫번째 요소의 데이터로  src, alt 추가
 avatarImg.alt = "avatar of " + obj.author;
 avatarWrapper.append(avatarImg);                   // 3개의 생성한 div를  li.discussion__container 자식요소로 추가

 const title = document.createElement("h2");
 title.className = "discussion__title";

 const titleUrl = document.createElement("a");
 titleUrl.href = obj.url;
 titleUrl.textContent = obj.title;
 title.append(titleUrl);
 discussionContent.append(title);

 const information = document.createElement("div");
 const i = document.createElement("i");
 i.textContent = `${obj.author} / ${obj.createdAt}`;
 information.append(i);
 information.className = "discussion__information";
 discussionContent.append(information);

 const answer = document.createElement("p");
 if (obj.answer === null) {
   answer.textContent = "🤔";
   answer.className = "red";
 } else {
   answer.textContent = "😄";
   answer.className = "green";
 }
 discussionAnswered.append(answer); 

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


const form = document.querySelector("form.form");
const inputName = document.querySelector("input#name");
const inputTitle = document.querySelector("input#title");
const inputQuestion = document.querySelector("#story");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();

  const obj = {
    id: Math.random(),
    createdAt: `${year}-0${month}-${date}T${hours}:${minutes}:${seconds}Z`,
    title: inputTitle.value,
    url: "https://www.google.co.kr/",
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl:
      "https://cdn.clien.net/web/api/file/F01/11059505/25fb954e3ed280.jpg",
  };
  agoraStatesDiscussions.unshift(obj);
  const content = convertToDiscussion(obj);
 
  ul.prepend(content);
  inputName.value = "";
  inputTitle.value  = "";
  inputQuestion.value = "";
});


