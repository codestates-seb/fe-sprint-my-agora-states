// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const wrapwarp = document.createElement("div");
  wrapwarp.className="discussion_wrap"

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //이미지
  const avatarImg = document.createElement('img')
  avatarImg.className="discussion__avatar--image"
  avatarImg.src = obj.avatarUrl
  avatarImg.alt=`avatar of  ${obj.author}`
  avatarWrapper.append(avatarImg)

  //h2
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = "discussion__title"
  const tilteAnchor = document.createElement('a')
  discussionTitle.append(tilteAnchor)
  tilteAnchor.textContent = obj.title


  //infomation
  const discussionInfo = document.createElement('div')
  discussionInfo.className="discussion__information"
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt} `
  discussionContent.append(discussionTitle,discussionInfo)
  
  //Qu
  const discussionQuestion = document.createElement('div')
  discussionQuestion.className="discussion_question"
  const discussionQuestionWarp = document.createElement('div')
  const discussionQuestionP = document.createElement('p')
  discussionQuestionP.className="Answer_p"
  discussionQuestionP.textContent = `문제 본문`

  discussionQuestionWarp.textContent = `${obj.bodyHTML}`
  discussionQuestionWarp.prepend(discussionQuestionP)
  discussionQuestion.append(discussionQuestionWarp)

  
  wrapwarp.append(avatarWrapper, discussionContent, discussionAnswered);
  li.append(wrapwarp,discussionQuestion)
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


// input 으로 추가하기
  //새로운 객체를 만들어야함.
  //input 에 value 를 객체로
  //새로운 객체를 이전 더미데이터 (agoraStatesDiscussion) 맨 첫번째에 추가해준다.
const form = document.querySelector('form.form')
const title = document.querySelector('div.form__input--name > input')
const nameInput = document.querySelector('div.form__input--title > input')
const textbox = document.querySelector('div.form__textbox > textarea')

form.addEventListener("submit", (e)=>{
  e.preventDefault()
  const plusObj= {
    id: "unique id",
    createdAt: new Date().toLocaleString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: nameInput.value,
    bodyHTML:textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  //plusObj.author = 
  // console.log(plusObj.title)
  agoraStatesDiscussions.splice(2,0,plusObj)
  const newDiscussion = convertToDiscussion(plusObj)
  ul.prepend(newDiscussion)
})
const ulClick = document.querySelector('.discussions__container')
const answered = document.querySelector('.discussion_question')
ulClick.addEventListener("click",(e)=>{
  e.preventDefault()
  e.stopPropagation
  let elem = e.target;
    while (!elem.classList.contains('discussion_wrap')) {
      elem =  elem.parentNode;

      if(elem.nodeName === 'BODY'){
        elem = null;
        return;
      }
    }
    console.log(e.target)
    console.log(elem)
  elem.nextElementSibling.classList.toggle('open')
  // console.log()
  //
})