// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // Discussion 요소 생성
  li.className = "discussion__container";  // list에 클래스 이름 지정

  const avatarWrapper = document.createElement("div");      //body에 아바타 div 요소생성
  avatarWrapper.className = "discussion__avatar--wrapper";  //class 지정
  const discussionContent = document.createElement("div");  //아바타 영역 div생성
  discussionContent.className = "discussion__content";      //아바타이름 클래스부여 
  const discussionAnswered = document.createElement("div"); //답변 div생성
  discussionAnswered.className = "discussion__answered";    //답변에 클래스 부여 
  const reply = document.createElement("div");  
  reply.className = "reply";     

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  //아바타 이미지
  let avatarImage = document.createElement ('img');  
  avatarImage.src = obj.avatarUrl 
  avatarImage.alt = 'avatar of' + obj.author 
  avatarImage.className ='discussion__avatar--image'
  avatarWrapper.appendChild(avatarImage)

  //title and innerHTML 
  let title = document.createElement('h2');
  title.className = 'discussion__title'; 
  title.textContent = obj.title; 
  discussionContent.append(title); 
  
  let bodyHTML = document.createElement('div')
  bodyHTML = obj.bodyHTML;
  title.addEventListener("click", () => {
    const newWindow = window.open("", "_blank", "width=800,height=800"); 
    newWindow.document.body.innerHTML = bodyHTML;
  });
  
  //author & Date & check
  let userAndDate = document.createElement('div');
  userAndDate.className = 'discussion__information';
  userAndDate.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`
  discussionContent.append(userAndDate); 
  
  let checked = document.createElement("p")
  console.log(obj.answer)
  checked.textContent = obj.answer ? "☑" : "☒";
  discussionAnswered.append(checked); 

  //Answer
  if((obj.answer === null))
  { reply.classList.add('hide')}
  else{
    reply.className = "reply";   
    let replyAvatar = document.createElement ('img'); 
    replyAvatar.src = obj.answer.avatarUrl
    reply.append(replyAvatar);

    let replyBodyHTML = document.createElement('div')
    replyBodyHTML.innerHTML = obj.answer.bodyHTML
    reply.append(replyBodyHTML);

    let replyInfo = document.createElement ('div'); 
    replyInfo.className = 'author_info';
    let replyAuthor = obj.answer.author
    let replyCreatedAt = obj.answer.createdAt;
    replyInfo.textContent = `${replyAuthor} / ${replyCreatedAt}`
    reply.append(replyInfo);
  }  

  li.append(avatarWrapper, discussionContent, discussionAnswered, reply);
  return li;
};

//Get Information
const form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
  event.preventDefault(); 
  let name = form.elements.name.value; 
  let title = form.elements.title.value; 
  let story = form.elements.story.value; 
  console.log(name, title, story);
  const newDiscussion_content = { 
    title: title,
    author: name,
    createdAt : new Date(), 
    bodyHTML : story, 
    answer : null, 
    avatarUrl:'https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4'
  }; 
    console.log(newDiscussion_content); 
    agoraStatesDiscussions.unshift(newDiscussion_content);
    console.log(agoraStatesDiscussions);
    ul.prepend(convertToDiscussion(newDiscussion_content));
    form.reset(); 
}); 

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

