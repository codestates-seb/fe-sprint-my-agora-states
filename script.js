// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
let data;
const dataFromLocalStorege = localStorage.getItem('agoraStatesDiscussions');
if (dataFromLocalStorege) {
  data = JSON.parse(dataFromLocalStorege);
} else {
  data = agoraStatesDiscussions.slice();
}
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
  //이미지
  const image = document.createElement('img');
  image.src = obj.avatarUrl;
  image.alt = `avatar of ${obj.author}`;
  image.classList.add('discussion__avatar--image');
  avatarWrapper.append(image);

  //컨텐츠
  const title = document.createElement('h2')
  title.classList.add('discussion__title');
  
  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  title.append(titleLink);

  const time = obj.createdAt;
  
  const info = document.createElement('div');
  info.classList.add('discussion__information');
  info.textContent = `${obj.author} / ${time.slice(0, 10)} | ${time.slice(-9, -1)}`
  discussionContent.append(title, info);

  // 체크박스
  const checked = document.createElement('p');
  checked.textContent = obj.answer ? '✅' : '❎';
  discussionAnswered.append(checked);
  
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const render = (element, from, to) => {
  if(!from && !to) {
    from = 0;
    to = data.length-1
  }
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = from; i < to; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

let limit = 5;
let page = 1;
const showPageNum = 4;
let pageGroup = Math.ceil(page/showPageNum);
let pageTotal = Math.ceil(data.length/limit);

const ul = document.querySelector("ul.discussions__container");
render(ul, 0, limit)

// 페이지네이션
const ulTag = document.querySelector('.pageUl');
/////

const makePagination = (pageGroup) => {
  while(ulTag.firstChild) {
    ulTag.removeChild(ulTag.firstChild);
  }
  let last = pageGroup*showPageNum;
  if(last>pageTotal) {
    last = pageTotal;
  }
  let first = last-(showPageNum-1) <= 0 ? 1 : last-(showPageNum-1);
  const prev = document.createElement('li')
  prev.classList.add('btn', 'prev');
  prev.textContent = `◀ Prev`;
  ulTag.append(prev);
  for (let i = first; i<=last; i++) {
    const list = document.createElement('li');
    list.classList.add('numb');
    list.textContent = i;
    list.value = i;
    ulTag.append(list);
  }
  const next = document.createElement('li')
  next.classList.add('btn', 'next');
  next.textContent = `next ▶︎`;
  ulTag.append(next);

const removeClass = (obj, className) => {
  obj.forEach(el=>el.classList.remove(className));
}

const liPrev = document.querySelector('.prev');
liPrev.addEventListener('click', () => {
  if(pageGroup>1) {
    pageGroup = pageGroup-1;
    makePagination(pageGroup);
    removeClass(liNumb, 'active')
    ulTag.children[1].classList.add('active')
  }
  page = 1;
  const {pageStart, pageEnd} = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
})

const liNext = document.querySelector('.next')
liNext.addEventListener('click', () => {
  if (pageGroup<Math.floor(Math.ceil(pageTotal)/showPageNum)) {
    pageGroup = pageGroup+1;
    makePagination(pageGroup);
    removeClass(liNumb, 'active');
    ulTag.children[1].classList.add('active')
  }
  page = 5;
  const {pageStart, pageEnd} = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
  
})

const liNumb = document.querySelectorAll('.numb');
liNumb.forEach(el=>{
  el.addEventListener('click', ()=>{
    removeClass(liNumb, 'active');
    el.classList.add('active');
    page = Number(el.value);
    const {pageStart, pageEnd} = getPageStartEnd(limit, page);
    render(ul, pageStart, pageEnd);
  })
})

}
makePagination(pageGroup);

const getPageStartEnd = (limit, page) => {
  const len = data.length-1;
  let pageStart = Number(page-1) * Number(limit);
  let pageEnd = Number(pageStart) + Number(limit);
  if(page <= 0) {
    pageStart=0;
  }
  if(pageEnd>=len) {
    pageEnd=len;
  }
  return {pageStart, pageEnd};
};
/*
const removeClass = (obj, className) => {
  obj.forEach(el=>el.classList.remove(className));
}

const liPrev = document.querySelector('.prev');
liPrev.addEventListener('click', () => {
  if(page>1) {
    page = page-1;
    if(pageGroup>1) {
      pageGroup = pageGroup-1;
      makePagination(pageGroup);
    }
  }
  const {pageStart, pageEnd} = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
  console.log(pageGroup)
})

const liNext = document.querySelector('.next')
liNext.addEventListener('click', () => {
  if (limit*page<data.length-1) {
    page = page+1;
    if (pageGroup<Math.floor(Math.ceil(pageTotal)/showPageNum)) {
      pageGroup = pageGroup+1;
      makePagination(pageGroup);
    }
  }
  const {pageStart, pageEnd} = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
  console.log(pageGroup)
})



const liNumb = document.querySelectorAll('.numb');
liNumb.forEach(el=>{
  el.addEventListener('click', ()=>{
    removeClass(liNumb, 'active');
    el.classList.add('active');
    page = Number(el.value);
    const {pageStart, pageEnd} = getPageStartEnd(limit, page);
    render(ul, pageStart, pageEnd);
  })
})
*/
/*function paging(totalPages, page)  {
  const ulTag = document.querySelector('.pageUl');
  let liTag = '';
  let activeli;
  let beforPages = page-1;
  let afterPages = page+1;
  if(page>1) {
    liTag += `<li class='btn prev' onclick="paging(total, ${page-1})"><span>&lt;Prev</span></li>`;
  }

  for(let pageLength = beforPages; pageLength<=afterPages; pageLength++) {
    if(pageLength>totalPages) {
      continue;
    }
    if(pageLength===0) {
      pageLength = pageLength+1;
    }
    if(page===pageLength) {
      activeli = "active";
    } else {
      activeli = "";
    }
    liTag += `<li class='numb ${activeli}'><span>${pageLength}</span></li>`;
  }

  if(page < totalPages) {
    liTag += `<li class='btn next' onclick="paging(total, ${page+1})"><span>Next&gt</span></li>`;
  }
  ulTag.innerHTML = liTag;
}
*/
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.

// 업로드
/*const submit = document.querySelector('form__submit input');
const uploadText = document.querySelector('textarea');
const uploadTitle = document.querySelector('form__input--title input')
const uploadName = document.querySelector('form__input--name input')

submit.onClick = () => {
  console.log('asdasd')
  const newObj = {};
  newObj.title = uploadTitle.value;
  newObj.author = uploadName.value;
  agoraStatesDiscussions.push(newObj)
}*/


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.