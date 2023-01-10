// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  avatarImg.className = "discussion__avatar--image";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussiontitle = document.createElement('h2');
  discussiontitle.className = "discussion__title";
  discussionContent.append(discussiontitle);

  const titleName = document.createElement('a');
  titleName.href = obj.url;
  titleName.textContent = obj.title;
  titleName.className = "discussion__url";
  discussiontitle.append(titleName);

  const information = document.createElement('div');
  information.className = "discussion__information";

  const createdAtDate = new Date(obj.createdAt).toLocaleString('ko-KR', { timeZone: 'UTC' })
  information.textContent = `${obj.author} / ${createdAtDate}`
  discussionContent.append(information);

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const checkbox = document.createElement('p');
  checkbox.className = "discussion__answered";
  checkbox.textContent = obj.answer ? "☑︎" : "☐";
  discussionAnswered.append(checkbox);




  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.



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

const form = document.querySelector("form.form");
const author = document.querySelector("div.form__input--name > input");
const title = document.querySelector("div.form__input--title > input");
const textbox = document.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const newData = {
    id: "new id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:"https://avatars.githubusercontent.com/u/110800593?s=400&u=322666a8d7f3d8e76c2c2c05bb332f505e348670&v=4"
  };
  
  agoraStatesDiscussions.unshift(newData);
  
  author.value = '';
  title.value = '';
  textbox.value = '';

  ul.prepend(convertToDiscussion(newData));
})


