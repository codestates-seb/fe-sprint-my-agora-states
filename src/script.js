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

  // 프로필 이미지
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  // content 제목
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = "discussion__title";

  const discussionUrl = document.createElement('a')
  discussionUrl.href = obj.url;
  discussionUrl.textContent = obj.title;

  discussionTitle.append(discussionUrl);

  //content 정보표시
  const discussionInformation = document.createElement('div');
  discussionInformation.className = "discussion__information";

  const createQuestionDate = new Date(obj.createdAt).toLocaleString();

  discussionInformation.textContent = `${obj.author} / ${createQuestionDate}`;

  discussionContent.append(discussionTitle, discussionInformation);

  const discussionIcon = document.createElement("p");

  if (obj.answer === null) {
    discussionIcon.textContent = '☒';
  } else {
    discussionIcon.textContent = '☑';
  }

  discussionAnswered.append(discussionIcon);

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


//new discussion submit


const form = document.querySelector('.form')
const title = document.querySelector('div.form__input--title > input')
const nameInput = document.querySelector('div.form__input--name > input')
const textbox = document.querySelector('div.form__textbox > textarea')


form.addEventListener("submit", (event) => {
  event.preventDefault();
  // 새로운 객체를 만들어야한다
  // input에 입력된값 밸류를 넣은 새로운 객체
  // 새로운 객체를 ul요소 아래로 넣어준다
  // 더미 데이터(agoraStatesDiscussions) 에도 추가해준다 
  const obj = {
    id: "unique id",
    createdAt: new Date(),
    title: title.value,
    url: null,
    author: nameInput.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  agoraStatesDiscussions.unshift(obj);
  const newDiscussion = convertToDiscussion(obj)
  ul.prepend(newDiscussion)
})
