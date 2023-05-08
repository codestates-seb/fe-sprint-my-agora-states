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
  //img
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatarImg";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);
  //
  //title
  const titleDis = document.createElement("li");

  titleDis.textContent = obj.title;
  titleDis.className = "discussion__title";
  discussionContent.append(titleDis);
  //id
  const account = document.createElement("p");
  account.textContent = obj.author;
  account.className = "discussion__acount";
  discussionContent.append(account);
  //time
  const upTime = document.createElement("p");
  upTime.textContent = obj.createdAt;
  discussionContent.append(upTime);
  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;
};

//submit button

const button = document.querySelectorAll(".submitBtn");
function submitEvent(iD, Title, textBox) {
  let id = document.querySelector("#name");
  let title = document.querySelector("#title");
  let TextBox = document.querySelector("#textbox");
  let newli = document.querySelector(".discussions__container");

  let newWrite = document.createElement("div");
  newWrite.className = "discussions__container";
  newWrite.textContent = id.value;
  newli.appendChild(newWrite);
}

button[0].addEventListener("click", submitEvent);

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
