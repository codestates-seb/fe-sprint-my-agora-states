// // index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
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

  const avatarImg = document.createElement("img")
  avatarImg.className  = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl
  avatarImg.alt = `${obj.author}의 프로필사진`

  const contentTitle = document.createElement("h2")
  contentTitle.className = ("discussion__title")
  const titleAnchor =  document.createElement("a")
  titleAnchor.href = obj.url

  contentTitle.append(titleAnchor)
  contentTitle.textContent = obj.title

  const contentInfo = document.createElement("div")
  contentInfo.className = ("discussion__information")
  contentInfo.textContent  = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  if(obj.answer!==null){
    discussionAnswered.textContent = "☑"
  }else discussionAnswered.textContent = "□";

  avatarWrapper.append(avatarImg)
  discussionContent.append(contentTitle, contentInfo)
  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;

};

//더보기버튼
const seeMore = ()=>{
  if(currentPage*10<agoraStatesDiscussions.length){
    currentPage++
    render(ul)
  }else alert("마지막페이지입니다")
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
let currentPage = 1

const render = (element) => {
  for (let i = currentPage-1; i <currentPage*10; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
// 질문 받기
const userName = document.querySelector("#userName")
const userTitle = document.querySelector("#userTitle")
const userText = document.querySelector("#userText")
const submitBtn = document.querySelector("#submitForm")
const discussionForm = document.querySelector("form")

discussionForm.addEventListener("submit", function(e){
  e.preventDefault()
  let newObject = {
    createdAt:new Date(),
    author: userName.value,
    title : userTitle.value,
    avatarUrl : "https://avatars.githubusercontent.com/u/77476348?s=64&u=64243db62117de5c254c9a76184753b76d7303ff&v=4"
  }
  agoraStatesDiscussions.unshift(newObject)
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]))
})

