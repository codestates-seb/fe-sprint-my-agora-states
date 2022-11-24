const agoraStatesDiscussions = require('./data.js');
require('./style.css');
require('./reply-solid.svg');
require('./codestates-ci.png');
console.log(agoraStatesDiscussions);

if (!localStorage.length) {
  // * 추가 시 객체를 문자열로 변환하여 저장
  localStorage.setItem("json", JSON.stringify(agoraStatesDiscussions));
}

// ! localStorage를 활용한 브라우저 discussion
// * localStorage에 아무것도 없으면 agaraStatesDiscussions을 localStorage에 추가
// * 문자열로 저장된 localStorage 내의 값을 객체로 변환하여 변수 할당
const localAgoraStatesDiscussions = JSON.parse(localStorage.getItem("json"));

//! submit 기능
// * 이벤트 핸들러 추가
const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
  // * input:submit 기능 제거
  event.preventDefault();
  // * 각 input querySelector 지정
  const author = document.querySelector(".form__input--name > input");
  const title = document.querySelector(".form__input--title > input");
  const textArea = document.querySelector(".form__textbox > textarea");
  // * 변수 선언 및 객체 할당
  const obj = {
    // * input value 객체 내 key 값 할당
    id: "unique number",
    createdAt: new Date(),
    title: title.value,
    url: "#",
    author: author.value,
    answer: null,
    bodyHTML: textArea.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/87750478?s=64&v=4",
  };

  // * convertToDiscussion 함수 실행으로 데이터 추가
  ul.prepend(convertToDiscussion(obj));

  // * localStorage에 들어갈 객체에 obj 추가
  localAgoraStatesDiscussions.unshift(obj);

  // * submit 후 value 값 지워주기
  author.value = "";
  title.value = "";
  textArea.value = "";

  // * 추가 된 객체를 localStorage에 다시 추가
  localStorage.setItem("json", JSON.stringify(localAgoraStatesDiscussions));
  console.log(agoraStatesDiscussions);
});

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  console.log(obj);
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // * img.discussion__avatar--image 아바타 사진 및 대체 텍스트 입력
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`;
  // * 만들어진 아바타 이미지 avatarWrapper에 append
  avatarWrapper.append(avatarImage);

  // * discussion__title 제목 삽입 (링크 포함)
  const discussionTitle = document.createElement("h2");
  const discussionTitleLink = document.createElement("a");
  discussionTitle.className = "discussion__title";
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink);
  // * discussion__information 작성자 및 작성 일시 삽입
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  // * discussionContent 만들어진 내부 컨텐츠 append
  discussionContent.append(discussionTitle, discussionInformation);

  // * discussion__answered 답변 삽입
  if (obj.answer !== null) {
    // * AnsweredReply 생성 및 내용 삽입
    const discussionAnsweredReply = document.createElement("div");
    discussionAnsweredReply.className = "discussion__answered--reply";
    const discussionAnsweredReplyImg = document.createElement("img");
    discussionAnsweredReplyImg.src = "./reply-solid.svg";
    discussionAnsweredReplyImg.alt = "reply icon";
    discussionAnsweredReply.append(discussionAnsweredReplyImg);

    // * AnsweredContent 생성 및 내부 컨텐츠 생성 후 내용 삽입
    const discussionAnsweredContent = document.createElement("div");
    discussionAnsweredContent.className = "discussion__answered--content";

    const discussionAnsweredTitle = document.createElement("p");
    discussionAnsweredTitle.className = "discussion__answered--title";
    discussionAnsweredContent.append(discussionAnsweredTitle);

    const discussionAnsweredTitleLink = document.createElement("a");
    discussionAnsweredTitleLink.href = obj.answer.url;
    discussionAnsweredTitleLink.textContent = `${obj.answer.bodyHTML
      .replace(/(<([^>]+)>)/gi, "")
      .slice(0, 120)}...`;
    discussionAnsweredTitle.append(discussionAnsweredTitleLink);

    const discussionAnsweredInfomation = document.createElement("div");
    discussionAnsweredInfomation.className =
      "discussion__answered--information";
    discussionAnsweredInfomation.textContent = `${
      obj.answer.author
    } / ${new Date(obj.createdAt).toLocaleString()}`;
    discussionAnsweredContent.append(discussionAnsweredInfomation);

    // * AnsweredAvatar 생성 및 내부 컨텐츠 생성 후 내용 삽입
    const answeredAvatarWrapper = document.createElement("div");
    answeredAvatarWrapper.className = "discussion__answared--avatar--wrapper";
    const answeredAvatarImg = document.createElement("img");
    answeredAvatarImg.className = "discussion__answared--avatar--image";
    answeredAvatarImg.src = obj.answer.avatarUrl;
    answeredAvatarImg.alt = `avatar of ${obj.answer.author}`;
    answeredAvatarWrapper.append(answeredAvatarImg);

    // * Answered content append
    discussionAnswered.append(
      discussionAnsweredReply,
      discussionAnsweredContent,
      answeredAvatarWrapper
    );
  }

  // ! discussionAnswered append
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < localAgoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(localAgoraStatesDiscussions[i]));
//   }
//   return;
// };

// todo : 페이지 네이션 구현 시도

// * list를 만들어주는 함수
const renderList = (num) => {
  const pageList = document.createElement("li");
  pageList.className = "list__wrapper--list";
  const pageListLink = document.createElement("a");
  pageListLink.href = "#";
  pageListLink.textContent = num;
  pageList.append(pageListLink);
  return pageList;
};

const pageUl = document.createElement("ul");
// * ulList를 렌더하는 함수
const renderUl = (element) => {
  const langthDiscussion = localAgoraStatesDiscussions.length - 1;
  const showDiscussion = 10;
  const maxDiscussionList = Math.ceil(langthDiscussion / showDiscussion);
  pageUl.className = "list__wrapper";

  for (let page = 1; page <= maxDiscussionList; page++) {
    pageUl.append(renderList(page));
  }
  pageUl.firstChild.classList.add("active");
  element.append(pageUl);
};

const discussionWrapper = document.querySelector(".discussion__wrapper");

let startList = 0;
let endList = 10;

const ul = document.querySelector(".discussions__container");
const render = (element) => {
  for (let i = startList; i < endList; i += 1) {
    ul.append(convertToDiscussion(localAgoraStatesDiscussions[i]));
  }
  element.prepend(ul);
  return;
};
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render(discussionWrapper);
renderUl(discussionWrapper);

// * 페이지네이션을 동작하는 이벤트 리스너
const listWrapperList = document.querySelectorAll(".list__wrapper--list");
for (let e = 0; e < listWrapperList.length; e++) {
  listWrapperList[e].addEventListener("click", (event) => {
    event.preventDefault();
    for (let i = 0; i < listWrapperList.length; i++) {
      listWrapperList[i].classList.remove("active");
    }
    listWrapperList[e].classList.add("active");
    startList = e === 0 ? 0 : e * 10;
    // 0 클릭할때 0, 1 클릭할때 10, 2클릭할때 20, 3 클릭할때 30
    console.log(startList);
    if (e === listWrapperList.length - 1) {
      endList = localAgoraStatesDiscussions.length - 1;
    } else {
      endList = e === 0 ? 10 : (e + 1) * 10;
    }
    // 0클릭할때 10, 1클릭할때 20, 2클릭할때 30, 3클릭할때 40
    console.log(endList);
    ul.textContent = "";
    render(discussionWrapper);
  });
}
