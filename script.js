// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj,index) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // flex box를 위한 div요소 추가
  const discussion__align_left = document.createElement('div');
  const discussion__align_right = document.createElement('div');
  discussion__align_left.className = ("discussion__align-left");
  discussion__align_right.className = ("discussion__align-right");


  // avatarWrapper // discussionContent // discussionAnswered
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // avatarWrapper
  const avatarImg = document.createElement('img');
  avatarImg.className = ("discussion__avatar--image");
  avatarImg.src = agoraStatesDiscussions[index].avatarUrl;
  avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[index].author;
  avatarWrapper.append(avatarImg);

  // discussionContent - contentTitle
  const contentTitle = document.createElement('h2');
  const contentLink = document.createElement('a');
  contentTitle.textContent = agoraStatesDiscussions[index].title;
  contentLink.href = agoraStatesDiscussions[index].url;
  
  contentTitle.innerHTML = `<h2 class="discussion__title"><a href="${contentLink.href}">${contentTitle.textContent}</a></h2>`
  discussionContent.append(contentTitle);

  // discussionContent - contentTitle
  const informUser = document.createElement('span');
  const informDate = document.createElement('span');
  informUser.textContent = agoraStatesDiscussions[index].author;
  informDate.textContent = agoraStatesDiscussions[index].createdAt;
  
  const informText = `${informUser.textContent} / ${informDate.textContent}`;
  discussionContent.append(informText);

  // discussionAnswered
  const answerCheck = document.createElement('p');
  if(!(agoraStatesDiscussions[index].answer)) answerCheck.textContent = '☐';
  else answerCheck.textContent = '☑';

  discussionAnswered.append(answerCheck);
  
  // li.append(avatarWrapper, discussionContent, discussionAnswered);
  discussion__align_left.append(avatarWrapper, discussionContent);
  discussion__align_right.append(discussionAnswered);
  li.append(discussion__align_left);
  li.append(discussion__align_right);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i],i));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 클릭하면 디스커션 추가
// .form__submit 이나 <input type="submit" value="submit"> 에 클릭이 발생하면
// 텍스트(textContent)를 저장 = #name / #title / #story
// 변수에 생성자 함수로 만든 객체 할당
// agoraStatesDiscussions.unshift[ 객체 ]
// convertToDiscussion(0번째 인덱스, 인덱스 값:0)으로 새 li 생성
// ul에 새 li prepend
// 텍스트(.value)를 초기화 = ''

function InputInform(name,title,story) {
  this.id = name;
  this.author= name;
  this.createdAt = new Date().toLocaleTimeString();
  this.title = title;
  this.story = story;
  this.avatarUrl = "https://avatars.githubusercontent.com/u/50021232?v=4";
}

const submitBtn = document.querySelector('.form');

submitBtn.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameText = document.querySelector('#name');
  const titleText = document.querySelector('#title');
  const storyText = document.querySelector('#story');
  
  const newObj = new InputInform(nameText.value,titleText.value,storyText.value);
  
  agoraStatesDiscussions.unshift(newObj);

  const discussion = convertToDiscussion(agoraStatesDiscussions[0],0);
  ul.prepend(discussion);

  storyText.value = titleText.value = nameText.value = '';
});