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

  // 아바타이미지
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // Discusstion 제목
  const H2 = document.createElement('h2'); // h2 tag create
  H2.className = 'discussion__title';
  const a = document.createElement('a'); // a tag create
  a.href = obj.url;
  a.textContent = obj.title;
  H2.append(a); // append a tag to h2 tag

  // Discusstion information
  const information = document.createElement('div');
  information.className = 'discussion__information';
  information.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(H2, information); // append h2 tag to discussion__content class

  // Discusstion answered
  const answered = document.createElement('div');
  answered.className = 'discussion__answered';
  const p = document.createElement('p');
  obj.checkbox ? p.textContent = '☒' : p.textContent = '☑'; // 새로 들어오는 데이터는 체크박스 x
  answered.append(p);
  discussionAnswered.append(answered);


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

// 로컬스토리지 데이터를 agoraStatesDiscussions배열에 추가하는 함수
const addLocalStorageData = () => {
  let keys = Object.keys(localStorage);
  for (let key of keys.sort())
    agoraStatesDiscussions.unshift(JSON.parse(localStorage.getItem(key)));
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
addLocalStorageData(); // 로컬스토리지 데이터를 agoraStatesDiscussions배열에 추가


// 디스커션 추가 기능 submit버튼 누르면 실제 디스커션이 추가되어야 한다.
const submit = document.querySelector(".submit"); // submit버튼
const author = document.querySelector(".form__input--name #name");
const title = document.querySelector(".form__input--title #name");

const addDiscussions = () => {
  if (author.value == '' || title.value == '') return alert("Error : 입력란을 채워주세요")
  const cutDate = new Date().toLocaleString();
  const avatarURL = 'https://w7.pngwing.com/pngs/395/693/png-transparent-smiley-emoticon-smiley-miscellaneous-face-smiley.png';
  const obj = {
    author: author.value,
    title: title.value,
    createdAt: cutDate,
    avatarUrl: avatarURL,
    url: 'https://velog.io/@zer0jun',
    checkbox: "☒"
  };
  const objString = JSON.stringify(obj); // 객체 문자열로 변환
  // 현재시간 key, value는 객체로 하여 배열을 문자열로 변환한 후 로컬스토리지에 저장.
  localStorage.setItem(cutDate, objString);

  agoraStatesDiscussions.push(obj);
  console.log(agoraStatesDiscussions);
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[agoraStatesDiscussions.length - 1]));
  alert("Discusstion 등록 완료");
}

submit.addEventListener('click', addDiscussions)



//// 페이지네이션
// 필요 변수 선언
const maxContent = 10;
const maxButton = 3;
const contents = document.querySelector(".contents");
const buttons = document.querySelector(".buttons");
const prev = document.createElement("button");
const next = document.createElement("button");
const numOfContent = agoraStatesDiscussions.length;
const maxPage = Math.ceil(numOfContent / maxContent);
let page = 1;

// 글 목록 & 버튼 생성 함수 구현
const makeContent = (id) => {
  const content = document.createElement("li");
  content.classList.add("content");
  content.innerHTML = ` 
  <span class="content__id">${id}</span> 
  <span class="content__title">게시물 제목</span> 
  <span class="content__author">작성자</span> 
  <span class="content__date">2022.01.01</span> 
  `;
  return content;
};

const makeButton = (id) => {
  const button = document.createElement("button");
  button.classList.add("button");
  button.dataset.num = id;
  button.innerText = id;
  button.addEventListener("click", (e) => {
    Array.prototype.forEach.call(buttons.children, (button) => {
      if (button.dataset.num) button.classList.remove("active");
    });
    e.target.classList.add("active");
    console.log(parseInt(e.target.dataset.num));
    renderContent(parseInt(e.target.dataset.num));
  });
  return button;
};

// 렌더링 함수 구현
const renderContent = (page) => {
  // 목록 리스트 초기화 
  while (contents.hasChildNodes()) { contents.removeChild(contents.lastChild); }
  // 글의 최대 개수를 넘지 않는 선에서, 화면에 최대 10개의 글 생성 
  for (let id = (page - 1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
    //contents.appendChild(makeContent(id)); 
    contents.appendChild(convertToDiscussion(agoraStatesDiscussions[id - 1]));
  }
};
const renderButton = (page) => {
  // 버튼 리스트 초기화 
  while (buttons.hasChildNodes()) {
    buttons.removeChild(buttons.lastChild);
  }
  // 화면에 최대 5개의 페이지 버튼 생성 
  for (let id = page; id < page + maxButton && id <= maxPage; id++) {
    buttons.appendChild(makeButton(id));
  }
  // 첫 버튼 활성화(class="active") 
  buttons.children[0].classList.add("active");
  buttons.prepend(prev);
  buttons.append(next);
  // 이전, 다음 페이지 버튼이 필요한지 체크 
  if (page - maxButton < 1) buttons.removeChild(prev); if (page + maxButton > maxPage) buttons.removeChild(next);
};
const render2 = (page) => {
  renderContent(page);
  renderButton(page);
};

const goPrevPage = () => {
  page -= maxButton; render2(page);
};
const goNextPage = () => {
  page += maxButton; render2(page);
};
prev.classList.add("button", "prev");
prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
prev.addEventListener("click", goPrevPage);
next.classList.add("button", "next");
next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
next.addEventListener("click", goNextPage);

// 스크롤 / 페이징 모드 전환
const discussionWrapper = document.querySelector(".discussion__wrapper");
const article = document.querySelector(".article");
const switchBtn = document.querySelector(".switch-button input");
const convertText = document.querySelector(".convertText");
render(ul); // 스크롤 모드
var toggle = (function () {
  var isShow = false;
  return function () {
    // box.style.display = isShow ? 'block' : 'none';
    if (!isShow) {
      discussionWrapper.style.display = 'none';
      article.style.display = 'block';
      convertText.textContent = "Pagination Mode";
      render2(page); // 페이징 모드
    }
    else {
      discussionWrapper.style.display = 'block';
      article.style.display = 'none';
      convertText.textContent = "Scroll Mode";
    }
    isShow = !isShow;
    console.log("확인");
  };
})();
switchBtn.onclick = toggle;
