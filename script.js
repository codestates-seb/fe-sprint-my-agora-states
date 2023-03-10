// pagenation 추가
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

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

  // 프로필 사진
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 제목과 링크
  const discussionTitle = document.createElement('h2');
  const discussionLink = document.createElement('a');
  discussionTitle.className = 'discussion__title';
  discussionLink.href = obj.url;
  discussionLink.textContent = obj.title;
  discussionTitle.append(discussionLink);
  discussionContent.append(discussionTitle);

  // 저자와 날짜
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString('ko-KR')}`;
  discussionContent.append(discussionInformation);

  // 질문에 답변 유무
  const discussionChecked = document.createElement("p");
  discussionChecked.className = 'discussion__answered';
  discussionChecked.textContent = obj.answer ? "🟢" : "🔴"; // 조건 ? value1 : value2 조건이 참인 경우 value1 실행, 거짓이면 value2실행
  discussionAnswered.append(discussionChecked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('.form');
const author = form.querySelector (".form__input--name > input");
const title = form.querySelector(".form__input--title > input");
const textbox = form.querySelector (".form__textbox > textarea");

form.addEventListener('submit', (e) => {
  e.preventDefault(); // 새로고침 안되게 해줌

  const newObj = {
    id: "new id",
    createdAt: new Date(),
    title: title.value,
    url: "/",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl: "https://source.unsplash.com/random",
  };
  agoraStatesDiscussions.unshift(newObj); // 기존 데이터 맨앞으로 추가해준다
  ul.prepend(convertToDiscussion(newObj)) // 콘텐츠를 선택한 요소 내부의 시작 부분에서 삽입

  // submit 후 리셋
  title.value = "";
  author.value = "";
  textbox.value = "";
})

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
//pagination ***
const ul = document.querySelector("ul.discussions__container");

let startNum = 0;
const cnt = 10;
const num = agoraStatesDiscussions.length / 10 - 1
const onClick = (e) => {
  e.preventDefault();
  startNum = Number(e.target.value) * cnt;
  render(ul);
}
const pageRender = () => {
  let div = ''
  for (let i = 0; i < num + 1; i++) {
    div += `<button id="${i}" value=${i} onclick="onClick(event)">${i + 1} </button>`;
  }
  document.getElementById('pagenation').innerHTML = div;
}
pageRender();

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  element.innerHTML = '';
  for (let i = startNum; i < startNum + cnt; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]))
  }
  return;
};

// const ul = document.querySelector("ul.discussions__container");
render(ul);