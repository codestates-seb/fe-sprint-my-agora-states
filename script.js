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

  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image'
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const titleContent = document.createElement('a');
  titleContent.href = obj.url;
  titleContent.textContent = obj.title;
  discussionTitle.append(titleContent);
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information'
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionInfo);

  const answered = document.createElement('p');
  answered.textContent = obj.answer ? "☑︎" : "☒";
  discussionAnswered.append(answered);

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


// 디스커션 추가 기능

const inputForm = document.querySelector('.form')
const inputName = inputForm.querySelector("div.form__input--name > input");
const inputTitle = inputForm.querySelector("div.form__input--title > input");
const inputContent = inputForm.querySelector("div.form__textbox > textarea");

inputForm.addEventListener("submit" , (event) => {
  event.preventDefault();
  const obj = {
    id: "new" ,
    createdAt: new Date() ,
    title: inputTitle.value ,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45" ,
    author: inputName.value ,
    answer: null,
    bodyHTML: inputContent.value ,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  agoraStatesDiscussions.unshift(obj);

  const convertObj = convertToDiscussion(obj);

  ul.prepend(convertObj);

});

