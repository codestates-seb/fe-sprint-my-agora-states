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
    avatarAnswered.textContent = '☑';
  } else {
    avatarAnswered.textContent = '✘';
  }
  discussionAnswered.append(avatarAnswered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = agoraStatesDiscussions.length - 1; i >= 0; i -= 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
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
  console.log(hours)

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

// 새로 추가된 배열만 랜더
const renderNewDiscussion = (obj, element) => {
  const discussion = convertToDiscussion(obj);
  element.prepend(discussion);
};

// 컨텐츠를 agoraStatesDiscussions 배열에 추가
function newQA(event) {
  event.preventDefault(); // 폼 제출 기본 동작 방지
  const id = "D_kwDOHOApLM4APY9u";
  const createdAt = CurrentTime();
  const title = elTitle.value;
  const url = "https://github.com/codestates-seb/agora-states-fe/discussions/"
  const author = elAuthor.value
  const answer = null;
  const bodyHTML = elBodyHTML.value;
  const avatarUrl = "https://avatars.githubusercontent.com/u/86960007?s=64&u=4863a873d78f406d658e8a50d9b91f3045006920&v=4";
  const newObj = {id, createdAt, title, url, author, answer, bodyHTML, avatarUrl}
  
  if(!title){
    fail_elTitle.classList.remove('hide');
    fail_elAuthor.classList.add('hide');
    fail_elBodyHTML.classList.add('hide');
  } else if (title && !author) {
    fail_elTitle.classList.add('hide');
    fail_elAuthor.classList.remove('hide');
    fail_elBodyHTML.classList.add('hide');
  } else if (title && author && !bodyHTML) {
    fail_elTitle.classList.add('hide');
    fail_elAuthor.classList.add('hide');
    fail_elBodyHTML.classList.remove('hide');
  } else if(title && author && bodyHTML) {
    agoraStatesDiscussions.push(newObj);
    fail_elTitle.classList.add('hide');
    fail_elAuthor.classList.add('hide');
    fail_elBodyHTML.classList.add('hide');
    renderNewDiscussion(newObj, ul);
    elTitle.value = "";
    elAuthor.value = "";
    elBodyHTML.value = "";
  } else {
    alert("알수없는 오류가 발생하였습니다.");
  }
}

elSubmitButton.addEventListener("click", newQA);