/**
 * TODO:
 * [v] list 불러오기
 * [v] discussion 배열을 이용하여 요소 화면에 렌더링하기
 *
 * discussion을 추가 기능
 * [v] section.form__container 요소에 새로운 질문을 추가할 수 있는 입력 폼을 만든다.
 * [v] 아이디, 본문을 입력하고 등록 버튼을 누르면 화면에 discussion이 추가되어야 한다.
 * [v] discussions 배열에 추가한 데이터가 실제로 쌓여야 한다.
 *
 * 현지 시간 적용
 * [v] 샘플 시간을 변형하여, 현지 시간에 맞게 표현 (ex. 오전 10:02:17)
 *
 * 페이지네이션 기능
 * [ ] 한 페이지에 10개씩 디스커션이 보여주기
 * [ ] 이전, 다음 페이지로 이동
 * [ ] 이전, 다음 페이지가 없는 경우 페이지를 유지하기
 *
 * LocalStorage
 * [ ] 새롭게 추가하는 Discussion이 페이지를 새로고침해도 유지되어야 함
 */

/** navigation */
const navWrapper = document.querySelector('.nav__wrapper');
const navContainer = document.querySelector('.nav_container');
const navLink = document.querySelectorAll('link');

/**
 * discussion 데이터를 DOM으로 생성하는 함수
 * */
const convertToDiscussion = (obj) => {
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
  discussionInformation.textContent = `${author} | ${convertToDate(createdAt)}`;
  discussionTitle.appendChild(discussionLink);
  discussionContent.appendChild(discussionTitle);
  discussionContent.appendChild(discussionInformation);

  /** discussion answer */
  const discussionAnswered = document.createElement('div');
  discussionAnswered.className = 'discussion__answered';
  const answered = document.createElement('p');

  if (answer) {
    answered.textContent = '답변 완료';
    answered.classList.add('answered');
  } else {
    answered.textContent = '대기중';
    answered.classList.add('hold-on');
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
 * */
const ul = document.querySelector('ul.discussions__container');
render(ul);

/**
 * [질문하기] 버튼 클릭시 form 모달로 보여주기
 * [v] 질문하기 버튼을 querySelectorAll('')로 가져오기
 * [v] 질문하기 버튼의 클릭 여부를 담을 상태값 필요 (모달창 open/close 여부로 판별하면 됨)
 * [v] 질문하기 버튼을 클릭하면 상태값을 반대로 뒤집어주는 함수 필요
 * [v] 질문하기 버튼 상태값이 true일 때 모달창으로 보여주기(모달창 open)
 * [v] x버튼 클릭시 모달창 닫기
 * [v] 모달창 닫힐 때 질문하기 버튼의 상태값 바꿔주기
 *
 * 모달창에서 보여야 할 것
 * [v] h1: '질문을 작성해주세요.'
 * [v] input: name
 * [v] input: title
 * [v] textarea: question content
 * [v] button: submit button
 *  */
/** add discussion 관련 태그 요소들, modal 관련 태그 요소들 */
const askQuestionBtn = document.querySelectorAll('.ask_question');
const formContainer = document.querySelector('.form__container');
const form = document.querySelector('.form');
const inputs = document.querySelectorAll('.modal_input');
const username = document.querySelector('#name');
const title = document.querySelector('#title');
const content = document.querySelector('#story');
const submitBtn = document.querySelector('.submit-btn');
const closeBtn = document.querySelector('.close');
const arrowUpBtn = document.querySelector('.arrow_up_btn');

// form안에 input value 유효성 통과 값
let validUsername = false;
let validTitle = false;
let validContent = false;

// 모달 open 여부 값
let isModalOpen = false;

const formInitialize = () => {
  username.value = '';
  title.value = '';
  content.value = '';
};

const inputValidInitialize = () => {
  validUsername = false;
  validTitle = false;
  validContent = false;
};

const handleChangeModalState = () => {
  formInitialize();
  inputValidInitialize();

  isModalOpen = !isModalOpen;

  if (isModalOpen) {
    formContainer.classList.remove('hide');
  } else {
    formContainer.classList.add('hide');
  }
  submitBtn.classList.remove('form-valid');
};

askQuestionBtn.forEach((button) =>
  button.addEventListener('click', () => {
    handleChangeModalState();
  })
);

closeBtn.addEventListener('click', () => {
  handleChangeModalState();
});

inputs.forEach((input) =>
  input.addEventListener('keyup', (e) => {
    let target = e.target['id'];

    if (target === 'name') {
      validUsername = validation(username.value);
    } else if (target === 'title') {
      validTitle = validation(title.value);
    } else if (target === 'story') {
      validContent = validation(content.value);
    }

    if (validUsername && validTitle && validContent) {
      submitBtn.classList.add('form-valid');
    } else {
      submitBtn.classList.remove('form-valid');
    }
  })
);

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (validUsername && validTitle && validContent) {
    const questionObj = {
      author: username.value,
      title: title.value,
      content: content.value,
      avatarUrl: '../images/donut.png',
      createdAt: new Date().toISOString().split('.')[0],
    };
    ul.prepend(convertToDiscussion(questionObj));
    handleChangeModalState();
  }
});

/**
 * scroll 발생 시 화면 최상단으로 올라갈 수 있도록 하는 함수
 * */
window.addEventListener('scroll', () => {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    arrowUpBtn.classList.remove('hide');
    navWrapper.classList.add('bg-change');
    askQuestionBtn[0].classList.add('bg-change');
  } else {
    arrowUpBtn.classList.add('hide');
    navWrapper.classList.remove('bg-change');
    askQuestionBtn[0].classList.remove('bg-change');
  }
});

arrowUpBtn.addEventListener('click', () => {
  scrollTo({ top: 0, left: 0, behavior: 'smooth' });
});
