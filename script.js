// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// 로컬저장소에 데이터 저장하고 불러오기
const saveDataLocalStorage = (obj) => {
  localStorage.setItem('agoraData', JSON.stringify(obj));
  return;
}

const getDataLocalStorage = (name) => {
  let localData = JSON.parse(localStorage.getItem(name))
  return localData;
}

// 로컬저장소에 데이터가 없으면 집어넣기
if (!localStorage.getItem('agoraData')) {
  saveDataLocalStorage(agoraStatesDiscussions)
}

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

  // discussion__avatar--wrapper
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // discussion__content

  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  discussionTitle.textContent = `${obj.title}`

  
  discussionContent.append( discussionInfo, discussionTitle);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  let localData = getDataLocalStorage('agoraData');
  for (let i = 0; i < localData.length; i += 1) {
    element.append(convertToDiscussion(localData[i]));
  }
  return;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// submit 구현

const form = document.querySelector("form.form");


form.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputName = document.querySelector("#name");
  const inputTitle = document.querySelector("#title");
  const inputStory = document.querySelector("#story");
  const newObj = {
    createdAt: new Date(),
    title: inputTitle.value,
    author: inputName.value,
    bodyHTML: inputStory.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888"
  }

  agoraStatesDiscussions.unshift(newObj);
  saveDataLocalStorage(agoraStatesDiscussions);
  const discussion = convertToDiscussion(newObj);

  ul.prepend(discussion);

  inputName.value = '';
  inputTitle.value = '';
  inputStory.value = '';
});

