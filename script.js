// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj,index) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // avatarWrapper
  const avatarImg = document.createElement('img');
  avatarImg.className = ("discussion__avatar--image");
  avatarImg.src = agoraStatesDiscussions[index].avatarUrl;
  avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[index].author;
  avatarWrapper.append(avatarImg);

  // discussionContent - contentTitle
  const contentTitle = document.createElement('h2');
  const contentLink = document.createElement('a');
  contentTitle.textContent = agoraStatesDiscussions[index].title;
  contentLink.href = agoraStatesDiscussions[index].url;
  
  contentTitle.innerHTML = `<h2 class="discussion__title"><a href="${contentLink.href}">${contentTitle.textContent}</a></h2>`
  discussionContent.append(contentTitle);

  // discussionContent - contentTitle
  const informUser = document.createElement('span');
  const informDate = document.createElement('span');
  informUser.textContent = agoraStatesDiscussions[index].author;
  informDate.textContent = agoraStatesDiscussions[index].createdAt;
  
  const informText = `${informUser.textContent} / ${informDate.textContent}`;
  discussionContent.append(informText);

  // discussionAnswered
  const answerCheck = document.createElement('p');
  if(!(agoraStatesDiscussions[index].answer)) answerCheck.textContent = '☐';
  else answerCheck.textContent = '☑';

  discussionAnswered.append(answerCheck);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i],i));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
