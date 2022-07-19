// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// submit 클릭 시 새로운 질문 추가
const submitBtn = document.querySelector('.form__submit input');
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const userName = document.querySelector('#name');
  const userTitle = document.querySelector('#title');
  const userStory = document.querySelector('#story');

   agoraStatesDiscussions.unshift({
    id: Date.now(),
    createdAt : new Date(),
    title : userTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author : userName.value,
    answer : null,
    bodyHTML : userStory.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
  });

  localStorage.setItem("agoraStatesDiscussions", JSON.stringify(agoraStatesDiscussions));
  
  // 초기화 후 다시 render
   const ul = document.querySelector("ul.discussions__container");
   while ( ul.hasChildNodes() )
   {
    ul.removeChild( ul.firstChild );       
   }
   render(ul);

  userName.value = '';
  userTitle.value = '';
  userStory.value = '';
})

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
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = "discussion__title";
  const discussionTitleHref = document.createElement('a');
  discussionTitleHref.href = obj.url;
  discussionTitleHref.textContent = obj.title;
  discussionTitle.append(discussionTitleHref);
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement('div');
  discussionInfo.className = "discussion__information";

  const createdAt = obj.createdAt? new Date(obj.createdAt) : new Date();

  discussionInfo.textContent = `${obj.author} / ${new Date(createdAt).toLocaleString("ko-KR")}`
  discussionContent.append(discussionInfo);

  answerIcon = document.createElement('span');
  discussionAnswered.append(answerIcon);
  if(obj.answer !== null) {
    answerIcon.textContent = 'O'
    answerIcon.classList.add('true')
  } else {
    answerIcon.textContent = `X`;
    answerIcon.classList.add('false')
  };

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  let data = JSON.parse(localStorage.getItem("agoraStatesDiscussions"));
  data = data.slice().splice(pageIndex*10,10);
  for (let i = 0; i < data.length; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

const convertToPagination = (item) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "pagination__item"; // 클래스 이름 지정
  li.append(item);
  return li;
}

const paginationRender = (element) => {
  let data = JSON.parse(localStorage.getItem("agoraStatesDiscussions"));
  data = Math.ceil(data.length / 10)
  for (let i = 0; i < data; i += 1) {
    element.append(convertToPagination(i+1));
  }
  element.prepend(convertToPagination('<'));
  element.append(convertToPagination('>'));
  return;
}

let pageIndex = 0;
window.onload = ()=>{
  const pageList = document.querySelectorAll('.pagination__item');
  const pageContainer = document.querySelector('.pagination__container')

  pageList[0].classList.add('prev');
  pageList[pageList.length-1].classList.add('next');
  pageList[1].classList.add('active');

  pageContainer.addEventListener('click', (e)=> {
    pageIndex = Number(e.target.textContent)-1;
    if ([...e.target.classList].includes('next') || [...e.target.classList].includes('prev')) return false
    pageList.forEach(list=> { list.classList.remove('active')})
    e.target.classList.add('active')

    // 초기화 후 다시 render
    const ul = document.querySelector("ul.discussions__container");
    while ( ul.hasChildNodes() )
    {
      ul.removeChild( ul.firstChild );       
    }
    render(ul);
  })

  const prevBtn = document.querySelector('.pagination__item.prev');
  const nextBtn = document.querySelector('.pagination__item.next');
  prevBtn.addEventListener('click', () => {
    pageList[pageIndex].click();
    pageIndex = pageIndex -1 
    console.log(pageList[pageIndex])
    console.log(pageIndex)
  })

}
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const paginationUl = document.querySelector("ul.pagination__container");
paginationRender(paginationUl)