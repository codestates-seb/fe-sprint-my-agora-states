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

  // 유저 이미지
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.className = 'discussion__avatar--image'
  avatarWrapper.append(avatarImg);

  // 질문 내용
  const dicussionTitle = document.createElement('h2');
  const titleAnchor = document.createElement('a');
  const titleInfo = document.createElement('div');
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  titleInfo.textContent = obj.author + ' / ' + obj.createdAt;
  titleInfo.className = 'discussion__information';
  dicussionTitle.append(titleAnchor);
  discussionContent.append(dicussionTitle);
  discussionContent.append(titleInfo);

  // 답변 여부
  const answerInfo = document.createElement('img');
  if (obj.answer === null) {
    answerInfo.src = (src="./img/x.png");
  } else {
    answerInfo.src = (src="./img/o.png");
  }
  discussionAnswered.append(answerInfo);

  // li 요소에 추가
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

// 디스커션 추가기능
const formName = document.querySelector('#nick');
const formTitle = document.querySelector('#title');
const btn = document.querySelector('#subBtn');
const newObj = {
  createdAt: '...',
  title: formTitle.value,
  author: formName.value,
  avatarUrl: 'https://avatars.githubusercontent.com/u/99703878?s=400&u=0f4fe50ead7be329042c38f0ef1e6a6c2ac49448&v=4',
  answer: null
};

const onBtn = (e) => {
  newObj.title = formTitle.value;
  newObj.author = formName.value;

  agoraStatesDiscussions.unshift(newObj);
  let li = convertToDiscussion(newObj);
  ul.prepend(li);
  return render(ul);
}

btn.addEventListener('click',onBtn);