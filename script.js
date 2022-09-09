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
  const discussion__avatar__image = document.createElement('img');
  discussion__avatar__image.className = "discussion__avatar--image";
  const discussion__title = document.createElement('h2');
  discussion__title.className = "discussion__title";
  const discussion__title__a = document.createElement('a');
  const discussion__inform = document.createElement('div');
  const discussion__answered__p = document.createElement('p');
  discussion__inform.className = "discussion__information"
  discussion__inform.innerText = obj.author +' / '+ obj.createdAt
  discussion__title__a.setAttribute('href',obj.url);
  discussion__title__a.innerText = obj.title
  discussion__avatar__image.setAttribute('src',obj.avatarUrl);
  
  discussionContent.appendChild(discussion__title);
  discussion__title.appendChild(discussion__title__a);
  discussionContent.appendChild(discussion__inform);
  avatarWrapper.appendChild(discussion__avatar__image);
  

  
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
