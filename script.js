// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions.length);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  // 아바타 이미지 생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // 디스커션 콘텐츠 생성
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // 답변 생성
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  // console.log(obj.title);
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 아바타 이미지 넣기
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);


  // 디스커션 콘텐츠 넣기
  // 타이틀 -> title, url
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement('a');
  discussionLink.href = obj.url;
  discussionLink.textContent = `${obj.title}`
  discussionTitle.append(discussionLink);
  discussionContent.append(discussionTitle);
  // 작성자 정보 -> author , createdAt
  const discussionInform = document.createElement('div');
  discussionInform.className = "discussion__information";
  discussionInform.textContent =  `${obj.author} / ${obj.createdAt}`
  discussionContent.append(discussionInform)
  // 답변완료 표시
  const discussionCheck = document.createElement('p');
  discussionCheck.textContent = '☑';
  discussionAnswered.append(discussionCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  const ul = document.querySelector('ul.discussions__container');
  ul.append(li);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  console.log(element)
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
