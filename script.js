// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  // li 요소 생성 및 클래스 맞춰줌
  const li = document.createElement("li");
  li.className = "discussion__container";

  // 이미지 div 요소 생성 및 클래스 생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // img 요소 제작, data.js의 배열 데이터 가져오기
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  // HTML에 맞게 자식으로 넣어주기
  avatarWrapper.append(avatarImg);

  // content 불러오기
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // 제목 불러오기
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  // 인포메이션 불러오기
  const discussionInfomation = document.createElement("div");
  discussionInfomation.className = "discussion__information";
  discussionInfomation.textContent = `${obj.author} / ${obj.createdAt}`;
  // 마무으리
  discussionContent.append(discussionTitle, discussionInfomation);

  // 답변 유무 불러오기
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const isAnswer = document.createElement("p");
  isAnswer.textContent = obj.answer !== null ? "☑" : "☒";
  discussionAnswered.append(isAnswer);
  discussionContent.append(discussionAnswered);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

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

// 제출
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // submit 이벤트 필수
  // addEventListener 안으로 선언 위치 이동
  const author = form.querySelector("div.form__input--name > input").value;
  const title = form.querySelector("div.form__input--title > input").value;
  const textbox = form.querySelector("div.form__textbox > textarea").value;

  const newObj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: title,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author,
    bodyHTML: textbox,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  // addEventListener 안으로 선언 위치 이동
  agoraStatesDiscussions.unshift(newObj);

  ul.prepend(convertToDiscussion(newObj));

  // submit 후 빈칸으로 리셋
  form.querySelector("div.form__input--name > input").value = "";
  form.querySelector("div.form__input--title > input").value = "";
  form.querySelector("div.form__textbox > textarea").value = "";
});
