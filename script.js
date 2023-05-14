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



  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // 초기화
  element.innerHTML = '';
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    let data = agoraStatesDiscussions[i];

    let liEl = document.createElement('li');
    liEl.classList.add('discussion__container');

    let discAvaWrap = document.createElement('div');
    discAvaWrap.classList.add('discussion__avatar--wrapper');

    let discAvaImg = document.createElement('img');
    discAvaImg.classList.add('discussion__avatar--image');
    discAvaImg.src = data.avatarUrl;
    discAvaWrap.appendChild(discAvaImg);

    let discCont = document.createElement('div');
    discCont.classList.add('discussion__content');

    let discTit = document.createElement('h2');
    let hrefTit = document.createElement('a');
    hrefTit.href = data.url;
    hrefTit.textContent = data.title;
    discTit.append(hrefTit);
    
    let discInfo = document.createElement('div');
    discInfo.classList.add('discussion__information');
    discInfo.textContent = data.author + ' / ' + data.createdAt;
    
    discCont.appendChild(discTit);
    discCont.appendChild(discInfo);

    let discAnsw = document.createElement('div');
    discAnsw.classList.add('discussion__answered');
    discAnsw.textContent = '☑';

    liEl.appendChild(discAvaWrap);
    liEl.appendChild(discCont);
    liEl.appendChild(discAnsw);

    element.appendChild(liEl);

  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ulEl = document.querySelector("ul.discussions__container"); // ul태그의 ciscussions__container 클래스
render(ulEl);
