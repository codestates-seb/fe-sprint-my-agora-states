
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

  // 아바타 요소 추가
  const avatarImage = document.createElement("img") // 태그이름
  avatarImage.className = 'discussion__avatar--image';
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImage);

  // discussion 컨텐츠들
  const discussionTitle = document.createElement("h2");
  const discussionTitletext = document.createElement("a");
  discussionTitletext.href = obj.url;
  discussionTitletext.textContent = obj.title;
  discussionTitle.append(discussionTitletext);

  // 정보
  const discussionInformation  = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} 
  / ${new Date(obj.createdAt).toLocaleTimeString()}`
  discussionContent.append(discussionTitle, discussionInformation);
  
  // 체크 표시
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑︎" : "✅";
  discussionAnswered.append(checked);

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
// 입력 받은 정보 가져오기
const form = document.querySelector('form.form');
const displayauthor = document.querySelector('.form__input--name > input');
const displayTitle = document.querySelector('.form__input--title > input');
const displayQuestion = document.querySelector('.form__textbox > textarea')

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const obj = {
    id : "new id",
    createdAt : new Date(),
    title: displayTitle.value,
    url:"https://github.com/codestates-seb/agora-states-fe/discussions",
    author: displayauthor.value,
    bodyHTML: displayQuestion.value,
    avatarUrl:"https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"

  };
// 기존 discuusions 데이터의 맨 앞에 입력받은 정보 추가
agoraStatesDiscussions.unshift(obj);
ul.prepend(convertToDiscussion(obj));


//form 초기화
displayauthor.value = '';
displayTitle .value = '';
displayQuestion.value = '';
});

//로컬스토리지




