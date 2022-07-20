// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
//로컬스토리지
let data;
const dataFromLocalStorage = localStorage.getItem('agoraStatesDiscussions')
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage)
} else {
  data = agoraStatesDiscussions.slice()
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
/* 더미데이터에서 정보 로드 및 화면에 출력 */
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const localData = new Date(obj.createdAt).toLocaleString();

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img');
    avatarImg.className = "discussion__avatar--image";
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of' + obj.author;
    avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement('h2');
    discussionTitle.className = "discussion__title";
    const discussionAnchor = document.createElement('a');
      discussionAnchor.href = obj.url;
      discussionAnchor.textContent = obj.title;
      discussionTitle.append(discussionAnchor);
    discussionContent.append(discussionTitle);  
  const discussionInformation = document.createElement('div');
    discussionInformation.className = "discussion__information";
    discussionInformation.textContent = obj.author + ' / ' + localData;
    discussionContent.append(discussionInformation);

  const answer = document.createElement('p');
    if (obj.answer === null) {
      answer.textContent = '☒';
    } else {
    answer.textContent = '☑';
    }
    discussionAnswered.append(answer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, from, to) => {
  console.log(from, to)
  if (!from && !to) {
    from = 0; to = data.length - 1
  }
  // 다 지우고 배열에 있는 내용 다 보여주기
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = from; i < to; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

// 페이지네이션을 위한 변수
let limit = 10, page = 1

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 0, limit);

//로컬스토리지 데이터 배열의 몇번째 요소부터 몇번째 요소까지 출력할 것인지 정하기
const getPageStartEnd = (limit, page) => {
  const len = data.length - 1
  let pageStart = Number(page - 1) * Number(limit);
  let pageEnd = Number(pageStart) + Number(limit);
  if (page <= 0) {
    pageStart = 0;
  }
  if (pageEnd >= len) {
    // pageStart = Number(page - 2) * Number(limit)
    pageEnd = len
  }
  return { pageStart, pageEnd };
};

//버튼 구현
const buttons = document.querySelector('.buttons');
buttons.children[0].addEventListener('click', (event) => {
  if (page > 1) {
    page = page - 1;
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page)
  render(ul, pageStart, pageEnd);
})

buttons.children[1].addEventListener('click', () => {
  if ((limit * page) < data.length - 1) {
    page = page + 1;
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page)
  render(ul, pageStart, pageEnd);
})

buttons.children[2].addEventListener('click', () => {
  localStorage.removeItem('agoraStatesDiscussions');
  data = agoraStatesDiscussions.slice();
  limit = 10; page = 1;
  render(ul, 0, limit)
})

/* 새 디스커션 추가 */
const newDiscussion = document.querySelector("form");
const inputName = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputText = document.querySelector("#story");

newDiscussion.addEventListener('submit', (event) => {
  const obj = {
    id: 'unknown',
    createdAt: new Date().toISOString(),
    title: inputTitle.value,
    url: null,
    author: inputName.value,
    answer: null,
    bodyHTML: inputText.value,
    avatarUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  }
  data.unshift(obj);

  //로컬스토리지에 저장
  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(data))

  // 렌더링
  render(ul, 0, limit);
})

// const newRender = (element) => {
//   element.prepend(convertToDiscussion(data[0]))
//   return;
// }
/* const addDiscussion = (event) => {
  event.preventDefault();
  data.unshift({
    id: 'unknown',
    createdAt: new Date().toISOString(),
    title: inputTitle.value,
    url: null,
    author: inputName.value,
    answer: null,
    bodyHTML: inputText.value,
    avatarUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  })
  event.target.reset()

  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(data))
  
  newRender(ul);
}

newDiscussion = addEventListener('submit', addDiscussion); */

