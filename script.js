// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
var pageNumber = 1;
const PAGE_SIZE = 10;
const LOCAL_STORAGE_KEY = 'agoraDB';

const loadLocalStorageDate = ( ) => {
  const data = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  return JSON.parse(data);
}

const saveLocalStorageDate = (data) => {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

const getPagedDiscussions = (pageNumber) => {
  const pageSize = PAGE_SIZE;
  const startIndex = pageSize * (pageNumber - 1);
  const endIndex = startIndex + (pageSize - 1);
  return loadLocalStorageDate().slice(startIndex, endIndex + 1);
}

const createNavi = (ul) => {
  const naviSize = Math.ceil(loadLocalStorageDate().length / PAGE_SIZE);
  const discussionFooter = document.querySelector('#pagination-container');

  const naviPrev = document.createElement('a');
  naviPrev.textContent = '<';
  naviPrev.className = 'pagenation_btn';
  naviPrev.href = '#';
  naviPrev.addEventListener('click', () => {
   window.pageNumber = window.pageNumber - 1;
   if(window.pageNumber < 1) window.pageNumber = 1;
   render(ul); 
  })
  discussionFooter.appendChild(naviPrev);

  for(let i = 0; i < naviSize; i++) {
    const navi = document.createElement('a');
    navi.textContent = i + 1;
    navi.id = i + 1;
    navi.className = 'pagenation_btn';
    navi.addEventListener('click', () => {
      window.pageNumber = navi.id;
      render(ul);
    })
    discussionFooter.appendChild(navi);
  }

  const naviEnd = document.createElement('a');
  naviEnd.textContent = '>'
  naviEnd.className = 'pagenation_btn';
  naviEnd.href = '#';
  naviEnd.addEventListener('click', () => {
   window.pageNumber = window.pageNumber + 1;
   if(window.pageNumber > naviSize) window.pageNumber = naviSize;
   render(ul); 
  })
  discussionFooter.appendChild(naviEnd);
}


const hederButton = document.querySelector("#writeBtn");
const inputFormBox = document.querySelector('.form__container');
const writeIcon = document.querySelector('#write');
const closeIcon = document.querySelector('#close');
let inputViewBox = false;

hederButton.addEventListener('click', () => {

  if(!inputViewBox) {
    inputFormBox.style.display = 'block';
    writeIcon.style.display = 'none';
    closeIcon.style.display = 'block';

    return inputViewBox = true;

  }
  if(inputViewBox) {
  inputFormBox.style.display = 'none';
  writeIcon.style.display = 'block';
  closeIcon.style.display = 'none';
  return inputViewBox = false;
  }
})

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

  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image';
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`;
  avatarImage.style.width = '50px';
  avatarWrapper.appendChild(avatarImage);

  const discussionTitle = document.createElement('h2');
  const discussionLink = document.createElement('a');
  discussionTitle.className = 'discussion__title';
  discussionLink.href = obj.url;
  discussionLink.textContent = obj.title;
  discussionTitle.appendChild(discussionLink);
  discussionContent.appendChild(discussionTitle);


  const discussionCommand = document.createElement('div');
  discussionCommand.className = 'discussion__answered';
  const discussionCommandBox = document.createElement('p');
  const discussionChecker = obj.answer;
  if(String(discussionChecker) === 'null') {
    discussionCommandBox.textContent = `☐`;
    discussionCommand.appendChild(discussionCommandBox);
    discussionAnswered.appendChild(discussionCommand);
    discussionCommand.style.fontSize = '12px';
  }
  else {
    discussionCommandBox.textContent = `☑`;
    discussionCommand.appendChild(discussionCommandBox);
    discussionAnswered.appendChild(discussionCommand);
    const commandBtn = document.createElement('button');
    commandBtn.className = 'answered__active';
    commandBtn.onclick = '';
    commandBtn.type = 'button';
    commandBtn.textContent = '답변';
    discussionAnswered.appendChild(commandBtn);
  }

  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.appendChild(discussionInformation);
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {

  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }

  const pagedDiscussions = getPagedDiscussions(pageNumber);

  for (let i = 0; i < pagedDiscussions.length; i += 1) {
    element.append(convertToDiscussion(pagedDiscussions[i]));
  }
  return;
};

const getKSTNow = () => {
  const now = new Date();
  return now.toLocaleString('ko-KR');
}

if(!loadLocalStorageDate()) {
  saveLocalStorageDate(agoraStatesDiscussions);
}

document.getElementById('agora-form').onsubmit = () => {
  const name = document.getElementById('input-name').value;
  const title = document.getElementById('input-title').value;
  const story = document.getElementById('textarea-story').value;
  const now = getKSTNow();

  const currList = loadLocalStorageDate();
  currList.unshift({
    id: "D_kwDOHOApLM4APfjB",
    createdAt: now,
    title: title,
    url: story,
    author: name,
    answer: null,
    bodyHTML:null,
    avatarUrl:
      getAbata(),
  });
  saveLocalStorageDate(currList);
}

const getAbata = () => {
  return './image/abata2.png'
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
createNavi(ul);
render(ul);


