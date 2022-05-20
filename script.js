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

  // 아바타 이미지
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  // 이미지 없으면 
  if (obj.avatarUrl === undefined) {
    obj.avatarUrl = "https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png";
  }
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 질문 컨텐츠 제목
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement('a');
  discussionLink.href = obj.url;
  discussionLink.textContent = obj.title;
  discussionTitle.append(discussionLink);
  discussionContent.append(discussionTitle);

  // 질문 컨텐츠 작성자 및 작성시간
  const discussionInformation = document.createElement('div');
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = obj.author + ' / ' + obj.createdAt;
  discussionContent.append(discussionInformation);

  // 질문 완료 체크 표시
  const tickPara = document.createElement('p');
  // 질문 완료 여부에 따라 다른 기호 출력
  if (obj.answer !== null || obj.answer !== undefined){
    tickPara.textContent = '☐';
  }
  else {
    tickPara.textContent = '☑';
  }
  discussionAnswered.append(tickPara);
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
console.log(agoraStatesDiscussions);

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


const elSubmit = document.querySelector('#submit');
let elNewName = document.querySelector('#name');
let elNewTitle = document.querySelector('#title');
let elNewQuestion = document.querySelector('#story');

// submit input이 클릭되면 
elSubmit.addEventListener('click', function (event) {
  event.preventDefault();

  // 빈 객체 생성 
  let newDiscussionData = {};

  // 빈 객체.키 값 title = title
  newDiscussionData.title = elNewTitle.value;
  // 빈 객체.키 값 author = name
  newDiscussionData.author = elNewName.value;
  console.log(newDiscussionData);

  // 작성 시간 추가하기
  let utcTime = new Date();
  let ksTime = new Date(utcTime.getTime() - (utcTime.getTimezoneOffset() * 60000)).toISOString();
  let ksTimeNewFormat = ksTime.slice(0, 19) + ksTime.slice(23, 24);
  newDiscussionData.createdAt = ksTimeNewFormat;

  // agoraStatesDiscussions.unshift(빈객체)해서 배열 앞쪽에 붙여주기;
  agoraStatesDiscussions.unshift(newDiscussionData);
  console.log('after click', agoraStatesDiscussions);

  ul.prepend(convertToDiscussion(newDiscussionData));

});


elNewName.onkeyup = function () {
  isEnabled();
}

elNewTitle.onkeyup = function () {
  isEnabled();
}

elNewQuestion.onkeyup = function () {
  isEnabled();
  
}


// 모든 빈칸이 작성되었는지 확인하는 함수
function isAllFilled() {
  return (elNewName.value !== "" && elNewTitle.value !== "" && elNewQuestion.value !== "");
}

// 모든 빈칸 작성 여부에 따라 submit 버튼 활성화하는 함수
function isEnabled() {
  if (isAllFilled()) {
    elSubmit.removeAttribute("disabled");
  }
  else {
    elSubmit.setAttribute("disabled", "")
  }
}