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

// 페이지네이션
// 1, 2, 3, 4, 5 를 DOM을 이용해 만든다.
const nav = document.querySelector('.pagenation__container')
const one = document.createElement('button');
  one.innerHTML = '<i class="fa-solid fa-1"></i>';
const two = document.createElement('button');
  two.innerHTML = '<i class="fa-solid fa-2"></i>';
const three = document.createElement('button');
  three.innerHTML = '<i class="fa-solid fa-3"></i>';
const four = document.createElement('button');
  four.innerHTML = '<i class="fa-solid fa-4"></i>';
const five = document.createElement('button');
  five.innerHTML = '<i class="fa-solid fa-5"></i>';

// nav 요소에 1, 2, 3, 4, 5를 넣어준다.
nav.append(one, two, three, four, five);

// page라는 변수를 선언하고, 기본값으로 0을 할당해준다.
let page = 0; 

const appendToUl = () => {
  // ul을 빈 값으로 초기화시켜준 후,
  ul.innerHTML = ''; 
  // i는 page부터 page + 10까지, ul에 총 10개의 요소를 추가한다.
  for(let i = page; i < page + 10; i++) {
    // 만약, 불러오는 값이 undefined라면, 반복문을 종료한다.
    if(agoraStatesDiscussions[i] === undefined) {
      break;
    }
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
}

// 페이지 맨 앞으로 이동하는 함수
function moveToFirst() {
  page = 0;
  ul.innerHTML = '';
  for(let i = page; i < page + 10; i++) {
  appendToUl();
}}

// 숫자 1을 클릭하면, 배열의 0 ~ 9번째 요소만 보여준다. (10개)
one.addEventListener('click', () => {
  moveToFirst();

  allToBlack(); // 모든 숫자 검은색으로 초기화
  one.style.color = 'rgb(17, 107, 255)'; // 클릭한 숫자는 파란색으로 표시
})

// 숫자 2을 클릭하면, 배열의 10 ~ 19번째 요소만 보여준다. (10개)
two.addEventListener('click', () => {
  page = 10;
  appendToUl();

  allToBlack();
  two.style.color = 'rgb(17, 107, 255)';
})

// 숫자 3을 클릭하면, 배열의 20 ~ 29번째 요소만 보여준다. (10개)
three.addEventListener('click', () => {
  page = 20; 
  appendToUl();

  allToBlack();
  three.style.color = 'rgb(17, 107, 255)';
});

// 숫자 4을 클릭하면, 배열의 30 ~ 39번째 요소만 보여준다. (10개)
four.addEventListener('click', () => {
  page = 30; 
  appendToUl();

  allToBlack();
  four.style.color = 'rgb(17, 107, 255)';
});

// 숫자 5을 클릭하면, 배열의 40 ~ 49번째 요소만 보여준다. (10개)
five.addEventListener('click', () => {
  page = 40; 
  appendToUl();

  allToBlack();
  five.style.color = 'rgb(17, 107, 255)';
});

// 페이지네이션 숫자 색을 검은색으로 초기화시켜주는 함수
const allToBlack = () => {
  one.style.color = 'black';
  two.style.color = 'black';
  three.style.color = 'black';
  four.style.color = 'black';
  five.style.color = 'black';
};

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

  // 첫 페이지로 이동 시킨다.
    moveToFirst();

  // input창에 입력된 값을 초기화시켜준다.
  nameInput.value = '';
  titleInput.value = '';
  storyInput.value = '';
})

// 초기화면은 agoraStatesDiscussions 배열의 0 ~ 9 번째 데이터만 화면에 렌더링한다.
const render = (element) => {
  for (let i = 0; i < 10; i++) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul); // ul.append(convertToDiscussion(arr[i]));