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
  // image
  const avatarImage = document.createElement("img");
  avatarImage.classList.add("discussion__avatar--image");
  avatarImage.setAttribute("src", `${obj.avatarUrl}`);
  avatarImage.setAttribute("alt", `avatar of ${obj.author}`);
  avatarWrapper.append(avatarImage);

  // content 질문
  const discussionTitle = document.createElement("h2");
  discussionTitle.classList.add("discussion__title");
  const aHref = document.createElement("a");
  aHref.setAttribute("href", `${obj.url}`);
  aHref.textContent = obj.title;
  discussionTitle.append(aHref);
  discussionContent.append(discussionTitle);

  // content 날짜
  const discussionInfo = document.createElement("div");
  discussionInfo.classList.add("discussion__information");
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionInfo);

  // checkbox
  const discussionAnsweredCheck = document.createElement("p");
  if (!(obj.answer === null)) {
    discussionAnsweredCheck.textContent = "✅";
  } else {
    discussionAnsweredCheck.textContent = '❌';
  }
  discussionAnswered.append(discussionAnsweredCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


// submit 함수
const inputForm = document.querySelector("form.form")
const inputAuthor = inputForm.querySelector(".form__input--name > input");
const inputTitle = inputForm.querySelector(".form__input--title > input");
const inputBodyHtml = inputForm.querySelector(".form__textbox > textarea");
// submitValue 함수가 시작하기 전 localStorage 초기 셋팅
if (!localStorage.getItem("agoraStatesDiscussions")) { //만약 localStorage에 agoraStatesDiscussions가 없으면
  localStorage.setItem("agoraStatesDiscussions", JSON.stringify(agoraStatesDiscussions)); //localStorage에 키값과 value를 넣는다
}
let newLocalStorage = JSON.parse(localStorage.getItem("agoraStatesDiscussions")); //newLocalStorage는 화면에서 보여줄 변수 저장소, newLocalStorage에는 agoraStatesDiscussions값을 json형식으로 받음
console.log(newLocalStorage);

inputForm.addEventListener('submit', function submitValue(e) {
  // // submit action막기
  // e.preventDefault();

  if (inputAuthor.value === "") {
    alert("이름을 입력해 주세요!");
    inputAuthor.value.focus();
  } else if (inputTitle.value === "") {
    alert("제목을 입력해 주세요!");
    inputTitle.value.focus();
  } else if (inputBodyHtml.value === "") {
    alert("내용을 입력해 주세요!");
    inputBodyHtml.value.focus();
  } else {
    const newObj = {
      id: "new id",
      createdAt: new Date().toISOString(),
      title: inputTitle.value,
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
      author: inputAuthor.value,
      answer: null,
      bodyHTML: inputBodyHtml.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
    } // 내용이 모두 있을 경우 newObj에 그 내용을 넣는다

    newLocalStorage.unshift(newObj);

    localStorage.setItem("agoraStatesDiscussions", JSON.stringify(newLocalStorage));

    inputAuthor.value = ""; //다끝나면 초기화
    inputTitle.value = "";
    inputBodyHtml.value = "";
    render(ul);
  }
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => { //아까 선언한 newLocalStorage 값을 append함
  for (let i = 0; i < newLocalStorage.length; i += 1) {
    element.append(convertToDiscussion(newLocalStorage[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);








