// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

let data;
const dataFromLocalStorage = localStorage.getItem('agoraStatesDiscussions');
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage);
} else {
  data = agoraStatesDiscussions.slice();
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper'; // 아바타 이미지
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content'; // 타이틀, 날짜
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered'; // 체크

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  const avatar = document.createElement('img');
  avatar.className = 'discussion__avatar--image';
  avatar.src = obj.avatarUrl;
  avatar.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatar);

  const content = document.createElement('h2');
  const title = document.createElement('a');
  title.className = 'discussion__title';
  title.href = obj.url;
  title.innerText = obj.title;
  content.append(title);
  discussionContent.append(content);

  const information = document.createElement('div');
  information.className = 'discussion__information';
  information.innerText = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  discussionContent.append(information);

  const answer = document.createElement('p');
  answer.innerText = `${obj.answer !== null ? '✅' : '✏️'}`;
  discussionAnswered.append(answer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const render = (element, from, to) => {
  console.log(from, to);
  if (!from && !to) {
    from = 0;
    to = data.length - 1;
  }
  // 다 지우고 배열에 있는 내용 다 보여주기
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = from; i < to; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul, 0);

// submit
const form = document.querySelector('form.form');
const author = document.querySelector('div.form__input--name > input');
const title = document.querySelector('div.form__input--title > input');
const textbox = document.querySelector('div.form__textbox > textarea');

// function saveObj() {
//   localStorage.setItem(TODOS_KEY, JSON.stringify(obj));
// }

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newData = {
    id: 'user',
    createdAt: new Date().toLocaleTimeString(),
    title: title.value, // 타이틀
    url: 'https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236',
    author: author.value, // 이름
    bodyHTML: textbox.value, // 질문
    avatarUrl: 'https://avatars.githubusercontent.com/u/79903256?s=64&v=4',
  };

  data.unshift(newData);

  // 로컬스토리지에 저장
  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(data));

  // 렌더링
  render(ul, 0);

  title.value = '';
  author.value = '';
  textbox.value = '';
});
