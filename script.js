// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  //obj : 각각의 요소.... 아래 render 함수에서 전달인자가 뭔지 봐야함!#@!@#
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  // 사진
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl; /// 이런부분에서 매게변수 obj안쓰고..agoraStatesDiscussions[0]이런식으로 쓰고있었음...후
  avatarImg.alt = "avatar of " + obj.author; // alt : 이미지의 대체 텍스트 설명.,시각적 브라우저도 alt 특성이 비어있을 경우 깨진 이미지 아이콘을 표시하지 않는다.
  avatarWrapper.append(avatarImg);
  // title
  const discussionTitle = document.createElement("h3");
  discussionTitle.className = "discussion__title";
  const ancor = document.createElement("a");
  ancor.href = obj.url;
  ancor.textContent = obj.title;
  discussionTitle.append(ancor);
  discussionContent.append(discussionTitle);
  // 시간
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`; //날짜는 obj.createdAt이거 로 썻었는데... new Date()내장객체 사용하면 현지시간 생성, to는 날짜 형식임
  discussionContent.append(discussionInformation);
  //체크박스
  const p = document.createElement("p");
  /* p.textContent =   answer 부분이 null이면 다른 모양으로 나오게 해야 하는데...어쩔...*/
  if (obj.answer === null) {
    p.textContent = "☒";
  } else {
    p.textContent = "☑";
  }
  discussionAnswered.append(p);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
//디스커션 추가
const form = document.querySelector(".form");
const title = document.querySelector("div.form__input--title > input");
const nameInput = document.querySelector("div.form__input--name > input");
const textbox = document.querySelector("div.form__textbox > textarea");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //새로운 객체를 만들어야한다
  //input에 입력된 값(value)를 넣은 새로운 객체
  //새로운 객체를 ul요소 앞으로 넣어준다.
  // 더미데이터(agoraStatesDiscussions)에도 추가해준다. ( 더미데이터는 기존에 가지고있던 데이터)- 기존데이터에 넣어주는건 안전장치
  const obj = {
    id: "unique id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: nameInput.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj); // 위에 디스커션 추가해주는 함수불러와서 적용
  ul.prepend(newDiscussion);
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); //바로 위에 함수 실행
