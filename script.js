// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

//입력폼 데이터 추가
const formInputWrapper = document.querySelectorAll(".form__input--wrapper");
const formSubmit = document.querySelector('#submit');
const elInputName = document.querySelector('#name');
const elInputTitle = document.querySelector('#title');
const elInputStory = document.querySelector('#story');
const elTime = 
  new Date(new Date().getTime()-new Date().getTimezoneOffset()*60000).toISOString()
  .slice(0, 19) + 'Z';

//시간변환
function changeTime(time) {
  time = time.slice(11, -1);
  let hour = + time.slice(0, 2);
  let morning_afternoon = hour >= 12 ? '오후' : '오전';
  let transition_time =
    morning_afternoon === '오후'
      ? hour === 12
        ? hour
        : (hour = hour - 12)
      : hour;
  return morning_afternoon + ' ' + transition_time + time.slice(2);
}

//제출 버튼 클릭
formSubmit.addEventListener('click', (e) => {
  e.preventDefault();

  const formArr = {};

  formArr.author = elInputName.value;
  formArr.title = elInputTitle.value;
  formArr.story = elInputStory.value;
  formArr.avatarUrl = "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
  formArr.createdAt = elTime;
  agoraStatesDiscussions.unshift(formArr);

  const render = (element) => {
    for (let i = (currentPage - 1) * 10; i < currentPage * 10; i += 1) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    return;
  };

  ul.innerHTML = "";
  render(ul);
  elInputName.value = "";
  elInputTitle.value = "";
  elInputStory.value = "";
});

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
  
  // avatar
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  
  // title
  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title";
  const contentTitleA = document.createElement('a');
  contentTitleA.href = obj.url;
  contentTitleA.textContent = obj.title;
  
  discussionContent.append(contentTitle);
  contentTitle.append(contentTitleA);
  
  //info
  const contentInfo = document.createElement('div');
  contentInfo.className = "discussion__information";

  contentInfo.textContent = obj.author + ' / ' + changeTime(obj.createdAt);
  contentTitle.append(contentInfo);

  //answered
  const answer = document.createElement('div');
  const answerCheck = document.createElement('input');
  answer.className = "discussion__answered";
  answerCheck.setAttribute('type', 'checkbox');
  discussionAnswered.append(answer);
  answer.append(answerCheck);
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};



//pagination
const prevBtn = document.querySelector('.prev__button');
const nextBtn = document.querySelector('.next__button');

let currentPage = 1;
let totalPage = Math.ceil(agoraStatesDiscussions.length / 10);

prevBtn.addEventListener('click', () => {
  currentPage = currentPage - 1;
  if (currentPage <= 1) {
    prevBtn.disabled = true;
  }
  if (currentPage < totalPage) {
    nextBtn.disabled = false;
  }
  ul.innerHTML = '';
  render(ul);
});

nextBtn.addEventListener('click', () => {
  currentPage = currentPage + 1;
  if (currentPage > 1) {
    prevBtn.disabled = false;
  }
  if (currentPage >= totalPage) {
    nextBtn.disabled = true;
  }
  ul.innerHTML = '';
  render(ul);
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = (currentPage - 1) * 10; i < currentPage * 10; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);
