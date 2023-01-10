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
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  const link = document.createElement('a')
  const discussionInformation = document.createElement('div')
  link.href = obj.url;
  link.textContent = obj.title
  discussionInformation.textContent = obj.author + '/' + obj.createdAt
  discussionInformation.className = 'discussion__information'
  discussionTitle.append(link)
  discussionContent.append(discussionTitle)
  discussionContent.append(discussionInformation)

  const discussionP = document.createElement('p')
  discussionP.textContent = (obj.answer === null) ? "☒":"☑"
  discussionAnswered.append(discussionP)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector ("form.form");
const author = form.querySelector ("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector ("div.form__textbox > textarea");
form. addEventListener ("submit", (event) => {
  event.preventDefault () ;

  const submitObj = {
  id: "unique id" + Math.round (Math.random () * 100000), 
  createdAt: new Date().toISOString(), 
  title: title.value,
  url: "https://github.com/codestates-seb/agora-states-fe/discussions/36",
  author: author.value, 
  answer: null, 
  bodyHTML: textbox.value, 
  avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  }
  agoraStatesDiscussions.unshift(submitObj);
  const discussion = convertToDiscussion(submitObj);
  ul. prepend (discussion);

  form.querySelector ("div.form__input--name > input").value = "";
  form.querySelector ("div.form__input--title > input").value = "";
  form.querySelector ("div.form__textbox > textarea").value = "";

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
