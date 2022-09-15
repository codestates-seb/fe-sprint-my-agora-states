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
  // 아이콘
  const img = document.createElement('img');
  img.setAttribute('src', obj.avatarUrl);
  avatarWrapper.append(img);

  // 내용 박스
  const a = document.createElement('a');
  const h2 = document.createElement('h2');
  h2.className = "discussion__title";
  h2.textContent = obj.title;
  a.append(h2);
  a.setAttribute('href', obj.url);
  discussionContent.append(a);

  //닉네임 & 날짜
  const discussionInformation = document.createElement('div');
  discussionInformation.className = "discussion__information"
  const span = document.createElement('span');
  span.textContent = obj.author;
  discussionInformation.append(span, obj.createdAt);
  discussionContent.append(discussionInformation);

  //체크박스
  const span1 = document.createElement('span1');
  const span2 = document.createElement('span2');
  const label = document.createElement('label');
  span1.className = 'c1';
  span1.textContent = ' ';
  span2.className = 'c2';
  span2.textContent = ' ';
  label.setAttribute('onclick', 'test(this)');
  label.className = 'cb';
  label.append(span1, span2);
  discussionAnswered.append(label);

  if(obj.answer !== null){
    label.style.borderColor = '#34b93d';
    span1.style.height = '24px';
    span1.style.animation = 'topcheck 0.4s ease 0s forwards';
    span1.style.height = '10px';
    span2.style.animation = 'bottomcheck 0.2s ease 0s forwards';
  }

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  console.log(element);
  element.innerHTML = '';
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

function test(e){
  console.log(e.childNodes);
  e.style.borderColor = '#34b93d';
  e.childNodes[0].style.height = '24px';
  e.childNodes[0].style.animation = 'topcheck 0.4s ease 0s forwards';
  e.childNodes[1].style.height = '10px';
  e.childNodes[1].style.animation = 'bottomcheck 0.2s ease 0s forwards';
  return false;
}
// localStorage.setItem('list' , '[]');
function liSubmit(){
  console.log('ㅎㅇ');
  const title = document.getElementById('title');
  const name = document.getElementById('name');
  const story = document.getElementById('story');
  let arr = JSON.parse(localStorage.getItem('list'));

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let date = today.getDate();
  let hours = String(today.getHours()).padStart(2, '0');
  let minutes = String(today.getMinutes()).padStart(2, '0');
  let seconds = String(today.getSeconds()).padStart(2, '0');

  if(arr === null){ //처음 시작시
    arr = [];
    localStorage.setItem('count', 0);
  }
  console.log(arr);
  if(title.value !== '' && name.value !== '' && story.value !== ''){
    arr.push({'title' : title.value, 'author' : name.value, 'story' : story.value, answer : null ,'createdAt' : year + '-'+month+'-'+date+'T'+hours + ':' + minutes + ':' + seconds+'Z'})
    let change = JSON.stringify(arr)
    localStorage.setItem('list' , change);
    let count = localStorage.getItem('count');
    count++;
    localStorage.setItem('count', count);
    
    agoraStatesDiscussions.unshift(JSON.parse(localStorage.getItem('list'))[count-1]);
    console.log(agoraStatesDiscussions)
    render(ul);
  }
  

  console.log(year + '-'+month+'-'+date+'T'+hours + ':' + minutes + ':' + seconds+'Z');

  // 
}