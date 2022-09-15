// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

//===========================================================//
//==================== 렌더링에 필요한 함수 =====================//
//===========================================================//

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
  const img = document.createElement("img");
  img.className = "discussion__avatar--image";
  img.src = obj.avatarUrl;
  img.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(img);

  const h2 = document.createElement("h2");
  h2.className = "discussion__title";
  const anchor = document.createElement("a");
  anchor.href = obj.url;
  anchor.textContent = obj.title;
  h2.append(anchor);
  const div = document.createElement("div");
  div.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(h2);
  discussionContent.append(div);

  const p = document.createElement("p");
  p.textContent = "☑";
  discussionAnswered.append(p);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // 주소의 parameter에서 현재 페이지와 조회 게시물을 불러온다.
  const curPage = (location.href).split('?page=')[1];
  const startContents = (curPage - 1 ) * 10;
  const range = agoraStatesDiscussions.length - curPage * 10;
  const countContents = range < 0 ? curPage * 10 + range : curPage * 10;

  console.log(`게시물 시작 : ${startContents + 1} | 게시물 종료 : ${countContents}`)

  for (let i = startContents; i < countContents; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//===========================================================//
//==================== paging에 필요한 함수 ====================//
//===========================================================//

function pageBtn() {
  const paging = document.querySelector("#paging_area");
  const length = agoraStatesDiscussions.length;
  const page = length % 10 === 0 ? length / 10 : length / 10 + 1;

  for(let i = 1; i < page; i++) {
    const btn = document.createElement('a');
    btn.href = `?page=${i}`;
    btn.textContent = i;
    paging.append(btn);
  }
}

pageBtn();
