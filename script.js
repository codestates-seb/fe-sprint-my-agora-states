// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// const convertToDiscussion = (obj) => {
const component = document.createElement("div"); // li 요소 생성
component.className = "discussion__container"; // 클래스 이름 지정


const avatarWrapper = document.createElement("div");
avatarWrapper.className = "discussion__avatar--wrapper";
const discussionContent = document.createElement("div");
discussionContent.className = "discussion__content";
const discussionAnswered = document.createElement("div");
discussionAnswered.className = "discussion__answered";

// Answer Text

function getOnlyText(str) {
  const div = document.createElement('div');
  div.innerHTML = str;

  return div.textContent || div.innerText || '';
}



// TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
avatarWrapper.innerHTML = `<img class="discussion__avatar--image"
  src="${obj.avatarUrl}"
  alt="avatar of ${obj.author}">`



if (obj.answer !== null) {
  const answerText = getOnlyText(obj.answer.bodyHTML)
  const maxLength = 100;
  let shortedAnswerText;

  if (answerText.length > maxLength) {
    shortedAnswerText = answerText.substring(0, maxLength) + '...'
  }

  discussionContent.innerHTML = `<h2 class="discussion__title"><a
    href=${obj.url}>${obj.title}</a></h2> <p>${shortedAnswerText}</p>
    <div class="discussion__information">${obj.author} / ${obj.createdAt}</div>
    </div>
    `
  discussionAnswered.innerHTML = `<p>✅</p>`
} else {
  discussionContent.innerHTML = `<h2 class="discussion__title"><a
    href=${obj.url}>${obj.title}</a></h2> <p>답변을 기다리고 있습니다!</p>
    <div class="discussion__information">${obj.author} / ${obj.createdAt}</div>
    </div>
    `
  discussionAnswered.innerHTML = `<p>❌</p>`
}


component.append(avatarWrapper, discussionContent, discussionAnswered);
return component;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i++) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const container = document.querySelector("div.discussions__container");
render(container);


// 진짜 나으 아고라 스테이츠 만들기

const submitBtn = document.querySelector('.form__submit')

const nameInput = document.querySelector('#name')
const titleInput = document.querySelector('#title')
const contentInput = document.querySelector('#story')

submitBtn.addEventListener('submit', event => {
  event.preventDefault()

  const component = document.createElement('div')
  component.className = "discussion__container"


  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";


  // 현재 시각
  const currentDate = new Date();

  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;
  currentMonth = ('0' + currentMonth).slice(-2)
  let currentDay = currentDate.getDate();
  currentDay = ('0' + currentDay).slice(-2)
  let currentHours = currentDate.getHours();
  currentHours = ('0' + currentHours).slice(-2)
  let currentMinutes = currentDate.getMinutes();
  currentMinutes = ('0' + currentMinutes).slice(-2)
  let currentSeconds = currentDate.getSeconds();
  currentSeconds = ('0' + currentSeconds).slice(-2)




  avatarWrapper.innerHTML = `<img class="discussion__avatar--image"
  src="https://vehrcommunications.com/wp-content/uploads/2021/12/Grinch.jpg"
  alt="avatar of ${nameInput.value}">`

  discussionContent.innerHTML = `<h2 class="discussion__title"><a
  href='https://www.google.com/'>${titleInput.value}</a></h2>
  <p>${asdf}</p>
  <div class="discussion__information">${nameInput.value} / ${currentYear}-${currentMonth}-${currentDay}T${currentHours}:${currentMinutes}:${currentSeconds}Z
  </div >`

  discussionAnswered.innerHTML = `<p>❌</p>`


  component.append(avatarWrapper, discussionContent, discussionAnswered);

  container.prepend(component)

  nameInput.value = '';
  titleInput.value = '';
  contentInput.value = '';

  nameInput.focus();

  console.log('Button Clicked!')
})


