// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  
  // 1. 아바타 요소 discussion__avatar--wrapper에 들어가는 요소
  // 2. img 요소 discussion__avatar--image
  
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  
  const avatarImg = document.createElement('img');
  avatarImg.classList = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  
  // 노드에 맞게 append
  avatarWrapper.append(avatarImg);
  
  // 1. 콘텐츠 요소 discussion__content에 들어가는 요소
  // 2. h2 요소 discussion__title와 자식 a 요소
  // 3. a 요소는 객체의 url을 하이퍼링크와 더불어 텍스트로 title을 담음
  // 4. div 요소 discussion__information에는 작성자와 작성 시간이 들어감
  
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // discussion__title와 자식 a 요소 생성 및 데이터 할당
  const contentTitle = document.createElement("h2");
  const contentTitleText = document.createElement("a");
  contentTitle.classList = "discussion__title";
  contentTitleText.href = obj.url;
  contentTitleText.textContent = obj.title;
  
  let chagedCreateAt = dateFormatChange(obj.createdAt);
  
  // discussion__information의 작성자 및 작성 날짜 데이터 할당
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${chagedCreateAt}`;
  
  // 노드에 맞게 append
  contentTitle.append(contentTitleText);
  discussionContent.append(contentTitle);
  discussionContent.append(discussionInformation);
  
  // 1. Answered 요소는 체크박스 하나만 들어감
  // 2. 체크박스는 체크가 되어야 하는데 스트링으로 넣으면 어떻게 처리?
  // 인덱스 활용
  
  const discussionAnswered = document.createElement("div");
  const discussionCheckbox = document.createElement("p");
  
  // Advanced Challenge
  // 답변 여부 렌더링
  if(obj.answer === null) {
    discussionCheckbox.textContent = '☒';
    discussionCheckbox.style.color = 'red'
  } 
  else {
    discussionCheckbox.textContent = '☑';
    discussionCheckbox.style.color = 'green'
  }
  discussionAnswered.className = "discussion__answered";
  
  // 노드에 맞게 append
  discussionAnswered.append(discussionCheckbox);
  discussionContent.append(discussionAnswered);
  
  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// Advanced Challenge
// createdAt을 변형하여 예와 같이 렌더링(ex. 오전 10:02:17)
// 원 상태 createdAt: "2022-05-16T02:47:27Z" slice() 사용
// form에서 할당한 const formCreatAt = new Date()은 object 타입
// toLocaleString()을 사용하여 재할당해준다.
const dateFormatChange = (arg) => {
  let setFormat = '';

  if(typeof arg === 'string') {
    setFormat = arg.slice(11, 19);
    if (setFormat[0] > 0 && setFormat[1] > 1) {
      setFormat  = '오후 ' + setFormat;
    } 
    else {
      setFormat  = '오전 ' + setFormat;
    }
    return setFormat;
  }  
  else {
    setFormat = arg.toLocaleString().slice(13,24);
    return setFormat;
  }
}

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

// 디스커션 추가 함수
// form에 onsubmit 이벤트 할당, 이벤트 발생시
// 폼의 내용이 객체에 담겨서 DOM으로 바꿔 렌더링
document.querySelector(".form").onsubmit = (event) => {
  const formName = document.querySelector("#name");
  const formTitle = document.querySelector("#title");
  const formText = document.querySelector("#story");
  event.preventDefault()

  const obj = {
    id: "unique number",
    createdAt: new Date(),
    title: formTitle.value,
    author: formName.value,
    answer: null,
    bodyHTML: null,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  agoraStatesDiscussions.unshift(obj)
  ul.prepend(convertToDiscussion(obj))
  // displayRows(0);
  // console.log(agoraStatesDiscussions);
}

// Advanced Challenge 페이지네이션
const rowsperPage = 10;
const rows = agoraStatesDiscussions;
const rowsCounts = agoraStatesDiscussions.length;
const pageCounts = Math.ceil(rowsCounts/rowsperPage);
const pageWrapper = document.querySelector(".page__wrapper");

// 페이지네이션
for(let i = 1; i <= pageCounts; i++) {
  pageWrapper.innerHTML += `<li><a href="">${i}</a></li>`;
}

const btnPage = pageWrapper.querySelectorAll("a")
// 페이지 버튼에 이벤트리스너 
btnPage.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    e.preventDefault(); 
    displayRows(index);
  })
})

const displayRows = (index) => {
  let rowsRest = document.querySelectorAll("li.discussion__container");
  let rowsArr = [...rowsRest];
  let start = index * rowsperPage;
  let end = start + rowsperPage;
  console.log(rowsArr);

  for(let rowA of rowsArr) {
    rowA.style.display = 'none';
  }

  let displayRow = rowsArr.slice(start, end);

  for(let displayR of displayRow) {
    displayR.style.display = '';
  }
  for(let css of btnPage) {
    css.classList.remove('active');
  }
  btnPage[index].classList.add('active');
}