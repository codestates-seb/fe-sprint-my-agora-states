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
  const avatarImg = document.createElement('img')
  avatarImg.className = "discussion__avatar--image"
  avatarImg.alt = "avatar of" + "누가 썼는지"
  avatarImg.src = obj.avatarUrl
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement('h2');
  const contentAnchor = document.createElement('a');
  contentAnchor.href = obj.url;
  contentAnchor.textContent = obj.title

  const contentInfo = document.createElement('div');
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt)}`
  contentInfo.className = "discussion__information";

  contentTitle.append(contentAnchor);
  discussionContent.append(contentTitle, contentInfo);

  const answeredCheck = document.createElement('p');
  answeredCheck.textContent = obj.answer ? '☑' : '☒';
  discussionAnswered.append(answeredCheck);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

  const form = document.querySelector('.form');
  const inputName = document.querySelector('.form__input--name > input');
  const inputTitle = document.querySelector('.form__input--title > input');
  const inputQuestion = document.querySelector('.form__textbox > textarea');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const obj = {
      answer: null,
      author: inputName.value,
      avatarUrl: "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
      bodyHTML: inputQuestion.value,
      createdAt: new Date(),
      id: "999",
      title: inputTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
    }

    agoraStatesDiscussions.unshift(obj);
    ul.prepend(convertToDiscussion(obj));
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
