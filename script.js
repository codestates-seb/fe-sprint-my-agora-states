// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
/* Logging the title of each object in the agoraStatesDiscussions array. */
console.log(agoraStatesDiscussions[0].author);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  // console.log(obj);
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //프로필 사진 넣기
  const addProfile = () => {
    const avatar = document.createElement("img");
    avatar.className = "discussion__avatar--image";
    avatar.src = obj.avatarUrl;
    avatar.alt = "avatar of" + obj.author;
    avatarWrapper.appendChild(avatar);
  };

  //discussion 제목 넣기
  const addDiscussionTitle = () => {
    const discussionTitle = document.createElement("h3");
    const discussionTitleAnchor = document.createElement("a");
    discussionTitleAnchor.href = obj.url;
    discussionTitleAnchor.textContent = obj.title;
    discussionTitle.appendChild(discussionTitleAnchor);

    discussionContent.append(discussionTitle);
  };

  //discussion 정보 넣기
  const addDiscussionInfo = () => {
    const discussionInfo = document.createElement("div");
    discussionInfo.className = "discussion__information";
    discussionInfo.textContent = `${obj.author} | ${new Date(
      obj.createdAt
    ).toLocaleString()}`;

    discussionContent.append(discussionInfo);
  };

  addProfile();
  addDiscussionTitle();
  addDiscussionInfo();

  //답변 마크 및 답변 개수 넣기
  const addAnswerandMark = () => {
    const discussionAnsweredMark = document.createElement("div");
    discussionAnsweredMark.className = "discussion__answered";
    const discussionAnsweredCount = document.createElement("p");
    discussionAnsweredCount.checkbox
      ? (discussionAnsweredCount.textContent = "❌")
      : (discussionAnsweredCount.textContent = "✔️");

    discussionAnsweredMark.append(discussionAnsweredCount);
    discussionAnswered.append(discussionAnsweredMark);
  };

  addAnswerandMark();

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  console.log(element);
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const submitForm = document.querySelector("form");
const author = document.querySelector(".form__input--name > input");
const title = submitForm.querySelector(".form__input--title > input");
const textarea = submitForm.querySelector(".form__textbox textarea");

const KEY = "new";

const newForm = {
  id: "unique",
  createdAt: new Date().toISOString(),
  title: title.value,
  url: "https://github.com/codestates-seb/agora-states-fe/discussions/7",
  author: author.value,
  answer: null,
  bodyHTML: textarea.value,
  avatarUrl: null,
};

const saveForm = () => {
  localStorage.setItem(KEY, JSON.stringify(agoraStatesDiscussions));
};

const savedForm = localStorage.getItem(KEY);

const submitHandler = (form) => console.log(form);

if (savedForm !== null) {
  const parsedForm = JSON.parse(savedForm);
  parsedForm.forEach(submitHandler);
}

const handleSubmit = (event) => {
  event.preventDefault();
  agoraStatesDiscussions.unshift(newForm);

  saveForm();

  author.value = "";
  title.value = "";
  textarea.value = "";
};

submitForm.addEventListener("submit", handleSubmit);
