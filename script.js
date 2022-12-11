// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions)
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  
  
  // 아바타 
   const avatarImg = document.createElement("img");
   avatarImg.src = obj.avatarUrl;
   avatarImg.alt = "avatar of " + obj.author;
   avatarWrapper.append(avatarImg);
  

  // 콘텐츠 
  const contentTitle = document.createElement('h2');
  const titleAnchor = document.createElement('a');
  contentTitle.className = "discussion__title";
  titleAnchor.textContent = obj.title;
  titleAnchor.href = obj.url;

  contentTitle.append(titleAnchor);

  // 콘텐츠 정보
  const contentInfo = document.createElement('div');
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  contentInfo.className = "discussion__information"
  discussionContent.append(contentTitle, contentInfo);
  
 
 
  // 체크박스 
  const checked = document.createElement('p');
  checked.textContent = obj.answer !== null ? "✅":"❎";



  discussionAnswered.append(checked);




  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {  
  for (let i = 0; i < currentPageContNumb; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i + currentPage*10]));
  }
  return;
};

// 이벤트 리스너
const form = document.querySelector('.form');
const author = document.querySelector('.form__input--name > input');
const title = document.querySelector('.form__input--title > input');
const textArea = document.querySelector('.form__textbox > textarea');


form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('이벤트 발생?');
  
  
  // 객체
  const obj = {
    id: "unique id",
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: author.value,
    answer: {
      id: "DC_kwDOHOApLM4AKg6M",
      createdAt: "2022-05-16T02:09:52Z",
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236",
      author: "Kingsenal",
      bodyHTML:
        '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/dubipy/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/dubipy">@dubipy</a> 님!<br>\n코드스테이츠 교육 엔지니어 권준혁 입니다. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<p dir="auto">질문 주신 내용은 노드 환경이 구성되어 있지 않기 때문에 발생되는 문제로 확인됩니다.</p>\n<p dir="auto"><code class="notranslate">brew unlink node &amp;&amp; brew link node</code></p>\n<p dir="auto">노드를 연결해 보시고 안된다면</p>\n<p dir="auto"><code class="notranslate">brew link --overwrite node</code></p>\n<p dir="auto">이 명령어를 그 다음에도 안된다면 접근권한 문제일 가능성이 큽니다.</p>\n<p dir="auto"><code class="notranslate">$ sudo chmod 776 /usr/local/lib</code> 접근 권한 변경 후<br>\n<code class="notranslate">$ brew link --overwrite node</code> 다시 연결을 해보세요 !</p>\n<p dir="auto">그럼에도 안된다면 다시 한 번 더 질문을 남겨주세요 !</p>\n<p dir="auto">답변이 되셨다면 내용을 간략하게 정리해서 코멘트를 남기고 answered를 마크해주세요 <g-emoji class="g-emoji" alias="white_check_mark" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2705.png">✅</g-emoji><br>\n감사합니다.<g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji><br>\n코드스테이츠 교육 엔지니어 권준혁</p>',
      avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    },
    bodyHTML:
      '<p dir="auto">--------------- 여기서부터 복사하세요 ---------------</p>\n<p dir="auto">운영 체제: 예) macOS</p>\n<p dir="auto">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?<br>\nPair 과제 / JavaScript Koans</p>\n<p dir="auto">npm install 명령어 입력 시 env: node: No such file or directory 라고 뜹니다</p>\n<p dir="auto">에러 발생하여 아래 명령어 실행 했는데도 불구하고 똑같은 에러가 발생했습니다<br>\nnpm cache clean --force</p>\n<p dir="auto">rm package-lock.json</p>\n<p dir="auto">rm -rf ./node_modules/</p>\n<p dir="auto">npm --verbose install</p>\n<p dir="auto">폴더 자체가 문제가 있다고 생각하여 github에서 다시 fork 후 진행했는데도 같은 에러가 발생했습니다<br>\n리눅스 기초 챕터 때 npm 설치해서 마지막 submit까지는 잘 됐는데 현재 짝수 생성기 폴더도 똑같이 npm install 시 no such file or directory가 발생합니다</p>\n<p dir="auto">에러가 출력된 곳에서, 이유라고 생각하는 부분을 열 줄 이내로 붙여넣기 해 주세요. (잘 모르겠으면 에러라고 생각하는 곳을 넣어주세요)</p>\n<div class="highlight highlight-source-js position-relative overflow-auto" data-snippet-clipboard-copy-content="minjun@dubi fe-sprint-javascript-koans-main % pwd \n/Users/minjun/Documents/fe_frontand_39/fe-sprint-javascript-koans-main\nminjun@dubi fe-sprint-javascript-koans-main % npm install \nenv: node: No such file or directory"><pre><span class="pl-s1">minjun</span>@<span class="pl-s1">dubi</span> <span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span> <span class="pl-c1">%</span> <span class="pl-s1">pwd</span> \n<span class="pl-c1">/</span><span class="pl-v">Users</span><span class="pl-c1">/</span><span class="pl-s1">minjun</span><span class="pl-c1">/</span><span class="pl-v">Documents</span><span class="pl-c1">/</span><span class="pl-s1">fe_frontand_39</span><span class="pl-c1">/</span><span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span>\n<span class="pl-s1">minjun</span><span class="pl-kos"></span>@<span class="pl-s1">dubi</span> <span class="pl-s1">fe</span><span class="pl-c1">-</span><span class="pl-s1">sprint</span><span class="pl-c1">-</span><span class="pl-s1">javascript</span><span class="pl-c1">-</span><span class="pl-s1">koans</span><span class="pl-c1">-</span><span class="pl-s1">main</span> <span class="pl-c1">%</span> <span class="pl-s1">npm</span> <span class="pl-s1">install</span> \nenv: node: <span class="pl-v">No</span> <span class="pl-s1">such</span> <span class="pl-s1">file</span> <span class="pl-s1">or</span> <span class="pl-s1">directory</span></pre></div>\n<p dir="auto">검색했던 링크가 있다면 첨부해 주세요.<br>\n<a href="https://mia-dahae.tistory.com/89" rel="nofollow">https://mia-dahae.tistory.com/89</a></p>\n<p dir="auto"><a href="https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory" rel="nofollow">https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory</a></p>\n<p dir="auto"><a href="https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0" rel="nofollow">https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0</a></p>\n<p dir="auto"><a href="https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346" rel="nofollow">https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346</a></p>\n<p dir="auto"><a href="https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80" rel="nofollow">https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80</a></p>\n<p dir="auto"><a href="https://hellowworlds.tistory.com/57" rel="nofollow">https://hellowworlds.tistory.com/57</a></p>',
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  if (typeof(Storage) !== "undefined") {
    agoraStatesDiscussions.unshift(obj);
    localStorage.setItem('agoraStatesDiscussions', JSON.stringify(agoraStatesDiscussions));
  } else {
    agoraStatesDiscussions.unshift(obj);
    localStorage.setItem('agoraStatesDiscussions', JSON.stringify(agoraStatesDiscussions));
  }



  agoraStatesDiscussions.unshift(obj);
  // 그 객체를 convertToDiscussion에 넣어서 DOM으로 변환
  // 그걸 또 render함수에 넣어서 브라우저에 렌더링
  ul.prepend(convertToDiscussion(obj));
  title.value = "";
  author.value = "";
  textArea.value = "";


})




