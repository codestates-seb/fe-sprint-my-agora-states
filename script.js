// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions); //배열 확인

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
  const avatarImg = document.createElement("img"); //img생성
  avatarImg.className = "discussion__avatar--image";//클래스 생성
  avatarImg.src = obj.avatarUrl; // img src에 객체의 avatarUrl 할당
  avatarImg.alt = "avatar of" + obj.author; 
  avatarWrapper.append(avatarImg); //avartarWrapper에 avatarImg append

  

  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);//discussionTitle에 titleAnchor append
  discussionContent.append(discussionTitle);//discussionContent에 discussionTitle append
  

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discission__information";
  discussionInfo.textContent = `${obj.author}  ${new Date(obj.createAt).toLocaleTimeString()}` 
  discussionContent.append(discussionTitle, discussionInfo);

  const checked = document.createElement("p");
  checked.textContent = obj.answer ? '✓' : '𐄂'; // obj.answer값이 있으면 ✓리턴 null이면 𐄂리턴
  discussionAnswered.append(checked);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
const form = document.querySelector(".form");
const inputName = document.querySelector(".form__input--name > input");
const inputTitle = document.querySelector(".form__input--title > input");
const inputQuestion = document.querySelector(".form__textbox > textarea");

  
form.addEventListener('submit',(event) =>{ 
  event.preventDefault();  //submit의 기본동작 새로고침 방지
  


const obj = {  
  id : 'unique value' , 
  createdAt: new Date(),
  title: inputTitle.value,
  url: "",
  author: inputName.value,
  answer: null, 
  bodyHTML: inputQuestion.value, 
  avatarUrl:
    "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
}



ul.prepend (convertToDiscussion(obj));  


inputName.value = '';
inputTitle.value = '';
inputQuestion.value = '';})	 



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


