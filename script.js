// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(!localStorage.getItem("agoraArr"));

// 로컬스토리지
if (!localStorage.getItem("agoraArr")) {
  localStorage.setItem("agoraArr",JSON.stringify(agoraStatesDiscussions));
  var agora = localStorage.getItem("agoraArr");
  var agoraArr = JSON.parse(agora);
}
agora = localStorage.getItem("agoraArr");
agoraArr = JSON.parse(agora);
// 로컬스토리지


// 시간 포맷 변경
function createdAt(obj) {
  if (!obj.rendered && obj.id) { // 렌더된적없으면서 id가 있는 값
    if (+obj.createdAt.split('T')[1].slice(0,2)+9 > 24) {
      obj.createdAt = `오전 ${+obj.createdAt.split('T')[1].slice(0,2)-15}${obj.createdAt.split('T')[1].slice(2,-1)}`;
    } else if (+obj.createdAt.split('T')[1].slice(0,2)+9 > 12) {
      obj.createdAt = `오후 ${+obj.createdAt.split('T')[1].slice(0,2)-3}${obj.createdAt.split('T')[1].slice(2,-1)}`;
    } else {
      obj.createdAt = `오전 ${+obj.createdAt.split('T')[1].slice(0,2)+9}${obj.createdAt.split('T')[1].slice(2,-1)}`;
    }
  }
}
// 시간 포맷 변경

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
let toRender = !agoraArr ? agoraStatesDiscussions : agoraArr
console.log(toRender)
const render = (element) => {
  for (let i = 0; i < toRender.length; i += 1) {
    createdAt(toRender[i]);
    toRender[i].rendered = true;
    element.append(convertToDiscussion(toRender[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// submit 버튼
const submitBtn = document.querySelector('.form');
submitBtn.onsubmit = function () {
  const name = this.name.value;
  const title = this.title.value;
  const story = this.story.value;
  let now = new Date();
  now = '오' + now.toLocaleString().split('오')[1];

  agoraArr.unshift({
    avatarUrl: "./profile.jpeg",
    title: title,
    author: name,
    createdAt: now
  })
  ul.prepend(convertToDiscussion(agoraArr[0]));
  localStorage.setItem("agoraArr",JSON.stringify(agoraArr));


  this.name.value = '';
  this.title.value = '';
  this.story.value = '';

  return false;
}
// submit 버튼

// 페이지네이션 
document.querySelector('.leftBtn').addEventListener('click',setRight);
document.querySelector('.rightBtn').addEventListener('click',setLeft);
document.querySelector('.nowPage').textContent = `1 / ${Math.ceil(agoraStatesDiscussions.length/10)}`;
let nowPage = 1;
function btnColor () {
  if (nowPage === 1) {
    document.querySelector('.leftBtn').style.background = 'grey';
  } else if (nowPage === Math.ceil(agoraStatesDiscussions.length/10)) {
    document.querySelector('.rightBtn').style.background = 'grey';
  } else {
    document.querySelector('.leftBtn').style.background = '#F66B0E';
    document.querySelector('.rightBtn').style.background = '#F66B0E';
  }
}

btnColor();
function setLeft() {
  if (nowPage < Math.ceil(agoraStatesDiscussions.length/10)) { 
    document.querySelectorAll('.discussion__container').forEach(el => el.style.transform = `translateX(${(-540*(nowPage))}px)`);
    nowPage++;
    document.querySelector('.nowPage').textContent = `${nowPage} / ${Math.ceil(agoraStatesDiscussions.length/10)}`
    btnColor();
  }
}
function setRight() {
  if (nowPage > 1) {
    nowPage--;
    document.querySelector('.nowPage').textContent = `${nowPage} / ${Math.ceil(agoraStatesDiscussions.length/10)}`
    document.querySelectorAll('.discussion__container').forEach(el => el.style.transform = `translateX(${-540*(nowPage-1)}px)`);
    btnColor();
  }
}
// 페이지네이션