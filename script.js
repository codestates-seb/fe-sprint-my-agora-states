'use strict'

const URL = "http://localhost:4000";
const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.querySelector(".discussions__container");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
const paginationLimit = 10;
const ul = document.querySelector("ul.discussions__container");

const formBtn = document.getElementById('form_button')
const inputName = document.getElementById('form_name')
const inputTitle = document.getElementById('form_title')
const inputStory = document.getElementById('form_story')
let currentPage = 1;
let submitChk1 = false;
let submitChk2 = false;
let submitChk3 = false;
let listItems,pageCount;
const nameFailMsg = document.querySelector(".name-fail-msg")
const titleFailMsg = document.querySelector(".title-fail-msg")
const storyFailMsg = document.querySelector(".story-fail-msg")
const modal = document.querySelector(".modal");

inputName.onkeyup = () => {
  submitChk1 = inputOnKeyUp(inputName.value,nameFailMsg)
  formBtnDisabledChk();
}

inputTitle.onkeyup = () => {
  submitChk2 = inputOnKeyUp(inputTitle.value,titleFailMsg)
  formBtnDisabledChk();
}

inputStory.onkeyup = () => {
  submitChk3 = inputOnKeyUp(inputStory.value,storyFailMsg)
  formBtnDisabledChk();
}

function inputOnKeyUp(value,msg){
  if(isMoreThan1Length(value)){
    msg.classList.add("hidden")
    return true;
  }else{
    msg.classList.remove("hidden")
    return false;
  }
}

function isMoreThan1Length(value) {
  return value.length >= 1
}

function formBtnDisabledChk(){
  if(submitChk1&&submitChk2&&submitChk3){
    formBtn.classList.remove("submitDisabled")
  }else{
    formBtn.classList.add("submitDisabled")
  }
}

/**
 * 질문 작성, 배열 추가
 */
formBtn.onclick = () => {
  const formTitle = inputTitle.value
  const formName = inputName.value
  const formStory = inputStory.value

  if(submitChk1&&submitChk2&&submitChk3){
    const myObj = {
      id: self.crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: formTitle,
      url: "",
      author: formName,
      answer: null,
      bodyHTML: formStory,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/99641988?s=64&v=4"
    }
  
    fetch(`${URL}/discussions`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myObj)
    }).then((res)=>{
    
      inputName.value = ""
      inputTitle.value = ""
      inputStory.value = ""
      submitChk1 = false
      submitChk2 = false
      submitChk3 = false
      formBtnDisabledChk()

      getFetch();
      init();
  })
    
    // const arr = localStorageGet()
    // arr.push(myObj)
    // localStorageSet(arr);
    // init();
    
    // inputName.value = ""
    // inputTitle.value = ""
    // inputStory.value = ""
    // submitChk1 = false
    // submitChk2 = false
    // submitChk3 = false
    // formBtnDisabledChk()
  }else{
    if(formTitle === ""){
      titleFailMsg.classList.remove("hidden")
    }
  
    if(formName === ""){
      nameFailMsg.classList.remove("hidden")
    }
  
    if(formStory === ""){
      storyFailMsg.classList.remove("hidden")
    }
  }
}


