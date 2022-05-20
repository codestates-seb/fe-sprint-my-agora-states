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
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.classList.add('discussion__avatar--image');
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  titleLink.target = '_balnk';
  discussionTitle.classList.add('discussion__title');
  discussionTitle.append(titleLink);
  discussionContent.append(discussionTitle);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = 
  `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;
  discussionContent.append(discussionTitle, discussionInformation);

  const checkbox = document.createElement("p");
  checkbox.textContent = obj.answer ? "😀" : "🥲";
  discussionAnswered.append(checkbox);

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


// 시계 그냥 추가하기 ^<^...
const today = document.querySelector("#today");

// clock.innerText = "lalala" // HTML 글자 변경

// intervals = 매번 일어나야 하는 무언가
// timeout = 한번만 뿅

function getToday(){
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  today.innerHTML = (`${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`);
}

getToday(); // 한 번만 보여줌
setInterval(getToday, 1000); // 실시간

//padStart(2, "0")

const clock1 = document.querySelector("#clock");

function getClock(){
  const clock = new Date();
  const hour= String(clock.getHours()).padStart(2, "0");
  const minute = String(clock.getMinutes()).padStart(2, "0");
  clock1.innerHTML = (`${hour}:${minute}`);
}

getClock();
setInterval(getClock,1000);