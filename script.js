// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // 프로필이미지
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div"); // 질문내용
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div"); // 체크박스
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 아바타 프로필 사진이 들어갈 <img> 요소도 추가하겠습니다. 
  // src, alt 속성을 agoraStatesDiscussions의 첫 번째 요소에 있는 데이터로 넣어줍니다.
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;

  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = 'discussion__title';
  const titleLink = document.createElement("a");
  titleLink.textContent = obj.title;
  titleLink.href = obj.url;
  discussionTitle.append(titleLink);

  const discussionInfo = document.createElement("div");
  discussionInfo.textContent = `${obj.author} / ${new Date().toLocaleString()}`
  discussionInfo.className = "discussion__information";

  discussionContent.append(discussionTitle, discussionInfo);

  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑︎" : "☒";
  if (!obj.answer) {
    checked.style.color = "red"
  } else {
    checked.style.color = "green"
  }
  discussionAnswered.append(checked);

  // DOM append 메서드를 이용하여, 위에서 생성한 <div>요소들을 li.discussion__container의 자식 요소로 추가할 수 있습니다.
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

// 저장
let newDiscussion = [];

const storageItems = JSON.parse(localStorage.getItem('agoraDiscussions'));
console.log(storageItems)

  function getLocalStorage() {
    if(storageItems) {  
      storageItems.forEach((e) => {
        // console.log(e);
        newDiscussion.push(e);
        ul.prepend(convertToDiscussion(e));
      })
    }
  }
  getLocalStorage();


// 디스커션 추가
const form = document.querySelector(".form");
const inputTitle = document.querySelector("#title");
const inputName = document.querySelector("#name");
const inputContent = document.querySelector("#story");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newContent = {};
  newContent.title = inputTitle.value;
  newContent.author = inputName.value;
  newContent.bodyHTML = inputContent.value;
  newContent.createdAt = new Date().toLocaleString();
  newContent.avatarUrl = "https://item.kakaocdn.net/do/34626f9c91ec39542767f4f798c29b908f324a0b9c48f77dbce3a43bd11ce785";
  ul.prepend(convertToDiscussion(newContent));
  // console.log(ul);
  
  newDiscussion.push(newContent);
  localStorage.setItem("agoraDiscussions",JSON.stringify(newDiscussion));
  
  inputName.value = '';
  inputTitle.value = '';
  inputContent.value = '';
  
});

