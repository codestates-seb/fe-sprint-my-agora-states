// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

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
  // render함수는 agoraStatesDiscussions의 모든 데이터를 convertToDiscussion에 넣음
  // convertToDiscussion이 실행되고 나면 모든 discussion데이터가 li에 추가됨
  // convertToDiscussion에서 해야할 일: avatar이미지, discussion content, answered 내용 추가
  // 1. avatar이미지 추가
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 2. discussion content 추가
  //  1) title(a-링크, title-textContent)
  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title";
  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  contentTitle.append(titleLink);
  //  2) information(div, textContent)
  const contentInformation = document.createElement('div');
  contentInformation.className = "discussion__information";
  const str = obj.createdAt;
  const dateTime = `${str.slice(0, 10)} ${str.slice(11, 19)}`
  contentInformation.textContent = `${obj.author} / ${dateTime}`;
  discussionContent.append(contentTitle, contentInformation);

  // 3. answered 내용 추가 -> <p>태그 안에 textcontent 추가
  const answered = document.createElement('div');
  answered.className = "discussion__answered";
  const answerOrNot = document.createElement('p');
  answerOrNot.textContent = obj.answer ? '☑' : '⊠';
  answered.append(answerOrNot);
  discussionAnswered.append(answered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 디스커션 추가 기능: section.form__container에 새로운 질문 추가할 수 있는 입력 폼 제작
// form에 입력되는 정보들을 새 변수에 할당 / submit 버튼도 할당
const submitBtn = document.querySelector('#submit');
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputStory = document.querySelector('#story');
// submit을 누르면 자동으로 내용 리셋됨 -> event.preventDefault() 활용
function addDiscussion(event) {
  event.preventDefault();

  // 입력란이 비어 있으면 제출되지 않게 함
  // 피드백-이렇게 작성하면 띄어쓰기로만 내용을 구성해도 제출됨->정규표현식 활용하기
  // /^\s$/
  // 함수로 설정 -> 테스트
  function onlySpace(str) {
    return /^[\s]*$/.test(str);
  }
  if (onlySpace(inputName.value) || onlySpace(inputTitle.value) || onlySpace(inputStory.value)) {
    return false;
  };

  // 날짜 관련 내용 추가
  const date = new Date();

  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const dateStr = year + '-' + month + '-' + day;
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);
  const timeStr = hours + ':' + minutes + ':' + seconds;

  // 새 객체를 추가 -> 새로 쓰는 내용 담기 위해
  const newDiscussion = {
    id: "null id",
    createdAt: `${dateStr} ${timeStr}`,
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: inputName.value,
    answer: null,
    bodyHTML: inputStory.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/116554914?s=400&v=4",
  }
  // 배열에 추가하기 -> agorastatesDiscussions 배열에 데이터가 추가되어야 함->맨앞
  agoraStatesDiscussions.unshift(newDiscussion);
  // convertToDiscussion의 매개변수에 newDiscussion을 넣어 화면에 나오는 모양으로 DOM으로 바꿔줌
  const newObj = convertToDiscussion(newDiscussion);
  // ul 맨 앞에 자식요소로 추가되어야 함 -> 맨 위에 새 질문이 뜨게 하기 위해서
  ul.prepend(newObj);

  // 비우는 건 직접 ''를 설정해서 비움
  inputName.value = '';
  inputTitle.value = '';
  inputStory.value = '';
}
// 버튼을 누르면 등록된 내용이 ul요소의 맨 앞에 추가되게 함\
submitBtn.addEventListener('click', addDiscussion);

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
// render(ul);

// 페이지네이션
// 필요한 변수 설정
const contents = document.querySelector(".discussions__container");
const buttons = document.querySelector(".buttons");

const numOfContent = agoraStatesDiscussions.length;
const maxContent = 10;
const maxButton = 5;
const maxPage = Math.ceil(numOfContent/maxContent);
let page = 1;

const makeButton = (id) => {
  const button = document.createElement("button");
  button.classList.add("button");
  button.dataset.num = id;
  button.innerText = id;
  button.addEventListener("click", (e) => {
    Array.prototype.forEach.call(buttons.children, (button) => {
      if(button.dataset.num) button.classList.remove("active");
    })
    e.target.classList.add("active");
    renderContent(parseInt(e.target.dataset.num))
  });
  return button;
}

const renderContent = (page) => {
  while(contents.hasChildNodes()) {
    contents.removeChild(contents.lastChild);
  }
  for(let id = (page - 1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
    contents.appendChild(convertToDiscussion(agoraStatesDiscussions[id]));
  }
};

const goPrevPage = () => {
  if(page > 1) {
  page -= 1;
  render(page);
  }
  // 이전페이지, 다음페이지 버튼으로 페이지를 이동했을 때, active 클래스를 옮겨주는 작업 필요
};

const goNextPage = () => {
  if(page < maxPage) {
  page += 1;
  render(page);
  }
};

const prev = document.createElement("button");
prev.classList.add("button", "prev");
prev.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
prev.addEventListener("click", goPrevPage);

const next = document.createElement("button");
next.classList.add("button", "next");
next.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
next.addEventListener("click", goNextPage);

const renderButton = (page) => {
  while(buttons.hasChildNodes()) {
    buttons.removeChild(buttons.lastChild);
  }
  for(let id=1; id<page+maxButton && id<=maxPage; id++) {
    buttons.appendChild(makeButton(id));
  }
  buttons.children[0].classList.add("active");
  
  buttons.prepend(prev);
  buttons.append(next);

  // if(page === 1) buttons.removeChild(prev);
  // if(page === maxPage) buttons.removeChild(next);
};

const render = (page) => {
  renderContent(page);
  renderButton(page);
};
render(page);