// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 원래 글
  const innerBoxMain = document.createElement("div");
  innerBoxMain.className = "discussion__inner--main";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 프로필
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + agoraStatesDiscussions.author; //웹접근성이 좋아짐 시각장애인분들이 사진을 볼수없을때 이것을 읽어준다고함 접근성굳
  avatarWrapper.append(avatarImg);

  // 내용
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  const discussionTitleA = document.createElement("a");
  discussionTitleA.href = obj.url;
  discussionTitleA.textContent = obj.title;
  discussionTitle.append(discussionTitleA);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent =
    obj.author + ` / ` + obj.createdAt.substring(0, 10);
  discussionContent.append(discussionInformation);

  // 답변 체크박스
  if (obj.answer) {
    discussionAnswered.innerHTML = `<input type="checkbox" class="active" checked />`;
  } else {
    discussionAnswered.innerHTML = `<input type="checkbox" class="active"  />`;
  }

  innerBoxMain.append(avatarWrapper, discussionContent, discussionAnswered);
  li.append(innerBoxMain);
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

// 디스커션 추가 기능
const InputSubmit = document.querySelector(".submit");
const author = document.querySelector(".form__input--name #name");
const title = document.querySelector(".form__input--title #name");
const story = document.querySelector("#story");
const newobj = {
  id: "D_kwDOHOApLM4APewe",
  createdAt: "2022-05-07T08:33:57Z",
  author: author.value,
  title: title.value,
  url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
  bodyHTML: story.value,
  avatarUrl:
    "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
};
const addClickDiscussion = (e) => {
  e.preventDefault(); //submit이벤트가 실행되면 다시 로드됨? 그래서 해주는것 같음.....
  newobj.title = title.value;
  newobj.author = author.value;
  newobj.createdAt = addNowTime();
  agoraStatesDiscussions.push(newobj);

  ul.prepend(
    convertToDiscussion(
      agoraStatesDiscussions[agoraStatesDiscussions.length - 1]
    )
  );
};

InputSubmit.addEventListener("click", addClickDiscussion);

// 현재 시간 추가 기능
const addNowTime = () => {
  const date = new Date();
  let hour = String(date.getHours()).padStart(2, "0"); //현재 문자열의 시작을 다른 문자열로 채워 주어진 길이를 만족하는 새로운 문자열 반환
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  if (hour >= 12) {
    hour = hour - 12;
    return `오후${hour}:${minutes}:${second}`;
  } else {
    return `오전${hour}:${minutes}:${second}`;
  }
};

// 페이지네이션 기능
// 화면에 보여질 페이지 그룹
// 화면에 보여질 첫번째 페이지
// 화면에 보여질 마지막 페이지
// 총페이지수
const numOfContent = addClickDiscussion.length;
const showContent = 10;
const renderPadgination = (currentpage) => {
  const totalPage = Math.ceil(totalData / dataPerPage);
  const pageGrounp = Math.ceil(currentpage / pageCount);
};
