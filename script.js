// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
// console.log(agoraStatesDiscussions.id)
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

  const avatarImg = document.createElement('img');
  const discussionTitle = document.createElement("h2")
  const a = document.createElement("a")
  const discussionInfo = document.createElement("div");
  const p = document.createElement("p")
  
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);
  
  discussionTitle.classList = "discussion__title"
  
  a.href = obj.url
  discussionTitle.append(a)
  discussionTitle.textContent=obj.title
  
  discussionInfo.classList = "discussion__information"
  discussionInfo.textContent = obj.author + "/" + obj.createdAt
  discussionContent.append(discussionTitle,discussionInfo)
  
  p.textContent="☑"
  discussionAnswered.append(p)

  // const answerTitle = document.querySelector(".discussion__answered")
  // const answerList = document.createElement("div")
  // answerList.className = answerer
  // answerList.textContent = obj.answer
  // answerTitle.append(answerList)

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


const submit = document.querySelector('#submit')
const nameInput = document.querySelector('#name')
const titleInput = document.querySelector('#title')
const storyInput = document.querySelector('#story')

const makeForm =(event) => {
event.preventDefault();
  let obj = {title:"",
    author: "",
    bodyHTML:"",
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    createdAt: ""
  }

  obj.author = nameInput.value
  obj.title = titleInput.value
  obj.bodyHTML = storyInput.value
  obj.createdAt = new Date().toLocaleDateString()

  localStorage.setItem('obj', JSON.stringify(obj));

  agoraStatesDiscussions.unshift(obj)
const convertForm = convertToDiscussion(obj)
ul.prepend(convertForm)

let keys = Object.keys(localStorage);

for(let key of keys) {
  console.log(`${key}: ${localStorage.getItem(key)}`);
}

}



submit.addEventListener('click', makeForm)