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
 // 아바타 
  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image';
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`;
  avatarImage.style.width = '50px';
  avatarWrapper.appendChild(avatarImage);

  // 타이틀
  const titleName = document.createElement("h2");
  const titleATag = document.createElement("a");
  titleName.classList.className = 'discussion__title';
  titleATag.textContent = obj.title;
  titleATag.href = obj.url;
  titleName.appendChild(titleATag);
  discussionContent.appendChild(titleName); 
  

  // 인포
  const info = document.createElement("div");
  info.className = 'discussion__information';
  info.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString('ko-KR')}`;
  discussionContent.appendChild(info);

  // Answered
  const answered = document.createElement('p');
  answered.textContent = obj.answer === null?
  "답변 대기중.."  :  "답변 완료"

  if (obj.answer === null) {
    answered.classList.add("comment-null")
  } else {
    answered.classList.add("comment-ok")
  }
  discussionAnswered.append(answered);

  



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
