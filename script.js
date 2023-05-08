// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log('45기 안녕하세요', agoraStatesDiscussions);

// 순수 함수
  // 외부에 영향을 주지 않아야 한다.
  // input => output
  // 기어 
  // 핸들 -> 좌회전 -> 자기 맘대로 엑셀을 밟는다

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// DOM으로 바꿔주고, <li> APPEND까지 한다.
const convertToDiscussion = (obj) => {
// <li class="discussion__container">
//   <div class="discussion__avatar--wrapper">
//     <img class="discussion__avatar--image"
//       src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
//       alt="avatar of kimploo">
//   </div>
//   <div class="discussion__content">
//     <h2 class="discussion__title"><a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">[notice] 좋은 질문하는 법</a></h2>
//     <div class="discussion__information">kimploo / 2022-04-22T14:08:33Z</div>
//   </div>
//   <div class="discussion__answered"><p>☑</p></div>
// </li>

  /* <li class="discussion__container"></li> */
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  /* <div class="discussion__avatar--wrapper"></div> */
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

{/* <img class="discussion__avatar--image" */}
//       src="https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
//       alt="avatar of kimploo">
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  // Append 과정
  avatarWrapper.append(avatarImg);

  // <div class="discussion__content"></div>
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  /* <div class="discussion__answered"></div> */
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt || Date.now()
  ).toISOString()}`;
  discussionContent.append(discussionTitle, discussionInformation);

  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑" : "☒";
  discussionAnswered.append(checked);
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// <li> -> <ul> append 
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// input을 불러와야 한다.
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log('submit 이벤트 발생했다!!')
  console.log(author.value, title.value, textbox.value)

  const obj = {
    id: "unique id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };

  // agoraStatesDiscussions 객체 추가
  agoraStatesDiscussions.unshift(obj);

  // 화면 다 지우고 
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  // 다시 agoraStatesDiscussions 기반으로 화면에 보여주기 (렌더링)
  render(ul);

  // 사실은.. 
    // HTML 파일을 새로 받아오는 시절이 있었다.
    // 폼 제출을 하면 완전히 새로운 HTML 파일을 받아와야 했다. => 새로고침
})