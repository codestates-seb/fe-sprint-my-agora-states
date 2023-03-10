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
  
  const avatarImg = document.createElement('img'); // 이미지 요소 넣어주기
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl; // render 함수에서 agoraStatesDiscussions[i] 를 obj로 받은 거임
  avatarImg.alt = 'avatar of ' + obj.author; // agoraStatesDiscussions[0].author
  avatarWrapper.append(avatarImg);
  
  // 타이틀
  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title";
  const contentA = document.createElement('a');
  contentA.href = obj.urcl;
  contentA.innerHTML = obj.title;
  contentTitle.append(contentA);
  discussionContent.append(contentTitle);

  // 글쓴이 정보 / 작성일
  const contentInfo = document.createElement('div');
  const date = new Date(obj.createdAt);
  const writeDate = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDay()}일 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  contentInfo.className = "discussion__information";
  contentInfo.textContent = obj.author + " / " + writeDate;
  discussionContent.append(contentInfo);

  // 체크
  const answerCheck = document.createElement('div');
  const answerCheckBox = document.createElement('img');
  const getAnswer = document.querySelector('img.answeredImg');
  const answerCheckP = document.createElement('p');
  answerCheckBox.className = 'answeredImg';
  answerCheck.className = 'discussion__answered';
  answerCheckP.textContent = obj.answer ? "✔" : "❌";
  // getAnswer.src = obj.answer ? "./img/check.png" : "./img/uncheck.png"  ; // 답변 여부 이미지로 넣자!
  // if(obj.answer !== null){
  //   getAnswer.src = './img/check.png';
  // }else{
  //   getAnswer.src = './img/uncheck.png';
  // }
  // answerCheckP.append(answerCheckBox);
  answerCheck.append(answerCheckP);
  discussionAnswered.append(answerCheck);

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

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


// 질문하기 버튼 누르면 질문 form이 나오도록
const elQuestionBtn = document.querySelector('.questionBtn');
const elQuestionForm = document.querySelector('.form__container');
elQuestionBtn.onclick = function(){
  elQuestionForm.classList.toggle('hide') // 버튼 반복 (add, remove 둘 다의 기능)
};

// 폼 제출
const form = document.querySelector('form.form');
const title = document.querySelector('input#title')
const writer = document.querySelector('input#name')
const story = document.querySelector('textarea#story')
form.addEventListener('submit', (event) => {
  event.preventDefault(); // 새로고침 못하게
  // 하나의 객체를 만들어서 convetToDisxussion 함수에 넣어서 li로 만들고 ul 요소에 append 해주기
  const newDiscussion = {
    id: "unique value",
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: writer.value,
    answer: {
      id: "DC_kwDOHOApLM4AKg6M",
      createdAt: "2022-05-16T02:09:52Z",
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236",
      author: "Kingsenal",
      bodyHTML:
        '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/dubipy/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/dubipy">@dubipy</a> 님!<br>\n코드스테이츠 교육 엔지니어 권준혁 입니다. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<p dir="auto">질문 주신 내용은 노드 환경이 구성되어 있지 않기 때문에 발생되는 문제로 확인됩니다.</p>\n<p dir="auto"><code class="notranslate">brew unlink node &amp;&amp; brew link node</code></p>\n<p dir="auto">노드를 연결해 보시고 안된다면</p>\n<p dir="auto"><code class="notranslate">brew link --overwrite node</code></p>\n<p dir="auto">이 명령어를 그 다음에도 안된다면 접근권한 문제일 가능성이 큽니다.</p>\n<p dir="auto"><code class="notranslate">$ sudo chmod 776 /usr/local/lib</code> 접근 권한 변경 후<br>\n<code class="notranslate">$ brew link --overwrite node</code> 다시 연결을 해보세요 !</p>\n<p dir="auto">그럼에도 안된다면 다시 한 번 더 질문을 남겨주세요 !</p>\n<p dir="auto">답변이 되셨다면 내용을 간략하게 정리해서 코멘트를 남기고 answered를 마크해주세요 <g-emoji class="g-emoji" alias="white_check_mark" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2705.png">✅</g-emoji><br>\n감사합니다.<g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji><br>\n코드스테이츠 교육 엔지니어 권준혁</p>',
      avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    },
    bodyHTML: story.value,
    avatarUrl:
      "data:image/jpeg;base64,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",
  }
  ul.prepend(convertToDiscussion(newDiscussion)) // 앞에 추가
  title.value = "";
  writer.value = "";
  story.value = "";
});
