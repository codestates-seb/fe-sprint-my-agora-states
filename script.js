// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const ul = document.querySelector('ul.discussion__container'); 
  //ul 요소불러오기

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 이미지 불러오기
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);


  // 타이틀 불러오기, 링크 불러오기
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  discussionContent.append(discussionTitle);
  

  // 날짜랑 아이디 불러오기
  const discussionId = document.createElement('div')
  const discussionCreatedAt = document.createElement('div')
  discussionId.className = 'discussion__information';
  discussionCreatedAt.className = 'discussion__information';
  discussionId.textContent = obj.id;
  discussionCreatedAt.textContent = obj.createdAt + '/';
  discussionContent.append(discussionId);
  discussionContent.append(discussionCreatedAt);


  //체크박스 불러오기
  const checkedAnswered = document.createElement('input');
  checkedAnswered.setAttribute("type", "checkbox");
  discussionAnswered.append(checkedAnswered);
  console.log(checkedAnswered);
  // 여기서 obj.answer이 null 이면 unchecked
  // obj.answer에 내용이 있으면 checked
  
  // 아니면 obj.answer이 null 이면 unchecked된 이미지 remove('hide') / add('hide')
  // obj.answer에 내용이 있으면 checked된 이미지 remove('hide') / add('hide')




  // li에 div 넣기
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
