// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
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
  contentDiv.textContent =`${obj.author} / ${new Date().toLocaleString('ko-KR').slice(-11)}`
  discussionContent.appendChild(contentDiv);
 
  const answeredP = document.createElement('p');
  answeredP.textContent = obj.answer ? '☑' : '⊠';
  discussionAnswered.appendChild(answeredP);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

/* form */
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputQuestion = document.querySelector("#story");
const submit = document.querySelector('#submit');

submit.onclick = function (event) {
  event.preventDefault();
  if (window.confirm("질문을 추가하시겠습니까?")) {
    const newInfo = {};
    newInfo.author = inputName.value,
    newInfo.title = inputTitle.value,
    newInfo.createdAt = new Date(),
    newInfo.bodyHTML = inputQuestion.value,
    newInfo.avatarUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    agoraStatesDiscussions.unshift(newInfo);
    ul.prepend(convertToDiscussion(newInfo));
    
    inputName.value = "";
    inputTitle.value = "";
    inputQuestion.value = "";
  };
};

/* pagination */
let numOfContent = agoraStatesDiscussions.length;
let showContent = 10; 
let maxPage = Math.ceil(numOfContent / showContent);
const pageDiv = document.querySelector('.pagination');
function showPagination() {
  for (let i = 1; i <= maxPage; i++) { 
    const pageDiv = document.querySelector('.pagination');
    const pageA = document.createElement('a');
    pageA.className = "pageButtons";
    pageA.textContent = i;
    pageDiv.appendChild(pageA);
  }
  pageDiv.children[0].classList.add('active') ;
  return;
};
showPagination();

/* page button */
const pageButtons = document.querySelectorAll('.pageButtons');
const discussionWrapper = document.querySelector('.discussion__wrapper');
for (const button of pageButtons) {
    button.addEventListener('click', function(event) {
    discussionWrapper.removeChild(ul);
    ul = document.createElement('ul');
    pageDiv.children[0].classList.remove('active');
    
    const buttonNum = event.target.textContent;
    const startNum = (showContent*buttonNum)-showContent;
    let endNum = (showContent*buttonNum)-1;

    if (endNum-startNum !== 0) {
      endNum = agoraStatesDiscussions.length-1;
    } ;

    for (let i = startNum; i <= endNum; i += 1) {
      ul.appendChild(convertToDiscussion(agoraStatesDiscussions[i])); 
    };

    discussionWrapper.prepend(ul);
  });
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
let ul = document.querySelector("ul.discussions__container");
const render = (element) => { 
    for (let i = 0; i <= showContent-1; i += 1) {
      element.appendChild(convertToDiscussion(agoraStatesDiscussions[i]));
    }
  return;
};
render(ul);