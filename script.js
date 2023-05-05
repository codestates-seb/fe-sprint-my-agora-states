// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; // 이미지 박스 생성
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content"; // 콘텐츠 박스 생성
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered"; // 답변 완료 박스 생성

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const contentTitle = document.createElement('h2');
  contentTitle.className = 'discussion__title';
  discussionContent.append(contentTitle); // 타이틀

  const contentTitleLink = document.createElement('a');
  contentTitleLink.href = obj.url
  contentTitleLink.textContent = obj.title;
  contentTitle.append(contentTitleLink); // 타이틀 링크

  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar-image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg); // 이미지

  const contentInfo = document.createElement('div');
  contentInfo.className = 'discussion__information';
  contentInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(contentInfo); // 날짜

  const answeredDoneCheck = document.createElement('p');
  answeredDoneCheck.textContent = `☑`
  discussionAnswered.append(answeredDoneCheck) // 답변 완료 체크

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
