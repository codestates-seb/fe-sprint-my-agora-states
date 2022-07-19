// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  // console.log(obj)
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  //avatarWrapper에 이미지 요소 추가.
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author
  avatarWrapper.append(avatarImg)

  //discussion__content에 a태그를 담은 h2요소 추가.
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const discussionTitleA = document.createElement('a');

  discussionTitleA.href = obj.url
  discussionTitleA.textContent = obj.title
  discussionTitleA.target = "_blank"
  discussionTitle.append(discussionTitleA)

  //discussion__content에 div 사용자 정보를 나타내는 div 추가.
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information'
  discussionInformation.textContent= `${obj.author} / ${new Date(obj.createdAt).toLocaleString('ko-KR')}`
  discussionContent.append(discussionTitle, discussionInformation)

  //discussion__answered에 p태그 추가.
  const discussionAnsweredP = document.createElement('p');
  obj.answer ? discussionAnsweredP.textContent = '☑' : discussionAnsweredP.textContent = '☐'
  discussionAnswered.append(discussionAnsweredP)

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

//form에 입력한 새로운 객체를 agoraStatesDiscussions 앞에 추가 후 ul요소 제일 앞에 li요소 추가해주는 함수.
const appendAgoraStatesDiscussions = (name, title, content) => {
  const newData = {
    id: `D_kwDOHOApLM4APjJi`,
    createdAt: new Date(),
    title:title,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: name,
    answer: null,
    bodyHTML: content,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  }
  agoraStatesDiscussions.unshift(newData)
  
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
const inputName = document.querySelectorAll("#name")[0]
const inputTitle = document.querySelectorAll("#name")[1]
const textarea = document.querySelector("#story")

const form = document.querySelector('.form')


//form 버튼 EventListener
form.addEventListener('submit', (e) => { 
  e.preventDefault();
  appendAgoraStatesDiscussions(inputName.value, inputTitle.value, textarea.value) 

  //li요소 추가 후 form 초기화.
  inputName.value = ''
  inputTitle.value = ''
  textarea.value = ''
})


render(ul);

const checks = document.querySelectorAll('.discussion__answered');

//checks배열의 요소 하나하나 가져와 이벤트 추가.
checks.forEach((check) => {
  check.addEventListener('click', () => { 
    check.textContent === "☑" ? check.textContent ='☐' : check.textContent ='☑' ;
  })
})
