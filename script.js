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

  // 프로필 이미지
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  // 제목
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle)
  // 제목링크
  const discussionLink = document.createElement("a")
  discussionLink.textContent = obj.title;
  discussionLink.src = obj.url;
  discussionTitle.append(discussionLink);
  // 유저이름, 업로드 시간
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionInfo);
  // 체크박스
  const discussionCheckbox = document.createElement("p");
  discussionCheckbox.className = "discussion__answered";
  discussionContent.append(discussionAnswered);

  // 만약 답변이 있다면 체크박스, 없다면 x박스
  if(obj.answer !== null){
    discussionAnswered.textContent= "☒";
  }else{
    discussionAnswered.textContent= "☑";
  }

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

/*디스커션 추가 기능
script.js를 수정하여 디스커션 추가 기능을 구현합니다.
section.form__container 요소에 새로운 아고라 스테이츠 질문을 추가할 수 있는 입력 폼을 제작합니다. 형식은 자유입니다.
아이디, 본문을 입력하고 버튼을 누르면 실제 화면에 디스커션이 추가되어야 합니다.
agoraStatesDiscussions 배열에 추가한 데이터가 실제 쌓여야 합니다.*/
// form 입력후 제출버튼 클릭시 디스커션 상단에 추가
// name > autor, title > title, question > ??
// submit 눌리면 append 해서 새로운 디스커션 컨테이너에 추가시킨다? > agoraStatesDiscussions 배열에 추가?
// 서브밋 변수 선언 후 클릭시 함수실행
// 서브밋했을때 시간 기록

// form dom 변수선언
const formConatiner = document.querySelector(".form")
let formName = document.querySelector('#name');
let formTitle = document.querySelector("#title");
let formTextbox = document.querySelector("story");
const submitButton = document.querySelector('.form_submit');

// 서브밋 이벤트시 실행

formConatiner.addEventListener('submit', (logSubmit) =>{
  logSubmit.preventDefault() //브라우저의 기본 동작을 막기 위해 사용된다.
  agoraStatesDiscussions.unshift({
  id: '',
  title: formTitle.value,
  author: formName.value,
  answer: null,
  bodyHTML:  formTextbox.value,
  avatarUrl : null,
})
alert(41241)
});