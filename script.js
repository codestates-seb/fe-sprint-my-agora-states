
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
let agoraStatesDiscussions;

// 각각의 요소가 차례대로 들어온다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 이 함수의 목적 -> li 뭉치를 만든다. 

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

// TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

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

  //체크박스
  const pTag = document.createElement("p");
  pTag.textContent = "☑";
  discussionAnswered.append(pTag);

const a = document.querySelector("#submitButton")
a.addEventListener('click',runSubmitButton );

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
}

const inputName = document.querySelector("#name")
const inputtitle = document.querySelector("#title")
const inputstory = document.querySelector("#story")
const newObj = {
  id: null,
  createdAt: new Date().toLocaleString(),
  title: inputtitle,
  url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
  author: inputName,
  answer: null,
  bodyHTML: inputstory,
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
// 브라우저에 해당 코드를 그리는 것을 랜더링
// 반복문을 통해 랜더링을 해줄 것이다.
// i번째 요소를 반복적으로 넣어준다
const render = (element) => {
// 그리고 element에는 ul이 들어온다.
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// 맨 밑에는 랜더 함수를 호출 함으로써 끝남
// ul은 바로 위헤서 선언
// 랜더 함수에 돌려서 브라우저에 그린다
// ul은 섹션안에 있다
// 랜더가 나오면 끝난다.
// const ul = document.querySelector("ul.discussions__container");
// render(ul); // 랜더함수 호출!!

fetch('http://localhost:4000/discussions')
.then(res => res.json())
.then(json => {
  agoraStatesDiscussions = json;
  const ul = document.querySelector('ul.discussions__container');
  render(ul);
})
