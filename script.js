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
  // avatar 작성
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.setAttribute("alt", `avatar of ${obj.author}`);
  // avatar 추가
  avatarWrapper.append(avatarImg);
  // title 작성
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement("a");
  discussionLink.setAttribute("href", obj.url)
  discussionLink.textContent = obj.title;
  discussionTitle.append(discussionLink);
  // information 작성
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`
  // content 추가
  discussionContent.append(discussionTitle, discussionInformation);
  // answer 작성
  const checkIcon = document.createElement("i");
  if(obj.answer === null) checkIcon.className = "fa-regular fa-circle-check"; 
  else checkIcon.className = "fa-solid fa-circle-check active";
  // answer 추가
  discussionAnswered.append(checkIcon);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
let pageIndex = 0;
const render = (element) => {
  let targetLength = agoraStatesDiscussions.length;
  // 마지막 페이지 구별
  if(pageIndex !== Math.floor(agoraStatesDiscussions.length / 10)) targetLength = (pageIndex * 10) + 10;
  // pageindex에 따라 element를 출력
  for (let i = pageIndex * 10; i < targetLength; i += 1) element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 글쓰기
document.querySelector("#submit").addEventListener("click", () => {
  const name = document.querySelector("#name");
  const title = document.querySelector("#title");
  const content = document.querySelector("#story");
  const currentTime = getCurrentTime(new Date());
  if(title.value === "" || name.value === "") return alert("이름과 제목을 입력해주세요.");

  // agoraStatesDiscussions[0]에 데이터 추가
  agoraStatesDiscussions.unshift({
    id: "D_kwDOHOApLM4APjJi",
    createdAt: currentTime,
    title: title.value,
    url: "#",
    author: name.value,
    answer: null,
    bodyHTML: content.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/104333720?s=40&v=4",
  });

  addDiscussion();

  // 화면에 출력
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
  // 마지막 li 제거
  ul.childNodes[ul.childNodes.length - 1].remove();
  // Discussins에 데이터 추가
  pageIndex = 0;

  paginationBtnReset();

  reRender();
})

// 현재시간 함수
const getCurrentTime = (currentTime) => {
  const year = currentTime.getFullYear();
  const month = `0${currentTime.getMonth() + 1}`.slice(-2);
  const day = `0${currentTime.getDate()}`.slice(-2);
  const hour = `0${currentTime.getHours()}`.slice(-2);
  const minute = `0${currentTime.getMinutes()}`.slice(-2);
  const second = `0${currentTime.getSeconds()}`.slice(-2);

  return `${year}-${month}-${day}T${hour}:${minute}:${second}Z`;
}

// localStorage에 Discussins 데이터 추가
const addDiscussion = () =>{
  window.localStorage.setItem("agoraStatesDiscussions", JSON.stringify(agoraStatesDiscussions));
  agoraStatesDiscussions = JSON.parse(window.localStorage.getItem("agoraStatesDiscussions"));
}

// pagination 숫자 추가
if(agoraStatesDiscussions.length > 10){
  for(let i = 0; i < agoraStatesDiscussions.length / 10; i++){
    const discussionsNums = document.querySelector(".discussions__pagination--nums");
    const pageNum = document.createElement("span");

    pageNum.className = "discussions__pagination--num";
    if(i === 0) pageNum.className = `${pageNum.className} btn_active`;
    pageNum.setAttribute("targetNum", i + 1);
    pageNum.textContent = i + 1;
    discussionsNums.append(pageNum);
  }
} else console.log("not over 10");

// pagination 기능 구현
const prevBtn = document.querySelector(".prev_btn");
const nextBtn = document.querySelector(".next_btn");

document.querySelectorAll(".discussions__pagination--num").forEach((e) => {
  e.addEventListener("click", (e) => {
    const maxNumber = Math.floor(agoraStatesDiscussions.length / 10);

    pageIndex = (e.target.textContent) - 1;
    prevBtn.classList.remove("hide");
    nextBtn.classList.remove("hide");

    if(Number(pageIndex) === 0) prevBtn.classList.add("hide");
    if(Number(pageIndex) === maxNumber) nextBtn.classList.add("hide");

    document.querySelector(".btn_active").classList.remove("btn_active");
    e.target.classList.add("btn_active");

    reRender();
  })
})

// prev, next 기능 구현
prevBtn.addEventListener("click", (e) => {
  activeBtnReset("prev");
  nextBtn.classList.remove("hide");

  if(pageIndex !== 0) reRender("-");
  if(pageIndex === 0) e.target.parentNode.className = `${e.target.parentNode.className} hide`;
})

nextBtn.addEventListener("click", (e) => {
  const maxNumber = Math.floor(agoraStatesDiscussions.length / 10);

  activeBtnReset("next");
  prevBtn.classList.remove("hide");

  if(pageIndex !== maxNumber) reRender("+");
  if(pageIndex === maxNumber) e.target.parentNode.className = `${e.target.parentNode.className} hide`;
})

// reRender function
const reRender = (op) => {
  if(op === "+") pageIndex++;
  else if(op === "-") pageIndex--;
  ul.innerHTML = "";
  render(ul);
  showPreview();
}

// paginationBtnReset
const paginationBtnReset = () => {
  const activetNum = document.querySelector(".btn_active");
  const nextTarget = document.querySelector("span[targetnum='1']");

  prevBtn.classList.remove("show");
  prevBtn.classList.add("hide");
  nextBtn.classList.remove("hide");
  nextBtn.classList.add("show");

  activetNum.classList.remove("btn_active");
  nextTarget.classList.add("btn_active");

  reRender();
}

// prev, next 활성화된 element의 active 클래스 재설정
const activeBtnReset = (op) => {
  let targetNum = document.querySelector(".btn_active").textContent;
  if(op === "next") targetNum = Number(targetNum) + 1
  else if(op === "prev") targetNum = Number(targetNum) - 1
  const currnetTarget = document.querySelector(".btn_active");
  const nextTarget = document.querySelector(`span[targetnum='${targetNum}']`);

  currnetTarget.classList.remove("btn_active");
  nextTarget.classList.add("btn_active");
}

// answer preview
// create answer preview
const createPreview = (index) => {
  const previewBox = document.createElement("div");
  const previewTitle = document.createElement("div");
  const previewDis = document.createElement("div");
  const previewAnswer = document.createElement("div");
  const previewLine = document.createElement("div");
  const body = document.querySelector("body");
  let target = agoraStatesDiscussions[Number((pageIndex * 10) + index)];
  if(pageIndex === 0) target = agoraStatesDiscussions[Number((pageIndex * 10) + index) - 1];

  previewBox.className = "previewBox answerBoxHide";
  previewTitle.className = "previewTitle";
  previewDis.className = "previewDis";
  previewAnswer.className = "previewAnswer";

  const extractTextPattern = /(<([^>]+)>)/gi;
  let orginalDis = target.bodyHTML;
  let orginalAnswer = "";
  if(target.answer === null) orginalAnswer = "아직 답변이 없어요 :(";
  else orginalAnswer = target.answer.bodyHTML;
  let extractedDis = orginalDis.replace(extractTextPattern, ' ');
  let extractedAnswer = orginalAnswer.replace(extractTextPattern, ' ');

  previewTitle.textContent = "제목\n" + target.title;
  previewDis.textContent = "본문\n" + extractedDis;
  previewAnswer.textContent = "답변\n" + extractedAnswer;
  previewBox.append(previewTitle, previewLine, previewDis, previewLine, previewAnswer);

  body.append(previewBox);
}

// delete answer preview
const deletePreview = () => {
  const target = document.querySelector(".previewBox");
  if(target === null) return ;
  target.remove();
}

// show answer preview
const showPreview = () => {
  document.querySelectorAll(".discussion__title").forEach((e) => {
    e.addEventListener("mousemove", (e) => {
      let index = getIndex(e.target.closest("li.discussion__container"));
      if(index === 0 && pageIndex === 0) index = 1;
      if(document.querySelector(".previewBox") === null) createPreview(index);
      const target = document.querySelector(".previewBox");
      target.classList.remove("answerBoxHide");
      target.classList.add("answerBoxShow")
      target.style.top = `${e.pageY + 20}px`;
      target.style.left = `${e.pageX}px`;
      if(window.innerHeight / 2 < e.clientY) target.style.top = `${e.pageY - target.offsetHeight - 10}px`;
    })
    e.addEventListener("mouseout", (e) => {
      deletePreview();
    })
  });
}

showPreview();

function getIndex(selector) {
  for(var i = 0; i < selector.parentNode.childNodes.length; i++) {
    if (selector.parentNode.childNodes[i] === selector) {
      return i;
    }
  }
}
