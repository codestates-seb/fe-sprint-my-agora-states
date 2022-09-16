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
  // 1. 아바타 영역
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;  
  avatarWrapper.append(avatarImg);

  // 2. 콘텐츠 영역
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = 'discussion__title';
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent =  `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  const titleAnchor = document.createElement('a');
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;

  discussionTitle.append(titleAnchor);
  discussionContent.append(discussionTitle, discussionInformation);
 
  // 3. 체크박스 영역
  const checkBox = document.createElement('p');
  if (obj.answer === null) {
    checkBox.textContent = '🔴';
  } else {
    checkBox.textContent = '🟢';
  }
  // checkBox.textContent = obj.answer ? '🟢' : '🔴';
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

// 이벤트 리스너로 새로운 discussion 만들기
const form = document.querySelector('.form');
const author = document.querySelector('.form__input--name > input');
const title = document.querySelector('.form__input--title > input');
const textArea = document.querySelector('.form__textbox > textarea');

form.addEventListener('submit', (event) => {
  event.preventDefault(); //새로고침 전으로 돌아감
  // 객체 하나를 만든다.
  const obj =    {
    id: "unique number",
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: author.value,
    answer: {
      id: "DC_kwDOHOApLM4AKg6M",
      createdAt: "2022-05-16T02:09:52Z",
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236",
      author: "Kingsenal",
      bodyHTML:
        '<p dir="auto">안녕하세요.</p>',
      avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    },
    bodyHTML:
      '<p dir="auto"></p>',
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  agoraStatesDiscussions.unshift(obj);
  console.log(agoraStatesDiscussions);
  // 그 객체를 convertToDiscussion에 넣어 DOM으로 변환
  // 그것을 render에 넣어 브라우저에 렌더링
  ul.prepend(convertToDiscussion(obj));
  title.value = "";
  author.value = "";
  textArea.value = "";
  
})

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);







