/**
 * TODO:
 * list 불러오기
 * discussion 배열을 이용하여 요소 화면에 렌더링하기
 *
 * discussion을 추가 기능
 * [ ] section.form__container 요소에 새로운 질문을 추가할 수 있는 입력 폼을 만든다.
 * [ ] 아이디, 본문을 입력하고 등록 버튼을 누르면 화면에 discussion이 추가되어야 한다.
 * [ ] discussions 배열에 추가한 데이터가 실제로 쌓여야 한다. (agoraStatesDiscussion)
 *
 * 현지 시간 적용
 * [ ] 샘플 시간을 변형하여, 현지 시간에 맞게 표현 (ex. 오전 10:02:17)
 *
 * 페이지네이션 기능
 * [ ] 한 페이지에 10개씩 디스커션이 보여주기
 * [ ] 이전, 다음 페이지로 이동
 * [ ] 이전, 다음 페이지가 없는 경우 페이지를 유지하기
 *
 * LocalStorage
 * [ ] 새롭게 추가하는 Discussion이 페이지를 새로고침해도 유지되어야 함
 */

// convertToDiscussion은 discussion 데이터를 DOM으로 생성
const convertToDiscussion = (obj) => {
  console.log(obj);

  const { answer, author, avatarUrl, bodyHTML, createdAt, id, title, url } =
    obj;

  const li = document.createElement('li'); // discussion 1개의 컨테이너, li 요소 생성
  li.className = 'discussion__container';

  /** profile img */
  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('discussion__avatar--image');
  avatarImg.src = avatarUrl;
  avatarWrapper.appendChild(avatarImg);

  /** discussion content */
  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const discussionTitle = document.createElement('h2');
  discussionTitle.classList.add('discussion__title');
  const discussionLink = document.createElement('a');
  discussionLink.href = url;
  discussionLink.textContent = title;
  const discussionInformation = document.createElement('div');
  discussionInformation.classList.add('discussion__information');
  discussionInformation.textContent = `${author} | ${createdAt}`; // TODO: 시간 변경 추가 작업 필요
  discussionTitle.appendChild(discussionLink);
  discussionContent.appendChild(discussionTitle);
  discussionContent.appendChild(discussionInformation);

  /** discussion answer */
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';
  const answered = document.createElement('p');

  if (answer) {
    answered.textContent = '답변 완료';
  } else {
    answered.textContent = '대기중';
  }
  discussionAnswered.appendChild(answered);

  // TODO: 객체 하나에 담긴 정보를 DOM에 넣기
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

/**
 * discussion 배열의 모든 데이터를 화면에 렌더링하는 함수
 * */
const render = (element) => {
  for (let i = 0; i < discussions.length; i += 1) {
    element.append(convertToDiscussion(discussions[i]));
  }
  return;
};

/**
 * ul 요소에 discussion 배열의 모든 데이터를 화면에 렌더링
 */
const ul = document.querySelector('ul.discussions__container');
render(ul);
