
function convertToDiscussion(obj) {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 이미지
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 글자
  const avatarTitle = document.createElement("h2");
  avatarTitle.className = "discussion__title";
  discussionContent.append(avatarTitle);
  const aTag = document.createElement("a");
  avatarTitle.append(aTag);
  aTag.setAttribute('href', obj.url);
  aTag.textContent = obj.title;


  const avatarInformation = document.createElement("div");
  avatarInformation.className = "discussion__information";
  avatarInformation.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(avatarInformation);

  //쳌박스 췍췍
  const pTag = document.createElement("p");
  pTag.textContent = "☑";
  discussionAnswered.append(pTag);

  // const inputName = document.querySelector("#name")
  // const inputtitle = document.querySelector("#title")
  // const inputstory = document.querySelector("#story")
  // const newObj = {
  //   id: "D_kwDOHOApLM4APjIj",
  //   createdAt: "2022-05-15T23:57:43Z",
  //   title: undefined,
  //   url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
  //   author: undefined,
  //   answer: null,
  //   bodyHTML: undefined,
  //   avatarUrl:
  //     "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
  // }


// function runSubmitButton (){
// newObj.title = inputtitle.value;
// newObj.author = inputName.value;
// newObj.bodyHTML = inputstory.value;

//   agoraStatesDiscussions.unshift(newObj);
//   let li = convertToDiscussion(newObj);
//   ul.prepend(li)
//   console.log(newObj)
//   inputtitle.value = '';
//   inputName.value = '';
//   inputstory.value = '';
// }

const a = document.querySelector("#submitButton")
a.addEventListener('click',runSubmitButton );

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
}

const inputName = document.querySelector("#name")
const inputtitle = document.querySelector("#title")
const inputstory = document.querySelector("#story")
const newObj = {
  id: "D_kwDOHOApLM4APjIj",
  createdAt: "2022-05-15T23:57:43Z",
  title: undefined,
  url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
  author: undefined,
  answer: null,
  bodyHTML: undefined,
  avatarUrl:
    "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
}


function runSubmitButton (){
  newObj.title = inputtitle.value;
  newObj.author = inputName.value;
  newObj.bodyHTML = inputstory.value;
  
    agoraStatesDiscussions.unshift(newObj);
    let li = convertToDiscussion(newObj);
    ul.prepend(li)
    console.log(newObj)
    inputtitle.value = '';
    inputName.value = '';
    inputstory.value = '';
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

