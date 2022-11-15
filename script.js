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
  // 1. avatar 갖고오기
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 2-1. title 갖고오기
  const titleTxt = document.createElement('h2');
  titleTxt.className = "discussion__title";
  discussionContent.append(titleTxt);

  // 2-2. title a 태그 갖고오기
  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  titleTxt.append(titleLink);

  // 2-3. information 갖고오기
  const info = document.createElement('div');
  info.className = "discussion__information";
  info.textContent = `[${obj.author}] ${new Date(obj.createdAt).toLocaleString()}`; // 현지시간으로 변경
  discussionContent.append(info);

  // 3. answer 갖고오기
  const answerBox = document.createElement('p');
  answerBox.textContent = obj.answer ? '답변완료' : '답변대기'; // 삼항연산자 사용
  discussionAnswered.append(answerBox);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 4. 폼 가져오기
const form = document.querySelector('.form');
const inputName = document.querySelector('.form__input--name > input');
const inputTitle = document.querySelector('.form__input--title > input');
const inputQuestion = document.querySelector('.form__textbox > textarea');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const obj = {
      id: "999", // 자동으로 생성됨 --> 임의로 작성함
      createdAt: new Date(),
      title: inputTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: inputName.value,
      answer: null,
      bodyHTML: inputQuestion.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  // 기존 데이터 가장 앞에 추가하는 작업
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj)); // ul 요소 맨앞으로 추가

  inputName.value = '';
  inputTitle.value = '';
  inputQuestion.value = '';
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
