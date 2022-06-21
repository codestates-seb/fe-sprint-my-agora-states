// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

const elBtn = document.querySelector('.btn')
const elName = document.querySelector('#name');
const elTitle = document.querySelector('#title');
const elTextArea = document.querySelector('#story')

let LocalData = [];

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:3001/discussions/", requestOptions)
  .then(response => response.text())
  .then(response => {localStorage.setItem('serverData',response)})
  .catch(error => console.log('error', error))
  .then(() => {

const agoraParse = JSON.parse(
  localStorage.getItem('serverData')
 );

if (agoraParse) {
  LocalData = agoraParse;
}
else {
  const agoraJSON = JSON.stringify(agoraParse);
  LocalData = agoraJSON;
  localStorage.setItem('serverData', agoraJSON)
}

elBtn.onclick = function(event) {
  event.preventDefault();
  const date = new Date();
  LocalData.unshift({
    id: "D_kwDOHOApLM4APXTN",
    createdAt: date,
    title: elTitle.value,
    author: elName.value,
    answer: null,
    bodyHTML: null,
    avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
    });
  ul.prepend(
      convertToDiscussion({
        id: "D_kwDOHOApLM4APXTN",
        createdAt: date,
        title: elTitle.value,
        author: elName.value,
        answer: null,
        bodyHTML: null,
        avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
        })
  );
  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(LocalData));

  elName.value = '';
  elTitle.value = '';
  elTextArea.value = '';
}


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
function convertToDiscussion (obj) {  //, i추가
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
  avatarImg.className = "discussion__avatar--image" 
  avatarImg.src = obj.avatarUrl; 
  avatarImg.alt = 'avatar of ' + obj.author; 
  avatarWrapper.append(avatarImg);

  // 여기서 부터 추가
  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title";
  const contentTitleLink = document.createElement('a');
  contentTitleLink.href = obj.url;
  contentTitleLink.textContent = obj.title;

  const contentInformation = document.createElement('div');
  contentInformation.className = 'discussion__information';
  const contentInfoName = document.createElement('div');
  contentInfoName.textContent = obj.author;
  const contentInfoDelimiter = document.createElement('div');
  contentInfoDelimiter.textContent = ' / '
  const contentInfoTime = document.createElement('div');
  const newDate = new Date(obj.createdAt);
  contentInfoTime.textContent = newDate.toLocaleString();

  discussionAnswered.className = "discussion__answered";
  const AnsweredOk = document.createElement('p');
  AnsweredOk.textContent = '☑';
  const AnsweredNotOk = document.createElement('p');
  AnsweredNotOk.textContent = '☒';
  
  

  discussionContent.append(contentTitle);
  contentTitle.append(contentTitleLink);
  
  discussionContent.append(contentInformation);
  contentInformation.append(contentInfoName);
  contentInformation.append(contentInfoDelimiter);
  contentInformation.append(contentInfoTime);

  discussionContent.append(discussionAnswered);

  if(obj.answer === null) {
    discussionAnswered.append(AnsweredNotOk);
  }
  else {
    discussionAnswered.append(AnsweredOk);
  }

  // 여기까지 추가내용

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < LocalData.length; i += 1) {
    element.append(convertToDiscussion(LocalData[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

})