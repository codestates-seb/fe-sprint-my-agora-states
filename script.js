// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

//
const formContainer = document.querySelector(`.form__container`)
const submitButton = formContainer.querySelector("#submit");
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
  const avatarImg = document.createElement(`img`);
  const contentH2 = document.createElement(`h2`);
  const contentText = document.createElement(`a`);
  const information = document.createElement(`div`);
  const answerP = document.createElement(`p`);
 
 //아바타 작성
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src =obj.avatarUrl;
  avatarImg.alt = `avatar of`+obj.author;
  avatarWrapper.append(avatarImg);
  
  //제목 작성
  contentH2.className = "discussion__title"
  contentText.textContent = obj.title;
  contentText.href = obj.url;
  contentH2.append(contentText);
  discussionContent.append(contentH2);
  
  //내용작성
  information.className = `discussion__information`;
  information.textContent = obj.author +`/`+obj.createdAt;
  discussionContent.append(information);


  //체크박스 작성
  const checkBox = document.createElement(`input`);
  checkBox.type = "checkbox"
  checkBox.className = "checkbox__ID" 
  answerP.textContent = obj.answer ? "☑" : "☒"; 
  discussionAnswered.append(answerP);

   // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//submit을 눌렀을때 작동하는 함수입니다.


submitButton.addEventListener(`click`, function (event){
  event.preventDefault();
  let nameText = document.getElementById(`name`);
  let titleText = document.getElementById(`title`);
  let storyText = document.getElementById(`story`);  

  let result =  {
    id: "D_kwDOHOApLM4APjIj",
    createdAt: new Date().toISOString(),
    title: titleText.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
    author: nameText.value,
    answer: null,
    bodyHTML: storyText.value,     
    avatarUrl:
      "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
   }
  
  agoraStatesDiscussions.unshift(result);
  
  //완전히 삭제하고
  while(ul.firstChild){
    ul.removeChild(ul.firstChild);
  }
  //다시작성한다.
  render(ul);

}
)

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


//여기서부턴 페이징 구현
// let currentPage = 1;
// let itemsPerPage = 10;

// function displayItems(page) {
//   let startIndex = (page - 1) * itemsPerPage;
//   let endIndex = startIndex + itemsPerPage;
//   let pageItems = agoraStatesDiscussions.slice(startIndex, endIndex);

//   let content = document.getElementById("content");
//   content.innerHTML = "";

//   for (let i = 0; i < pageItems.length; i++) {
//     let item = document.createElement("div");
//     item.textContent = pageItems[i];
//     content.appendChild(item);
//   }

//   // 페이지 번호 클릭 핸들러
// function handlePageClick(page) {
//   currentPage = page;
//   displayItems(currentPage);
//   renderPageNumbers();
// }
// // 페이지 숫자 출력
// function renderPageNumbers() {
//   let pagination = document.getElementById("pagination");
//   pagination.innerHTML = " ";

//   let totalPages = Math.ceil(agoraStatesDiscussions.length / itemsPerPage);

//   for (let i = 1; i <= totalPages; i++) {
//     let pageNumber = document.createElement("span");
//     pageNumber.textContent = i;
//     pageNumber.classList.add("page-number");

//     if (i === currentPage) {
//       pageNumber.classList.add("active");
//     }

//     (function (page) {
//       pageNumber.addEventListener("click", function () {
//         handlePageClick(page);
//       });
//     })(i);

//     pagination.appendChild(pageNumber);
//   }
// }

// }

// // 초기화
// displayItems(currentPage);
// renderPageNumbers();
