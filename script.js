// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //이미지 div 요소 생성 및 클래스 생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  //이미지 요소 제작, data.js의 배열 가져오기
  const avatarImg = document.createElement("img");

  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarImg.className = "discussion__avatar--image";
  //자식으로 넣어주기
  avatarWrapper.append(avatarImg);

  //content 불러오기
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  //타이틀 요소 제작, data.js의 배열 가져오기
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionUrl = document.createElement("a");
  discussionUrl.href = obj.url;
  discussionUrl.textContent = obj.title;
  discussionTitle.append(discussionUrl);

  //인포메이션 요소 제작, data.js의 배열 가져오기
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  // 현업에서 날짜를 표현 할때 new Date().toLocaleTimeString()룰 가장 많이 사용한다. > 새로 알게 된 사실
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleDateString()} ${new Date(obj.createdAt).toLocaleTimeString()}`;
  console.log(discussionInformation);

  //자식으로 넣어주기
  discussionContent.append(discussionTitle, discussionInformation);

  //answer 불러오기
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  //answer 요소 제작, data.js의 배열 가져오기
  const isAnswer = document.createElement("p");
  //obj.answer가 true일때 ☒, false 일때 ☑
  isAnswer.textContent = obj.answer === null ? "❌" : "✅";
  //자식으로 넣어주기
  discussionAnswered.append(isAnswer);

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

// 문서 내용 가져오기.
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__itextbox > textarea");

// form 은 데이터를 깔끔하게 받기 위해서 받는것
form.addEventListener("submit", (event) => {
  event.preventDefault(); //서브밋 이벤트로 사용시 꼭 함께 사용해주어야함
  // addEventListener 안으로 선언 위치 이동
  const author = form.querySelector("div.form__input--name > input").value;
  const title = form.querySelector("div.form__input--title > input").value;
  const textbox = form.querySelector("div.form__textbox > textarea").value;

  const newObj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: title,
    url: "https://discord.com/channels/959363007106924565/1073261980896473088",
    author: author,
    bodyHTML: textbox,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  // addEventListener 안으로 선언 위치 이동
  agoraStatesDiscussions.unshift(newObj);

  const discussion = convertToDiscussion(newObj);

  ul.prepend(discussion);

  // submit 후 입력란 빈칸으로 리셋하는 기능 추가
  form.querySelector("div.form__input--name > input").value = "";
  form.querySelector("div.form__input--title > input").value = "";
  form.querySelector("div.form__textbox > textarea").value = "";
});

//모달창 실행 추가
const openButton = document.getElementById("open");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".modalOverlay");
const closeButton = document.querySelector(".close");
const submitButton = document.querySelector(".submit");
const goQuestion = () => {
  modal.classList.remove("hiddenModal");
};
const modalX = () => {
  modal.classList.add("hiddenModal");
};
overlay.addEventListener("click", modalX);
submitButton.addEventListener("click", modalX);
closeButton.addEventListener("click", modalX);
openButton.addEventListener("click", goQuestion);
