const addTime = () => {
  const currentTime = new Date();
  let hours = currentTime.getHours(); // 시
  const minutes = currentTime.getMinutes(); // 분
  const seconds = currentTime.getSeconds();
  let postedTime = `오전 ${hours}시 ${minutes}분 ${seconds}초`;
  // 12시가 넘어가면 hours - 12 하면 12시간단위.
  if (hours > 12) {
    hours -= 12;
    postedTime = `오후 ${hours}시 ${minutes}분 ${seconds}초`;
  }
  return postedTime;
};

const convertToDiscussion = (obj) => {
  const li = document.createElement('li'); // li 요소 생성
  li.className = 'discussion__container'; // 클래스 이름 지정

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = 'discussion__avatar--wrapper';
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement('div');
  discussionContent.className = 'discussion__content';
  const contentTitle = document.createElement('h2');
  contentTitle.className = 'discussion__title';
  discussionContent.append(contentTitle);
  const titleUrl = document.createElement('a');
  titleUrl.setAttribute('href', obj.url);
  titleUrl.textContent = obj.title;
  contentTitle.append(titleUrl);

  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = obj.author + ' / ' + obj.createdAt;
  discussionContent.append(discussionInfo);

  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';
  const discussionCheckbox = document.createElement('i');
  // 답변이 달린 경우 분기(체크표시, 답변 렌더링)
  if (obj.answer) {
    discussionCheckbox.className = 'fa-solid fa-square-check';
  } else {
    discussionCheckbox.className = 'fa-solid fa-square';
  }
  discussionAnswered.append(discussionCheckbox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    // console.log(element);
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);

// 디스커션 추가 기능 구현
const titleInput = document.querySelector('#title');
const submitButton = document.querySelector('#submit-button');
const newObj = {
  id: 'D_kwDOHOApLM4APewe',
  createdAt: '2022-05-07T08:33:57Z',
  title: titleInput.value,
  url: 'https://github.com/codestates-seb/agora-states-fe/discussions/20',
  author: 'ryan-kim-dev',
  answer: null,
  bodyHTML:
    '<p dir="auto">문제는 객관식으로 틀린 답을 고르라고 제시되어 있으나 보기는 주관식으로 올바른 Bracket notation 접근법 입력을 요하고 있습니다.</p>',
  avatarUrl:
    'https://avatars.githubusercontent.com/u/78180055?s=64&u=e9042943147b7659cf195acf50b6e02777e64761&v=4',
};

const onClickSubmit = (e) => {
  e.preventDefault();
  newObj.title = titleInput.value;
  newObj.createdAt = addTime();
  agoraStatesDiscussions.unshift(newObj);
  let li = convertToDiscussion(newObj);
  ul.prepend(li);
  return render(ul);
};

submitButton.addEventListener('click', onClickSubmit);

const pagination = (total, bottomSize, listSize, cursor) => {
  // let total = obj.length;
  // let bottomSize = 5;
  // let listSize = 10;
  // let cursor;
  //total = 총 갯수
  //bottomSize = 하단크기
  //listSize = 화면에서 보여줄 크기
  //cursor = 현재 나의 페이지

  let totalPageSize = Math.ceil(total / listSize); //한 화면에 보여줄 갯수에서 구한 하단 총 갯수

  let firstBottomNumber = cursor - (cursor % bottomSize) + 1; //하단 최초 숫자
  let lastBottomNumber = cursor - (cursor % bottomSize) + bottomSize; //하단 마지막 숫자

  if (lastBottomNumber > totalPageSize) lastBottomNumber = totalPageSize; //총 갯수보다 큰 경우 방지
  return console.log({
    firstBottomNumber,
    lastBottomNumber,
    totalPageSize,
    total,
    bottomSize,
    listSize,
    cursor,
  });
};
const currentPageNumber = document.querySelector('.pagination');
currentPageNumber.addEventListener('click', (e) => {
  return pagination(
    agoraStatesDiscussions.length,
    5,
    10,
    Number(e.target.textContent)
  );
});
