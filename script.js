// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImage = document.createElement("img");
  avatarImage.className ='discussion__avatar--image'
  avatarImage.src = obj["avatarUrl"];

  
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  discussionContent.textContent = obj['title'];
  
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  
  const answeredButton = document.createElement('button');
  answeredButton.textContent = "☑";
  

  
  avatarWrapper.append(avatarImage);
  discussionAnswered.append(answeredButton);
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

// const render = function(document.querySelector("ul.discussions__container")) {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     document.querySelector("ul.discussions__container").append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// }

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

render(ul);
