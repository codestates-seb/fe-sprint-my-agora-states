// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.


const saveDataLocalStorage = (obj) => {
  localStorage.setItem('agoraData', JSON.stringify(obj));
  return;
}

const getDataLocalStorage = (name) => {
  let localData = JSON.parse(localStorage.getItem(name))
  return localData;
}

if (!localStorage.getItem('agoraData')) {
  saveDataLocalStorage(agoraStatesDiscussions)
}

let localData = getDataLocalStorage('agoraData')

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
  //git@github.com:greatjobcat/fe-sprint-my-agora-states.git

  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = obj.author;
  avatarWrapper.append(avatarImg);


  const title = document.createElement('a');
  title.innerText = obj.title;
  title.href = obj.url;
  
  
  const info = obj.author; 
  const time = ' / ' + obj.createdAt;//new Date(obj.createdAt).toLocaleTimeString();
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.append(info, time);
  discussionContent.append(title, discussionInformation);

  //let answer = obj.answer;
  let answer = document.createElement('p');
  answer.textContent = obj.answer ? '✔️' : '❗';
  

  
  discussionAnswered.append(answer);



  //git@github.com:greatjobcat/fe-sprint-my-agora-states.git



  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < localData.length; i += 1) {
    element.append(convertToDiscussion(localData[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");


let form = document.querySelector("form.form")
let inputName = form.querySelector("div.form__input--name > input");
let inputTitle = form.querySelector("div.form__input--title > input");
let inputText = form.querySelector("div.form__textbox > textarea");

form.addEventListener ('submit', (event) => {
  event.preventDefault();
 
  
  const obj = {
    id: "Guest",
    createdAt: new Date().toLocaleTimeString(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: inputName.value,
    answer: null,
    bodyHTML: inputText.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  }


  //form.querySelector("div.form__input--name > input").value = "";
  //form.querySelector("div.form__input--title > input").value = "";
  //form.querySelector("div.form__textbox > textarea").value = "";


  agoraStatesDiscussions.unshift(obj)

  const discussion = convertToDiscussion(obj);
  ul.prepend(discussion);

  saveDataLocalStorage(agoraStatesDiscussions);

  //while (ul.firstChild) {ul.removeChild(ul.firstChild);}


})



render(ul)


