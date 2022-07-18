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

  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  const titleHref = document.createElement('a');
  titleHref.href = obj.url;
  titleHref.textContent = obj.title;
  discussionTitle.append(titleHref);

  const discussionInformation = document.createElement('div');
  discussionInformation.className = "discussion__information";
  let createdAt_time = obj.createdAt.slice(-9, -1);
  if(createdAt_time.slice(0, 2) < 13){
    createdAt_time = `오전 ${createdAt_time}`;
  }else if(createdAt_time.slice(0, 2) >= 13 && createdAt_time.slice(0, 2) < 22){
    createdAt_time = `오후 0${createdAt_time.slice(0, 2) - 12}${createdAt_time.slice(2)}`;
  }else {
    createdAt_time = `오후 ${createdAt_time.slice(0, 2) - 12}${createdAt_time.slice(2)}`;
  }
  discussionInformation.textContent = `${obj.author} / ${createdAt_time}`;
  discussionContent.append(discussionInformation);

  const answeredCheckbox = document.createElement('p');
  if(obj.answer) {
    answeredCheckbox.textContent = "☑";
  } else {
    answeredCheckbox.textContent = "☒";
  }
  discussionAnswered.append(answeredCheckbox);


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
