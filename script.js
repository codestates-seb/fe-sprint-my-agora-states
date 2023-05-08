// 화면 표시 질문 수
const contentPerPage = 6;

// 0. localStorage 확인
initialize();

// DOM list 추가
const convertToDiscussion = (obj) => {

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // div 요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper"; // 클래스 이름 지정
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  li.append(avatarWrapper, discussionContent, discussionAnswered);

  const discussionContent_title = document.createElement('h2');
  discussionContent_title.className = "discussion__title";
  const discussionContent_information = document.createElement('div');
  discussionContent_information.className = "discussion__information";
  discussionContent.append(discussionContent_title, discussionContent_information);

  const discussionContent_title_link = document.createElement('a');
  discussionContent_title.append(discussionContent_title_link);

  discussionContent_title_link.href = obj.url;
  discussionContent_title_link.textContent = obj.title;
  discussionContent_information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleDateString()}`;

  //질문자 사진
  const avatarImage = document.createElement('img');
  avatarImage.className = 'avatarImage';
  avatarImage.src = obj.avatarUrl;
  avatarWrapper.append(avatarImage);

  // 답변여부 체크표시 
  if(obj.answer !== null){
    discussionAnswered.textContent = '☑';
  } else {
    discussionAnswered.textContent = '◻︎';
  }

  return li;
};

// 1. 첫 화면 호출함수
const render = (element) => {
  let firstDiscussionList = agoraStatesDiscussions.slice(0,contentPerPage)

  for(let i=0; i<contentPerPage; i++){
    element.append(convertToDiscussion(firstDiscussionList[i]));
  }
  return
}
  
// 1) 컨텐츠 호출
const ul = document.querySelector("ul.discussions__container");
render(ul);
  
// 2) 페이지 목록 호출
const totalData = agoraStatesDiscussions.length;
const totalPageNum = Math.ceil(totalData/contentPerPage);
const pageNumberContainer = document.querySelector(".discussion__NumberContainer");

function makePageNumberObj (obj) {  

    let pageNumberObj = []
    for(let i=1; i<obj+1; i++){
       pageNumberObj[i-1] = i
    }

    return pageNumberObj;
}

function createPageNumber () {
    for(let i=0; i<totalPageNum; i++){
        let pageNumber = document.createElement('span');
        pageNumber.className = 'pageNum'
        pageNumber.textContent = makePageNumberObj(totalPageNum)[i];
        
        pageNumberContainer.append(pageNumber);
    }       
}

createPageNumber();


// 2. 버튼 click 이벤트 관련

// 1) submit 클릭
const questionWriteName = document.querySelector('#name');
const questionWriteTitle = document.querySelector('#title');
const questionWriteContent = document.querySelector('#story');
const questionForm = document.querySelector('.form');

// 신규 discussion 추가 - 신규 정보 추가 / localStorage 저장
questionForm.addEventListener('submit', function(event) {

  event.preventDefault();

  //신규정보 추가
  agoraStatesDiscussions.unshift(
    {id:'',
    createdAt: new Date().toLocaleDateString(),
    title: questionWriteTitle.value,
    url: '',
    author: questionWriteName.value,
    answer: null,
    bodyHTML:'',
    avatarUrl: "https://blog.kakaocdn.net/dn/bfKELN/btqVK7Ju4nV/DvWVeO2YdJyn2vC76h6J9K/img.jpg",
    })

      let deletNumber = previousPageList.childElementCount;

      for(let i=0; i<deletNumber; i++){
        previousPageList.removeChild(document.querySelector('.discussion__container'))
      }

      const questionPlusRender = function (element) {
        for(let i=0; i<contentPerPage; i++){
         element.append(convertToDiscussion(agoraStatesDiscussions[i])) 
        }
      }

      questionPlusRender(ul);

      // localstrage에 저장
      window.localStorage.setItem('discussionData', JSON.stringify(agoraStatesDiscussions));

    }
)

// 신규 페이지 목록 추가
questionForm.addEventListener('submit', function(event) {

    event.preventDefault();

    let lastPageNumber = document.querySelector('.discussion__NumberContainer').childElementCount;
    let currentPageNumber = Math.ceil(agoraStatesDiscussions.length/contentPerPage);

    if(lastPageNumber < currentPageNumber) {
        let pageNumber = document.createElement('span');
        pageNumber.className = 'pageNum'
        pageNumber.textContent = currentPageNumber;
        
        pageNumberContainer.append(pageNumber);
    }
    return;
})


// 2) 페이지 목록 클릭
const pageNumberButton = document.querySelector('.discussion__NumberContainer');
const previousPageList = document.querySelector('.discussions__container')

pageNumberButton.addEventListener('click', function(event){

    //페이지 번호가 아닌, 빈 공백을 클릭했을 때
    if (event.target.childElementCount !==0){
        return;
    }

        let pageNumber = parseInt(event.target.textContent)
        let newPageList = agoraStatesDiscussions.slice(contentPerPage*(pageNumber-1)+1, contentPerPage*pageNumber+1)

        //기존 목록 지우기
        if(previousPageList.childElementCount !== 0) {
            let deletNumber = previousPageList.childElementCount;
            for(let i=0; i<deletNumber; i++){
                previousPageList.removeChild(document.querySelector('.discussion__container'))
            }
        }

        //갱신 목록 추가
        if(pageNumber === 1){
            render(ul)
        }
        else if(newPageList.length === contentPerPage) {
            const reRender = function (element) {

                for(let i=0; i<contentPerPage; i++){
                    element.append(convertToDiscussion(newPageList[i]))
                }
            }
    
            reRender(ul);
        }
        else {
            const reRenderSmallNumber = function(element) {
                for(let i=0; i<newPageList.length; i++){
                    element.append(convertToDiscussion(newPageList[i]))
                }
            }
            reRenderSmallNumber(ul);
    }
})


//화면 초기화 함수
function initialize () {

  if(localStorage.getItem('discussionData') !== null){
    agoraStatesDiscussions = JSON.parse(window.localStorage.getItem('discussionData'));
  } else {
    agoraStatesDiscussions = agoraStatesDiscussionsOrigin;
  }
}



