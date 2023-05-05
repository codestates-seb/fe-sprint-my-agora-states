import DiscussionItem from './components/DiscussionItem.js';

// Discussion 렌더링
const discussion = document.querySelector('ul.discussions__container');
const renderDiscussion = () => {
  const fragment = document.createDocumentFragment();
  discussion.innerHTML = '';
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    const discussionItem = new DiscussionItem({
      className: 'discussion__container',
      props: agoraStatesDiscussions[i],
    }).el;
    fragment.appendChild(discussionItem);
  }
  discussion.appendChild(fragment);
  return;
};

renderDiscussion();

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
    createdAt: new Date().toISOString(),
  };
  agoraStatesDiscussions.unshift(newDiscussion);
  renderDiscussion();
};
