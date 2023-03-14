// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
const storageData = localStorage.getItem('agoraStatesDiscussions');
const storageDataArray = JSON.parse(storageData);

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
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;

  avatarWrapper.append(avatarImg);

  const discusstitle = document.createElement("h3");
  discusstitle.className = "discussion__title";
  const discusstitleurl = document.createElement("a");
  discusstitleurl.href = obj.url;
  discusstitleurl.textContent = obj.title;
  discusstitle.append(discusstitleurl);

  const discussinformation = document.createElement("div");
  discussinformation.className = "discussion__information";
  discussinformation.textContent = `${obj.author}/${obj.createdAt}`;

  discussionContent.append(discusstitle, discussinformation);

  discussionAnswered.textContent = "☑";

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
// 페이징
let totalpage = Math.ceil(storageDataArray.length / 10); //총 페이지 수

// 총 페이지 수 렌더링
const pageul = document.querySelector("ul.pageul");
for (let i = 1; i <= totalpage; i++) {
  const pageli = document.createElement("li");
  pageli.className = "page";
  pageli.textContent = `${i}`;
  pageul.append(pageli);
}

// 몇번째 페이지가 클릭되었는지 반환하는 함수
pageul.addEventListener("click", (e) => {
  const nodes = [...e.target.parentElement.children];
  const index = nodes.indexOf(e.target);
  render(ul, index);
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, index) => {
  if (index == undefined) {
    index = 0;
  }
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = index * 10; i <= index * 10 + 9; i += 1) {
    if (i == storageDataArray.length) {
      //최종 게시글까지 렌더링 차례가 되면 for문중지
      break;
    }
    element.append(convertToDiscussion(storageDataArray[i]));
  }
  return;
};

render(ul, 0);

// 객체에 추가해주기 with localStorage
// localStorage
// 1. 기존 data를 localStorage에 저장
// 저장 이전에 기존에 localstorage에 값이 있는지부터 확인.
if(storageData===null){ // 만약 localStorage에 값이 없다면 그때 값 추가.
  const arrString = JSON.stringify(agoraStatesDiscussions);
  window.localStorage.setItem('agoraStatesDiscussions',arrString);
}


const form = document.querySelector(".form");
form.addEventListener("submit", function (e) {
  //e.preventDefault();
  let name = document.querySelector("#name");
  let namevalue = name.value;
  let title = document.querySelector("#title");
  let titlevalue = title.value;
  let story = document.querySelector("#story");
  let storyvalue = story.value;
  const newobj = {
    id: "RandomValue",
    createdAt: "2022-04-27T08:21:48Z",
    title: titlevalue,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/12",
    author: namevalue,
    answer: {
      id: "DC_kwDOHOApLM4AKFvQ",
      createdAt: "2022-04-27T08:43:27Z",
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/12#discussioncomment-2644944",
      author: "Kingsenal",
      bodyHTML:
        '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/bruadarach/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/bruadarach">@bruadarach</a> 님!<br>\n코드스테이츠 교육 엔지니어 권준혁 입니다. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<p dir="auto">질문 주신 내용은  NaN이 어째서 true로 빠지지 않고 false로 가는지에 대한 의문점이 생기셔서 주신 질문으로 확인되어지는데요 !</p>\n<p dir="auto">너무나도 좋은 질문이라고 생각되어집니다 .</p>\n<p dir="auto">콘솔창에 NaN === NaN 을 입력해보시면 어떤 결과가 나오는지 알고 계신가요 ?<br>\n신기하게도 false가 출력됩니다 !</p>\n<p dir="auto">즉, anything === NaN은 false입니다.</p>\n<p dir="auto">아래 MDN 문서에 자세하게 설명 되어 있으니 한 번 읽어보시길 추천드립니다 !</p>\n<p dir="auto"><a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/NaN" rel="nofollow">NaN</a></p>\n<p dir="auto">결국 NaN을 판별하기 위해서는 NaN을 판별하는 다른 함수가 필요합니다 !<br>\nMDN에도 판별 함수가 적혀져 있지만<br>\nhow to know if a variable is NaN in javascript 라는 검색어로 구글링으로 한 번 찾아보시는 것도 좋을 것 같습니다 !</p>\n<p dir="auto">답변이 되셨다면 내용을 간략하게 정리해서 코멘트를 남기고 answered를 마크해주세요 <g-emoji class="g-emoji" alias="white_check_mark" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2705.png">✅</g-emoji><br>\n감사합니다.<g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji><br>\n코드스테이츠 교육 엔지니어 권준혁</p>',
      avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    },
    bodyHTML: `${storyvalue}`,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/55401378?s=64&u=9ef138579365bd13856792f624c418cf760453f3&v=4",
  };

  //agoraStatesDiscussions.push(newobj);
  // 2. localStorage의 value값을 가져옴+push로 값 추가
  let prevData = JSON.parse(localStorage.getItem('agoraStatesDiscussions'));
  prevData.push(newobj);

  // 3. 추가된 data를 문자열로 바꾼 뒤 다시 localStorage에 등록
  localStorage.setItem('agoraStatesDiscussions', JSON.stringify(prevData));
  
  name.value = "";
  title.value = "";
  story.value = "";
  alert("등록 완료되었습니다");
  
});



