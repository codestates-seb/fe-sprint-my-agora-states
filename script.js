// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {

  // const component = document.createElement("div"); // li 요소 생성
  // component.className = "discussion__container"; // 클래스 이름 지정


  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";



  // Answer Text





  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // 제목 생략
  let shortedTitleText = obj.title;
  if (obj.title.length > 20) {
    shortedTitleText = shortedTitleText.substring(0, 16) + ' ...'
  }

  // 닉네임 생략
  let shortedUserName = obj.author;
  if (obj.author.length > 12) {
    shortedUserName = shortedUserName.substring(0, 8) + '...'
  }

  // 텍스트만 긁어오는 함수
  function getOnlyText(str) {
    const div = document.createElement('div');
    div.innerHTML = str;
    return div.textContent || div.innerText || '';
  }

  if (obj.answer !== null) {
    // Answer 생략
    const answer = obj.answer.bodyHTML;
    let shortedAnswerText = getOnlyText(answer)


    if (shortedAnswerText.length > 150) {
      shortedAnswerText = shortedAnswerText.substring(0, 146) + ' ...'
    }

    discussionContent.innerHTML = `<div class="question-section">
    <div class="discussion__avatar--wrapper">
      <img class="discussion__avatar--image"
        src=${obj.avatarUrl}
        alt="avatar of ${obj.author}">
      <p class="user-name">${shortedUserName}</p>
    </div>
    <h3 class="discussion__title"><a
        href=${obj.url}>${shortedTitleText}</a></h3>
    <div class="discussion__answered">
      <p>✅</p>
    </div>
  </div>
  <div class="answer-section">
    <p class="text-answer">${shortedAnswerText}</p>
  </div>
  <div class="discussion__information"> ${obj.createdAt}</div>`


  } else {
    discussionContent.innerHTML = `<div class="question-section">
    <div class="discussion__avatar--wrapper">
      <img class="discussion__avatar--image"
        src=${obj.avatarUrl}
        alt="avatar of ${obj.author}">
      <p class="user-name">${shortedUserName}</p>
    </div>
    <h3 class="discussion__title"><a
        href=${obj.url}>${shortedTitleText}</a></h3>
    <div class="discussion__answered">
      <p>❌</p>
    </div>
  </div>
  <div class="answer-section">
    <p class="text-answer">[[답변을 기다리고 있습니다]]</p>
  </div>
  <div class="discussion__information"> ${obj.createdAt}</div>`
  }


  // component.append(discussionContent);
  return discussionContent;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i++) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const container = document.querySelector("div.discussion__container");
render(container);


// 진짜 나으 아고라 스테이츠 만들기

const formContainer = document.querySelector('.form__container')

const submitBtn = document.querySelector('.form__submit')

const nameInput = document.querySelector('#name')
const titleInput = document.querySelector('#title')
const contentInput = document.querySelector('#story')

submitBtn.addEventListener('click', event => {
  event.preventDefault()

  // const component = document.createElement('div')
  // component.className = "discussion__container"

  formContainer.style.display = "none"

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";



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



  // discussionContent.innerHTML = `<h2 class="discussion__title"><a
  // href='https://www.google.com/'>${titleInput.value}</a></h2>
  // <p>❌</p>
  // <div class="discussion__information">${nameInput.value} / ${currentYear}-${currentMonth}-${currentDay}T${currentHours}:${currentMinutes}:${currentSeconds}Z
  // </div >`

  discussionContent.innerHTML =
    `<div class="question-section">
    <div class="discussion__avatar--wrapper">
      <img class="discussion__avatar--image"
      src="https://avatars.githubusercontent.com/u/94218285?s=64&u=96e12a65d2e9387f8a949da5103ec2751b6c1f1f&v=4"
      alt="avatar of ${nameInput.value}">
    <p class="user-name">${nameInput.value}</p>
  </div> <h3 class="discussion__title"><a href='https://www.google.com/'>${titleInput.value}</a></h3><div class="discussion__answered"><p>❌</p></div></div>
<div class="answer-section"><p class="text-answer">[[답변을 기다리고 있습니다]]</p></div>
<div class="discussion__information"> ${currentYear}-${currentMonth}-${currentDay}T${currentHours}:${currentMinutes}:${currentSeconds}Z</div>`


  container.prepend(discussionContent)

  nameInput.value = '';
  titleInput.value = '';
  contentInput.value = '';

  formContainer.classList.add('hide');

})

// 질문하기 모달

const askBtn = document.querySelector('.askBtn');


askBtn.addEventListener('click', () => {
  formContainer.style.display = "block"
})

const modalCloseBtn = document.querySelector('#closeBtn')
modalCloseBtn.addEventListener('click', () => {
  formContainer.style.display = "none"
})

window.addEventListener('click', event => {
  if (event.target == formContainer) {
    formContainer.style.display = "none";
  }
})

// header 고정

const header = document.querySelector('header');
const sticky = header.offsetTop;

window.addEventListener('scroll', () => {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
});

const toTheTopBtn = document.querySelector('.to-the-top')

toTheTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
})