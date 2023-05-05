// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
for (let i = 0; i < window.localStorage.length; i++) {
  agoraStatesDiscussions.unshift(
    JSON.parse(window.localStorage.getItem(`${i}`))
  );
}

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
  //avatarWrapper - img 추가
  const avatearImg = document.createElement("img");
  avatearImg.className = "discussion__avatar--image";
  avatearImg.src = obj.avatarUrl;
  avatearImg.alt = `avatar of ${obj.author}`;
  avatarWrapper.appendChild(avatearImg);

  //discussionContent - h3 > author
  const discuccionAuthor = document.createElement("h3");
  discuccionAuthor.className = "discussio__athor";
  discuccionAuthor.textContent = obj.author;
  discussionContent.appendChild(discuccionAuthor);

  //discussionContent - h4 > a (title) 추가
  const discussionTitle = document.createElement("h4");
  discussionTitle.className = "discussion__title";
  const titleA = document.createElement("a");
  titleA.href = obj.url;
  titleA.textContent = obj.title;
  discussionTitle.appendChild(titleA);

  discussionContent.appendChild(discussionTitle);

  //discussionContent - div(discuccion information) 추가
  const discuccionInformation = document.createElement("div");
  discuccionInformation.className = "discussion__information";

  const discuccionTime = document.createElement("p");
  discuccionTime.textContent = `${obj.createdAt}`;
  discuccionInformation.appendChild(discuccionTime);
  discussionContent.appendChild(discuccionInformation);

  //discussionAnswered - p 추가
  const discussionAnsweredP = document.createElement("p");
  if (obj.answer !== null) {
    discussionAnsweredP.textContent = "✅";
    discussionAnswered.appendChild(discussionAnsweredP);
  } else {
    discussionAnsweredP.textContent = "❎";
    discussionAnswered.appendChild(discussionAnsweredP);
  }
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  //렌더할 때마다 로컬에 아이템도 같이 배열에 추가하기
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    // console.log(agoraStatesDiscussions[i]);
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//discusion추가 기능
const formQuestionSubmitDiv = document.querySelector(".form");

//submit handler -> 질문 제출시 로컬에 저장하고 화면에 출력
function handleSubmit(event) {
  //submit때문에 페이지가 다시 렌더링 되는 것은 방지
  // event.preventDefault();

  const name = document.querySelector("#name");
  const title = document.querySelector("#title");
  const question = document.querySelector("#story");
  console.log(
    `질문자: ${name.value} / 제목: ${title.value} / 질문 내용: ${question.value}`
  );

  //현재시간
  let today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2);
  let day = ("0" + today.getDate()).slice(-2);

  let dateString = year + "-" + month + "-" + day;

  let hours = ("0" + today.getHours()).slice(-2);
  let minutes = ("0" + today.getMinutes()).slice(-2);
  let seconds = ("0" + today.getSeconds()).slice(-2);

  let timeString = hours + ":" + minutes + ":" + seconds;
  const newQuestion = {
    author: `${name.value}`,
    avatarUrl: "./person.png",
    title: `${title.value}`,
    bodyHTML: `${question.value}`,
    createdAt: `${dateString} ${timeString}`,
    answer: null,
  };

  const objString = JSON.stringify(newQuestion);

  window.localStorage.setItem(`${window.localStorage.length}`, objString);

  console.log(newQuestion.createdAt);
  // 배열에 등록
  // agoraStatesDiscussions.unshift(newQuestion);

  //ul을 다시 렌더...함..
  ul.insertBefore(newQuestion);

  //리셋!
  name.value = "";
  title.value = "";
  question.value = "";
}

formQuestionSubmitDiv.addEventListener("submit", handleSubmit);
