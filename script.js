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
  //값을 출력해 새로운 하나의 li를 만드는 함수

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 프로필 사진
  const icon = document.createElement('img'); 
  icon.className = 'discussion__avatar--image';
  icon.src = obj.avatarUrl;
  icon.alt = 'avatar of' + obj.author;
  avatarWrapper.append(icon);

  //체크박스
  const answer = document.createElement('div')
  answer.className = 'discussion__answered'
  const check = document.createElement('p')
  check.textContent = obj.answer ? "✦" : "✧";
  answer.append(check);
  discussionAnswered.append(answer);

  //프로필+체크박스
  const avatarAnswered = document.createElement('div')
  avatarAnswered.className = 'avatar__answered'
  avatarAnswered.append(avatarWrapper,  discussionAnswered)

  //내용
  const title = document.createElement('h2');
  title.className = 'discussion__title';
  const title2 = document.createElement('a');
  title2.href = obj.url;
  title2.textContent = obj.title;
  title.append(title2);

  const information = document.createElement("div")
  information.className = 'discussion__information';
  information.textContent = obj.author + ' ' + '/'+ ' ' + (new Date(obj.createdAt).toLocaleString());
  discussionContent.append(title, information);


  li.append(avatarAnswered, discussionContent);
  return li;
};

const form_0 = document.querySelector('form.form');
const name_0 = document.querySelector('input#name');
const story_0 = document.querySelector('textarea#story');
form_0.addEventListener('submit', (event) => {
  event.preventDefault();
  const newData = {
    id: "personal",
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: name_0.value,
    answer: null,
    bodyHTML:story_0.value,
    avatarUrl: './img/icon.png',
  };
  ul.prepend(convertToDiscussion(newData))
  title.value = '';
  name_0.value = '';
  story_0.value = '';
})

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
