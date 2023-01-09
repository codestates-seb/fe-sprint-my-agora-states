// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const hederButton = document.querySelector("#writeBtn");
const inputFormBox = document.querySelector('.form__container');
const writeIcon = document.querySelector('#write');
const closeIcon = document.querySelector('#close');
let inputViewBox = false;

hederButton.addEventListener('click', () => {

  if(!inputViewBox) {
    inputFormBox.style.display = 'block';
    writeIcon.style.display = 'none';
    closeIcon.style.display = 'block';

    return inputViewBox = true;

  }
  if(inputViewBox) {
  inputFormBox.style.display = 'none';
  writeIcon.style.display = 'block';
  closeIcon.style.display = 'none';
  return inputViewBox = false;
  }
})

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

  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image';
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`;
  avatarImage.style.width = '50px';
  avatarWrapper.appendChild(avatarImage);

  const discussionTitle = document.createElement('h2');
  const discussionLink = document.createElement('a');
  discussionTitle.className = 'discussion__title';
  discussionLink.href = obj.url;
  discussionLink.textContent = obj.title;
  discussionTitle.appendChild(discussionLink);
  discussionContent.appendChild(discussionTitle);


  const discussionCommand = document.createElement('div');
  discussionCommand.className = 'discussion__answered';
  const discussionCommandBox = document.createElement('p');
  discussionCommandBox.textContent = `☑`;
  //discussionCommandBox.textContent = `☐`;
  discussionCommand.appendChild(discussionCommandBox);
  discussionAnswered.appendChild(discussionCommand);


  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.appendChild(discussionInformation);
  

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
