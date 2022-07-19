// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
//이 함수의 목적: li 뭉치를 새롭게 만든다 (왜 여기서 새로 만드는가...?)
  const avatarWrapper = document.createElement("div"); //아바타, 아이콘
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

//이미지를 넣자 
const avatarImg = document.createElement('img')
avatarImg.src = obj.avatarUrl
avatarImg.alt = "avatar of " + obj.author

avatarWrapper.append(avatarImg)

//제목을 넣자 
const discussionTitle = document.createElement('h2')
const titleAnchor = document.createElement('a')
discussionTitle.append(titleAnchor)

discussionContent.append(titleAnchor)
titleAnchor.textContent = obj.title

//아이디, 작성시간을 넣자 
const discussionInfo = document.createElement('div')
discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
discussionContent.append(discussionInfo)


li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//form 
const form = document.querySelector('form.form')
const title = document.querySelector('div.form__input--title > input')
const name = document.querySelector('div.form__input--name > input')
const textbox = document.querySelector('div.form__textbox--name > textarea')
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // 새로운 객체를 만들어야 한다. 
  // input에 입력된 값(value)를 넣은 새로운 객체다.
  // 새로운 객체를 ul요소 아래로 넣어준다 
  // 더미 데이터 (agoraStatesDiscussions)에도 추가해준다 
  const obj = {
    id: "unique id",
    createdAt: new Date().toLocaleString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: "dubipy",
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend();
})


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); //rendering: 브라우저에 우리가 그린 코드를 실행