/**
 * convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
 * @param {any} obj discussion 배열 요소
 * @returns li 태그 요소
 */
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  

  //아바타 이미지, 작성자 추가
  const avatarDiv = document.createElement("div");
  const avatarImg = document.createElement("img");
  avatarImg.setAttribute('src',obj.avatarUrl)
  avatarImg.setAttribute('alt',`avatar of ${obj.author}`)
  avatarImg.classList.add('discussion__avatar--image')

  //답변 상태 추가
  const authorSpan = document.createElement("span");
  authorSpan.textContent = obj.author
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  if(obj.answer === null){
    discussionAnswered.textContent = "미답변"
    discussionAnswered.classList.add("notAnswer")
  }else{
    discussionAnswered.textContent =  obj.answers.length
    discussionAnswered.classList.add("answered");
  }
  
  avatarDiv.append(avatarImg)
  avatarDiv.append(authorSpan)
  avatarWrapper.append(avatarDiv)
  avatarWrapper.append(discussionAnswered)
  
  //제목 추가
  const discussionTitle = document.createElement("h2");
  const discussionTitleLink = document.createElement("a");

  discussionTitle.classList.add('discussion__title')
  discussionTitleLink.textContent = obj.title
  discussionTitle.appendChild(discussionTitleLink)
  discussionContent.appendChild(discussionTitle)

  //작성 시간 추가
  const discussionTime = document.createElement("div");
  discussionTime.classList.add('discussion__time');

  const newDate = convertDate(obj.createdAt)
  const newTime = newDate.toLocaleTimeString("ko-KR").split(":")
  discussionTime.textContent = `${newDate.toLocaleDateString("ko-KR")}\b\b${newTime[0]}:${newTime[1]}`
  discussionContent.appendChild(discussionTime)

  const discussionBtnGroup = document.createElement("div");
  discussionBtnGroup.classList.add('discussion__btn-group');

  const discussionDelBtn = document.createElement("button");
  discussionDelBtn.classList.add('discussion__del-btn');
  discussionDelBtn.textContent = "삭제"
  discussionDelBtn.id = obj.id;

  discussionDelBtn.addEventListener("click",discussionDel)

  const discussionEditBtn = document.createElement("button");
  discussionEditBtn.classList.add('discussion__edit-btn');
  discussionEditBtn.textContent = "수정"

  discussionBtnGroup.appendChild(discussionEditBtn);
  discussionBtnGroup.appendChild(discussionDelBtn);

  discussionContent.appendChild(discussionBtnGroup)
  li.append(avatarWrapper, discussionContent);
  li.setAttribute("name",obj.id)

  // li.onclick = (event)=> {
  //   getDiscussionDetail(event);
  // }
  li.addEventListener("click",getDiscussionDetail);
  return li;
};

function getDiscussionDetail(e){
  const id = e.currentTarget.getAttribute("name");
  const avatar = document.querySelector(".modal img")
  const author = document.querySelector(".modal span")
  const time = document.querySelector(".modal .discussion__time")
  const title = document.querySelector(".modal h2 a")
  const answerStatus = document.querySelector(".modal .discussion__answered")
  const content = document.querySelector(".modal .discussion__body")

  modal.classList.remove("hidden")

  fetch(`${URL}/discussions/${id}`,{method:"GET"})
  .then((res)=>res.json())
  .then((data)=>{
    console.log(data);
    avatar.setAttribute('src',data.avatarUrl)
    avatar.setAttribute('alt',`avatar of ${data.author}`)
    author.textContent = data.author
    title.textContent = data.title

    if(data.answer === null){
      answerStatus.textContent = "미답변"
      answerStatus.classList.add("notAnswer")
      answerStatus.classList.remove("answered");
    }else{
      answerStatus.textContent =  data.answers.length
      answerStatus.classList.add("answered");
      answerStatus.classList.remove("notAnswer");
    }

    const newDate = convertDate(data.createdAt)
    const newTime = newDate.toLocaleTimeString("ko-KR").split(":")
    time.textContent = `${newDate.toLocaleDateString("ko-KR")}\b\b${newTime[0]}:${newTime[1]}`

    content.innerHTML = data.bodyHTML
  })
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.add("hidden")
  }
}

function discussionDel(e){
  let confirmResult = confirm("삭제하시겠습니까?")

  if(confirmResult){
    fetch(`${URL}/discussions/${e.target.id}`,{method:"DELETE"})
    .then((res)=>{
      getFetch()
      alert("삭제되었습니다.")
      
    })
  }else{
    return;
  }
}

/**
 * 날짜 형식 변환 함수
 * @param {string} date 생성날짜
 * @returns 형식 변환 날짜
 */
function convertDate(date){
  const splitDate1 = date.split("-");
  const splitDate2 = splitDate1[2].split("T")
  const splitDate3 = splitDate2[1].split(":")

  const year = Number(splitDate1[0]);
  const month = Number(splitDate1[1]);
  const day = Number(splitDate2[0]);
  const hour = Number(splitDate3[0]);
  const minute = Number(splitDate3[1]);
  const second = Number(splitDate3[2].slice(0,2));

  const convert = new Date(Date.UTC(year,month-1,day,hour,minute,second))
  return convert
}

