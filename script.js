// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const onePageViewNum = 5;
let currentPage = 1;

const discussionsContainer = document.querySelector("ul.discussions__container");
const submit = document.querySelector("input[type=submit]");
let author = document.querySelector("#name");
let title = document.querySelector("#title");
let story = document.querySelector("#story");

const userWriteTitle = document.querySelector(".user__write--title");
const userWriteImage = document.querySelector(".user__avatar--image");
const userWriteIdDate = document.querySelector(".user__write--iddate");
const userWriteContent = document.querySelector(".user__write--content");

const question = document.querySelector(".discussion__question");
const formContainer = document.querySelector(".form__container");
const writeContainer = document.querySelector(".write__container");

const parents = document.querySelector(".discussions__container");
const changeName = document.querySelector(".name__change--image");
const inputName = document.querySelector(".change__name--input");

(function init() {
  // 로컬 스토리지에 있는 객체를 더미 데이터에 합치기
  for(let i = 0; i < localStorage.length; i++) {
    agoraStatesDiscussions.unshift(JSON.parse(localStorage.getItem(i+1)));
  }

  // 가장 첫번째 게시글의 내용을 보여주기
  const obj = agoraStatesDiscussions[0];
  userWriteTitle.textContent = obj.title;
  userWriteImage.src = obj.avatarUrl;
  userWriteIdDate.textContent = `${obj.author} | ${new Date(obj.createdAt).toLocaleString()}`;
  userWriteContent.innerHTML = obj.bodyHTML;
})();

// 질문 목록을 눌렀을 때 
const showDiscussion = (i) => {
  const obj = agoraStatesDiscussions[i];

  userWriteTitle.textContent = obj.title;
  userWriteImage.src = obj.avatarUrl;
  userWriteIdDate.textContent = `${obj.author} | ${new Date(obj.createdAt).toLocaleString()}`;
  userWriteContent.innerHTML = obj.bodyHTML;

  writeContainer.classList.remove('hide');
  formContainer.classList.add('hide');

  render(parents, currentPage, +i);
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj, i, active) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  li.setAttribute("onclick", `showDiscussion("${i}");`);
  if(active) li.classList.add("post_active");

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const title = document.createElement("a");
  title.href = obj.url;
  title.textContent = obj.title;
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  // discussionInformation.textContent = obj.author + " | " + new Date(obj.createdAt).toLocaleString();
  discussionInformation.textContent = `${obj.author} | ${new Date(obj.createdAt).toLocaleString()}`;
  discussionTitle.append(title);
  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInformation);

  const answer = document.createElement("p");
  const checked = document.createElement("img");
  checked.className = "check__icon";
  if(obj.answer !== null) {
    checked.src = "./img/check.png";
    // answer.textContent = "☑";
  }else {
    checked.src = "./img/uncheck.png";
    // answer.textContent = "◻️";
  }
  answer.append(checked);
  discussionAnswered.append(answer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;
};


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, pageGroup, currentNum) => {
  // console.log(element, pageGroup, currentNum);
  element.textContent = '';
  let active = false;
  // for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
  for (let i = onePageViewNum * (pageGroup - 1); i < onePageViewNum * (pageGroup - 1) + onePageViewNum; i += 1) {
    active = (i === currentNum) ? true : false; 
    element.append(convertToDiscussion(agoraStatesDiscussions[i], i, active));
  }
  return;
};

