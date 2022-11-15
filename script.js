

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.avatarUrl;
  avatarWrapper.appendChild(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.appendChild(discussionTitle);

  const discussionTitleUrl = document.createElement("a");
  discussionTitleUrl.href = obj.url;
  discussionTitleUrl.textContent = obj.title;
  discussionTitle.appendChild(discussionTitleUrl);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toDateString()}`;
  discussionContent.appendChild(discussionInformation);

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const checked = document.createElement("p");
  checked.className = "checked";
  checked.textContent = "✅";
  
  const crossed = document.createElement("p");
  crossed.className = "crossed";
  crossed.textContent = "❎";

  if(obj.answer === null) {
    checked.classList.add("hide");
    crossed.classList.remove("hide");
  } else {
    crossed.classList.add("hide");
    checked.classList.remove("hide");
  }

  discussionAnswered.appendChild(checked);
  discussionAnswered.appendChild(crossed);
  

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};



const content = document.querySelector(".discussion__container");
const buttons = document.querySelector(".buttons");

const numOfContent = agoraStatesDiscussions.length;
const showContent = 10;
const showButton = 5;
const maxPage = Math.ceil(numOfContent/showContent);



// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < numOfContent; i++) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};


const inputname = document.querySelector("#name");
const inputtitle = document.querySelector("#title");
const inputstory = document.querySelector("#story");
const form = document.querySelector(".form");

function handleSubmit (event) {
  event.preventDefault();
  const newObj = {
    id: Math.random().toString(36).substring(2, 11), 
    createdAt: new Date(),
    title: inputtitle.value,
    url: "https://youtu.be/uuodbSVO3z0",
    author: inputname.value,
    answer: null,
    bodyHTML: inputstory.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  ul.prepend(convertToDiscussion(newObj));

  
  inputname.value = '';
  inputtitle.value = '';
  inputstory.value = '';
}

form.addEventListener("submit", handleSubmit);



// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);





