// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

console.log(document.getElementById(checkbox.value));

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussion__content_container = document.createElement("div");
  discussion__content_container.className ="discussion__content_container";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  let content_H2 = document.createElement('h2');
  content_H2.className = 'discussion__title';
  let content_A = document.createElement('a');
  content_A.textContent = obj.title
  content_A.href = obj.url;
  content_H2.append(content_A);

  let discussionContents = document.createElement('p');
  discussionContents.textContent = obj.bodyHTML.replace(/<[^>]*>?/gi, '');
  let content_Name_AT = document.createElement('div');
  content_Name_AT.className = 'discussion__information';
  content_Name_AT.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append( content_H2, discussionContents, content_Name_AT)
  discussion__content_container.appendChild(discussionContent)

  let discussionAnswerCheck = document.createElement('div');
  discussionAnswerCheck.className = 'answer__check';
  let discussionAnswerCheckbox = document.createElement("INPUT");
  discussionAnswerCheckbox.className = 'check__box';
  discussionAnswerCheckbox.setAttribute("type","checkbox");  
  // discussionAnswerCheckbox.setAttribute("name","answer");
  discussionAnswerCheckbox.setAttribute("checked","unchecked");
  let discussionQuestion = document.createElement("button");
  discussionQuestion.className = 'question__open';
  discussionQuestion.innerText= '질문확인'
  discussionAnswered.append(discussionAnswerCheckbox, discussionQuestion);


  li.append(avatarWrapper,discussion__content_container, discussionAnswered);
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

// submit을 눌렀을 때 질문자의 정보와 내용이 agora 배열에 들어가게 합니다.
const button = document.getElementById('submit');
const buttonClickHandler = (e) => {
  e.preventDefault();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  let name = document.getElementById('name');
  let title = document.getElementById('title');
  let story = document.getElementById('story');
  
  let questions = { 
    author : name.value,
    title : title.value ,
    bodyHTML : story.value , 
    createdAt : `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`,
    url : '/',
    avatarUrl : './img/68c0cc1594336a0294b5a20b93616a74.png',
    answer : null,
  };
  agoraStatesDiscussions.unshift(questions);
  
  let li_questions = convertToDiscussion(questions);
  ul.prepend(li_questions)
};

button.addEventListener('click', buttonClickHandler);

const button2 = document.getElementsByClassName('question__open');
const buttonClickHandler_questionOpen = (e) => {
  e.preventDefault();
  
};
