// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

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

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 프로필 이미지
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg)

  //질문 내용
  const $content = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  $content.className = "discussion__title";
  titleAnchor.textContent = obj.title;
  titleAnchor.href = obj.url;
  $content.append(titleAnchor);



  //정보
  const $information = document.createElement("div");
  $information.className = "discussion__information";
  $information.innerText = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append($content, $information);

  //답변체크
  const $answer = document.createElement("div");
  $answer.className = "discussion__answered";
  if (obj.answer ? $answer.textContent = '✓' : $answer.textContent = '✗')
    discussionAnswered.append($answer)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// 이벤트 리스너
// submit을 눌렀을 경우 계속 새로고침이 일어난다.
// 서브밋을 했을 때 렌더 함수가 실행이 된다면? 
// 폼 선택.
// 폼에 이벤트 리스너 (서브밋했을때, (event) => {
// event.preventDefault;
// 객체를 하나 만든다.
// 그 객체를 convertTodiscussion에 넣어서 DOM으로 변환
// 그걸 또 render함수에 넣어서 브라우저에 렌더링 맨 앞에 넣어줘야하기에 prepend
// }
const $form = document.querySelector('.form__container')
const $name = document.querySelector('.form__input--name > input')
const $title = document.querySelector('.form__input--title > input')
const $textarea = document.querySelector('.form__textbox > textarea')

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  const obj = {
    id : 'unique number',
    createdAt : new Date(),
    title : $title.value,
    author: $name.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    bodyHTML: "<p dir=\"auto\">--------------- 여기서부터 복사하세요 ---------------</p>\n<p dir=\"auto\">운영 체제: 예) macOS</p>\n<p dir=\"auto\">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?<br>\nPair 과제 / JavaScript Koans</p>\n<p dir=\"auto\">npm install 명령어 입력 시 env: node: No such file or directory 라고 뜹니다</p>\n<p dir=\"auto\">에러 발생하여 아래 명령어 실행 했는데도 불구하고 똑같은 에러가 발생했습니다<br>\nnpm cache clean --force</p>\n<p dir=\"auto\">rm package-lock.json</p>\n<p dir=\"auto\">rm -rf ./node_modules/</p>\n<p dir=\"auto\">npm --verbose install</p>\n<p dir=\"auto\">폴더 자체가 문제가 있다고 생각하여 github에서 다시 fork 후 진행했는데도 같은 에러가 발생했습니다<br>\n리눅스 기초 챕터 때 npm 설치해서 마지막 submit까지는 잘 됐는데 현재 짝수 생성기 폴더도 똑같이 npm install 시 no such file or directory가 발생합니다</p>\n<p dir=\"auto\">에러가 출력된 곳에서, 이유라고 생각하는 부분을 열 줄 이내로 붙여넣기 해 주세요. (잘 모르겠으면 에러라고 생각하는 곳을 넣어주세요)</p>\n<div data-snippet-clipboard-copy-content=\"minjun@dubi fe-sprint-javascript-koans-main % pwd \n/Users/minjun/Documents/fe_frontand_39/fe-sprint-javascript-koans-main\nminjun@dubi fe-sprint-javascript-koans-main % npm install \nenv: node: No such file or directory\" class=\"highlight highlight-source-js position-relative overflow-auto\"><pre><span class=\"pl-s1\">minjun</span>@<span class=\"pl-s1\">dubi</span> <span class=\"pl-s1\">fe</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">sprint</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">javascript</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">koans</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">main</span> <span class=\"pl-c1\">%</span> <span class=\"pl-s1\">pwd</span> \n<span class=\"pl-c1\">/</span><span class=\"pl-v\">Users</span><span class=\"pl-c1\">/</span><span class=\"pl-s1\">minjun</span><span class=\"pl-c1\">/</span><span class=\"pl-v\">Documents</span><span class=\"pl-c1\">/</span><span class=\"pl-s1\">fe_frontand_39</span><span class=\"pl-c1\">/</span><span class=\"pl-s1\">fe</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">sprint</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">javascript</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">koans</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">main</span>\n<span class=\"pl-s1\">minjun</span><span class=\"pl-kos\"></span>@<span class=\"pl-s1\">dubi</span> <span class=\"pl-s1\">fe</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">sprint</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">javascript</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">koans</span><span class=\"pl-c1\">-</span><span class=\"pl-s1\">main</span> <span class=\"pl-c1\">%</span> <span class=\"pl-s1\">npm</span> <span class=\"pl-s1\">install</span> \nenv: node: <span class=\"pl-v\">No</span> <span class=\"pl-s1\">such</span> <span class=\"pl-s1\">file</span> <span class=\"pl-s1\">or</span> <span class=\"pl-s1\">directory</span></pre></div>\n<p dir=\"auto\">검색했던 링크가 있다면 첨부해 주세요.<br>\n<a rel=\"nofollow\" href=\"https://mia-dahae.tistory.com/89\">https://mia-dahae.tistory.com/89</a></p>\n<p dir=\"auto\"><a rel=\"nofollow\" href=\"https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory\">https://stackoverflow.com/questions/38143558/npm-install-resulting-in-enoent-no-such-file-or-directory</a></p>\n<p dir=\"auto\"><a rel=\"nofollow\" href=\"https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0\">https://velog.io/@hn04147/npm-install-%ED%95%A0-%EB%95%8C-tar-ENOENT-no-such-file-or-directory-lstat-%EC%97%90%EB%9F%AC%EB%82%A0-%EA%B2%BD%EC%9A%B0</a></p>\n<p dir=\"auto\"><a rel=\"nofollow\" href=\"https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346\">https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&amp;blogId=chandong83&amp;logNo=221064506346</a></p>\n<p dir=\"auto\"><a rel=\"nofollow\" href=\"https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80\">https://webisfree.com/2021-07-15/npm-install-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D-rename-no-such-file-or-directory-%ED%95%B4%EA%B2%B0%ED%95%98%EA%B0%80</a></p>\n<p dir=\"auto\"><a rel=\"nofollow\" href=\"https://hellowworlds.tistory.com/57\">https://hellowworlds.tistory.com/57</a></p>",
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
  };
  ul.prepend(convertToDiscussion(obj));
  $title.value ='';
  $name.value ='';
  $textarea.value ='';
});


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
