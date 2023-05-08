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

  

  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`
  avatarWrapper.appendChild(avatarImage); 

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionTitle.innerHTML = `<a href=${obj.url}>${obj.title}</a>`;
  
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author}  /  ${obj.createdAt}`

  const discussionCheck = document.createElement("div");
  discussionCheck.className = "check";
  discussionCheck.textContent = "☑";
  discussionAnswered.append(discussionCheck);
discussionContent.append(discussionTitle, discussionInformation);
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


//폼 작성시 discussion 목록에 포함시키기 
// 1) 폼 DOM 하기 

const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");
const inputSubmit = document.querySelector("#submit_q");

// 2) 제출 버튼 누르면 닉네임, 제목, 내용이 함께 새로운 li를 생성해 맨 위에 위치한다

const handleSubmit = (e) => {
  e.preventDefault(); // 폼 기본 동작 방지
  const name = inputName.value;
  const title = inputTitle.value;
  const story = inputStory.value;

  // 새로운 객체 생성
  const newDiscussion = {
    createdAt: new Date().toISOString(),
    title: title,
    author: name,
    bodyHTML: story,
    avatarUrl: "ast4.png"
  };

  // agoraStatesDiscussions 배열에 새로운 객체 추가
  agoraStatesDiscussions.unshift(newDiscussion);

  // 새로운 객체를 DOM으로 렌더링
  const ul = document.querySelector("ul.discussions__container");
  ul.prepend(convertToDiscussion(newDiscussion));

  // 입력 필드 초기화
  inputName.value = "";
  inputTitle.value = "";
  inputStory.value = "";
};

inputSubmit.addEventListener("click", handleSubmit);

