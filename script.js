// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// function1: convertToDiscussion()
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
  // DOM 자식 요소들 만들고 위에 3가지에 적절히 붙이자.
  // avatar image
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.setAttribute("src", `${obj.avatarUrl}`);
  avatarImage.setAttribute("alt", `avatar of ${obj.author}`);
  avatarWrapper.append(avatarImage);

  // content
  // title
  const discussionTitle = document.createElement("h3");
  discussionTitle.className = "discussion__title";

  const discussionTitleA = document.createElement("a");
  discussionTitleA.setAttribute("href", `${obj.url}`);
  discussionTitleA.textContent = `${obj.title}`;
  discussionTitle.append(discussionTitleA);

  // information
  const discussionTitleInformation = document.createElement("div");
  discussionTitleInformation.className = "discussion__information";
  discussionTitleInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;

  discussionContent.append(discussionTitle, discussionTitleInformation);

  // answered
  const discussionAnsweredCheckbox = document.createElement("p");
  discussionAnsweredCheckbox.textContent = obj.answer ? "✅" : "❌";

  discussionAnswered.append(discussionAnsweredCheckbox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// function2: render()
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
  //   element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  // }
  // return;

  // for of 를 사용한 방법.
  for (let discussion of agoraStatesDiscussions) {
    element.append(convertToDiscussion(discussion));
  }
  return;

  // map 을 써볼까 : 되는데 이상황에 굳이 map을 쓸필요 없음.
  // agoraStatesDiscussions.map((dis) => {
  //   element.append(convertToDiscussion(dis));
  // });
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// function3: form 부분 새로 추가되는 질문 등록해보자.
// submit 했을때 추가되는 함수를 만들어보자.
// 일단 addEventListner에 때려박자
// 먼저 form을 선택해
const form = document.querySelector(".form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formName = document.querySelector("#name");
  const formTitle = document.querySelector("#title");
  const formStory = document.querySelector("#story"); // question
  // convertToDiscussion() 을 이용할거니까 먼저 {} 안에 집어넣자
  const formObj = {
    id: "temporary id",
    createdAt: new Date(),
    title: formTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: formName.value,
    answer: null,
    bodyHTML: formStory.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
  };

  agoraStatesDiscussions.unshift(formObj);
  console.log(agoraStatesDiscussions);
  const newLi = convertToDiscussion(agoraStatesDiscussions[0]);
  ul.prepend(newLi);
  form.reset();
});

// 뭔가를 눌렀을때 튀어나오게 하는 모달창을 만들어보자
const thinkerbell = document.querySelector("#thinkerbell");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal__close__button");
const body = document.querySelector("body");

thinkerbell.addEventListener("click", function () {
  modal.classList.remove("hide");
  body.classList.add(".background-blur");

  modalClose.addEventListener("click", function () {
    modal.classList.add("hide");
  });
});
