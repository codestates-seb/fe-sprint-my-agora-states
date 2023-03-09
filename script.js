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
  const author = obj.author;

  const createdAt = obj.createdAt;



  // 이미지 가져와서 태그 만들어줌
  const avatar = document.createElement("img");
  avatar.className = "discussion__avatar--image";
  const avatarUrl = obj.avatarUrl;
  avatar.src = avatarUrl;
  avatarWrapper.append(avatar);

  //타이틀 만들어줌
  const url = obj.url
  const title = obj.title
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title"
  const discussionTitle2 = document.createElement("a");
  discussionTitle2.target="_blank";
  discussionTitle2.href = url
  discussionTitle2.textContent = title
  // 작성자와 날짜
  const discussionInformation = document.createElement("div");
  discussionInformation.className ="discussion__information"
  discussionInformation.textContent = `${author} / ${createdAt}`
  
  discussionTitle.append(discussionTitle2)
  discussionContent.append(discussionTitle, discussionInformation)


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
