// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); //사진
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div"); //내용
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div"); //체크박스
  discussionAnswered.className = "discussion__answered";
 
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 새로운 리스트 li 묶음 만들기

  //1.아바타 프로필 영역
  const avatarImage = document.createElement('img')
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImage); // avatarWrapper 뒤에 추가한다.

  //2. 컨텐츠 영역
  //1) 질문 제목
  const discussionTitle = document.createElement('h2')
  const titleAnchor = document.createElement('a')
  discussionTitle.classList.add('discussion__title')
    titleAnchor.href = obj.url
    titleAnchor.textContent = obj.title
    discussionTitle.append(titleAnchor);    //discussionTitle 뒤에 a 추가
    discussionContent.append(discussionTitle); //discussionContent 뒤에 discussionTitle(제목)추가
  
  //2) imformation(작성자/시간)
  const discussionInfo = document.createElement('div')
	discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
	discussionInfo.classList.add('discussion__information'); // discussionInfo.className의 class 지정
  discussionContent.append(discussionTitle, discussionInfo)

  //3) 체크박스
  const checked = document.createElement('p')
	  checked.textContent = obj.answer ? "☑" : "☒"; //만약 답변이 있다면 '' : 없다면 ''
    checked.style.color = obj.answer ? "#00927a" : "#e90f6a";
    // checked.style.backgroundImage = obj.ansewer ? 
    discussionAnswered.append(checked)



  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // 더미데이터의 길이만큼, 더미데이타 안에 있는 모든 요소를 탐색
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // i번째 요소를 convertToDiscussion에 전달해서 ul에 append
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// 이벤트 리스너
const form = document.querySelector('.form');
const auther = document.querySelector('.form__input--name > input');
const title = document.querySelector('.form__input--title > input');
const textArea = document.querySelector('.form__textbox > textarea');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // submit 의 새로고침 방지
  // 객체를 하나 만든다.
  const obj = {
    id: "unique number",
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: auther.value,
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
  // data.js에 있는 배열에 추가한다.
  agoraStatesDiscussions.unshift(obj);
  console.log(agoraStatesDiscussions);
  // 그 객체를 convertToDiscussion에 넣어서 DOM으로 변환
  // 그걸 또 render함수에 넣어서 브라우저에 렌더링 => 맨 앞으로
  ul.prepend(convertToDiscussion(obj));
  // 값을 초기화
  auther.value = "";
  title.value = "";
  textArea.value = "";
})

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


/*** 페이지네이션 ***/
let currentPage = 1; // 현재 페이지. 초기값은 1

const prevButton = document.querySelector("#button__pagination--prev");
const nextButton = document.querySelector("#button__pagination--next");

const discussions = ul.children; // 공지사항을 포함한 디스커션
let totalCount = discussions.length; // 총 디스커션의 갯수
const pageCount = 5; // 한 번에 보여줄 페이지 버튼의 최대 갯수
const limit = 10; // 한 페이지에 보여줄 디스커션의 갯수

// 1.총 페이지의 갯수 구하기
let totalPage = Math.ceil(totalCount / limit);

// 2-1.현재 페이지의 그룹 계산하기
let pageGroup = Math.ceil(currentPage / pageCount);
// 2-2.페이지 그룹의 첫번째 숫자와 마지막 숫자 구하기
let lastPageNumber = pageGroup * pageCount;
if (lastPageNumber > totalPage) {
  lastPageNumber = totalPage;
};
let firstPageNumber = (pageGroup - 1) * pageCount + 1;
let numberButtons = document.querySelectorAll(".pagination--number");
// 2-3.페이지 그룹 버튼 생성
const makeNumberButtons = () => {
    for (let i = firstPageNumber; i <= lastPageNumber; i++) {
      const pageNumberButton = document.createElement('li');
      pageNumberButton.classList.add("pagination--number");
      pageNumberButton.setAttribute("id", `button__pagination--num${i}`);
      pageNumberButton.textContent = i;
      nextButton.before(pageNumberButton);
      numberButtons = document.querySelectorAll(".pagination--number");
    };
};
makeNumberButtons();


// 3.현재 페이지 인덱스 표시하기
const currPageIndex = () => {
    numberButtons.forEach( el => {
        el.classList.remove("current__page");
    });
    let currentPageButton = document.querySelector(`#button__pagination--num${currentPage}`);
    currentPageButton.classList.add("current__page");
};
currPageIndex();

// 4.한 페이지에서 디스커션 10개만 보여준다
const pageChange = () => {
    // 전체 디스커션 갯수, 전체 페이지 수, 페이지그룹의 마지막 페이지 다시 계산
    totalCount = discussions.length;
    totalPage = Math.ceil(totalCount / limit);
    lastPageNumber = pageGroup * pageCount; 

    if (lastPageNumber > totalPage) {
      lastPageNumber = totalPage;
    };
    let firstIndexNum = (currentPage - 1) * limit; //0
    let lastIndexNum = (currentPage * limit) - 1; //9
    for (let i = 0; i < totalCount; i++) {
    if (i < firstIndexNum || i > lastIndexNum) {
        discussions[i].style = "display : none";
    } else {
        discussions[i].style = "display : flex";
    }
    }
};
pageChange();

// 5.페이지 번호를 클릭하면 해당 페이지 화면으로 전환한다
const handlePageChange = () => {
    currPageIndex();
    pageChange();
}

numberButtons.forEach( el => {
    el.addEventListener("click", (event) => {
        let selectedNum = Number(event.target.textContent);
        currentPage = selectedNum;
        handlePageChange();
    })
});

// 6.이전페이지 버튼을 작동시킨다
prevButton.addEventListener("click", () => {
    if (currentPage === firstPageNumber) {
        if (currentPage === 1) {
            alert("처음 페이지 입니다.");
            return;
        } else {
            numberButtons.forEach(function(button){
                button.remove();
            });
            pageGroup -= 1;
            lastPageNumber = pageGroup * pageCount;
            if (lastPageNumber > totalPage) {
                lastPageNumber = totalPage;
            };
            firstPageNumber = (pageGroup - 1) * pageCount + 1;
            makeNumberButtons();
            numberButtons.forEach( el => {
                el.addEventListener("click", (event) => {
                    let selectedNum = Number(event.target.textContent);
                    currentPage = selectedNum;
                    handlePageChange();
                })
            });
        }
    }
    currentPage -= 1;
    handlePageChange();
});

// 7.다음페이지 버튼을 작동시킨다
nextButton.addEventListener("click", () => {
    if (currentPage === lastPageNumber) {
        if (lastPageNumber === totalPage) {
            alert("마지막 페이지 입니다.");
            return;
        } else {
            numberButtons.forEach(function(button){
                button.remove();
            });
            pageGroup += 1;
            lastPageNumber = pageGroup * pageCount;
            if (lastPageNumber > totalPage) {
                lastPageNumber = totalPage;
            };
            firstPageNumber = (pageGroup - 1) * pageCount + 1;
            makeNumberButtons();
            numberButtons.forEach( el => {
                el.addEventListener("click", (event) => {
                    let selectedNum = Number(event.target.textContent);
                    currentPage = selectedNum;
                    handlePageChange();
                })
            });
        }
    }
    currentPage += 1;
    handlePageChange();
});