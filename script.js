// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

let agoraStatesDiscussions = []; // 데이터를 담을 곳
// console.log(agoraStatesDiscussions);
fetch("http://localhost:4000/discussions/")
  .then((response) => response.json())
  .then((json) => {
    agoraStatesDiscussions = json;
    // console.log(agoraStatesDiscussions);
    const ul = document.querySelector("ul.commentContainer");
    console.log(ul);
    render(ul);
  });

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "commentContainer"; // 클래스 이름 지정

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  const avatarImg = document.createElement("img");
  avatarImg.src = `img/Faces-${Math.floor(Math.random() * (15 - 0) + 1)}.png`;
  avatarImg.alt = obj.author;
  avatarImg.className = "avatarImg";

  avatar.append(avatarImg);

  const comment = document.createElement("div");
  comment.className = "comment";
  const commentTitle = document.createElement("h2");
  commentTitle.className = "commentTitle";
  const commentLink = document.createElement("a");
  commentLink.href = obj.url;
  commentLink.target = "_black";
  commentLink.textContent = obj.title;

  const commentInfo = document.createElement("div");
  commentInfo.className = "commentInformation";
  commentInfo.textContent = `${obj.author} / ${obj.createdAt}`;

  comment.append(commentTitle);
  commentTitle.append(commentLink);
  comment.append(commentInfo);

  const answeredAllBox = document.createElement("div");
  const answeredBox = document.createElement("div");
  const checkBox = document.createElement("img");
  answeredAllBox.className = "answeredAllBox";
  answeredBox.className = "commentAnswered";
  checkBox.src = "img/check-02.png";
  answeredAllBox.append(answeredBox);
  answeredBox.append(checkBox);

  const answeredMark = "☑";
  const unansweredMark = "img/uncheck-02.png";

  if (obj.answer === null) {
    checkBox.src = unansweredMark;
  } else {
    checkBox.textContent = answeredMark;
    const answerLinkBox = document.createElement("button");
    const answerLink = document.createElement("a");
    answerLinkBox.className = "answerBtn";
    answerLink.href = obj.answer.url;
    answerLink.textContent = "답변 보기";
    answeredAllBox.append(answerLinkBox);
    answerLinkBox.append(answerLink);
  }

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const answerBtn = document.createElement("button");
  answerBtn.className = "discussion__answer__button";
  answerBtn.textContent = "답변 보기";
  li.append(avatar, comment, answeredAllBox);
  return li;
};

const page = () => {
  const rowsPerPage = 10; // 한 페이지에 게시글 10개
  const rows = [...agoraStatesDiscussions]; //배열 복사
  const rowsCount = agoraStatesDiscussions.length; //배열의 갯수
  const pageCount = Math.ceil(rowsCount / rowsPerPage); //배열의 갯수를 보여줄 게시글 수로 나눔
  const numbers = document.querySelector(".page"); //oi을 지칭함

  // 페이지네이션 생성
  // 아래 li를 페이지 개수만큼 생성 -> pagecount
  // 대상.innerHtml = <li><a href =''>1</a></li>

  for (let i = 1; i <= pageCount; i++) {
    numbers.innerHTML += `<li class = li__page ><a href = '' class = page ${i}>${i}</a></li>`; // a 태그 안에 페이징 정보 담김
  }
  const numberBtn = numbers.querySelectorAll("a"); // a 태그 요소만 저장
  numberBtn.forEach((item, index) => {
    //numbers의 모든 아이템과 인덱스를 받아서
    item.addEventListener("click", (el) => {
      // item이 클릭될 때마다 이벤트를 실행시킴
      el.preventDefault(); // .preventDefault()메소드는 a 요소의 기본 기능을 없앤다.
      for (nb of numberBtn) {
        // 클릭된 페이지만 active를 위해
        nb.classList.remove("active"); // 모든 페이지를 비활성화하고
      }
      el.target.classList.add("active"); // el.target은 function의 this와 같은 역할 // 클릭한 요소에 active 클래스를 추가함

      // 테이블 출력함수 만들기
      displayRow(index);
    });
  }); // numberBtn

  function displayRow(index) {
    let start = index * rowsPerPage; // 1이라면 discussions data 10 인덱스부터 출력
    let end = start + rowsPerPage; // start에서 10개 더 보여주기 위함

    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }

    for (i = start; i < end; i++) {
      ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
  }
};
// 페이지당 data의 length를 10으로 끊어 보여줘야한다.

// button의 갯수는 data.length/10으로 나눈 값을 올림한만큼
// 시이작~

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.commentContainer");
render(ul);

function Inputinform(name, title, content) {
  this.id = name;
  this.author = name;
  this.answer = "";
  this.createdAt = new Date().toLocaleString();
  this.title = title;
  this.avatarUrl = "https://avatars.githubusercontent.com/u/50021232?v=4";
}

const submitBtn = document.querySelector(".form");

submitBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameTxt = document.querySelector("#name");
  const titleTxt = document.querySelector("#title");
  const contentTxt = document.querySelector("#content");

  const newObj = new Inputinform(
    nameTxt.value,
    titleTxt.value,
    contentTxt.value
  );
  agoraStatesDiscussions.unshift(newObj);

  const community = convertToDiscussion(agoraStatesDiscussions[0], 0);
  ul.prepend(community);

  nameTxt.value = titleTxt.value = contentTxt.value = "";
});
