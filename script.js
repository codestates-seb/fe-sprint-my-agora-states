// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // div 태그 생성 -> 프로필사진
  avatarWrapper.className = "discussion__avatar--wrapper"; // class 이름을 discussion__avatar--wrapper로
  const discussionContent = document.createElement("div"); // div 태그 생성 -> 컨텐츠 내용
  discussionContent.className = "discussion__content"; // class 이름을 discussion__content로
  const discussionAnswered = document.createElement("div"); // div 태그 생성 -> 답변여부 확인
  discussionAnswered.className = "discussion__answered"; // class 이름을 discussion__answered

  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // ------------------------------ id='discussion__avatar--wrapper'에 아래 내용 넣어주기
  const avatarImg = document.createElement('img'); // 프로필사진이 들어갈 img 영역
  avatarImg.src = obj.avatarUrl; // agoraStatesDiscussions 객체의 avatarUrl 키
  avatarImg.alt = 'avatar of ' + obj.author; // alt 정보
  avatarWrapper.append(avatarImg); // avatarWrapper 요소에 avatarImg 연결하기

  // ------------------------------ id='discussion__content'에 아래 내용 넣어주기
  // 1. 제목 넣기
  const contentTitle = document.createElement('h2'); // h2 태그 생성
  contentTitle.className = "discussion__title"; // 생성한 h2 태그에 class 이름을 discussion__title
  discussionContent.append(contentTitle); // 만들어준 h2 태그를 위에 만들어둔 discussionContent div에 연결
  // 2. 링크 넣기
  const contentLink = document.createElement('a'); // 링크 태그 생성
  contentLink.href = obj.url; // 링크는 매개변수 obj에서 url 키 가져오기
  contentLink.textContent = obj.title; // 텍스트는 매개변수 obj에서 title 키 가져오기
  contentTitle.append(contentLink); // 만들어준 링크와 텍스트를 위에 만들어둔 contentTitle div에 연결
  // 3. 작성자/시간 정보
  const contentInfo = document.createElement('div'); // div 태그 생성
  contentInfo.className = "discussion__information"; // div 태그 class 이름을 discussion__information
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString('ko-kr')}` // div태그의 텍스트는 : obj의 author키와 createdAt키 // createdAt을 한국 시간으로 바꿔줌
  discussionContent.append(contentInfo); // 만들어준 작성자와 작성시간 텍스트를 discussionContent에 연결

  // ------------------------------ id='discussion__answered'에 아래 내용 넣어주기
  const contentAnswered = document.createElement('p'); // p태그 생성
  contentAnswered.className = "discussion__answered"; // p태그 class 이름을 discussion__answered
  // 만약 답변이 있으면 ● 없으면 ○로 -> 답변은 answer:null일때, 비어있다는 뜻
  if (obj.answer === null) {
    contentAnswered.textContent = '○'
  } else {
    contentAnswered.textContent = '●'
  }
  discussionAnswered.append(contentAnswered); // p태그를 discussionAnswered에 연결

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i])); // agoraStatesDiscussions[i] = obj 
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// ------------------------------ 폼 정보 가져오기 (form__container)
// 1. 각 요소 가져오기
const formContainer = document.querySelector("form.form") // formd에서 class가 form인 요소 가져오기
const inputName = document.querySelector("#name") // 작성자 : id가 name인 요소 가져오기
const inputTitle = document.querySelector("#title") // 제목 : id가 title인 요소 가져오기
const inputStory = document.querySelector("#story") // 내용 : id가 story인 요소 가져오기
// 2. '제출' 버튼 누르고 나면 입력한 정보를 agoraStatesDiscussions에 넣기
formContainer.addEventListener("submit", (addEventListener) => {
  event.preventDefault(); // 새로고침 방지
  const newDiscussions = { // 함수에 넣을 수 있는 객체 만들기
    id: 'id', // 추후 임의의 값으로 들어갈 것
    createdAt: new Date(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: inputName.value,
    answer: null,
    bodyHTML: inputStory.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  agoraStatesDiscussions.unshift(newDiscussions); // 배열의 가장 첫 번째로 넣어주기
  const discussion = convertToDiscussion(newDiscussions); // 아고라 스테이츠 데이터를 DOM으로 변경
  ul.prepend(discussion); // ul의 첫번째 자식 앞에 객체 추가
  render(ul); // 배열 데이터를 화면에 렌더

  inputName.value = '';
  inputTitle.value = '';
  inputStory.value = '';
  // 제출 후 응답폼 내용 지우기
});


// 페이지네이션 연구하기
// 한 페이지에 10개의 게시글만 보이도록 한다. -> agoraStatesDiscussions 배열에서 0부터 9까지, 다시 10부터 19까지...
// 페이지 번호는 0~9까지 1, 10~19까지 2, 그 이상은 쭉쭉쭉... 자동 추가되도록
