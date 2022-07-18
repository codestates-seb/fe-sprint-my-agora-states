// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  // <li class='discussion__container'></li>

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // <div class='discussion__avatar--wrapper'></div>
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // <div class='discussion__content'></div>
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  // <div class='discussion__answered'></div>



  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // discussion__avatar--wraper
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avatarImage);

  // discussion__content
  const title = document.createElement("h2");
  title.className = "discussion__title";
  discussionContent.append(title);

  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  title.append(titleLink);
  
  const information = document.createElement("div");
  information.className = "discussion__information"
  information.textContent = `${obj.author} / ${obj.createdAt}`
  discussionContent.append(information);
  
  //discussion__answered
  const answerCheck = document.createElement("p");
  if(obj.answer){
    answerCheck.textContent = "☑";
  }
  discussionAnswered.append(answerCheck);
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
  /*
  <li class='discussion__container'>
    <div class='discussion__avatar--wrapper'></div>
    <div class='discussion__content'></div>
    <div class='discussion__answered'></div>
  </li>
  */

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
