// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const img = document.createElement("img"); // 아바타 이미지 생성
  img.className = "discussion__avatar--image";
  img.setAttribute("src", obj.avatarUrl);
  img.setAttribute("alt", `avatar of ${obj.authoer}`);
  
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const title = document.createElement("h2"); // 제목 태그 생성
  const link = document.createElement("a"); // 링크 태그 생성
  link.setAttribute("href", obj.url);
  title.className="discussion__title";
  link.textContent = obj.title;

  const contentInfo = document.createElement("div"); // 내용 정보 div 생성
  contentInfo.className = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`; // 내용 정보(이름 / 작성 날짜)

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const answer = document.createElement("p"); // p태그 생성
  if (obj.answer !== null) {
    answer.textContent = "💬"; // 답변이 있을 때
  }

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  avatarWrapper.append(img);
  title.append(link);
  discussionContent.append(title);
  discussionContent.append(contentInfo);
  discussionAnswered.append(answer);
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

const writeForm = document.querySelector(".form");
const inputName = document.querySelector("input#name");
const inputTitle = document.querySelector("input#title");
const story = document.querySelector("#story");
writeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formContainer.classList.remove("display-flex");
  formContainer.classList.add("hide");
  const obj = 
    {
      id: "D_kwDOHOApLM4APfXd",
      createdAt: new Date(),
      title: inputTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/29",
      author: inputName.value,
      answer: null,
      bodyHTML: story.textContent,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/102649010?s=64&u=c5e93e6d9e70df10d0a983383e0bca3571c32e33&v=4",
    };
  
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));
  inputTitle.value ="";
  inputName.value="";
  story.value="";
})

const formContainer = document.querySelector(".form__container");
const writeQuestion = document.querySelector(".write-question");
writeQuestion.addEventListener("click", () => {
  formContainer.classList.remove("hide");
  formContainer.classList.add("display-flex");
})

const close = document.querySelector(".close")
close.addEventListener("click", () => {
  formContainer.classList.remove("display-flex");
  formContainer.classList.add("hide");
})