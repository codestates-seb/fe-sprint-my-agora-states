// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);



/* submit */
const form = document.createElement('form');
form.className = 'form';
form.action = '';
form.method = 'get';
document.body.append(form);

const addPost = function(event){
  event.preventDefault();

  const newName = document.getElementsByName('name').value;
  const newTitle = document.getElementsByName('title').value;
  const newText = document.getElementsByName('story').value;

  agoraStatesDiscussions.unshift({
    id: null,
    createdAt: Date(),
    title: newTitle,
    url: null,
    author: newName,
    answer: null,
    bodyHTML: newText
  });

  return false;
};
form.addEventListener('submit', addPost);



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

  /*질문(가로로 자식3개)과 답변(가로로 자식2개)를 담는 부모태그*/
  const qnA = document.createElement('ul');
  qnA.className = 'discussions__container';

  /* 아 바 타 사 진 */
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);

  /* 질 문 제 목 */
  const contentTitle = document.createElement('h2');
  const titleUrl = document.createElement('a');
  titleUrl.href = obj.url;
  titleUrl.textContent = obj.title;
  titleUrl.target = '_blank';

  contentTitle.append(titleUrl);
  discussionContent.append(contentTitle);

  /* 시 간 설 정 */

  /* 사 용 자 ID, 이 름, 시 간*/
  const userId = document.createElement('div');
  userId.className = 'user_id';
  const usernameAndTime = document.createElement('div');
  usernameAndTime.className = 'user_name_time';
  userId.textContent = 'ID: ' + obj.id;
  usernameAndTime.textContent = obj.author + ' / ' + obj.createdAt;
  discussionContent.append(userId);
  discussionContent.append(usernameAndTime);

  /* 질 문 내 용 */
  const discussionTextContainer = document.createElement('li');
  discussionTextContainer.className = 'discussion__text__container'
  const discussionText = document.createElement('div');
  discussionText.className = 'discussion__text';
  discussionText.classList.add('hide');
  discussionText.innerHTML = obj.bodyHTML;
  discussionTextContainer.append(discussionText);

  /* 답 변 표 시 */
  const answerContainer = document.createElement('li');
  answerContainer.className = 'answer__container';
  answerContainer.classList.add('hide');

  /* 답 변 아 바 타*/
  const answerAvatarWrapper = document.createElement('div');
  answerAvatarWrapper.className = 'answer__avatar--wrapper';
  const answerAvatar = document.createElement('img');
  answerAvatar.className = 'answer__avatar--image';
  answerAvatar.alt = 'avatar of answerer';

  /* 답 변 자 ID, 이 름, 시 간*/ 
  const answererId = document.createElement('div');
  answererId.className = 'answerer_id';
  const answererNameAndTime = document.createElement('div');
  answererNameAndTime.className = 'answerer_name_time';

  /* 답 변 내 용*/
  const answerTitle = document.createElement('h5');
  answerTitle.className = 'answer__title';
  const answerUrl = document.createElement('a');
  answerUrl.className = 'answer_url';
  answerUrl.target   = '_blank';

  /* 답 변 이 없 습 니 다 */
  const noAnswer = document.createElement('div');
  noAnswer.className = 'answer_no_answer';

  /* 답 변 유 무 체 크 */
  const checked = document.createElement('p');
  if (obj.answer !== null) {    
    discussionAnswered.append(checked.textContent='✅');
    /* 답 변 아 바 타*/
    answerAvatar.src = obj.answer.avatarUrl;
    answerAvatarWrapper.append(answerAvatar);
    /* 답 변 자 ID, 이 름, 시 간*/ 
    answererId.textContent = 'ID: ' + obj.id
    answererNameAndTime.textContent = obj.answer.author + ' / ' + obj.answer.createdAt;
    /* 답 변 내 용 */
    answerUrl.href = obj.answer.url;
    answerUrl.innerHTML = obj.answer.bodyHTML;
    }
  else {
    discussionAnswered.append(checked.textContent='❎')
    /* 답 변 이 없 습 니 다 */
    noAnswer.textContent = '답변을 기다리는 질문입니다.';
    answerTitle.append(noAnswer);
  }
  answerTitle.append(answererId, answererNameAndTime, answerUrl);
  answerContainer.append(answerTitle, answerAvatarWrapper);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  qnA.append(li, discussionTextContainer, answerContainer);



  /* 내 용 펼 치 기 이 벤 트 */
  const openContent = function(){
    if (!(discussionText.classList.contains('hide'))) {
      discussionText.classList.add('hide');
      answerContainer.classList.add('hide');
    }
    else {
      discussionText.classList.remove('hide');
      answerContainer.classList.remove('hide');
    }
  }
  li.addEventListener('click', openContent);

  /* return값을 가장 상위 요소로 변경했다 */
  return qnA;
};

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
