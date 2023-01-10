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
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2")
  discussionTitle.className = "discussion__title"

  const a = document.createElement("a")
  a.href = obj.url
  discussionTitle.append(a)
  discussionTitle.textContent=obj.title

  const discussionInfo = document.createElement("div");
  const p = document.createElement("p")
  p.textContent= obj.answer ? "☑" : "☒"
  discussionAnswered.append(p)
  
  discussionInfo.className = "discussion__information"
  discussionInfo.textContent = obj.author + "/" + obj.createdAt
  discussionContent.append(discussionTitle,discussionInfo,discussionAnswered)
  
  

  // const answerTitle = document.createElement(".answer__title")
  // const answerInfo = document.createElement("h2")
  // // answerTitle.textContent = obj.answer
  // answerInfo.textContent = obj[answer].bodyHTML

  // discussionAnswered.append(answerTitle,answerInfo)

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


// let data;
// const localStorageData = localStorage.getItem("agoraStatesDiscussions")
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
  obj.createdAt = new Date().toDateString() //toLocalDateString도 있음

  // localStorage.setItem("obj", JSON.stringify(obj));
  
  // if(localStorageData){
  //   data = JSON.parse(localStorageData)
  // }else{
  //   data = agoraStatesDiscussions.slice();
  // }

  // localStorage.setItem("agoraStatesDiscussions", JSON.stringify(data));

  agoraStatesDiscussions.unshift(obj)//obj 객체를 agora배열의 맨 앞쪽에 넣음
  //아직 agora배열에만 있고 그 배열을 설정하려면 추가행동이 필요함
  const convertForm = convertToDiscussion(obj)//위에서 설정한 <li> form으로 만듬
  ul.prepend(convertForm)  //ul의 앞에 둬서 폼이 맨 앞쪽에 보이게 만듬

// let keys = Object.keys(localStorage);

// for(let key of keys) {
//   console.log(`${key}: ${localStorage.getItem(key)}`);
// }

}



submit.addEventListener('click', makeForm)
