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


  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
 
  const discussionAlink= document.createElement('a');
  discussionAlink.href = obj.url;
  discussionAlink.textContent=obj.title;
  discussionTitle.append(discussionAlink);
  discussionContent.append(discussionTitle);

  const checkBox = document.createElement("p")
  checkBox.className = "checkBox";
  if (obj.answer !== null){
    checkBox.textContent = "✔︎";
  }
  discussionAnswered.append(checkBox);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  // new Date 객체를 사용하면 원하는대로 시간표시를 할 수 있다.
  discussionInformation.textContent = `${obj.author} \ ${new Date(obj.createdAt).toLocaleString()} `;

  discussionContent.append(discussionInformation);

  const avatarImg = document.createElement('img');
    avatarImg.className = "discussion__avatar--image";
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of' + obj.author;
    avatarWrapper.append(avatarImg);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// form을 가져온다.
const answerForm = document.querySelector('form.form')
const formTitle = document.querySelector('div.form__input--title > input')
const nameInput = document.querySelector('div.form__input--name > input')
const formTextbox = document.querySelector('div.form__textbox > textarea')
answerForm.addEventListener("submit",(event) => {
  event.preventDefault();
  // 새로운 객체를 만들어야 한다.
  // Input에 입력된 값(value)를 넣은 새로운 객체
  // 새로운 객체를 ul 요소 아래로 넣어준다.
  // 더미데이터(agoraStatesDiscussions)에도 추가해준다.
  const obj = {
    id: "id",
    createdAt: new Date().toLocaleString(),
    title: formTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: nameInput.value,
    answer: null,
    bodyHTML: formTextbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  console.log(formTitle.value+'타이틀')
  console.log(nameInput.value+'이름')
  console.log(formTextbox.value+'텍스트박스')
  console.log(obj.createdAt)
  agoraStatesDiscussions.unshift(obj); // 더미데이터에 추가
  const discussionSubmit = convertToDiscussion(obj);
  ul.prepend(discussionSubmit);
})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return ;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
