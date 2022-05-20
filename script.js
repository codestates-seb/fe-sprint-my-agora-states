
let newValue ={ createdAt: "2022-05-15T23:57:43Z" };
let newName, newTitle, newStory ;

// 질문을 작성
function printName() {
 newName = document.getElementById("name").value;
 newValue.author = `${newName}`;

}

function printTitle() {
  newTitle = document.getElementById("title").value;
  newValue.title = `${newTitle}`;

}

function printStory() {
  newStory = document.getElementById("story").value;
  newValue.bodyHTML = `${newStory}`;
  console.log(newValue);
}
const a = document.getElementById("submitButton")
console.log(a)


// submit 버튼이 눌리면

// agoraStatesDiscussions에 추가


// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
function convertToDiscussion(obj) {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 이미지
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 글자
  const avatarTitle = document.createElement("h2");
  avatarTitle.className = "discussion__title";
  discussionContent.append(avatarTitle);
  const aTag = document.createElement("a");
  avatarTitle.append(aTag);
  aTag.setAttribute('href', obj.url);
  aTag.textContent = obj.title;


  const avatarInformation = document.createElement("div");
  avatarInformation.className = "discussion__information";
  avatarInformation.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(avatarInformation);

  //쳌박스
  const pTag = document.createElement("p");
  pTag.textContent = "☑";
  discussionAnswered.append(pTag);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
}

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

