// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 메인 박스
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 아바타
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[0].author;
  avatarWrapper.append(avatarImg);
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // 내용
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  discussionContent.append(discussionTitle);

  // 정보
  const discussionInfo = document.createElement("div");
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`
  discussionInfo.className = "discussion__information";
  discussionContent.append(discussionTitle, discussionInfo);

  // 체크
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
// 질문 추가
form.addEventListener("submit", (event) => {
  event.preventDefault(); //서브밋 이벤트로 사용시 꼭 함께 사용해주어야함
  const author = form.querySelector("div.form__input--name > input");
  const title = form.querySelector("div.form__input--title > input");
  const textbox = form.querySelector("div.form__textbox > textarea");

  const newObj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: title.value ,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    bodyHTML: textbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  }

  agoraStatesDiscussions.unshift(newObj);

  const discussion = convertToDiscussion(newObj);

  ul.prepend(discussion);

  form.querySelector("div.form__input--name > input").value = "";
  form.querySelector("div.form__input--title > input").value = "";
  form.querySelector("div.form__textbox > textarea").value = "";
  
})

// 화살표 버튼 클릭 시 홈으로 이동
const arrowUp = document.querySelector('.arrow-up');
const handleArrowUp = () => {
  arrowUp.removeEventListener('click', handleArrowUp);
  scrollIntoView('#home');
  setTimeout(() => {
      arrowUp.addEventListener('click', handleArrowUp);
  }, 1000);
  console.log('click');
};
arrowUp.addEventListener('click', handleArrowUp);

// 스크롤뷰 함수
function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth"});
}

//로컬스토리지
const dataFromLocalStorage = localStorage.getItem("agoraStatesDiscussions");
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage);
} else {
  data = agoraStatesDiscussions.slice();
}
// 로컬스토리지에 저장
localStorage.setItem("agoraStatesDiscussions", JSON.stringify(data));