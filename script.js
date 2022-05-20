// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // div 요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper"; // 클래스 이름 읽을 수  있다.
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  // classList - 클래스 전체를 문자열 형태로 반환해주는 프로퍼티, 클래스 전체를 관리할 떄 유용하다.
  // className - 클래스 하나를 관리할 수 있게 해주는 메서드, add/remove/toggle/contains 가
  // 구현된 객체를 반환, 개별 클래스를 조작할 때 유용하다

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // 아바타 이미지
  const avatarImg = document.createElement("img"); // img 요소 생성
  avatarImg.src = obj.avatarUrl; // 객체에 담겨있는 이미지의 주소를 가져온다.
  avatarImg.alt = "avatar of " + obj.author; // 이미지를 설명해주는 코드
  avatarWrapper.append(avatarImg); // 이미지를 추가한다.
  // 아바타 이미지

  // 타이틀
  const discussionTitle = document.createElement("h2"); // h2 요소 생성
  const titleAnchor = document.createElement("a"); // a 요소 생성
  titleAnchor.href = obj.url; // 객체에 담겨있는 타이틀 주소를 가져온다.
  titleAnchor.textContent = obj.title; // 모든 텍스트를 그대로 가지고온다.
  discussionTitle.append(titleAnchor);
  // 타이틀

  // 인포
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionTitle, discussionInformation); // 여기서 타이틀까지 같이 불러온다
  // 인포

  // 체크박스
  const ptag = document.createElement("p");
  ptag.textContent = "☑";
  discussionAnswered.append(ptag);
  // 체크박스

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
