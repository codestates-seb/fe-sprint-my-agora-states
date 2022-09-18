// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions);

let data;
/* 로컬 스토리지 */
// 로컬 스토리지에 저장된 데이터를 가져온다(이 때, 데이터는 JSON 문자열로 되어있음)
const dataFromLocalStorage = localStorage.getItem("agoraStatesDiscussions");
if (dataFromLocalStorage) {
  // 가져온 JSON 문자열을 객체로 변환한다.
  data = JSON.parse(dataFromLocalStorage);
} else {
  // 만약 로컬스토리지가 비어있으면 data에 agoraStatesDiscussions 배열을 저장해준다.
  data = agoraStatesDiscussions.slice();
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

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 아바타 영역
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 콘텐츠 영역
  const titleName = document.createElement('h2');
  titleName.className = "discussion__title";
  const titleLink = document.createElement('a');
  titleLink.setAttribute("href",obj.url);
  // titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  titleName.append(titleLink);

  const information = document.createElement('div');
  information.className = "discussion__information";
  information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;
  discussionContent.append(titleName, information);

  // 체크박스 영역
  const answered_emoji = document.createElement('p');
  answered_emoji.className = "discussion__answered";
  answered_emoji.textContent = obj.answer ? '☑' : '☒';
  discussionAnswered.append(answered_emoji);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, from, to) => {
  console.log(from, to);
  if (!from && !to) {
    from = 0;
    to = data.length - 1;
  }
  // 다 지우고 배열에 있는 내용 다 보여주기
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = from; i < to; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

// 페이지네이션을 위한 변수
let limit = 10,
  page = 1;

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 0, limit);

const getPageStartEnd = (limit, page) => {
  const len = data.length - 1;
  let pageStart = Number(page - 1) * Number(limit);
  let pageEnd = Number(pageStart) + Number(limit);
  if (page <= 0) {
    pageStart = 0;
  }
  if (pageEnd >= len) {
    pageEnd = len;
  }
  return { pageStart, pageEnd };
};

const buttons = document.querySelector(".buttons");
buttons.children[0].addEventListener("click", () => {
  if (page > 1) {
    page = page - 1;
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});

buttons.children[1].addEventListener("click", () => {
  if (limit * page < data.length - 1) {
    page = page + 1;
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});

buttons.children[2].addEventListener("click", () => {
  localStorage.removeItem("agoraStatesDiscussions");
  data = agoraStatesDiscussions.slice();
  limit = 10;
  page = 1;
  render(ul, 0, limit);
});

const form = document.querySelector('.form');
let elName =  document.querySelector('.form__input--name > input');
let elTitle =  document.querySelector('.form__input--title > input');
let elStory =  document.querySelector('.form__textbox > textarea');
const randomAvatar= ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1B4uflzH2bZd3i1edrC2Td9JWtXTP48k7AQ&usqp=CAU","https://i.pinimg.com/originals/1a/97/7b/1a977b5b0d6a8e8f62b3ba2dfd6d3150.jpg","https://www.sqler.com/files/attach/images/2020/12/28/243b820c83ce80838ac870d11b8fe7af.jpg","https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/717/887e0550fb7030f257ae4b39a6719a25_res.jpeg","https://1.gall-img.com/hygall/files/attach/images/82/997/219/228/5f9f339fbc3309a33f6c2a19be58d6ae.jpg","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_X7O0aqGRB3DcNihsI7IIxxF5SJJxIeUjlH5qhj6A14XTXPANlB-sAekhAdH1PjZC-yA&usqp=CAU"];

form.addEventListener('submit', (event) =>{
  // 새로고침 발생하지 않게
  event.preventDefault();
  let newDisscussion = new Object();
  newDisscussion.id = "unique number";
  newDisscussion.author = elName.value;
  newDisscussion.title = elTitle.value;
  newDisscussion.createdAt = new Date().toISOString();
  newDisscussion.answer = null;
  // 이미지 랜덤으로 보여지게
  newDisscussion.avatarUrl = randomAvatar[Math.floor(Math.random()*randomAvatar.length)];
  data.unshift(newDisscussion);

  // 로컬스토리지에 저장(data를 문자열로 바꿔줌)
  localStorage.setItem("agoraStatesDiscussions", JSON.stringify(data));

  ul.prepend(convertToDiscussion(newDisscussion));
  elTitle.value = "";
  elStory.value = "";
  elName.value = "";
})

