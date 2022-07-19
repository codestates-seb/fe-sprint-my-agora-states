// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  // part1 : avatar
  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';

  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;
  avatarWrapper.append(avatarImg);

  // part2 : content
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';

  const discussionTitle = document.createElement('h2'); // part2-1 : content 제목
  discussionTitle.className = 'discussion__title';
  discussionContent.append(discussionTitle);

  const discussionLink = document.createElement('a'); // part2-1-1 : content 제목링크
  discussionLink.setAttribute('href', obj.url);
  discussionLink.setAttribute('target', '_blank');
  discussionLink.textContent = obj.title;
  discussionTitle.append(discussionLink);

  const discussionInfo = document.createElement('div'); // part2-2 : content 정보
  discussionInfo.className = 'discussion__information';

  const dateCreated = new Date(obj.createdAt).toLocaleDateString('ko-kr');
  discussionInfo.textContent = `${obj.author} / ${dateCreated}`; // 구조 : 글쓴이 / 시간

  discussionContent.append(discussionInfo);

  // part3 : check if answered
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';

  const discussionAnsweredIcon = document.createElement('p');
  if (obj.answer) {
    discussionAnsweredIcon.textContent = '✅';
  } else {
    discussionAnsweredIcon.textContent = '☑️';
  }
  discussionAnswered.append(discussionAnsweredIcon);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);

// 버튼 이벤트
const submitForm = document.querySelector('.form');
const btnHandler = (event) => {
  event.preventDefault();
  const inputName = document.querySelector('.form__input--name > input');
  const inputTitle = document.querySelector('.form__input--title > input');
  const inputTextbox = document.querySelector('.form__textbox > textarea');
  const newObj = {
    id: 'unique id',
    createdAt: new Date().toLocaleDateString('ko-kr'),
    title: inputTitle.value,
    url: 'https://github.com/codestates-seb/agora-states-fe/discussions/45',
    author: inputName.value,
    answer: null,
    bodyHTML: inputTextbox.value,
    avatarUrl:
      'https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4',
  };
  agoraStatesDiscussions.unshift(newObj);
  const newDiscussion = convertToDiscussion(newObj);
  ul.prepend(newDiscussion);
  saveObj();
};
submitForm.addEventListener('submit', btnHandler);

// 로컬스토리지 ing
const saveObj = (event) => {
  localStorage.setItem('newDiscussion', JSON.stringify(agoraStatesDiscussions));
};
const savedObjs = localStorage.getItem('newDiscussion');
const parsedObjs = JSON.parse(savedObjs);
