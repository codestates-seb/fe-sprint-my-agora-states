// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  const discussionContent = document.createElement("div");
  const discussionAnswered = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  discussionContent.className = "discussion__content";
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('discussion__avatar--image');
  avatarImg.setAttribute('src' ,`${obj.avatarUrl}`);
  avatarWrapper.append(avatarImg)

  const anchorUrl = document.createElement('a');
  anchorUrl.setAttribute('href', `${obj.url}`);
  anchorUrl.textContent = `${obj.title}`

  const discussionTitle = document.createElement('h2');
  discussionTitle.classList.add('discussion__title');

  const discussionInfo = document.createElement('div');
  discussionInfo.classList.add('discussion__information');
  discussionInfo.textContent = `${obj.createdAt},${obj.author}`;

  discussionTitle.append(anchorUrl);
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInfo);

const checkBox = document.createElement('p');
checkBox.textContent = '✅';
discussionAnswered.append(checkBox);

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