function warningToast(str) {
  const toast = document.querySelector(".toast");
  toast.textContent = `${str}을 입력해주세요`;
  toast.classList.add('show');
  setTimeout(function(){ 
    toast.classList.remove('show');
  }, 3000);
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
submit.onclick = (event) => {
  event.preventDefault();

  let agoraStatesDiscussion = {};
  agoraStatesDiscussion.id = self.crypto.randomUUID().substring(0, 8);
  agoraStatesDiscussion.author = author.textContent;
  agoraStatesDiscussion.title = title.value;
  agoraStatesDiscussion.bodyHTML = story.value;
  agoraStatesDiscussion.createdAt = new Date().toString();
  agoraStatesDiscussion.avatarUrl = "https://avatars.githubusercontent.com/u/99889721?v=4";
  agoraStatesDiscussion.answer = null;

  console.log(agoraStatesDiscussion);
  if(title.value === '') {
    warningToast('제목');
    return;
  }
  if(story.value === '') {
    warningToast('내용');
    return;
  }

  discussionsContainer.prepend(convertToDiscussion(agoraStatesDiscussion));

  // 로컬 스토리지에 저장
  let index = localStorage.length;
  localStorage.setItem(++index, JSON.stringify(agoraStatesDiscussion));

  agoraStatesDiscussions.unshift(agoraStatesDiscussion);

  // 입력창 초기화
  author.value = "";
  title.value = "";
  story.value = "";

  currentPage = 1;
  pagination(currentPage); 
}

// 질문하기 버튼 눌렀을 때
question.onclick = (event) => {
  writeContainer.classList.add('hide');
  formContainer.classList.remove('hide');

  const selectedPost = document.querySelector('.post_active');
  selectedPost.classList.remove('post_active');
};

// 페이지네이션
const pagination = () => {
  const totalNum = agoraStatesDiscussions.length; // 41
  const totalPage = Math.ceil(totalNum/onePageViewNum); // 9
  let ul = document.querySelector(".pagination");
  if (ul.firstChild) {
    ul.textContent = "";
  }
  let firstPage = currentPage - (currentPage % onePageViewNum) + 1; // 현재 페이지 그룹 첫번째 숫자
  let lastPage = currentPage - (currentPage % onePageViewNum) + 5; // 현재 페이지 그룹 마지막 숫자
  lastPage = lastPage <= totalPage ? lastPage : totalPage;
  // let temp;
  
  function createLi(text) {
    let li = document.createElement("li");
    li.className = "page";
    li.textContent = `${text}`;
    return li;
  }

  let temp = createLi("<");
  if (firstPage > 5) {
    temp.id = `${firstPage - 5}`;
    temp.addEventListener("click", function () {
      currentPage = +this.id;
      pagination();
    });
  } else {
    temp.classList.add("inactive");
  }
  ul.append(temp);
  
  for (let i = firstPage; i <= lastPage; i++) {
    temp = createLi(`${i}`);
    temp.addEventListener("click", function () {
      changePage(this);
    });
    if (i === currentPage) {
      temp.classList.add("active");
    }
    ul.append(temp);
  }

  temp = createLi(">");
  if (lastPage < totalPage) {
    temp.id = `${lastPage + 1}`;
    temp.addEventListener("click", function () {
      currentPage = +this.id;
      pagination();
    });
  } else {
    temp.classList.add("inactive");
  }
  ul.append(temp);
  showDiscussion(onePageViewNum*(currentPage-1));
  render(parents, currentPage, onePageViewNum*(currentPage-1));
};

const changePage = (selectedPage) => {
  if (selectedPage.classList.contains("active")) {
    return;
  }
  let currentActive = document.querySelector(".active");
  currentActive.classList.remove("active");
  selectedPage.classList.add("active");
  currentPage = +selectedPage.textContent;
  
  showDiscussion(onePageViewNum*(currentPage-1));
  render(parents, currentPage, onePageViewNum*(currentPage-1));
};

pagination(currentPage); 


// 이름 수정하기
changeName.onclick = () => {
  author.classList.add('hide');
  inputName.classList.remove('hide');
  changeName.classList.add('hide');
  inputName.focus();
};

// 수정 완료
inputName.onblur = () => {
  if(inputName.value !== '') {
    author.textContent = inputName.value;
  }
  author.classList.remove('hide');
  inputName.classList.add('hide');
  changeName.classList.remove('hide');
};