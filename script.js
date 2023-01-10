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

  // 객체에 담긴 정보 넣기

  const avatarImg = document.createElement("img"); //첫번째 div의 img태그
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg); // 1. avatarWrapper 연걸

  const titleAnchor = document.createElement("h2"); // 두번째 div의 h2태그
  const aTag = document.createElement("a");
  titleAnchor.className = "discussion__title";
  aTag.href = obj.url;
  aTag.textContent = obj.title;
  titleAnchor.append(aTag);
  discussionContent.append(titleAnchor); // 두번째 div의 자손인 h2태그 연걸

  const information = document.createElement("div");
  information.className = "discussion__information";
  information.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  discussionContent.append(information); // 두번째 div의 자손인 div(class가 discussion_information) 연결

  const checkBox = document.createElement("p");
  checkBox.textContent = obj.answer !== null ? "☑" : "☒";
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

// 질문 입력창에 입력 후 제출하면 화면에 표시하기.

const form = document.querySelector(".form");
const inputName = document.querySelector("div.form__input--name > input");
const title = document.querySelector("div.form__input--title > input");
const textBox = document.querySelector("#story");

// submit 이벤트가 발생할 때 새로운 객체 생성 (입력한 값을 받는)
form.addEventListener("submit", (event) => {
  event.preventDefault(); // submit이 발생할 때 기본으로 실행되는 새로고침을 막아줌

  const obj = {
    id: "YujunSun0",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/YujunSun0",
    author: inputName.value,
    answer: null,
    bodyHTML: textBox.value,
    avatarUrl:
      "https://mblogthumb-phinf.pstatic.net/MjAxOTAyMjBfNjMg/MDAxNTUwNjQzMzUzODUx.wh73kZENlQlYp99uENRo5gNrJ54EWGiSg0lKIq35YLsg.CPJq7bL6r7AHcR0hTpE9bjtrOfjkbFUCpbOPFtVVGngg.JPEG.moonlee97/IMG_20180910_200713.jpg?type=w800",
  };
  agoraStatesDiscussions.unshift(obj); // 배열의 맨앞에 객체를 집어넣음
  const newDiscussion = convertToDiscussion(obj); // 위에서 만든 discussion을 추가해주는 함수 적용
  ul.prepend(newDiscussion); // ul의 first-child 앞에 추가
});

// 내일 할 것 : 시간 고치기(O) , submit 누르면 값 초기화 시켜주기, css++ / 심화과정
