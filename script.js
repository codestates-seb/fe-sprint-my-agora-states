// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

let elInputName = document.querySelector('#name')
let elInputTitle = document.querySelector('#title')
let elInputStory = document.querySelector('#story')
let elSubmit = document.querySelector('.form__submit')


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "AgoraStates";
  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author}/${new Date(
    obj.createdAt || Date.now()).toISOString()}`;

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  discussionContent.append(discussionTitle, discussionInfo);
 
  const checkAnswer = document.createElement("p");
  if(isAnswered(obj.answer)) { 
    checkAnswer.textContent = "☑";
    discussionAnswered.classList.add('checkAnswer');
  }
  else {
    checkAnswer.textContent = "☒";
    discussionAnswered.classList.remove('0checkAnswer');
  }
    
  discussionAnswered.append(checkAnswer);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

elSubmit.onclick = function(event) {
  event.preventDefault();
  if (isAllow(elInputName.value, elInputTitle.value, elInputStory.value)) {
    // 게시글이 등록되었을 때
    const newDiscussion = {
      id: "unique id",
      createdAt: new Date().toISOString(),
      title: elInputTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions",
      author:elInputName.value,
      answer: null,
      bodyHTML: elInputStory.value,
      avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",      
    };

    agoraStatesDiscussions.unshift(newDiscussion); // 배열의 0번째에 요소 추가
    ul.prepend(convertToDiscussion(newDiscussion)); // 새로운 요소를 화면에 추가
    alert("게시글이 등록되었습니다.");
  } 
  else {
    alert("게시글 등록 실패!")
  }
}

// 게시글 작성 규칙.
function isAllow (name, title, story) {
  if(name !== '' && title !== '' && story !== '') {
    return true;
  }
  return false;
}

//답변 유무 확인.
function isAnswered (comment) {
  if(comment) {
    return true;
  }
  return false;
}