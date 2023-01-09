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

  // 불러올 것 이미지, 제목<h2 class="discussion__title">,
  // 이름시간 <div class="discussion__information">
  const avatarImg = document.createElement('img');
    avatarImg.src = agoraStatesDiscussions[0].avatarUrl;
    avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[0].author;
    avatarWrapper.append(avatarImg);

    // 제목+링크 불러오기
  const avatarTitle = document.createElement('h2'); // h2태그 생성
  const titleHref = document.createElement('a');  // a태그 생성(제목, 링크)
    titleHref.textContent = agoraStatesDiscussions[0].title; // 더미title 컨텐츠 삽입
    titleHref.href = agoraStatesDiscussions[0].url; // 더미링크 삽입
    avatarTitle.append(titleHref);  // h2태그에 <a href:agora[0].url> 어펜드
    discussionContent.append(avatarTitle); // div>h2>a href

    // 작성자 / 날짜 불러오기


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};



// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
