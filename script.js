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
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement('h2'); 
  contentTitle.className = "discussion__title"; 
  discussionContent.append(contentTitle);

  const contentLink = document.createElement('a');
  contentLink.href = obj.url; 
  contentLink.textContent = obj.title; 
  contentTitle.append(contentLink); 

  const createdAtDate = new Date(obj.createdAt).toLocaleString();  //날짜 재정비(?)
  const contentInfo = document.createElement('div'); 
  contentInfo.className = "discussion__information"; 
  contentInfo.textContent = `${obj.author}/ ${createdAtDate}`
  discussionContent.append(contentInfo); 

  const contentAnswered = document.createElement('p');
  contentAnswered.className = "discussion__answered"; 

  if (obj.answer === null) {
    contentAnswered.textContent = '👨‍💻검토중'
  } else {
    contentAnswered.textContent = '❤️답변 완료'
  }
  discussionAnswered.append(contentAnswered); 

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

const pages = document.querySelector(".page");
const showContent = 5; //한페이지 최대 글 개수
const showButton = 5; // 한페이지 페이지버튼 개수
let page = 1; // 첫페이지

const makeButton=(id) => {
  const button = document.createElement("button");
  button.classList.add("button");
  button.dataset.num = id;
  button.innerText = id;
  button.addEventListener("click", (e) => {
    //버튼 클릭시 class 조정
    //e.preventDefault();
    Array.prototype.forEach.call(pages.children, (button) => {
      if (button.dataset.num) button.classList.remove("active");
    });
    e.target.classList.add("active");
    renderContent(parseInt(e.target.dataset.num));
  });
  return button;
}
const renderContent = (page) => {
  // 목록 리스트 초기화
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.lastChild);
  }

  // 5개의 글이 보이게
  for (
    let id = (page - 1) * showContent + 1;
    id <= page * showContent && id <= agoraStatesDiscussions.length;
    id++
  ) {
    ul.appendChild(convertToDiscussion(agoraStatesDiscussions[id - 1]));
  }
};

// 페이지이동
const goPrevPage = () => {
  page -= showButton;
  render1(page);
};

const goNextPage = () => {
  page += showButton;
  render1(page);
};
// 이전 다음 버튼 생성
const prev = document.createElement("button");
prev.classList.add("button", "prev");
prev.innerHTML = "<<";
prev.addEventListener("click", goPrevPage);

const next = document.createElement("button");
next.classList.add("button", "next");
next.innerHTML = ">>";
next.addEventListener("click", goNextPage);

const renderButton = (page) => {
  const maxPage = Math.ceil(agoraStatesDiscussions.length / showContent); //최대 페이지 수
  // 버튼 리스트 초기화
  while (pages.hasChildNodes()) {
    pages.removeChild(pages.lastChild);
  }
  // showButton 만큼 페이지버튼이 보이게
  for (let id = page; id < page + showButton && id <= maxPage; id++) {
    pages.appendChild(makeButton(id));
  }
  // active 옵션
  pages.children[0].classList.add("active");

  pages.prepend(prev);
  pages.append(next);

  // 이전, 다음 페이지 버튼이 필요한지 체크
  if (page - showButton < 1) pages.removeChild(prev);
  if (page + showButton > maxPage) pages.removeChild(next);
};

// 종합 랜더링
const render1 = (page) => {
  renderContent(page);
  renderButton(page);
};
render1(page);

//이제 입력이 가능하게 구현

const inputform = document.querySelector("form.form") //입력창 전체
const inputName = document.querySelector("#name") // 작성자
const inputTitle = document.querySelector("#title") // 제목
const inputStory = document.querySelector("#story") // 내용

inputform.addEventListener("submit", (event) => {
  event.preventDefault(); // 업로드를 하였을 때 새로고침되는 증상 방지
  const newDiscussions = { 
    id: 'id', 
    createdAt: new Date(),
    title: inputTitle.value,
    url: "http://www.naver.com",
    author: inputName.value,
    answer: null,
    bodyHTML: inputStory.value,
    avatarUrl: "unknown.png",
  };
  agoraStatesDiscussions.unshift(newDiscussions); 
  const discussion = convertToDiscussion(newDiscussions); 
  ul.prepend(discussion); 

  inputName.value = '';
  inputTitle.value = '';
  inputStory.value = '';

  render1(page);   //입력되고 나서 맨 끝 게시물은 다음 페이지로 넘어가게
});

