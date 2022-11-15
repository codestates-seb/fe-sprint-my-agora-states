// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
//배열 안에 있는 각 요소를 꺼내서 DOM으로 바꾼 다음, 렌더링(뿌려준다)
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
//DOM으로 바꾼다는 의미가 정확히 이해가 안됩니다 
//DOM으로 바꾸기 전 모양은 그냥 data.js파일 모양이다. 
//DOM이란 자바스크립트로 html 조작할 수 있도록 프로퍼티, 메서드 제공하는것 
//DOM으로 변환한다는 것의 의미. 데이터를 하나의 디스커션(li요소)로 만들었다. 
//CRUD 는 필수 
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
  avatarImg.className ="discussion__avatar--image"
  avatarImg.alt ="avatar of "+obj.author;
  avatarImg.src = obj.avatarUrl;
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement('h2')
  const titleAncor = document.createElement('a')
  titleAncor.href =obj.url;
  titleAncor.textContent =obj.title;

  const contentInfo = document.createElement('div')
  contentInfo.textContent=`${obj.author}/${new Date(obj.createdAt).toLocaleString()}`


  contentTitle.append(titleAncor);
  discussionContent.append(contentTitle,contentInfo);

  const checked = document.createElement('p');
  checked.textContent=obj.answer ? '☑':'🅇'
  discussionAnswered.append(checked)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form =document.querySelector('form.form');
const inputName =document.querySelector('.form__input--name >input')
const inputTitle = document.querySelector('.form__input--title > input');
const inputQuestion = document.querySelector('.form__textbox >textarea');

form.addEventListener('submit',(event)=> {
  event.preventDefault();
  const obj ={

    id: "999",
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML:inputQuestion.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  //기존데이터 가장 앞으로 두기 
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  inputName.value=''
  inputTitle.value=''
  inputQuestion.value=''
})


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (ul) => {  //랜더함수 ; 반복하면서 ul 요소에다가 append 해주겠다.
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
