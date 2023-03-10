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

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionContent.append(discussionTitle, discussionInformation);
  discussionInformation.textContent = `${obj['author']} / ${new Date(obj['createdAt']).toLocaleString()}` ;

  const discussionTitleLink = document.createElement('a');
  discussionTitleLink.href = obj['url'];
  discussionTitleLink.textContent = obj['title'];
  discussionTitle.append(discussionTitleLink);

  const avaterImg = document.createElement('img')
  avaterImg.className = 'discussion__avatar--image';
  avaterImg.src = obj['avatarUrl'];
  avaterImg.art = obj['author'];
  avatarWrapper.append(avaterImg);

  const answerCheck = document.createElement('img');
  answerCheck.className = 'answerCheck'
  if (obj['answer']) {
    answerCheck.src = 'https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099_1280.png';
  } else {
    answerCheck.src = 'https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_1280.png';
  }
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
const ul = document.querySelector("ul.discussions__container");
render(ul);

const form = document.querySelector('.form');

const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputQuesiton = document.querySelector('#story');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const newdiscussion = {
    id: 'none',
    createdAt: new Date().toLocaleString(),
    title: inputTitle.value,
    url: "https://sebfe-codestates.zendesk.com/hc/ko",
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuesiton.value,
    avatarUrl: "https://cdn.pixabay.com/photo/2016/09/01/08/24/smiley-1635449_1280.png",
  };

  ul.prepend(convertToDiscussion(newdiscussion));

inputName.value = inputTitle.value = inputQuesiton.value = '';
})