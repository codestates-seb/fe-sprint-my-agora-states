const ul = document.querySelector("ul.discussions__container");

// 출력
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // avatar--wrapper 아바타
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // discussion__content 디스커션
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // 링크
  const discussionAnchor = document.createElement('a');
  discussionAnchor.href = obj.url;
  discussionAnchor.textContent = obj.title;
  // 제목
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  // 글쓴이/날짜
  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = obj.author + ' / ' + obj.createdAt;

  // discussion__answered 답변여부
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const answerCheck = document.createElement('i');
  if(obj.answer != null){
    answerCheck.className = 'fa-solid fa-circle-check fa-xl';
  }
  
  // append
  discussionTitle.append(discussionAnchor);
  discussionContent.append(discussionTitle, discussionInfo);
  discussionAnswered.append(answerCheck);

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

render(ul);
