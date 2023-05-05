// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // avatar
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // content
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // answered
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarImg.classList.add("discussion__avatar--image");
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement("h3");
  contentTitle.className = "discussion__title";
  const contentUrl = document.createElement("a");
  contentUrl.href = obj.url;
  contentUrl.textContent = obj.title;
  contentTitle.append(contentUrl);

  const contentInfo = document.createElement("div");
  contentInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  contentInfo.className = "discussion__information";

  discussionContent.append(contentTitle, contentInfo);

  const answered = document.createElement("div");
  answered.className = "discussion__answered";
  const answeredCheck = document.createElement("p");
  answeredCheck.textContent = "☑";

  answered.append(answeredCheck);

  discussionAnswered.append(answered);

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

// 아이디, 제목, 본문을 입력하고 누르면 실제 화면에 디스커션이 추가
// agoraStatesDiscussions 배열에 들어가 있는 요소는 객체형태로 들어가 있다 { title, author, createdAt, avatarUrl, url }
// agoraStatesDiscussions 배열에 추가한 데이터가 실제 쌓여야 한다(concat()을 사용해서 불변성을 지키고 새로운 요소 넣기)
// 등록한 시간까지 같이 나올 수 있게(advanced)
const form = document.querySelector(".form");

// input 태그 id를 가져와야 value를 사용할 수 있다
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputName = document.querySelector("#name");
  const inputTitle = document.querySelector("#title");
  const inputText = document.querySelector("#story");

  const newDiscussion = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: inputText.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/4",
    author: inputName.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };
  // console.log(newDiscussion);

  agoraStatesDiscussions.concat(newDiscussion);
  const discussion = convertToDiscussion(newDiscussion);

  ul.prepend(discussion);

  inputName.value = "";
  inputTitle.value = "";
  inputText.value = "";
});

// 페이지네이션 구현하기
// 총 4가지 값이 필요
// 1. 화면에 보여질 페이지 그룹 = Math.ceil(현재 페이지 / 한 화면에 나타낼 페이지 수)
// 2. 화면에 보여질 첫번째 페이지 = 화면에 보여질 마지막 페이지 - (한 화면에 나타낼 페이지 - 1) 단, 계산된 값이 <= 0 첫번째 페이지는 1
// 3. 화면에 보여질 마지막 페이지 = 화면에 보여질 페이지 그룹 * 한 화면에 나타낼 페이지 단, 계산된 값이 > 총 페이지수 마지막 페이지는 총 페이지 수
// 4. 총 페이지 수 = Math.ceil(전체 갯수 /한 화면에 나타낼 데이터 수)

const totalCount = 53; // 임의 값
const limit = 10; // 한 페이지에 나타낼 데이터 갯수
const currentPage = 1; // 현재 페이지
const pageCount = 5; // 페이지 갯수

// 현재 페이지의 그룹 계산하기
let pageGroup = Math.ceil(currentPage / pageCount);
// 총 페이지 갯수
let totalPage = Math.ceil(totalCount / limit);

// 현재 페이지 그룹의 첫번째/마지막 숫자 구하기
let lastNumber = pageGroup * pageCount;

// 만약 마지막 숫자가 총 페이지보다 크면 총페이지 수가 마지막 숫자
if (lastNumber > totalPage) {
  lastNumber = totalPage;
}

let firstNumber = lastNumber - (pageCount - 1);

const next = lastNumber + 1;
const prev = firstNumber - 1;

// 1~5만큼 페이지네이션 그려줌
for (let i = firstNumber; i <= lastNumber; i++) {
  html += `<button class="pageNumber" id="page_${i}">${i}</button>`;
}
