let agoraStatesDiscussions = [];

const initialPageNum = 1;
const elementCountByPage = 10;
const totalPageCounts = Math.ceil(agoraStatesDiscussions.length/elementCountByPage);
//pagenation을 생성합니다.
const createPagenation = (num) => {
  const paginationContainer = document.querySelector('.pagination');
  for (let i = 1; i<num+1; i++) {
    let pageIndex = document.createElement('a');
    pageIndex.textContent = i;
    pageIndex.className = `page${i} ${i}`;
    if (i == initialPageNum) {
      pageIndex.setAttribute('id', 'selected');
    }
    pageIndex.addEventListener('click', showContentBySelectedPage)
    paginationContainer.append(pageIndex);
  }
  return;
}
//pagenation 동작 핸들러 설정 
const showContentBySelectedPage = (event) => {
  event.preventDefault();
  //기존 선택된 index class 찾아 제거
  const prevSelected = document.querySelector('#selected');
  prevSelected.setAttribute('id','');
  //새로 선택된 index class 찾아 설정
  renderByPageIndex(ul, event.target.classList[1]);
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  //이미지 원형 아바타 + 글쓴이 정보
  const avatarImg = document.createElement("img");
  avatarImg.setAttribute('class', 'discussion__avatar--image')
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  avatarWrapper.append(avatarImg, discussionInfo);

  //콘텐츠 정보들 삽입 (제목, 본문)
  //h2, a 태그 - 질문제목 해당
  const contentTitle = document.createElement("h3");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  contentTitle.append(titleAnchor);
  contentTitle.className = "discussion__title";
  
  const contentBody = document.createElement('div');
  contentBody.className = "discussion__body";
  contentBody.innerHTML = obj.bodyHTML;
    
  discussionContent.appendChild(contentTitle);
  discussionContent.appendChild(contentBody);

  // 글쓴이 아이디, 글 작성 시간
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//form 입력 이벤트 핸들러 추가 + localstorage 동작
const discussion_form = document.querySelector(".form__container > form");
discussion_form.addEventListener('submit', (event) => {
  event.preventDefault();
  let new_discussion = {
    id : "any random string",
    author : discussion_form.name.value,
    createdAt : new Date(),
    //랜덤 아바타 생성
    avatarUrl : `https://avatars.dicebear.com/api/human/${Math.random()}.svg`,
    url : "",
    title : discussion_form.title.value,
    bodyHTML : discussion_form.story.value,
  };
  ul.prepend(convertToDiscussion(new_discussion));
  
  // 
  let discussionList = JSON.parse(localStorage.getItem('discussion-list')) ?? Object.assign({});
  console.log('삽입 전',discussionList);
  discussionList[Object.keys(discussionList).length] = new_discussion;
  console.log('삽입 후', discussionList)
  localStorage.setItem('discussion-list',JSON.stringify(discussionList));
  console.log(JSON.parse(localStorage.getItem('disscussion-list')));
})

// new_agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const renderByPageIndex = (element, index) => {
  const selectedIndex = document.querySelector(`.page${index}`);
  if (selectedIndex != null) selectedIndex.setAttribute('id','selected');
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    //해당 pageIndex에 요소만 convert
    if (i >= (index-1)*elementCountByPage && i < index*elementCountByPage) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    } 
    if (i == index*elementCountByPage) return;
  }
  return;
};

fetch('http://localhost:4000/discussions')
.then(res => res.json())
.then(json => {
  agoraStatesDiscussions = json;
  const ul = document.querySelector("ul.discussions__container");
  createPagenation(totalPageCounts);
  return ul;
}).then((ul) => {
  renderByPageIndex(ul, initialPageNum);
})


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.


