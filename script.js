const KEY = "key_list";

// 새로운 데이터를 agoraStatesDiscussions 배열에 추가하는 함수
const localStorageSavedData = () => {
  const getlocalStorageData = localStorage.getItem(
    JSON.parse(JSON.stringify(KEY))
  );
  if (getlocalStorageData) {
    return JSON.parse(getlocalStorageData);
  }
  return agoraStatesDiscussions;
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //아바타 사진
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  //질문 제목
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const textTitle = document.createElement("h2");
  textTitle.className = "discussion__title";

  const titleHref = document.createElement("a");

  titleHref.href = obj.url;
  titleHref.textContent = obj.title;

  textTitle.append(titleHref);

  //디스커션 인포메이션
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";

  const createQuestionDate = new Date(obj.createdAt).toLocaleString();

  discussionInformation.textContent = `${obj.author} / ${createQuestionDate}`;

  discussionContent.append(textTitle, discussionInformation);

  //답변
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionIcon = document.createElement("p");
  if (
    obj.answer !== null
      ? (discussionIcon.textContent = "💙")
      : (discussionIcon.textContent = "🤍")
  )
    discussionAnswered.append(discussionIcon);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  element.innerHTML = "";
  const data = localStorageSavedData();

  for (let i = 0; i < data.length; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
//render

//폼 저장 양식
const form = document.querySelector(".form.form");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");

const FormReset = () => {
  inputName.value = "";
  inputTitle.value = "";
  inputStory.value = "";
};

const handleSubmit = (event) => {
  event.preventDefault(); //기본 동작을 실행하지 않도록 지정
  const data = localStorageSavedData();

  const obj = {
    id: "unique id",
    createdAt: new Date().toISOString(),
    title: inputTitle.value,
    url: null,
    author: inputName.value,
    answer: null,
    bodyHTML: inputStory.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/76990149?v=4",
  };
  data.unshift(obj);
  localStorage.setItem(KEY, JSON.stringify(data));
  FormReset();
  render(ul);
};

form.addEventListener("submit", handleSubmit);

//페이징
//전체수()
function pageAlgo(total, bottomSize, listSize, cursor) {
  //total = 총개수
  //size = 사이즈
  //cursor = 내가 선택한 페이지

  let totalPage = Math.ceil(total / listSize);

  let firstBottomNumber = cursor - (cursor % bottomSize) + 1;
  let lastBottomNumber = cursor - (cursor % bottomSize) + bottomSize;

  if (lastBottomNumber > totalPage) lastBottomNumber = totalPage;

  return {
    firstBottomNumber,
    lastBottomNumber,
    totalPage,
    bottomSize,
    listSize,
    cursor,
  };
}

let pagingOutput = localStorage.getItem(KEY);
let pagingArr = JSON.parse(pagingOutput);
let totalPaging = Number(pagingArr.length);

let info = pageAlgo(totalPaging, 10, 10, 1);

for (let i = info.firstBottomNumberl; i <= info.lastBottomNumber; i++) {
  i == info.cursor
    ? console.log(`<span>cur : ${i}</span>`)
    : console.log(`<span>${i}</span>`);
}
