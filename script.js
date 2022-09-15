// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정 (디스커션 콘테이너)

  const avatarWrapper = document.createElement("div"); // div 요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper"; // 클래스 이름 지정 (아바타 래퍼)
  const discussionContent = document.createElement("div"); // div 요소 생성
  discussionContent.className = "discussion__content"; // 클래스 이름 지정 (콘텐츠)
  const discussionAnswered = document.createElement("div"); // div 요소 생성
  discussionAnswered.className = "discussion__answered"; // 클래스 이름 지정 (답변)

  // 아바타 이미지 및 정보 추가
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  // discussion 제목 추가
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = "discussion__title";
  const title = document.createElement('a');
  title.href = obj.url;
  title.textContent = obj.title;
  discussionTitle.append(title);
  discussionContent.append(discussionTitle);

  // 작성자와 작성일 추가
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionInformation);

  // 답변 확인 추가
  let answer = document.createElement('i');
  answer.className = 'fa-solid fa-circle-check';
  // 답변이 없다면
  if (obj.answer == null) {
    // 체크표시 숨긴다
    answer.classList.add('hide');
  }
  discussionAnswered.append(answer);

  // li의 자식요소로 div를 추가
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

/////////////////////////////////////////페이지네이션/////////////////////////////////////////////

let currentPage = '1';

// 한 화면에 나타나는 데이터 10개
const dataPerPage = 10;
// 화면하단에 나타날 페이지의 개수
const pageCount = 5;

// 총 페이지 수
// (전체 데이터를 10으로 나눈 후 올림)
// (현재 41 / 10 = 총 5페이지)
const totalPage = Math.ceil(agoraStatesDiscussions.length / dataPerPage);
// 페이지 그룹
// (현재 페이지를 5로 나눈 후 올림)
const pageGroup = Math.ceil(currentPage / pageCount);

// 화면에 보여질 마지막 페이지 (맨 오른쪽)
let last = pageGroup * pageCount;
// 화면에 보여질 첫번째 페이지 (맨 왼쪽)
let first = last - (pageCount - 1);

// 다음 버튼
const next = last + 1;
// 이전 버튼
const prev = first - 1;

// 마지막 페이지가 전체 페이지보다 크지 않게 한다
if (last > totalPage) {
  last = totalPage;
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수
const renderFirst = (element) => {
  for (let i = 0; i <= 9; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i])); // element의 자식 요소로 li의 모든 요소를 넣기
  }

  // 페이지 구하는 공식 사용
  // for문 사용해서 첫페이지~ 마지막 페이지 숫자를 순회하며 태그 넣기
  for (let i = first; i <= last; i++) { // 총 5번 1~5

    if (i == currentPage) {
      document.querySelector('.pagination__wrapper').innerHTML += `<button class = "current">${i}</button>`;
    } else {
      document.querySelector('.pagination__wrapper').innerHTML += `<button>${i}</button>`;
    }
  
  }

  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링
const ul = document.querySelector("ul.discussions__container"); 
renderFirst(ul);


