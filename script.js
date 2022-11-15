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

  const avatarsImg = document.createElement('img');
  avatarsImg.classList.add("discussion__avatar--image");
  avatarsImg.src = obj.avatarUrl;
  avatarsImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarsImg);

  const discussionTitle = document.createElement('h1');
  discussionTitle.className = 'discussion__title';
  const discussionUrl = document.createElement('a');
  discussionUrl.href = obj.url;
  discussionUrl.textContent = obj.title;
  discussionTitle.append(discussionUrl);
  discussionContent.append(discussionTitle);

  let at = '오전';
  let date = obj.createdAt.slice(0, 10);
  let hour = obj.createdAt.slice(11, 13);
  let minute = obj.createdAt.slice(14, 16);
  let second = obj.createdAt.slice(17, 19);
  if(hour>12) {
    hour = hour-12;
    at = '오후';
  }

  const discussionInformation = document.createElement('div');
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${date} ${at} ${hour}:${minute}:${second}`;
  discussionContent.append(discussionInformation);

  const discussionP = document.createElement('p');
  const discussionValue = document.querySelector('p');
  discussionP.textContent = discussionValue.textContent;
  discussionAnswered.append(discussionP);



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

const formSubmit = document.querySelector('form');
const input = document.querySelectorAll('#name');
const textarea = document.querySelector('#story');

//submit을 누르면 질문에 등록이 되고 새로고침해도 내용이 없어지면 안됨

formSubmit.addEventListener('submit', (ev)=>{
  ev.preventDefault()
  let submit = {};
  let time = new Date();
  let year = time.getFullYear();
  let month = ('0'+(time.getMonth()+1)).slice(-2);
  let day = ('0' + (time.getDay())).slice(-2);
  let hour = time.getHours();
  let minute = ('0' + time.getMinutes()).slice(-2);
  let second = ('0' + time.getSeconds()).slice(-2);
  
  submit.createdAt = `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
  submit.title = input[1].value;
  submit.author = input[0].value;
  submit.bodyHTML = textarea.value;
  submit.avatarUrl =
  "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  ul.prepend(convertToDiscussion(submit))
})