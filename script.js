// agoraStatesDiscussions 배열을 확인합니다.
console.log(agoraStatesDiscussions);

// convertToDiscussion 함수는 agoraStates 데이터를 DOM으로 변환합니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 이름, 날짜 표시를 위한 요소
  const discussionTitle = document.createElement('h2');
  const discussionAnchor = document.createElement('a');
  discussionTitle.classList.add('discussion__information');

  const authorCreatedAt = document.createElement('div');
  authorCreatedAt.className = "nameDate";

  const discussionAuthor = document.createElement('div');
  const discussionCreatedAt = document.createElement('div');

  // 체크박스 구현
  if (obj.answer === null && !obj.title.includes('notice')) {
    discussionAnswered.textContent = "❌";
  } else if (obj.title.includes('notice')) {
    discussionAnswered.textContent = " ";
  } else {
    discussionAnswered.textContent = "✔️";
  }

  // 링크와 프로필 이미지 추가
  discussionAnchor.textContent = obj.title;
  discussionAnchor.href = obj.url;

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('discussion__avatar--image');
  avatarImg.src = obj.avatarUrl;

  // 현재 날짜 및 시간 계산
  const currentDate = new Date(obj.createdAt);
  const formattedDate = `${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월 ${currentDate.getDate()}`;

  let formattedTime = "";
  let hours = currentDate.getHours();
  const ampm = hours >= 12 ? '오후' : '오전';
  hours = hours % 12 || 12;  // 12시간 형식으로 변환
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  formattedTime = `${ampm} ${hours}:${minutes}:${seconds}`;

  // 작성자와 작성일 추가
  discussionAuthor.textContent = obj.author;
  discussionCreatedAt.textContent = `${formattedDate} ${formattedTime}`;

  // 요소를 적절한 위치에 추가
  discussionTitle.append(discussionAnchor);
  discussionContent.append(discussionTitle);
  discussionContent.append(authorCreatedAt);
  authorCreatedAt.append(discussionAuthor);
  authorCreatedAt.append(discussionCreatedAt);

  avatarWrapper.append(avatarImg);
  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// submitBtn 변수 선언
let submitBtn = document.querySelector('.form__submit>input');

// addDiscussion 함수 정의
const addDiscussion = (event) => {
  event.preventDefault();

  // 현재 날짜 및 시간 계산
  let today = new Date();
  let formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  let formattedTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

  let name = document.getElementById('name').value;
  let title = document.getElementById('title').value;

  // 디스커션 객체 생성
  let discussion = {
    id: "D_kwDOHOApLM4APjIj",
    createdAt: `${formattedDate}T${formattedTime}Z`,
    title: title,
    url: "http://www.google.co.kr/",
    avatarUrl: "https://biz.chosun.com/resizer/liG5Ybp7R2R1KStKoWrGI5h-MfM=/616x0/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/FUSBI7M5PHSLS5CWBDEE5YBCYE.jpg",
    author: name,
    answer: null
  };

  // 새로운 디스커션을 맨 위에 추가
  ul.prepend(convertToDiscussion(discussion));
};

// 버튼에 이벤트 리스너 추가
submitBtn.addEventListener('click', addDiscussion);

