// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

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
  const avatarImg = document.createElement('img');
    avatarImg.className = "discussion__avatar--image"
    avatarImg.src = obj.avatarUrl
    avatarImg.alt = 'avatar of' + obj.author
    avatarWrapper.append(avatarImg)

  //제목 이름 날짜
  const title = document.createElement('h2')
    title.className = 'discussion__title'
  const imformation = document.createElement('div')
    imformation.className = 'discussion__information'
    imformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  const aTag = document.createElement('a')
    aTag.href =  obj.url
    aTag.textContent = obj.title
    title.append(aTag)
    discussionContent.append(title,imformation)

  // 체크박스
  const checkBox = document.createElement('p')
    checkBox.textContent = obj.answer ? '☑' : 'X'
    discussionAnswered.append(checkBox)


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form')
const inputName = document.querySelector('.form__input--name > input')
const inputTitle = document.querySelector('.form__input--title > input')
const inputQuestion = document.querySelector('.form__textbox > textarea')

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const obj = {
    id: "D_kwDOHOApLM4APjIj",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
    author: inputName.value,
    answer: null,
    bodyHTML:
      inputQuestion.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
  }
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  inputName.value = ''
  inputTitle.value = ''
  inputQuestion.value = ''
})


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
