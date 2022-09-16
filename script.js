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
  /*** 1.왼쪽 아바타 ***/
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  /*** 2.중간 Discussion 콘텐츠 ***/
  /*** 2-a.제목 ***/
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const titleAnchor = document.createElement("a");
  titleAnchor.setAttribute("href", obj.url);
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  /*** 2-b.작성정보 ***/
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`;
  discussionContent.append(discussionTitle, discussionInfo);

  /*** 3.오른쪽 체크 표시 ***/
  const isAnswered = document.createElement("p");
  isAnswered.textContent = obj.answer ? '☑' : '☒';
  discussionAnswered.append(isAnswered);

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

// Discussion 추가하기
const form = document.querySelector(".form");
const formInputName = document.querySelector('.form__input--name > input');
const formInputTitle = document.querySelector('.form__input--title > input');
const formInputText = document.querySelector('.form__textbox > textarea');
const formSubmit = document.querySelector(".form__submit > input");

/*** submit 버튼 이벤트객체 ***/
formSubmit.addEventListener("click", (event) => {
  // a.페이지 새로고침 막기 위해 submit 이벤트 취소
  event.preventDefault();
  // b-1.입력사항을 다 채웠으면 입력된 값을 객체에 담아서 ui 요소에 렌더링
  if (formInputName.value !== "" && formInputTitle.value !== "" && formInputText.value !== "") {
    const newObj = {
      id: "new unique id",
      createdAt: new Date(),
      title: formInputTitle.value,
      url: "#",
      author: formInputName.value,
      answer: null,
      bodyHTML: "new unique bodyHTML",
      avatarUrl:
        "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
    };
    agoraStatesDiscussions.unshift(newObj);
    console.log(agoraStatesDiscussions);
    ul.prepend(convertToDiscussion(newObj));
    
    // form에 작성한 내용 초기화
    formInputName.value = "";
    formInputTitle.value = "";
    formInputText.value = "";
  } 
  // b-2.입력사항을 다 채우지 않았으면
  else {
    alert('질문 내용을 입력해주세요.')
  }
});