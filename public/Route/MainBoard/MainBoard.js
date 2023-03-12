// 카테고리 제목 가져오기
const urlParams = new URL(location.href).searchParams;
let category = urlParams.get('category');
let categoryTitle = document.querySelector('.category-name');
categoryTitle.textContent = category;

// 페이지 번호 가져오기
let pagenum = parseInt(urlParams.get('page'));
let rowStart = pagenum*15-14;
let rowEnd = pagenum*15;
if(rowEnd > agoraStatesDiscussions.length) rowEnd = agoraStatesDiscussions.length;


//게시판 글 불러오기
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement('div');
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement('a');
  discussionTitle.className = "discussion__title";
  discussionTitle.href = `/disc?category=${category}&id=${obj.id}`;
  discussionTitle.textContent = obj.title;

  const discussionSummary = document.createElement('div');
  discussionSummary.className = "discussion__summary__";
  discussionSummary.innerHTML = obj.bodyHTML;

  const discussionInfo = document.createElement('div');
  discussionInfo.className = "discussion__info";

  const discussionAuthor = document.createElement('div');
  discussionAuthor.className = "discussion__author";
  discussionAuthor.textContent = obj.author;
  const discussionDate = document.createElement('div');
  discussionDate.className = "discussion__date";
  discussionDate.textContent = new Date(obj.createdAt).toDateString();

  discussionInfo.append(discussionAuthor, discussionDate);
  discussionContent.append(discussionTitle, discussionInfo);

  li.append(avatarWrapper, discussionContent);
  return li;
};

const render = (element) => {
  for (let i = rowStart-1; i <= rowEnd-1; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const boardList = document.querySelector("ul.board-list");
render(boardList);


// 오늘 업로드 된 글 개수 & 게시판 총 글 개수
const today = new Date();
let cnt = 0;
agoraStatesDiscussions.every((discussion) => {
  if(new Date(discussion.createdAt).getDate() === today.getDate()) {
    cnt++;
  } else return false;
})

const total = agoraStatesDiscussions.length;
const todayInfoText = document.querySelector('.today-cnt');
todayInfoText.textContent = cnt;
const nowPostCnt = document.querySelector('.now-cnt');
nowPostCnt.textContent = pagenum*15;
const totalPostCnt = document.querySelector('.total-cnt');
totalPostCnt.textContent = total;

// 페이지네이션
const pageNumberBox = document.querySelector('.page-number');

const addPageNum = (i) => {
  const page = document.createElement('a');
  page.href = `/board?category=${category}&page=${i}`;
  page.textContent = i;
  if(i === pagenum) page.className = 'active';
  pageNumberBox.append(page);
}

let nowPageNum = pagenum;
let pageCount = 0;
let tmp = 0, startpage =1, endpage = 10;

if(total % 15 === 0) pageCount = parseInt(total / 15);
else pageCount = parseInt(total/15) + 1;

tmp = (nowPageNum -1) % 10;
startpage = nowPageNum - tmp;
endpage = startpage + 9;
if(endpage > pageCount) endpage = pageCount;

let prevBtn = document.querySelector('.prev');
let nextBtn = document.querySelector('.next');

if(pagenum > 10) {
  prevBtn.href = `/board?category=${category}&page=${startpage-10}`;
} else prevBtn.href = `/board?category=${category}&page=1`;

if(pagenum <= pageCount-9) {
  nextBtn.href = `/board?category=${category}&page=${startpage+10}`;
} else nextBtn.href = `/board?category=${category}&page=${endpage}`;

for(let i=startpage; i<=endpage; i++){
  addPageNum(i);
}

pageNumberBox.childNodes.forEach((a)=>{
  a.addEventListener("click", (e) => {
    pageNumberBox.childNodes.forEach((a)=>{
      e.target.classList.remove('active');
    })
  })
})

prevBtn.addEventListener("click", (e) => {
  if(pagenum === 1) e.preventDefault();
});

nextBtn.addEventListener("click", (e) => {
  if(pagenum === pageCount) e.preventDefault();
});