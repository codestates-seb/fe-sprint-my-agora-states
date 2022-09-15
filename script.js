// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

// 1. 아바타 요소 discussion__avatar--wrapper에 들어가는 요소
// 2. img 요소 discussion__avatar--image

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement('img');
  avatarImg.classList = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;

// 노드에 맞게 append
  avatarWrapper.append(avatarImg);

// 1. 콘텐츠 요소 discussion__content에 들어가는 요소
// 2. h2 요소 discussion__title와 자식 a 요소
// 3. a 요소는 객체의 url을 하이퍼링크와 더불어 텍스트로 title을 담음
// 4. div 요소 discussion__information에는 작성자와 작성 시간이 들어감

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
// discussion__title와 자식 a 요소 생성 및 데이터 할당
  const contentTitle = document.createElement("h2");
  const contentTitleText = document.createElement("a");
  contentTitle.classList = "discussion__title";
  contentTitleText.href = obj.url;
  contentTitleText.textContent = obj.title;

  // Advanced Challenge
  // createdAt을 변형하여 예와 같이 렌더링(ex. 오전 10:02:17)
  // 원 상태 createdAt: "2022-05-16T02:47:27Z" slice() 사용
    let revisedCreatedAt = obj.createdAt.slice(11, 19);
    console.log(typeof revisedCreatedAt)
    if (revisedCreatedAt[0] > 0 && revisedCreatedAt[1] > 1) {
      revisedCreatedAt = '오후 ' + revisedCreatedAt
    } 
    else {
      revisedCreatedAt = '오전 ' + revisedCreatedAt
    }

// discussion__information의 작성자 및 작성 날짜 데이터 할당
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${revisedCreatedAt}`;

// 노드에 맞게 append
  contentTitle.append(contentTitleText);
  discussionContent.append(contentTitle);
  discussionContent.append(discussionInformation);

// 1. Answered 요소는 체크박스 하나만 들어감
// 2. 체크박스는 체크가 되어야 하는데 스트링으로 넣으면 어떻게 처리?
// 인덱스 활용

  const discussionAnswered = document.createElement("div");
  const discussionCheckbox = document.createElement("p");

// Advanced Challenge
// 답변 여부 렌더링
  if(obj.answer === null) {
    discussionCheckbox.textContent = '☒';
  } 
  else {
    discussionCheckbox.textContent = '☑';
  }
  discussionAnswered.className = "discussion__answered";

// 노드에 맞게 append
  discussionAnswered.append(discussionCheckbox);
  discussionContent.append(discussionAnswered);


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