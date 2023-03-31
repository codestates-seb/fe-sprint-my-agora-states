// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {//객체를 매개변수로 받음
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
 //.1 아바타 영역
const avartarImg = document.createElement("img");
avartarImg.className = "discussion__avatar--image";
avartarImg.src = obj.avatarUrl;
avatarWrapper.alt = "avatar of " + obj.author;
avatarWrapper.append(avartarImg);

//2.콘텐츠영역
//2-1 제목
const contentTitle = document.createElement('h2');
const titleAnchor = document.createElement('a')
contentTitle.className = "disscussion__title"
titleAnchor.textContent = obj.title;
titleAnchor.href = obj.url;

contentTitle.append(titleAnchor)
//2-2정보
const contentInfo = document.createElement('div');
contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
contentInfo.className = "discussion__information"
discussionContent.append(contentTitle,contentInfo);


 //3.체크박스
const checked = document.createElement('p');
checked.textContent = obj.answer ? "☑" : "☒";

discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

//이벤트 리스너 
const form = document.querySelector('.form')
const author = document.querySelector('.form__input--name > input');
const title = document.querySelector('.form__input--title > input');
const textArea = document.querySelector('.form__textbox > textarea')

form.addEventListener('submit' , (event) => {
  event.preventDefault();
//객체를 하나 만든다

const obj = {
  id: "unique numberi",
  createdAt: new Date(),
  title: title.value,
  url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
  author: author.value,
  bodyHTML: textArea.value,
  answer: {
    id: "DC_kwDOHOApLM4AKg6M",
    createdAt: "2022-05-16T02:09:52Z",
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236",
    author: "Kingsenal",
    bodyHTML:
      '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/dubipy/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/dubipy">@dubipy</a> 님!<br>\n코드스테이츠 교육 엔지니어 권준혁 입니다. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<p dir="auto">질문 주신 내용은 노드 환경이 구성되어 있지 않기 때문에 발생되는 문제로 확인됩니다.</p>\n<p dir="auto"><code class="notranslate">brew unlink node &amp;&amp; brew link node</code></p>\n<p dir="auto">노드를 연결해 보시고 안된다면</p>\n<p dir="auto"><code class="notranslate">brew link --overwrite node</code></p>\n<p dir="auto">이 명령어를 그 다음에도 안된다면 접근권한 문제일 가능성이 큽니다.</p>\n<p dir="auto"><code class="notranslate">$ sudo chmod 776 /usr/local/lib</code> 접근 권한 변경 후<br>\n<code class="notranslate">$ brew link --overwrite node</code> 다시 연결을 해보세요 !</p>\n<p dir="auto">그럼에도 안된다면 다시 한 번 더 질문을 남겨주세요 !</p>\n<p dir="auto">답변이 되셨다면 내용을 간략하게 정리해서 코멘트를 남기고 answered를 마크해주세요 <g-emoji class="g-emoji" alias="white_check_mark" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2705.png">✅</g-emoji><br>\n감사합니다.<g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji><br>\n코드스테이츠 교육 엔지니어 권준혁</p>',
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4"
}
}
agoraStatesDiscussions.unshift(obj)
const comment = convertToDiscussion(obj)
// console.log(agoraStatesDiscussions)
//그 객체를 convertTodiscussion에 넣어서 DOM으로 변환
//렌더의 함수에 넣어서 브라우저에 렌더링 -->맨 앞으로
ul.prepend(comment);
// comment.title.value = "";
// comment.author.value = " ";
// comment.textArea.value =" ";

})

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    //i번째 convertToDiscussion요소를 ul에 append
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
