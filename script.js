// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
const submit = document.querySelector('.form__submit');
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputStory = document.querySelector('#story');
const ul = document.querySelector("ul.discussions__container");




// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 사용자 아바타 이미지 DOM
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.setAttribute('src', obj.avatarUrl);
  avatarImg.setAttribute('alt', `avatar of ${obj.author}`)

  avatarWrapper.append(avatarImg);
  
  // 사용자 질문 DOM
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement('a');
  discussionLink.setAttribute('href', obj.url);
  discussionLink.textContent = obj.title;
  discussionTitle.append(discussionLink);


  // information 설정 
  const discussionInfor = document.createElement("div");
  discussionInfor.className = "discussion__information";
  discussionInfor.textContent = `${obj.author} / ${obj.createdAt}`;

  // 사용자 대답 DOM
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const answerCheck = document.createElement('p');
  if(obj.answer !== null){
    answerCheck.textContent = '☑';
  }else{
    answerCheck.textContent = '☐';
  }

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  discussionContent.append(discussionTitle, discussionInfor);
  discussionAnswered.append(answerCheck);

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

// 클릭시 추가하는 부분이 실행되어야함.
// submit.onclick = () => {
//   const obj = {};
//   obj.author = inputName.value;
//   obj.title = inputTitle.value;
//   obj.story = inputStory.value;
//   obj.answer = null;
//   obj.createdAt = new Date();
//   console.log(obj);


//   agoraStatesDiscussions.unshift(obj);
//   console.log(agoraStatesDiscussions.length);
  
// }



// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render(ul);


