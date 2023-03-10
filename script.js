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
  const avatarImage = document.createElement("img");
  avatarImage.className = 'discussion__avatar--image';
  avatarImage.src = obj.avatarUrl;
  // avatarImage.alt = 
  avatarWrapper.append(avatarImage);

  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const idTime = document.createElement("div");
  idTime.className = 'discussion__information';
  idTime.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionTitle, idTime);

  const checkanswered = document.createElement('p');
  checkanswered.textContent = obj.answer ? 'V' : 'X';
  discussionAnswered.append(checkanswered);


  const title = document.createElement('a');
  title.href = obj.url;
  title.textContent = obj.title;
  discussionTitle.append(title);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, from, to) => {
  for (let i = from; i < to; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
// render(ul);



//질문 올리기
//DOM을 데이터로
function questionStyle(){
  let newobj = {
    author : document.getElementById('name').value,
    title : document.getElementById('title').value,
    story : document.getElementById('story').value,
    createdAt: new Date().toLocaleString(),
    avatarUrl :"https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    alt : "no image",
  }
  return newobj;
}
//입력창에 서브밋하면 반영하기
let form = document.querySelector(".form");
form.addEventListener("submit", submitEvent);
function submitEvent(e){
  e.preventDefault(); //새로고침 안되게
  console.log('good');
  //unshift된 값이 계속 바뀌지 않고 쌓이도록 let 대신 const
  const newobj = questionStyle();
  agoraStatesDiscussions.unshift(newobj);

  console.log(agoraStatesDiscussions[0]);

  ul.prepend(convertToDiscussion(newobj));
  render(ul);
}


//검색기능
function search(){
  let code = document.querySelector('#search').value;
  // console.log(code);
  let discussionContainer = document.querySelectorAll('.discussion__container');
  let discussionTitle = document.getElementsByClassName('discussion__title');
  
  for (let i=0; i<agoraStatesDiscussions.length; i++){
    if(agoraStatesDiscussions[i].title.includes(code)){
      discussionContainer[i+1].style.display = 'flex'
      console.log(i, code);

    } else {
      discussionContainer[i+1].style.display = 'none';
    }
  }

  if(discussionTitle[0].firstChild.textContent.includes(code)){
    discussionContainer[0].style.display = 'flex';
  } else {
    discussionContainer[0].style.display = 'none';
  }
}

//페이지네이션
const btns = document.querySelector(".btns"); //버튼 담을 부모요소
const numOfContent = agoraStatesDiscussions.length + 1; //글 개수
const showContent = 10; //한 페이지당 글 개수
const maxPage = Math.ceil(numOfContent / showContent); //필요한 페이지 수
let page = 1; //현재페이지

function startAndLastPage(page){
  //첫 번째 콘텐츠
  //1p(0~9), 2p(10~19), 3p(20~29)
  let startContent = (page-1)*showContent; //(3페이지-1)*10 -> 20
  //마지막 콘텐츠
  let lastContent = startContent+showContent;
  //만들어진 페이지 범위 넘어가면 고정
  if(startContent<0){
    startContent = 0;
    lastContent = showContent;
  } else if (lastContent>numOfContent-1){ 
    lastContent = numOfContent-1;
    startContent = Math.floor(lastContent/10)*10;
  }
  return {startContent : startContent, lastContent : lastContent}
}

//이전페이지로
function beforePageEvent(){
  console.log('이전페이지 클릭');
  if(page < 2){
    page = 1;
  }else{
    page = page-1; //이전페이지로
  }
  let value = startAndLastPage(page);
  // console.log(value);
  let startContent = value.startContent;
  let lastContent = value.lastContent;
  console.log(startContent, lastContent);

  //앞에 render된 내용 삭제
  while (ul.firstChild) { 
    ul.removeChild(ul.firstChild);
  }
  
  render(ul, startContent, lastContent)
}
//다음페이지로
function nextPageEvent(){
  console.log('다음페이지 클릭');
  if(page > maxPage){
    page = maxPage
  }else{
    page = page+1; //다음페이지로
  }
  let value = startAndLastPage(page);
  // console.log(value);
  let startContent = value.startContent;
  let lastContent = value.lastContent;
  console.log(startContent, lastContent);

  //앞에 render된 내용 삭제
  while (ul.firstChild) { 
    ul.removeChild(ul.firstChild);
  }

  render(ul, startContent, lastContent)
}

render(ul, 0, showContent-1);

