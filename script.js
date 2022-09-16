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
  li.append(avatarWrapper, discussionContent, discussionAnswered);

  // 아바타 이미지 영역
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author; // 이미지가 안보일때 설명
  avatarWrapper.append(avatarImg);

  // 콘텐츠 영역
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionTitle.appendChild(document.createElement("a"));
  discussionTitle.firstChild.href = obj.url;
  discussionTitle.firstChild.textContent = obj.title;

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  discussionContent.append(discussionTitle, discussionInformation);

  // 체크박스 영역
  const discussionCheckBox = document.createElement("p");
  discussionCheckBox.textContent = obj.answer ? "☑" : "☒";
  discussionAnswered.append(discussionCheckBox);
  
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // 지우고 배열에 있는 내용을 보여줌
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// form에 입력된 값들로 새로운 객체를 생성해 agoraStatesDiscussions 배열에 추가
const form = document.querySelector(".form");

const inputName = document.querySelector('.form__input--name > input');
const inputTitle = document.querySelector('.form__input--title > input');
const textareaStory = document.querySelector('.form__textbox > textarea');
const buttonSubmit = document.querySelector('.form__submit > input');

form.addEventListener("submit", (event) => {
  // console.log("이벤트 발생"); // 새로고침 때문에 이벤트 발생전으로 돌아감
  event.preventDefault(); // 새로고침으로 초기화되는거 방지
  
  const newDiscussion = {
    id: inputName.value,
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: inputName.value,
    bodyHTML: textareaStory.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  agoraStatesDiscussions.unshift(newDiscussion);
  render(ul);
})