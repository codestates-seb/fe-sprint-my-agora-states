const form = document.querySelector(".form");
const authorName = document.querySelector('#name');
const titleName = document.querySelector('#titleName')
const story = document.querySelector('#story')
const ul = document.querySelector("ul.discussions__container");
const powerUp = document.querySelector('#powerUp')
const upBtn = document.querySelector('#upBtn')
const downBtn = document.querySelector('#downBtn')
let lastLi;
let testArr = [];
let bestBox = [];
let lastBox = [];
//json데이터를 받아서 질문을 등록하기 위한 함수
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = "discussion__title";
  const anchor = document.createElement('a');
  anchor.innerText = `${obj.title}`
  anchor.href = obj.url
  const discussionInformation = document.createElement("div");
  discussionInformation.className = 'discussion__information'
  let saveTime = new Date(obj.createdAt);
  discussionInformation.innerText = `${obj.author} / ${Unix_timestamp(Unix_timestampConv(saveTime))}`
  discussionTitle.append(anchor, discussionInformation);
  discussionContent.append(discussionTitle, discussionInformation);
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const span = document.createElement("span");
  span.className = 'likeNum'
  const likeBtn = document.createElement("button");
  const likeBtnImg = document.createElement("img");
  likeBtn.className = 'likeBtn'
  likeBtnImg.className = 'likeBtnImg'
  likeBtn.append(likeBtnImg)
  likeBtnImg.src = './img/like.png'
  discussionAnswered.append(likeBtn)
  obj.like = Math.floor(Math.random() * 5);
  let like = 0;
  likeBtn.addEventListener('click', () => {
    if (like < 1) {
      like++;
      span.innerText = `${obj.like + like}`;
      likeBtnImg.src = './img/like%20(1).png'
    } else if (like === 1) {
      like--;
      span.innerText = `${obj.like - like}`;
      likeBtnImg.src = './img/like.png'
    }
  })
  span.innerText = `${obj.like}`
  discussionAnswered.append(span);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
//localStorage가 비었다면 생성해서 넣고 값이 존재하면 그대로 진행
if (!localStorage.test2) {
  localStorage.setItem('test2', JSON.stringify(testArr))
} else {
  testArr = JSON.parse(localStorage.getItem('test2'))
}
//최초 랜더링을 위한 함수
const render = (element) => {
  for (i of JSON.parse(localStorage.getItem('test2'))) {
    agoraStatesDiscussions.unshift(i)
  }
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  bestBoxDisplay()
  liDistance()
  return;
};
render(ul);
//ul 자식요소 모두 제거하는 함수
function removeUlChild() {
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.firstChild);
  }
}
//질문등록 이벤트
form.onsubmit = function () {
  let submitArr = [];
  localStorage.setItem('test', JSON.stringify(submitArr))
  removeUlChild()
  const obj = {
    createdAt: new Date(),
    title: titleName.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: authorName.value,
    avatarUrl: "./img/guitar.png"
  }
  submitArr.unshift(obj)
  testArr.push(obj)
  localStorage.setItem('test', JSON.stringify(submitArr))
  localStorage.setItem('test2', JSON.stringify(testArr))
  for (i of JSON.parse(localStorage.getItem('test'))) { agoraStatesDiscussions.unshift(i) }
  console.log(agoraStatesDiscussions)
  render2(ul);
  titleName.value = '';
  authorName.value = '';
  story.value = '';
  return false;
}
//질문 등록시 실행되서 모두 리셋해주는 버튼
const render2 = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  bestBoxDisplay()
  liDistance()
  li = document.querySelector('li')
  tryChance = Math.floor(liDistanceView / 500 - 1)
  liDistanceView = lastLi.getBoundingClientRect().top - li.getBoundingClientRect().top;
  count = 0;
  height = 0;
  ul.scrollTo({ left: 0, top: 0, behavior: "smooth" })
  return;
};
//스크롤 관련 선언들, 요소의 좌표 구하기 참고 : https://mommoo.tistory.com/85 / https://maxkim-j.github.io/posts/dom-pos-scroll/
let li = document.querySelector('li')
let liDistanceView = lastLi.getBoundingClientRect().top - li.getBoundingClientRect().top;
let tryChance = Math.floor(liDistanceView / 500 - 1)
let count = 0;
let height = 0;
//마지막 li를 구하기 위한 함수
function liDistance() {
  const allLi = document.querySelectorAll('li')
  for (let i = allLi.length - 1; i < allLi.length; i++) {
    lastLi = allLi[i]
  }
}
//맨 위로 올라가는 버튼
powerUp.addEventListener('click', () => {
  height = 0;
  ul.scrollTo({ left: 0, top: 0, behavior: "smooth" })
  count = 0;
})
//밑으로 내려가는 버튼
downBtn.addEventListener('click', () => {
  // lastLiDistanceFromViewport = lastLi.getBoundingClientRect().top;
  liDistanceView = lastLi.getBoundingClientRect().top - li.getBoundingClientRect().top;
  if (count < tryChance) {
    height = height + 500;
    ul.scrollTo({ left: 0, top: height, behavior: "smooth" });
    count++;
  } else if (liDistanceView - height < 500) {
    return
  }
  else if (count === tryChance) {
    height = height + (liDistanceView % 500 + 100)
    ul.scrollTo({ left: 0, top: height, behavior: "smooth" });
  }
})
//위로 올라가는 버튼
upBtn.addEventListener('click', () => {
  liDistanceView = lastLi.getBoundingClientRect().top - li.getBoundingClientRect().top;
  if (height === 0) {
    return
  }
  if (height % 500 !== 0) {
    height = height - 500 - (liDistanceView % 500 + 100)
    ul.scrollTo({ left: 0, top: height, behavior: "smooth" })
    count--;
  } else {
    height = height - 500;
    ul.scrollTo({ left: 0, top: height, behavior: "smooth" });
    count--;
  }
})
//시간 관련 출처 : https://reword12.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-Unix-TimeStamp%EB%B3%80%ED%99%98-javascript
function Unix_timestamp(t) {
  var date = new Date(t * 1000);
  var year = date.getFullYear();
  var month = "0" + (date.getMonth() + 1);
  var day = "0" + date.getDate();
  var hour = "0" + date.getHours();
  var minute = "0" + date.getMinutes();
  var second = "0" + date.getSeconds();
  if (hour < 12) {
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " 오전 " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
  } else {
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " 오후 " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
  }
}
function Unix_timestampConv(t) {
  return Math.floor(t.getTime() / 1000);
}
//좋아요 높은 질문
function bestBoxDisplay() {
  bestBox = [];
  lastBox = [];
  for (i of agoraStatesDiscussions) {
    if (i.like >= 4) {
      bestBox.push(i)
    }
  }
  lastBox = bestBox.slice(0, 2)
  leftTime.innerText = `${Unix_timestamp(Unix_timestampConv(new Date(lastBox[0].createdAt)))}`
  leftTitle.innerText = lastBox[0].title
  leftAuthor.innerText = lastBox[0].author
  leftImg.src = lastBox[0].avatarUrl
  rightTime.innerText = `${Unix_timestamp(Unix_timestampConv(new Date(lastBox[1].createdAt)))}`
  rightTitle.innerText = lastBox[1].title
  rightAuthor.innerText = lastBox[1].author
  rightImg.src = lastBox[1].avatarUrl
}