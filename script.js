// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const elBtn = document.querySelector('.btn');
const NewObj = {};
const elName = document.querySelector('#name');
const elTitle = document.querySelector('#title');
const elTextArea = document.querySelector('#story')


elBtn.onclick = function() {
    notice();
    Add();
    render(ul);
    reset();
}

function Add () {
  NewObj.id = "D_kwDOHOApLM4APXTN";
  const date = new Date();
  NewObj.createdAt = date;
  NewObj.title = document.querySelector('#title').value;
  NewObj.author = document.querySelector('#name').value;
  NewObj.answer = null;
  NewObj.bodyHTML = null;
  NewObj.avatarUrl = "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4";
  agoraStatesDiscussions.unshift(NewObj);
  console.log(agoraStatesDiscussions)
}

function reset () {
  elName.value = '';
  elTitle.value = '';
  elTextArea.value = '';
}

function notice () {
  alert("Submit")
}


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj, i) => {  //, i추가
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
  avatarImg.className = "discussion__avatar--image"  // 추가함!!!
  avatarImg.src = agoraStatesDiscussions[i].avatarUrl;  // 0>i로 변경
  avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[i].author;  // 0>i로 변경
  avatarWrapper.append(avatarImg);

  // 여기서 부터 추가
  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title";
  const contentTitleLink = document.createElement('a');
  contentTitleLink.href = agoraStatesDiscussions[i].url;
  contentTitleLink.textContent = agoraStatesDiscussions[i].title;

  const contentInformation = document.createElement('div');
  contentInformation.className = 'discussion__information';
  const contentInfoName = document.createElement('div');
  contentInfoName.textContent = agoraStatesDiscussions[i].author;
  const contentInfoDelimiter = document.createElement('div');
  contentInfoDelimiter.textContent = ' / '
  const contentInfoTime = document.createElement('div');
  const newDate = new Date(agoraStatesDiscussions[i].createdAt);
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

  if(agoraStatesDiscussions[i].answer === null) {
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
  element.innerHTML="";
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i], i));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);



