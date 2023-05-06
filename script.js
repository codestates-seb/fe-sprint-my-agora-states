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

  // 이미지 불러오기

  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"; //이걸 넣어줘야 동그랗게 됨
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 타이틀, 내용

  const discussionTitle = document.createElement('h2');
  const titleAnchor = document.createElement('a');
  discussionTitle.append(titleAnchor);
  titleAnchor.textContent = obj.title;
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement('div');
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionInfo);

  // 답변 여부 (변수 안만들고 하니까 오류나서 변수 넣음)

  const answered = document.createElement("div");
  answered.textContent = obj.answer ? "✅" : "⬜"; //삼항 연산자 이용
  discussionAnswered.append(answered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


// 디스커션 추가

const form = document.querySelector('form.form');
const inputName = document.querySelector('div.form__input--name > input')
const inputTitle = document.querySelector('div.form__input--title > input')
const textbox = document.querySelector('div.form__textbox > textarea')


form.addEventListener("submit", (event) => {
  event.preventDefault();

  const obj = {
    id: "unique id",
    createdAt: new Date(), //왜 Invalid Date라고 뜨지? !.toLocaleString()이 중복되어있어서
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4"
  }
  
  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj)
  ul.prepend(newDiscussion); // 앞에다 붙임
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
