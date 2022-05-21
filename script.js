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
  // 이미지 파일 내용
const avatarImg = document.createElement('img');
      avatarImg.src = obj.avatarUrl;
      avatarImg.alt = "avatar of " + obj.author; //??
      avatarWrapper.append(avatarImg);

  // 디스커션 타이틀 내용    
const contentTitle = document.createElement("h2");
      contentTitle.className = "discussion__title";
      discussionContent.append(contentTitle);
const contentLink = document.createElement("a");
      contentLink.href = obj.url;
      contentLink.textContent = obj.title;
      contentTitle.append(contentLink);

// 디스커션 내용
const contentInformation = document.createElement("div");
      contentInformation.className = "discussion__information";
      contentInformation.textContent = `${obj.author} / ${obj.createdAt}`;
      discussionContent.append(contentInformation);

// 디스커션 답변 받았는지 체크
const checkAnswered = document.createElement("p");
      discussionAnswered.append(checkAnswered);
      obj.answer
      ? (checkAnswered.textContent = "☑")
      : (checkAnswered.textContent = "☒");
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
  
// TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
// 아고라스테이츠디스커션의 길이 만큼 converToDiscussion에 
// agoraStatesDiscussions의 0번째 인덱스 부터 넣어주는 함수
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul에서 ul.discussions__container를 찾아서 랜더 ul을 해주는 작업
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 이름, 타이들, 이야기 등을 선언하고 찾아오는 선언
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputStory = document.querySelector("#story");
const submitBtn = document.querySelector("#submit__btn");
const newDiscussionBtn = document.querySelector('.new__discussion');
const formContainer = document.querySelector('.form__container');

// formValidate를 선언 후  이름 , 타이틀, 스토리 값이 다 있으면
// 버튼 디스에이블드가 에이블드로 나오고 아니면 그대로 디스에이블드
const formValidate = () => {
  if(inputName.value && inputTitle.value && inputStory.value) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

// 아래의 인풋이 키업 되면 위에서 조건문에서 체크
inputName.addEventListener('keyup', () => {
  formValidate();
})

inputTitle.addEventListener('keyup', () => {
  formValidate();
})

inputStory.addEventListener('keyup', () => {
  formValidate();
})
// newDiscussionBtn이 클릭되면 formContainer 클래스 리스트에서 하이드된
// 토글이 나타남
newDiscussionBtn.addEventListener('click', () => {
  formContainer.classList.toggle('hide');
  inputName.focus();
})

// 버튼의 조건이 완성되고 버튼이 에이블드 되었을 때 클릭하면
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newDiscussion = {
    id: Date.now(),
    createdAt: new Date().toString(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: inputStory.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/95295766?s=64&u=85d493e0be0d2ca55965efd9f6c5b268c9dca168&v=4",
  };

  inputName.value = '';
  inputTitle.value = '';
  inputStory.value = '';
  formContainer.classList.add('hide');

  agoraStatesDiscussions.unshift(newDiscussion);
  ul.insertBefore(convertToDiscussion(newDiscussion), ul.firstChild);
});