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

  // TODO: 프로필 이미지 >> 생성 및 정보 추가
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  // TODO: 프로필 이미지 >> 첨부
  avatarWrapper.append(avatarImg);

  // TODO: 질문 제목과 내용 >> 생성 및 정보 추가
  const discussionTitle = document.createElement("h2");
  const titleHref = document.createElement("a");
  discussionTitle.textContent = obj.title;
  titleHref.href = obj.url;
  // TODO: 질문 제목과 내용 >> 첨부
  discussionTitle.append(titleHref);
  discussionContent.append(discussionTitle);

  // TODO: 작성자와 시간 >> 생성 및 정보 추가
  const discussionInfo = document.createElement("div");
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;
  // TODO: 작성자와 시간 >> 첨부
  discussionContent.append(discussionTitle, discussionInfo);

  // TODO: 작성자와 시간 >> 생성 및 정보 추가
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑︎" : "☒";
  // TODO: 답변 여부 >> 첨부
  discussionAnswered.append(checked);

  const ul = document.querySelector("ul.discussions__container");
  ul.append(li);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
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

const form = document.querySelector("form.form");

// TODO: submit을 클릭하면 제출
form.addEventListener("submit", (event) => {
  event.preventDefault();
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
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  agoraStatesDiscussions.unshift(newObj);

  const discussion = convertToDiscussion(newObj);

  ul.prepend(discussion);

  // TODO: submit 후, 입력 내용 초기화
  form.querySelector("div.form__input--name > input").value = "";
  form.querySelector("div.form__input--title > input").value = "";
  form.querySelector("div.form__textbox > textarea").value = "";
});
