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

  // 프로필 사진 넣어주기
  const face = document.createElement("img") // 프로필 사진
  face.src = obj.avatarUrl;
  face.alt = "avatar of" + obj.author;
  //my error point
  face.className = "discussion__avatar--image";
  avatarWrapper.append(face);

  // 스테이츠 속 질문 제목을 선언 url을 타고 깃허브로 간다
  // h2로 선언된 변수가 질문 제목
  const discussionTitle = document.createElement("h2");
  // a로 선언된 변수가 질문 속 url
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  // 만든 질문 제목과 url을 적용
  discussionTitle.append(titleAnchor);
  discussionContent.append(discussionTitle);

  // div로 선언된 질문 속 정보 선언 
  const discussionInfo = document.createElement("div");
  // 저자가 누군지 문자열 리터럴로 선언
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`
  // 질문 내용 적용
  discussionContent.append(discussionTitle, discussionInfo);

  // 질문 속 체크박스 생성 
  // p 태그로 선언된 checked
  const checked = document.createElement("p");
  // textcontent는 텍스트를 추가할 수 있는 프로퍼티
  checked.textContent = obj.answer ? "☑︎" : "☒";
  // checked 적용
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

form.addEventListener("submit",
  (event) => {
    event.preventDefault(); //서브밋 이벤트로 사용시 꼭 함께 사용해주어야함
    // addEventListener 안으로 선언 위치 이동
    const author = form.querySelector("div.form__input--name > input").value;
    const title = form.querySelector("div.form__input--title > input").value;
    const textbox = form.querySelector("div.form__textbox > textarea").value;

    const Obj = {
      id: "new id",
      createdAt: new Date().toISOString(),
      title: title,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions",
      author: author,
      bodyHTML: textbox,
      avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
    }
      // addEventListener 안으로 선언 위치 이동
      ** agoraStatesDiscussions.unshift(newObj);

    const discussion = convertToDiscussion(newObj);

    ul.prepend(discussion);

    // submit 후 입력란 빈칸으로 리셋하는 기능 추가
    form.querySelector("div.form__input--name > input").value = "";
    form.querySelector("div.form__input--title > input").value = "";
    form.querySelector("div.form__textbox > textarea").value = "";
  }
)


