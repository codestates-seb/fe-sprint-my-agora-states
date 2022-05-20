// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
// section.form__container 요소에 아이디, 본문을 입력하고 버튼을 누르면
// agoraStatesDiscussions 배열에 추가한 데이터가 쌓여야합니다.

document.querySelector(".form").onsubmit = function (e) {
  let inputName = this.name.value;
  let inputTitle = this.title.value;
  let inputStory = this.story.value;
  let newDiscussionContent = {
    author: `${inputName}`,
    title: `${inputTitle}`,
    story: `${inputStory}`,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    createdAt: new Date(),
    answer: null,
    url: "#",
  };

  localStorage.setItem(
    "newDiscussionContent",
    JSON.stringify(newDiscussionContent)
  );
  let localNewDiscussionContent = JSON.parse(
    localStorage.getItem("newDiscussionContent")
  );

  agoraStatesDiscussions.unshift(localNewDiscussionContent);
  renderAgain(ul);
  return false;
};

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
  const avartarImg = document.createElement("img");
  avartarImg.className = "discussion__avatar--image";
  avartarImg.src = obj.avatarUrl;
  avartarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avartarImg);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  const discussionTitleLink = document.createElement("a");
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  discussionContent.append(discussionInformation);

  const discussionAnsweredCheck = document.createElement("span");
  discussionAnsweredCheck.className = "material-symbols-outlined";
  if (obj.answer !== null) {
    discussionAnsweredCheck.textContent = "check_box";
  } else {
    discussionAnsweredCheck.textContent = "check_box_outline_blank";
  }
  discussionAnswered.append(discussionAnsweredCheck);

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

// ul 요소에 agoraStatesDiscussions 배열의 새로운 데이터를 화면에 렌더링합니다.
const renderAgain = (element) => {
  element.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
