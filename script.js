// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container";
  li.classList.add('discussion__card') // 클래스 이름 지정

  const discussionInformation = document.createElement("div")
  discussionInformation.className = "discussion__information";
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img');//프로필사진
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.setAttribute('class','discussion__avatar--image');
  avatarWrapper.append(avatarImg);

  const discussionAuthor = document.createElement("p");//author
  discussionAuthor.className = "discussion_author";
  discussionAuthor.textContent = obj.author;

  const discussionDate = document.createElement("p");//date
  discussionDate.className = "discussion_date";
  discussionDate.textContent = new Date().toDateString();
  discussionInformation.append(avatarWrapper, discussionAuthor, discussionDate);

  const discussionLine = document.createElement('hr');
  discussionLine.className = "disscusion__card--hr";

  const checked = document.createElement('img');
  checked.src = obj.answer ? './img/icon_answered.svg' : './img/icon_question.svg';
  discussionAnswered.append(checked);
  const discussionTitle = document.createElement('h2'); //타이틀
  discussionTitle.className = "discussion__title"
  const discussionTitleLink = document.createElement('a'); //타이틀링크 
  discussionTitleLink.textContent = obj.title;
  discussionTitleLink.setAttribute('href', obj.url);
  discussionTitle.append(discussionTitleLink);
  discussionContent.append(discussionAnswered, discussionTitle)

  li.append(discussionInformation, discussionLine,discussionContent);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    //여기서 convertToDiscussion의 전달인자가 입력 ( obj = agroaStatesDiscussion[i] )
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//form 요소 가져오기
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

// submit form data 가져오기
form.addEventListener("submit", (event) => {
  event.preventDefault(); //서브밋 이벤트로 사용시 꼭 함께 사용해주어야함
  const newDiscussion = {
    id: "unique value",
    createdAt: new Date().toDateString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    bodyHTML: textbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/124783124?s=400&u=4d629ec2d4bec32bf069cb21fa71c8245f41d8ad&v=4"
  };


  ul.prepend(convertToDiscussion(newDiscussion));
  modal.style.display = 'none'; //팝업 끄기
  form.reset(); // 입력 리셋
})

//모달팝업 창
const btn = document.getElementById('popupBtn');
const modal = document.getElementById('modalWrap');
const closeBtn = document.getElementById('closeBtn');

btn.onclick = () => {
  modal.style.display = 'flex';
}
closeBtn.onclick = () => {
  modal.style.display = 'none';
}

window.onclick = e => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

//페이지네이션
const itemsPerPage = 15; // 각 페이지에 표시할 항목의 수
const paginationContainer = document.createElement("div"); // 페이지 버튼이 표시될 div 요소

const numPages = Math.ceil(ul.children.length / itemsPerPage); // 전체 페이지 수

for (let i = 1; i <= numPages; i++) {
  const button = document.createElement("button");
  button.textContent = i;

  button.addEventListener("click", () => {
    // 해당 페이지의 항목을 보여주는 함수를 호출
    showPage(i);
  });

  paginationContainer.appendChild(button);
}

function showPage(pageNumber) {
  // 해당 페이지에 표시될 첫 번째 항목의 인덱스
  const startIndex = (pageNumber - 1) * itemsPerPage;
  // 해당 페이지에 표시될 마지막 항목의 인덱스
  const endIndex = startIndex + itemsPerPage - 1;

  // 모든 항목을 숨김
  for (let i = 0; i < ul.children.length; i++) {
    ul.children[i].style.display = "none";
  }

  // 해당 페이지에 속한 항목을 표시
  for (let i = startIndex; i <= endIndex && i < ul.children.length; i++) {
    ul.children[i].style.display = "block";
  }
  
}
showPage(1);// 페이지 버튼을 누르기 전에는 페이지 1 유지

ul.parentNode.insertBefore(paginationContainer, ul.nextSibling);

//textarea 사용자 입력에 맞춰 늘어나기
const textarea = document.querySelector('#story');

function resize() {
  textarea.style.height = "1px";
  textarea.style.hegiht = (20 + textarea.scrollHeight)+"px";
}