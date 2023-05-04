// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const { id, author, title, avatarUrl, bodyHTML, answer, createdAt } = obj;
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const avatar = document.createElement('img');
  avatar.className = 'discussion__avatar--image';
  avatar.src = avatarUrl;
  avatarWrapper.appendChild(avatar);

  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionTitle = document.createElement('h2');
  const discussionIsAnswered = document.createElement('span');
  discussionIsAnswered.className = answer
    ? 'discussion__is-answered answered'
    : 'discussion__is-answered';
  discussionIsAnswered.textContent = answer ? '[답변완료] ' : '[미해결] ';
  discussionTitle.appendChild(discussionIsAnswered);
  discussionTitle.className = 'discussion__title';
  const discussionTitleLink = document.createElement('a');
  discussionTitleLink.href = 'javascript:void(0)';
  discussionTitleLink.textContent = title;
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${author} / ${createdAt}`;
  discussionTitle.appendChild(discussionTitleLink);
  discussionContent.appendChild(discussionTitle);
  discussionContent.appendChild(discussionInformation);

  const discussionRemove = document.createElement('div');
  discussionRemove.className = 'discussion__remove';
  const discussionRemoveButton = document.createElement('i');
  discussionRemoveButton.className = 'fa-solid fa-trash';
  discussionRemove.appendChild(discussionRemoveButton);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.appendChild(avatarWrapper);
  li.appendChild(discussionContent);
  li.appendChild(discussionRemove);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  element.innerHTML = '';
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);

// 게시글 등록
const submitBtnEl = document.querySelector('input[type="submit"]');
const authorEl = document.getElementById('author');
const titleEl = document.getElementById('title');
const textareaEl = document.getElementById('story');

submitBtnEl.addEventListener('click', (e) => {
  e.preventDefault();
  if (authorEl.value === '') {
    alert('작성자를 입력해주세요.');
    return;
  }
  if (titleEl.value === '') {
    alert('제목을 입력해주세요.');
    return;
  }
  if (textareaEl.value === '') {
    alert('내용을 입력해주세요.');
    return;
  }
  postDiscussion(authorEl.value, titleEl.value, textareaEl.value);
  titleEl.value = '';
  textareaEl.value = '';
  alert('질문이 등록되었습니다.');
});

const postDiscussion = (author, title, body) => {
  const newDiscussion = {
    author,
    title,
    avatarUrl: 'https://avatars.githubusercontent.com/u/60064471?v=4',
    url: 'javascript:void(0)',
    bodyHTML: body,
    answer: undefined,
    createdAt: new Date(),
  };
  agoraStatesDiscussions.unshift(newDiscussion);
  render(ul);
};
