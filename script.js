// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

let agoraStatesDiscussions;
// converToDiscussion = (obj) => li
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
  // 아바타래퍼, 디스커션컨텐트, 디스커션앤설 에 더미데이터 할당.
  // 아바타이미지 부분
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // discussion 제목부분
  const discussionTitle = document.createElement('h2');
  const discussionTitlelink = document.createElement('a');
  discussionTitlelink.href = obj.url; // a태그에 더미데이터(디스커션주소) 링크 할당
  discussionTitlelink.textContent = obj.title; // a태그에 더미데이터(디스커션제목) 할당
  discussionTitle.append(discussionTitlelink); // h2태그에 a태그 넣어주기
  discussionTitle.className = 'discussion__title';
  discussionContent.append(discussionTitle); // 클래스가 discussion__content인 부분에 discussionTitle 넣어주기

  // discussion 정보부분
  const discussionInformation = document.createElement('div');
  discussionInformation.textContent = obj.author + ' / ' + obj.createdAt;
  discussionInformation.className = 'discussion__information';
  discussionContent.append(discussionTitle, discussionInformation);

  // check박스부분
  const answeredCheckbox = document.createElement('p');
  answeredCheckbox.textContent = obj.answer ? '✅' : '❎';
  discussionAnswered.append(answeredCheckbox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  // li 한줄한줄마다 더미데이터 할당

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i])); //
  }
  return;
};

fetch('http://localhost:4000/discussions')
  .then((res) => res.json())
  .then((data) => {
    agoraStatesDiscussions = data;
    const ul = document.querySelector('ul.discussions__container');
    render(ul);
  });

/**[ ] 디스커션 추가 기능
- [ ] `script.js`를 수정하여 디스커션 추가 기능을 구현합니다.
- [ ] `section.form__container` 요소에 새로운 아고라 스테이츠 질문을 추가할 수 있는 입력 폼을 제작합니다. 형식은 자유입니다.
- [ ] 아이디, 본문을 입력하고 버튼을 누르면 실제 화면에 디스커션이 추가되어야 합니다.
- [ ] `agoraStatesDiscussions` 배열에 추가한 데이터가 실제 쌓여야 합니다.*/
//
