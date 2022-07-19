const ul = document.querySelector("ul.discussions__container");
const submitForm = document.querySelector(".form");
const nameSubmit = document.querySelector("#name");
const titleSubmit = document.querySelector("#title");
const storySubmit = document.querySelector("#story");
const DISCUSSIONS_KEY = "discussions";
const firstButton = document.querySelector(".first");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
const lastButton = document.querySelector(".last");
let page = 0;

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  li.id = obj.id;

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h3");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  const discussionTitleLink = document.createElement("a");
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink);

  const discussionInformation = document.createElement("div");
  const date = new Date(obj.createdAt);
  discussionInformation.textContent = `${obj.author} / ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${date.toLocaleTimeString()}`;
  //   date.getHours() < 12
  //     ? "오전 " + String(date.getHours()).padStart(2, 0)
  //     : "오후 " + String(date.getHours() - 12).padStart(2, 0)
  // }:${String(date.getMinutes()).padStart(2, 0)}:${String(
  //   date.getSeconds()
  // ).padStart(2, 0)}`;
  discussionInformation.className = "discussion__information";
  discussionContent.append(discussionInformation);

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionDeleteButton = document.createElement("button");
  discussionDeleteButton.className = "deleteButton";
  discussionDeleteButton.textContent = "𐄂";
  discussionDeleteButton.addEventListener("click", deleteList);
  discussionAnswered.append(discussionDeleteButton);

  const discussionEditButton = document.createElement("button");
  discussionEditButton.className = "editButton";
  discussionEditButton.textContent = "✏️";
  discussionEditButton.addEventListener("click", editList);
  discussionAnswered.append(discussionEditButton);

  const discussionAsrSign = document.createElement("p");
  discussionAsrSign.className = "asrSign";
  discussionAsrSign.textContent = obj.answer === null ? "😵" : "✓";
  discussionAnswered.append(discussionAsrSign);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, page) => {
  for (let i = page; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// CREATE: form에서 submit하면 새로운 li를 생성함
submitForm.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const newDiscussion = {
    id: String(Date.now()),
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
    author: nameSubmit.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/6",
    title: titleSubmit.value,
    createdAt: Date.now(),
    bodyHTML: storySubmit.value,
    answer: null,
  };
  nameSubmit.value = "";
  titleSubmit.value = "";
  storySubmit.value = "";

  agoraStatesDiscussions.unshift(newDiscussion);
  saveDiscussions();
  ul.prepend(convertToDiscussion(newDiscussion));
  console.log(agoraStatesDiscussions);
}

// SAVE: array를 로컬스토리지에 저장함
function saveDiscussions() {
  localStorage.setItem(DISCUSSIONS_KEY, JSON.stringify(agoraStatesDiscussions));
}

// DELETE: button 클릭하면 해당 리스트 삭제하고 array에서도 삭제 -> 로컬스토리지 최신화
function deleteList(event) {
  const li = event.target.parentElement.parentElement;
  li.remove();
  agoraStatesDiscussions = agoraStatesDiscussions.filter(
    (item) => item.id !== li.id
  );
  saveDiscussions();
  console.log(agoraStatesDiscussions);
}

// UPDATE: button 클릭하면 리스트의 title 수정
function editList(event) {
  const li = event.target.parentElement.parentElement;
  const oldTitle = li.children[1].children[0].children[0];
  const newTitle = prompt("제목 수정", `${oldTitle.textContent}`);
  oldTitle.textContent = newTitle;
  const index = agoraStatesDiscussions.findIndex((obj) => obj.id === li.id);
  agoraStatesDiscussions[index].title = newTitle;
  saveDiscussions();
  console.log(agoraStatesDiscussions);
}

// READ: 로컬스토리지에 discussion이 저장되어있으면 저장된 데이터를 리스트로 만든다.
const savedDiscussions = localStorage.getItem(DISCUSSIONS_KEY);

if (savedDiscussions !== null) {
  agoraStatesDiscussions = JSON.parse(savedDiscussions);
  render(ul, page);
} else {
  render(ul, page);
}

// Pagination 작업중

// nextButton.addEventListener("click", () => {
//   ul.innerHTML = "";
//   render(ul, page + 10)
// });
