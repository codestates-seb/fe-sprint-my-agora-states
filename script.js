// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// localStorage.setItem("data",'');

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = 'avatar of ' + obj.author;

  avatarWrapper.append(avatarImage);
  
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h4");
  discussionTitle.className = "discussion__title";

  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;

  discussionTitle.append(titleLink);
 
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  
  discussionInformation.textContent = obj.author + " / " + new Date(obj.createdAt).toLocaleString();

  discussionContent.append(discussionTitle,discussionInformation);
  
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionAnsweredPtag = document.createElement("p");
  discussionAnsweredPtag.textContent = obj.answer === null ? '☒' : '☑';

  discussionAnswered.append(discussionAnsweredPtag);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

if(localStorage.data === undefined){
  localStorage.data = JSON.stringify(agoraStatesDiscussions);
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const renderData = (element) => {
  for (let i = 0; i < JSON.parse(localStorage.data).length; i += 1) {
    element.append(convertToDiscussion(JSON.parse(localStorage.data)[i]));
  }
  return;
};

const ul = document.querySelector("ul.discussions__container");
renderData(ul);
// if(localStorage.data === undefined){
//   // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
//   render(ul);
// }else{
//   renderData(ul);
// }


const submitBtn = document.getElementById("submitBtn");
submitBtn.addEventListener("click", () => {
  let title = document.querySelector("#title");
  let name = document.querySelector("#name");
  let story = document.querySelector("#story");

  if(title.value.length === 0 || name.value.length === 0 || story.value.length === 0){
    return;
  }

  const obj = {
    id: "D_kwDOHOApLM4APjJi",
    createdAt: new Date(),
    title: document.querySelector("#title").value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: document.querySelector("#name").value,
    answer: null,
    bodyHTML: document.querySelector("#story").value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));

  title.value = '';
  name.value = '';
  story.value = '';

  if(localStorage.data === undefined){
    localStorage.setItem('data', JSON.stringify(agoraStatesDiscussions));
  }else{
    let tempArr = JSON.parse(localStorage.data);
    tempArr.unshift(obj);
    localStorage.setItem('data', JSON.stringify(tempArr));
  }
})



