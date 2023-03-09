const ul = document.querySelector('ul.discussions__container');

const askingButton = document.getElementById('asking');

const formContainer = document.querySelector('.form__container');
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputQuestion = document.querySelector('#story');
const submitButton = document.querySelector('#submit-button');

askingButton.addEventListener('click', () => {
  formContainer.classList.toggle('show');
});

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  ul.append(
    convertToDiscussion({
      createdAt: new Date().toISOString(),
      title: inputTitle.value,
      author: inputName.value,
      answer: null,
      bodyHTML: inputQuestion.value,
      avatarUrl: '',
    })
  );

  formContainer.classList.toggle('show');
});

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = ({
  id,
  createdAt,
  title,
  url,
  author,
  answer,
  bodyHTML,
  avatarUrl,
}) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image';
  avatarImage.src = avatarUrl;
  avatarImage.alt = `avatar of ${author}`;
  avatarWrapper.append(avatarImage);

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const discussionUrl = document.createElement('a');
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';

  discussionUrl.href = url;
  discussionUrl.textContent = title;
  discussionTitle.append(discussionUrl);
  discussionInformation.textContent = `${author} / ${parseCreatedTime(createdAt)}`;
  discussionContent.append(discussionTitle, discussionInformation);

  const isAnsweredDiscussion = document.createElement('p');
  isAnsweredDiscussion.textContent = answer ? '☑' : '☒';
  discussionAnswered.append(isAnsweredDiscussion);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const parseCreatedTime = (time) => {
  return new Date(time).toLocaleString('ko-KR');
};

const initializeInput = () => {
  inputName.value = '';
  inputTitle.value = '';
  inputQuestion.value = '';
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render(ul);
