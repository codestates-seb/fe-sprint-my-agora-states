// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //avatar
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;

  avatarWrapper.append(avatarImg);

  //discussion
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  // discussion_content
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.className = "discussion__title";
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  //discussion answered
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleDateString()} ${new Date(obj.createdAt).toLocaleTimeString()}`;
  discussionContent.append(discussionTitle, discussionInformation);

  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "✅" : "❎";

  discussionAnswered.append(checked);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;

  const totalPages = Math.ceil(agoraStatesDiscussions.length / pageLimit);
  if (thisPage === totalPages) {
    // 현재 페이지가 마지막 페이지인 경우 다음 페이지로 이동
    changePage(totalPages + 1);
  } else {
    loadList();
  }
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


// input에 입력된 데이터를 불러옵니다.
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const obj = {
    id: "unique id",
    createdAt: new Date().toISOString(),
    createdAt: new Date().toLocaleDateString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://us.123rf.com/450wm/coffeeein/coffeeein1611/coffeeein161100369/65979808-%EA%B0%95%EC%95%84%EC%A7%80-%ED%92%88%EC%A2%85-%EA%B0%9C-%EC%A0%95%EC%82%AC%EA%B0%81%ED%98%95-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg",
  };

  // agoraStatesDiscussions 객체 추가
  agoraStatesDiscussions.unshift(obj);

  //input 초기화
  title.value = "";
  author.value = "";
  textbox.value = "";

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  // 다시 agoraStatesDiscussions 기반으로 화면에 보여주기 (렌더링)
  render(ul);
})


//페이지네이션
let thisPage = 1; //현재 페이지
let pageLimit = 8; //한 페이지에 보이는 글 수
let list = document.querySelectorAll('.discussion__container');

function loadList() {
  let list = document.querySelectorAll('.discussion__container');

  let startContent = pageLimit * (thisPage - 1); // 현재 페이지에서 보여줄 첫 번째 글 인덱스 계산
  let lastContent = pageLimit * thisPage - 1; // 현재 페이지에서 보여줄 마지막 글의 인덱스를 계산 

  // 현재 페이지에서 보여줄 글만 화면에 표시
  list.forEach((item, key) => {
    if (key >= startContent && key <= lastContent) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  })
  listPage();
}
loadList();


// 현재 페이지 번호와 전체 페이지 수를 나타내는 페이지 번호 링크를 생성
function listPage() {
  /* 41/8 => 페이지 수 */
  let count = Math.ceil(list.length / pageLimit);
  document.querySelector('.listPage').innerHTML = '';
  // 
  if (thisPage !== 1) {
    let prev = document.createElement('li');
    prev.innerText = '<';
    prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
    document.querySelector('.listPage').appendChild(prev);
  }

  for (let i = 1; i <= count; i++) {
    let newPage = document.createElement('li');
    newPage.innerText = i;
    if (i === thisPage) {
      newPage.classList.add('active');
    }
    newPage.setAttribute('onclick', "changePage(" + i + ")");
    document.querySelector('.listPage').appendChild(newPage);
  }

  if (thisPage !== count) {
    let next = document.createElement('li');
    next.innerText = '>';
    next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
    document.querySelector('.listPage').appendChild(next);
  }
}

function changePage(i) {
  thisPage = i;
  loadList();
}

