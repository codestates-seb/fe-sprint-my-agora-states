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

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 아바타 부분
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 타이틀 부분
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  

    const discussionTitleUrl = document.createElement("a");
    discussionTitleUrl.href = obj.url;
    discussionTitleUrl.textContent = obj.title;
    discussionTitle.append(discussionTitleUrl);

  // 본문(Information) 부분
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = obj.author + ' / ' + obj.createdAt;

  discussionContent.append(discussionTitle, discussionInformation);
 
  //체크 박스 부분
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑" : "☒" ;
  discussionAnswered.append(checked);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;

};

// 새로운 질문 등록
const inputName = document.querySelector('#name')
const inputTitle = document.querySelector('#newtitle')
const inputContent = document.querySelector('#story')
const btSubmit = document.querySelector('#submit')


function addDiscussion (name, title, content){
  agoraStatesDiscussions.push({
    author: name,
    title: title,
    bodyHTML: content
  }
  )
}; 

btSubmit.addEventListener('click', function() {
  addDiscussion(inputName.value, inputTitle.value, inputContent.value)
});

btSubmit.addEventListener('click', function() {
  agoraStatesDiscussions.shift()
  return agoraStatesDiscussions
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
