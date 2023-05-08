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

  const avatarimg = document.createElement('img');
  avatarimg.className = "discussion__avatar--image";
  avatarimg.src = obj.avatarUrl;
  avatarimg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarimg)

  const contenttitle = document.createElement('h2');
  contenttitle.className = "discussion__content"
  const titlelink = document.createElement('a');
  titlelink.href = obj.url;
  titlelink.textContent = obj.title;
  contenttitle.append(titlelink);

  const contentInfo = document.createElement('div');
  contentInfo.textContent = `${obj.author}/${obj.createdAt}`
  contentInfo.className = "discussion__information"
  discussionContent.append(contenttitle, contentInfo)

  const checked = document.createElement('p')
  checked.className = "discussion__answered"
  checked.textContent = obj.answer ? '댓글 : 1' : '댓글 : 0'
  discussionAnswered.append(checked)
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어줌

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

const writeForm = document.querySelector('.form');
const writeTitle = document.querySelector('.form__input--title > input');
const writeName = document.querySelector('.form__input--name > input');
const writeArea = document.querySelector('.form__textbox > textarea');

writeForm.addEventListener ('submit', function(event) {
  event.preventDefault();
  const obj = {
    id: "YEJI",
    createdAt: new Date().toLocaleString(),
    title: writeTitle.value,
    url: "https://github.com/codestates-seb",
    author: writeName.value,
    answer: null,
    bodyHTML: writeArea.value,
    avatarUrl: "https://cdn-icons-png.flaticon.com/512/6073/6073873.png"
  }

  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  writeName.value = '';
  writeTitle.value = '';
  writeArea.value = '';

});




