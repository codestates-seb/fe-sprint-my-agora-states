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
  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image';
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImage);

  const titleText = document.createElement('h2');
  const titleUrl = document.createElement('a');
  titleText.className = 'discussion__title';
  titleUrl.href = obj.url;
  titleUrl.textContent = obj.title;
  discussionContent.append(titleText);
  titleText.append(titleUrl);

  const userInformation = document.createElement('div');
  userInformation.className = 'discussion__information';
  userInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(userInformation);

  const answeredMark = document.createElement('p');
  const ifAnswered = (element) => {
    if (element === null) {
      return 'X';
    }
    return 'V';
  }
  answeredMark.textContent = ifAnswered(obj.answer);
  discussionAnswered.append(answeredMark);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const obj = {
    id: "unique id",
    createdAt: new Date(),
    title: document.querySelector('div.form__input--title > input').value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: document.querySelector('div.form__input--name > input').value,
    answer: null,
    bodyHTML: document.querySelector('div.form__textbox > textarea').value,
    avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
  }
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));
});

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