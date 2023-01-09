// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

const inputForm = document.querySelector(".form");

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const story = document.getElementById('story').value;
  let today = new Date();
  let inputAgoraDatas = [];
  const inputAgoraData = {
    avatarUrl: "https://images.unsplash.com/photo-1639628735078-ed2f038a193e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    title: title,
    url: "",
    author: name,
    createdAt: today.toLocaleTimeString(),
    answer: null
  }

  // localStorage
  if (window.localStorage.length > 0) {
    const getInputAgoraDatas = window.localStorage.getItem('inputAgoraDatas');
    const inputAgoraDatasArr = JSON.parse(getInputAgoraDatas);
    for(let i = 0; i < inputAgoraDatasArr.length; i++) {
      inputAgoraDatas.push(inputAgoraDatasArr[i]);
    }
    inputAgoraDatas.push(inputAgoraData);
    const inputAgoraDataString = JSON.stringify(inputAgoraDatas);
    window.localStorage.setItem('inputAgoraDatas',inputAgoraDataString);
  } else {
    inputAgoraDatas.push(inputAgoraData);
    const inputAgoraDataString = JSON.stringify(inputAgoraDatas);
    window.localStorage.setItem('inputAgoraDatas',inputAgoraDataString);
  }
  

  agoraStatesDiscussions.unshift(inputAgoraData);
  inputForm.reset();

  const render = (element) => {
    for (let i = 0; i < 1; i += 1) {
      element.prepend(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    return;
  };
  
  render(ul);
});


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
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`;

  avatarWrapper.append(avatarImage);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title"
  const discussionTitleATag = document.createElement("a");
  discussionTitleATag.href = obj.url;
  discussionTitleATag.textContent = obj.title;
  discussionTitle.append(discussionTitleATag);
  const discussionInformation = document.createElement("div");
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;

  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInformation);

  const discussionAnsweredPTag = document.createElement("p");
  discussionAnsweredPTag.textContent = obj.answer ? '💡' : '⏳';
  discussionAnswered.append(discussionAnsweredPTag);


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

// localStorage에 저장된 데이터 렌더링
const renderLocalStorage = (element) => {
  const agoraDatas = window.localStorage.getItem('inputAgoraDatas');
  const agoraDataObj = JSON.parse(agoraDatas);

  if (agoraDataObj) {
    for (let i = 0; i < agoraDataObj.length; i++) {
      element.prepend(convertToDiscussion(agoraDataObj[i]));
    }
  }
  return;
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
//window.localStorage.clear();
renderLocalStorage(ul);
