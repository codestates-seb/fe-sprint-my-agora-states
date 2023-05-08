// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

//순수함수
 //외부 영향 x
 // input->output
const images = ['0.png','1.png','2.png','3.png','4.png']
let inputname = document.getElementById('name')
let inputtitle = document.getElementById('title')
let inputstory = document.getElementById('story')
let submitbtn = document.querySelector('.form__submit')
let inputcon = document.querySelector('.form__container')
let outputcon = document.querySelectorAll('.discussions__container')

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// DOM으로 바꿔주고 <li>APPEND 까지 한다
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
  if(obj.answer!==null){
    let answer = document.createElement('span')
  }
  let avatarImg = document.createElement('img')
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of'+obj.author;
  avatarWrapper.append(avatarImg);

  

  let contentUrl = document.createElement('a')
  contentUrl.href = obj.url
  contentUrl.textContent = obj.title;
  discussionContent.append(contentUrl);
  contentUrl.href = undefined

  let information = document.createElement('div')
  information.textContent = obj.author +'/'+obj.createdAt
  information.className = 'discussion__information'
  discussionContent.append(information)

  li.append(avatarWrapper,discussionContent,discussionAnswered);
  return li;
};
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// <ul> append
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 내가쓴 3가지가 객체에 unshift 되도록 하자//
submitbtn.addEventListener("click",(event)=> {
  event.preventDefault();
  let name = inputname.value;
  let title = inputtitle.value;
  let story = inputstory.value;
  let information = document.createElement('div')
  information.className = 'discussion__information'
  const randomNum = Math.floor(Math.random()*5);
  let today = new Date();   

let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜
let hour = today.getHours(); // 시간
let min = today.getMinutes(); // 분
let sec = today.getSeconds(); // 초
let now = `${year}/${month}/${date} ${hour} : ${min} : ${sec}`
  agoraStatesDiscussions.unshift({
    author : name,
    title: title,
    story: story,
    avatarUrl : images[randomNum],
    createdAt : now
  });
  
  // while(ul.firstChild){
  //   ul.removeChild(ul.firstChild)
  // }
  ul.innerHTML = '';
  render(ul);

  inputname.value = '';
  inputtitle.value = '';
  inputstory.value = '';
});