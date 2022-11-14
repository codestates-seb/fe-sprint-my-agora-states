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
  // 프로필 사진
  const faceimg = document.createElement('img')
  faceimg.className = 'discussion__avatar--image'
  faceimg.src = obj.avatarUrl
  faceimg.alt = 'avatar of' + obj.autor
  avatarWrapper.append(faceimg)

  // 타이틀 제목 
  const discussionTitle = document.createElement('h2')
  discussionTitle.className = 'discussion__title'
  discussionContent.append(discussionTitle)
  // 타이틀 링크
  const titlelink = document.createElement('a')
  titlelink.href = obj.url
  titlelink.textContent = obj.title
  discussionTitle.append(titlelink)

  // 사용자 정보
  const information = document.createElement('div')
  information.className = 'discussion__information'
  information.textContent = `${obj.author} / ${obj.createdAt}` // 날짜 표현 형식이 여러개가 있는데 이걸 제일 많이  쓴다
  discussionContent.append(information)
  // answer p 
  const checked = document.createElement('p')
  discussionAnswered.append(checked)
  

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
