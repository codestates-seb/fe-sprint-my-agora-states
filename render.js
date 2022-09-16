// 렌더링 스크립트

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
    const li = document.createElement("li"); // li 요소 생성
    li.className = "discussion__container"; // 클래스 이름 지정
  
    // 아바타 래퍼
    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
    // 컨텐츠
    const discussionContent = document.createElement("div");
    discussionContent.className = "discussion__content";
    // 답변 여부
    const discussionAnswered = document.createElement("div");
    discussionAnswered.className = "discussion__answered";
  
    li.append(avatarWrapper, discussionContent, discussionAnswered);
  
    // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
    // 아바타래퍼 > 아바타 이미지
    const discussionAvatarImage = document.createElement("img");
    discussionAvatarImage.className = "discussion__avatar--image";
    discussionAvatarImage.src = obj.avatarUrl;
    discussionAvatarImage.alt = "avatar of " + obj.author
    avatarWrapper.append(discussionAvatarImage);
    // 컨텐츠 > 제목
    const discussionTitle = document.createElement("h2")
    discussionTitle.className = "discussion__title"
    discussionContent.append(discussionTitle);
    // 컨텐츠 > 제목 > 링크
    const discussionTitleHref = document.createElement("a");
    discussionTitleHref.href = obj.url
    discussionTitleHref.textContent = obj.title;
    discussionTitle.append(discussionTitleHref);
    // 컨텐츠 > 작성자, 작성일
    const discussionInformation = document.createElement("div");
    discussionInformation.className = "discussion__information";
    discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
    discussionContent.append(discussionInformation);
    // 답변여부 > 답변? V 표시 : X 표시
    const discussionAnsweredMark = document.createElement("p")
    discussionAnsweredMark.textContent = obj.answer ? '✅' : '❌';
    discussionAnswered.append(discussionAnsweredMark);
  
    return li;
  };

// 현재 페이지 변수
let currentPage = 1;
// 현재 페이지 element
const currentPageParagraph = document.querySelector('.page__current')
// 페이지 <p> 렌더링 함수
const renderPageParagraph = (param) => {
  currentPageParagraph.textContent = param;
}
// 새로고침 했을 때 page 바뀜
renderPageParagraph(currentPage);

// 페이지 변경
const prevPage = document.querySelector('.page__prev');
const nextPage = document.querySelector('.page__next');
prevPage.addEventListener('click', () => {
  currentPage === 1 ? alert('제일 앞 페이지입니다.') : currentPage--;
  renderPageParagraph(currentPage)
  // 페이지 클리어 
  while(ul.lastElementChild){
    ul.removeChild(ul.lastElementChild)
  }
  console.log('현재페이지 ' + currentPage)
  setPageAgoraData();
  console.log(pageAgoraData);
  // 렌더링
  render(ul);
})
nextPage.addEventListener('click', () => {
  currentPage === newArrayAgoraData.length ? alert('마지막 페이지입니다.') : currentPage++;
  renderPageParagraph(currentPage)
  // 페이지 클리어 
  while(ul.lastElementChild){
    ul.removeChild(ul.lastElementChild)
  }
  console.log('현재페이지 ' + currentPage)
  setPageAgoraData();
  console.log(pageAgoraData);
  render(ul);
})

// 아고라 스테이츠의 배열을 10개씩 배열에 담는다.
const newArrayAgoraData = [];
const setNewArrayAgoraData = (() => {
    for (let i = 0; i <= Math.ceil(agoraStatesDiscussions.length / 10) - 1 ; i++) {
        newArrayAgoraData.push(agoraStatesDiscussions.slice(0 + i*10, i*10 +10))
    }
    console.log(newArrayAgoraData)
})();

// pageAgoraData 배열의 데이터를 화면에 렌더링하는 함수입니다.
let pageAgoraData = [];
const setPageAgoraData = () => {
  pageAgoraData = newArrayAgoraData[currentPage - 1]
};
setPageAgoraData();
console.log(pageAgoraData);

const render = (element) => {
  for (let i = 0; i < pageAgoraData.length; i += 1) {
    element.append(convertToDiscussion(pageAgoraData[i]));
  }
  return;
};

// ul 요소에 pageAgoraData 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);