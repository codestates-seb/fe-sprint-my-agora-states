// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 세개의 뼈대 태그
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  
  // avatarWrapper
  const wrapperImg = document.createElement('img');
  wrapperImg.className = 'discussion__avatar--image';
  wrapperImg.src = obj.avatarUrl;
  wrapperImg.alt = obj.author;
  avatarWrapper.append(wrapperImg);

  // discussionContent
  const contentTitle = document.createElement('h2');
  contentTitle.className = 'discussion__title';
  const contentTitleLink = document.createElement('a');
  contentTitleLink.href = obj.url;
  contentTitleLink.textContent = obj.title;
  contentTitle.append(contentTitleLink);
  const contentInfo = document.createElement('div');
  contentInfo.className = 'discussion__information';
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(contentTitle);
  discussionContent.append(contentInfo);

  // discussionAnswered
  const answeredCheckbox = document.createElement('p');
  answeredCheckbox.textContent = '☑';
  discussionAnswered.append(answeredCheckbox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// submit click event
const submit = document.querySelector('.form__submit');
const inputName = document.querySelector('#input__name');
const inputTitle = document.querySelector('#input__title');
const inputQuestion = document.querySelector('#input__question');
let arr = [];
submit.addEventListener('click', (e) => {
  const obj = {
    id: '',
    createdAt: new Date(),
    title: inputTitle.value,
    url: '',
    author: inputName.value,
    bodyHTML: inputQuestion.value,
    avatarUrl: 'https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4'
  };
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
  e.preventDefault();
  inputName.value = '';
  inputTitle.value = '';
  inputQuestion.value ='';

  // 로컬 스토리지 값 저장 후 가져오기
  localStorage.setItem('zz', JSON.stringify(obj));
  let localData = JSON.parse(localStorage.getItem('zz'));
  agoraStatesDiscussions.unshift(localData);

  // ul.prepend(convertToDiscussion(localData));
})


// 페이지네이션
const ul = document.querySelector(".discussions__container");
const paginationContent = document.querySelector('.paginationContent');

function displayContent(page) {
  ul.innerHTML = '';
  const agoraData = agoraStatesDiscussions.slice(10*page, 10*page+10);
  for (let i = 0; i < agoraData.length; i++) {
    ul.append(convertToDiscussion(agoraData[i]));
  }
  return;
}

function paginationBtn() {
  displayContent(0);

  const pageCount = Math.ceil(agoraStatesDiscussions.length / 10);
  for (let i = 1; i <= pageCount; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = 'pageBtn';
    pageBtn.textContent = i;
    paginationContent.appendChild(pageBtn);

    pageBtn.addEventListener('click', () => {
      displayContent(i-1);
    })
  }
  return;
}
paginationBtn();


  // 전달받은 데이터 html에 박아두기
  let localData = JSON.parse(localStorage.getItem('zz'));
  ul.prepend(convertToDiscussion(localData));

  // for (let i=0; i<arr.length; i++) {
  //   ul.prepend(convertToDiscussion(arr[i]));
  // }

  localStorage.clear();