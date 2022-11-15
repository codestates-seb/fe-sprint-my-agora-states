// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
const h1 = document.querySelector('h1')



// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; // <div class="discussion__avatar--wrapper">
  const discussionContent = document.createElement("div"); // <div class="discussion__content">
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div"); //  <div class="discussion__answered"></div>
  discussionAnswered.className = "discussion__answered";


  // 이미지
  const avatarImg = document.createElement('img')
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);


  // 내용
  const disContent = document.createElement('h5');
  disContent.className = "discussion__title";
  discussionContent.append(disContent);
  const alink = document.createElement('a');
  alink.setAttribute('href', obj.url);
  alink.textContent = obj.title;
  disContent.append(alink);
  // console.log(disContent);

  const info = document.createElement('div')
  info.className = "discussion__information";
  info.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  discussionContent.append(info);


  // 답, 체크박스
  const answerboxo = document.createElement('p')
  answerboxo.textContent = (obj.answer !== null) ? '🅅' : '🅇';
  discussionAnswered.append(answerboxo);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const form = document.querySelector('form.form')
const inputName = document.querySelector('.form__input--name > input')
const inputTitle = document.querySelector('.form__input--title > input')
const inputQuestion = document.querySelector('.form__textbox > textarea')

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const obj = {
    id: '0',
    createdAt: new Date(),
    title: inputTitle.value,
    url: null,
    author: inputName.value,
    answer: null,
    bodyHTML: inputQuestion.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  }

  agoraStatesDiscussions.unshift(obj);
  ul.prepend(convertToDiscussion(obj));

  inputName.value = '';
  inputTitle.value = '';
  inputQuestion.value = '';
  
});
agoraStatesDiscussions.length;


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// const p1 = document.querySelector('#a')
// const p2 = document.querySelector('#b')
// const p3 = document.querySelector('#c')
// const p4 = document.querySelector('#d')
// console.log(p1)






// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


