// for (let i = 0; i < localStorage.length; i++){
//     ul.insertBefore(localStorage.getItem(`${i}`));
//     console.log(ul);
// } // 불러오기 실패

const convertToDiscussion = (obj,i) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // 아바타이미지 avatarWrapper div 
  avatarWrapper.className = "discussion__avatar--wrapper"; 
  const discussionContent = document.createElement("div"); // 콘텐츠내용(제목) discussionContent div
  discussionContent.className = "discussion__content"; 
  const discussionAnswered = document.createElement("div"); // 답변 discussionAnswered div
  discussionAnswered.className = "discussion__answered";  

  // avatarWrapper
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = agoraStatesDiscussions[i].avatarUrl;
  avatarImg.alt = agoraStatesDiscussions[i].author;
  avatarWrapper.append(avatarImg);

  // discussionContent
  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title";
  const contentLink = document.createElement('a');
  contentTitle.appendChild(contentLink);
  contentLink.href = agoraStatesDiscussions[i].url;
  contentLink.textContent = agoraStatesDiscussions[i].title;

  const contentInfo = document.createElement('div');
  contentInfo.className = "discussion__information";
  contentInfo.textContent = agoraStatesDiscussions[i].author + ' / ' + agoraStatesDiscussions[i].createdAt;

  discussionContent.append(contentTitle, contentInfo);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i],i));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


/////////////////////////////////////////// 사용자입력 ////////////////////////////////////////////////////
const convertDisplay = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussion__container"; // 클래스 이름 지정
  
    const avatarWrapper = document.createElement("div"); // 아바타이미지 avatarWrapper div 
    avatarWrapper.className = "discussion__avatar--wrapper"; 
    const discussionContent = document.createElement("div"); // 콘텐츠 제목 discussionContent div
    discussionContent.className = "discussion__content"; 
    const discussionQuestion = document.createElement("div"); // 답변 discussionAnswered div
    discussionQuestion.className = "discussion__Question";  

    const nameInput = document.querySelector('#name');  // 이름 입력 값
    const titleInput = document.querySelector('#title'); // 제목 입력 값
    const storyInput = document.querySelector('#story'); // 내용 입력 값

    // avatarWrapper 아바타
    const avatarImg = document.createElement('img');
    avatarImg.className = "discussion__avatar--image";
    avatarImg.src = "https://avatars.githubusercontent.com/u/79903256?s=64&v=4";    //x
    avatarImg.alt = "";      //x
    avatarWrapper.append(avatarImg);
  
    // discussionContent 콘텐츠 제목
    const contentTitle = document.createElement('h2');
    contentTitle.className = "discussion__title";
    const contentLink = document.createElement('a');
    contentTitle.appendChild(contentLink);
    contentLink.textContent = titleInput.value;
    
    // 작성자 이름 및 콘텐츠 생성일
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    const date = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    const contentInfo = document.createElement('div');
    contentInfo.className = "discussion__information";
    contentInfo.textContent = nameInput.value + ' / ' + `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  
    // 질문글
    const getText = document.getElementById('story');
    const questionText = document.createElement('p');
    questionText.textContent = getText.value;
    discussionQuestion.append(questionText);

    const discussionAnswered = document.createElement('div');
    discussionAnswered.className = "discussion__answered";

    discussionContent.append(contentTitle, contentInfo, discussionQuestion);
    
    li.append(avatarWrapper, discussionContent);

    console.log(li.outerHTML);

    const objString = li.outerHTML;
    localStorage.setItem(`${localStorage.length}`,objString);

    return li;
}

// const convertDisplayAnswer = (obj) => {
//     const liQuest = document.createElement("li");
//     liQuest.className = "liQuest";

//     const discussionAnswer = 
// }

const submitButton = document.querySelector('#submit');
submitButton.addEventListener('click', () => {
    const nameInput = document.querySelector('#name');  // 이름 입력 값
    const titleInput = document.querySelector('#title'); // 제목 입력 값
    const storyInput = document.querySelector('#story'); // 내용 입력 값
    ul.prepend(convertDisplay()); // prepend, 맨첫번째 자식으로 추가, append와 반대임.
    nameInput.value = "";
    titleInput.value = "";
    storyInput.value = "";
    return;
});

const initButton = document.querySelector('#init');
initButton.addEventListener('click', () => {
    const nameInput = document.querySelector('#name');  // 이름 입력 값
    const titleInput = document.querySelector('#title'); // 제목 입력 값
    const storyInput = document.querySelector('#story'); // 내용 입력 값
    nameInput.value = "";
    titleInput.value = "";
    storyInput.value = "";
    return;
});






/////////////////////////////
// 이미지 업로드