/**
 * agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
 * @param {any} element ul 태그
 */
const render = (element) => {
  element.innerHTML = '';
  
  let localStorageArr = localStorageGet()
  localStorageArr.sort((a,b)=>{
    if(a.answer === null){
      return -1
    }else if(b.answer === null){
      return 1
    }
    return 0
  })

  // console.log(localStorageArr)
  for (let i = 0; i < localStorageArr.length; i += 1) {
    element.append(convertToDiscussion(localStorageArr[i]));
  }

  return;
};

/**
 * 페이지 넘버 버튼 추가
 * @param {number} index 페이지 인덱스
 */
function appendPageNumber(index){
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.textContent = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

  
  paginationNumbers.appendChild(pageNumber);
};

/**
* pageCount만큼 페이지 넘버 버튼 생성 반복
*/
function getPaginationNumbers(){
  paginationNumbers.innerHTML = '';

  listItems = paginatedList.querySelectorAll("li");
  pageCount = Math.ceil(listItems.length / paginationLimit);
  
  for (let i = 1; i <= pageCount; i++){
      appendPageNumber(i);
  }
};

/**
* currentPage 변경, 보여줄 리스트 변경
* @param {number} pageNum 
*/
function setCurrentPage(pageNum){
  currentPage = pageNum

  handleActivePageNumber();
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
      item.classList.add("hidden");
      if(index >= prevRange && index < currRange){
          item.classList.remove("hidden")
      };
  });
};

/**
* 앞,뒤 버튼, 페이지 넘버 클릭 시 리스트 변경
*/
function setCurrentPageOnClick(){
  prevButton.onclick = () => setCurrentPage(currentPage - 1);
  nextButton.onclick = () => setCurrentPage(currentPage + 1);
  
  document.querySelectorAll(".pagination-number").forEach((button) => {
      const pageIndex = Number(button.getAttribute("page-index"));

      if(pageIndex){
          button.onclick = () => setCurrentPage(pageIndex);
      };
  });
}

/**
* 페이지 넘버 버튼 style 변경
*/
function handleActivePageNumber(){
  document.querySelectorAll(".pagination-number").forEach((button)=>{
      button.classList.remove("active");

      const pageIndex = Number(button.getAttribute("page-index"));

      if(pageIndex === currentPage) {
          button.classList.add("active")
      }
  })    
}

/**
* 앞,뒤 버튼 비활성화
* @param {button} button 
*/
function disableButton(button){
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

/**
* 앞,뒤 버튼 활성화
* @param {button} button 
*/
function enableButton(button){
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

/**
* 앞,뒤 버튼 활성화 상태 변경
*/
function handlePageButtonsStatus(){
  if (currentPage === 1){
      disableButton(prevButton);
  }else{
      enableButton(prevButton)
  }

  if(pageCount === currentPage){
      disableButton(nextButton);
  }else{
      enableButton(nextButton)
  }
}

/**
 * 로컬스토리지에 배열 추가
 * @param {Array} arr 로컬스토리지에 set할 배열 
 */
function localStorageSet(arr){
  const arrString = JSON.stringify(arr);
  window.localStorage.setItem("arr",arrString);
}

/**
 * 로컬스토리지에서 배열 가져옴
 * @returns 로컬스토리지 배열
 */
function localStorageGet(){
  const arrString = window.localStorage.getItem("arr");
  const arrParse = JSON.parse(arrString)
  return arrParse
}

/**
 * 리스트, 페이지네이션 초기화
 */
function init(){
  render(ul);
  getPaginationNumbers();
  setCurrentPage(currentPage);
  setCurrentPageOnClick();
}

async function getFetch(){
  await fetch(`${URL}/discussions`,{method:"GET"})
  .then((res)=>res.json())
  .then((data)=>{
    localStorageSet(data);
    init();
  })
}

window.onload = () =>{
  getFetch()
}

// 로컬스토리지에 저장된 배열이 없을 시 추가, init실행
// window.onload = () =>{
//   const data = getFetch();
//   console.log(data);
//   if(window.localStorage.getItem("arr") === null){
//     // localStorageSet(agoraStatesDiscussions);
//     localStorageSet(data);
//   }
//   init();
// }