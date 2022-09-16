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
  } 
  else {
    discussionCheckbox.textContent = '☑';
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
  const formCreatAt = new Date()
  event.preventDefault()

  const obj = {
    id: "unique number",
    createdAt: new Date(),
    title: formTitle.value,
    author: formName.value,
    answer: null,
    bodyHTML:
      '<p dir="auto">--------------- 여기서부터 복사하세요 ---------------</p>\n<p dir="auto">운영 체제: 예) macOS</p>\n<p dir="auto">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?<br>\nPair 과제 / JavaScript Koans</p>\n<p dir="auto">npm install 명령어 입력 시 env: node: No such file or directory 라고 뜹니다</p>\n<p dir="auto">에러 발생하여 아래 명령어 실행 했는데도 불구하고 똑같은 에러가 발생했습니다<br>\nnpm cache clean --force</p>\n<p dir="auto">rm package-lock.json</p>\n<p dir="auto">rm -rf ./node_modules/</p>\n<p dir="auto">npm --verbose install</p>\n<p dir="auto">폴더 자체가 문제가 있다고 생각하여 github에서 다시 fork 후 진행했는데도 같은 에러가 발생했습니다<br>\n리눅스 기초 챕터 때 npm 설치해서 마지막 submit까지는 잘 됐는데 현재 짝수 생성기 폴더도 똑같이 npm install 시 no such file or directory가 발생합니다</p>\n<p dir="auto">에러가 출력된 곳에서, 이유라고 생각하는 부분을 열 줄 이내로 붙여넣기 해 주세요. (잘 모르겠으면 에러라고 생각하는 곳을 넣어주세요)</p>\n<div class="highlight highlight-source-js position-relative overflow-auto" data-snippet-clipboard-copy-content="minjun@dubi fe-sprint-javascript-koans-main % pwd \n/Users/minjun/Documents/fe_frontand_39/fe-sprint-javascript-koans-main\nminjun@dubi fe-sprint-javascript-koans-main % npm install \nenv: node: No such file or directory"><pre><span class="pl-s1">minjun</span>@<span class="pl-s1">dubi</span> <span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span> <span class="pl-c1">%</span> <span class="pl-s1">pwd</span> \n<span class="pl-c1">/</span><span class="pl-v">Users</span><span class="pl-c1">/</span><span class="pl-s1">minjun</span><span class="pl-c1">/</span><span class="pl-v">Documents</span><span class="pl-c1">/</span><span class="pl-s1">fe_frontand_39</span><span class="pl-c1">/</span><span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span>\n<span class="pl-s1">minjun</span><span class="pl-kos"></span>@<span class="pl-s1">dubi</span> <span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span> <span class="pl-c1">%</span> <span class="pl-s1">npm</span> <span class="pl-s1">install</span> \nenv: node: <span class="pl-v">No</span> <span class="pl-s1">such</span> <span class="pl-s1">file</span> <span class="pl-s1">or</span> <span class="pl-s1">directory</span></pre></div>\n<p dir="auto">검색했던 링크가 있다면 첨부해 주세요.<br>\n<a href="https://mia-dahae.tistory.com/89" rel="nofollow">https://mia-dahae.tistory.com/89</a></p>\n<p dir="auto"><a href="https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory" rel="nofollow">https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory</a></p>\n<p dir="auto"><a href="https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0" rel="nofollow">https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0</a></p>\n<p dir="auto"><a href="https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346" rel="nofollow">https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346</a></p>\n<p dir="auto"><a href="https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80" rel="nofollow">https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80</a></p>\n<p dir="auto"><a href="https://hellowworlds.tistory.com/57" rel="nofollow">https://hellowworlds.tistory.com/57</a></p>',
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  agoraStatesDiscussions.unshift(obj)
  ul.prepend(convertToDiscussion(obj))
}