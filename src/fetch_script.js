// buddling code
require('./style.css');

const agoraStatesDiscussions = fetch('http://localhost:4000/discussions')
.then(res => res.json());

let currentPage = 1;
let res;

// cat
const cat = document.querySelector('#cat');
const body = document.querySelector('body');
body.addEventListener('click', e => {
  cat.style.display = 'block';
  cat.style.top = `${e.clientY}px`;
  cat.style.left = `${e.clientX}px`;
})

// pagenation
function renderPage(){
	let totalPage = Math.ceil(res.length / 10); // 전체 Page 개수
	let pageList = document.querySelector('#pageList'); // ul#pageList
	pageList.innerHTML = ''; // 태그 전체를 초기화 해야하기 때문에 innerHTML 사용

  // 이전 버튼
  const prev = document.createElement('li');
  prev.className = 'pageLi';
  prev.textContent = '<prev';
  prev.addEventListener('click', () => {
    if(currentPage > 1) {
      document.querySelector(`.num${currentPage}`).classList.remove('selected');
      currentPage--;
      document.querySelector(`.num${currentPage}`).classList.add('selected');
      ul.innerHTML = '';
      render(ul);
    }
  })
  pageList.appendChild(prev);
  
  // 전체 페이지 개수만큼 목록 구현
	for(let i = 1; i <= totalPage; i++){
		const li = document.createElement('li')	;
		li.className = 'pageLi';
    li.classList.add(`num${i}`);
		li.textContent = `${i}`
		li.addEventListener('click', (e) => {
      if(currentPage !== e.target.textContent){
        // 이전에 선택된 페이지 선택 토글
        document.querySelector(`.num${currentPage}`).classList.remove('selected');
        currentPage = e.target.textContent;
        // 이번에 선택된 페이지 선택 토글
        document.querySelector(`.num${currentPage}`).classList.add('selected');
        ul.innerHTML = '';
        render(ul);
      }
		})
		pageList.appendChild(li);
	}

  // 다음 버튼
  const next = document.createElement('li');
  next.className = 'pageLi';
  next.textContent = 'next>';
  next.addEventListener('click', () => {
    let totalPage = Math.ceil(res.length / 10);
    if(currentPage < totalPage) {
      document.querySelector(`.num${currentPage}`).classList.remove('selected');
      currentPage++;
      document.querySelector(`.num${currentPage}`).classList.add('selected');
      ul.innerHTML = '';
      render(ul);
    }
  })
  pageList.appendChild(next);
}

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
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.className = 'discussion__avatar--image';

  avatarWrapper.append(avatarImg);

  const title = document.createElement('h3');
  const title_a = document.createElement('a');
  title.className = 'discussion__title';
  title_a.href = obj.url;
  title_a.textContent = obj.title;
  title.append(title_a);

  const info = document.createElement('div');
  info.className = 'discussion__information';
  info.textContent = `${obj.author} ${obj.createdAt}`;

 discussionContent.append(title, info);
  
  const answered = document.createElement('div');
  const answered_p = document.createElement('p');
  answered.className = 'discussion__answered';

  !obj.answer ? answered_p.textContent = '☑' : answered_p.textContent = '☒';

  answered.append(answered_p);
  discussionAnswered.append(answered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
function render(element){
	let first = (currentPage - 1) * 10;
	let last = currentPage * 10;
	if(last > res.length) last = res.length;
	
	element.innerHTML = ''; // 요소 초기화 필수
	for (let i = first; i < last; i++) {
    		element.append(convertToDiscussion(res[i]));
  }

  return;
} 

// add Question
const summit = document.querySelector('.form__submit > input');
summit.addEventListener('click', (e)=>{
  e.preventDefault();

  const name = document.querySelector('#name');
  const title = document.querySelector('#title');
  const stroy = document.querySelector('#story');

  // 빈칸 경고문
  if(title.value === '' || name.value === '' || stroy.value === ''){
    alert('빈칸을 채우세요');
    return;
  }

  let time = '';
  const date = new Date();
  if(date.getHours() === 12) time += `오후 ${date.getHours()}:`;
  else (date.getHours() < 12) ? time += `오전 ${date.getHours()}:` : time += `오후 ${date.getHours() - 12}:`;

  (date.getMinutes() < 10) ? time += `0${date.getMinutes()}:` : time += `${date.getMinutes()}:`;
  (date.getSeconds() < 10) ? time += `0${date.getSeconds()}` : time += `${date.getSeconds()}`;

  const newQuestion = {
    id: '999',
    createdAt: time,
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: name.value,
    answer: {
      id: "DC_kwDOHOApLM4AKg6M",
      createdAt: "2022-05-16T02:09:52Z",
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236",
      author: "Kingsenal",
      bodyHTML:
        '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/dubipy/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/dubipy">@dubipy</a> 님!<br>\n코드스테이츠 교육 엔지니어 권준혁 입니다. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<p dir="auto">질문 주신 내용은 노드 환경이 구성되어 있지 않기 때문에 발생되는 문제로 확인됩니다.</p>\n<p dir="auto"><code class="notranslate">brew unlink node &amp;&amp; brew link node</code></p>\n<p dir="auto">노드를 연결해 보시고 안된다면</p>\n<p dir="auto"><code class="notranslate">brew link --overwrite node</code></p>\n<p dir="auto">이 명령어를 그 다음에도 안된다면 접근권한 문제일 가능성이 큽니다.</p>\n<p dir="auto"><code class="notranslate">$ sudo chmod 776 /usr/local/lib</code> 접근 권한 변경 후<br>\n<code class="notranslate">$ brew link --overwrite node</code> 다시 연결을 해보세요 !</p>\n<p dir="auto">그럼에도 안된다면 다시 한 번 더 질문을 남겨주세요 !</p>\n<p dir="auto">답변이 되셨다면 내용을 간략하게 정리해서 코멘트를 남기고 answered를 마크해주세요 <g-emoji class="g-emoji" alias="white_check_mark" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2705.png">✅</g-emoji><br>\n감사합니다.<g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji><br>\n코드스테이츠 교육 엔지니어 권준혁</p>',
      avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    },
    bodyHTML: stroy.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };


  res.unshift(newQuestion);
  
  ul.innerHTML= '';
  currentPage = 1; // 새로운 질문이 올라올 시 페이지 강제 초기화
  renderPage();
  render(ul);
  document.querySelector(`.num${currentPage}`).classList.add('selected');
})

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
agoraStatesDiscussions.then(data => {
  res = data;
  render(ul);
  renderPage();
  document.querySelector(`.num${currentPage}`).classList.add('selected');
})



