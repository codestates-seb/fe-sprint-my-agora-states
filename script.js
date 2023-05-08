// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
//DOM으로 바꿔주고 append까지 한다. 
  
  const avatarWrapper = document.createElement("div"); //li 요소 첫번째
  avatarWrapper.className = "discussion__avatar--wrapper"; 

  const discussionContent = document.createElement("div"); //li 요소 두번쨰 
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div"); // li 요소 세번쨰
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 위의 변수에 정보를 담아서 저장
  // 1-> 사진, 2-> 질문,질문자,날찌 및 시간, 3-> 체크표시

    const face = document.createElement("img") // 프로필 사진
    face.className =document.querySelector('discussion__avatar--image')
    face.src = obj.avatarUrl;
    face.alt = "avatar of" + obj.author;
    avatarWrapper.append(face);


    const discussionTitle = document.createElement("h2");
    const titleAnchor = document.createElement("a");
    titleAnchor.href = obj.url;
    titleAnchor.textContent = obj.title;
    discussionTitle.append(titleAnchor);
    discussionContent.append(discussionTitle);


    const discussionInfo = document.createElement("div");
    discussionInfo.textContent = `${obj.author} / ${new Date().toLocaleTimeString()}` // 날짜 표현 형식이 여러개가 있는데 이걸 제일 많이 쓴다
    discussionContent.append(discussionTitle, discussionInfo);

    const checked = document.createElement("p");
    checked.textContent = obj.answer ? "☑︎" : "☒";
    discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};
// 이벤트 만들기
// 이밴트를 눌렀을 때 객체 를 추가
const form = document.querySelector("form.form")
const aut = document.querySelector("input#name")
const title = document.querySelector("input#title")
const qus = document.querySelector("textarea#story")
form.addEventListener('submit',(event) => {
  const newdic ={
    id: "D_kwDOHOApLM4APjIj",
    createdAt: new Date(),
    title:title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
    author: aut.value,
    answer: null,
    bodyHTML:qus.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4"
  }
  
  ul.prepend(convertToDiscussion(newdic))
  event.preventDefault();
})

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
// ul.append(li)