// 새로운 질문 더미 데이터에 추가하기
const addContent = function () {

  let newContent = {
    id: "unique id",
    createdAt: "2022-05-16T01:02:17Z",
    title: "koans 과제 진행 중 npm install 오류로 인해 정상 작동 되지 않습니다",
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: "dubipy",
    answer: null,
    bodyHTML:
      '<p dir="auto">--------------- 여기서부터 복사하세요 ---------------</p>\n<p dir="auto">운영 체제: 예) macOS</p>\n<p dir="auto">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?<br>\nPair 과제 / JavaScript Koans</p>\n<p dir="auto">npm install 명령어 입력 시 env: node: No such file or directory 라고 뜹니다</p>\n<p dir="auto">에러 발생하여 아래 명령어 실행 했는데도 불구하고 똑같은 에러가 발생했습니다<br>\nnpm cache clean --force</p>\n<p dir="auto">rm package-lock.json</p>\n<p dir="auto">rm -rf ./node_modules/</p>\n<p dir="auto">npm --verbose install</p>\n<p dir="auto">폴더 자체가 문제가 있다고 생각하여 github에서 다시 fork 후 진행했는데도 같은 에러가 발생했습니다<br>\n리눅스 기초 챕터 때 npm 설치해서 마지막 submit까지는 잘 됐는데 현재 짝수 생성기 폴더도 똑같이 npm install 시 no such file or directory가 발생합니다</p>\n<p dir="auto">에러가 출력된 곳에서, 이유라고 생각하는 부분을 열 줄 이내로 붙여넣기 해 주세요. (잘 모르겠으면 에러라고 생각하는 곳을 넣어주세요)</p>\n<div class="highlight highlight-source-js position-relative overflow-auto" data-snippet-clipboard-copy-content="minjun@dubi fe-sprint-javascript-koans-main % pwd \n/Users/minjun/Documents/fe_frontand_39/fe-sprint-javascript-koans-main\nminjun@dubi fe-sprint-javascript-koans-main % npm install \nenv: node: No such file or directory"><pre><span class="pl-s1">minjun</span>@<span class="pl-s1">dubi</span> <span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span> <span class="pl-c1">%</span> <span class="pl-s1">pwd</span> \n<span class="pl-c1">/</span><span class="pl-v">Users</span><span class="pl-c1">/</span><span class="pl-s1">minjun</span><span class="pl-c1">/</span><span class="pl-v">Documents</span><span class="pl-c1">/</span><span class="pl-s1">fe_frontand_39</span><span class="pl-c1">/</span><span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span>\n<span class="pl-s1">minjun</span><span class="pl-kos"></span>@<span class="pl-s1">dubi</span> <span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span> <span class="pl-c1">%</span> <span class="pl-s1">npm</span> <span class="pl-s1">install</span> \nenv: node: <span class="pl-v">No</span> <span class="pl-s1">such</span> <span class="pl-s1">file</span> <span class="pl-s1">or</span> <span class="pl-s1">directory</span></pre></div>\n<p dir="auto">검색했던 링크가 있다면 첨부해 주세요.<br>\n<a href="https://mia-dahae.tistory.com/89" rel="nofollow">https://mia-dahae.tistory.com/89</a></p>\n<p dir="auto"><a href="https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory" rel="nofollow">https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory</a></p>\n<p dir="auto"><a href="https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0" rel="nofollow">https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0</a></p>\n<p dir="auto"><a href="https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346" rel="nofollow">https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346</a></p>\n<p dir="auto"><a href="https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80" rel="nofollow">https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80</a></p>\n<p dir="auto"><a href="https://hellowworlds.tistory.com/57" rel="nofollow">https://hellowworlds.tistory.com/57</a></p>',
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  let newAuthor = document.querySelector('.form__input--name #name').value;
  let newTitle = document.querySelector('.form__input--title #name').value;
  newContent.author = newAuthor;
  newContent.title = newTitle;
  newContent.createdAt = new Date();

  newContent.avatarUrl = 'https://avatars.githubusercontent.com/u/87750478?s=64&v=4';
  newContent.url = undefined; 

  // 새로운 객체를 원래 데이터 더미 배열에 추가
  agoraStatesDiscussions.unshift(newContent);
  console.log(agoraStatesDiscussions);
  // 새로 업데이트 된 배열을 로컬 스토레이지에 저장
  localStorage.setItem('AGORASTATES', JSON.stringify(agoraStatesDiscussions));
  return;
}

// 업데이트 된 배열을 출력
const render = (element) => {
  // 공지만 남겨두고 li 요소를 삭제한다
  while(ul.children.length > 1) {
    ul.removeChild(ul.lastChild);
  }
  // 공지 이후로 업데이트된 배열을 출력한다
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // 업데이트되어 저장된 배열을 변수에 저장한다
    const agoraObject = JSON.parse(localStorage.getItem('AGORASTATES'));
    // 배열의 값을 순회하면서 html의 ul 자식 요소에 추가한다
    element.append(convertToDiscussion(agoraObject[i])); 
  }
  return;
};

// 폼 태그를 변수에 저장
const contentForm = document.querySelector('form.form');
// 폼 태그의 submit 이벤트가 일어났을 때 
// 새로운 데이터를 로컬 스토레이지에 저장해주는 함수 실행
// 로컬 스토레이지를 불러와서 화면에 렌더해주는 함수 실행
contentForm.addEventListener('submit', (e) => {
  // 새로고침 막아야 하나?
  e.preventDefault();
  localStorage.clear();

  addContent();
  render(ul);
  const value = document.querySelectorAll('.form__input--wrapper input');
  for (let i = 0; i < value.length; i++) {
    value[i].value = '';
  }
  const textarea = document.querySelector('.form__textbox textarea');
  textarea.value = '';
});

const renderPage = (element) => {

  while(ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  for (let i = (currentPage * 10) - 9; i <= currentPage * 10 ; i += 1) {
    // 업데이트되어 저장된 배열을 변수에 저장한다
    const agoraObject = JSON.parse(localStorage.getItem('AGORASTATES'));
    // 배열의 값을 순회하면서 html의 ul 자식 요소에 추가한다
    element.append(convertToDiscussion(agoraObject[i]));
  }
  return;

};

const pageNum = document.querySelectorAll('.pagination__wrapper button');
for (let i = 0; i < pageNum.length; i++) {
  pageNum[i].addEventListener('click', (e) => {
    e.preventDefault();
    currentPage = pageNum[i].textContent;
    renderPage(ul);
  });
}

/////////////////////////////////////////검색 기능/////////////////////////////////////////////


// const searchBtn = document.querySelector('.search button');

// searchBtn.addEventListener('click', () => {
//   const search = document.querySelector('.search input');
//   const searchValue = search.value;
//   searchDiscussion();
// })

// function searchDiscussion () {

// const savedData = JSON.parse(localStorage.getItem('AGORASTATES'))
// const index = savedData.findIndex((savedData) => savedData.title === searchValue);

// while(ul.firstChild) {
//   ul.removeChild(ul.firstChild);
// }
// ul.append(convertToDiscussion(agoraStatesDiscussions[index])); // element의 자식 요소로 li의 모든 요소를 넣기

// }