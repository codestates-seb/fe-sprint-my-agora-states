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

  /* 프로필 이미지 */
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  /* 질문 타이틀 = title */
  const discussionTitle = document.createElement('h2');
  discussionContent.append(discussionTitle);
  /* 질문 링크 = a */
  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  discussionTitle.append(titleLink);

  /* 정보 */
  const discussionInfo = document.createElement("div");
  // contentInformation.className = "discussion__information";
  // contentInformation.textContent = obj.author;
  // new Date() -> Fri Mar 10 2023 09:00:00 GMT+090(현재날짜,시간)
  // toLocaleString() -> 2023. 03. 10 오전 09: 00: 00 
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}` // 날짜 표현 형식이 여러개가 있는데 이걸 제일 많이  쓴다
  discussionContent.append(discussionTitle, discussionInfo);


  /* 체크박스 */
  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "✅" : "❎";
  discussionAnswered.append(checked);

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

// 폼에 새로운 내용 입력시 객체 추가되어 질문 화면에 출력하기
const inputform = document.querySelector("form.form")
const inputName = document.querySelector("#name") // 작성자
const inputTitle = document.querySelector("#title") // 제목
const inputStory = document.querySelector("#story") // 내용

inputform.addEventListener("submit", (event) => {
  event.preventDefault(); // 새로고침 방지
  const newDiscussions = { 
    id: 'id', 
    createdAt: new Date(),
    title: inputTitle.value,
    url: "http://www.naver.com",
    author: inputName.value,
    answer: {
      id: "DC_kwDOHOApLM4AKg6M",
      createdAt: "2022-05-16T02:09:52Z",
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236",
      author: "Kingsenal",
      bodyHTML:
        '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/dubipy/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/dubipy">@dubipy</a> 님!<br>\n코드스테이츠 교육 엔지니어 권준혁 입니다. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<p dir="auto">질문 주신 내용은 노드 환경이 구성되어 있지 않기 때문에 발생되는 문제로 확인됩니다.</p>\n<p dir="auto"><code class="notranslate">brew unlink node &amp;&amp; brew link node</code></p>\n<p dir="auto">노드를 연결해 보시고 안된다면</p>\n<p dir="auto"><code class="notranslate">brew link --overwrite node</code></p>\n<p dir="auto">이 명령어를 그 다음에도 안된다면 접근권한 문제일 가능성이 큽니다.</p>\n<p dir="auto"><code class="notranslate">$ sudo chmod 776 /usr/local/lib</code> 접근 권한 변경 후<br>\n<code class="notranslate">$ brew link --overwrite node</code> 다시 연결을 해보세요 !</p>\n<p dir="auto">그럼에도 안된다면 다시 한 번 더 질문을 남겨주세요 !</p>\n<p dir="auto">답변이 되셨다면 내용을 간략하게 정리해서 코멘트를 남기고 answered를 마크해주세요 <g-emoji class="g-emoji" alias="white_check_mark" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2705.png">✅</g-emoji><br>\n감사합니다.<g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji><br>\n코드스테이츠 교육 엔지니어 권준혁</p>',
      avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    },
    bodyHTML: inputStory.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
  };
  ul.prepend(convertToDiscussion(newDiscussions))

  // 질문 만들어지면 공백처리
  inputName.value = '';
  inputTitle.value = '';
  inputStory.value = '';

});

// 버튼 클릭 시 상단 이동
const topBtn = document.querySelector("#to-top");

topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });  
}

// // 입력폼의 요소들을 가져와서 객체에 내용을 채운다.
  // const name = document.querySelector("#name");
  // const title = document.querySelector("#title");

  // const obj = {
  //   id: "temporaryId",
  //   title: title.value,
  //   author: name.value,
  //   createdAt: new Date().toLocaleDateString()
  // }

  // // 기존에 있던 디스커션 배열의 앞에 객체를 넣어준다.
  // agoraStatesDiscussions.unshift(obj);

  // // 배열에 넣은 객체를 함수에 인자로 전달해 화면에 추가한다.
  // const newDiscussion = convertToDiscussion(agoraStatesDiscussions[0]);
  // ul.prepend(newDiscussion);
  
  // const help = document.createElement('material-symbols-outlined');
  // const view = document.createElement('form__container');

  // help.onclick = function () {
  //   view.style.display = 'block';
  // }

 