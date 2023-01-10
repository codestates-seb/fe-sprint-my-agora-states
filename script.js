//콘솔로 배열 요소 확인
console.log(agoraStatesDiscussions);

//로컬 스토리지 사용 
//로컬 스토리지에 저장된 요소에 이미 있는 데이터 복붙
let data;
const dataFromLocalStorage = localStorage.getItem("agoraStatesDiscussions");
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage);
} else {
  data = agoraStatesDiscussions.slice();
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 변형 
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //li요소 아래에 3개의 div 생성
  //각각 클래스 이름 붙임
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  //첫번째 div에 img 넣어줌
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  //두번째 div에 질문과 a링크를 넣어줌
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  //두번째 div에 등록일시 넣어줌
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  discussionContent.append(discussionTitle, discussionInformation);

  //세번째 div에 체크박스 넣어줌
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑" : "☐";
  discussionAnswered.append(checked);

  //내용이 다 담긴 3개의 div를 li 자식으로 붙임
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// data 배열의 모든 데이터를 화면에 렌더링
const render = (element, from, to) => {
  console.log(from, to);
  if (!from && !to) {
    from = 0;
    to = data.length - 1;
  }
  // 다 지우고 배열에 있는 내용 다 보여주기
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = from; i < to; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

// 페이지네이션을 위한 변수
let limit = 10,
  page = 1;

// render 함수를 사용해서 ul 요소에 data 배열의 모든 데이터를 화면에 렌더링
const ul = document.querySelector("ul.discussions__container");
render(ul, 0, limit);


//한 페이지 10개 리스트를 보여줌
const getPageStartEnd = (limit, page) => {
  const length = data.length - 1;
  let pageStart = Number(page - 1) * Number(limit);
  let pageEnd = Number(pageStart) + Number(limit);
  if (page <= 0) {
    pageStart = 0;
  }
  if (pageEnd >= length) {
    pageEnd = length;
  }
  return { pageStart, pageEnd };
};

const buttons = document.querySelector(".buttons");
buttons.children[0].addEventListener("click", () => {
  if (page > 1) {
    page = page - 1;
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});

buttons.children[1].addEventListener("click", () => {
  if (limit * page < data.length - 1) {
    page = page + 1;
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});

// 인풋 내용 리스트에 넣어주기
const form = document.querySelector(".form");
const author = form.querySelector(".form__input--name > input");
const title = form.querySelector(".form__input--title > input");
const textbox = form.querySelector(".form__textbox > textarea");

// 문서를 제출해야 합니다.
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const obj = {
    id: `hello ${Math.random()}`,
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://d1fdloi71mui9q.cloudfront.net/86qhUj1HSDiS2JPKZpDB_12D138F4-66A0-4722-B8AA-6D781ED39C9B.png ",
  };
  data.unshift(obj);

  // 로컬스토리지에 저장
  localStorage.setItem("agoraStatesDiscussions", JSON.stringify(data));

  // 렌더링
  render(ul, 0, limit);
});