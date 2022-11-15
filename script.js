// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; // div에
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);
  getComputedStyle(avatarImg).color;

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  const discussionAnchor = document.createElement("a");
  discussionAnchor.href = obj.url; // a 태그의 속성 href
  discussionAnchor.textContent = obj.title; // <a>좋은 질문을 ~ </a> 인 것 참고
  discussionTitle.append(discussionAnchor);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent =
    obj.author + " / " + new Date(obj.createdAt).toLocaleTimeString("ko-KR");
  discussionContent.append(discussionInfo);

  const discussionCheck = document.createElement("p");
  discussionCheck.textContent = obj.answer ? "✔️" : "❌"; // answer(null인 경우, 아닌 경우) 값에 따라 체크 표시 차이
  discussionAnswered.append(discussionCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (ul) => {
  // render 함수에 ul 넣어줄 거니까 매개변수로 넣어도 상관 없음(어차피 변수명은 마음대로)
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

/* form 의 submit 출력 시 */

const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // sumbit 할 떄 새로고침 기본동작을 막아줌
  const newDiscussion = {
    id: "new id", // 임의로 설정
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  agoraStatesDiscussions.unshift(newDiscussion);
  const discussion = convertToDiscussion(newDiscussion);
  ul.prepend(discussion);

  // 데이터 초기화
  author.value = "";
  title.value = "";
  textbox.value = "";
});
