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
//아바타
const avatarImg = document.createElement("img");
avatarImg.className = "discussion__avatar--image";
avatarImg.src = obj.avatarUrl;
avatarImg.alt = "avatar of" + obj.author;
avatarWrapper.append(avatarImg);

// 타이틀
const retitle = document.createElement('h2');
const retitleLink = document.createElement('a'); // a 태그 링크 때문에 변수 두개 지정
retitleLink.href = obj.url;
retitleLink.textContent = obj.title; 
retitle.append(retitleLink);
discussionContent.append(retitle);

// 날짜 
const disinfo = document.createElement('div');
disinfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`
// date 객체는 new 연산과 꼭 함꼐 써야한다

discussionContent.append(retitle, disinfo);

// 체크박스
const checked = document.createElement('p');
checked.textContent = obj.answer ? '☑︎' : '☒'; // 답변이 있는 경우 o 없으면 x
checked.style.color = obj.answer ? "#00927a" : "#e90f6a"; // 컬러
discussionAnswered.append(checked);


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
render(ul);


// 타이피
new TypeIt("#simpleUsage", {
  strings:"My AGORA states.",
  speed: 300,
  waitUntilVisible: true,
}).go();

// 서밋
const form = document.querySelector('.form')

form.addEventListener('submit', (event) => {
  event.preventDefault(); // submit이 되는 순간 페이지 리로드를 막기 위해 사용한다
const inputName = document.querySelector('#name')
const inputTitle = document.querySelector('#title')
const inputStory = document.querySelector('#story')

  const obj_1 = {
    id: 'new id',
    title: inputTitle.value,
    author: inputName.value,
    bodyHTML: inputStory.value,
    createdAt: new Date().toISOString(),
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
  }

  agoraStatesDiscussions.unshift(obj_1); // 기존 디스커션에 언시프트로 객체 추가
  const discussion = convertToDiscussion(obj_1);
  ul.prepend(discussion); // ul의 첫번째 요소에 discussion을 추가한다
})