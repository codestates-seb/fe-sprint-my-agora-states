// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// 디스커션 나열 기능
// 데이터 값을 추출해서 새로운 li 뭉치를 만드는 함수
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = createElementWithClass("div", "discussion__avatar--wrapper");
  const discussionContent = createElementWithClass("div", "discussion__content");
  const discussionAnswered = createElementWithClass("div", "discussion__answered");


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 프로필 이미지 데이터 넣어주기
  const avatarImg = createElementWithClass("img", "discussion__avatar--image");
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avator of' + obj.author;
    avatarWrapper.append(avatarImg);

  // 컨텐트 영역 데이터 받아오기
  const discussionTitle = createElementWithClass("h3", "discussion__title");
  const titleAnchor = document.createElement("a");
    titleAnchor.href = obj.url;
    titleAnchor.textContent = obj.title;
    discussionTitle.append(titleAnchor);
    discussionContent.append(discussionTitle);

  const discussionInfo = createElementWithClass("div", "discussion__information");
    discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toISOString()}`; // 작성한 날짜와 시간 가져오기
    discussionContent.append(discussionInfo);

  const checked = document.createElement("p");
    checked.textContent = obj.answer ? "😎" : "🫥";
    discussionAnswered.append(checked);

    
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// element와 class를 매개변수로 받아 해당 하는 데이터를 할당 받은 변수 생성
const createElementWithClass = (tagname, classname) => {
  const result = document.createElement(tagname);
  if (classname) result.className = classname;
  return result;
};

// const propertyMaker = (element, property, content) => {
//   element[property] = content;
//   return element;
// };

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (ul) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);



// 디스커션 추가 기능

// 문서 내용 가져오기
const form = document.querySelector("form.form");
const title = document.querySelector("input#title");
const author = document.querySelector("input#name");
const question = document.querySelector("textarea#question");



// submit을 클릭하면 자료를 가져온다
form.addEventListener("submit", (event) => {
  // 태그의 기본으로 정의된 이벤트를 작동하지 못하게 하는 메서드
  event.preventDefault();

  const newObj = {
    id: "unique value", // 고유 번호(값)
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/",
    author: author.value,
    bodyHTML: question.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4"
  };

  const discussion = convertToDiscussion(newObj);
  agoraStatesDiscussions.unshift(discussion);
  ul.prepend(discussion);

  title.value = "";
  author.value = "";
  question.value = "";
});


