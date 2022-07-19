// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

// agoraStatesDiscussions는 상수이므로 items로 재선언
let items = agoraStatesDiscussions;


// 로컬 저장소에 agoraStatesDiscussions 라는 데이터가 있다면 items 덮어씌우기
if (localStorage.key('agoraStatesDiscussions')) {
  items = JSON.parse(localStorage.getItem('agoraStatesDiscussions'));
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

  // title 생성
  const title = document.createElement('h2'); 
  title.className = 'discussion__title'; // css 적용을 위해 class 지정

  // a 태그 생성
  const aEl = document.createElement('a');
  aEl.href = obj.url;
  aEl.textContent = obj.title;
  title.append(aEl);
  discussionContent.append(title);

  const date = new Date(obj.createdAt).toLocaleString('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  // information 생성
  const information = document.createElement('div');
  information.className = 'discussion__information';
  information.textContent = `${obj.author} / ${date}`
  discussionContent.append(information);

  // answer 생성
  if(obj.answer === null) {
    discussionAnswered.textContent = '☑️';
  } else {
    discussionAnswered.textContent = '✅';
  }

  const avatarImg = document.createElement('img');
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarImg.className = 'discussion__avatar--image'
    avatarWrapper.append(avatarImg);
    
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// submit 전달 
function submit123(e) {
  // submit으로 페이지가 새로고침 되는것을 방지
  e.preventDefault();
  e.stopPropagation();

  const name = document.getElementById('name').value;
  const inputTitle = document.getElementById('title').value;
  const story = document.getElementById('story').value;

  // items에 아이템 추가 (앞에서 추가)
  items.unshift({
    createdAt: new Date().toISOString(),
    author: name,
    title: inputTitle,
    bodyHTML: story,
    avatarUrl:
    "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  });

  // items가 변경된 값 로컬 저장소와 동기화
  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(items));
  
  // items가 변경되었으므로 다시 HTML 그리기
  render();

  // submit으로 페이지가 새로고침 되는것을 방지
  return false;
}

  
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = () => {
  const ul = document.querySelector("ul.discussions__container");

  // ul 안에 요소들 전부 삭제
  ul.innerHTML = '';

  for (let i = 0; i < items.length; i += 1) {
    ul.append(convertToDiscussion(items[i]));
  }
};

render();
