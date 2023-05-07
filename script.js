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
  // 이미지 요소 넣어주기
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  // agoraStatesDiscussions[0].author
  avatarWrapper.append(avatarImg);//만들고 넣기


  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title";
  const contentA = document.createElement('a');
  contentA.href = obj.urcl;
  contentA.innerHTML = obj.title;
  contentTitle.append(contentA);
  discussionContent.append(contentTitle)
  
  const contentInfo = document.createElement('div');
  const date = new Date(obj.createdAt);
  const writeDate = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDay()}일 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  contentInfo.className = "discussion__information";
  contentInfo.textContent = obj.author + " / " + writeDate;
  discussionContent.append(contentInfo);

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

const form = document.querySelector('form.form');
const title = document.querySelector('input#title')
const writer = document.querySelector('input#name')
const story = document.querySelector('textarea#story')