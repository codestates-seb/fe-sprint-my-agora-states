// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); //디아이비 요소생성
  avatarWrapper.className = "discussion__avatar--wrapper";// 클래스네임지정
  const discussionContent = document.createElement("div");//디아이비 요소생성
  discussionContent.className = "discussion__content";//클래스네임지정
  const discussionAnswered = document.createElement("div");//태그만들어줌
  discussionAnswered.className = "discussion__answered";
  const img = document.createElement('img')
  img.className="discussion__avatar--image"
  img.src = obj.avatarUrl
  avatarWrapper.append(img)
  const discussionTitle = document.createElement('h2')
  discussionTitle.className = "discussion__title"
  const aLink = document.createElement('a')
  aLink.href = obj.url
  aLink.textContent = obj.title
  discussionTitle.append(aLink)
  const discussionInformation = document.createElement('div')
  discussionInformation.className = "discussion__information"
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`
  discussionContent.append(discussionTitle, discussionInformation)
  const discussionCombined = document.createElement('div')
  discussionCombined.className="discussion__combined"
  discussionCombined.append(avatarWrapper, discussionContent)
  const pElement = document.createElement('p')
  pElement.textContent = '☑'
  discussionAnswered.append(pElement)


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.



  li.append(discussionCombined, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));//섹션을 만드는거
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


  