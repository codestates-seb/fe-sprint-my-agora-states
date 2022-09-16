// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //이미지 원형 아바타 + 글쓴이 정보
  const avatarImg = document.createElement("img");
  avatarImg.setAttribute('class', 'discussion__avatar--image')
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  avatarWrapper.append(avatarImg, discussionInfo);

  //콘텐츠 정보들 삽입 (제목, 본문)
  //h2, a 태그 - 질문제목 해당
  const contentTitle = document.createElement("h3");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  contentTitle.append(titleAnchor);
  contentTitle.className = "discussion__title";
  

  const contentBody = document.createElement('div');
  contentBody.className = "discussion__body";
  contentBody.innerHTML = obj.bodyHTML;
    
  discussionContent.appendChild(contentTitle);
  discussionContent.appendChild(contentBody);

  // 글쓴이 아이디, 글 작성 시간
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//form 입력 이벤트 핸들러 추가!
const discussion_form = document.querySelector(".form__container > form");
discussion_form.addEventListener('submit', (event) => {
  event.preventDefault();
  let new_discussion = {
    id : "any random string",
    author : discussion_form.name.value,
    createdAt : new Date(),
    avatarUrl : `https://avatars.dicebear.com/api/human/${Math.random()}.svg`,
    url : "",
    title : discussion_form.title.value,
    bodyHTML : discussion_form.story.value,
  };
  ul.prepend(convertToDiscussion(new_discussion));
  agoraStatesDiscussions.push(new_discussion);
})

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

