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
  
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('discussion__avatar--image');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //discussion__content 부분
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const information = document.createElement("div");
  information.className = "discussion__information";
  discussionContent.append(discussionTitle, information)

  //title 부분
  const innerTitle = document.createElement("a");
  innerTitle.href = obj.url;
  const titletext = document.createTextNode(obj.title)
  innerTitle.append(titletext)
  discussionTitle.append(innerTitle);

  //information 부분 
  //오전/오후 mm:dd:ss 포맷 날짜 생성
  function dateFormat() {
  const date = new Date(obj.createdAt);
  // String(date.getFullYear()).padStart(2,"0") + "년 " + String((date.getMonth()+1)).padStart(2, "0") + "월 " + String(date.getDate()).padStart(2, "0") + "일 "
  return (date.getHours() < 12 ? "오전" : "오후") + " " + String((date.getHours() % 12)).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, "0")
  }

  const informationtext = document.createTextNode(obj.author + " / " + dateFormat())
  information.append(informationtext);

  //answer 부분
  const innerAnswer = document.createElement("p");
  discussionAnswered.append(innerAnswer);
  const check = document.createTextNode("☑");
  innerAnswer.append(check);

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

// name 유효성 검사
// function onlyString(str) {
//   return /^[a-zA-Zㄱ-힣\s]*$/.test(str);  
// }

// 아래 확인하기
Date.prototype.amPm = function() {
  let h = this.getHours() < 12 ? "오전" : "오후";
  return h;
  }


document.querySelector('.form').onsubmit = function(){
  //여기서 this는 'form'을 의미합니다.
  let nameValue = this.name.value
  let titleValue = this.title.value
  //var storyValue = this.story.value


  let newArray = {
    author:nameValue, 
    title:titleValue,
    answer:null,
    createdAt:new Date(),
    avatarUrl:"https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"}; 

  console.log(newArray)
  agoraStatesDiscussions.unshift(newArray);
  console.log(agoraStatesDiscussions) 

  ul.prepend(convertToDiscussion(newArray));

  //input에 쓰여있던 모든 데이터를 없애줍니다(초기화).
  this.name.value = ""
  this.title.value = ""
  this.story.value = ""

  //제출 이벤트로 인한 새로고침 방지
  return false;
}