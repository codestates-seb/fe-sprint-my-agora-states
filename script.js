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
  //div.discussion__avatar--wrapper 의 자식 요소 채우기
  const avatarImg = document.createElement("img");
  avatarImg.classList = "discussion__avatar--image";
  avatarImg.setAttribute("src", obj.avatarUrl);
  avatarImg.setAttribute("alt", `avartar of ${obj.author}`);

  avatarWrapper.append(avatarImg);

  //div.discussion__content 의 자식 요소 채우기
  const contentTitle = document.createElement("h2");
  contentTitle.classList = "discussion__title";
  const contentTitleLink = document.createElement("a");
  contentTitleLink.setAttribute("href", obj.url);
  contentTitleLink.textContent = obj.title;
  contentTitle.append(contentTitleLink);

  const contentInfo = document.createElement("div")
  contentInfo.classList = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${obj.createdAt}`;

  discussionContent.append(contentTitle, contentInfo);

  //div.discussion__answered 의 자식 요소 채우기
  const answerCheck = document.createElement("p");
  answerCheck.textContent = obj.answer !== null ? "☑" : "☒";

  discussionAnswered.append(answerCheck);

  //li에 각 div 노드 추가
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

//디스커션 추가 기능
const inputWrapper = document.querySelector(".form__input--wrapper")
const inputId = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");
const submitBtn = document.querySelector(".form__submit input[type='submit']");

//입력창에 빈 부분 없으면 submit 버튼 활성화
const submitBtnAbled = function() {
  if (inputId.value.trim() && inputTitle.value.trim() && inputStory.value.trim()){
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
inputId.addEventListener("change", submitBtnAbled);
inputTitle.addEventListener("change", submitBtnAbled);
inputStory.addEventListener("change", submitBtnAbled);
inputId.addEventListener("keyup", submitBtnAbled);
inputTitle.addEventListener("keyup", submitBtnAbled);
inputStory.addEventListener("keyup", submitBtnAbled);

//submit 버튼 이벤트핸들러
submitBtn.addEventListener("click", function(event){
  event.preventDefault();

  //타임스탬프 생성
  let today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  let hours = ('0' + today.getHours()).slice(-2); 
  let minutes = ('0' + today.getMinutes()).slice(-2);
  let seconds = ('0' + today.getSeconds()).slice(-2);
  
  let createdAt = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  const newdiscussion = {
    id: "new" + String(counting()),
    createdAt,
    title: inputTitle.value,
    url: null,
    author: inputId.value,
    answer: null,
    bodyHTML:
      `<p dir="auto">${inputStory.value}</p>`,
    avatarUrl: "https://picsum.photos/100",
  };

  agoraStatesDiscussions.unshift(newdiscussion);

  //discussions__container 요소 안에 자식 모두 제거
  removeList(ul)

  //다시 li 랜더하기
  render(ul);

})


//id 생성용 클로저 함수 (id는 제가 임의로 new1, new2, ... 형식으로 넣었습니다.)
const createId = function(){
  let count = 0;

  return function(){
    count++;
    return count;
  }
}
const counting = createId();
//counting() 할 때마다 1씩 증가


//자식 모두 제거 함수
const removeList = function(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }
}