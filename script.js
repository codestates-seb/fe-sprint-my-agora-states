// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정


  const avatarWrapper = document.createElement("div"); // 프로필 사진
  avatarWrapper.className = "discussion__avatar--wrapper";
  const img = document.createElement("img"); // 이미지 태그 만들기
  img.src = obj.avatarUrl;
  avatarWrapper.append(img);

  const discussionContent = document.createElement("div"); // 질문 내용
  discussionContent.className = "discussion__content";

  const discussionInfo = document.createElement("div"); // 질문 내용 컨텐츠

  const author = document.createElement("span");
  author.textContent = obj.author;
  author.classList.add("discussion__author");

  const title = document.createElement("h2"); // 질문 내용 타이틀
  const a = document.createElement("a");
  a.href = obj.url;
  a.textContent = obj.title;
  title.append(a);
  title.classList.add("discussion__title");

  discussionInfo.classList.add("discussion__information");
  discussionContent.append(discussionInfo);

  const alert = document.createElement("div");
  alert.classList.add("discussion__alert");


  const discussionAnswered = document.createElement("span"); // 답변 유무 체크박스
  discussionAnswered.classList.add("discussion__answered");
  if(obj.answer) {
    discussionAnswered.textContent = "1";
  } else {
    discussionAnswered.textContent = "0";
  }

  const date = document.createElement("span");
  date.textContent = new Date(obj.createdAt).toLocaleDateString().toString();
  date.classList.add("discussion__date");

  alert.append(discussionAnswered, date);


  discussionInfo.append(author, title, alert);
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent);
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

// 새로운 정보 입력 시, 배열에 추가

const submitBtn = document.querySelector(".submit-icon");

submitBtn.addEventListener("click", function () {
  const form = document.querySelector("form");
  const author = form.querySelector(".form__input--name > input").value;
  const title = form.querySelector(".form__input--title > input").value;
  const avatarUrl = "https://www.freeiconspng.com/thumbs/profile-icon-png/account-profile-user-icon--icon-search-engine-10.png";

  const newObj = {
    title,
    author,
    createdAt: new Date().toLocaleDateString(),
    avatarUrl

  }
  agoraStatesDiscussions.unshift(newObj);
  const newDiscussion = convertToDiscussion(newObj);
  ul.prepend(newDiscussion);
});

const h1 = document.querySelector("h1");
const length = document.createElement("span");
length.textContent = agoraStatesDiscussions.length;
h1.append(length);