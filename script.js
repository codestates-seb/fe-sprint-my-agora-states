console.log(agoraStatesDiscussions[0]);

const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // 유저 이미지
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarImg.className = 'discussion__avatar--image'
  avatarWrapper.append(avatarImg);

  // 질문 제목
  const questionTitle = document.createElement('h2');
  questionTitle.className = 'discussion__title';
  questionTitle.textContent = obj.title;
  discussionContent.append(questionTitle);

  // 질문 정보
  const questionInfo = document.createElement('div');
  questionInfo.className = 'discussion__information';
  questionInfo.textContent = obj.author + ' / ' + obj.createdAt;
  discussionContent.append(questionInfo);

  // 답변 여부 설정
  if (obj.answer) {
    discussionAnswered.textContent = '답변완료';
    discussionAnswered.classList.add('isanswered');
  } else {
    discussionAnswered.textContent = '답변대기';
  }

  // block 전체에 링크 걸기
  li.addEventListener('click', () => {
    location.href = obj.url;
  })

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const ul = document.querySelector("ul.discussions__container");
render(ul);



// Modal Focusing
const modal = document.querySelector('#staticBackdrop');
modal.addEventListener('shown.bs.modal', () => {
  document.querySelector('#name').focus();
});