// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
/* Logging the title of each object in the agoraStatesDiscussions array. */

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

// console.log(agoraStatesDiscussions);

const KEY = "new_list";

const localStorageSavedData = () => {
  const getlocalStorageData = localStorage.getItem(KEY);
  if (getlocalStorageData) {
    return JSON.parse(getlocalStorageData);
  }
  return agoraStatesDiscussions;
};

const createDOM = (element) => document.createElement(element);

const querySelectDOM = (element) => document.querySelector(element);

const formQuerySelectorDOM = (element) => submitForm.querySelector(element);

const convertToDiscussion = (obj) => {
  const li = createDOM("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = createDOM("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = createDOM("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = createDOM("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //프로필 사진 넣기
  const addProfile = () => {
    const avatar = createDOM("img");
    avatar.className = "discussion__avatar--image";
    avatar.src = obj.avatarUrl;
    avatar.alt = "avatar of " + obj.author;
    avatarWrapper.appendChild(avatar);
  };

  //discussion 제목 넣기
  const addDiscussionTitle = () => {
    const discussionTitle = createDOM("h3");
    const discussionTitleAnchor = createDOM("a");
    discussionTitleAnchor.href = obj.url;
    discussionTitleAnchor.textContent = obj.title;
    discussionTitle.appendChild(discussionTitleAnchor);

    discussionContent.append(discussionTitle);
  };

  //discussion 정보 넣기
  const addDiscussionInfo = () => {
    //날짜 표현
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getSeconds();
    const discussionInfo = createDOM("div");

    discussionInfo.className = "discussion__information"; //class 이름 지정
    discussionInfo.textContent = `${
      obj.author
    } / ${year}년 ${month}월${date}일 ${hours}시 ${minutes}분 ${
      seconds > 9 ? seconds : `${0}${seconds}`
    }초`; //text 지정

    discussionContent.append(discussionInfo); //discussionContent에 discussionInfo를 넣는다.
  };

  addProfile();
  addDiscussionTitle();
  addDiscussionInfo();

  //답변 마크 및 답변 개수 넣기
  const addAnswerandMark = () => {
    const discussionAnsweredMark = createDOM("div");
    discussionAnsweredMark.className = "discussion__answered";
    const discussionAnsweredCount = createDOM("p");
    discussionAnsweredCount.textContent
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
  element.innerHTML = ""; //render시 기존에 있던 내용을 지우기 위해 innerHTML을 지운다.
  const data = localStorageSavedData();
  for (let i = 0; i < data.length; i++) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const submitForm = querySelectDOM("form.form");
const names = formQuerySelectorDOM("#name");
const title = formQuerySelectorDOM("#title");
const textarea = formQuerySelectorDOM("div.form__textbox textarea");

const resetFormValue = () => {
  author.value = "";
  title.value = "";
  textarea.value = "";
};

const handleSubmit = (event) => {
  event.preventDefault();
  const data = localStorageSavedData();

  const objects = {};

  objects.id = "unique";
  objects.author = names.value;
  objects.title = title.value;
  objects.avatarUrl =
    "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4";
  data.unshift(objects);

  localStorage.setItem(KEY, JSON.stringify(data));
  render(ul);
};

submitForm.addEventListener("submit", handleSubmit);
