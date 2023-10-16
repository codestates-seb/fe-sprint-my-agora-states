const ul = document.querySelector("ul.discussions__container");

let getNewData = JSON.parse(localStorage.getItem("discussions"));
console.log(getNewData);

//기본 배열
console.log(agoraStatesDiscussions.length);
console.log(getNewData.length);

// 폼 추가 함수
const makeNewDiscussion = (event) => {
  event.preventDefault();

  console.log("makeNewQuestion내부텍스트1");
  //폼 작성버튼 누르면 돔을 통해 작성값을 가져온다
  //작성값을 넣는 배열을 만든다
  //agoraStatesDiscussions에 생성된 배열을 추가한다.

  //폼 작성요소 가져옴
  const newName = document.getElementById("name").value;
  const newTitle = document.getElementById("title").value;
  const newContent = document.getElementById("story").value;

  //객체생성, 배열에 추가
  const newObj = {
    id: "new",
    createdAt: "2022-05-16T01:02:17Z",
    title: newTitle,
    avatarUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg",
    author: newName,
    answer: null,
    bodyHTML: `<p>${newContent}</p>`,
  };

  //배열에 추가해서 리턴하기

  agoraStatesDiscussions.unshift(newObj);
  localStorage.setItem("discussions", JSON.stringify(agoraStatesDiscussions));

  const ul = document.querySelector("ul.discussions__container");

  //프리펜드안해도 화면에 그려주는.
  ul.innerHTML = ""; //랜더의 전 내용 지워줌 중복안되게.
  render(ul); //추가한것만 띄워줌?.
};


window.onload = () => {
  getNewData = localStorage.getItem("discussions");
  // console.log(getNewData); //갱신됨
  if (getNewData !== null) {
    agoraStatesDiscussions = JSON.parse(getNewData);
  }
  // 로컬스토리지에 데이턱 ㅏ있다면 아고라디스커션을  로컬스토리지값으로 넣어준다 그 후 랜더를 실행한다.
  render(ul);
};

const formButton = document.getElementById("submit");
formButton.addEventListener("click", makeNewDiscussion);



// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //생성요소들

  //삭제버튼
  const deleteButton = document.createElement("button");
  deleteButton.className = "discussion__content--delete";
  deleteButton.textContent = "삭제";

  //바깥으로 빼도 사용이 가능한지?
  deleteButton.addEventListener("click", function () {
    console.log("hi");
    //배열의 위치 구하고 그 배열의 인덱스 지우기?
    const index = agoraStatesDiscussions.indexOf(obj);
    if (index > -1) {
      agoraStatesDiscussions.splice(index, 1);
      localStorage.setItem(
        "discussions",
        JSON.stringify(agoraStatesDiscussions)
      );
      ul.innerHTML = ""; // 이전 렌더링 내용 삭제
      render(ul); // 화면 다시 그리기
    }
  });
  //코치님 포문을 돌려서 아이디값이 있다면 그려주고? 없다면?

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionTitle = document.createElement("h2");
  const discussionAnchor = document.createElement("a");
  const avatarImg = document.createElement("img"); //함수값 img
  avatarImg.classList.add("discussion__avatar--image");

  const discusstionId = document.createElement("div");
  const discusstionCreatedAt = document.createElement("div");
  const discusstionContentText = document.createElement("div");
  const discussionAuthor = document.createElement("div");
  const discussionAnswer = document.createElement("div");

  //현재배열요소삭제
  //나의 인덱스 정보
  //로컬스토리지 데이터 내부에서?

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  discussionAnchor.textContent = obj.title;
  discussionAnchor.href = obj.url;
  discussionAnchor.target = "_blank";
  avatarImg.src = obj.avatarUrl;

  discusstionCreatedAt.textContent = obj.createdAt;
  discusstionId.textContent = obj.id;
  discussionAuthor.textContent = obj.author;
  // discusstionContentText.innerHTML = obj.answer.bodyHTML; // 이거 켜두면...메인 태그에 바디가 이상해짐

  //타이틀
  discussionTitle.append(discussionAnchor);

  //콘텐트
  discussionContent.append(discussionTitle); // 제목
  // discussionContent.append(discusstionContentText); //내용
  discussionContent.append(discussionAuthor); // 글쓴이
  discussionContent.append(discusstionCreatedAt); //생성시간
  // discussionContent.append(deleteButton);

  //만일 answer 배열이 존재한다면
  if (obj.answer === null) {
    discussionContent.append("답변없음");
  } else {
    discussionContent.append("답변있음");
  }

  //아바타부분
  avatarWrapper.append(avatarImg);

  li.append(avatarWrapper, discussionContent, discussionAnswered, deleteButton);
  return li;
};

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

// render(ul);
