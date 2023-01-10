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

  //이미지
  const profile = document.createElement("img");
  profile.src = obj.avatarUrl;
  profile.alt =`avatar of ${obj.author}`;
  profile.className = "discussion__avatar--image";
  avatarWrapper.append(profile);

  //이름 날짜 링크
  const titleText = document.createElement("h2");
  titleText.className = "discussion__title";
  const titleLink = document.createElement("a");
  titleLink.setAttribute("href", obj.url);
  titleLink.append(obj.title); 
  titleText.append(titleLink);
  const makeTime = document.createElement("div");
  makeTime.className = "discussion__information";
  makeTime.append(`${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`)
  discussionContent.append(titleText);
  discussionContent.append(makeTime);

  //체크박스
  const answerChk = document.createElement("p");
  
  // if(obj.answer === null){
  //   answerChk.append(`☒`)
  // }else{
  //   answerChk.append(`☑`)
  // }
  answerChk.textContent = obj.answer ? "☑":"☒";
  
  discussionAnswered.append(answerChk);



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

const form = document.querySelector(".form");
const author = form.querySelector(".form__input--name > input");
const newTitle = form.querySelector(".form__input--title > input");
const textBox = form.querySelector(".form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newDate = {
    id: "ramdom id" + Math.round(Math.random() * 100000),
    createdAt: new Date().toISOString(),
    title: newTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML:textBox.value,
    avatarUrl:"https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4"
  };


  agoraStatesDiscussions.unshift(newDate);
  while(ul.firstChild){
    ul.removeChild(ul.firstChild);
  }
  render(ul)
})




