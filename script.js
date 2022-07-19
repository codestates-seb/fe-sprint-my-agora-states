// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarImg.className = "discussion__avatar";
  avatarWrapper.append(avatarImg);
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);
  const discussionDetail = document.createElement("a");
  discussionDetail.href = obj.url;
  discussionDetail.textContent = obj.title;
  discussionTitle.append(discussionDetail);
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__info";
  discussionInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionContent.append(discussionInfo);
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const answerIcon = document.createElement("i");
  if (obj.answer === null) {
    answerIcon.innerHTML = '<i class="fa-solid fa-user-clock"></i>';
    answerIcon.className = "wating";
  } else {
    answerIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    answerIcon.className = "finished";
  }
  discussionAnswered.append(answerIcon);
  // const answerContent = document.createElement("span");
  // answerContent.className = "discussion__answer";
  // answerContent.textContent = obj.answer.bodyHTML.slice(0, 10);
  // if (!answerContent.textContent) {
  //   answerContent.textContent = "답변을 기다리고 있습니다!!";
  // }
  li.append(avatarWrapper, discussionContent, discussionAnswered);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
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

const submitForm = document.querySelector(".form");
const nameInput = document.querySelector("#name");
const titleInput = document.querySelector("#title");
const questionInput = document.querySelector("textarea");

// localStorage로 저장

// function saveObj() {
//   localStorage.setItem("newObj", JSON.stringify(agoraStatesDiscussions));
// }

// let savedObj = JSON.parse(localStorage.getItem("newObj"));
// if (savedObj.length >= 42) {
//   savedObj
// }

// pagination

// create 구현

function handleSubmit(event) {
  event.preventDefault();
  const ul = document.querySelector("ul.discussions__container");
  const li = document.createElement("li");
  li.className = "discussion__container";
  const newName = nameInput.value;
  const newTitle = titleInput.value;
  const newTime = new Date().toLocaleString();
  const newQuestion = questionInput.value;
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.src = "avatar.png";
  avatarImg.alt = "avatar of " + newName;
  avatarImg.className = "discussion__avatar";
  avatarWrapper.append(avatarImg);
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content new";
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);
  const discussionDetail = document.createElement("div");
  discussionDetail.textContent = newTitle;
  discussionTitle.append(discussionDetail);
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__info";
  discussionInfo.textContent = `${newName} / ${newTime}`;
  discussionContent.append(discussionInfo);
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const answerIcon = document.createElement("i");
  answerIcon.innerHTML =
    '<i class="fa-solid fa-user-clock"></i> <i class="fa-solid fa-trash-can"></i>';
  answerIcon.className = "wating";
  discussionAnswered.append(answerIcon);
  nameInput.value = "";
  titleInput.value = "";
  questionInput.value = "";
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  ul.prepend(li);
  const newObj = {
    id: "unique_id",
    createdAt: newTime,
    title: newTitle,
    url: null,
    author: newName,
    answer: null,
    bodyHTML: newQuestion,
    avatarUrl: "avatar.png",
  };
  agoraStatesDiscussions.unshift(newObj);
  const deleteIcon = document.querySelector(".fa-trash-can");
  deleteIcon.addEventListener("click", deleteFn);
  // saveObj();
  // const newDiscussion = convertToDiscussion(newObj);
  // ul.prepend(newDiscussion);
  return li;
}

function deleteFn(event) {
  event.path[3].remove();
}

submitForm.addEventListener("submit", handleSubmit);
// deleteBtn.addEventListener("click", handleDelete);
