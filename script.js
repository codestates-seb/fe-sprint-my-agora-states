// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  // <li class='discussion__container'></li>

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // <div class='discussion__avatar--wrapper'></div>
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  discussionContent.addEventListener("click", divLink);
  function divLink(){
    window.open(obj.url);
  }

  // <div class='discussion__content'></div>
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  // <div class='discussion__answered'></div>



  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // discussion__avatar--wraper
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avatarImage);
  
  const author = document.createElement("p");
  author.className = "author";
  author.textContent = obj.author;
  avatarWrapper.append(author);
  
  const createdAt = document.createElement("p");
  createdAt.className = "createdAt";
  createdAt.textContent = obj.createdAt;
  avatarWrapper.append(createdAt);

  // discussion__content
  const title = document.createElement("h2");
  title.className = "discussion__title";
  title.textContent = obj.title;
  discussionContent.append(title);
  
  //discussion__answered
  discussionContent.append(discussionAnswered);
  const answerCheck = document.createElement("p");
  if(obj.answer){
    answerCheck.textContent = "☑";
  }
  discussionAnswered.append(answerCheck);
  
  li.append(avatarWrapper, discussionContent);
  return li;
  /*
  <li class='discussion__container'>
    <div class='discussion__avatar--wrapper'></div>
    <div class='discussion__content'></div>
    <div class='discussion__answered'></div>
  </li>
  */

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

// form에서 입력한 내용을 새로 렌더링 하기
const render2 = (element) => {
  element.insertBefore(convertToDiscussion(agoraStatesDiscussions[0]), element.children[0]);
  return;
}

const nameInput = document.querySelector("#name");
const titleInput = document.querySelector("#title");
const storyInput = document.querySelector("#story");

const submitForm = document.querySelector('form.form');
submitForm.onsubmit = e => {
  e.preventDefault();
  let newStoryObj = {};
  newStoryObj.author = nameInput.value;
  newStoryObj.title = titleInput.value;
  newStoryObj.story = storyInput.value;
  newStoryObj.createdAt = new Date().toLocaleString();
  newStoryObj.avatarUrl = 'https://p.kindpng.com/picc/s/33-338711_circle-user-icon-blue-hd-png-download.png';
  agoraStatesDiscussions.unshift(newStoryObj);
  console.log(agoraStatesDiscussions);
  render2(ul);
};

// 날짜 형식 
const createdDate = document.querySelectorAll('p.createdAt');
for(let i = 0; i < createdDate.length; i++){
  createdDate[i].textContent = new Date(Date.parse(createdDate[i].textContent)).toLocaleString()
}