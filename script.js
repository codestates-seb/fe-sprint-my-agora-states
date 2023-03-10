// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
//  pagination기능, 데이터 10개씩 출력
const pagination = (discussions) => {
  const count = 10;
  const discussion = [...discussions.children];
  const pages = document.querySelector('.page__num');
  const prevPage = document.querySelector('#prevPage');
  const nextPage = document.querySelector('#nextPage');
  const Fullpages = Math.ceil(discussion.length / count);
  let FirstPage = 1;
//이전,다음버튼 활성,비활성화
  const buttonActive = () => {
    if(FirstPage === 1) {
      prevPage.setAttribute('disabled', "")   // 이전버튼 비활성화 ""는 true의 의미
    } else prevPage.removeAttribute('disabled')  
    if(FirstPage === Fullpages) {             
      nextPage.setAttribute('disabled', "")   // 마지막페이지일때 다음버튼 비활성화
    } else nextPage.removeAttribute('disabled')
}
  //페이지 번호 버튼 생성 
  const showPagenumber = (index) => {
    const pageNum = document.createElement('button');
    pageNum.className = 'page__numBtn';
    pageNum.textContent = index;
    pageNum.setAttribute('page-index', index)
    pageNum.setAttribute('label', 'pageNum' + index)
    pages.append(pageNum);
  }
  //페이지 수 카운트
  const PageNumber = () => {      //10개기준 페이지
    for(let i = 1; i < Fullpages+1; i++) {
      showPagenumber(i)
    }
  }
  const pageNumber =() => {
    const pageBtn = [...pages.children];  //page버튼 
    pageBtn.forEach(button => {
      button.onclick = function(event) {
       FirstPage = event.target.getAttribute('page-index')
      }
    })
  }
  // 현재 페이지에 맞춰 discussion 출력
  const presentPage = (pageNum) => {
    FirstPage = pageNum;  //현재 페이지 설정
    buttonActive();       //버튼 활성화
    pageNumber();         
    const prevRange = (pageNum - 1) * count; //0, 10
    const currRange = pageNum * count //10, 20
    discussion.forEach((item, index) => {
      item.classList.add('hide')
      if(index >= prevRange && index < currRange) {
        item.classList.remove('hide')
      }
    });
  }
//pagination
  window.addEventListener('load', () => {
    PageNumber();
    presentPage(1);
    // 이전 클릭 페이지-1
    prevPage.addEventListener('click', () => {
      presentPage(FirstPage - 1)
    })
    //다음 클릭 페이지 +1
    nextPage.addEventListener('click', () => {
      presentPage(FirstPage + 1)
    })
    //페이지 넘버 클릭 이벤트
    const pageBtn = [...pages.children];
    pageBtn.forEach(button => {
      const pageNum = Number(button.getAttribute('page-index'))
      button.addEventListener('click', () => {
        presentPage(pageNum);
      })  
    })
  });
}
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";
  //  li.discussion__container 생성, div  자식 생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 아바타 이미지 할당
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);
  // 제목
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  discussionTitle.className = "discussion__title"
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  // 정보
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`
  discussionContent.append(discussionTitle, discussionInformation);
// 댭변 상태에 따라 아이콘 사용  img src
  const answerImg= document.createElement("img")
  answerImg.src = obj.answer ? 'image/sun.png' : 'image/cloud.png';
  discussionAnswered.append(answerImg)
  // li에 div 3개 할당
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
// --- agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  pagination(element)
  return;
};
// --- ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
 // return ul.append(li)
const ul = document.querySelector("ul.discussions__container");
render(ul);
//discussion 추가
const form = document.querySelector('form.form')
const title = document.querySelector('input#title')
const author = document.querySelector('input#name')
const story = document.querySelector('textarea#story')
const images = ["profile_1.png","profile_2.png","profile_3.png","profile_4.png"];
const chosenImage = images[Math.floor(Math.random() * images.length)];
const bgImage = document.createElement("img");
form.addEventListener('submit', (event) =>{
  event.preventDefault();
  let newDiscussion = {
    id : "unique value",
    createdAt: new Date(),
    title: title.value,
    url: "#",
    author: author.value,
    answer: null,
    bodyHTML: story.value,
    avatarUrl: author.value ? `img/${chosenImage}` : 'image/Ghost.gif'
  };
  ul.prepend(convertToDiscussion(newDiscussion))
  title.value ="";
  author.value = "";
  story.value = "";
})