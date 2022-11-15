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

  const title = document.createElement('h3');
  const title_anchor = document.createElement('a');
  title.className = 'discussion__title'
  title_anchor.href = obj.url
  title_anchor.textContent = obj.title
  title_anchor.target = '_blank'
  title.append(title_anchor);
  discussionContent.append(title)

  const el_information = document.createElement('div')
  el_information.className = 'discussion__information'
  el_information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  discussionContent.append(el_information)

  const el_answered = document.createElement("p");
  el_answered.className = 'discussion__answered'
  el_answered.textContent = obj.answer ? "✓" : "○";
  discussionAnswered.append(el_answered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form')
const input_name = document.querySelector('.form__input--name > input')
const input_title = document.querySelector('.form__input--title > input')
const input_textbox = document.querySelector('.form__textbox > textarea')

form.addEventListener('submit', (e) =>{
  e.preventDefault();
  const obj ={
    id: "anonymous",
    createdAt: new Date(),
    title: input_title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: input_name.value,
    answer: null,
    bodyHTML: input_textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  input_name.value = '';
  input_title.value = '';
  input_textbox.value = '';
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
