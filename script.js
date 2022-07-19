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
  //<-- 아바타 이미지 정보 넣기 -->
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avator of' + obj.author;
  avatarWrapper.append(avatarImg);

  //<-- 디스커션 제목과 해당 질문 페이지 하이퍼링크 정보 넣기 -->
  const title = document.createElement('h2');
  const titleHref = document.createElement('a');
  title.className = "discussion__title";
  titleHref.textContent = obj.title;
  titleHref.href = obj.url;
  title.append(titleHref);
  discussionContent.append(title);

  //<-- 디스커션 작성자 이름과 작성 시간 정보 넣기 -->
  const information = document.createElement('div');
  information.className = "discussion__information";
  information.textContent = obj.author + ' / ' + new Date(obj.createdAt).toLocaleString();
  discussionContent.append(information);

  //<-- 답변 여부 체크 정보 넣기 -->
  const checkBox = document.createElement('p');
  checkBox.className = "discussion__answered";
  checkBox.textContent = obj.answer ? '✅' : '❎';
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

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 새 디스커션 추가 기능 구현 
const form = document.querySelector('form.form');
const inputName = document.querySelector('input#name');
const inputTitle = document.querySelector('input#title');
const inputStory = document.querySelector('textarea#story');

form.addEventListener("submit", (event)=>{
  event.preventDefault(); // 왜 있어야 하는가?
  const newObj = {
      id: "D_idNumber",
      createdAt:new Date(),
      title: inputTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions",
      author: inputName.value,
      answer: null,
      bodyHTML: inputStory.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  };
  agoraStatesDiscussions.unshift(newObj);
  const newDiscussion = convertToDiscussion(newObj);
  ul.prepend(newDiscussion);
});