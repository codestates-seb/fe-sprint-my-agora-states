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
  //이미지
  const image = document.createElement('img');
  image.src = obj.avatarUrl;
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
  // 페이지네이션
  

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
const pageul = document.querySelector('.pagingul');

render(ul);
/*
let total = agoraStatesDiscussions.length;
function paging(totalPages, page)  {
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
paging(total, 5);*/
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.

