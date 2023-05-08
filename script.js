
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
  
  
  // discussionContent 내부 설정

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.className = 'discussion__avatar--image'
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);

  // 제목 가져오기
  const discussionTitle = document.createElement('h3');
  discussionTitle.className = 'discussion__title';
  discussionContent.append(discussionTitle);

  // 제목 링크 설정
  const discussionTitleLink = document.createElement('a');
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink);

  // 본문 가져오기
  const discussionInfo = document.createElement('div');
  discussionInfo.className = 'discussion__information';
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionInfo);

  // 답변 여부 가져오기
  const discussionAnswer = document.createElement('p');
  discussionAnswer.textContent = obj.answer ? 'O' : 'X';
  discussionAnswered.append(discussionAnswer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;

  
};


// 폼에 새로운 내용 입력시 객체 추가되어 질문 화면에 출력하기
const inputForm = document.querySelector(".form")
const inputName = document.querySelector("#name") // 작성자
const inputTitle = document.querySelector("#title") // 제목
const inputStory = document.querySelector("#story") // 내용

inputForm.addEventListener("submit", (event) => {
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


  const totalPages = Math.ceil(agoraStatesDiscussions.length / limit);
  if (thisPage === totalPages) {
    // 현재 페이지가 마지막 페이지인 경우 다음 페이지로 이동
    changePage(totalPages + 1);
  } else {
    loadList();
  }
});


const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

/* 페이지네이션 */

/* thisPage:현재 페이지 limit:한페이지에 보이는 list : li */
let thisPage = 1;
let limit = 8;
let list = document.querySelectorAll('.discussion__container');

function loadList(){
  list = document.querySelectorAll('.discussion__container');

  // 현재 페이지에서 보여줄 첫 번째 글 인덱스 계산
  let biginGet = limit * (thisPage - 1);

  // 현재 페이지에서 보여줄 마지막 글의 인덱스를 계산 
  let endGet = limit * thisPage -1;
  
  /* 글이 하나 더 추가될 때  */

  /* item: 현재요소 key: index */

  // 현재 페이지에서 보여줄 글만 화면에 표시
  list.forEach((item,key)=>{
    if(key >= biginGet && key <= endGet){
      item.style.display = 'flex';
    }else{
      item.style.display = 'none';
    }
  })
  listPage();
}
loadList();


// 현재 페이지 번호와 전체 페이지 수를 나타내는 페이지 번호 링크를 생성
function listPage(){
  /* 41/8 => 페이지 수 */
  let count = Math.ceil(list.length / limit);
  document.querySelector('.listPage').innerHTML = '';
// 
  if(thisPage !== 1){
    let prev = document.createElement('li');
    prev.innerText = '<';
    prev.setAttribute('onclick',"changePage(" +  (thisPage - 1) + ")");
    document.querySelector('.listPage').appendChild(prev);
    }

    //페이지 count 구성
  for(let i=1; i <= count; i++){
    let newPage = document.createElement('li');
    newPage.innerText = i;
    if(i === thisPage){
      newPage.classList.add('active');
    }
    newPage.setAttribute('onclick',"changePage(" +  i + ")");
    document.querySelector('.listPage').appendChild(newPage);
  }

  if(thisPage !== count){
    let next = document.createElement('li');
    next.innerText = '>';
    next.setAttribute('onclick',"changePage(" +  (thisPage + 1) + ")");
    document.querySelector('.listPage').appendChild(next);
  }
}

function changePage(i){
  thisPage = i;
  loadList();
}


// 필터링 기능
