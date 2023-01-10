// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //이미지영역
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  //컨텐츠영역
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  
  //체크박스
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //이미지 영역과 속성들
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avata of' + obj.author;
  avatarWrapper.append(avatarImg);

  //컨텐츠 영역과 컨텐츠들
  //제목
  const contentText = document.createElement('h2');
  contentText.className = 'discussion__title';
  const titleUrl = document.createElement('a');
  titleUrl.href = obj.url;
  titleUrl.textContent = obj.title;

  contentText.append(titleUrl);

  //작성자&날짜
  const userInfo = document.createElement('div');
  userInfo.className = 'discussion__information';
  userInfo.textContent = obj.author + ' / ' + obj.createdAt;

  discussionContent.append(contentText, userInfo);

  //체크박스 부르기
  const checkBox = document.createElement('p');
  checkBox.textContent = '☑';
  discussionAnswered.append(checkBox);
  
  // li에 컨텐츠들 자식으로 넣기
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
  
  //결국엔 li를 리턴하는 함수다.
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