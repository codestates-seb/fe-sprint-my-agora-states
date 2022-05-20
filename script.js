// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

localStorage.removeItem("username");

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
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarImg.classList.add("discussion__avatar--image");
  avatarWrapper.append(avatarImg);

  // 질문과 하이퍼링크 추가
  const title = document.createElement("h3");
  const titleLink = document.createElement("a");
  title.classList.add("discussion__title");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  title.append(titleLink);
  discussionContent.append(title);

  // 작성자 닉네임과 작성 시간 추가
  const information = document.createElement("div");
  information.classList.add("discussion__information");
  information.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(information);

  // 답변 유무 추가
  if (obj.answer === null) {
    // ☑
    discussionAnswered.textContent = "❎";
  } else {
    discussionAnswered.textContent = "✅";
  }

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

// localStorage에 저장된 discussion값을 agoraStatesDiscussions에 shift();
for (let j = 0; j < localStorage.length; j++) {
  let key = localStorage.key(j);
  agoraStatesDiscussions.unshift(JSON.parse(localStorage.getItem(key)));
  // element.prepend(convertToDiscussion(JSON.parse(localStorage.getItem(key))));
  console.log(key);
}
console.log(agoraStatesDiscussions);

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.

const ul = document.querySelector("ul.discussions__container");
render(ul);

Date.prototype.amPm = function () {
  let h = this.getHours() < 12 ? "Am" : "Pm";
  return h;
};

// submit 클릭 시 이벤트 제어
const submitBtn = document.querySelector(".submit__btn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const formName = document.querySelector("#name");
  const formTitle = document.querySelector("#title");
  const formStory = document.querySelector("#story");

  let newObj = {};
  const date = new Date();
  let hours;
  if (date.getHours() > 12) {
    hours = date.getHours() - 12;
  } else {
    hours = date.getHours();
  }

  newObj.title = formTitle.value;
  newObj.bodyHTML = formStory.value;
  newObj.author = formName.value;
  newObj.createdAt = `${date.amPm()} ${hours} : ${String(
    date.getMinutes()
  ).padStart(2, "0")} : ${String(date.getSeconds()).padStart(2, "0")}`;
  newObj.avatarUrl =
    "https://avatars.githubusercontent.com/u/103625066?s=200&v=4";
  newObj.url = "https://github.com/codestates-seb/agora-states-fe/discussions";
  newObj.answer = null;
  console.log(newObj);

  localStorage.setItem(`${date.getTime()}`, JSON.stringify(newObj));

  const newList = convertToDiscussion(newObj);

  ul.prepend(newList);
  formName.value = "";
  formTitle.value = "";
  formStory.value = "";
});

/*
{
{
    id: "D_kwDOHOApLM4APjJi",
    createdAt: "2022-05-16T01:02:17Z",
    title: "koans 과제 진행 중 npm install 오류로 인해 정상 작동 되지 않습니다",
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: "dubipy",
    answer: {
      id: "DC_kwDOHOApLM4AKg6M",
      createdAt: "2022-05-16T02:09:52Z",
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236",
      author: "Kingsenal",
      bodyHTML:
        '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user"',
      avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    },
    bodyHTML:
    '<p dir="auto">--------------- 여기서부터 복사하세요 ---------------</p>\n<p dir="auto">운영 체제: 예) macOS</p>\n<p dir="auto">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤'
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  },
}
*/
