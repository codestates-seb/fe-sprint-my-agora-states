// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

//로컬스토리지?
let localStory = [];
function saveDiscussions(){
  localStorage.setItem('discussions',JSON.stringify(localStory))
}

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
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author; //??
  avatarWrapper.append(avatarImg);

const discussionTitle = document.createElement("h2");
const titleAnchor = document.createElement("a");
titleAnchor.href = obj.url;
titleAnchor.textContent = obj.title;
discussionTitle.append(titleAnchor);

const discussionInformation = document.createElement("div");
discussionInformation.className = "discussion__information";
discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;
discussionContent.append(discussionTitle, discussionInformation);

const checked = document.createElement("p");
checked.textContent = obj.answer ? "✅" : "❎" ;
discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  ul.prepend(li);
  return li;
};

//데이터값 받아오기 안됨
const newButton = document.querySelector(".button"); //button
const newAuthor = document.querySelector(".newAuthor"); //name
const newTitle = document.querySelector(".newTitle");   //title
const newStory = document.querySelector(".story");      //text
const time = new Date()

// newButton.addEventListener('click',clickButton) 
// newButton.onclick = function(event){  
//   evevt.preventDefault();
// const clickButton = function() {
  // if(newTitle.value !== ''){
    // let obj = {};
    // console.log(123)
    // obj['id'] = ''
    // obj['createdAt'] = time;
    // obj['title'] = newTitle.value;
    // obj['url'] = "https://github.com/codestates-seb/agora-states-fe/discussions";
    // obj['author'] = newAuthor.value;
    // obj['answer'] = null;
    // obj['body'] = '';
    // obj['avatarUrl'] = "https://avatars.githubusercontent.com/u/104156381?s=64&v=4";
    // newAuthor.value = '';
    // newTitle.value = '';
    // newStory.value = '';
    // localStory.push(obj);
    // saveDiscussions();
    // convertToDiscussion(obj);
  // };

newButton.onclick =(event) =>{
  console.log(event)
  event.preventDefault();
  if(newTitle.value !== ''){
    let obj = {
      author : `${newAuthor.value}`,
      title : `${newTitle.value}`,
      avatarUrl : "https://avatars.githubusercontent.com/u/104156381?s=64&v=4"
    }
    agoraStatesDiscussions.unshift(obj);
    newAuthor.value = '';
    newTitle.value = '';
    newStory.value = '';
    ul.innerHTML = '';
    render(ul);
  }
}



localStorage.getItem('discussions')

if(localStorage.getItem('discussions')){
  localStory = JSON.parse(localStorage.getItem('discussions'))
  for(let i = 0; i<localStory.length; i++){
    convertToDiscussion(localStory[i])
    console.log(gh)
  }
}

// const newObj ={author : newAuthor.value, createdAt : time, title : newTitle.value, avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4"};
// Li.append(avatarWrapper, discussionContent, discussionAnswered)
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.

const render = (element) => {
  element.innerHTML="" 
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
   element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

