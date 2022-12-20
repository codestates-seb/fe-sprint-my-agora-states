// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  // agoraStatesDiscussions 배열의 한 요소가 obj라는 매개변수로 들어오게 된다.

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container box-row"; // 클래스 지정

  // li 요소 - discussion__container 구조
    // 1. 사진을 담는 div 요소 : discussion__avatar--wrapper
    // 2. 제목, 글쓴이, 날짜 담는 div 요소 : discussion__content
    // 3. 답변이 되었는지 체크 표쇠 div 요소 : discussion__answered
  
  // 위의 3개의 요소 생성하기
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper box-col";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content box-col";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered box-col";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // agoraStatesDiscussions[0] 예시
  /*{
    answer: null 이거나 답변 정보가 들어있다.
    author: "dubipy"
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
    bodyHTML: "<p dir=\"auto\">--------------- 여기서부터 복사하세요 ---------------</p>\n<p dir=\"auto\">운영 체제: 예) macOS</p>\n<p dir=\"auto\">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?<br>\nPair 과제 / JavaScript Koans</p>\n<p dir=\"auto\">npm install 명령어 입력 시 env: node: No such file or directory 라고 뜹니다</p>\n<p dir=\"auto\">에러 발생하여 아래 명령어 실행 했는데도 불구하고 똑같은 에러가 발생했습니다<br>\nnpm cache clean --force</p>\n<p dir=\"auto\">rm package-lock.json</p>\n<p dir=\"auto\">rm -rf ./node_modules/</p>\n<p dir=\"auto\">npm --verbose install</p>\n<p dir=\"auto\">폴더 자체가 문제가 있다고 생각하여 github에서 다시 fork 후 진행했는데도 같은 에러가 발생했습니다<br>\n리눅스 기초 챕터 때 npm 설치해서 마지막 submit까지는 잘 됐는데 현재 짝수 생성기 폴더도 똑같이 npm install 시 no such file or directory가 발생합니다</p>\n<p dir=\"auto\">에러가 출력된 곳에서, 이유라고 생각하는 부분을 열 줄 이내로 붙여넣기 해 주세요. (잘 모르겠으면 에러라고 생각하는 곳을 넣어주세요)</p>\n<div data-snippet-clipboard-copy-content=\"minjun@dubi fe-sprint-javascript-koans-main % pwd \n/Users/minjun/Documents/fe_frontand_39/fe-sprint-javascript-koans-main\nminjun@dubi fe-sprint-javascript-koans-main % npm install \nenv: node: No such file or directory\" class=\"highlight highlight-source-js position-relative overflow-auto\"><pre><span class=\"pl-s1\">minjun</span>@<span class=\"pl-s1\">dubi</span> <span class=\"pl-s1\">fe</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">sprint</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">javascript</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">koans</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">main</span> <span class=\"pl-c1\">%</span> <span class=\"pl-s1\">pwd</span> \n<span class=\"pl-c1\">/</span><span class=\"pl-v\">Users</span><span class=\"pl-c1\">/</span><span class=\"pl-s1\">minjun</span><span class=\"pl-c1\">/</span><span class=\"pl-v\">Documents</span><span class=\"pl-c1\">/</span><span class=\"pl-s1\">fe_frontand_39</span><span class=\"pl-c1\">/</span><span class=\"pl-s1\">fe</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">sprint</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">javascript</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">koans</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">main</span>\n<span class=\"pl-s1\">minjun</span><span class=\"pl-kos\"></span>@<span class=\"pl-s1\">dubi</span> <span class=\"pl-s1\">fe</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">sprint</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">javascript</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">koans</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">main</span> <span class=\"pl-c1\">%</span> <span class=\"pl-s1\">npm</span> <span class=\"pl-s1\">install</span> \nenv: node: <span class=\"pl-v\">No</span> <span class=\"pl-s1\">such</span> <span class=\"pl-s1\">file</span> <span class=\"pl-s1\">or</span> <span class=\"pl-s1\">directory</span></pre></div>\n<p dir=\"auto\">검색했던 링크가 있다면 첨부해 주세요.<br>\n<a rel=\"nofollow\" href=\"https://mia-dahae.tistory.com/89\">https://mia-dahae.tistory.com/89</a></p>\n<p dir=\"auto\"><a rel=\"nofollow\" href=\"https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory\">https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory</a></p>\n<p dir=\"auto\"><a rel=\"nofollow\" href=\"https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0\">https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0</a></p>\n<p dir=\"auto\"><a rel=\"nofollow\" href=\"https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346\">https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346</a></p>\n<p dir=\"auto\"><a rel=\"nofollow\" href=\"https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80\">https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80</a></p>\n<p dir=\"auto\"><a rel=\"nofollow\" href=\"https://hellowworlds.tistory.com/57\">https://hellowworlds.tistory.com/57</a></p>"
    createdAt: "2022-05-16T01:02:17Z"
    id: "D_kwDOHOApLM4APjJi"
    title: "koans 과제 진행 중 npm install 오류로 인해 정상 작동 되지 않습니다"
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45"

  }*/

  /* 1. avatarWrapper 만들기 */
  // avatar img 요소 만들기
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.setAttribute("src", obj.avatarUrl)
  avatarImg.setAttribute("alt", `avatar of ${obj.author}`)

  // 만든 img 요소를 avatarWrapper 안에 추가
  avatarWrapper.append(avatarImg)

  
  /* 2. discussionContent 만들기 */
  // (1) discussion__title 만들기
  // <h2 class="discussion__title"><a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">[notice] 좋은 질문하는 법</a></h2>
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement("a");
  discussionLink.setAttribute('href', `${obj.url}`);
  discussionLink.textContent = `${obj.title}`;

  discussionTitle.append(discussionLink);

  // (2) discussion__information 만들기
  //  <div class="discussion__information">kimploo / 2022-04-22T14:08:33Z</div>
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  
  // 만든 요소들을 discussionContent 안에 추가
  discussionContent.append(discussionTitle, discussionInfo);


  /* 3. discussionAnswered */
  // <div class="discussion__answered"><i class="fa-solid fa-square-check"></i></div>
  const discussionAnswerCheck = document.createElement("i")
  if(obj.answer == null) { // 질문이 비어있다면
    discussionAnswerCheck.className = "fa-regular fa-square-check"
  }else{
    discussionAnswerCheck.className = "fa-solid fa-square-check";
  }

  // 만든 요소를 discussionAnswered 안에 추가
  discussionAnswered.append(discussionAnswerCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const agoraStatesDiscussions = [];
const ul = document.querySelector("ul.discussions__container");

fetch("http://localhost:4000/discussions")
  .then((response) => response.json())
  .then((data) => {
      return data.map(discussion => {
        if (discussion.answer) {
          return {
            ...discussion,
            bodyHTML: DOMPurify.sanitize(discussion.bodyHTML),
            answer: {
              ...discussion.answer,
              bodyHTML: DOMPurify.sanitize(discussion.answer.bodyHTML)
            }
          }
        }
      
        return {
          ...discussion,
          bodyHTML: DOMPurify.sanitize(discussion.bodyHTML)
        }
      })
    }
  )
  .then((agoraStatesDiscussions) =>{
      const render = (element) => {
        for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
          element.append(convertToDiscussion(agoraStatesDiscussions[i]));
        }
        return;
      };
      // ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
      render(ul);
    }
  )

