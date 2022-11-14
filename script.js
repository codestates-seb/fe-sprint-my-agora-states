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

// <img> 태그 생성 후 avatarImg 변수에 할당
  const avatarImg = document.createElement("img");
// 이미지 주소 설정
  avatarImg.src = obj.avatarUrl;
// 대체 이미지 설정
  avatarImg.alt = "avatar of " + obj.author;
// <div class = discussion__avatar--wrapper> 태그 마지막 자식 요소에 <img> 태그 추가
  avatarWrapper.append(avatarImg);

// <h2> 태그 생성 후 discussionTitle 변수에 할당
  const discussionTitle = document.createElement("h2");
// <h2 class = "discussion__title">로 클래스명 변경
  discussionTitle.className = "discussion__title";
// <a> 태그 생성 후 discussionTitleLink 변수에 할당
  const discussionTitleLink = document.createElement('a');
// title에 url연결
  discussionTitleLink.href = obj.url;
// title에 텍스트 추가
  discussionTitleLink.textContent = obj.title;
// <div class = discussion__title> 태그 마지막 자식 요소에 <a href> 태그 추가
  discussionTitle.append(discussionTitleLink);
// <div class = discussion__content> 태그 마지막 자식 요소에 <h2 class = "discussion__title"> 태그 추가
  discussionContent.append(discussionTitle);

// <div> 태그 생성 후 discussionInfo 변수에 할당
  const discussionInfo = document.createElement("div");
// <div class = "discussion__information">로 클래스명 변경
  discussionInfo.className = "discussion__information";
// div에 author, createdAt value값 텍스트로 추가
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
// <div class = discussion__content> 태그 마지막 자식 요소에 <div class = "discussion__information"> 태그 추가
  discussionContent.append(discussionInfo);

// <p> 태그 생성
const discussionAnsweredCheck = document.createElement("p");
// obj.answer가 null이 아니면 체크표시된 아이콘을 넣고, null이면 체크가 안 된 빈 아이콘을 넣음
  if (obj.answer !== null) {
    discussionAnsweredCheck.innerHTML = '<i class="fa-regular fa-square-check"></i>';
  } else {
    discussionAnsweredCheck.innerHTML = '<i class="fa-regular fa-square"></i>';
  }
// <p> 태그 마지막 자식 요소에 아이콘을 넣음
  discussionAnswered.append(discussionAnsweredCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// submit 클릭 시 새로운 discussion 등록 기능 구현
const form = document.querySelector('.form');
const formName = document.querySelector('#name');
const formTitle = document.querySelector('#title');
const formStory = document.querySelector('#story');

const addDiscussion = function(event) {
  event.preventDefault();
  const newObj = {
    id: Math.random().toString(36).substring(2, 12),
    createdAt: new Date(),
    title: formTitle.value,
    url: "#",
    author: formName.value,
    answer: null,
    bodyHtml: formStory.value,
    avatarUrl: null,
  };

  agoraStatesDiscussions.unshift(newObj);

  const newDiscussion = convertToDiscussion(newObj);
  ul.prepend(newDiscussion);

  formName.value = '';
  formTitle.value = '';
  formStory.value = '';
};

form.addEventListener('submit',addDiscussion);





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
