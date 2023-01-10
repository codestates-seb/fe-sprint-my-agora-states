// console.log(agoraStatesDiscussions);

//dataSet agoraStatesDiscussions값을 json형식으로 받는다.
if (!localStorage.getItem("dataSet")) {
  // 만약 localStorage에 agoraStatesDiscussions가 없다면
  localStorage.setItem("dataSet", JSON.stringify(agoraStatesDiscussions));
}
let dataSet = JSON.parse(localStorage.getItem("dataSet"));

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

  // removeBtn 구현
  const removeDisContainer = (event) => {
    const removeOneDis = event.target.parentElement.parentElement;
    removeOneDis.remove();
  };

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = obj.author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.appendChild(avatarImg);

  const disTitle = document.createElement("h2");
  const disTitleLink = document.createElement("a");
  disTitleLink.href = obj.url;
  disTitleLink.textContent = obj.title;
  disTitle.appendChild(disTitleLink);
  discussionContent.appendChild(disTitle);

  const disInfo = document.createElement("div");
  disInfo.className = "discussion__information";
  disInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString("en-US")}`; //toLocaleTimeString() 메서드는 날짜의 시간 부분을 언어별로 표현한 문자열을 반환합니다.
  discussionContent.appendChild(disInfo);

  const disAnswer = document.createElement("p");
  const removeBtn = document.createElement("button");
  disAnswer.textContent = obj.answer ? "☑︎" : "☒";
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "×";
  discussionAnswered.append(disAnswer, removeBtn);

  removeBtn.addEventListener("click", removeDisContainer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// form 시작! submit하면 정보를 가져온다.
const form = document.querySelector("form.form");

const bringData = (event) => {
  const userName = document.querySelector(".form__input--name > input");
  const userTitle = document.querySelector(".form__input--title > input");
  const userStory = document.querySelector(".form__textbox > textarea");

  event.preventDefault();

  const newObj = {
    id: "new Id",
    createdAt: new Date().toISOString(), // toISOString()는 단순화한 확장 ISO의 문자열을 반환합니다.
    title: userTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: userName.value,
    bodyHTML: userStory.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
  };

  const newDis = convertToDiscussion(newObj);

  dataSet.unshift(newObj);
  localStorage.setItem("dataSet", JSON.stringify(dataSet));
  ul.prepend(newDis); // prepend는 첫번째 자식 앞 새로운 노드를 추가해준다.

  userName.value = "";
  userTitle.value = "";
  userStory.value = "";
};

form.addEventListener("submit", bringData);

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.

const render = (element) => {
  for (let i = 0; i < dataSet.length; i += 1) {
    element.append(convertToDiscussion(dataSet[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
