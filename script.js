// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {

  // duscussion__container li 태그 생성
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // avartarWrapper 이미지 div태그 생성
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  // discussionContent 내용 div태그 생성
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  // discussionAnswered 답변내용 체크 div태그 생성
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg); 

  // discussionContent에 title, discussion_information 넣어주기
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = "discussion__title";
  const titleAnchor = document.createElement('a');
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  const discussionInfo = document.createElement('div');
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;

  discussionContent.append(discussionTitle, discussionInfo);

  const answered = document.createElement('div');
  answered.className = 'discussion_answered';
  const p = document.createElement('p');
  if(obj.answer){
    p.textContent = '☑';
  } else if(obj.answer === null){
    p.textContent = '☒';
  }
    
  answered.append(p);
  discussionAnswered.append(answered);

  // li의 자식요소로 이미지,콘텐츠,답변내역을 넣어준다
  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;

}

// 제출하기 기능
const form = document.querySelector('form.form');
const title = document.querySelector('div.form__input--title > input');
const nameInput = document.querySelector('div.form__input--name > input');
const textbox = document.querySelector('div.form__textbox > textarea');

form.addEventListener("submit", (event) =>{
  event.preventDefault();
  // 새로운 객체를 만들어야 한다.
  // Input에 입력된 값(value)를 넣은 새로운 객체
  // 새로운 객체를 ul요소 아래로 넣어준다.
  // 더미데이터(agoraStatesDiscussions)에도 추가해준다.

  const obj = {
    id: "unique id",
    createdAt: new Date().toLocaleString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: nameInput.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  }

  agoraStatesDiscussions.unshift(obj);

  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion);
  
}) 

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // element에는 ul이 들어옴
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

