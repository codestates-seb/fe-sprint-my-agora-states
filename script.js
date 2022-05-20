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
  
  
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  
  const title = document.createElement("h2");
  const title_link = document.createElement("a");
  title.className = "discussion__title";
  title_link.href = obj.url;
  title_link.textContent = obj.title;
  
  
  title.append(title_link);
  discussionContent.append(title);
  
  

  const information = document.createElement("div");
  information.className = "discussion__information";
  information.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(information);
  
  if (obj.answer !== null){
  const answerd = document.createElement("div");
  const answerdP = document.createElement("p");
  answerd.className = "discussion__answered";
  answerdP.textContent = "✓";
  answerd.append(answerdP);
  discussionAnswered.append(answerd);
} else {
  const answerd = document.createElement("div");
  const answerdP = document.createElement("p");
  answerd.className = "discussion__answered";
  answerdP.textContent = "✗";
  answerd.append(answerdP);
  discussionAnswered.append(answerd);
  
  
}


const inputButton = document.querySelector('#button');
const nameValue = document.querySelector('#name1');
const tilteValue = document.querySelector('#name2');

//버튼 클릭시 agoraStatesDiscussions배열 맨 앞에 {id title createdAt} 객체가 추가 된다
inputButton.onclick = function(){
  agoraStatesDiscussions.unshift({author: nameValue.textContent, title: tilteValue.textContent, createdAt: new Date()});
}


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
