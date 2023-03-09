// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  console.log(obj);

  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';

  const discussionTitle = document.createElement('div');
  discussionTitle.className = 'discussion__title';

  const h2 = document.createElement('h2');

  const discussionAnswered = document.createElement('span');
  discussionAnswered.className = 'discussion__answered';
  discussionAnswered.textContent = obj.answer ? '답변 완료' : '진행 중';

  const titleA = document.createElement('a');
  titleA.href = obj.url;
  titleA.textContent = obj.title;

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';

  const avatar = document.createElement('img');
  avatar.className = 'discussion__avatar--image';
  avatar.src = obj.avatarUrl;
  avatar.alt = `avatar of ${obj.author}`;

  const discussionInfor = document.createElement('div');
  discussionInfor.className = 'discussion__information';

  const nickname = document.createElement('span');
  nickname.textContent = obj.author;
  const createDate = document.createElement('span');
  createDate.textContent = dataConverter.date(obj.createdAt);

  li.append(discussionContent);
  discussionContent.append(discussionTitle, avatarWrapper);
  discussionTitle.append(h2, discussionAnswered);
  h2.append(titleA);
  avatarWrapper.append(avatar, discussionInfor);
  discussionInfor.append(nickname, createDate);

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
const ul = document.querySelector('ul.discussions__container');
render(ul);
