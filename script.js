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

  console.log(avatarWrapper, discussionContent, discussionAnswered);
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // Avatar Image
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  //avatarImg.alt = "avatar of" + agoraStatesDiscussions[0].author;
  avatarWrapper.append(avatarImg);

  // Disscusion Title
  const discussionTitle = document.createElement("h3");
  discussionTitle.className = "discussion__title";
  const titleA = document.createElement("a");
  titleA.href = obj.url;
  titleA.textContent = obj.title;
  discussionContent.append(discussionTitle);
  discussionTitle.append(titleA);

  // Disscusion Information = author, createdAt
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author}  ${new Date(
    obj.createdAt
  ).toLocaleString()}`;

  discussionContent.append(discussionInformation);

  //Disscusion Check or NonCheck
  const discussionCheck = document.createElement("p");
  discussionCheck.className = "discussion__answered";
  discussionCheck.textContent = obj.answer ? "✔︎" : "✘";
  discussionAnswered.append(discussionCheck);

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

const $modal = document.querySelector(".modal");
const $form_container = document.querySelector(".form__container");
const $main_container = document.querySelector("#main_container");
const $bg = document.querySelector(".black_bg");
const $submit_btn = document.querySelector(".form__submit");

// 질문하기Btn 눌러서 모달 켜고 끄기
$modal.addEventListener("click", function () {
  if ($form_container.classList.contains("hide")) {
    $form_container.classList.remove("hide");
    $bg.style.display = "block";
  } else {
    $form_container.classList.add("hide");
    $bg.style.display = "none";
  }
});

// 모달창 바깥 클릭하면 끄기
window.addEventListener("click", (e) => {
  if (e.target === $bg) {
    $form_container.classList.add("hide");
    $bg.style.display = "none";
  }
});

// form.addEventListener('submit', (e) => {
//   if(e.target === $submit_btn){
//     $form_container.classList.add('hide');
//     $bg.style.display = 'none';
//   }
// })

const form = document.querySelector("form.form");
const author = document.querySelector("input#author");
const title = document.querySelector("input#title");
const story = document.querySelector("textarea#story");

const submitBtn = document.querySelector(".submit-btn");
const closeBtn = document.querySelector(".close");
const arrowUpBtn = document.querySelector(".arrow_up_btn");
// submit을 클릭하면 자료를 가져온다

form.addEventListener("submit", (event) => {
  event.preventDefault(); //서브밋 이벤트로 사용시 꼭 함께 사용해주어야함, submit 동작이 일어나면 자동으로 새로고침을 방지
  const newDiscussion = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    bodyHTML: story.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  agoraStatesDiscussions.unshift(newDiscussion);
  const discussion = convertToDiscussion(newDiscussion);
  ul.prepend(discussion);

  document.querySelector(".form__container").classList.add("hide");
  $bg.style.display = "none";
  title.value = "";
  author.value = "";
  story.value = "";
});
