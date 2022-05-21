// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);


//타임스탬프 변형 함수 : (오늘 날짜) 오전 10:02:08  (다른 날짜) 2022-05-12
const transformTime = function(timeString){
  let today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);

  const todayString = `${year}-${month}-${day}`;
  const objDayString = timeString.slice(0, 10);
  let transformTime = "";
  if(todayString === objDayString) {
    //오늘 날짜면 '오전 10:02:08'
    transformTime = parseInt(timeString.slice(11, 13)) < 12 ? "오전" : "오후";
    //낮 12 = 오후 12시 이다.
    transformTime += " " + timeString.slice(11, 19);
  } else {
    //다른 날짜면 '2022-5-12'
    transformTime = objDayString;
  }
  return transformTime;
}

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
  const timeStamp = transformTime(obj.createdAt);
  contentInfo.textContent = `${obj.author} • ${timeStamp}`;

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


/*디스커션 추가 기능
1. 폼 관련 DOM을 가져온다.
2. 서브밋 버튼에 이벤트 리스너를 붙인다. submitBtn.addEventListener("click", function(){ })
3. ㄴ여기에 넣어준  함수 부분은 이런식으로 동작한다.
(a) 입력값들 넣어서 객체로 만들어주고, agoraStatesDiscussions 배열에도 넣어줘.
(b) 그 객체를 convertToDiscussion 함수에 넣어서 DOM으로 만들어줘.
(c) 그 DOM 을 ul.prepend(DOM) 해서 화면에 나타나게 해줘.
*/

//1. 폼 관련 DOM을 가져온다.
const inputWrapper = document.querySelector(".form__input--wrapper")
const inputId = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");
const submitBtn = document.querySelector(".form__submit input[type='submit']");
const resetBtn = document.querySelector(".form__submit input[type='reset']");

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
resetBtn.addEventListener("click", function(){
  submitBtn.setAttribute("disabled", true);
});
//--버튼 활성화 파트 끝

//2. 서브밋 버튼에 이벤트 리스너를 붙인다.
submitBtn.addEventListener("click", function(event){
  //event.preventDefault();

  //타임스탬프 생성
  let createdAt = creatTime();

  //(a) 입력값들 넣어서 객체로 만들어주고, agoraStatesDiscussions 배열에도 넣어줘.
  const newDiscussion = {
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

  agoraStatesDiscussions.unshift(newDiscussion);

  //(b) 그 객체를 convertToDiscussion 함수에 넣어서 DOM으로 만들어줘.
  const newDiscussionDOM = convertToDiscussion(newDiscussion);
  
  //(c) 그 DOM 을 ul.prepend(DOM) 해서 화면에 나타나게 해줘.
  ul.prepend(newDiscussionDOM); //prepend() 첫번째 자식 요소로 넣어라.

  //입력값 초기화
  inputId.value = "";
  inputTitle.value = "";
  inputStory.value = "";

  //submit 비활성화 실행
  submitBtnAbled();
})

//타임스탬프 생성 함수
const creatTime = function(){
  //타임스탬프 생성
  let today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  let hours = ('0' + today.getHours()).slice(-2); 
  let minutes = ('0' + today.getMinutes()).slice(-2);
  let seconds = ('0' + today.getSeconds()).slice(-2);
  
  let createdAt = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return createdAt;
}
