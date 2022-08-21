// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions[1].author);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

const convertToDiscussion = (obj) => {

  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // <avatarWrapper> 부분
  const avatarWrapper = document.createElement("div"); // div 요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper";  // 클래스 이름 지정

  const avatarImg = document.createElement('img'); // img 요소 생성
  avatarImg.className = "discussion__avatar--image"; // img 요소의 클래스 이름 지정 (빼먹어서 문제 발생!)
  avatarImg.src = obj.avatarUrl; // img 요소의 속성 추가  ?? setAttribute 안쓰고?
  avatarImg.alt = 'avatar of' + obj.author;

  avatarWrapper.append(avatarImg);      // 한번에 여러개의 자식 요소를 추가할 때는 appendChild 대신 append

  // console.log(avatarWrapper); // 확인용 [문제해결] 위에서 클래스 이름 생성을 안해줘서 css 적용이 계속 안됐음 ㅠ

  // <discussionContent> 부분
  const discussionContent = document.createElement("div"); // div 요소 생성
    discussionContent.className = "discussion__content";  // 클래스 이름 지정

  const discussionContentTitle = document.createElement("h2"); // h2 요소 생성
    discussionContentTitle.className = "discussion__title" // 클래스 이름 지정

  const discussionContentTitleAnchor = document.createElement("a"); // a 요소 생성
    discussionContentTitleAnchor.href = obj.url; // a 요소 속성 href 추가
    discussionContentTitleAnchor.textContent = obj.title;  // a 요소 내용 추가

  discussionContentTitle.appendChild(discussionContentTitleAnchor); // h2 태그 안에 생성한 a 요소 넣기

  const dicussionContentInformation = document.createElement("div"); // div 요소 생성
    dicussionContentInformation.className = "discussion__information";  // 클래스 이름 지정
    dicussionContentInformation.textContent = obj.author + " / " + new Date(obj.createdAt).toLocaleString(); // div 요소 내용 작성자, 작성시간 추가

  discussionContent.appendChild(discussionContentTitle, dicussionContentInformation);

  // console.log(discussionContent);  // 확인용

  // <discussionAnswered> 부분
  const discussionAnswered = document.createElement("div");  // div 요소 생성
  discussionAnswered.className = "discussion__answered" // 클래스 이름 지정

  const discussionAnsweredContent = document.createElement("p"); // p 요소 생성

    discussionAnswered.append(discussionAnsweredContent); // div 안에 생성한 p 요소 삽입

    const isAnswerNull = (answer) => answer === null ? "☒" : "☑"; // answer 가 null인 경우와 아닌 경우 판별 함수
    discussionAnsweredContent.textContent = isAnswerNull(obj.answer); // answer 데이터 판별 결과를 내용에 넣기

    // console.log(discussionAnswered); // 확인용

  // 작성한 div 요소 3부분 append
    discussionContent.append(discussionContentTitle, dicussionContentInformation, discussionAnswered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;

};

// ===== 폼 작성하면 추가되는 부분 ======
// < 핵심로직 >
// 새로운 객체를 하나 만들고
// submit 버튼을 누르면
// 새로운 객체에 내용을 추가해서 하나 만들고
// 그 새로운 객체를 기존 더미데이터 앞에 가져다 붙인다

const toAskForm = document.querySelector(".form");   // 작성폼

toAskForm.addEventListener("submit", handleToDoSubmit);

function handleToDoSubmit(e) {  // 이벤트 발생시 작동할 리스너의 함수 []
    e.preventDefault();           // submit 시 디폴트로 발생하는 내장 기능이 멈춰지도록 실행하는 메서드 
  
    const newObj = {
      id: "unique id",
      createdAt: "2022-05-16T01:02:17Z",
      title: "koans 과제 진행 중 npm install 오류로 인해 정상 작동 되지 않습니다",
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: "dubipy",
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
    }
  }

  agoraStatesDiscussions.unshift(newObj); // 기존 객체의 앞부분에 새로운 객체 삽입

  const newdiscussion = convertToDiscussion(obj);

  ul.prepend(newdiscussion);

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// for of 를 이용한 방식 적용 해보기
// 배열 요소의 각각인 el 에 convertToDiscussion 함수를 적용해서 append 해줘

const render = (element) => {
  for (let el of agoraStatesDiscussions) {
    element.append(convertToDiscussion(el));
  }
  return;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);









// ========== 잘못된 접근 방법으로 삽질했던 부분 ==========

// const toAskForm = document.querySelector(".form");   // 작성폼
// // console.log(toAskForm);
// const toAskInputName = toAskForm.querySelector("#name");  //
// const toAskInputTitle = toAskForm.querySelector("#title");  //
// const toAskInputQuestion = toAskForm.querySelector("#story") //

// let arrAskInputName = [];
// let arrAskInputTitle = [];

// // 로컬 스토리지에 array 형태로 저장할 수 없음. string 형태로만 저장 가능
// function saveToAskName(arrAskInputName) {
//   localStorage.setItem("toAskInputName", JSON.stringify(arrAskInputName)); //  JSON.stringify로 stirng으로 변환
// }

// function saveToAskTitle(arrAskInputTitle) {
//   localStorage.setItem("toAskInputTitle", JSON.stringify(arrAskInputTitle)); //  JSON.stringify로 stirng으로 변환
// }

// function paintToAsk(newInputName, newInputTitle) {
//   const li = document.createElement("li"); // li 요소 생성
//   li.className = "discussion__container"; // 클래스 이름 지정

//   // <discussionContent> 부분
//   const discussionContent = document.createElement("div"); // div 요소 생성
//     discussionContent.className = "discussion__content";  // 클래스 이름 지정

//   const discussionContentTitle = document.createElement("h2"); // h2 요소 생성
//     discussionContentTitle.className = "discussion__title" // 클래스 이름 지정

//   const discussionContentTitleAnchor = document.createElement("a"); // a 요소 생성
//     // discussionContentTitleAnchor.href = obj.url; // a 요소 속성 href 추가
//     discussionContentTitleAnchor.textContent = newInputTitle;  // a 요소 내용 추가

//   discussionContentTitle.appendChild(discussionContentTitleAnchor); // h2 태그 안에 생성한 a 요소 넣기

//   const dicussionContentInformation = document.createElement("div"); // div 요소 생성
//     dicussionContentInformation.className = "discussion__information";  // 클래스 이름 지정
//     dicussionContentInformation.textContent = newInputName + " / " + new Date().toLocaleString(); // div 요소 내용 작성자, 작성시간 추가

//   discussionContent.append(discussionContentTitle, dicussionContentInformation);

//   // <discussionAnswered> 부분
//   const discussionAnswered = document.createElement("div");  // div 요소 생성
//   discussionAnswered.className = "discussion__answered" // 클래스 이름 지정

//   const discussionAnsweredContent = document.createElement("p"); // p 요소 생성

//     discussionAnswered.append(discussionAnsweredContent); // div 안에 생성한 p 요소 삽입

//     discussionAnsweredContent.textContent = "☒"; // 일단 초기에 만들어지는 질문이므로 그냥 답변 안되있는 표시로 내용 작성

//   li.append(discussionContent, discussionAnswered);
  
//   // console.log(li);

//   ul.append(li);
//   return ul;

// }

// function handleToDoSubmit(e) {  // 이벤트 발생시 작동할 리스너의 함수 [텍스트 입력 내용을 변수에 저장하고, 초기화함 + 화면에 보여주는기능(함수로)]
//   e.preventDefault();           // submit 시 디폴트로 발생하는 내장 기능이 멈춰지도록 실행하는 메서드 
//   // console.log(toAskInputName.value);
//   // console.log(toAskInputTitle.value);

//   const newInputName = toAskInputName.value;  // 압력한 이름을 저장
//   const newInputTitle = toAskInputTitle.value;  // 입력한 제목을 저장

//   toAskInputName.value = "";  // 입력한 후 창이 빈상태로 만들기
//   toAskInputTitle.value = "";  // 입력한 후 창이 빈상태로 만들기
//   toAskInputQuestion.value = "";  // 입력한 후 창이 빈상태로 만들기

//   arrAskInputName.unshift(newInputName); //
//   arrAskInputTitle.unshift(newInputTitle); //
//   paintToAsk(newInputName, newInputTitle);
//   saveToAskName(arrAskInputName);
//   saveToAskTitle(arrAskInputTitle);
  
// }

// // console.log(arrAskInputName);

// toAskForm.addEventListener("submit", handleToDoSubmit);  // submit 이벤트시 handleToDoSubmit 함수가 작동하는 이벤트리스너

// const savedNameToAsks = localStorage.getItem("toAskInputName");
// const savedTitleToAsks = localStorage.getItem("toAskInputTitle");

// console.log(savedNameToAsks);
// console.log(savedTitleToAsks);


// if (savedNameToAsks !== null && savedTitleToAsks !== null) {
//   const parsedNameToAsks = JSON.parse(savedNameToAsks);
//   const parsedTitleToAsks = JSON.parse(savedTitleToAsks);


//   arrAskInputName = parsedNameToAsks;
//   arrAskInputTitle = parsedTitleToAsks;

//   console.log(parsedNameToAsks);
//   console.log(parsedTitleToAsks);

//   // 2배열을 합쳐야 하나? 인덱스별 짝지어서 새로운 배열을 ??? 

//   parsedNameToAsks.forEach(paintToAsk);
//   parsedTitleToAsks.forEach(paintToAsk);
//   // console.log(parsedTitleToAsks);
// }