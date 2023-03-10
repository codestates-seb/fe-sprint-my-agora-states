
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container"; 

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  
  //게시글 이미지
  const image = document.createElement("img")
  image.className = "discussion__avatar--image";
  image.src = obj.avatarUrl;
  image.alt = "avartar of " + obj.author;
  avatarWrapper.append(image);

  //게시글 컨텐츠
  const title = document.createElement("h2");
  title.className = "discussion__title";
  const titleLink = document.createElement("a");
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  title.append(titleLink);

  const titleInformation = document.createElement("div");
  titleInformation.className = "discussion__information";
  titleInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(title);
  discussionContent.append(titleInformation);

  //게시글 답변
  const answer = document.createElement("div");
  answer.className = "discussion__answered";
  const answerCheck = document.createElement("p");
  if(obj.answer===null){
    answerCheck.textContent = '☒';
  }else{
    answerCheck.textContent = '☑';
  }
  answer.append(answerCheck);
  discussionAnswered.append(answer);
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

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

const form = document.querySelector("form");

const convertToDiscussion2 = (obj) => {
  const li = document.createElement("li"); 
  li.className = "discussion__container"; 

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  
  //게시글 이미지
  const image = document.createElement("img")
  image.className = "discussion__avatar--image";
  image.src = "https://cdn-icons-png.flaticon.com/512/2732/2732700.png";
  image.alt = "avartar of " + obj.name;
  avatarWrapper.append(image);

  //게시글 컨텐츠
  const title = document.createElement("h2");
  title.className = "discussion__title";
  const titleLink = document.createElement("a");
  titleLink.href = '#';
  titleLink.textContent = obj.title;
  title.append(titleLink);

  const titleInformation = document.createElement("div");
  titleInformation.className = "discussion__information";
  titleInformation.textContent = obj.name + ' / ' + obj.createdAt;
  discussionContent.append(title);
  discussionContent.append(titleInformation);

  //게시글 답변
  const answer = document.createElement("div");
  answer.className = "discussion__answered";
  const answerCheck = document.createElement("p");
  if(obj.answer===null){
    answerCheck.textContent = '☒';
  }else{
    answerCheck.textContent = '☑';
  }
  answer.append(answerCheck);
  discussionAnswered.append(answer);
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;

}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // handle submit
  const nameInput = document.getElementById("name");
  const nameValue = nameInput.value;

  const titleInput = document.getElementById("title");
  const titleValue = titleInput.value;

  const storyInput = document.getElementById("story");
  const storyValue = storyInput.value;

  let today = new Date();
  const newobj = {
    name: nameValue,
    createdAt: `${today.toLocaleDateString()} ${today.toLocaleTimeString()}`,
    title: titleValue,
    answer: null,
    bodyHTML: storyInput.value,
  }
  ul.prepend(convertToDiscussion2(newobj));
  nameInput.value = "";
  titleInput.value = "";
  storyInput.value = "";

});

// //페이지네이션
// const paginationNumbers = document.querySelector('#pagination-numbers'); //페이지넘버
// const paginatedList = document.querySelector("ul"); // discussion 리스트
// const listItems = paginatedList.querySelectorAll("li"); // discussion 컨테이너들
// const nextButton = document.getElementById("next-button"); //다음페이지 버튼
// const prevButton = document.getElementById("prev-button"); //이전페이지 버튼

// const paginationLimit = 5; //한페이지에 discussion 5개씩 설정.
// const pageCount = Math.ceil(listItems.length / paginationLimit); //페이지 갯수
// let currentPage = 1; //현재 페이지 기본값을 1로 설정.

// //페이지 넘김 버튼 비활성화함수
// const disableButton = (button) => {
//   button.classList.add("disabled");//disabled 클래스를 추가한다.
//   button.setAttribute("disabled", true);//disabled 속성을 true 값으로 추가한다.
// };

// //페이지 넘김 버튼 활성화함수
// const enableButton = (button) => {
//   button.classList.remove("disabled");//disabled 클래스르 제거한다.
//   button.removeAttribute("disabled");//disabled 속성을 제거한다.
// };

// //페이지 넘김 버튼 활성/비활성 조건 함수
// const handlePageButtonsStatus = () => {
//   if (currentPage === 1) {
//     disableButton(prevButton);
//   } else {
//     enableButton(prevButton);
//   }

//   if (pageCount === currentPage) {
//     disableButton(nextButton);
//   } else {
//     enableButton(nextButton);
//   }
// };

// //페이지 넘버 추가
// const appendPageNumber = (index) => {
//   const pageNumber = document.createElement("button");//pageNumber 버튼 요소를 만든다.
//   pageNumber.className = "pagination-number";
//   pageNumber.innerHTML = index;
//   pageNumber.setAttribute("page-index", index);
//   pageNumber.setAttribute("aria-label", "Page " + index);
//   //<button class='pagination-number' page-index=index aria-label=inex> index </button>
//   paginationNumbers.appendChild(pageNumber);
// };

// //페이지 버튼 눌린 상태(Active) 관리
// const handleActivePageNumber = () => {
//   document.querySelectorAll(".pagination-number").forEach((button) => {
//     button.classList.remove("active");
//     const pageIndex = Number(button.getAttribute("page-index"));
//     if (pageIndex == currentPage) {
//       button.classList.add("active");
//     }
//   });
// };
//  const prevRange = (pageNum - 1) * paginationLimit;
// const currRange = pageNum * paginationLimit;

//   listItems.forEach((item, index) => {
//     item.classList.add("hidden");
//     if (index >= prevRange && index < currRange) {
//       item.classList.remove("hidden");
//     }
//   });


// window.addEventListener("load", () => {
//   getPaginationNumbers();
//   setCurrentPage(1);

//   prevButton.addEventListener("click", () => {
//     setCurrentPage(currentPage - 1);
//   });

//   nextButton.addEventListener("click", () => {
//     setCurrentPage(currentPage + 1);
//   });

//   document.querySelectorAll(".pagination-number").forEach((button) => {
//     const pageIndex = Number(button.getAttribute("page-index"));

//     if (pageIndex) {
//       button.addEventListener("click", () => {
//         setCurrentPage(pageIndex);
//       });
//     }
//   });
// });
// const getPaginationNumbers = () => {
//   for (let i = 1; i <= pageCount; i++) {
//     appendPageNumber(i);
//   }
// };

// const setCurrentPage = (pageNum) => {
//   currentPage = pageNum;

//   handleActivePageNumber();
//   handlePageButtonsStatus();
  
//   const prevRange = (pageNum - 1) * paginationLimit;
//   const currRange = pageNum * paginationLimit;

//   listItems.forEach((item, index) => {
//     item.classList.add("hidden");
//     if (index >= prevRange && index < currRange) {
//       item.classList.remove("hidden");
//     }
//   });
// };

// window.addEventListener("load", () => {
//   getPaginationNumbers();
//   setCurrentPage(1);

//   prevButton.addEventListener("click", () => {
//     setCurrentPage(currentPage - 1);
//   });

//   nextButton.addEventListener("click", () => {
//     setCurrentPage(currentPage + 1);
//   });

//   document.querySelectorAll(".pagination-number").forEach((button) => {
//     const pageIndex = Number(button.getAttribute("page-index"));

//     if (pageIndex) {
//       button.addEventListener("click", () => {
//         setCurrentPage(pageIndex);
//       });
//     }
//   });
// });