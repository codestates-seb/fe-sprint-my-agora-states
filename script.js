const checkLsAsk = localStorage.getItem('newDiscussion');
if(checkLsAsk){
  const checkLsAskArr = JSON.parse(checkLsAsk);
  for(let i of checkLsAskArr){
    agoraStatesDiscussions.unshift(i);
  }
}
const setLocalStorage = (name, data)=>{

  let saveddata = localStorage.getItem('newDiscussion');
  if(saveddata){
    const parseSaved = JSON.parse(saveddata);
    localStorage.setItem(name,JSON.stringify([...parseSaved,data]))

  }else{
    localStorage.setItem(name,JSON.stringify([data]))
  }
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


  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.className = 'discussion__avatar--image'
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);
  //title
  const titleH2 = document.createElement('h2');
  titleH2.className = 'discussion__title';
  discussionContent.append(titleH2);
  const titleLink = document.createElement('a');
  titleLink.href = obj.url;
  titleLink.textContent = obj.title;
  titleH2.append(titleLink);
  //author, date
  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionInformation);
  //answer check
  // answerdP = obj.answer !==null ? '✔' : 'a'
  if(obj.answer !== null){
    const answeredP = document.createElement('p');
    answeredP.textContent = '✓';
    discussionAnswered.append(answeredP);
  }
  else{
    const answeredP = document.createElement('p');
    answeredP.textContent = '𐄂';
    discussionAnswered.append(answeredP);
  }

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
console.log(agoraStatesDiscussions);
render(ul);


const form = document.querySelector('.form');
const title = document.querySelector('#title');
const author = document.querySelector('#name');
const story = document.querySelector('#story');

form.addEventListener('submit',(event)=>{
  event.preventDefault();
 

  const newDiscussion = {
    id: "D_kwDOHOApLM4APjJi",
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
    bodyHTML: story.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };

  ul.prepend(convertToDiscussion(newDiscussion));
  title.value = '';
  author.value = '';
  story.value = '';

  setLocalStorage('newDiscussion',newDiscussion);
  loadList();
}) 

/* 페이지네이션 */
/* thisPage:현재 페이지 limit:한페이지에 보이는 list : li */
let thisPage = 1;
let limit = 5;
let list = document.querySelectorAll('.discussion__container');

function loadList(){
  /* 5 * (0) => 0 */
  // if(InputInser()){
  list = document.querySelectorAll('.discussion__container');
  // }
  let biginGet = limit * (thisPage - 1);
  /* 5 *1-1 => 4 */
  let endGet = limit * thisPage -1;
  /* 만약 글이 하나 더 추가되면?  */
  /* item=> 현재요소 key => index */
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

function listPage(){
  /* 41/5 => 페이지 수 */
  let count = Math.ceil(list.length / limit);
  document.querySelector('.listPage').innerHTML = '';
// 
  if(thisPage !== 1){
    let prev = document.createElement('li');
    prev.innerText = 'PREV';
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
    next.innerText = 'NEXT';
    next.setAttribute('onclick',"changePage(" +  (thisPage + 1) + ")");
    document.querySelector('.listPage').appendChild(next);
  }
}

function changePage(i){
  thisPage = i;
  loadList();
}


let observer = new IntersectionObserver((e)=>{
  e.forEach((x)=>{
    if(x.isIntersecting){
      x.target.style.opacity = 1;
    }
    else{
      x.target.style.opacity = 0;
    }
  })
});
const Section1 = document.querySelector('.form__container');
const Section2 = document.querySelector('.discussion__wrapper');
observer.observe(Section1);
observer.observe(Section2);