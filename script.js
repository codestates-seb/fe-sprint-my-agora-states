// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const AnsMark = "☑︎";
const UnAnsMark = "☒";
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

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const titleA = document.createElement('a');
  titleA.href = obj.url;
  titleA.textContent = obj.title;
  discussionTitle.append(titleA);

  const discussionInfo = document.createElement('div');
  discussionInfo.className = "discussion__information";

  const createQuestionDate = new Date(obj.createdAt).toLocaleString(); // 검색해서 정리하기 

  discussionInfo.textContent = `${obj.author} / ${createQuestionDate}`;
  discussionContent.append(discussionTitle,discussionInfo);

  const discussionAns = document.createElement('div');
  discussionAns.className = "discussion__answered";

  const discussionIcon = document.createElement('p');

  if(obj.answer === null) { // 여기 부분 이해 안감 왜 obj.answer === null 이걸 쓰는지 
    discussionIcon.textContent = UnAnsMark;
  }
  else {
    discussionIcon.textContent = AnsMark;
  }
  discussionAns.append(discussionIcon);
  discussionAnswered.append(discussionAns);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector(".form");
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const formTextbox = document.querySelector('#story');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const obj = {
    id: "D_kwDOHOApLM4APjJi",
    createdAt: new Date().toISOString(), // toLocaleString 으로 하면 Invalid Date 라고 뜸 
    title: inputTitle.value,
    url: null,
    author: inputName.value,
    answer: null,
    bodyHTML: formTextbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
  }
  agoraStatesDiscussions.unshift(obj);
  const newdiscussion = convertToDiscussion(obj)
  ul.prepend(newdiscussion);
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
render(ul);
