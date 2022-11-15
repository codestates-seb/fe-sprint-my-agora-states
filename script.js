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

  // 아바타 이미지
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;

  avatarWrapper.append(avatarImg);

  // 컨텐츠
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";

  const discussionLink = document.createElement("a");
  discussionLink.href = obj.url;
  discussionLink.textContent = obj.title;

  discussionTitle.append(discussionLink);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString("ko-KR")}`;

  discussionTitle.append(discussionLink);
  discussionContent.append(discussionTitle, discussionInfo);

  // 답변 체크표시
  const discussionAnsChek = document.createElement("p");

  if (obj.answer === null) {
    discussionAnsChek.textContent = '☐'
  }
  else {
    discussionAnsChek.textContent = '☑'
  }

  discussionAnswered.append(discussionAnsChek);

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

const submitBtn = document.querySelector('input[type="submit"]');

let nameInput = document.querySelector('#name');
let titleInput = document.querySelector('#title');
let questionInput = document.querySelector('#story');


submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  let newobj = {
    id: "new id",
    createdAt: new Date(),
    title: titleInput.value,
    url: "#",
    author: nameInput.value,
    answer: null,
    bodyHTML: "new bodyHTML",
    avatarUrl:
      "https://e7.pngegg.com/pngimages/223/244/png-clipart-computer-icons-avatar-user-profile-avatar-heroes-rectangle.png",
  }
  agoraStatesDiscussions.unshift(newobj);
  ul.prepend(convertToDiscussion(newobj));
  nameInput.value = '';
  titleInput.value = '';
  questionInput.value = '';
  renderPage(1);
});


//페이지 네이션 구현
const contents = document.querySelector(".contents");
const pageBtn = document.createElement('div');
// const pageBtn = document.querySelector(".pageBtn");

const preBtn = document.createElement('button'); //이전버튼
const nextBtn = document.createElement('button'); //다음버튼

let numOfContents = agoraStatesDiscussions.length;
const showContent = 10;
const showButton = 5;
const maxPage = Math.ceil(numOfContents / 10);
let currentPage = 1;

const makeBtn = (num) => {  //페이지버튼 생성 함수
  let pageNumBtn = document.createElement('button');
  pageNumBtn.className = 'pageBtn';
  pageNumBtn.textContent = num;
  return pageNumBtn;
}

for (i = 1; i <= maxPage; i++) {
  pageBtn.append(makeBtn(i));
}


preBtn.textContent = '<'
nextBtn.textContent = '>'

const pageNation = document.createElement('div');
pageNation.className = 'page';

const secSection = document.querySelector('.discussion__wrapper');

secSection.append(pageNation);
pageNation.append(preBtn, pageBtn, nextBtn);

// 한 페이지에 10개씩 출력하는 함수
const renderPage = (currentPage) => {
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.lastChild)
  }
  for (let num = (currentPage - 1) * showContent + 1; num <= currentPage * showContent && num <= numOfContents; num++) {
    ul.append(convertToDiscussion(agoraStatesDiscussions[num - 1]));
  }
}



renderPage(currentPage);


//버튼 클릭 이벤트
pageBtn.addEventListener('click', (e) => {
  currentPage = Number(e.target.textContent);
  renderPage(currentPage);
})

preBtn.addEventListener('click', () => {
  if (currentPage === 1) {
    alert('첫 페이지입니다.')
  }
  else {
    currentPage = currentPage - 1
    renderPage(currentPage);
  }
})

nextBtn.addEventListener('click', () => {
  if (currentPage === maxPage) {
    alert('마지막 페이지입니다.')
  }
  else {
    currentPage = currentPage + 1
    renderPage(currentPage);
  }
})