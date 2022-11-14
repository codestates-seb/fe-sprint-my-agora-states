// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);


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
  const avatarImage = document.createElement('img');
  avatarImage.className = 'discussion__avatar--image'
  const title = document.createElement('h2');
  title.className = 'discussion__title'
  const information = document.createElement('div');
  information.className = 'discussion__information'
  const url = document.createElement('a');
 

  const checkbox = document.createElement('p');

  avatarImage.setAttribute('src', obj.avatarUrl);
  url.textContent = obj.title;
  information.textContent = `${obj.author} / ${obj.createdAt}`;
  url.setAttribute('href', obj.url);




  li.append(avatarWrapper, discussionContent, discussionAnswered);
  avatarWrapper.append(avatarImage);
  discussionContent.append(title, information);
  discussionAnswered.append(checkbox);
  title.append(url);

  return li;

  
  
};localStorage

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul);

const submit = document.querySelector('.form__submit');
const elTitle = document.querySelector('#title');
const elName = document.querySelector('#name');
const elStory = document.querySelector('#story');

let 

const getInformations = function() {
  localStorage.setItem('elTitle', elTitle.value);
  localStorage.setItem('elName', elName.value);
  localStorage.setItem('elStory', elStory.value);
}

submit.addEventListener('click', getInformations());