// 페이지네이션 구현

const moveBtn = document.querySelectorAll(".move__btn");

const pagesBtn = document.querySelector("#pages__btn");


// agoraStatesDiscussions의 길이 
let totalContLength = agoraStatesDiscussions.length;

// 10으로 나누고 Math.ceil을 사용하여 전체 페이지수를 나타냄
let totalPageLength = Math.ceil(totalContLength / 10);

// 현재 페이지
let currentPage = 0;

let currentPageContNumb = 10;

let totalPaginationLength = Math.ceil(totalContLength / 50 )
let currentPagination = 0;
let currentPaginationLength = 5;

// 페이지네이션 렌더 함수
(function PaginationRender() {
  for (let j = 0; j < currentPaginationLength; j++) {
    const pageBtn = document.createElement('div');
    pageBtn.className = "page__btn";
    pageBtn.textContent = `${j + currentPagination + 1}`;
    pagesBtn.append(pageBtn);
  }
})();

// 페이지 수 조정 함수
function pagecontrol() {
  if (currentPagination === totalPaginationLength-1) {
    currentPaginationLength = totalPaginationLength % 5;
  } else {
    currentPaginationLength = 5;
  }

  if (currentPagination < 0) {
    currentPagination = 0;
  } else if (currentPagination > totalPaginationLength-1) {
    currentPagination = totalPaginationLength-1;
  }
  while (pagesBtn.firstChild) {
    pagesBtn.removeChild(pagesBtn.firstChild);
  }
  (function PaginationRender() {
    for (let j = 0; j < currentPaginationLength; j++) {
      const pageBtn = document.createElement('div');
      pageBtn.className = "page__btn";
      pageBtn.textContent = `${j + currentPagination + 1}`;
      pagesBtn.append(pageBtn);
    }
  })();
}

moveBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // 각 버튼에 대한 기본적인 작동내용
    if (e.target.id === "prev__btn") {
      currentPagination--;
      pagecontrol();
    } else if (e.target.id === "next__btn") {
      currentPagination++;
      pagecontrol();
    } else {
      currentPage = e.target.textContent - 1;
    }

    // 데이터셋의 길이를 벗어나는 것에 대한 예외처리
    if (currentPage < 0) {
      currentPage = 0;
    } else if (currentPage > totalPageLength-1) {
      currentPage = totalPageLength-1
    }
    // 마지막 페이지에서의 콘텐츠 수에 대한 예외처리
    if (currentPage === totalPageLength-1) {
      currentPageContNumb = agoraStatesDiscussions.length % 10;
    } else {
      currentPageContNumb = 10;
    }
    // 이전 discussions 삭제
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    // 해당 페이지에 위치한 discussions 렌더링
    render(ul);
  })
})

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);