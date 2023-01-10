// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// obj === data.js
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");//아바타 그림
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");//제목, 질문, 날짜
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");//답변여부
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //아래 각 게시자 아바타 호출 및 구현
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl; // obj 값으로 변환하여 사진 넣어주기
  avatarImg.alt = 'avatar of ' + obj.author; // obj값으로 변환하여 사진 넣어주기
  avatarWrapper.append(avatarImg);
  
// 아래 게시글 타이틀 호출하여 구현
  const discussionTitle = document.createElement("h3");
  discussionTitle.className = "discussion__title";
  discussionContent.append(discussionTitle);

  const discussionInTitle = document.createElement("a");
  discussionInTitle.href = obj.url;
  discussionTitle.append(discussionInTitle);
  discussionInTitle.append(obj.title);

// 아래 게시자 아이디와 날짜 표시 구현
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionContent.append(discussionInformation);
  discussionInformation.append(`${obj.author} / ${obj.createdAt}`);

// 아래 체크박스 내용에 따라 빈 체크박스와 체크박스 구현
  const discussionAnsweredIn = document.createElement("p");
  discussionAnswered.append(discussionAnsweredIn);
  if ( obj.answer === null){
   discussionAnsweredIn.append('☐');
  }else if(obj.answer){
   discussionAnsweredIn.append('☑');
   discussionAnsweredIn.href = obj.answer[3]; // 체크박스를 클릭하면 답변으로 링크넘어가는 기능. 하고싶음
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
render(ul);

// 문서 내용 불러오기// 왜 가져온거지?
const form = document.querySelector("form.form");


//document.querySelector('#apply').addEventListener('click', function(){
//   alert("코드스테이츠에 오신 것을 환영합니다")
// })
form.addEventListener("submit", 
(event) => {
  event.preventDefault(); //preventDefault로 기본클릭 방지 문제가 생길수 있음
//옛날에는 제출하는 것은 페이지 이동을 의미(브라우저 기본 동작1), 그래서 해당기능이 필요
// form 과 input  버튼의 차이 => form 이라고 확실하게 하는 편이 좋은듯
  
  const author = form.querySelector("div.form__input--name > input").value;
  const title = form.querySelector("div.form__input--title > input").value;
  const textbox = form.querySelector("div.form__textbox > textarea").value;

  const newObj = { // 폼 대로 불러오기
    id: "new id",
    createdAt: new Date().toISOString(),
    title: title,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author,
    bodyHTML: textbox,
    avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4"
  }
// 새로 쓴 그 위로 오게 하려고.
  agoraStatesDiscussions.unshift(newObj);
  // ul에 있는거 다 지우고 
  // ul.innerHTML = ''
  // while ( ul.firstChild{
  // ul.remiveChild(ul.firstChild})
  // render (ul)
  const discussion = convertToDiscussion(newObj);
  
  ul.prepend(discussion);

  form.querySelector("div.form__input--name > input").value = "";
  form.querySelector("div.form__input--title > input").value = "";
  form.querySelector("div.form__textbox > textarea").value = "";
}
)

// https://velog.io/@wool/%EB%82%98%EB%A7%8C%EC%9D%98-%EC%95%84%EA%B3%A0%EB%9D%BC%EC%8A%A4%ED%85%8C%EC%9D%B4%EC%B8%A0-%EC%84%9C%EB%B2%84-%EB%A7%8C%EB%93%A4%EA%B8%B02%EC%B0%A8-%EC%86%94%EB%A1%9C%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0
// 참고 블로그
//https://github.com/codestates-seb/agora-states-fe/discussions
// 참고 - 아고라 스테이츠
// https://github.com/CodeNerve/CodeNerve.github.io
// 터미널 형식 스타일