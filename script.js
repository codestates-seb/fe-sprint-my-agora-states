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
  // 아바타 이미지 생성 코드
  const avatarImg = document.createElement('img');
    avatarImg.className = 'discussion__avatar--image';
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;

  avatarWrapper.append(avatarImg);
  
  // 디스커션 콘텐츠 생성 코드
  // 타이틀
  const discussionContent__title = document.createElement('h2');
    discussionContent__title.className = 'discussion__title';
  const discussionContent__titleMessage = document.createElement('a');
    discussionContent__titleMessage.href = obj.url;
    discussionContent__titleMessage.textContent = obj.title;
    discussionContent__title.append(discussionContent__titleMessage);
  // 정보
  const discussion__information = document.createElement('div');
    discussion__information.className = 'discussion__information';
    discussion__information.textContent = `${obj.author} / ${obj.createdAt}`;
  
  discussionContent.append(discussionContent__title, discussion__information);
  
  // 디스커션 답 체크 생성 코드
  const discussion__answered = document.createElement('div');
    discussion__answered.className = 'discussion__answered';
  const discussion__answered__p = document.createElement('p');
    discussion__answered__p.textContent = '☑';
    discussion__answered.append(discussion__answered__p);
  
  discussionAnswered.append(discussion__answered);

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

// input을 불러와야 한다.
const form = document.querySelector('form.form');
const author = form.querySelector('div.form__input--name > input');
const title = form.querySelector('div.form__input--title > input');
const textbox = form.querySelector('div.form__textbox > textarea');

form.addEventListener('submit', (event) => {
  //새로고침 방지
  event.preventDefault(),
  
  console.log('submit 이벤트')
  console.log(author.value, title.value, textbox.value)

  const obj = {
    id: 'unique id',
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  agoraStatesDiscussions.unshift(obj);

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  };

  render(ul);

})
