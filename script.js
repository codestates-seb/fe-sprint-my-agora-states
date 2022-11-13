// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const form = document.querySelector('.form');
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputStory = document.querySelector('#story');

const makeDiscussionData = () => {
  return {
    author: inputName.value,
    title: inputTitle.value,
    url: inputStory.value,
    createdAt: new Date(),
    answer: null,
  };
};

const convertDate = createdAt => {
  return new Date(createdAt).toLocaleString();
};

form.addEventListener('submit', e => {
  e.preventDefault();

  const li = convertToDiscussion(makeDiscussionData());
  ul.prepend(li);
});

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = obj => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const { createdAt, title, author, avatarUrl, answer, url } = obj;

  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion_avatar--image';
  avatarImg.src = avatarUrl;
  avatarImg.alt = `avatar of ${author}`;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion_title';
  const discussionUrl = document.createElement('a');
  discussionUrl.textContent = title;
  discussionUrl.href = url;
  discussionTitle.append(discussionUrl);
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion_information';
  discussionInfo.textContent = `${author} / ${convertDate(createdAt)}`;
  discussionContent.append(discussionInfo);

  const answerCheck = document.createElement('p');
  answerCheck.textContent = answer
    ? String.fromCharCode(0x2713)
    : String.fromCharCode(0x2716);
  discussionAnswered.append(answerCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = element => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);

// pagination
const pagination = () => {};
