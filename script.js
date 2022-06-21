

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
 //테이블 형태. 가독성 좋음
// console.table(agoraStatesDiscussions);

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

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarImg.className = "discussion__avartar--image";
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h3");
  discussionTitle.className = "discussion__title";

  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionTitle.append(titleLink);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = obj.author + " / " +obj.createdAt;
  discussionContent.append(discussionTitle, discussionInfo);

  const answeredIcon = document.createElement("p");
  answeredIcon.textContent = obj.answer ? "☑︎" : "◻︎";
  discussionAnswered.append(answeredIcon);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
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

fetch('http://localhost:3001/discussions')
.then((res)=>{
  return res.json();
}).then((json)=>{
  agoraStatesDiscussions = json;
  const ul = document.querySelector("ul.discussions__container");
  render(ul);
})

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
// render(ul);



//submit 처리 함수
let inputName = document.querySelector(".form__input--name input");
let inputTitle = document.querySelector(".form__input--title input");
let inputStory = document.querySelector(".form__textbox textarea");
let submitForm = document.querySelector("form");
let submitBtn = document.querySelector(".form__submit input");

function handleSubmit(e) {
  e.preventDefault();
  const newDiscussion = {
      Id: null,
      createdAt: null,
      title: null,
      url: null,
      author: null,
      answer: null,
      bodyHTML: null,
      avatarUrl:"avatar.jpeg"
  };

  newDiscussion.title = inputTitle.value;
  newDiscussion.author = inputName.value;
  newDiscussion.createdAt = new Date().toISOString();

  inputTitle.value = '';
  inputName.value = '';
  inputStory.value = '';
  
  agoraStatesDiscussions.unshift(newDiscussion);
  console.log("동작");
  console.log(agoraStatesDiscussions);
  const ul = document.querySelector("ul.discussions__container");
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
  console.log(submitForm);

}

submitForm.addEventListener('submit', handleSubmit);

