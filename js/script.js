const submitForm = document.querySelector('.form');
const pageButtonContainer = document.querySelector('.pageContainer');
const ul = document.querySelector('.discussContainer');

const bottomSize = 5; // 버튼을 한번에 최대 몇개 보여줄거냐
const listSize = 10; // 한번에 보여줄 리스트 개수
let total = agoraStatesDiscussions.length;
let activePage = 1; // 현재 페이지 -> 리스트를 렌더링 너무많은데이터가있으면 그걸 다 렌더링하면 시간이 너무 오래걸림
let totalPageSize = Math.ceil(total / listSize);
let firstNum = activePage - (activePage % bottomSize) + 1; // 현재페이지 - (현재페이지 % 버튼갯수) + 1
let lastNum = activePage - (activePage % bottomSize) + bottomSize;

const saveStorage = () => {
  localStorage.setItem('discuss', JSON.stringify(agoraStatesDiscussions));
};

const getStorage = () => {
  let saveDiscuss = localStorage.getItem('discuss');
  if (saveDiscuss !== null) {
    agoraStatesDiscussions = JSON.parse(saveDiscuss);
  }
  return;
};

getStorage();

const jumpButtonMaker = () => {
  let nextButton = createElementWithClass('button', 'nextButton');
  let prevButton = createElementWithClass('button', 'prevButton');
  nextButton = propertyMaker(nextButton, 'textContent', '>');
  prevButton = propertyMaker(nextButton, 'textContent', '<');
  if (totalPageSize > lastNum) pageButtonContainer.append(nextButton);
  if (firstNum > 5) pageButtonContainer.prepend(prevButton);
  return;
};

const nextButtonOnClick = () => {
  if (totalPageSize > lastNum) {
    activePage = activePage + 5;
    document.querySelector(`#page_${activePage}`).click();
  }
};

const prevPageOnClick = () => {
  if (firstNum > 5) {
    document.querySelector(`#page_${activePage}`).click();
    activePage = activePage - 5;
  }
};

const render = (element, min, max) => {
  for (let i = min; i < max; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const removeChild = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const createElementWithClass = (tagname, classname) => {
  const result = document.createElement(tagname);
  if (classname) result.className = classname;
  return result;
};

const propertyMaker = (element, property, content) => {
  element[property] = content;
  return element;
};

const dateMaker = () => {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};

const avatarMaker = (obj) => {
  let avatarIcon = createElementWithClass('div', 'avatarIcon');
  let avatarImg = createElementWithClass('img', 'avatarImage');

  obj?.avatarUrl !== undefined
    ? (avatarImg = propertyMaker(avatarImg, 'src', obj.avatarUrl))
    : (avatarImg = propertyMaker(avatarImg, 'src', './asset/icon/icon1.jpg'));

  avatarIcon.append(avatarImg);
  return avatarIcon;
};
//createdAt: '2022-04-28T07:00:41Z',

const parserMaker = (obj) => {
  const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
  const [year, month, day, dummy, hours, minutes, seconds] = obj.match(regex);
  if (hours < 12) return `오전 ${hours}:${minutes}:${seconds}`;
  if (hours < 22) return `오후 0${hours - 12}:${minutes}:${seconds}`;
  return `오후 ${hours - 12}:${minutes}:${seconds}`;
};

const discussInfoMaker = (obj) => {
  let discussInfo = createElementWithClass('div', 'discussInfo');
  if (obj.createdAt !== undefined) {
    discussInfo = propertyMaker(discussInfo, 'textContent', obj.author);
    discussInfo.textContent += ' / ';
    discussInfo.textContent += parserMaker(obj.createdAt);
  } else {
    discussInfo = propertyMaker(discussInfo, 'textContent', obj.author);
    discussInfo.textContent += ' / ';
    discussInfo.textContent += dateMaker();
  }
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
    createdAt: dateMaker(),
  };
  let newDiscuss = convertToDiscussion(obj);
  agoraStatesDiscussions.unshift(obj);
  saveStorage();
  console.log(agoraStatesDiscussions);
  document.querySelector(`#page_${activePage}`).click();
  return;
};

//페이지네이션 파트 class = "animate__backOutDown"

const buttonMaker = (i) => {
  let btn = createElementWithClass('button', 'pageNumber');
  btn = propertyMaker(btn, 'id', `page_${i}`);
  btn = propertyMaker(btn, 'textContent', i);
  return btn;
};

const paintButton = () => {
  for (let i = firstNum; i <= lastNum; i++) {
    let btn = buttonMaker(i);
    pageButtonContainer.append(btn);
  }
};

const pageButtonNumber = () => {
  total = agoraStatesDiscussions.length;
  totalPageSize = Math.ceil(total / listSize);
  firstNum = activePage - (activePage % bottomSize) + 1; // 현재페이지 - (현재페이지 % 버튼갯수) + 1
  lastNum = activePage - (activePage % bottomSize) + bottomSize;
  if (lastNum > totalPageSize) lastNum = totalPageSize;
  paintButton();
};

const pageButtonOnclick = (event) => {
  if (event.target.classList[0] !== 'pageNumber') return;
  const nowPage = Number(event.target.textContent); // 눌린 페이지수를 기억한다
  activePage = nowPage; // 현재페이지를 계속 버튼 눌릴때마다 바꿔줘야한다했으니까
  removeChild(ul); // 현재 렌더링된 리스트를 지워준다
  render(ul, nowPage * 10 - 10, nowPage * 10); // 그리고 다시 리스트를 칠한다
  removeChild(pageButtonContainer); // 버튼도 새로 만들어줄거니까 지워준다
  pageButtonNumber(); // 버튼 새로 만든다
};

submitForm.addEventListener('submit', submitPusher);
pageButtonContainer.addEventListener('click', pageButtonOnclick);
render(ul, 0, 10);
pageButtonNumber(1, agoraStatesDiscussions.length);

nextButton.addEventListener('click', nextButtonOnClick);
prevButton.addEventListener('click', prevPageOnClick);
