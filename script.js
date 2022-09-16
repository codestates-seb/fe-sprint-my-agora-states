// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 프로필 이미지 추가
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // 컨텐트 추가
  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title"
  discussionContent.append(contentTitle);

  const contentTitleA = document.createElement('a');
  contentTitleA.href = obj.url;
  contentTitleA.textContent = obj.title;
  contentTitle.append(contentTitleA);

  // 작성자 추가
  const contentInform = document.createElement('div');
  contentInform.className = "discussion__information";
  contentInform.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(contentInform);

  // 답변 현황 추가
  const answerChecked = document.createElement('div');
  answerChecked.className = "discussion__answered--checked";
  answerChecked.textContent = obj.answer ? '🥰' : '🥺';
  discussionAnswered.append(answerChecked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 입력한 질문을 agoraStatesDiscussions에 업데이트
const formName = document.querySelector('.form__input--name > input');
const formTitle = document.querySelector('.form__input--title > input');
const formSubmit = document.querySelector('.form__submit > button');

formSubmit.addEventListener('click', () => {
  event.preventDefault(); // 초기화 방지
  const submitObj = {
    id: 'id',
    createdAt: new Date().toLocaleString(),
    url: undefined,
    author: formName.value,
    title: formTitle.value,
    answer: undefined,
    bodyHTML: formSubmit.value,
    avatarUrl: './baby_bunny.jpg'
  };
  agoraStatesDiscussions.unshift(submitObj);
  
  const newContent = convertToDiscussion(submitObj);
  ul.prepend(newContent);
})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
