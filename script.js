// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// submit 폼
let newQuestionData = {};
//이름용
let yournameQ = document.querySelector("#username");
let yourname = "";
yournameQ.onkeyup = function () {
  let yourname = yournameQ.value;
  newQuestionData.author = yourname;
};
//제목용
let yourtitleQ = document.querySelector("#usertitle");
let yourtitle = "";
yourtitleQ.onkeyup = function () {
  let yourtitle = yourtitleQ.value;
  newQuestionData.title = yourtitle;
};
//기타 더미

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
  // obj['id'] ['createdAt']

  //avatarWrapper.textContent = obj["id"];
  //discussionContent.textContent = obj["title"];
  //discussionAnswered.textContent = obj["answer?"];

  //프사 만들기
  let profileimg = document.createElement("img");
  profileimg.setAttribute("src", obj.avatarUrl);
  profileimg.classList.add("discussion__avatar--image");
  avatarWrapper.append(profileimg);

  //제목
  const QuestionTitle = document.createElement("h2");
  QuestionTitle.className = "discussion__title";
  discussionContent.append(QuestionTitle);
  const QuestionLink = document.createElement("a");
  QuestionTitle.append(QuestionLink);
  QuestionLink.href = obj.url;
  QuestionLink.textContent = obj.title;

  //이름하고 날짜
  const writername = document.createElement("div");
  discussionContent.append(writername);
  writername.classList.add("discussion__information");
  writername.textContent = `${obj.author} / ${obj.createdAt}`;

  //답변 존재 여부
  const isAnswerd = document.createElement("p");
  discussionAnswered.append(isAnswerd);
  isAnswerd.textContent = obj.answer ? "☑" : "☒";

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

//제출 함수
function forsubmit() {
  newQuestionData.id = "D_kwDOHOApLM4APjJi";
  newQuestionData.url =
    "https://github.com/codestates-seb/agora-states-fe/discussions/45";
  newQuestionData.createdAt = "2022-09-10";
  newQuestionData.answer = null;
  newQuestionData.avatarUrl =
    "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4";
  agoraStatesDiscussions.push(newQuestionData);
  convertToDiscussion(newQuestionData);
}
