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

  // avatar img 추가
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  // content 추가
  // title
  const discusstionTitle = document.createElement("h2");
  discusstionTitle.className = "discussion__title";
  const contentA = document.createElement("a");
  contentA.href = obj.url;
  contentA.textContent = obj.title;
  discusstionTitle.append(contentA);
  discussionContent.append(contentA);

  // content infomation
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionInfo);

  // answered?
  if (obj.answer) discussionAnswered.textContent = "🅅";
  else discussionAnswered.textContent = "🅇";

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
//render(ul);

// 페이지네이션 구현
const buttons = document.querySelector(".buttons");
const showContent = 6; //한페이지 최대 글 개수
const showButton = 5; // 한페이지 페이지버튼 개수
let page = 1; // 첫페이지
const maxPage = Math.ceil(agoraStatesDiscussions.length / showContent); //최대 페이지 수

// 페이지 버튼 생성
const makeButton = (id) => {
  const button = document.createElement("button");
  button.classList.add("button");
  button.dataset.num = id;
  button.innerText = id;
  button.addEventListener("click", (e) => {
    //버튼 클릭시 class 조정
    Array.prototype.forEach.call(buttons.children, (button) => {
      if (button.dataset.num) button.classList.remove("active");
    });
    e.target.classList.add("active");
    renderContent(parseInt(e.target.dataset.num));
  });
  return button;
};

const renderContent = (page) => {
  // 목록 리스트 초기화
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.lastChild);
  }
  // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 6개의 글 생성
  for (
    let id = (page - 1) * showContent + 1;
    id <= page * showContent && id <= agoraStatesDiscussions.length;
    id++
  ) {
    ul.appendChild(convertToDiscussion(agoraStatesDiscussions[id - 1]));
  }
};

// 페이지이동
const goPrevPage = () => {
  page -= showButton;
  render1(page);
};

const goNextPage = () => {
  page += showButton;
  render1(page);
};

const prev = document.createElement("button");
prev.classList.add("button", "prev");
prev.innerHTML = "<-";
prev.addEventListener("click", goPrevPage);

const next = document.createElement("button");
next.classList.add("button", "next");
next.innerHTML = "->";
next.addEventListener("click", goNextPage);

const renderButton = (page) => {
  // 버튼 리스트 초기화
  while (buttons.hasChildNodes()) {
    buttons.removeChild(buttons.lastChild);
  }
  // 화면에 최대 5개의 페이지 버튼 생성
  for (let id = page; id < page + showButton && id <= maxPage; id++) {
    buttons.appendChild(makeButton(id));
  }
  // 첫 버튼 활성화(class="active")
  buttons.children[0].classList.add("active");

  buttons.prepend(prev);
  buttons.append(next);

  // 이전, 다음 페이지 버튼이 필요한지 체크
  if (page - showButton < 1) buttons.removeChild(prev);
  if (page + showButton > maxPage) buttons.removeChild(next);
};

const render1 = (page) => {
  renderContent(page);
  renderButton(page);
};
render1(page);
