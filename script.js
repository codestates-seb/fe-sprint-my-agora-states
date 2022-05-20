// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");
const submitForm = document.querySelector("#submit");

let data = [];
const agoraStatesDiscussionsParse = JSON.parse(
  localStorage.getItem("agoraStatesDiscussions")
);

if (agoraStatesDiscussionsParse) {
  data = agoraStatesDiscussionsParse;
} else {
  const agoraStatesDiscussionsJSON = JSON.stringify(agoraStatesDiscussions);
  data = agoraStatesDiscussions;
  localStorage.setItem("agoraStatesDiscussions", agoraStatesDiscussionsJSON);
}

submitForm.onclick = function (e) {
  e.preventDefault();
  const date = () =>
    `${new Date().getFullYear()}-${
      String(new Date().getMonth()).length === 1
        ? "0" + String(new Date().getMonth() + 1)
        : new Date().getMonth() + 1
    }-${
      String(new Date().getDate()).length === 1
        ? "0" + String(new Date().getDate())
        : new Date().getDate()
    }T${
      String(new Date().getMinutes()).length === 1
        ? "0" + String(new Date().getHours())
        : new Date().getHours()
    }:${
      String(new Date().getMinutes()).length === 1
        ? "0" + String(new Date().getMinutes())
        : new Date().getMinutes()
    }:${
      String(new Date().getSeconds()).length === 1
        ? "0" + String(new Date().getSeconds())
        : new Date().getSeconds()
    }Z`;
  data.unshift({
    author: inputName.value,
    title: inputTitle.value,
    createdAt: date(),
    avatarUrl: "https://avatars.githubusercontent.com/u/90498108?s=96&v=4",
  });
  ul.prepend(
    convertToDiscussion({
      author: inputName.value,
      title: inputTitle.value,
      createdAt: date(),
      avatarUrl: "https://avatars.githubusercontent.com/u/90498108?s=96&v=4",
    })
  );
  localStorage.setItem("agoraStatesDiscussions", JSON.stringify(data));

  inputName.value = "";
  inputTitle.value = "";
  inputStory.value = "";
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionContentTitle = document.createElement("div");
  discussionContentTitle.className = "discussion__title";
  discussionContent.append(discussionContentTitle);

  const discussionContentLink = document.createElement("a");
  discussionContentLink.append(obj.title);
  discussionContentLink.href = obj.url;
  discussionContentTitle.append(discussionContentLink);

  const discusstionInformation = document.createElement("div");
  discusstionInformation.className = "discussion__information";
  discusstionInformation.append(
    `${obj.author} / ${obj.createdAt.slice(0, 10)} ${
      Number(obj.createdAt.slice(11, 13)) > 12
        ? "오후 " +
          String(Number(obj.createdAt.slice(11, 13)) - 12) +
          ":" +
          obj.createdAt.slice(14, obj.createdAt.length - 1)
        : "오전 " + obj.createdAt.slice(11, obj.createdAt.length - 1)
    }`
  );
  discussionContent.append(discusstionInformation);

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  obj.answer
    ? discussionAnswered.append("✅")
    : discussionAnswered.append("❎");

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < data.length; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
