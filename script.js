const form = document.querySelectorAll('.form__input--wrapper');
const input_name = document.querySelector('#name');
const title = document.querySelector('#title');
const text = document.querySelector('#story');
const submit = document.querySelector('#submit');

// LocalStorage
let data = [];
const savedData = JSON.parse(localStorage.getItem('data'));
if (savedData) {
  data = savedData;
} else {
  data = agoraStatesDiscussions;
  localStorage.setItem('data', JSON.stringify(agoraStatesDiscussions));
}

const dc = document.querySelector('.discussions__container');

// Subject button Click Event
submit.addEventListener('click', (e) => {
  e.preventDefault();

  const NewObj = {};

  NewObj.author = input_name.value;
  NewObj.title = title.value;
  NewObj.text = text.value;
  NewObj.avatarUrl =
    'https://avatars.githubusercontent.com/u/65848374?s=40&v=4';
  NewObj.createdAt =
    new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 19) + 'Z';

  agoraStatePush(NewObj);

  const render = (element) => {
    for (let i = (currentPage - 1) * 10; i < currentPage * 10; i += 1) {
      element.append(convertToDiscussion(data[i]));
    }
    return;
  };
  dc.innerHTML = '';
  render(ul);
  input_name.value = '';
  title.value = '';
  text.value = '';
});

// Data Push LocalStorage , data[]
function agoraStatePush(obj) {
  data.unshift(obj);
  localStorage.setItem('data', JSON.stringify(data));
}

// Time To Korean Time
function changeKoreaTime(data) {
  // data
  data = data.slice(11, -1);
  let hour = +data.slice(0, 2);
  let morning_afternoon = hour >= 12 ? '오후' : '오전';
  let transition_time =
    morning_afternoon === '오후' ? (hour = hour - 12) : hour;
  return morning_afternoon + ' ' + transition_time + data.slice(2);
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  // avatarWrapper 에 담길 Img Tag
  const avatar_img = document.createElement('img');
  avatar_img.src = obj.avatarUrl;
  avatarWrapper.appendChild(avatar_img);

  // DiscussionTitle (제목,저자,생성일)
  const title = document.createElement('h3');
  const author_createdBox = document.createElement('div');
  const author = document.createElement('p');
  const created_at = document.createElement('p');

  title.textContent = obj.title;
  author.textContent = obj.author + ' / ';
  created_at.textContent = changeKoreaTime(obj.createdAt);
  author_createdBox.appendChild(author);
  author_createdBox.appendChild(created_at);
  discussionContent.appendChild(title);
  discussionContent.appendChild(author_createdBox);

  // discussionAnswered
  const answerd_check = document.createElement('input');
  answerd_check.setAttribute('type', 'checkbox');
  discussionAnswered.appendChild(answerd_check);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// Pagining
const previous_btn = document.querySelector('.previous-btn');
const next_btn = document.querySelector('.next-btn');

let currentPage = 1;
let totalPage = Math.ceil(data.length / 10);

previous_btn.addEventListener('click', () => {
  currentPage = currentPage - 1;
  if (currentPage <= 1) {
    previous_btn.disabled = true;
  }
  if (currentPage < totalPage) {
    next_btn.disabled = false;
  }
  dc.innerHTML = '';
  render(ul);
});

next_btn.addEventListener('click', () => {
  currentPage = currentPage + 1;
  if (currentPage > 1) {
    previous_btn.disabled = false;
  }
  if (currentPage >= totalPage) {
    next_btn.disabled = true;
  }
  dc.innerHTML = '';
  render(ul);
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = (currentPage - 1) * 10; i < currentPage * 10; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);
