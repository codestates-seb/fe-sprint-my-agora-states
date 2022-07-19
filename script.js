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
  // 1. 이미지 추가
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 2. discussion title 추가
  const title = document.createElement("h2");
  const titleLink = document.createElement("a");
  title.classList.add("discussion__title");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  title.append(titleLink);
  discussionContent.append(title);

  // 3. discussion information 추가
  const information = document.createElement('div');
  information.classList.add("discussion__information");
  information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`; // 새로운 날짜 생성 객체 ㄴㄴ
  discussionContent.append(information);

  // 4. 답변완료 시 체크박스 표시
  if (obj.answer === null) {
    discussionAnswered.textContent = "❎"
  } else {
    discussionAnswered.textContent = "✅"
  }
  

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

// 5. discussion 작성 후 submit 누르면 새로운 항목 생성
const form = document.querySelector("form.form") //form의 클래스명 form
const enterTitle = document.querySelector("div.form__input--title > input")
const enterName = document.querySelector("div.form__input--name > input")
const enterTextbox = document.querySelector("div.form__textbox > textarea")
form.addEventListener("submit", (event) => {
  event.preventDefault(); // event.preventDefault는 submit 버튼을 눌러 결과가 추가되는 것을 유지시켜주는 역할, 만약 이걸 써주지 않으면 바로 사라져버린다.
  // 새로운 객체를 만들어야 한다.
  // Input에 입력된 값(value)를 넣은 새로운 객체
  // 새로운 객체를 ul요소 아래로 넣어준다.
  // 더미 데이터 (agoraStatesDiscussion)에도 추가해준다.
const obj = {
  id: "Unique id",
  createdAt: new Date(), // 방금 저장한 날짜가 출력됨
  title: enterTitle.value,
  url: "https://github.com/codestates-seb/agora-states-fe/discussions",
  author: enterName.value,
  answer: null,
  bodyHTML: enterTextbox.value,
  avatarUrl:
    "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
}
agoraStatesDiscussions.unshift(obj);
const newDiscussion = convertToDiscussion(obj);
ul.prepend(newDiscussion)
})

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
