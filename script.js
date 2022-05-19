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
  // avatar 작성
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.setAttribute("src", obj.avatarUrl);
  avatarImg.setAttribute("alt", `avatar of ${obj.author}`);
  // avatar 추가
  avatarWrapper.append(avatarImg);
  // title 작성
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement("a");
  discussionLink.setAttribute("href", obj.url)
  discussionLink.textContent = obj.title;
  discussionTitle.append(discussionLink);
  // information 작성
  const discussionInformation = document.createElement("div");
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`
  // content 추가
  discussionContent.append(discussionTitle, discussionInformation);
  // answer 작성
  const checkIcon = document.createElement("i");
  if(obj.answer === null){
    checkIcon.className = "fa-regular fa-circle-check";
  } else {
    checkIcon.className = "fa-solid fa-circle-check";
  }
  // answer 추가
  discussionAnswered.append(checkIcon);

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

const addDiscussion = () => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  
  const name = document.querySelector("#name");
  const title = document.querySelector("#title");
  const content = document.querySelector("#story");

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement("a");
  discussionLink.setAttribute("href", "#")
  discussionLink.textContent = title.value;
  discussionTitle.append(discussionLink);
  // information 작성
  const discussionInformation = document.createElement("div");
  discussionInformation.textContent = `${name.value} / time`
  // content 추가
  discussionContent.append(discussionTitle, discussionInformation);

  li.append(avatarWrapper, discussionContent)
  ul.prepend(li);
}

document.querySelector("#submit").addEventListener("click", () => {
  addDiscussion();
})