// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// 어디서 정의 했는지 질문할것
console.log(agoraStatesDiscussions.slice());

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

  // 첫번째 아바타
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarWrapper.append(avatarImg);  

  // 두번째 텍스트 타이틀
  const titleH = document.createElement("h2");
  titleH.className = "discussion__title";
  const titleA = document.createElement("a");
  titleA.href = obj.url;
  titleA.textContent = obj.title;
  titleH.append(titleA);
   //주석
   const info = document.createElement('div');
   info.className = "discussion__information";
   info.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
   titleH.append(info);
  discussionContent.append(titleH);

  //3번째 박스 
  const ox = document.createElement('p');
  ox.textContent = obj.answer ? "☑": "X";

  discussionAnswered.append(ox);


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


const form1 = document.querySelector(".form");
const Ename = document.querySelector(".form__input--name > input ");
const Etitle = document.querySelector(".form__input--title >input");
const Equest = document.querySelector(".form__textbox > textarea");

form1.addEventListener("submit",(event)=>{
  event.preventDefault();
  
  
  const obj1 = {
    id: "new idea",
    createdAt: new Date(),
    title: Etitle.value,
    url: "",
    author: Ename.value,
    answer: null
    ,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",


  }
  agoraStatesDiscussions.unshift(obj1);
  ul.prepend(convertToDiscussion(obj1));
  console.log(Etitle.value);



})
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
