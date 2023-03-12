// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
let data;
const dataFromLocalStorage = localStorage.getItem("agoraStatesDiscussions");
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage);
} else {
  data = agoraStatesDiscussions.slice();
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); // div요소 생성
  avatarWrapper.className = "discussion__avatar--wrapper"; //클래스 이름 지정
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement("a");
  discussionLink.href = obj.url;
  discussionLink.textContent =obj.title;

  discussionTitle.append(discussionLink);
  



  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information"

  


  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

 
  

  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()} `

  if(answerCheck(obj)){
    discussionAnswered.textContent = "☒" // 답변이 없는경우
  } else {
    discussionAnswered.textContent = "☑" // 답변이 작성 된 경우
    discussionAnswered.className = "color";
  }


  discussionContent.append(discussionTitle, discussionInformation);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;

};





// 답변 유무 함수
const answerCheck = (obj) => {
  
  return obj.answer === null; // 답변이 없는가 ?
};


// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, from, to) => {
  console.log(from , to) ;
  if (!from && !to) {
    from = 0;
    to = data.length- 1;
  }
  // 다 지우고 배열에 있는 내용 다 보여주기 
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = from; i < to; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return ;
};



//페이지네이션을 위한 변수!
let limit = 4,
  page = 1;

// ul 요소에 data 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 0, limit);



const getPageStartEnd = (limit, page) => {
  const len = data.length -1;
  let pageStart = Number(page-1) * Number(limit);
  let pageEnd = Number(pageStart) + Number(limit);
  if(page <=0){
    pageStat = 0;
  } 
  if(pageEnd >= len) {
    pageEnd = len;
  }
  return {pageStart, pageEnd}; // page 시작과 끝을 리턴
};

const buttons = document.querySelector('.buttons');
// <- 이전 버튼을 클릭했을때 
buttons.children[0].addEventListener("click", ()=> {
  if (page > 1){ //페이지가 1보다 큰 페이지라면 (1이 제일 첫번째 페이지)
    page = page-1; // 이전 페이지로 넘어가 주세요 
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page); // 다음으로 넘어간 페이지로 시작 끝 점을 다시 선언
  render(ul, pageStart, pageEnd);  // 해당 페이지 data배열의 모든 요소를 화면에 렌더링
});
// -> 다음 페이지 버튼을 클릭 했을 때
buttons.children[1].addEventListener("click", () => {
  if(limit*page <data.length-1) {  // 데이터의 총 개수보다 limit*page 수가 적다면 다음페이지를 추가 생성 ..?
    page = page+1
  }
  const{pageStart, pageEnd} = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});

buttons.children[2].addEventListener("click", () => {
  localStorage.removeItem("agoraStatesDiscussions");
  data = agoraStatesDiscussions.slice();
  limit = 4;
  page = 1;
  render(ul, 0, limit);
});

//submit 버튼 눌렀을 때의 함수
const form = document.querySelector("form.form");
const title = document.querySelector("input#title");
const author = document.querySelector("input#name");
const story = document.querySelector("textarea#story")

form.addEventListener('submit', (event) => {
  event.preventDefault(); //새로고침 방지
  const newDicussion = {
    id: "unipue value",
    createdAt: new Date(),
    title: title.value,
    url: "https://github. com/codestates-seb/agora-states-fe/discussions/45",
    author: author.value,
    answer: {
      id: "DC_kwDOHOApLM4AKg6M",
      createdAt: "2022-05-16T02:09:52Z",
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236",
      author: "Kingsenal",
      bodyHTML:  '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/dubipy/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/dubipy">@dubipy</a> 님!<br>\n코드스테이츠 교육 엔지니어 권준혁 입니다. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<p dir="auto">질문 주신 내용은 노드 환경이 구성되어 있지 않기 때문에 발생되는 문제로 확인됩니다.</p>\n<p dir="auto"><code class="notranslate">brew unlink node &amp;&amp; brew link node</code></p>\n<p dir="auto">노드를 연결해 보시고 안된다면</p>\n<p dir="auto"><code class="notranslate">brew link --overwrite node</code></p>\n<p dir="auto">이 명령어를 그 다음에도 안된다면 접근권한 문제일 가능성이 큽니다.</p>\n<p dir="auto"><code class="notranslate">$ sudo chmod 776 /usr/local/lib</code> 접근 권한 변경 후<br>\n<code class="notranslate">$ brew link --overwrite node</code> 다시 연결을 해보세요 !</p>\n<p dir="auto">그럼에도 안된다면 다시 한 번 더 질문을 남겨주세요 !</p>\n<p dir="auto">답변이 되셨다면 내용을 간략하게 정리해서 코멘트를 남기고 answered를 마크해주세요 <g-emoji class="g-emoji" alias="white_check_mark" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2705.png">✅</g-emoji><br>\n감사합니다.<g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji><br>\n코드스테이츠 교육 엔지니어 권준혁</p>' ,
      avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    },
    bodyHTML:story.value,
    avatarUrl:
      "chen.png",
  };
  data.unshift(newDicussion);
  // ul.prepend(convertToDiscussion(newDicussion));



  localStorage.setItem("agoraStatesDiscussions", JSON.stringify(data));

  render(ul, 0, limit);

  title.value = "";
  author.value = "";
  story.value = "";
});


