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
  // 아바타, 제목, 컨텐트(타이틀, 정보), 체크

  // 1. 이미지
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 2. 제목 
  // 2-1. 제목 <- 링크 붙이기
  // 링크
  const discussionTitlelink = document.createElement('a');
  discussionTitlelink.textContent = obj.title;
  discussionTitlelink.href = obj.url;
  // 제목
  const discussTitle = document.createElement('h2');
  discussTitle.className = "discussion__title";

  discussionContent.append(discussTitle);
  discussTitle.append(discussionTitlelink);

  // 3. 작성자 및 날짜
  const discussionCreateAt = document.createElement('div');
  discussionCreateAt.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionCreateAt);

  // 4. 답변 여부
  const discussionAnswer = document.createElement('p');
  if (obj.answer === null) {
    discussionAnswer.textContent = obj.answer = '☒';
  } else {
    discussionAnswer.textContent = obj.answer = '☑'
  }
  discussionAnswered.append(discussionAnswer);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 버튼을 클릭 시, 작성한 내용이 보이도록 이벤트 구현하기
const writeForm = document.querySelector('.form');
const writeTitle = document.querySelector('.form__input--title > input');
const writeName = document.querySelector('.form__input--name > input');
const writeArea = document.querySelector('.form__textbox > textarea');

// 이벤트 리스너
writeForm.addEventListener ('submit', function(event) {
  event.preventDefault();
  const obj = {
    id: "D_kwDOHOApLM4APjJi",
    createdAt: new Date().toLocaleString(),
    title: writeTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: writeName.value,
    answer: null,
    bodyHTML: writeArea.value,
    avatarUrl:
      "./image/agora-userimg.png",
  }

  // 오브젝트 추가
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  // 폼 입력창 초기화
  writeName = '';
  writeTitle = '';
  writeArea = '';

});

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


