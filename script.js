const ul = document.querySelector("ul.discussions__container");
const form = document.querySelector('form.form');
let localData = JSON.parse(localStorage.getItem("myAgora")) 
|| localStorage.setItem('myAgora', JSON.stringify([]));

const resetForm = () => {
  document.querySelector('.form__input--title #title').value = '';
  document.querySelector('.form__input--name #name').value = '';
  document.querySelector('.form__textbox #story').value = '';
};
const addLocal = () => {
  const id = "id 불명";
  const createdAt = new Date();
  const title = document.querySelector('.form__input--title #title').value;
  const url = "";
  const author = document.querySelector('.form__input--name #name').value;
  const answer = null;
  const bodyHTML = document.querySelector('.form__textbox #story').value;
  const avatarUrl = `https://avatars.githubusercontent.com/u/${parseInt(Math.random() * 100)}`;
  
  const addContent = {
      id,
      createdAt,
      title,
      url,
      author,
      answer,
      bodyHTML,
      avatarUrl
  }

  localData.push(addContent);
  localStorage.setItem("myAgora", JSON.stringify(localData));
};

form.addEventListener('submit', (event) => {
  event.preventDefault(); // 기본동작 정지
  addLocal();
  resetForm();
  localRender();
});

const createLi = () => {
  const li = document.createElement("li");
  li.classList.add("discussion__container");
  return li;
};

const createDiscussionContent = () => {
  const discussionContent = document.createElement("div");
  discussionContent.classList.add("discussion__content");
  return discussionContent;
};

const createAvatarWrapper = () => {
  const avatarWrapper = document.createElement("div");
  avatarWrapper.classList.add("discussion__avatar--wrapper");
  return avatarWrapper;
};

const createAvatarImg = (obj) => {
  const avatarImg = document.createElement('img');
  avatarImg.classList.add("discussion__avatar--image");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  return avatarImg;
};

const createAvatarTitle = (obj) => {
  const avatarTitle = document.createElement('h2');
  avatarTitle.classList.add("discussion__title");

  const titleHref = document.createElement('a');
  titleHref.textContent = obj.title;
  titleHref.href = obj.url;
  avatarTitle.append(titleHref);

  return avatarTitle;
};

const createInfo = (obj) => {
  const info = document.createElement('div');
  info.classList.add("discussion__information");
  info.innerHTML = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;
  return info;
};

const createDiscussionAnswered = (obj) => {
  const discussionAnswered = document.createElement("div");
  discussionAnswered.classList.add("discussion__answered");

  const checkPtag = document.createElement('p');
  checkPtag.textContent = obj.answer === null ? '☒' : '☑︎';
  discussionAnswered.append(checkPtag);

  return discussionAnswered;
};

const convertToDiscussion = (obj) => {
  const li = createLi();
  const discussionContent = createDiscussionContent();
  const avatarWrapper = createAvatarWrapper();
  const avatarImg = createAvatarImg(obj);
  const avatarTitle = createAvatarTitle(obj);
  const info = createInfo(obj);
  const discussionAnswered = createDiscussionAnswered(obj);

  avatarWrapper.append(avatarImg);
  discussionContent.append(avatarTitle);
  discussionContent.append(info);

  li.append(avatarWrapper);
  li.append(discussionContent);
  li.append(discussionAnswered);

  return li;
};



// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => { // ul > 더미배열 [i]값 반환
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i], )); // 더미[i]를 인자로 사용
//   }
//   return;
// };
const render = (element, data) => {
  for (const discussion of data) {
  element.append(convertToDiscussion(discussion));
  }
};

// const localRender = () => {
//   for (let i = 0; i < localData.length; i += 1) {
//     ul.prepend(convertToDiscussion(localData[i])); // 추가 -> 렌더링 그대로 전달 // 더미[i]를 인자로 사용
//   }
//   return;
// }
const reverse = [...localData].reverse(); // 원본 유지 역순.
const localRender = () => render(ul, reverse);
localRender();

async function fetchData() {
  try {
    const response = await fetch('http://localhost:4000/discussions');
    const json = await response.json();
    const agoraStatesDiscussions = json;
    render(ul, agoraStatesDiscussions);
  } catch (err) {
    console.error(err);
    }
  }
  fetchData();