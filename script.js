// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
const htmlDiscussionAnswered = document.querySelector('.discussion__answered')
const yes = document.querySelector('Yes')
const no = document.querySelector('no')

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
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  
  // 질문, 질문자, 작성일자
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const a = document.createElement('a');
  a.href = obj.url;
  a.textContent = obj.title;
  discussionTitle.append(a);
  const discussionInformation = document.createElement('div')
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = obj.author + ' / ' + obj.createdAt
  
  // 답변여부
  const discussionAnsweredY = document.createElement('p')
  discussionAnsweredY.className = 'discussion__answered__yes hide'
  const yes = document.createElement('i')
  yes.className = 'fa-regular fa-square-check'

  const discussionAnsweredN = document.createElement('p')
  discussionAnsweredN.className = 'discussion__answered__no hide'
  const no = document.createElement('i')
  no.className = 'fa-regular fa-rectangle-xmark'


  // 답변여부에 따른 표시
  if(obj.answer === null) {
    discussionAnsweredN.classList.remove('hide')
  }

  else {
    discussionAnsweredY.classList.remove('hide')
  }

  discussionAnsweredY.append(yes)
  discussionAnsweredN.append(no)
  discussionAnswered.append(discussionAnsweredY, discussionAnsweredN)
  avatarWrapper.append(avatarImg);
  discussionContent.append(discussionTitle, discussionInformation)
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



const username = document.querySelector('#name');
const usertitle = document.querySelector('#title');
const userstory = document.querySelector('#story');
const submitBtn = document.querySelector('#submit')

submitBtn.onclick = function() {
  submit()
  username.value = "";
  usertitle.value = "";
  userstory.value = "";
}

function submit() {
  const now = new Date();
  const year = now.getFullYear();
  const month = ('0' + (now.getMonth() + 1)).slice(-2);
  const day = ('0' + now.getDate()).slice(-2);
  const hour = ('0' + now.getHours()).slice(-2);
  const minute = ('0' + now.getMinutes()).slice(-2);
  const second = ('0' + now.getSeconds()).slice(-2);

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 이미지
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = agoraStatesDiscussions[0].avatarUrl;
  avatarImg.alt = 'avatar of ' + username.value;

  // 질문, 질문자, 작성일자
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const a = document.createElement('a');
  a.href = '#';
  a.textContent = usertitle.value;
  discussionTitle.append(a);
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = username.value + ' / ' + year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second + 'Z';

  const discussionAnsweredN = document.createElement('p');
  discussionAnsweredN.className = 'discussion__answered__no';
  const no = document.createElement('i')
  no.className = 'fa-regular fa-rectangle-xmark'

  discussionAnsweredN.append(no);
  discussionAnswered.append(discussionAnsweredN);
  avatarWrapper.append(avatarImg);
  discussionContent.append(discussionTitle, discussionInformation);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  
  // 맨 앞에 삽입
  ul.insertBefore(li, ul.firstChild)

}