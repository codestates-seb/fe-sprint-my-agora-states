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
  //아바타 프로필 사진 넣는 img 요소 편집
  const avatarImg = document.createElement("img");
  avatarImg.classList.add("discussion__avatar--image");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = obj.author;
  avatarWrapper.append(avatarImg);

  //content에서 제목가져오고 제목에 링크 연결
  //제목에 링크를 연결하기
  const contentHtwo = document.createElement("h2");

  const contentA = document.createElement("a");
  contentA.href = obj.url;
  contentHtwo.append(contentA);
  discussionContent.append(contentHtwo);

  //작성자가져오고 작성자 / 작성일시 나타내기
  const contentDiv = document.createElement("div");
  contentHtwo.textContent = obj.title;
  contentHtwo.classList.add("discussion__title");
  contentDiv.textContent = obj.author + " / " + obj.createdAt;
  contentDiv.classList.add("discussion__information");
  discussionContent.append(contentDiv);

  //체크박스 가져오고 연결하기
  const checkBoxPtag = document.createElement("p");
  checkBoxPtag.textContent = "☑";
  discussionAnswered.appendChild(checkBoxPtag);

  //<디스커션 추가 기능>_추후 구현 예정
  //0.디스커션 받을 박스 만들기
  const formWrapper = document.createElement("div");
  formWrapper.className = "form__input--wrapper";

  const formInputName = document.createElement("div");
  formInputName.className = "form__input--name";
  const formInputTitle = document.createElement("div");
  formInputTitle.className = "form__input--title";
  const formTextbox = document.createElement("div");
  formTextbox.className = "form__textbox";

  const nameinput = document.createElement("input");
  const titleinput = document.createElement("input");
  const storyTextarea = document.createElement("textarea");

  //1. 데이터 받기
  //전송데이터를 받을 페이지를 action에 입력한다. 깃헙 주소 넣어줌.
  //form의 get 메소드 방식->post 로 변경하고 데이터를 받는다.
  //주소 입력하니까 submit할 때 자꾸 내 깃헙으로 이동하게 됨..
  //action 비워둠..
  //2. 데이터 가져오기
  //작성자가 이름, 제목, 질문을 작성하면작성한 value를 가져온다.
  let formElement = document.forms.form;
  let formData = new FormData(formElement);
  let name = formData.get("name");

  //3. 배열 끝에 추가하기
  //본래 배열 끝에 push() 하여 배열을 추가한다.
  agoraStatesDiscussions.push();
  let obj2 = agoraStatesDiscussions;
  //obj2는 =새로 받은 배열이 추가된 현재 배열
  //obj는 data.js에 있는 객체로 된 배열
  //현재 배열을 li과 연결하여 정보를 보여준다.

  //li와 연결하기
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
