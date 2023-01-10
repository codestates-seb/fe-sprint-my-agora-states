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
// div.discussion__avatar--wrapper의 자식 요소를 채운다.
const avatarImg = document.createElement("img");
avatarImg.className = "discussion__avatar--image";
avatarImg.src = obj.avatarUrl;
avatarImg.alt = "avatar of" + obj.author;

avatarWrapper.append(avatarImg);

// div.discussion__content의 자식 요소를 채운다.

// 타이틀
const discussionTitle = document.createElement("h2")
discussionTitle.className = "discussion__title";
// 타이틀 url
const titleAnchor = document.createElement("a");
titleAnchor.href = obj.url;
discussionTitle.append(titleAnchor);
// 정보
const discussionInformation = document.createElement("div");
discussionInformation.className = "discussion__information";

discussionContent.append(discussionTitle, discussionInformation);

// div.discussion__answered의 자식 요소를 채운다.
const discussionAnsweredCheckbox = document.createElement("p");
discussionAnsweredCheckbox.textContent = obj.answer ? "☑" : "☒";

discussionAnswered.append(discussionAnsweredCheckbox);

// 저자, 생성일을 함께 작성하고, 현지 시간에 맞게 표현합니다.
titleAnchor.textContent = obj.title;
discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;

// append 메소드를 이용하여 위에 생성한 <div> 요소들을 li.discussion__container의 자식 요소로 추가합니다.
li.append(avatarWrapper, discussionContent, discussionAnswered);
return li;
};

// 1. 폼 관련 DOM을 가져온다.
const form = document.querySelector('form.form');
const inputName = document.querySelector('.form__input--name input')
const inputTitle = document.querySelector('.form__input--title input')
const inputQuestion = document.querySelector('.form__textbox textarea')

// 2. submit 폼에 EventListener를 붙인다.
form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  const obj = {    
      createdAt: new Date(),
      title: inputTitle.value,      
      author: inputName.value,
      answer: null, 
      bodyHTML: inputQuestion.value,
      avatarUrl:
      "https://avatars.githubusercontent.com/u/22221941?v=4",
    }

    agoraStatesDiscussions.unshift(obj);

    // DOM을 ul.prepend해서 화면에 나타나게 한다. prepend() === 첫 번째 자식 요소
    ul.prepend(convertToDiscussion(obj));

    // 입력값 초기화
    inputName.value = '';
    inputTitle.value = '';
    inputQuestion.value = '';  
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