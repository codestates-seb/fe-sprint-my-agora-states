if (localStorage.length === 0) {
  /* 로컬스토리지에 데이터 저장 */
  localStorage.setItem('discussions', JSON.stringify(agoraStatesDiscussions)); 
};
/* 로컬스토리지에서 데이터 불러오기 */
let getStorageData = JSON.parse(localStorage.getItem('discussions')); 

const discussionWrapper = document.querySelector('.discussion__wrapper');
const ul = document.querySelector("ul.discussions__container");
const showContent = 10; 
let maxPage = Math.ceil(getStorageData.length / showContent);

/* 포스트 정보 추가 */
const convertToDiscussion = (obj) => { 
  const li = document.createElement("li"); 
  li.className = "discussion__container";
  const avatarWrapper = document.createElement("div"); 
  avatarWrapper.className = "discussion__avatar--wrapper"; 
  const discussionContent = document.createElement("div"); 
  discussionContent.className = "discussion__content"; 
  const discussionAnswered = document.createElement("div"); 
  discussionAnswered.className = "discussion__answered";

  const avatarImg = document.createElement('img');
  avatarImg.setAttribute('src', obj.avatarUrl);
  avatarImg.setAttribute('alt', obj.author);
  avatarWrapper.appendChild(avatarImg);

  const contentH2 = document.createElement('h2');
  contentH2.className = "discussion__title";
  const contentA = document.createElement('a');
  contentA.setAttribute('href', obj.url);
  contentA.textContent = obj.title;
  contentH2.appendChild(contentA);
  discussionContent.appendChild(contentH2);

  const contentDiv = document.createElement('div');
  contentDiv.className = "discussion__information";
  contentDiv.textContent =`${obj.author} / ${new Date().toLocaleString('ko-KR').slice(-11)}`;
  discussionContent.appendChild(contentDiv);
 
  const answeredP = document.createElement('p');
  answeredP.textContent = obj.answer ? '☑' : '⊠';
  discussionAnswered.appendChild(answeredP);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

/* 새포스트 추가 */
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputQuestion = document.querySelector("#story");
const submit = document.querySelector('#submit');

submit.onclick = (event) => {
  event.preventDefault();
  if (window.confirm("질문을 추가하시겠습니까?")) {
    const newInfo = {};
    newInfo.author = inputName.value,
    newInfo.title = inputTitle.value,
    newInfo.createdAt = new Date(),
    newInfo.bodyHTML = inputQuestion.value,
    newInfo.avatarUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    getStorageData.unshift(newInfo)
    localStorage.setItem('discussions', JSON.stringify(getStorageData));

    inputName.value = "";
    inputTitle.value = "";
    inputQuestion.value = "";

    updateInfo();
    updatePostUI();
  };
};

/* 주요변수 업데이트 관리 */
const updateInfo = () => {
  getStorageData = JSON.parse(localStorage.getItem('discussions')); 
  maxPage = Math.ceil(getStorageData.length / showContent);
}

/* 포스트 출력 */
const updatePostUI = () => { 
  const ul = document.querySelector("ul.discussions__container"); 
  ul.parentNode.removeChild(ul);
  const newUL = document.createElement('ul');
  newUL.className= "discussions__container";

  for (let i = 0; i <= showContent-1; i += 1) {
    newUL.appendChild(convertToDiscussion(getStorageData[i]));
  };
  discussionWrapper.prepend(newUL);
  showButton();
}

/* 버튼 출력 */
const showButton = () => { 
  const buttonlist = document.querySelector('.buttonlist');
  buttonlist.parentNode.removeChild(buttonlist);
  const pageDiv = document.createElement('div');
  pageDiv.className = 'buttonlist';
  updateInfo();

  for (let i = 1; i <= maxPage; i++) { 
    const pageA = document.createElement('a');
    pageA.className = "pageButton";
    pageA.textContent = i;
    pageDiv.appendChild(pageA);
  };
  pageDiv.children[0].classList.add('active');
  const pagination = document.querySelector('.pagination');
  pagination.prepend(pageDiv);
  buttonEvent(); 
};

/* 버튼 이벤트 추가 */
const buttonEvent = () => {
  pageButtons = document.querySelectorAll('.pageButton');
  updateInfo();
  
  for (let i = 0; i < pageButtons.length; i++) {
    pageButtons[i].onclick = (event) => {
      const buttonlist = document.querySelector('.buttonlist');
      buttonlist.children[0].classList.remove('active');

      const ul = document.querySelector("ul.discussions__container"); 
      ul.parentNode.removeChild(ul);
      const newUL = document.createElement('ul');
      newUL.className= "discussions__container";

      const buttonNum = event.target.textContent;
      const startNum = (showContent*buttonNum)-showContent;
      let endNum = (showContent*buttonNum)-1;

      if (Number(maxPage) === Number(buttonNum)) {
        endNum = getStorageData.length-1;
      };
      
      for (let i = startNum; i <= endNum; i += 1) {
        newUL.appendChild(convertToDiscussion(getStorageData[i])); 
      };
      discussionWrapper.prepend(newUL);
    };
  };
};

updatePostUI(); 