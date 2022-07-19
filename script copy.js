// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  // 여기에서 obj 는 ul 을 뜻해요
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // 아바타 이미지
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 컨텐츠 제목
  const contentTitle = document.createElement('h2');
  contentTitle.className = 'discussion__title';
  discussionContent.append(contentTitle);
  const contentLink = document.createElement('a');
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  discussionAnswered.append(contentLink);
  
  // information
  const contentInformation = document.createElement('div');
  contentInformation.className = 'discussion__information';
  contentInformation.textContent = new Date(obj.createdAt).toLocaleString();
  // new Date(obj.createdAt).toLocaleString()
  discussionAnswered.append(contentInformation);

  // 답변
  const checkAnswered = document.createElement("p");
  discussionAnswered.append(checkAnswered);
  obj.answer
    ? (checkAnswered.textContent = "☑")
    : (checkAnswered.textContent = "☒");
  if (checkAnswered.textContent === "☒") {
    checkAnswered.style.color = "red";
  }
  

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form');
const title = document.querySelector('div.form__input--title > input');
const nameInput = document.querySelector('div.form__input--name > input');
const textbox = document.querySelector('div.form__textbox > textarea');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // 왜 써야되는가
  // 새로운 객체를 만들어야 한다.
  // Input 에 입력된 값(value)를 넣은 새로운 객체.
  // 새로운 객체를 ul요소 아래로 넣어준다.
  // 더미 데이터(agoraStateDiscussions)에도 추가해준다.
  const obj = {
    id: "unique id",
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: nameInput.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion);
  // 앞에 추가해야되기때문에 unshift
})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // 여기서 element 는 ul 을 뜻 해요
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


// 페이징네이션
let startIndex = 0;
let endIndex = 10;

nextPageBtn.addEventListener('click' , () => {
  if(endIndex > agoraStatesDiscussions.length) return;

  startIndex += 10;
  endIndex += 10;

  removeChildes(ul);

  render(ul, startIndex, endIndex);
})

prevPageBtn.addEventListener('click',() => {
  if(startIndex <= 0) return;

  startIndex -= 10;
  endIndex -= 10;

  removeChildes(ul);

  render(ul, startIndex, endIndex0);
})

if (endIdx > agoraStatesDiscussions.length) return;
if (startIdx <= 0) return;
