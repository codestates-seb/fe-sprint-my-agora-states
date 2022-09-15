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
  const avaterImg = document.createElement("img");
  avaterImg.className = "discussion__avatar--image";
  avaterImg.src = obj.avatarUrl;
  avaterImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avaterImg);


  const discussionAnsweredP = document.createElement("p");
  discussionAnsweredP.textContent = "☑";
  discussionAnswered.append(discussionAnsweredP);
  li.append(avatarWrapper, discussionContent, discussionAnswered);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionTitleA = document.createElement("a");
  discussionTitleA.href = obj.url;
  discussionTitleA.textContent = obj.title;
  discussionTitle.append(discussionTitleA);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`
  discussionContent.append(discussionTitle, discussionInformation);
  

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const submitBtn = document.querySelector(".form__submit").querySelector('input');
submitBtn.addEventListener("click", function(event) {
  const formInputName = document.querySelector(".form__input--name").querySelector('input').value;
  const formInputTitle = document.querySelector(".form__input--title").querySelector('input').value;
  const formTextbox = document.querySelector(".form__textbox").querySelector("textarea").value;
  const day = new Date();
  event.preventDefault();
  const newThing = {
    title: formInputTitle,
    createdAt: day.toLocaleString(day),
    author: formInputName,
    answer: null,
    bodyHTML: formTextbox,
    avatarUrl:"https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
  };
  agoraStatesDiscussions.unshift(newThing);
  render(ul);
  
});





//agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = agoraStatesDiscussions.length-1; i >= 0; i--) {
    element.prepend(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.prepend(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
