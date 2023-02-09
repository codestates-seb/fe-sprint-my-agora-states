// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
let agoraStatesDiscussions
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
  // 이미지
  const avaterImg = document.createElement('img');
  avaterImg.className = "discussion__avatar--image"
    avaterImg.src = obj.avatarUrl;
    avaterImg.alt = "avatar of " + obj.author;
  // 이미지 append  
  avatarWrapper.append(avaterImg);
  
  // 타이틀
  const discussionTitle = document.createElement("h2")
  discussionTitle.className = "discussion__title"
  const titleHref = document.createElement("a");
  titleHref.href = obj.url;
  titleHref.textContent = obj.title
  // 하이퍼링크 append
  discussionTitle.append(titleHref)
  // 날짜와 작성자
  const discussionInformation = document.createElement("div")
  discussionInformation.className = "discussion__information"
    discussionInformation.textContent = obj.author + " / " + obj.createdAt.toLocaleString()
  // 컨텐츠 어펜드  
  discussionContent.append(discussionTitle, discussionInformation)
  // 답변
  discussionAnswered.textContent = answer(obj.answer)
  discussionAnswered.className = "discussion__answered"
  function answer(nu){
    if (nu === null){
      return "☒"
    } else {
      return "☑"
    }  
  }   
  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};  

fetch("http://localhost:4000/discussions")
.then(res => res.json())
.then(json => {
  agoraStatesDiscussions = json;

  
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
  
  // 작성
  
  const form = document.querySelector("form")
  const textarea = document.querySelector("textarea")
  const inputTitle = document.querySelector(".form__input--title > input")
  const inputName = document.querySelector(".form__input--name > input")
  
  
  form.addEventListener("submit", e => {
    e.preventDefault(); //제출 후 새로고침 취소
  const newQ = {
    id: "new id",
    createdAt: new Date().toLocaleString(),
    title: inputTitle.value, 
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value, 
    answer: null,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4"}
    
    agoraStatesDiscussions.unshift(newQ);
    //새로 초기화해서 다시 렌더링
    ul.innerHTML = "";
    render(ul)
    
    //제출후 리셋
    textarea.value = "";
    inputTitle.value = "";
    inputName.value = "";
  })  
  
  render(ul);  
  
})
  // fetch("http://localhost:4000/discussions")
  // .then(res => res.json())
  // .then(json => {
  //   agoraStatesDiscussions = json;
  //   const ul = document.querySelector("ul.discussions__container");
  //   render(ul)
  // })