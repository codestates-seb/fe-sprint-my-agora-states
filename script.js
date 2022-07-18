// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

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
  // image
  const avatarImg = document.createElement('img');
  avatarImg.className = ".discussion__avatar--image";
  avatarImg.setAttribute('src', obj.avatarUrl);
  avatarImg.setAttribute('alt', obj.author);
  avatarWrapper.appendChild(avatarImg);

  // contents
  const newTitle = document.createElement('h2');
  newTitle.className = "discussion__title";
  const newA = document.createElement('a');
  newA.setAttribute('href', obj.url);
  newA.textContent = obj.title;
  newTitle.appendChild(newA);
  discussionContent.appendChild(newTitle);

  const newInformation = document.createElement('div');
  newInformation.className = "discussion__information";
  newInformation.textContent = obj.author + ` / ` + obj.createdAt.slice(0, 10);
  discussionContent.appendChild(newInformation);

  // Answered
  const newAnswer = document.createElement('p');
  if (obj.answer) {
    discussionAnswered.innerHTML = `<input type="checkbox" class="active" checked />`;
  } else {
    discussionAnswered.innerHTML = `<input type="checkbox" class="active"  />`;
  }
  discussionAnswered.appendChild(newAnswer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//discussion add
//정보 추가
const newDiscussion = document.querySelector("form");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputQuestion = document.querySelector("#story");

newDiscussion.addEventListener('submit', (e) =>{
  e.preventDefault(); 
  const newQuestion = {};
  newQuestion.createdAt = addNowTime();
  newQuestion.title = inputTitle.value;
  newQuestion.author = inputName.value;
  newQuestion.bodyHTML = inputQuestion.value;
  newQuestion.avatarUrl = "https://i.pinimg.com/564x/f8/76/b7/f876b7523cd17b2e9b95dd1d1cfceee3.jpg"

  agoraStatesDiscussions.unshift(newQuestion);
  ul.innerHTML = "";
  render(ul);

  inputName.value = "";
  inputTitle.value = "";
  inputQuestion.value = "";
});

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

//현지 시간 적용
const addNowTime = () => {
  const date = new Date();
  let hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  if(hour >= 12){
    hour = hour - 12;
    return `오후${hour}:${minute}:${second}`;
  }else{
    return `오전${hour}:${minute}:${second}`;
  }
}

//페이지네이션


//디스커션