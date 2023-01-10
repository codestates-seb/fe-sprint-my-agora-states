let data;  //로컬 스토리지
const dataFromLocalStorage = localStorage.getItem("agoraStatesDiscussions");
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage);
} else {
  data = agoraStatesDiscussions.slice();
}

/* convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다. -> 리스트 덩어리 만들기! */
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  li.append(avatarWrapper, discussionContent, discussionAnswered);  // li -(avatar, content, answered) 구조 만들기

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;  // 이미지가 안떴을 때, 시각장애인 접근성
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h3');
  discussionContent.append(discussionTitle);
  const titleAnchor = document.createElement('a');
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  const discussionInfo = document.createElement('div');
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionInfo);

  const answerCheck = document.createElement('p');
  answerCheck.textContent = obj.answer ? "☑" : "☐";
  discussionAnswered.append(answerCheck);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
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

let limit = 10,  //페이지네이션
  page = 1;

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 0, limit);

/* 디스커션 추가 기능 */
const getPageStartEnd = (limit, page) => {
  const len = data.length - 1;
  let pageStart = Number(page - 1) * Number(limit);
  let pageEnd = Number(pageStart) + Number(limit);
  if (page <= 0) {
    pageStart = 0;
  }
  if (pageEnd >= len) {
    pageEnd = len;
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
  localStorage.removeItem("agoraStatesDiscussions");
  data = agoraStatesDiscussions.slice();
  limit = 10;
  page = 1;
  render(ul, 0, limit);
});

buttons.children[2].addEventListener("click", () => {
  if (limit * page < data.length - 1) {
    page = page + 1;
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});

const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener('submit', (event) => {
  event.preventDefault();  //자동 이벤트 발생을 막기 위해
  const obj = {
    id: "new id",
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    createdAt: new Date().toISOString(), //현재 시간
    bodyHTML: textbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/117844745?v=4"
  };
  data.unshift(obj);

  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(data)); //로컬 저장소에 저장
  
  render(ul, 0, limit);
});