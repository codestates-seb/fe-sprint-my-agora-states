// // index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions.length);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li');
  const avatarWrapper = document.createElement('div');
  const discussionContent = document.createElement('div');
  const discussionAnswered = document.createElement('div');
  const discussionInfo = document.createElement('div')
  const avatarImg = document.createElement('img');
  const h2 = document.createElement('h2');
  const a = document.createElement('a');
  const p = document.createElement('p')

  li.className = 'discussion__container';
  avatarWrapper.className = 'discussion__avatar--wrapper';
  discussionContent.className = 'discussion__content';
  discussionAnswered.className = 'discussion__answered';
  avatarImg.className = 'discussion__avatar--image';
  h2.className = 'discussion__title';
  discussionInfo.className = 'discussion__information';
  

  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  h2.textContent = obj.title
  a.href = obj.url;
  discussionInfo.textContent = obj.author + " / " + obj.createdAt;
  p.textContent = obj.answer === null ? "□":"☑";

  discussionAnswered.append(p);
  h2.append(a);
  avatarWrapper.append(avatarImg);
  discussionContent.append(h2, discussionInfo);
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
// local 저장

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//버튼클릭 이벤트
const submitBtn = document.querySelector(".submit__btn");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.querySelector('#name')
  const title1 = document.querySelector('#title')
  const story = document.querySelector('#story')
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes();  // 분
  let seconds = today.getSeconds();  // 초
  const ul = document.querySelector("ul.discussions__container");

  let obj = {};
    obj.title = title1.value,
    obj.bodyHTML = story.value,
    obj.author = name.value,
    obj.createdAt = year + '-' + month + '-' + date + 'T' + hours + ':' + minutes + ':' + seconds + 'Z',
    obj.avatarUrl = "https://cdn.jumpit.co.kr/images/hmlee_4/20223703083724365_800_800.png"
    obj.url = "https://github.com/Mark1237200/Mark1237200.github.io",
    obj.answer = null

  const newObj = convertToDiscussion(obj);

  ul.prepend(newObj);
  formName.value = "";
  formTitle.value = "";
  formStory.value = "";
})

fetch('http://localhost:3001/discussions').then((res) => {
  return res.json()
}).then((json) => {
  agoraStatesDiscussions = json
  const ul = document.querySelector('ul.discussion_container')
  render(ul)
})