// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

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
  const timeInKR = new Date(obj.createdAt).toLocaleTimeString();

  /* 사 용 자 ID, 이 름, 시 간*/
  const userId = document.createElement('div');
  userId.className = 'user_id';
  const usernameAndTime = document.createElement('div');
  usernameAndTime.className = 'user_name_time';
  userId.textContent = 'ID: ' + obj.id;
  usernameAndTime.textContent = `${obj.author} / ${timeInKR}`;
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
    const answerTimeInKR = new Date(obj.answer.createdAt).toLocaleTimeString();
    answererId.textContent = 'ID: ' + obj.id
    answererNameAndTime.textContent = `${obj.answer.author} / ${answerTimeInKR}`;
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
// element요소를 전체 비우는 조건으로 render하면 html내 적혀있던 li요소들이 보이지 않기 때문에
// element.append(li)를 해주어야 한다.
const li = document.querySelector('li.discussion__container');
const render = (element) => {
  element.innerHTML=''
  element.append(li)
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container"); 
render(ul);

/* submit */
// 변수선언 쿼리셀렉터로 가져와서, 함수밖에, form태그를 가져온다
const newContent = document.querySelector('.form__container form');
const newName = document.querySelector('div.form__input--name input');
const newTitle = document.querySelector('div.form__input--title input');
const newText = document.querySelector('div.form__textbox textarea');

const addPost = function(event){
  event.preventDefault();
  agoraStatesDiscussions.unshift({
    id: '비공개',
    createdAt: new Date(),
    title: newTitle.value,
    url: null,
    author: newName.value,
    answer: null,
    bodyHTML: newText.value,
    avatarUrl: "https://img.icons8.com/dusk/64/000000/new.png",
  });
  render(ul);
};

newContent.addEventListener('submit', addPost);