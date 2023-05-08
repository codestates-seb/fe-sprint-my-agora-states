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
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const avatarContent = document.createElement('h2');
  avatarContent.className = "discussion__title";
  discussionContent.append(avatarContent);

  const avatarInfo = document.createElement('div');
  avatarInfo.className = "discussion__information";
  avatarInfo.textContent = obj.author
  + ' / ' + obj.createdAt;
  discussionContent.append(avatarInfo);

  const avatarTitle = document.createElement('a');
  avatarTitle.href = obj.url;
  avatarTitle.textContent = obj.title;
  avatarContent.append(avatarTitle);

  const avatarAnswered = document.createElement('p');
  if (obj.answer !== null){
    avatarAnswered.textContent = '✔';
    avatarAnswered.classList = 'resolved'
  } else {
    avatarAnswered.textContent = '✘';
    avatarAnswered.classList = 'unresolved'
  }
  discussionAnswered.append(avatarAnswered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// 페이지네이션

const render = (element) => {
  const onePageMax = 10;
  let currentPage = 1;
  
  const renderContent = () => {
    const contentStartIndex = (currentPage - 1) * onePageMax;
    const contentEndIndex = contentStartIndex + onePageMax;
    element.innerHTML = "";
    for (let i = contentStartIndex; i < contentEndIndex && i < agoraStatesDiscussions.length; i += 1) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    return;
  }
  renderContent();

  const numbering = document.querySelector(".numbering");
  const totalPage = Math.ceil(agoraStatesDiscussions.length / onePageMax);
  const paging = () => {
    numbering.innerHTML = "";
    for(let i = 1; i <= totalPage; i++){
      const PageNum = document.createElement('a');
      PageNum.className = "page_num";
      PageNum.textContent = i;
      if(currentPage === i) {
        PageNum.classList.add('disabled')
      }
  
      PageNum.addEventListener('click', () => {
        currentPage = i;
        renderContent();
        paging();
      });
      numbering.append(PageNum);
    }
  }

  const prev = document.querySelector(".prev_page")
  prev.addEventListener('click', () => {
    if(currentPage > 1){
      currentPage -= 1;
      renderContent();
      paging();
    } else {
      return;
    }
  });

  const next = document.querySelector(".next_page")
  next.addEventListener('click', () => {
    if(currentPage < Math.ceil(agoraStatesDiscussions.length / onePageMax)){
      currentPage += 1;
      renderContent();
      paging();
    } else {
      return;
    }
  });
  paging(numbering)
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
convertToDiscussion(agoraStatesDiscussions);

// 글을 작성한 현재 시간
function CurrentTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  let AmPmHours = hours;

  const AmPm = AmPmHours >= 12 ? '오후' : '오전';
  AmPmHours %= 12;
  AmPmHours = AmPmHours ? AmPmHours : 12;

  const currentTime = `${year}-${month}-${date} ${AmPm} ${AmPmHours}:${minutes}:${seconds}`;
  return currentTime;
}

let elSubmitButton = document.querySelector("#submit_button");
let elTitle = document.querySelector("#title");
let elAuthor = document.querySelector("#name");
let elBodyHTML = document.querySelector("#story");
let fail_elTitle = document.querySelector(".Fail-title-message");
let fail_elAuthor = document.querySelector(".Fail-name-message");
let fail_elBodyHTML = document.querySelector(".Fail-content-message");

// 컨텐츠를 agoraStatesDiscussions 배열에 추가
function newQA(event) {
  event.preventDefault(); // 폼 제출 기본 동작 방지
  const newObj = {
    id: "D_kwDOHOApLM4APY9u",
    createdAt: CurrentTime(),
    title: elTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/",
    author: elAuthor.value,
    answer: null,
    bodyHTML: elBodyHTML.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/86960007?s=64&u=4863a873d78f406d658e8a50d9b91f3045006920&v=4"
  }
  
  // 질문 작성 검사
  if(!newObj.title){
    fail_elTitle.classList.remove('hide');
    fail_elAuthor.classList.add('hide');
    fail_elBodyHTML.classList.add('hide');
  } else if (newObj.title && !newObj.author) {
    fail_elTitle.classList.add('hide');
    fail_elAuthor.classList.remove('hide');
    fail_elBodyHTML.classList.add('hide');
  } else if (newObj.title && newObj.author && !newObj.bodyHTML) {
    fail_elTitle.classList.add('hide');
    fail_elAuthor.classList.add('hide');
    fail_elBodyHTML.classList.remove('hide');
  } else if(newObj.title && newObj.author && newObj.bodyHTML) {
    agoraStatesDiscussions.unshift(newObj);
    fail_elTitle.classList.add('hide');
    fail_elAuthor.classList.add('hide');
    fail_elBodyHTML.classList.add('hide');
    render(ul);
    elTitle.value = "";
    elAuthor.value = "";
    elBodyHTML.value = "";
  } else {
    alert("알수없는 오류가 발생하였습니다.");
  }

  elTitle.onkeyup = () => {
    if(elTitle.value){
      fail_elTitle.classList.add('hide');
    }
  }
  elAuthor.onkeyup = () => {
    if(elAuthor.value){
      fail_elAuthor.classList.add('hide');
    }
  }
  elBodyHTML.onkeyup = () => {
    if(elBodyHTML.value){
      fail_elBodyHTML.classList.add('hide');
    }
  }
}
elSubmitButton.addEventListener("click", newQA);