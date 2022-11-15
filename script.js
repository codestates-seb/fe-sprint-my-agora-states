// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //image
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  //discussionContent
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);
  
  const discussionTitleURL = document.createElement("a");
  discussionTitleURL.href = obj.url;
  discussionTitleURL.textContent = obj.title;
  discussionTitle.append(discussionTitleURL);

  const discussionInformation = document.createElement("div");
  discussionInformation.textContent = obj.author+" "+obj.createdAt;
  discussionContent.append(discussionInformation);
  //answered
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionAnsweredcheckbox = document.createElement("p");
  discussionAnsweredcheckbox.textContent = obj.answer === null ? "o" : "x"
  discussionAnswered.append(discussionAnsweredcheckbox)

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

// 이벤트가 발생하면 아래 실행
let submit = docuemt.querySelector("#submit")
let inputName = document.querySelector("#name")
let inputTitle = document.querySelector("#title")
let inputStory = document.querySelector("#story")
submit.addEventListener("click", function({
// 객체 생성 후 새로 입력된 내용 배열에 추가하기
  let newPost = {}
  newPost.id = inputName.value
  newPost.title = inputTitle.value
  // bodyHTML : 이건 나중에 구현해보자
  agoraStatesDiscussions.unshift('newPost')
}))






