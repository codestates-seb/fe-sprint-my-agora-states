// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const ul = document.querySelector("ul.discussions__container");
const data = agoraStatesDiscussions;

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // Adding an avatar img
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('discussion__avatar--image');
  avatarImg.src = obj.avatarUrl;
  avatarWrapper.append(avatarImg);

  // ----------------------------------------------------------------------------------

  // Fill in discussion content
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  // Create Empty h2 tag for containing a-tag and adding className
  const discussionTitle = document.createElement("h2");
  discussionTitle.classList.add('discussion__title')

  // Create an a-tag and append it to h2 after filling its inside
  const aHref = document.createElement('a');
  aHref.href = obj.url;
  aHref.textContent = obj.title;
  discussionTitle.append(aHref);

  // Create a div tag for discussion information
  const discussionInfo = document.createElement('div');
  discussionInfo.textContent = `${obj.author}  /  ${obj.createdAt}`;
  discussionInfo.classList.add('discussion__information');

  // Append discussion title and discussion info to the discussion content
  discussionContent.append(discussionTitle, discussionInfo);

  // ----------------------------------------------------------------------------------

  // if the answered is not null, fill the discussion answered value
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  if(obj.answer) {
    const checkMark = document.createElement('p');
    checkMark.textContent = '☑';
    discussionAnswered.append(checkMark);
  }

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.


// append every elements to the DOM at once
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// Initial rendering; it renders 10 elements, as the page loaded
const render = function(element) {
      for (let i = 0; i < 10; i += 1) {
      element.append(convertToDiscussion(data[i]));
      } 
    return;
  };

  // Pagination functions

  // Fetching the button elements from the HTML
const nextBtn = document.querySelector('#nextbtn');
const previousBtn = document.querySelector('#previousbtn');
const pageElement = document.querySelector('#currentpage');

  // Rendering method;
  // it contains pagenum variable that indicates the current page number
const renderPage = (function(){
  let pagenum = 1;

  // Closure; which is actually execute the rendering process with the pagenum variable, auxilary function
  return function(aux, element) {
    pagenum = aux(pagenum, element); 
    // aux function accepts pagenum and element which is expected to append
    // replace the pagenum with new num
  }
})();

const renderNextPage = function(pagenum, element) {
  console.log(pagenum, element);
  
  if(pagenum * 10 > data.length) return pagenum;

  pagenum++; 
  // when the button clicked, it increase the current pagenum

  let endIdx = pagenum * 10;
  let startIdx = (pagenum - 1) * 10;
  // defining star, end index (10-20, 20-30, 30-40)

  // remove all the exisiting elements shown on the current page 
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }

   if(data.length - endIdx >= 10) {

  // appending the next ten user discussion to the element
  for (startIdx; startIdx < endIdx; startIdx++) {
    element.append(convertToDiscussion(data[startIdx]));
  }

  } else {
    for (startIdx; startIdx < data.length; startIdx++) {
      element.append(convertToDiscussion(data[startIdx]));
    }
  }

  // replacing the current textContent of currentpage element
  pageElement.textContent = pagenum;

  return pagenum;
}

const renderPreviousPage = function(pagenum, element) {
  console.log(pagenum, element);
  if(pagenum = 0) return pagenum;
  
  pagenum--;

  let endIdx = pagenum * 10;
  let startIdx = (pagenum - 1) * 10;
  console.log(pagenum, endIdx, startIdx);

  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }

  for (startIdx; startIdx < endIdx; startIdx++) {
    element.append(convertToDiscussion(data[startIdx]));
  }

  return pagenum;
}

function checker() {
  console.log('hi!');
}

nextBtn.addEventListener('click', (() => {renderPage(renderNextPage, ul)})());
// previousBtn.addEventListener('click', () => {renderPage(renderPreviousPage, ul)});

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
render(ul);
