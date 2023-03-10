const userSubmit = document.querySelector("form.form");
const questionButton = document.querySelector(".question_button");
const buttons = document.querySelector(".buttons");

const numOfContent = agoraStatesDiscussions.length;
const showContent = 10;
const showButton = 5;

// console.log(agoraStatesDiscussions);

//submit 버튼이 눌리는지를 알고싶다.

function newPage() {
  window.location.href = "https://urclass.codestates.com/";
}

userSubmit.addEventListener("submit", function (event) {
  event.preventDefault();
  const nameInput = document.querySelector("#name");
  const titleInput = document.querySelector("#title");
  const storyInput = document.querySelector("#story");
  const obj = {
    id: "#",
    createdAt: date(),
    title: titleInput.value,
    url: "#",
    author: nameInput.value,
    answer: null,
    bodyHTML: storyInput.value,
    avatarUrl: "./1.jpg",
  };
  ul.prepend(convertToDiscussion(obj));
  nameInput.value = "";
  titleInput.value = "";
  storyInput.value = "";
});
let cnt = 0; //버튼 눌린 횟수
questionButton.addEventListener("click", function () {
  cnt += 1;
  if (cnt % 2 === 1) {
    userSubmit.classList.remove("hide");
    questionButton.textContent = "질문 안할래요!";
  } else {
    userSubmit.classList.add("hide");
    questionButton.textContent = "질문할래요!";
  }
});

const date = () => {
  //padStart : 2보다 작으면 빈칸 앞에부터 0으로 채워서 출력
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};

const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //내가 하고싶은것 submit 버튼을 누르면 data.js에 있는 배열에 값들을 추가해줘야 된다.
  //배열에 추가되어야 하는값들 title, date, name, answer는 없을테니 x 그리고 이미지 ㅇㅋ 레쓰고우

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  const titleName = document.createElement("h2");
  titleName.className = "discussion__title";
  const titleUrl = document.createElement("a");
  titleUrl.href = obj.url;
  titleUrl.textContent = obj.title;
  titleName.append(titleUrl);
  discussionContent.append(titleName);

  const information = document.createElement("div");
  information.className = "discussion__information";
  let informationArr = [];
  informationArr.push(obj.author);
  informationArr.push(obj.createdAt);
  information.textContent = informationArr.join(" / ");
  discussionContent.append(information);

  const checkbox = document.createElement("p");

  if (obj.answer !== null) {
    checkbox.textContent = "☑";
  } else {
    checkbox.textContent = "x";
  }
  discussionAnswered.append(checkbox);

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

const makeButton = (id) => {
  const button = document.createElement("button");
  button.classList.add("button");
  button.dataset.num = id;
  button.innerText = id;
  button.addEventListener("click", (e) => {
    Array.prototype.forEach.call(buttons.children, (button) => {
      if (button.dataset.num) button.classList.remove("active");
    });
    e.target.classList.add("active");
    renderContent(parseInt(e.target.dataset.num));
  });
  return button;
};

// 페이지네이션 버튼 그룹 생성 함수
const makeButtonGroup = (start, end) => {
  const group = document.createElement("div");
  group.classList.add("button-group");
  for (let i = start; i <= end; i++) {
    group.append(makeButton(i));
  }
  return group;
};

// 화면에 보여줄 데이터를 계산하는 함수
const getDisplayData = (page) => {
  const start = (page - 1) * showContent;
  const end = start + showContent;
  return agoraStatesDiscussions.slice(start, end);
};

// 화면에 데이터를 렌더링하는 함수
const renderContent = (page) => {
  const displayData = getDisplayData(page);
  ul.innerHTML = "";
  for (let i = 0; i < displayData.length; i += 1) {
    ul.append(convertToDiscussion(displayData[i]));
  }
};

// 페이지네이션 버튼 그룹 생성
const buttonGroup = makeButtonGroup(1, Math.ceil(numOfContent / showContent));
buttons.append(buttonGroup);

// 초기 페이지 설정
renderContent(1);
