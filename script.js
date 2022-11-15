// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const newDiscussions = JSON.parse(localStorage.getItem("usedDiscussions"));

function getDiscussion() {
  if (newDiscussions === null) {
    setLoaclStorage(agoraStatesDiscussions);
  }
}
getDiscussion();

 function setLoaclStorage(data) 
 {
    localStorage.setItem("usedDiscussions", JSON.stringify(data)); //store colors
 };

 function submitForm(){
  const userName = document.getElementById("username").value;
  const userTitle = document.getElementById("usertitle").value;
  const story = document.getElementById("story").value;
  const userUrl = document.getElementById("userurl").value;
  const avatarUrl = document.getElementById("avatarurl").value;
 
  const object = 
  {
    id: "D_kwDOHOApLM4APjJi",
    createdAt: Date.now,
    title: userTitle,
    url: userUrl,
    author: userName,
    bodyHTML: story,
    avatarUrl: avatarUrl,
    
  };
 
  newDiscussions.unshift(object);
  setLoaclStorage(newDiscussions);
  render(ul);
 
}

// // convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
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
avatarImg.alt = "avatar of" + obj.author;
avatarImg.className='discussion__avatar--image';
avatarWrapper.append(avatarImg);

const discussionTitle = document.createElement("h2");
const titleAnchor = document.createElement("a");
titleAnchor.href = obj.url;
titleAnchor.textContent = obj.title;
discussionTitle.append(titleAnchor);

const formInputName = document.createElement("input");
formInputName.className = "discussion__container";
formInputName.append()

const discussionInformation = document.createElement("div");
discussionInformation.className = "discussion__information";
discussionInformation.textContent =   `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;
discussionContent.append(discussionTitle, discussionInformation);

const checked = document.createElement("p");
checked.textContent = obj.answer ? '☑️':'☑️';
discussionAnswered.append(checked);

li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < newDiscussions.length; i += 1) {
    element.append(convertToDiscussion(newDiscussions[i]));
  }
  return ;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
// const obj = document.querySelector("")