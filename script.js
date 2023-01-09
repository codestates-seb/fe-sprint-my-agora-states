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
  // 이미지
  const avaterImg = document.createElement('img');
  avaterImg.className = "discussion__avatar--image"
    avaterImg.src = obj.avatarUrl;
    avaterImg.alt = "avatar of " + obj.author;
  // 이미지 append
  avatarWrapper.append(avaterImg);
  
  // 타이틀
  const discussionTitle = document.createElement("h2")
  discussionTitle.className = "discussion__title"
  const titleHref = document.createElement("a");
  titleHref.href = obj.url;
  titleHref.textContent = obj.title
  // 하이퍼링크 append
  discussionTitle.append(titleHref)
  // 날짜와 작성자
  const discussionInformation = document.createElement("div")
  discussionInformation.className = "discussion__information"
    discussionInformation.textContent = obj.author + " / " + obj.createdAt
  // 컨텐츠 어펜드
  discussionContent.append(discussionTitle, discussionInformation)
  // 답변
  discussionAnswered.textContent = answer(obj.answer)
  discussionAnswered.className = "discussion__answered"
  function answer(nu){
    if (nu === null){
      return "☒"
    } else {
      return "☑"
    }
  } 
  
  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
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

