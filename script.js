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
  // agoraStateDiscussions 안에 담긴 배열을 li 태그에 순차대로 나열한다.
  
  const a = document.createElement('a')
  
  const avatarImage = document.createElement('img');
  avatarImage.className = "discussion__avatar--image";
  avatarImage.alt = 'avatar of' + obj.author;
  avatarImage.src = obj.avatarUrl;
  avatarWrapper.append(avatarImage);
  
  const avatarTitle = document.createElement('h2')
  avatarTitle.className = "discussion__content";
  const avatarTextLink = document.createElement('a')
  avatarTextLink.textContent = obj.title;
  avatarTextLink.href = obj.url;
  avatarTextLink.target = '_blank';
  discussionContent.append(avatarTextLink);
  
  const avatarInformation = document.createElement('div');
  avatarInformation.className = "discussion__information";
  avatarInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  discussionContent.append(avatarTitle, avatarInformation);
  
  const avatarAnswer = document.createElement('p')
  avatarAnswer.textContent = obj.answer ? "✅" : '❎';
  discussionAnswered.append(avatarAnswer.textContent);
  discussionAnswered.addEventListener("click", () => {
    if (discussionAnswered.textContent === '❎'){
      discussionAnswered.textContent = "✅";
    } 
  })
  
  
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  
  
  const discussionAnsweredCheck = document.createElement('span');
  return li;
};

const form = document.querySelector('.form');
const hiAuthor = document.querySelector('.form__input--name > input');
const hiTitle = document.querySelector('.form__input--title > input');
const hiTextarea = document.querySelector('.form__textbox > textarea');
console.log(hiTextarea)

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newForm = {
    id: "unique number",
    createdAt: new Date(),
    title: hiTitle.value,
    author: hiAuthor.value,
    answer: null,
    bodyHTML: hiTextarea.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
    };

    agoraStatesDiscussions.unshift(newForm);
    ul.prepend(convertToDiscussion(newForm));
    
    hiTitle.value = '';
    hiAuthor.value = '';
    hiTextarea.value = '';
});







// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
function render(element) {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
}  

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

