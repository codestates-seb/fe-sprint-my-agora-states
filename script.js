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

  //TITLE DOM 지정
  const title = document.createElement('h2')
  title.className = "discussion__title"

  //TITLE URL a 태그 지정
  const titleUrl = document.createElement('a')
  titleUrl.href = obj.url

  //TITLE 데이터 삽입
  titleUrl.textContent = obj.title

  //TITLE HTML 표현
  title.append(titleUrl)
  discussionContent.append(title)

  //AVATAR DOM 지정
  const avatar = document.createElement('img')
  avatar.className = 'discussion__avatar--wrapper'

  //AVATAR 데이터 삽입
  avatar.src = obj.avatarUrl

  //AVATAR HTML 표현
  avatarWrapper.append(avatar)

  //DISCUSSION INFO (author, createdAT) 태그 지정
  const discussInfo = document.createElement('div')
  discussInfo.className = 'discussion__information'

  //DISCUSSION 데이터 삽입
  discussInfo.textContent = `${obj.author} / ${obj.createdAt}`

  //DISCUSSION 표현
  discussionContent.append(discussInfo)
  


  
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
