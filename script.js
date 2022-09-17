let data = agoraStatesDiscussions; // data.js의 agoraStatesDiscussions를 가져온다.

// convertToDiscussion은 data를 DOM으로 바꿔준다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 아바타 이미지 렌더링 기능 구현
  const avatarImg = document.createElement("img");

  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;

  avatarWrapper.append(avatarImg);

  // Discussion 콘텐츠 렌더링 기능 구현
  const title = document.createElement("h2");
  const titleLink = document.createElement("a");
  const information = document.createElement("div");

  title.className = "discussion__title";
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  title.append(titleLink);
  information.className = "discussion__information";
  information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;

  discussionContent.append(title);
  discussionContent.append(information);

  // 답변 체크 렌더링 기능 구현
  const answered = document.createElement("div");
  const answeredCheck = document.createElement("p");

  if(obj.answer !== null) {
    answeredCheck.textContent = '☑︎';
  } else {
    answeredCheck.textContent = '☒';
  }

  answered.className = "discussion__answered";
  answered.append(answeredCheck);

  discussionAnswered.append(answered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// data 배열의 모든 데이터를 화면에 렌더링하는 함수이다.
const render = (element, from, to) => {
  if(!from && !to) {
    from = 0;
    to = data.length - 1;
  }

  // 다 지우고 배열에 있는 내용 다 보여준다.
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = from; i <= to; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

// Pagination 기능 구현
let pageContentCount = 10; // 한 페이지당 게시물 개수
let currentPage = 1; // 현재 페이지
let totalPage = Math.ceil(data.length / pageContentCount); // 총 페이지 개수
const len = data.length - 1; // 총 게시물 중 마지막 게시물

// 현재 페이지의 첫번째 게시물과 마지막 게시물을 구하는 함수이다.
const getContentStartEnd = () => {
  let contentStart = (currentPage - 1) * pageContentCount; // 현재 페이지의 첫번째 게시물
  let contentEnd = contentStart + pageContentCount - 1; // 현재 페이지의 마지막 게시물
  
  // 현재 페이지가 첫번째 페이지 보다 작거나 같다면 현재 페이지의 첫번째 게시물은 총 게시물의 첫번째 게시물이다. 
  if(currentPage <= 1) {
    contentStart = 0;
  }

  // 현재 페이지가 마지막 페이지 보다 크거나 같다면 현제 페이지의 마지막 게시물은 총 게시물의 마지막 게시물이다.
  if(currentPage > totalPage) {
    contentEnd = len;
  }

  return { contentStart, contentEnd };
}

const pageBtn = document.querySelectorAll('.page__buttons button'); // 페이지 버튼 불러오기

// 이전 페이지 버튼 구현
const prevBtn = pageBtn[0];

prevBtn.addEventListener("click", () => {
  // 이전 페이지 버튼은 현재 페이지가 첫번째 페이지 보다 커야 작동한다.
  if(currentPage > 1) {
    currentPage -= 1;
  }

  const { contentStart, contentEnd } = getContentStartEnd();
  render(ul, contentStart, contentEnd); 
})

// 다음 페이지 버튼 구현
const nextBtn = pageBtn[1];

nextBtn.addEventListener("click", () => {
  // 다음 페이지 버튼은 현재페이지가 마지막 페이지 보다 작아야 작동한다.
  if(currentPage < totalPage) {
    currentPage += 1;
  }

  const { contentStart, contentEnd } = getContentStartEnd();
  render(ul, contentStart, contentEnd);
})



// ul 요소에 data 배열의 모든 데이터를 화면에 렌더링한다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 0, pageContentCount);

// 입력 폼 기능 구현
const form = document.querySelector(".form__container > form");
const inputName = form.querySelector(".form__input--name > input");
const inputTitle = form.querySelector(".form__input--title > input");
const textarea = form.querySelector(".form__textbox > textarea");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  let dataObj = {
    id: "number",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/kimdong-hun",
    author: inputName.value,
    answer: null,
    bodyHTML: null,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/106383277?v=4",
  }

  data.unshift(dataObj);

  inputName.value = '';
  inputTitle.value = '';
  textarea.value = '';

  ul.prepend(convertToDiscussion(data[0]));

  render(ul, 0, pageContentCount);
})
