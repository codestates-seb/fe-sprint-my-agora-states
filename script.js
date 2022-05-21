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
  //아바타 프로필 사진 넣는 img 요소 편집
  const avatarImg = document.createElement("img");
  avatarImg.classList.add("discussion__avatar--image");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = obj.author;
  avatarWrapper.append(avatarImg);

  //content에서 제목가져오고 제목에 링크 연결
  //제목에 링크를 연결하기
  const contentHtwo = document.createElement("h2");

  const contentA = document.createElement("a");
  contentA.href = obj.url;
  contentHtwo.append(contentA);
  discussionContent.append(contentHtwo);

  //작성자가져오고 작성자 / 작성일시 나타내기
  const contentDiv = document.createElement("div");
  contentHtwo.textContent = obj.title;
  contentHtwo.classList.add("discussion__title");
  contentDiv.textContent = obj.author + " / " + obj.createdAt;
  contentDiv.classList.add("discussion__information");
  discussionContent.append(contentDiv);

  //체크박스 가져오고 연결하기
  const checkBoxPtag = document.createElement("p");
  checkBoxPtag.textContent = "☑";

  //obj.answer 값 유무에 따라서 체크박스 색상 변경하기
  // if (obj.answer !== null) {
  //   checkBoxPtag.textContent.style.color = "green";
  // } else {
  //   checkBoxPtag.textContent.style.color = "red";
  // }
  discussionAnswered.appendChild(checkBoxPtag);

  //li와 연결하기
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

//<디스커션 추가 기능>

//내가 객체 넣을 array
let discussionsDataArr = agoraStatesDiscussions;

const form = document.querySelector(".form");
const formInputName = document.querySelector(".form__input--name #name");
const formInputTitle = document.querySelector(".form__input--title #name");
const submit = document.querySelector(".submitbtn");

const addDiscussion = (ev) => {
  ev.preventDefault();
  //객체 만들기
  let newDiscussion = {
    id: Date.now(),
    createdAt: new Date(),
    title: formInputTitle.value,
    author: formInputName.value,
    answer: "☑",
    avatarUrl: "https://i.esdrop.com/d/f/d0oyIupLts/k3JZvvvRTa.png",
  };

  discussionsDataArr.push(newDiscussion);

  ul.prepend(convertToDiscussion(newDiscussion));

  //질문 등록하고 입력창 reset 되게 만들기
  document.forms[0].reset();

  console.warn("AddedNew", { discussionsDataArr });

  localStorage.setItem("DiscussionList", JSON.stringify(discussionsDataArr));
};

document.addEventListener("DOMContentLoaded", () => {
  submit.addEventListener("click", addDiscussion);
});
