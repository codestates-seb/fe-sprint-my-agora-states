// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions.length);

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

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

function submitQuestion() {
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

  let obj = {
    createdAt: year + '-' + month + '-' + date + 'T' + hours + ':' + minutes + ':' + seconds + 'Z',
    title: title1.value,
    url: "https://github.com/Mark1237200/Mark1237200.github.io",
    author: name.value,
    answer: null,
    bodyHTML: story.value,
    avatarUrl: "https://cdn.jumpit.co.kr/images/hmlee_4/20223703083724365_800_800.png"
  }
  agoraStatesDiscussions.unshift(obj)
  const render1 = (element) => {

    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
      element.append(agoraStatesDiscussions[i]);
    }
    return;
  };
  render1(ul)
}