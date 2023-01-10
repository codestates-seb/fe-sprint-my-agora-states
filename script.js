/* convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다. -> 리스트 덩어리 만들기! */
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  li.append(avatarWrapper, discussionContent, discussionAnswered);  // li -(avatar, content, answered) 구조 만들기

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;  // 이미지가 안떴을 때, 시각장애인 접근성
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h3');
  discussionContent.append(discussionTitle);
  const titleAnchor = document.createElement('a');
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  const discussionInfo = document.createElement('div');
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionInfo);

  const answerCheck = document.createElement('p');
  answerCheck.textContent = obj.answer ? "☑" : "☐";
  discussionAnswered.append(answerCheck);

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

/* 디스커션 추가 기능 */
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener('submit', (event) => {
  event.preventDefault();  //자동 이벤트 발생을 막기 위해
  const obj = {
    id: "new id",
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    createdAt: new Date().toISOString(), //현재 시간
    bodyHTML: textbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/117844745?v=4"
  };
  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(agoraStatesDiscussions[0]);
  ul.prepend(newDiscussion);
  event.target.reset();  //input value 초기화

  localStorage.setItem('obj', JSON.stringify(obj)); //로컬 저장소에 저장
  const localObj = JSON.parse(localStorage.getItem('obj')); //다시 배열로 가져오기
});