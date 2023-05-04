// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

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
  //image 데이터
  const avatar = document.createElement('img');
  avatar.className='discussion__avatar--image';
  avatar.src = obj.avatarUrl;
  
  //title 데이터
  const title = document.createElement('h2');
  title.className = 'discussion__title';
  const url = document.createElement('a');
  url.href = obj.url;
  url.textContent = obj.title;
  title.appendChild(url);

  //id와 날짜 데이터
  const information = document.createElement('div');
  information.className = 'discussion__information';
  information.textContent = obj.author+' / '+obj.createdAt;
  
  //답변완료여부
  const answered = document.createElement('p');
  obj.answer!==null?answered.textContent = '✅':'';

  avatarWrapper.appendChild(avatar);
  discussionContent.appendChild(title);
  discussionContent.appendChild(information);
  discussionAnswered.appendChild(answered);

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
