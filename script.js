// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

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

  const profile = document.createElement("img") // 프로필 profile 
  profile.src = obj.avatarUrl;
  profile.alt = "avatar of" + obj.author;
  avatarWrapper.append(profile);
  

  const questionTitle = document.createElement("h2");     // 제목 questionTitle
  questionText = document.createElement("a");          // 질문내용 questionText
  questionText.href = obj.url;
  questionText.textContent = obj.title;
  questionTitle.append(questionText);
  discussionContent.append(questionTitle);
  

  const idTime = document.createElement("div");  // 이름/시간 idTime
  idTime.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}` // 날짜 표현 형식이 여러개가 있는데 이걸 제일 많이  쓴다
  discussionContent.append(questionTitle, idTime);


  const check = document.createElement("p");     // 체크박스 check
  check.textContent = obj.answer ? "☑︎" : "☒";
  discussionAnswered.append(check);

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

const submitButton = document.querySelector(".form");

submitButton.addEventListener("submit", (event) => { 
  
  event.preventDefault();

  const form = document.querySelector("form.form");
  const newAuthor = form.querySelector("div.form__input--name > input");
  const newTitle = form.querySelector("div.form__input--title > input");
  const newTextbox = form.querySelector("div.form__textbox > input");

  const newObj = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: newTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: newAuthor.value,
    bodyHTML: newTextbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  }

  agoraStatesDiscussions.unshift(newObj);

  const discussion = convertToDiscussion(newObj);

  ul.prepend(discussion);
})







