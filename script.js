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

  // avatar img
  const avatarImg = document.createElement("img"); // 요소 생성
  avatarImg.className = "discussion__avatar--image"; // 클래스 이름 지정
  avatarImg.setAttribute("src", obj.avatarUrl); // src 속성 설정
  avatarWrapper.append(avatarImg); // append

  // discussion title
  const discussionTitle = document.createElement('h2')
  discussionTitle.className = "discussion__title"
    // title url
    const titleUrl = document.createElement('a')
    titleUrl.setAttribute('href', obj.url)
    titleUrl.textContent = obj.title
    discussionTitle.append(titleUrl)
  // discussion information(id, createdAt)
  const discussionInformation = document.createElement('div')
  discussionInformation.className = ('discussion__information')
  discussionInformation.textContent = `${obj.id} / ${obj.createdAt}`

  // discusstion content에 새로 생성한 두 요소 append
  discussionContent.append(discussionTitle, discussionInformation)

  // discussion answered 내 Check 아이콘
  const answeredCheck = document.createElement('p')
  answeredCheck.textContent = '✅'
  discussionAnswered.append(answeredCheck)

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