/* 토글 버튼 만들기 */
const toggleBtn = document.querySelector('.toggle__btn')
const toggleTarget = document.querySelector('.toggle__target')
let toggleOn = true;

const toggleEvent = () => {
  toggleTarget.style.display = toggleOn ? 'flex' : 'none';
  toggleOn = !toggleOn;
}

toggleBtn.addEventListener('click', toggleEvent)

// 이벤트 리스너
const form = document.querySelector('.form')

form.addEventListener('submit', (event) => {
  event.preventDefault(); // 새로고침 막아줌

  const newObj = {
    answer: null,
    author: `${document.querySelector("#name").value}`,
    avatarUrl: "https://prodigits.co.uk/thumbs/wallpapers/p2ls/drawings/26/fd4465ee12568148.jpg",
    bodyHTML: "",
    createdAt: `${new Date()}`,
    id: "unique id",
    title: `${document.querySelector("#title").value}`,
    url: ""
  }

  agoraStatesDiscussions.unshift(newObj);
  ul.prepend(convertToDiscussion(newObj));
  toggleTarget.style.display = 'none';
})


/* 화면 크기에 따른 변화 */
const titleAndForm = document.querySelector('.title-form');
const discussionWrapper = document.querySelector('.discussion__wrapper')
// 윈도우 크기 조절 이벤트 리스너
window.onresize = function(event){
  var innerWidth = window.innerWidth;
  if(innerWidth <= 910){
    titleAndForm.style.width = '100vw';
    titleAndForm.style.height = '40vh';
    discussionWrapper.style.padding = '0';
  }else{
    titleAndForm.style.width = '40vw';
    titleAndForm.style.height = '100vh';
    discussionWrapper.style.paddingLeft = '40vw';
  }
}