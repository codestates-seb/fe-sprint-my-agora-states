// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

function createdAt(obj) {
  if (+obj.createdAt.split('T')[1].slice(0,2)+9 > 24) {
    obj.createdAt = `오전 ${+obj.createdAt.split('T')[1].slice(0,2)-15}${obj.createdAt.split('T')[1].slice(2,-1)}`;
  } else if (+obj.createdAt.split('T')[1].slice(0,2)+9 > 12) {
    obj.createdAt = `오후 ${+obj.createdAt.split('T')[1].slice(0,2)-3}${obj.createdAt.split('T')[1].slice(2,-1)}`;
  } else {
    obj.createdAt = `오전 ${+obj.createdAt.split('T')[1].slice(0,2)+9}${obj.createdAt.split('T')[1].slice(2,-1)}`;
  }
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 세 컨테이너
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 아바타 이미지
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 컨텐트 제목, 작성 정보
  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title";
  discussionContent.append(contentTitle);

  const titleAnchor = document.createElement('a');
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  contentTitle.append(titleAnchor);

  const contentInfo = document.createElement('div');
  contentInfo.className = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${obj.createdAt}`
  discussionContent.append(contentInfo);

  // 답변 여부
  const isAnswered = document.createElement('p');
  isAnswered.textContent = obj.answer ? '☑' : '☒';
  discussionAnswered.append(isAnswered);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    createdAt(agoraStatesDiscussions[i]);
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const submitBtn = document.querySelector('.form');
submitBtn.onsubmit = function () {
  const name = this.name.value;
  const title = this.title.value;
  const story = this.story.value;
  let now = new Date();
  now = '오' + now.toLocaleString().split('오')[1];

  agoraStatesDiscussions.unshift({
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    title: title,
    author: name,
    createdAt: now
  })
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
  console.log(agoraStatesDiscussions);

  this.name.value = '';
  this.title.value = '';
  this.story.value = '';

  return false;
}


document.querySelector('.leftBtn').addEventListener('click',setRight);
document.querySelector('.rightBtn').addEventListener('click',setLeft);
document.querySelector('.nowPage').textContent = `1 / ${Math.ceil(agoraStatesDiscussions.length/10)}`;
let nowPage = 1;

function setLeft() {
  if (nowPage < Math.ceil(agoraStatesDiscussions.length/10)) { 
    document.querySelectorAll('.discussion__container').forEach(el => el.style.transform = `translateX(${(-540*(nowPage))}px)`);
    nowPage++;
    document.querySelector('.nowPage').textContent = `${nowPage} / ${Math.ceil(agoraStatesDiscussions.length/10)}`
  }
}
function setRight() {
  if (nowPage > 1) {
    nowPage--;
    document.querySelector('.nowPage').textContent = `${nowPage} / ${Math.ceil(agoraStatesDiscussions.length/10)}`
    document.querySelectorAll('.discussion__container').forEach(el => el.style.transform = `translateX(${-540*(nowPage-1)}px)`);
  }
}
