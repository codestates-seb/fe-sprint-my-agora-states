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

  // // 첫번째 div
  const firstDivContent = document.createElement('img');
  firstDivContent.className = "discussion__avatar--image"
  firstDivContent.src=obj.avatarUrl;
  firstDivContent.alt="profilePhoto"
  avatarWrapper.append(firstDivContent)
  // // 두번쨰 div
  const secondH2Content = document.createElement('h2');
  secondH2Content.className = "discussion__title"
  const secondDivContent = document.createElement('div');
  secondDivContent.className = "discussion__information"
  secondH2Content.textContent = obj.title
  secondDivContent.textContent = `${obj.author} / ${obj.createdAt}`
  discussionContent.append(secondH2Content,secondDivContent)
  // 세번째 div
  const thirdDivContentP = document.createElement('p');
  thirdDivContentP.className = "answerBox";
  answerCheckBox(obj.answer)
  discussionAnswered.append(thirdDivContentP)

  function answerCheckBox (value){
    if(value === null){
      thirdDivContentP.append("X")
    }else{
      thirdDivContentP.append("☑")
    }
  }


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
//질문추가
const titleBox = document.querySelector("#title");
const nameBox = document.querySelector("#name");
const questionBox = document.querySelector("#story");
const submitBox = document.querySelector("form");
const today =new Date()

submitBox.onsubmit = function(event){
  event.preventDefault();
  const newObj = {}
  newObj.avatarUrl = "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  newObj.title = titleBox.value;
  newObj.author = nameBox.value;
  newObj.createdAt =today.toLocaleString();
  newObj.answer = null;
  agoraStatesDiscussions.unshift(newObj);
  convertToDiscussion(agoraStatesDiscussions[0]);
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
  nameBox.value=''
  titleBox.value=''
  questionBox.value=''
  return;
}

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












/*
    const titleBox = document.querySelector("#title")
    const titleValue = titleBox.value
    const submitBox = document.querySelector(".event")
    const today = new Date()
    const newObj = {}
    newObj.avatarUrl = "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
    newObj.title = titleValue
    newObj.createdAt = today;
    newObj.answer = null;
*/