// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  console.log(agoraStatesDiscussions[1]);

  const avatarWrapper = document.createElement("div");  
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement('img');
  avatarImg.className="discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  


  const discussionContent = document.createElement("div");
  const discussionTitle = document.createElement('h3');
  const discussionTitleA=document.createElement('a');
  const discussionAnswer=document.createElement('div');
  discussionContent.className = "discussion__content";
  discussionTitle.className="discussion__title";
  discussionAnswer.className="discussion__information";
  discussionContent.append(discussionTitle);
  discussionTitle.append(discussionTitleA);
  discussionTitleA.href=obj.url;
  discussionTitleA.textContent=obj.title;
  discussionContent.append(discussionAnswer);
  discussionAnswer.textContent=`${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  


  const discussionAnswered = document.createElement("div");
  const discussionParram=document.createElement('p');
  discussionAnswered.className = "discussion__answered";
  discussionAnswered.append(discussionParram);
  discussionParram.textContent=!(obj.answer)?"x":"O";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  
  
  const ul = document.querySelector('ul.discussions__container');

  
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    ul.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

const form = document.querySelector('form.form');
const title=document.querySelector('input#title');
const author=document.querySelector('input#name');
const story=document.querySelector('textarea#story')
form.addEventListener('submit',(event)=>{
  event.preventDefault();
  const newDiscussion={
    id: "unix",
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
      story.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  ul.prepend(convertToDiscussion(newDiscussion));

  const cpydis=JSON.stringify(newDiscussion);
  window.localStorage.setItem('obj',cpydis);
  console.log(window.localStorage.getItem('obj'));
  
  title.value="";
  author.value="";
  story.value=""
})
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
const addData = () => {
  //localstorage에 key: dataList, value: data가 있으면 불러오고 없으면 [] 빈 배열을 할당
	const dataArray = JSON.parse(localStorage.getItem("dataList")) || []; 
    dataArray.push(newDiscussion) //data는 추가할 데이터 객체
  	localStorage.setItem("dataList", JSON.stringify(dataArray));
}
