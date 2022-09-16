// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);


// 댭변 상태에 따라 아이콘 사용
const ANSWERED_MARK = "☑︎";
const UNANSERED_MARK = "◻︎";

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement("img");

  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarImg.className = "discussion__avatar--image";

  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";

  const discussionUrl = document.createElement("a");

  discussionUrl.textContent = obj.title;
  discussionUrl.href = obj.url;
  discussionTitle.append(discussionUrl);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";

  discussionInformation.textContent = obj.createdAt;

  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInformation);

  const discussionIcon = document.createElement("p");
  discussionIcon.textContent = "☑";
  if (obj.answer === null) {
    discussionIcon.textContent = UNANSERED_MARK;
  } else {
    discussionIcon.textContent = ANSWERED_MARK;
  }
  discussionAnswered.append(discussionIcon);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  // const discussionAnswerButton = document.createElement("button");
  // discussionAnswerButton.className = "discussion__answer__button";
  // discussionAnswerButton.textContent = "답변 보기";
  // li.append(avatarWrapper, discussionContent, discussionAnswered, discussionAnswerButton);
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

const form = document.querySelector('.form')
const author = document.querySelector('.form__input--name > input')
const title = document.querySelector('.form__input--title > input')
const textArea = document.querySelector('.form__textbox > textarea')
// const avatarig = document.querySelector('.discussion__avatar--image')

form.addEventListener('submit' , (Event) => {
  Event.preventDefault();
  const obj = {
    id: "unique number",
    createdAt: new Date(),
    title: title.value,
    url: "",
    author: author.value ,
    bodyHTML:'',
    avatarUrl:"https://cdn.icon-icons.com/icons2/2506/PNG/512/user_icon_150670.png",
    answer:null
  }
ul.prepend(convertToDiscussion(obj));
author.value = ''
title.value = ''
textArea.value =''
})


// const discussionContainerAll = document.querySelectorAll(".discussion__container")
// const discussionAnsweredContents = document.querySelectorAll("")
// discussionContainerAll.addEventListener("click", function () {
  
// });