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

  const avatarImg = document.createElement('img');
  // avatarImg.src = agoraStatesDiscussions[0].avatarUrl;
  // avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[0].author;
  //alt? alternative text 웹접근성을 위한 text
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.className = 'discussion__avatar--image';
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  const titleAnchor = document.createElement('a');
  discussionTitle.className = 'discussion__title';
  titleAnchor.href = obj.url;
  discussionTitle.textContent = obj.title;
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = obj.author + '/' + obj.createdAt;
  discussionContent.append(discussionInfo);

  const answeredP = document.createElement('p');
  if (!(obj.answer === null)) {
    answeredP.textContent = '✅';
  } else {
    answeredP.textContent =  '❌';
  }
  discussionAnswered.append(answeredP);

  // discussionTitle.value = obj.title;
  // discussionInfo.value = obj.author;
  // discussionAnswered.value = obj.answer; //실패코드

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


//submit 버튼 입력하면 실제 화면에 디스커션 추가
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textarea = form.querySelector("div.form__textbox > textarea");

form.addEventListener('submit', function(event) {
  event.preventDefault();
  //submit 이벤트는 서버에 요청보내는 것을 시도
  //페이지 리로딩을 하고 다시 원래 페이지로 돌아온다
  //html 파일 읽고 자바스크립트 파일을 다시 읽어 온다
  //event.preventDefault() 코드가 없으면 새로 unshift한 데이터는 다 날라간다
  
  const obj = 
  {
    id: "unique id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: author.value,
    answer: null,
    bodyHTML: textarea.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  //배열 안에 넣기
  agoraStatesDiscussions.unshift(obj);
  console.log('submit클릭', agoraStatesDiscussions.length);

  //추가할 디스커션 보여주기
  const discussion = convertToDiscussion(obj);
  ul.prepend(discussion);

  //submit하고 나면 빈칸으로 만들기
  author.value ='';
  title.value = '';
  textarea.value ='';

})

// let elSubmit = document.querySelector('.form__submit');
// elSubmit.onclick = function() {
  
// }
