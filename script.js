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
  //아바타이미지
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avatarImg);
  // 타이틀
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  //클릭했을때 링크로이동, 내용
  const discussionLink = document.createElement("a");
  discussionLink.href = obj.url;
  discussionLink.text = obj.title;
  discussionTitle.append(discussionLink);

  //저자, 생성일
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionContent.append(discussionTitle, discussionInformation);

  //체크박스확인
  const contentAnswered = document.createElement("p");
  contentAnswered.className = "discussion__answered";
  discussionAnswered.append(contentAnswered);
  if (obj.answer === null) {
    contentAnswered.textContent = "🤍";
  } else {
    contentAnswered.textContent = "💗";
  }
  discussionAnswered.append(contentAnswered);

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

// localStorage 함수
const renderlocalStorage = (element) => {
  const objLocalData = JSON.parse(localStorage.getItem("agoraDatas"));
  if (objLocalData) {
    for (let i = 0; i < objLocalData.length; i++) {
      element.prepend(convertToDiscussion(objLocalData[i]));
    }
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
renderlocalStorage(ul);

const formInput = document.querySelector(".form");
const formNameInput = document.querySelector("#name");
const formTitleInput = document.querySelector("#title");
const formStoryInput = document.querySelector("#story");

formInput.addEventListener("submit", (event) => {
  event.preventDefault();

  const newDiscussion = {
    id: "",
    createdAt: new Date().toLocaleString(),
    title: formTitleInput.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: formNameInput.value,
    answer: null,
    bodyHTML: formStoryInput.value,
    avatarUrl:
      "https://i.natgeofe.com/k/7bfcf2d2-542e-44f0-962a-c36f2efa98a5/heart.jpg",
  };

  let objData = [];
  if (localStorage.length > 0) {
    let bjLocalData = JSON.parse(localStorage.getItem("agoraDatas"));
    for (let i = 0; i < bjLocalData.length; i++) {
      objData.push(bjLocalData[i]);
    }
  }
  objData.push(newDiscussion);
  localStorage.setItem("agoraDatas", JSON.stringify(objData));

  agoraStatesDiscussions.unshift(newDiscussion);
  ul.prepend(convertToDiscussion(newDiscussion));

  formInput.reset();
});

//const img = document.querySelector("img.discussion__avatar--image");
//render(img);

//const information = document.querySelector("div.discussion__information");
//render(information);
