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

// 프로필 이미지 불러오기
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avatarImage);
// 작성자 / 작성날짜 정보
  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleDateString()}`;
// 링크 및 제목
  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  discussionTitle.append(titleLink)
  discussionContent.append(discussionTitle, discussionInfo)
// 답변
  const discussion_ans = document.createElement('p');
  discussion_ans.textContent = obj.answer != null ? '✔️' : '✖️';
  discussionAnswered.append(discussion_ans);

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

// input 불러오기
const form = document.querySelector('form.form');
const formTitle = form.querySelector(".form__input--title > input");
const formAuthor = document.querySelector('.form__input--name > input');
const formTextbox = form.querySelector(".form__textbox > textarea");

form.addEventListener("submit", (event) => { // 서브밋 이벤트가 발생하면
  event.preventDefault(); // 페이지 새로고침 방지

  const obj = {
    id: "hello",
    createdAt: new Date().toLocaleDateString(),
    url: "https://github.com/pnr98/fe-sprint-my-agora-states",
    title: formTitle.value,
    author: formAuthor.value,
    answer: null,
    bodyHTML: formTextbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/129926357?s=400&u=510f31940547e71fa8d3e5567d609148b8f9bb26&v=4",
  };
  agoraStatesDiscussions.unshift(obj); // 객체 추가
  ul.prepend(convertToDiscussion(obj)); // convertToDiscussion: bj를 받아서 해당 객체를 새로운 li요소를 생성, 반환. prepend는 새로운 li요소를 ul요소의 첫번째 자식으로 추가
  formAuthor.value = ""; // 빈칸 비우기
  formTitle.value = "";
  formTextbox.value = "";
});