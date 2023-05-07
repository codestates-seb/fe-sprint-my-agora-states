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

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarImg);

  const disTitle = document.createElement("h2");
  disTitle.className = "discussion__title";
  const titleSrc = document.createElement("a");
  titleSrc.href = "Story.html?id=${obj.url}";
  titleSrc.textContent = obj.title;

  titleSrc.addEventListener("click", (event) => {
    event.preventDefault(); // 기본 동작(링크 이동) 취소

    const newWindow = window.open("", "_blank");

    const newDoc = newWindow.document;
    const newContent = newDoc.createElement("div");
    newContent.innerHTML = obj.bodyHTML;
    newDoc.body.appendChild(newContent);
  });

  disTitle.append(titleSrc);

  const disInfo = document.createElement("div");
  disInfo.className = "discussion__info";
  const disUserID = document.createElement("p");
  disUserID.className = "discussion__userID";
  const disDate = document.createElement("p");
  disDate.className = "discussion__date";
  disUserID.textContent = obj.author;
  disDate.textContent = `${new Date(obj.createdAt).toLocaleString()}`;
  disInfo.append(disUserID, disDate);

  discussionContent.append(disTitle, disInfo);

  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑︎" : "☒";
  discussionAnswered.append(checked);

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

const form = document.querySelector("form.form");
const formAuthor = form.querySelector(".form__input--name > input");
const formTitle = form.querySelector(".form__input--title > input");
const formTextbox = form.querySelector(".form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const obj = {
    id: "pdh",
    createdAt: new Date(),
    title: formTitle.value,
    author: formAuthor.value,
    answer: null,
    bodyHTML: formTextbox.value,
    avatarUrl: "myIcon.jpeg",
  };
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));
  formAuthor.value = "";
  formTitle.value = "";
  formTextbox.value = "";
});



