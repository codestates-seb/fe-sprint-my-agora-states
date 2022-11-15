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

  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.alt = "avatar of " + obj.author;
  avatarImg.src = obj.avatarUrl;
  // avatarImg.src = agoraStatesDiscussions[0].avatarUrl;
  // avatarImg.alt = 'avatar of ' + agoraStatesDiscussions[0].author;
  avatarWrapper.append(avatarImg);


  const contentTitle = document.createElement('h2');
  const titleAnchor = document.createElement('a');
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;

  const contentInfo = document.createElement('div');   // contentInfo 에 클래스를 주면 오른쪽 정렬이 됨
  contentInfo.className = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`

  contentTitle.append(titleAnchor);

  discussionContent.append(contentTitle, contentInfo);


  const checked = document.createElement('p')
  checked.textContent = obj.answer ? '☑︎' : '☒'; // 삼항 연산자
  discussionAnswered.append(checked);

  // li.append(avatarWrapper, discussionContent, discussionAnswered);

  // const ul = document.querySelector('ul.discussions__container');
  // ul.append(li);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.


  // 여기부터
  // const face = document.createElement("img") // 프로필 사진
  // face.src = obj.avatarUrl;
  // face.alt = "avatar of" + obj.author;
  // avatarWrapper.append(face);
  

  // const discussionTitle = document.createElement("h2");
  // const titleAnchor = document.createElement("a");
  // titleAnchor.href = obj.url;
  // titleAnchor.textContent = obj.title;
  // discussionTitle.append(titleAnchor);
  // discussionContent.append(discussionTitle);
  

  // const discussionInfo = document.createElement("div");
  // discussionInfo.textContent = `${obj.author} / ${new Date(obj.createAt).toLocaleTimeString()}` // 날짜 표현 형식이 여러개가 있는데 이걸 제일 많이  쓴다
  // discussionContent.append(discussionTitle, discussionInfo);

  // const checked = document.createElement("p");
  // checked.textContent = obj.answer ? "☑︎" : "☒";
  // discussionAnswered.append(checked);

  // 여기까지 이해 확실히 하기





  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form') // form 요소이면서 class가 form 인거
const inputName = document.querySelector('.form__input--name > input');
const inputTitle = document.querySelector('.form__input--title > input');
const inputQuestion = document.querySelector('.form__textbox > textarea');

form.addEventListener('submit', (event) => {  // submit은 기본적으로 새로고침하는데 이걸 event.preventDefault()로 막아줌
  event.preventDefault();
  const obj = {
    id: "new id", // 여기 랜덤으로 하는거 해보기
    createdAt: new Date().toISOString(),
    title: inputTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  // 기존 데이터 가장 앞에 추가
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  inputName.value = '';
  inputTitle.value = '';
  inputQuestion.value = '';  // submit 한 후 빈칸으로 만들기
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
