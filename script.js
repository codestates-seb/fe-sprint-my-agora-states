// 선언
const btnSubmit = document.querySelector(".form__submit input");
let myStorage = window.localStorage; // 로컬 스토리지

// 데이터 넣을 변수
let data;

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
// data.js가 먼저 로딩되었기 때문에 이 파일에서 해당 변수를 사용할수있다

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
  // 아바타 이미지
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl
    ? obj.avatarUrl
    : `https://randomuser.me/api/portraits/women/50.jpg`;
  avatarImg.alt = `avatar of ${obj.author}`;

  // 디스커션 제목
  const discussionTitle = document.createElement("h2");
  const discussionLink = document.createElement("a");

  discussionLink.href = obj.url;
  discussionLink.textContent = obj.title;

  discussionTitle.className = "discussion__title";
  discussionTitle.append(discussionLink);

  // 디스커션 작성자 + 작성날짜
  const discussionInformation = document.createElement("div");
  const createdAt = new Date(obj.createdAt);
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${
    obj.author
  } | ${createdAt.toLocaleString("ko-KR")}`;
  // advanced - 샘플시간 변형해서 현지시간에 맞게 표현
  // 샘플 : yyyy-mm-ddT00:00:00Z <- .toISOString() 으로 변환하면 왼쪽같은 형식으로 날짜가 반환됨.
  // .toISOString() : 주어진 날짜를 국제표준시 기준 ISO 8601 형식으로 표현해 문자열로 리턴한다.

  //Date.prototype.toLocaleString()
  // 지정된 지역에서 표현하는 방식의 날짜를 문자열로 리턴한다.
  // Date.toLocaleString('ko-KR') : 날짜를 한국식으로 표현한다

  // 디스커션 답변 여부
  const discussionAnsweredCheck = document.createElement("span");
  discussionAnsweredCheck.className = "material-icons";
  discussionAnsweredCheck.textContent = "favorite";
  if (obj.answer) {
    discussionAnsweredCheck.classList.add("complete");
  }
  // null 아니면 데이터 형태로 처리되는게 좋은 데이터

  avatarWrapper.append(avatarImg);
  discussionContent.append(discussionTitle, discussionInformation);
  discussionAnswered.append(discussionAnsweredCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// fetch data async 함수 - async 사용
// async function dataSet() {
//   let response = await fetch("http://localhost:4000/discussions");
//   return await response.json();
// }

// async 사용한 render
// const render = async (element, from, to) => {
//   if (!from && !to) {
//     from = 1;
//     to = data.length - 1;
//   }

//   // 만약 기존의 데이터가 있을 경우 초기화 하도록 함
//   while (element.hasChildNodes()) {
//     element.removeChild(element.lastChild);
//   }

//   // 렌더링해줄 데이터 세팅
//   let fetchData = await dataSet();
//   data = myStorage.getItem("items")
//     ? JSON.parse(myStorage.getItem("items"))
//     : fetchData;

//   for (let i = from; i < to; i += 1) {
//     element.append(convertToDiscussion(data[i]));
//   }

//   // for (let i = 0; i < data.length; i += 1) {
//   //   element.append(convertToDiscussion(data[i]));
//   //   // 배열의 모든 요소 개수만큼 반복
//   //   // 배열 인덱스번째의 객체가 convertToDiscussion의 매개변수가 된다.
//   // }
// };

// 페이지네이션
let limit = 10; // 한 페이지에 글은 10개까지만
let page = 1;

const render = (element, from, to) => {
  if (!from && to) {
    from = 0;
    to = data.length - 1;
  }

  while (element.hasChildNodes()) {
    element.removeChild(element.lastChild);
  }

  for (let i = from; i < to; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
};

fetch("http://localhost:4000/discussions")
  .then((res) => res.json())
  .then((json) => {
    data = myStorage.getItem("items")
      ? JSON.parse(myStorage.getItem("items"))
      : json;
    render(ul, 0, limit);
  });

// render(ul, 0, limit);

const getPageStartEnd = (limit, page) => {
  const len = data.length - 1;
  let pageStart = Number(page - 1) * Number(limit);
  // 한 페이지에 나타날 글 중 첫번째 글의 인덱스
  let pageEnd = Number(pageStart) + Number(limit);
  // 한 페이지에 나타날 글 중 마지막 글의 인덱스
  if (page <= 0) {
    pageStart = 0; // 0이거나 음수이면 첫번째 글부터
  }
  if (pageEnd >= len) {
    pageEnd = len; // 마지막 인덱스까지만 보이게 함
  }
  return { pageStart, pageEnd };
};

const buttons = document.querySelector(".buttons");
buttons.children[0].addEventListener("click", () => {
  if (page > 1) {
    // 페이지가 1보다 크면 = 첫페이지가 아니라면
    page = page - 1; // 한페이지씩 감소(=뒤로가기)
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});

buttons.children[1].addEventListener("click", () => {
  if (limit * page < data.length - 1) {
    // 보여진 글의 개수가 전체 글의 개수보다 작다면
    page = page + 1; // 한 페이지씩 증가
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});

buttons.children[2].addEventListener("click", () => {
  // 로컬스토리지의 데이터 초기화 하고 페이지도 초기상태로 되돌림
  localStorage.removeItem("items");
  data = data.slice();
  limit = 10;
  page = 1;
  render(ul, 0, limit);
});

// 디스커션 추가기능
// 이름, 제목, 본문 작성 후 sumbit 버튼 클릭시 실제 화면에 디스커션이 추가되어야 함
// agoraStatesDiscussions 배열에 작성한 내용이 추가되어야 함.

// 의사코드
// 버튼이 클릭시 이벤트 발생
// 이름, 제목, 본문을 가져와서 배열에 추가한다.
// 추가된 내용은 dom으로 만들어서 렌더링되게 한다.
// 추가된 내용은 배열과 화면 모두 맨 뒤가 아니라 맨 앞에 와야한다. (최신순)
const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
  // 가져와야 할 내용들
  // 이름(author), 제목(title), 본문(bodyHTML), 현재 시간(클릭된 시간)(createdAt)
  // url, answer = null, avatarUrl 은 되면 추가로 작성
  event.preventDefault(); // submit 이벤트 발생시 새로고침 방지

  const author = document.querySelector("#name");
  const title = document.querySelector("#title");
  const story = document.querySelector("#story");
  const date = Date(); // new Date() : date객체 반환, Date() : 현재 날짜와 시간 나타내는 문자열 반환
  // Invalid Date ?? : 크로스 브라우징 이슈때문에 나타나는 에러
  const newObj = {
    id: 0,
    createdAt: date,
    title: title.value,
    // url: 1,
    author: author.value,
    answer: false,
    bodyHTML: story.value,
    avatarUrl: `https://randomuser.me/api/portraits/women/50.jpg`,
  };

  // advanced : 데이터 추가시 로컬 스토리지에 내용이 추가되어야 함
  // 추가된 내용을 데이터 배열에 추가
  // 새 데이터 배열 로컬스토리지에 셋팅
  // 새로 셋팅된 데이터를 가져와서 렌터링
  data.unshift(newObj);
  myStorage.setItem("items", JSON.stringify(data));
  render(ul, 0, limit);

  // 추가 완료시 입력 내용 삭제
  author.value = "";
  title.value = "";
  story.value = "";
});

/* ??? 버튼 클릭 이벤트시 GET http://127.0.0.1:5500/false 404 (Not Found) 에러가 발생하는 것 같다. 값이 무엇이든지 관계없이 404 에러가 발생함 */
