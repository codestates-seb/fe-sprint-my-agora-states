// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// 배열 속 n번째 객체의 데이터 값을 가져오기 위해 n를 0으로 설정하고 함수가 끝날 때마다 1씩 증가하도록
let n = 0;

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
  const answer = document.createElement("div");
  answer.className = "answer";



  // avatarWrapper
    const avatarImg = document.createElement("img");
    avatarImg.className = "discussion__avatar--image";
    avatarImg.src = obj['avatarUrl'];
    avatarImg.alt = 'avatar of ' + obj['author'];
    avatarWrapper.append(avatarImg);


  // discussionContent - 제목
    // <h2>를 만들어 변수 discussionTitle에 할당한다.
    const discussionTitle = document.createElement("h2");
    // <h2>의 클래스 네임으로 discussion__title 을 붙여준다
    discussionTitle.className = "discussion__title";
    // <a>를 만들어 변수 discussionTitleLink에 할당한다.
    const discussionTitleLink = document.createElement("a");
    // discussionTitle에 discussionTitleLink를 append한다.
    discussionTitle.append(discussionTitleLink);
    // <a>의 href에 obj['url'] 값을 할당한다.
    discussionTitleLink.href = obj['url'];
    // discussioTitle의 textContent를 obj['title']
    discussionTitleLink.textContent = obj['title'];
    // discussionTitle을 discussionContent에 append
    discussionContent.append(discussionTitle);


  // discussionContent - 닉네임과 게시일
    // <div>를 만들어 변수 discussionInfo에 할당한다
    const discussionInfo = document.createElement("div");
    // <div>의 클래스 네임으로 discussion__information 을 붙여준다
    discussionInfo.className = "discussion__information";
    // discussionInfo의 textContent를 obj['author'] + ' / ' + obj['createdAt']
    discussionInfo.textContent = `${obj['author']} / ${new Date(obj['createdAt']).toLocaleString()}`
    // discussionInfo를 discussionContent에 append
    discussionContent.append(discussionInfo);


  // discussionAnswered
    // 답변이 있을 때만 즉, obj['answer']가 true일 때만
    // if(obj['answer']) {
  
    // }
  
  // 만약 답변이 있다면, 답변도 화면에 렌더링
  /*
  answer: {
    id: "DC_kwDOHOApLM4AKg6M",
    createdAt: "2022-05-16T02:09:52Z",
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236",
    author: "Kingsenal",
    bodyHTML:
      '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/dubipy/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/dubipy">@dubipy</a> 님!<br>\n코드스테이츠 교육 엔지니어 권준혁 입니다. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<p dir="auto">질문 주신 내용은 노드 환경이 구성되어 있지 않기 때문에 발생되는 문제로 확인됩니다.</p>\n<p dir="auto"><code class="notranslate">brew unlink node &amp;&amp; brew link node</code></p>\n<p dir="auto">노드를 연결해 보시고 안된다면</p>\n<p dir="auto"><code class="notranslate">brew link --overwrite node</code></p>\n<p dir="auto">이 명령어를 그 다음에도 안된다면 접근권한 문제일 가능성이 큽니다.</p>\n<p dir="auto"><code class="notranslate">$ sudo chmod 776 /usr/local/lib</code> 접근 권한 변경 후<br>\n<code class="notranslate">$ brew link --overwrite node</code> 다시 연결을 해보세요 !</p>\n<p dir="auto">그럼에도 안된다면 다시 한 번 더 질문을 남겨주세요 !</p>\n<p dir="auto">답변이 되셨다면 내용을 간략하게 정리해서 코멘트를 남기고 answered를 마크해주세요 <g-emoji class="g-emoji" alias="white_check_mark" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2705.png">✅</g-emoji><br>\n감사합니다.<g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji><br>\n코드스테이츠 교육 엔지니어 권준혁</p>',
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
  },
  */

    if(obj['answer']) {
          // <p>를 만들어 변수 checkBox에 할당한다.
          const checkBox = document.createElement("p");
          // discussionAnswered에 checkBox를 append한다
          discussionAnswered.append(checkBox);
          // checkBox의 textContent를 ☑
          checkBox.textContent = `Answered by ${obj['answer']['author']}`

      // avatarWrapper
      
        const avatarImg = document.createElement("img");
        avatarImg.className = "discussion__avatar--image";
        avatarImg.src = obj['answer']['avatarUrl'];
        avatarImg.alt = 'avatar of ' + obj['answer']['author'];
        answer.append(avatarImg);


      // discussionContent - bodyHTML 내용
        // <div>를 만들어 변수 answerContent에 할당한다.
        const answerContent = document.createElement("div");
        answerContent.className = "discussion__answer";
        // answerContent.classList.add("discussion__answer");
        // answerContent에 obj['answer']['bodyHTML'] 내용 추가
        answerContent.innerHTML = obj['answer']['bodyHTML'];
        // answerContent을 discussionContent에 append    
        answer.append(answerContent);



      // discussionContent - 닉네임과 게시일
        // <div>를 만들어 변수 discussionInfo에 할당한다
        const discussionInfo = document.createElement("div");
        // <div>의 클래스 네임으로 discussion__information 을 붙여준다
        discussionInfo.className = "discussion__information";

        // discussionInfo의 textContent를 obj['author'] + ' / ' + obj['createdAt']
        discussionInfo.textContent = `${obj['answer']['author']} / ${new Date(obj
          ['answer']['createdAt']).toLocaleString()}`
        // discussionInfo를 discussionContent에 append
        answer.append(discussionInfo);

    }
    
// 답변도 하나의 개별적인 li 였으면 좋겠는데 현재 상태는 질문+답변이 하나의 li인 상태
  li.append(avatarWrapper, discussionContent, discussionAnswered, answer);
  return li;

};

const form = document.querySelector('form.form');
const title = document.querySelector('div.form__input--title  > input')
const name = document.querySelector('div.form__input--name > input')
const textbox = document.querySelector('div.form__textbox > textarea')

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  let newObj = {
    id: 'unique id',
    createdAt: new Date().toLocaleString,
    title: title.value,
    
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    bodyHTML: textbox.value,
    answer: null,
    author: name.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    }


  agoraStatesDiscussions.unshift(newObj);
  const NewDiscussion = convertToDiscussion(newObj)
  ul.prepend(NewDiscussion)

});



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





