// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // 프로필이미지
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div"); // 질문내용
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div"); // 체크박스
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 아바타 프로필 사진이 들어갈 <img> 요소도 추가하겠습니다. 
  // src, alt 속성을 agoraStatesDiscussions의 첫 번째 요소에 있는 데이터로 넣어줍니다.
  const avatarImg = document.createElement('img');
  avatarImg.src = agoraStatesDiscussions[0].avatarUrl;
  avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[0].author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionTitle.append(titleLink);
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt)}`
  discussionContent.append(discussionTitle, discussionInfo);

  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑︎" : "☒";
  discussionAnswered.append(checked);

  // DOM append 메서드를 이용하여, 위에서 생성한 <div>요소들을 li.discussion__container의 자식 요소로 추가할 수 있습니다.
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

