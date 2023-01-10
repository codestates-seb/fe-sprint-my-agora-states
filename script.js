// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
let data;
const dataFromLocalStorage = localStorage.getItem('agoraStatesDiscussions')
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage)
} else {
  data = agoraStatesDiscussions.slice()
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  // 함수의 목적: li요소 안에 있는 하위요소들을 새로 만듬
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImage = document.createElement("img");
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = 'avartar of ' + obj.author;
  avatarWrapper.append(avatarImage);

  const discussionTitle = document.createElement("h2");
  const TitleHref = document.createElement("a");
  TitleHref.textContent = obj.title;
  TitleHref.href = obj.url;
  discussionContent.append(TitleHref);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
    ).toLocaleString()}`; //현지 시간에 맞게 표현 (ex. 오전 10:02:17)
  discussionContent.append(discussionTitle, discussionInfo);

  const check = document.createElement("p");
  obj.answer !== null ? check.textContent = "✔" : check.textContent = "✘";
  discussionAnswered.append(check);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// data 배열의 모든 데이터를 화면에 렌더링하는 함수.
const render = (element, from, to) => {
  console.log(from, to)
  if(!from && !to){
    from = 0; to = data.length-1;
  }
  // 다 지우고 배열에 있는 내용 다 보여주기
  while(element.firstChild){
    element.removeChild(element.firstChild);
  }
  for(let i = from; i < to; i++){
    element.append(convertToDiscussion(data[i]));
  }
   return;
};

  // 페이지네이션을 위한 변수
  let limit = 10; page = 1;

  // ul 요소에 data 배열의 모든 데이터를 화면에 렌더링한다.
  const ul = document.querySelector("ul.discussions__container");
  render(ul, 0, limit);

  const getPageStartEnd = (limit, page) => {
    const len = data.length - 1
    let pageStart = Number(page-1) * Number(limit);
    let pageEnd = Number(pageStart) + Number(limit);
    if(page <= 0){
      pageStart = 0;
    }
    if(pageEnd >= len){
      pageEnd = len
    }
    return { pageStart, pageEnd }
  };


  const buttons = document.querySelector('.buttons');
  buttons.children[0].addEventListener('click',(event)=>{
    if(page > 1){
      page = page - 1;
    }
    const {pageStart, pageEnd} = getPageStartEnd(limit,page)
    render(ul, pageStart, pageEnd);
  })

  buttons.children[1].addEventListener('click',()=>{
    if((limit * page) < data.length - 1){
      page = page + 1;
    }
    const {pageStart, pageEnd} = getPageStartEnd(limit, page)
    render(ul, pageStart, pageEnd);
  })
  // reset 로컬스토리지
  // buttons.children[2].addEventListener('click', ()=>{
  //   localStorage.removeItem('agoraStatesDiscussions');
  //   data = agoraStatesDiscussions.slice();
  //   limit = 10; page = 1;
  //   render(ul, 0, limit)
  // })
// // 디스커션 추가 기능 구현, `section.form__container` 요소에 새로운 아고라 스테이츠 질문을 추가할 수 있는 입력 폼을 제작
// //`agoraStatesDiscussions` 배열에 추가한 데이터가 실제 쌓여야 합니다.

// 문서 내용 확인
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

// 문서 내용 제출
form.addEventListener("submit", (event) => { 
  event.preventDefault(); //넣어야하는 이유? 지우면 생겼다 다시 사라짐.. submit 됨과 동시에 창이 새로고침 되기 때문에 다시 초기 화면으로 돌아오게 됨. preventDefault로 방지할 수 있음.

  //새로운 객체를 만들어야 한다.
  //input에 입력된 값(value)를 넣은 새로운 객체.
  //새로운 객체를 ui요소 아래로 넣어준다.
  //더미 데이터(agoraStatesDiscussions)에도 추가해준다.(배열안에 앞으로 추가)  
  const obj = {
      id: "unique id",
      createdAt: new Date().toISOString, //event가 발생한 시각이 기록됨
      title: title.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: author.value,
      answer: null,
      bodyHTML: textbox.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    };
  data.unshift(obj); //더미데이터의 맨 앞에 추가

  // 로컬 스토리지에 저장

  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(data))

  // 렌더링
  render(ul, 0 , limit);
})
