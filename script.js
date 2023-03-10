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

  // 이미지 넣기
  const avataImg = document.createElement('img');
  avataImg.className = "discussion__avatar--image";
  avataImg.src = obj.avatarUrl;
  avataImg.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avataImg);
  //이미지 넣기 끝

  //content 넣기
  const contentTitle = document.createElement('h3');
  contentTitle.className = "discussion__title"
  const titleAnchor = document.createElement('a');
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  contentTitle.append(titleAnchor);
  const contentInfo = document.createElement('div');
  contentInfo.className = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(contentTitle, contentInfo);
  //content 넣기 끝

  //답변 체크 넣기
  const checked = document.createElement('p');
  checked.textContent = obj.answer ? '✅' : '❎' ;
  discussionAnswered.append(checked); 
  //답변 체크 끝

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//입력한 질문도 li에 넣기
const form = document.querySelector('form.form');
const title = document.querySelector('input#title');
const author = document.querySelector('input#name');
const story = document.querySelector('textarea#story');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newDiscussion = {
    id: "unique value",
    createdAt: new Date,
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: author.value,
    answer: '',
    bodyHTML: story.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  ul.prepend(convertToDiscussion(newDiscussion))
})

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
