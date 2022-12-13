
const ul = document.querySelector("ul.discussions__container");
const discussionSection = document.querySelector('section.discussion__wrapper');
// let agoraStatesDiscussions = []
//  fetch('http://localhost:4000/discussions')
// .then(res => res.json())
// .then(json => {
//   return agoraStatesDiscussions = json
// })
async function getData() {
  const res = await fetch('http://localhost:4000/discussions')
  let agoraStatesDiscussions = await res.json()

  console.log(agoraStatesDiscussions)

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
  const userProfile = document.createElement("img");
  userProfile.className = "discussion__avatar--image"
  userProfile.src = obj.avatarUrl;
  userProfile.alt = `avatar of ${obj.author}`;
  
  avatarWrapper.append(userProfile);

  const discussionTitle = document.createElement("h2");
  const titleLink = document.createElement("a");
  discussionTitle.className = "discussion__title";
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;

  const feedbackLabel = document.createElement("p");
  feedbackLabel.className = "discussion__answered--feedback";
  const feedbackFrame = document.createElement("a");
  
  const answerCheckbox = document.createElement("input");
  answerCheckbox.className = "discussion__information--answercheck";
  answerCheckbox.type = "checkbox";

  // answerCheckbox.value = "";
  
  //답변이 있는 경우 label에 피드백을 확인하라는 안내 문구 출력
  //안내 문구 클릭시 답변으로 이동
  if (obj.answer) {
    feedbackFrame.textContent = "Check Feedback!"
    feedbackFrame.href = obj.answer.url;
    answerCheckbox.checked = true;
  }
 
  discussionTitle.append(titleLink);
  feedbackLabel.append(feedbackFrame);
  discussionAnswered.append(feedbackLabel, answerCheckbox);
  discussionContent.append(discussionTitle, discussionInformation);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form');
const inputName = document.querySelector('.form__input--name > input');
const inputTitle = document.querySelector('.form__input--title > input');
const inputQuestion = document.querySelector('.form__textbox > textarea');

//submit 이벤트 데이터에 생성
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const obj = {
    id: 'new id',
    author: inputName.value,
    createdAt: new Date(),
    title: inputTitle.value,
    answer: null,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4"
  }
  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));
  inputName.value = '';
  inputTitle.value = '';
  inputQuestion.value = '';
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
  for (let i = 0; i < pageList.length; i += 1) {
    element.append(convertToDiscussion(pageList[i]));
  }
  return;
};

const main = document.querySelector('main')

//페이지네이션 이벤트 생성
//본 객체의 시작 인덱스 ~~ 종료 인덱스까지를 변수로 설정
const buttonClick = (event, target) => {
  const startIndex = (event.target.textContent - 1) * pageSize;
  const lastIndex = startIndex + pageSize;
  pageList = agoraStatesDiscussions.slice(startIndex,lastIndex);
  render(ul);
}

const pageSize = 5
let pageList = agoraStatesDiscussions.slice(0, pageSize)

// 페이지네이션 렌더링
const renderPage = () => {
// 페이지네이션 html 추가
  const pagination = document.createElement('footer')
  pagination.className = 'pagination__container'
  main.append(pagination)
  
  for(let i = 1; i < Math.ceil(agoraStatesDiscussions.length / 5); i++) {
    const pageNumber = document.createElement('a')
    pageNumber.className = 'pagination__number'
    pageNumber.textContent = ` ${i} `
    pageNumber.onclick = buttonClick
    pagination.append(pageNumber)
  }
}

// start
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render(ul);
renderPage();

}

getData()
