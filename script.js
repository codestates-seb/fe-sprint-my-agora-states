// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
let data;
const dataFromLocalStorage = localStorage.getItem('agoraStatesDiscussions')
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage)
} else {
  data = agoraStatesDiscussions.slice()
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
/* 더미데이터에서 정보 로드 및 화면에 출력 */
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const localData = new Date(obj.createdAt).toLocaleString();

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img');
    avatarImg.className = "discussion__avatar--image";
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of' + obj.author;
    avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
    discussionTitle.className = "discussion__title";
    const discussionAnchor = document.createElement('a');
      discussionAnchor.href = obj.url;
      discussionAnchor.textContent = obj.title;
      discussionTitle.append(discussionAnchor);
    discussionContent.append(discussionTitle);  
  const discussionInformation = document.createElement('div');
    discussionInformation.className = "discussion__information";
    discussionInformation.textContent = obj.author + ' / ' + localData;
    discussionContent.append(discussionInformation);

  const answer = document.createElement('p');
    if (obj.answer === null) {
      answer.textContent = '☒';
    } else {
    answer.textContent = '☑';
    }
    discussionAnswered.append(answer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < data.length; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 10, 1);

/* 새 디스커션 추가 */
let newDiscussion = document.querySelector("form");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputText = document.querySelector("#story");
const inputSubmit = document.querySelector("#submit");

const addDiscussion = (event) => {
  event.preventDefault();
  data.unshift({
    id: 'unknown',
    createdAt: new Date().toISOString(),
    title: inputTitle.value,
    url: null,
    author: inputName.value,
    answer: null,
    bodyHTML: inputText.value,
    avatarUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  })
  event.target.reset()

  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(data))
  
  newRender(ul);
}

newDiscussion = addEventListener('submit', addDiscussion);

const newRender = (element) => {
  element.prepend(convertToDiscussion(data[0]))
  return;
}