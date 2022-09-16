// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// 랜덤 id 생성 함수
const generateRandomId = (num) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = '';
  for(let i = 0; i < num; i++) {
    result += characters[Math.floor(Math.random() * characters.length)]
  }
  return result;
}

// 이미지 주소 배열
const images = ['https://ifh.cc/g/KocFSw.png', 'https://ifh.cc/g/lcRaGb.png', 'https://ifh.cc/g/ORYV3A.png', 'https://ifh.cc/g/zb429Y.png', 'https://ifh.cc/g/FxNLX8.png', 'https://ifh.cc/g/fYgGLh.png', 'https://ifh.cc/g/ambxZ3.png']

// 랜덤 이미지 반환 함수
const generateRandomImg = () => {
  const randomImg = images[Math.floor((Math.random() * images.length))];
  return randomImg;
}

// form 섹션 DOM으로 바꾸기
// const printForm = () => {
// // 1. form 안에 formWrapper, formSubmit
// const form = document.querySelector('.form');

// const formWrapper = document.createElement('div');
// formWrapper.className = 'form__input--wrapper';

// const formSubmit = document.createElement('div');
// formSubmit.className = 'form__submit';

// // 2-1.formWrapper 안에 formName, formTitle, formTextbox
// const formName = document.createElement('div');
// formName.className = 'form__input--name'; 
//   // 3-1.formName 안에 namelabel, nameInput
//   const nameLabel = document.createElement('label');
//   nameLabel.for = 'name';
//   nameLabel.textContent = 'Enter your name: '

//   const nameInput = document.createElement('input');
//   nameInput.type = 'text';
//   nameInput.name = 'name';
//   nameInput.id = 'name';
//   nameInput.required = '';

// const formTitle = document.createElement('div');
// formTitle.className = 'form__input--title';
//   // 3-2. formTitle 안에 titlelabel, titleInput
//   const titleLabel = document.createElement('label');
//   titleLabel.for = 'title';
//   titleLabel.textContent = 'Enter your title: '

//   const titleInput = document.createElement('input');
//   titleInput.name = 'title';
//   titleInput.id = 'title';
//   titleInput.required = '';

// const formTextbox = document.createElement('div');
// formTextbox.class = 'form__textbox';
//   // 3-3. formTextbox 안에 textboxLabel, textboxTextarea
//   const textboxLabel = document.createElement('label');
//   textboxLabel.for = 'story';
//   textboxLabel.textContent = 'Your question: ';

//   const textboxTextarea = document.createElement('textarea');
//   textboxTextarea.id = 'story';
//   textboxTextarea.name = 'story';
//   textboxTextarea.placeholder = '질문을 작성하세요'
//   textboxTextarea.required = '';

// // 2-2. formSubmit 안에 submit
//   const submit = document.createElement('input');
//   submit.type = 'submit';
//   submit.value = 'submit';

// formName.append(nameLabel, nameInput);
// formTitle.append(titleLabel, titleInput);
// formTextbox.append(textboxLabel, textboxTextarea);
// //
// formWrapper.append(formName, formTitle, formTextbox);
// formSubmit.append(submit);
// //
// form.append(formWrapper, formSubmit);
// }

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => { // 여기서 매개변수 obj는 agoraStatesDiscussions[i] 이다.

  const li = document.createElement("li"); // li 요소 생성, 변수 li에 할당
  li.className = "discussion__container"; // li.discussion__container

  const avatarWrapper = document.createElement("div"); // div 요소 생성, 변수 avatarWrapper에 할당
  avatarWrapper.className = "discussion__avatar--wrapper"; // div.discussion__avatar--wrapper

  const discussionContent = document.createElement("div"); // div 요소 생성, 변수 discussionContent에 할당
  discussionContent.className = "discussion__content"; // div.discussion__content

  const discussionAnswered = document.createElement("div"); // div 요소 생성, 변수 discussionAnswered에 할당
  discussionAnswered.className = "discussion__answered"; // div.discussion__answered

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // avatarWrapper 안에 담긴 정보 : avatarImg
  const avatarImg = document.createElement('img');
  avatarImg.className = 'discussion__avatar--image';
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;

  // discussionContent 안에 담긴 정보 : title, info
  const title = document.createElement('h2');
  title.className = 'discussion__title';
      const titleLink = document.createElement('a');
      titleLink.href = obj.url;
      titleLink.textContent = obj.title;
  
  const info = document.createElement('div');
  info.className = 'discussion__information';
  info.textContent = obj.author + ' / ' + new Date(obj.createdAt).toLocaleString();

  // discussionAnswered 안에 담긴 정보 : check
  const check = document.createElement('p');
  if(obj.answer) {
    check.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  } else {
    check.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
  }

  title.append(titleLink);
  //
  avatarWrapper.append(avatarImg);
  discussionContent.append(title, info);
  discussionAnswered.append(check);
  //
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// form 안의 요소들 DOM 객체로 만들어주기
const form = document.querySelector('.form');
const nameInput = document.querySelector('#name');
const titleInput = document.querySelector('#title');
const storyInput = document.querySelector('#story');

// 이벤트 리스너 - form이 submit 될 때, form에 입력한 데이터를 agoraStatesDiscussions 배열에 push하기.
form.addEventListener('submit', function(event) {
  event.preventDefault(); // 폼이 자동 제출되는 것을 방지한다.
  // 객체를 하나 만든다.
  const newObj = {
    id: generateRandomId(18),
    createdAt: new Date(),
    title: titleInput.value,
    url: "#",
    author: nameInput.value,
    answer: null,
    bodyHTML: storyInput.value,
    avatarUrl: generateRandomImg(),
  }
  console.log(newObj);

  agoraStatesDiscussions.unshift(newObj); // 배열 agoraStatesDicussions에 newObj객체를 추가한다.

  // 그 객체는 convertToDiscussion에 넣어서 DOM으로 변환한다.
  // 그 객체를 ul의 맨 앞에 넣어준다.
  ul.prepend(convertToDiscussion(newObj)); // ul에 newObj를 컴포넌트를 추가한다.

  nameInput.value = '';
  titleInput.value = '';
  storyInput.value = '';
})

// 2. i = 10부터 19까지 (10개)...

// 3. i = 20부터 29까지
// 4. i = 30부터 39까지
// 5. i = 40부터 끝까지

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); // ul.append(convertToDiscussion(arr[i]));

