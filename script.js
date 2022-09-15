// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

/* 
  처리해야할 상황 
  1. submit했을때 값 추가하기 ok
  2. paging처리 ok
  3. 화면 꾸미기 ing
  4. 이미지 가져와서 답변여부 보여주기  
*/
/* date Formatter */
function createdFormatter(date){
  const year = date.split("T")[0].split("-");
  const time = date.split("T")[1].slice(0,-1).split(":");

  return `${year[0]}년${year[1]}월${year[2]}일 ${time[0]}시${time[1]}분${time[2]}초`;
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image"
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = obj.author;
  avatarWrapper.append(avatarImage);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionTitleFromTag = document.createElement("a");
  discussionTitleFromTag.href = obj.url;
  discussionTitleFromTag.textContent = obj.title;
  const discussionCreateDate = document.createElement("div");
  
  discussionCreateDate.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  
  discussionTitle.append(discussionTitleFromTag);
  discussionContent.append(discussionTitle, discussionCreateDate)

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionAnswerStatus = document.createElement("p");
  if(obj.answer){
    discussionAnswerStatus.textContent = "☑"
  }else{
    discussionAnswerStatus.textContent = "✖"
  }
  discussionAnswered.append(discussionAnswerStatus);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, start, end) => {
  if(window.localStorage.length !== 0){
    if(window.localStorage.length > start){
      if(start === 0) {
        element.append(baseContext);
      }
      for(let i=start; i < end; i++){
        const key = window.localStorage.key(i);
        if(key === null){
          break;
        }else{
          element.append(convertToDiscussion(JSON.parse(window.localStorage.getItem(key))));
        }
      }
      end -= window.localStorage.length;
    }
  }
  for (let i = start; i < end; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    if(i === agoraStatesDiscussions.length -1){
      break;
    }
  }
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
const baseContext = ul.children[0];

render(ul,0,9);

const nameValidation = document.querySelector("#name");
const titleValidation = document.querySelector("#title");
const storyValidation = document.querySelector("#story");
const submitButton = document.querySelector("#submit");

const allValdatation = document.querySelectorAll(".checkInput");

allValdatation.forEach((value)=> {
  value.addEventListener("blur", () => {
    if(nameValidation.value !== "" && titleValidation.value !== "" && storyValidation.value !== ""){
      submitButton.disabled = false;
    }else{
      submitButton.disabled = true;
    }
  })
})

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  let obj = {
    ...agoraStatesDiscussions[3],
    answer : null,
    author : nameValidation.value,
    title : titleValidation.value,
    createdAt : new Date(),
    bodyHTML : storyValidation.value,
  }
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));
  localStorageSave(obj);
  
  // input clear
  nameValidation.value = "";
  titleValidation.value = "";
  storyValidation.value = "";
})

/* localStorage Data Save */
function localStorageSave(obj){
  window.localStorage.setItem(obj.title, JSON.stringify(obj));
  console.log(window.localStorage.length);
}


// button create and addEventListener -------------------------------------------
const pagingEls = document.querySelector("#paging");

const paginCount = Math.floor((
  window.localStorage.length +agoraStatesDiscussions.length) / 10) + 
((window.localStorage.length + agoraStatesDiscussions.length) % 10 !== 0 ? 1 : 0);

const pagingFunc = (value) => {
  let buttonEls = document.createElement("button");
  buttonEls.textContent = value;
  buttonEls.className = "pageMove";
  return buttonEls;
}

for(let i = 0; i < paginCount; i++){
   pagingEls.append(pagingFunc(i+1));
}

const pageButtonEls = document.querySelectorAll(".pageMove");

pageButtonEls.forEach((value)=> {
  value.addEventListener("click", (event)=> {
    event.preventDefault();
    while (ul.children.length >= 1) {
      ul.removeChild(ul.lastChild);
    }
    if(Number(value.textContent) !== 1){
      render(ul, ((Number(value.textContent)-1) * 10) - window.localStorage.length ,((Number(value.textContent)) * 10) - window.localStorage.length);
    }else{
      render(ul, ((Number(value.textContent)-1) * 10) ,((Number(value.textContent)) * 10));
    }
  })
})