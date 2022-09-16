// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {//객체 매개변수
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  //1. 아바타 영역
  const avatarImg = document.createElement("img")
  avatarImg.src = obj.avatarUrl
  avatarWrapper.append(avatarImg)

  //2. 콘텐츠 영역
  const contentTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.textContent = obj.title
  titleAnchor.href = obj.url
  contentTitle.append(titleAnchor);

  //2. 정보 영역
  const contentInfo = document.createElement("div");
  contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleDateString("en-kr")}`
  contentInfo.className = "discussion__information";
  discussionContent.append(contentInfo)
  discussionContent.append(contentTitle,contentInfo)
 
  //3. 체크 박스
  const checked = document.createElement("p")
  checked.textContent = obj.answer? '☒' : '☑';
  discussionAnswered.append(checked);
  
  //4. 이벤트 리스너


  
 /* //이벤트 리스너
  e.preventDefault
  //객체를 만든다
  //객체를 convertdiscussion에 넣어서 dom으로
  // 그걸 또 render함수에 얺어서 브라우저에 렌더링
  
*/
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;  
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    //i번째 요소를 convertToDiscussion전달해서 경과를 ul에 append
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    
  }
  return;
};



// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

render(ul);


const form = document.querySelector('form.form');
const inputName = document.querySelector('input#name');
const inputTitle = document.querySelector('input#title');
const inputStory = document.querySelector('textarea#story');



form.addEventListener("submit", (event)=>{
  event.preventDefault(); // 왜 있어야 하는가?
  const newObj = {
      id: "D_idNumber",
      createdAt:new Date(),
      title: inputTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions",
      author: inputName.value,
      answer: null,
      bodyHTML: inputStory.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
  };
  agoraStatesDiscussions.unshift(newObj);
  const newDiscussion = convertToDiscussion(newObj);
  ul.prepend(newDiscussion);
});