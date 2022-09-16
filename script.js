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

  // avatar
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  // avatarImg.src = agoraStatesDiscussions[0].avatarUrl;
  // avatarImg.alt = "avatar of " + agoraStatesDiscussions[0].author;
  avatarWrapper.append(avatarImg);

  // info title
  const contentTit = document.createElement("h2");
  const titAnchor = document.createElement("a");
  titAnchor.href = obj.url;
  titAnchor.textContent = obj.title;
  contentTit.append(titAnchor);

  const contentInfo = document.createElement("div");
  contentInfo.className = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  discussionContent.append(contentTit, contentInfo);

  // info checkbox
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑" : "☒";
  discussionAnswered.append(checked);

  // DOM append 메서드를 이용하여,
  // 위에서 생성한 <div>요소들을 li.discussion__container의 자식 요소로 추가.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (ul) => {
  // 더미데이터 길이 만큼, 더미데이터 안에 있는 모든 요소 탐색 ㄱㄱ
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // i번째 요소를 convertToDiscussion에 전달 -> 결과를 ul에 append
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// 페이지네이션을 위한 변수
// let limit = 10,
//   page = 1;

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
// render(ul, 0, limit);

// event listener
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log('🎇🎆🎇🎆');
  // 객체 생성
  const obj = {
    id: "unique id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
  };
  data.unshift(obj);

  // 로컬스토리지에 저장
  localStorage.setItem("agoraStatesDiscussions", JSON.stringify(data));

  // 렌더링
  render(ul, 0, limit);
});

// 첫번째 배열에 추가
// agoraStatesDiscussions.unshift(obj);
// 그 객체를 convertToDiscussion에 넣어서 DOM으로 변환
// 그걸 또 render함수에 넣어서 브라우저에 렌더링 -> 맨 앞으로!
// ul.prepend(convertToDiscussion(obj));
// title.value = ""';
// author.value = ""';
// textArea.value = ""';
