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


  // TODO 1: 아바타 이미지
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarImg);

  // TODO 2: 작성자 & 날짜
  const discussionCreateAt = document.createElement('div');
  discussionCreateAt.className = "discussion__information"
  discussionCreateAt.textContent = `${obj.author} | ${new Date().toLocaleString()}`;
  discussionContent.append(discussionCreateAt);

  // TODO 3: 제목
  const discussionTitlelink = document.createElement('a');
  discussionTitlelink.textContent = obj.title;
  discussionTitlelink.href = obj.url;

  const discussTitle = document.createElement('h2');
  discussTitle.className = "discussion__title";

  discussionContent.append(discussTitle);
  discussTitle.append(discussionTitlelink);

  // TODO 4: 답변 여부
  const discussionAnswer = document.createElement('div');
  discussionAnswer.className = "discussion__answered"
  if (obj.answer === null) {
    discussionAnswer.style.background = '#FF3535';
  } else {
    discussionAnswer.style.background = '#8CEC72'
  }
  discussionAnswered.append(discussionAnswer);


  li.append(discussionAnswered, avatarWrapper, discussionContent);
  return li;
};


// TODO 5: 게시글 추가
const writeForm = document.querySelector('.form');
const writeTitle = document.querySelector('.form__input--title > input');
const writeName = document.querySelector('.form__input--name > input');
const writeArea = document.querySelector('.form__textbox > textarea');

writeForm.addEventListener ('submit', function(event) {
  event.preventDefault();
  const obj = {
    id: "Nyang",
    createdAt: new Date().toLocaleString(),
    title: writeTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: writeName.value,
    answer: null,
    bodyHTML: writeArea.value,
    avatarUrl:
      "./GitHub-Mark.jpg",
  }

  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  writeName.value = '';
  writeTitle.value = '';
  writeArea.value = '';

});


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const rendering = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
rendering(ul);


// TODO 6: 페이지네이션
