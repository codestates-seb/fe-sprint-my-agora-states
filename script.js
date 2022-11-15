// console.log(agoraStatesDiscussions)

// Local Storage 생성
if (!localStorage.getItem("dataSet")) {
  //만약 localStorage에 agoraStatesDiscussions가 없으면
  localStorage.setItem(
    "dataSet",
    JSON.stringify(agoraStatesDiscussions)
  ); //localStorage에 키값과 value를 넣는다
}
let dataSet = JSON.parse(
  localStorage.getItem("dataSet")
); //newLocalStorage는 화면에서 보여줄 변수 저장소, newLocalStorage에는 agoraStatesDiscussions값을 json형식으로 받음
console.log(dataSet);
// localStorage.clear(); // Local Storage 초기화

// 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  // console.log(obj)

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // 삭제 함수
  const deleteDiscussion = (event) => {
    // console.log(event)
    // console.log(event.target.parentElement.parentElement)

    const removingOne = event.target.parentElement.parentElement;
    removingOne.remove();
  };

  // 아바타
  const img = document.createElement("img");
  img.className = "discussion__avatar--image";
  img.src = obj.avatarUrl;
  img.alt = "avatar of" + "누가 썼는지";
  avatarWrapper.append(img);

  // 디스커션 제목
  const h2 = document.createElement("h2");
  h2.className = "discussion__title";

  // 디스커션 제목의 a태그
  const a = document.createElement("a");
  a.textContent = obj.title;
  a.href = obj.url;
  h2.append(a);
  discussionContent.append(h2);

  // 디스커션의 information
  const div = document.createElement("div");
  div.className = "discussion__information";
  div.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString(
    "ko-KR"
  )}`;
  discussionContent.append(div);

  // 디스커션의 답변 체크박스
  const p = document.createElement("p");
  p.textContent = obj.answer ? "☑" : "☒";
  discussionAnswered.append(p);

  // x button
  const button = document.createElement("button");
  button.textContent = "x";
  discussionAnswered.append(button);
  button.addEventListener("click", deleteDiscussion);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 제출 폼에서 요소 가져오기
const form = document.querySelector(".form");
const author = document.querySelector(".form__input--name > input");
const title = document.querySelector(".form__input--title > input");
const textArea = document.querySelector(".form__textbox > textarea");

// 제출 이벤트리스너
form.addEventListener("submit", (e) => {
  e.preventDefault(); // submit 의 새로고침 방지
  // 넣을 새로운 객체를 하나 만든다.
  const obj = {
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
      bodyHTML: textArea,
      avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    },
    bodyHTML: textArea.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  // 기존 배열 가장 앞에 추가
  // agoraStatesDiscussions -> Local Storage
  dataSet.unshift(obj);
  localStorage.setItem("dataSet", JSON.stringify(dataSet));
  ul.prepend(convertToDiscussion(obj));

  // 제출 후 값초기화
  author.value = "";
  title.value = "";
  textArea.value = "";

  // render(ul);
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// agoraStatesDiscussions -> Local Storage
const render = (element) => {
  for (let i = 0; i < dataSet.length; i += 1) {
    element.append(convertToDiscussion(dataSet[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);