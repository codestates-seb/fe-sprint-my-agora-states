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

  // data.img
  const img = document.createElement("img");
  img.src = obj.avatarUrl;
  avatarWrapper.append(img);

  // data.link
  const aLink = document.createElement("a");
  aLink.setAttribute("href", obj.url);
  aLink.setAttribute("style", "text-decoration: none");

  aLink.setAttribute("line-height", 0.8);

  aLink.textContent = obj.title;
  const title = document.createElement("h2");
  title.append(aLink);
  discussionContent.append(title);

  // data.information
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionInformation);

  // checkBox
  const checkBox = document.createElement("p");
  checkBox.textContent = "☑";
  discussionAnswered.append(checkBox);

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

// input에서 데이터 가져오기
const submitBtn = document.querySelector(".form__submit");
const elInputName = document.querySelector(".form__input--name");
const elInputTitle = document.querySelector(".form__input--title");
const elInputQuestion = document.querySelector(".form__textbox");

submitBtn.onclick = function (event) {
  event.preventDefault();
  const date = new Date();

  // input value
  let name = elInputName.children[1].value;
  let title = elInputTitle.children[1].value;
  let text = elInputQuestion.children[1].value;

  // img
  const imgElement = document.createElement("img");
  imgElement.className = "discussion__avatar--image";
  imgElement.setAttribute("src", "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4");
  imgElement.setAttribute("alt", "avatar of kimploo");

  const imgDiv = document.createElement("div");
  imgDiv.append(imgElement);
  imgDiv.className = "discussion__avatar--wrapper";

  // content

  const a = document.createElement("a");
  a.textContent = title;

  const h2 = document.createElement("h2");
  h2.append(a);
  h2.className = "discussion__title";

  const infoDiv = document.createElement("div");
  infoDiv.textContent = `${name} / ${date.toLocaleTimeString()}`;
  infoDiv.className = "discussion__information";

  const contentDiv = document.createElement("div");
  contentDiv.className = "discussion__content";
  contentDiv.append(h2, infoDiv);

  // checkBox
  const p = document.createElement("p");
  p.innerHTML = "☑";
  const checkBoxDiv = document.createElement("div");
  checkBoxDiv.className = "discussion__answered";

  //li
  const li = document.createElement("li");
  li.className = "discussion__container";
  li.append(imgDiv, contentDiv, checkBoxDiv);
  const ul = document.querySelector(".discussions__container");
  ul.prepend(li);

  // reset input value
  elInputName.children[1].value = "";
  elInputTitle.children[1].value = "";
  elInputQuestion.children[1].value = "";
};
