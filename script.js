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
  //avartarWrapper 채우기
  const avatarImg = document.createElement("img"); //이미지 태그 생성.
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl; //이미지 소스 가져오기 ,obj로 하는이유: 매개변수 안에 42번째줄 보면 data의 i번째가 들어가고 있음.
  avatarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarImg);

  //discussionContent 채우기
  const discussionTitle = document.createElement("h2"); //h2 요소 생성.
  discussionTitle.className = "discussion__title";
  const discussionTitle__a = document.createElement("p"); //a 요소 생성.
  discussionTitle__a.href = obj.url;
  discussionTitle__a.textContent = obj.title;
  discussionTitle.append(discussionTitle__a); //a요소 h2요소에 어펜드.
  const discussionInfor = document.createElement("div"); //작성자 정보,시간 div생성.
  discussionInfor.className = "discussion__information";
  discussionInfor.textContent = obj.author + " / " + obj.createdAt;
  discussionContent.append(discussionTitle, discussionInfor);

  //discussionAnswered 채우기
  const discussionAnswered__p = document.createElement("p");
  discussionAnswered__p.textContent = "☑";
  discussionAnswered.append(discussionAnswered__p);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i])); //여기서 데이터가 계속 순회중.
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const InputSubmit = document.querySelector("#submit");
const author = document.querySelector(".form__input--name #name");
const title = document.querySelector(".form__input--title #title");
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
  // submit 누르면 페이지를 새로고침해주기 때문에 입력한게 날아가기 때문에 새로고침막아주는것
  // 기본 동작 막아주는 것
  e.preventDefault();
  newobj.title = title.value;
  newobj.author = author.value;
  newobj.bodyHTML = story.value;
  newobj.createdAt = addNowTime();
  agoraStatesDiscussions.push(newobj);

  ul.prepend(
    convertToDiscussion(
      agoraStatesDiscussions[agoraStatesDiscussions.length - 1]
    )
  );
};
// 하나의 스크립트에는 하나의 onClick만 들어간다.

InputSubmit.addEventListener("click", addClickDiscussion);

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
