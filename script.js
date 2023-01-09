// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

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
  // 이미지를 하나씩 넣어야 함.
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  // 타이틀, 정보 추가
  const discussionTitle = document.createElement("H2")
  discussionTitle.className = "discussion__title";
  const discussionTitleLink = document.createElement("a")
  const discussionInfomation = document.createElement("div")
  discussionInfomation.className = "discussion__information";
  discussionInfomation.textContent = `${obj.author} / ${obj.createdAt}`
  discussionTitleLink.href = obj.url
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink)
  discussionContent.append(discussionTitle, discussionInfomation);

  // 체크표시 추가(이후 답변 여부에 따라 수정해야 함)
  const discussionAnsweredCheck = document.createElement("div")
  discussionAnswered.append(discussionAnsweredCheck)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다. 가장 하단에서 실행중임.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const popup = document.querySelector('#layer_popup')
const popupExit = document.querySelector('.form-exit')
const writeForm = document.querySelector('.write_form');

popup.onclick = function() {
  writeForm.classList.remove('hide')
}

popupExit.onclick = function() {
  writeForm.classList.add('hide')
}

const submitForm = document.querySelector('.form__submit')
const submit = document.querySelector(".submit")

function onLoginSubmit(event) { 
  event.preventDefault();
}

const loginForm = document.querySelector(".form");
loginForm.addEventListener("submit",onLoginSubmit)


// function handleSubmit(event) {
//   event.preventDefault()
// }


const elUserId = document.querySelector('#user-id')
const elUserName = document.querySelector('#user-name')
const elStory = document.querySelector('#story')

submit.onclick = function() {
  if(elUserId.value !== '' && elUserName.value !== '' && elStory.value !== ''){
    const firstLi = document.querySelector('.discussion__container')
    firstLi.after(convertDiscussion());
    // ul.prepend(convertDiscussion()); 위쪽은 일단 공지사항 반영을 위해 저렇게 박아두었따.. 페이지가 넘어가면 어떻게 해야할지 생각해야할듯
    writeForm.classList.add('hide');
    
    elUserId.value = '';
    elUserName.value = '';
    elStory.value = '';
  }
}



function convertDiscussion() {
  const randomNum3 = Math.floor(Math.random() * 41 + 1);

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 이미지를 하나씩 넣어야 함.
  const avatarImg = document.createElement('img');
  avatarImg.src = agoraStatesDiscussions[randomNum3].avatarUrl;
  avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[randomNum3].author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  // 타이틀, 정보 추가
  const discussionTitle = document.createElement("H2")
  discussionTitle.className = "discussion__title";
  const discussionTitleLink = document.createElement("a")
  const discussionInfomation = document.createElement("div")
  discussionInfomation.className = "discussion__information";
  discussionInfomation.textContent = elUserId.value
  discussionTitleLink.href = agoraStatesDiscussions[randomNum3].url
  discussionTitleLink.textContent = elUserName.value;
  discussionTitle.append(discussionTitleLink)
  discussionContent.append(discussionTitle, discussionInfomation);

  // 체크표시 추가(이후 답변 여부에 따라 수정해야 함)
  const discussionAnsweredCheck = document.createElement("div")
  discussionAnswered.append(discussionAnsweredCheck)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
}