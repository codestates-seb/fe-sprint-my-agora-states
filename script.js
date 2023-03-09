// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
let index = 1;
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  // const objString = JSON.stringify(obj);
  // localStorage.setItem("objstorage",objString);
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // const numbering = document.createElement("span");
  // numbering.className="discussion__number";
  // numbering.textContent = index;
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //이미지 객체 추가 
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  //컨텐츠 객체 추가 (제목 ,제목 url)
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionTitleUrl = document.createElement("a");
  discussionTitleUrl.textContent = obj.title;
  discussionTitleUrl.href = obj.url;
  discussionTitle.append(discussionTitleUrl);
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = obj.author;
  discussionInfo.textContent += ' / ' +new Date(obj.createdAt).toLocaleString();
  discussionContent.append(discussionTitle,discussionInfo);
  // 답변 객체 추가 
  
  const discussionAns = document.createElement('i');
  // discussionAns.className ="fa-solid fa-check";
  if(obj.answer !== null){
    discussionAns.className ="fa-solid fa-check";
  }
  else{
    discussionAns.className = "fa-solid fa-xmark";
  }
  //아이콘 추가 수정해야함
  discussionAnswered.append(discussionAns);
  

  // if(index%10 === 0){
  //   const showMoreBtn = document.createElement("button");
  //   showMoreBtn.className ="showMore";
  //   showMoreBtn.textContent = "더보기";
  //   li.append(showMoreBtn);
  //   console.log("실행됨");
  // }
  //




  li.append(avatarWrapper, discussionContent, discussionAnswered);
  
  // return li;
  index++;

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
// const ul = document.querySelector("ul.discussions__container");
// render(ul);
// console.log(ul);

const form = document.querySelector('.form');
const author = document.querySelector('.form__input--name > input'); //input-name에 입력하는 input 요소들
const title = document.querySelector('.form__input--title > input'); //inp;ut-title에 입력하는 input 요소들
const textArea = document.querySelector('.form__textbox > textarea'); //form_textbox에 입력하는 질문 textarea 요소들
let newobj = JSON.parse(localStorage.getItem("objstorage"));
let localnum = 0;
// 함수form.addEventListener의 'submit'이벤트를 통해 각각의 데이터 정보를 -> 아래 form에 맞춰 리턴해라.
form.addEventListener('submit', (event) => {
  event.preventDefault(); //1)submit눌렀을때 새로고침되는걸 방지
  // const convertToDiscussion = (obj)/에 돌려줄 obj 객체를 하나 만든다.
  const obj ={
    id: "unique number",
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/baejb/fe-sprint-my-agora-states",
    author: author.value,
    answer: {
    id: "111",
    createdAt: "111",
    url: "111",
    author: "111",
    bodyHTML: textArea.value,
      avatarUrl: "111",
    },
    bodyHTML:textArea.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/82064490?s=400&u=9f590e40f0f357bc23e77008d2d0e5ce0ee3f3c0&v=4",
  };
  // const objString = JSON.stringify(obj);
  // localStorage.setItem("objstorage",objString);

  // let newobj = JSON.parse(localStorage.getItem("objstorage"));
  localnum ++;
  //만든 배열을 data더미의 배열에 추가해준다.(맨 앞 요소로)
  agoraStatesDiscussions.unshift(obj);
  //전체 데이터 더미를 ui로 append해준다(맨 앞으로->prepend)
  ul.prepend(convertToDiscussion(obj));
 
  //입력한 값을 submit에서 댓글창으로 append 되면 값을 초기화한다.
  author.value = "";
  title.value  = "";
  textArea.value = "";
  
});



const ul = document.querySelector("ul.discussions__container");
render(ul);
console.log(ul);