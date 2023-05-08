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

  // <li class="discussion__container">
  //<div class="discussion__avatar--wrapper">
  //<img class="discussion__avatar--image"
  //src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
  //alt="avatar of kimploo">
  //</div>
  //<div class="discussion__content">
  //<h4 class="discussion__title"><a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">[notice] 좋은 질문하는 법</a></h4>
  //<div class="discussion__information">kimploo / 2022-04-22T14:08:33Z</div>
  //</div>
  //<div class="discussion__answered"><p>✅</p></div>
  //</li>
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = obj.author;
  avatarWrapper.append(avatarImage)

  const discussionTitle = document.createElement("h4");
  const titleAnchor = document.createElement("a");
  discussionTitle.className = "discussion__title"
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionContent.append(titleAnchor)

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "dicussion__information";
  discussionInformation.textContent = 
  `${obj.author} / ${new Date(obj.createdAt || Date.now()).toISOString()}`;
  //.toISOString()는 YYYY-MM-DDTHH:mm:ss.sssZ형태로 변경해줌
  discussionContent.append(discussionTitle, discussionInformation);

  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "✅" : "❎";
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
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();//페이지가 새로고침되는 동작을 막는다

  const obj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild); //자식 요소들을 순회하면서 모든 자식 요소를 삭제
  }

  agoraStatesDiscussions.unshift(obj); //새로운 객체 obj를 배열의 첫번째 요소로 추가

  render(ul);  //화면을 업데이트(렌더링)
})
