// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //아바타
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  

  //제목, 작성자, 날짜
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const title = document.createElement("h2");
  title.className = 'discussion__title';
  discussionContent.append(title);

  const link = document.createElement('a');
  link.innerText = obj.title;
  link.href = obj.url;
  title.append(link);

  const info = document.createElement("div");
  info.className = 'discussion__information';
  info.textContent = `${obj.author} / ${obj.createdAt} `;
  discussionContent.append(info);

  // 답변 확인
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  
  const AnsweredParaph = document.createElement("p");
  AnsweredParaph.textContent = '☑';
  discussionAnswered.append(AnsweredParaph);
  discussionContent.append(discussionAnswered);

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

