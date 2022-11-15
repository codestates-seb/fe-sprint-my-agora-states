let data;
let currentPage = 1;

const localStorageData = localStorage.getItem("discussionData");

if(localStorageData) { 
  data = JSON.parse(localStorageData) 
} else { 
  data = agoraStatesDiscussions.slice();
}


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

  // 프로필
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg)

  // 콘텐츠
  const discussionTitle = document.createElement('h2');
  const titleAnchor = document.createElement('a')
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor)
  discussionContent.append(discussionTitle)

  // 날짜
  const discussionInfo = document.createElement('div');
  discussionInfo.className = "discussion__information";
  
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`
  discussionContent.append(discussionInfo)

  // 답변
  const checked = document.createElement('p')
  checked.textContent = obj.answer ? "🥳" : "😞";
  discussionAnswered.append(checked)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


const render = (element, currentPage) => {
  while (element.firstChild) { 
    element.removeChild(element.firstChild);
  }     
  for (let i = 0 + (currentPage - 1) * 10; i < currentPage * 10; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }

  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, currentPage);



// 디스커션 추가 구현

// 문서 내용 가져 오기

const form = document.querySelector("form.form")

form.addEventListener ("submit",
  (event) => {
    event.preventDefault();

    const author = form.querySelector("div.form__input--name > input").value
    const title = form.querySelector("div.form__input--title > input").value
    const textbox = form.querySelector("div.form__textbox > textarea").value

    const newObj = {
      id: "new id",
      createdAt: new Date().toISOString(),
      title: title,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions",
      author: author,
      bodyHTML: textbox,
      avatarUrl: "https://avatars.githubusercontent.com/u/92300124?s=64&u=82d8e12bfca4deb05c7f86db7d3c15e06ca34d05&v=4",
    }

    agoraStatesDiscussions.unshift(newObj)

    const discussion = convertToDiscussion(newObj)

    ul.prepend(discussion)

    form.querySelector("div.form__input--name > input").value
    form.querySelector("div.form__input--title > input").value
    form.querySelector("div.form__textbox > textarea").value

    data.unshift(newObj)

    localStorage.setItem("discussionData", JSON.stringify(data)); // (7) 업데이트 된 data를 다시 로컬 스토리지의 `discussionData` 키의 값으로 저장

    render(ul, currentPage)

    formSubmit.addEventListener( 'submit', submitQuestion ) // (4) submit 버튼 눌렀을 때 이벤트 설정

  }
)





/* 페이지 네이션 */



function pageRender() {
  const pageCount = calculatePageCount();
  renderPageButtons(pageCount);
  pageButtonsAddEventListener();
}

pageRender();

function calculatePageCount() {
  const DISCUSSIONS_RENDER_PER_PAGE = 10;

  return Math.ceil(agoraStatesDiscussions.length / DISCUSSIONS_RENDER_PER_PAGE);
}

function renderPageButtons(count) {
  const pageButtonWrapper = document.querySelector("#page-button-wrapper");
  for (let i = 1; i <= count; i++) {
    const button = document.createElement("button");
    button.className = "page-button";
    button.textContent = i;
    pageButtonWrapper.append(button);
  }
}

function pageButtonsAddEventListener() {
  const buttons = document.querySelectorAll(".page-button");
  buttons.forEach((button) => {
    button.addEventListener("click", handlePageButtons);
  });
}

function handlePageButtons(event) {
  const pageNumber = event.target.textContent;
  currentPage = pageNumber;
  clearDiscussions();
  render(ul, currentPage);
}

function clearDiscussions() {
  const discussionContainers = document.querySelectorAll(".discussion__container");
  discussionContainers.forEach((element) => {
    element.remove();
  });
}



