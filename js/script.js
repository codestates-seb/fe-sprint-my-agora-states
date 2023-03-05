const submitForm = document.querySelector('.form');

const createElementWithClass = (tagname, classname) => {
  const result = document.createElement(tagname);
  if (classname) result.className = classname;
  return result;
};

const propertyMaker = (element, property, content) => {
  element[property] = content;
  return element;
};

const dateMaker = (element) => {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  element.textContent += `${year}-${month}-${day} TIME ${hours}:${minutes}:${seconds}`;
  return element;
};

const avatarMaker = (obj) => {
  let avatarIcon = createElementWithClass('div', 'avatarIcon');
  let avatarImg = createElementWithClass('img', 'avatarImage');

  obj.avatarUrl !== undefined
    ? (avatarImg = propertyMaker(avatarImg, 'src', obj.avatarUrl))
    : (avatarImg = propertyMaker(avatarImg, 'src', './asset/icon/icon1.jpg'));

  avatarIcon.append(avatarImg);
  return avatarIcon;
};

const discussInfoMaker = (obj) => {
  let discussInfo = createElementWithClass('div', 'discussInfo');
  discussInfo = propertyMaker(discussInfo, 'textContent', obj.author);
  discussInfo.textContent += ' / ';
  discussInfo = dateMaker(discussInfo);
  return discussInfo;
};

const discussTitleMaker = (obj) => {
  let discussTitle = createElementWithClass('h2', 'discussTitle');
  let anker = createElementWithClass('a', null);
  anker = propertyMaker(anker, 'href', obj.url);
  discussTitle = propertyMaker(discussTitle, 'textContent', obj.title);
  anker.append(discussTitle);
  return anker;
};

const contentMaker = (obj) => {
  let discussContent = createElementWithClass('div', 'discussContent');
  let discussTitle = discussTitleMaker(obj);
  let discussInfo = discussInfoMaker(obj);
  discussContent.append(discussTitle, discussInfo);
  return discussContent;
};

const answerMaker = () => {
  let discussAnswer = createElementWithClass('div', 'discussAnswer');
  let checkBox = createElementWithClass('input', 'checkBox');
  checkBox = propertyMaker(checkBox, 'type', 'checkbox');
  discussAnswer.append(checkBox);
  return discussAnswer;
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = createElementWithClass('li', 'discussList');
  let avatar = avatarMaker(obj);
  let content = contentMaker(obj);
  let answer = answerMaker(obj);

  li.append(avatar, content, answer);
  return li;
};

/*
submit 이벤트 처리
*/

const submitPusher = (event) => {
  event.preventDefault();
  const nameInput = document.querySelector('#name'); // name 입력 필드 선택
  const titleInput = document.querySelector('#title'); // title 입력 필드 선택
  const storyInput = document.querySelector('#story'); // story 입력 필드 선택
  const obj = {
    url: '#',
    avatarUrl: './asset/icon/icon1.jpg',
    title: titleInput.value,
    content: storyInput.value,
    author: nameInput.value,
  };
  let newDiscuss = convertToDiscussion(obj);
  console.log(newDiscuss);
  agoraStatesDiscussions.unshift(newDiscuss);
  ul.prepend(newDiscuss);
  return;
};

submitForm.addEventListener('submit', submitPusher);

//페이지네이션 파트

const pageNation = (id) => {
  let numOfContent = agoraStatesDiscussions.length;
  let showContent = 10;
  let showButton = 5;
  let maxPage = Math.ceil(numOfContent / showContent);
  let page = 1;

  let button = createElementWithClass('button', 'pageNation');
  button = propertyMaker(button, 'textContent', id);
  button.dataset.num = id;
  button.addEventListener('click');
};

const onClickPageButton = (event) => {
  for (let page of event) {
  }
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('.discussContainer');
render(ul);
