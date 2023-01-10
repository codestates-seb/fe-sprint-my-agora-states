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

  // 아바타 프로필 사진이 들어갈 <img> 요소를 추가합니다.
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  
  // 제목, 저자, 날짜 <div> 요소를 추가합니다.
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const titleAnchor = document.createElement('a');
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  
  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  
  discussionContent.append(discussionTitle, discussionInfo)

  // 답변 여부 체크를 추가합니다.
  const checked = document.createElement('p');
  checked.textContent = (obj.answer !== null) ? '☑' : '☐';
  discussionAnswered.append(checked);
  
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

const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputQuestion = document.querySelector('#story')
const inputForm = document.querySelector('.form');

inputForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newObj = {};
  newObj.id = null;
  newObj.createdAt = new Date()
  newObj.title = inputTitle.value;
  newObj.url = null;
  newObj.author = inputName.value;
  newObj.answer = null;
  newObj.bodyHTML = inputQuestion.value;
  newObj.avatarUrl = "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  
  agoraStatesDiscussions.unshift(newObj);
  ul.prepend(convertToDiscussion(newObj))

  inputName.value = '';
  inputTitle.value ='';
  inputQuestion.value ='';
  }
)