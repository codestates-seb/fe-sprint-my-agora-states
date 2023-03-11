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
  //create-update-append 이런과정을 거친다.
  
  //avatarWrapper
  const face = document.createElement('img');
  face.className = "discussion__avatar--image";
  face.src = obj['avatarUrl'];
  face.alt = `avatar of ${obj['author']}`;
  avatarWrapper.append(face);

  //discussionContent
  const title = document.createElement('h2');
  title.className = "discussion__title";
  const titleUrl = document.createElement('a');
  titleUrl.href = obj['url'];
  titleUrl.textContent = obj['title'];
  const information = document.createElement('div');
  information.className = "discussion__information";
  information.textContent = `${obj['author']} / ${new Date(obj['createdAt']).toLocaleString()}`;
  discussionContent.append(title,information);
  title.append(titleUrl);

  //discussionAnswered
  const checkIcon = document.createElement('p');
  checkIcon.innerHTML = obj.answer ? '✅':'❌';
  discussionAnswered.append(checkIcon);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
}

  //submit하는 이벤트 함수를 만든다. 타겟구간을 셀렉해주고, 이벤트함수를 만든다
  // 새로고침 방지하기
  // 하나의 객체를 만들어서 convertToDiscussion함수에 넣어서 li요소로 만든다음 ul요소로 prepend
  const form = document.querySelector('form.form');
  const author = document.querySelector('input#name');
  const newTitle = document.querySelector('input#title');
  const question = document.querySelector('textarea#story');

  form.addEventListener('submit',function(event){
  event.preventDefault();
  const newdiscussion = {
    id: "unique value",
    createdAt: new Date(),
    title: newTitle.value,
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
    bodyHTML:question.value,
    avatarUrl:"./IMG_0599.JPG",
  };
  ul.prepend(convertToDiscussion(newdiscussion));
  newTitle.value ="";
  author.value ="";
  question.value="";
})


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



/* 내가 빠뜨린 부분은 첫번째 배열에 해당하는 정보를 다 받아놓기만 함. 40개의 배열은 out of 안중
반복문을 고려하여, 콘솔을 보면서 문제를 찾아야 했음 >>동시에 안뜨지? 라는 생각을 했어야 함
제목,사진,정보 등이 한 항목을 추가할때마다 41개의 배열에 해당하는 정보가 같이 떠야했음

!!배운점 = 창에 안뜨면 무작정 적는 것이 아니라, 콘솔을 보면서 오류를 확인해야 한다!
*/