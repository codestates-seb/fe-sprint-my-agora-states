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

  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const discussionAuthor = document.createElement('div');
  discussionAuthor.className = 'discussion__author';
  const discussionCreatedTime = document.createElement('div');
  discussionCreatedTime.className = 'discussion__created-time';

  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image';
  avatarImage.src = avatarUrl;
  avatarImage.alt = `avatar of ${author}`;
  avatarWrapper.append(avatarImage);

  discussionAuthor.textContent = author;
  discussionCreatedTime.textContent = parseCreatedTime(createdAt);

  discussionInformation.append(avatarWrapper);
  discussionInformation.append(discussionAuthor);
  discussionInformation.append(discussionCreatedTime);

  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionContentInformation = document.createElement('div');
  discussionContentInformation.className = 'discussion__content-information';
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const discussionUrl = document.createElement('a');
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';
  const discussionAnsweredStatus = document.createElement('p');

  discussionUrl.href = url;
  discussionUrl.textContent = title;
  discussionTitle.append(discussionUrl);

  if (answer) {
    discussionAnswered.classList.add('solved');
    discussionAnsweredStatus.textContent = '답변 완료';
  } else if (!answer && !title.includes('notice')) {
    discussionAnswered.classList.add('unsolved');
    discussionAnsweredStatus.textContent = '답변 대기중';
  } else {
    discussionAnswered.classList.add('notice');
    discussionAnsweredStatus.textContent = '공지';
  }

  discussionAnswered.append(discussionAnsweredStatus);
  discussionContentInformation.append(discussionTitle, discussionAnswered);
  discussionContent.append(discussionContentInformation);

  li.append(discussionInformation, discussionContent, document.createElement('hr'));
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
