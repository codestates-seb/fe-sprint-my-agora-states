// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);



// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  // 이 함수의 목적 --> li 뭉치를 만든다.
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatarImg = document.createElement("img");
  avatarImg.classList = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avartar of ${obj.author}`;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  discussionTitle.classList = "discussion__title";
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  const discussionInfo = document.createElement("div")
  discussionInfo.classList = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionTitle, discussionInfo);

  const answerCheck = document.createElement("p");
  answerCheck.textContent = obj.answer !== null ? "☑" : "☒";

  discussionAnswered.append(answerCheck);



  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  //element === ul
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); // rendering 

const form = document.querySelector('form.form')
const title = document.querySelector('div.form__input--title > input')
const nameInput = document.querySelector('div.form__input--name > input')
const textBox = document.querySelector('div.form__textbox > textarea')

form.addEventListener("submit", (event) => {
  event.preventDefault();

let today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  let hours = ('0' + today.getHours()).slice(-2); 
  let minutes = ('0' + today.getMinutes()).slice(-2);
  let seconds = ('0' + today.getSeconds()).slice(-2);

  let createdAt = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

//새로운 객체를 만들어야 한다.
//input 에 입력된 값(value)을 넣은 새로운 객체,
//새로운 객체를 ul 요소 아래로 넣어준다.
//더미 데이터(agoraStatesDiscussions)에도 추가해준다.
const obj = {
    id: "unique_id",
    createdAt,
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: nameInput.value,
    answer: null,
    bodyHTML: textBox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
      
};
      agoraStatesDiscussions.unshift(obj);
      const newDiscussion = convertToDiscussion(obj);
      ul.prepend(newDiscussion);
      event.preventDefault();
})
