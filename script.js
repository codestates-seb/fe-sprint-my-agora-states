// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionTitleUrl = document.createElement("a");
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";

  // 아바타: 이미지 소스, alt 지정
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  // 콘텐츠 제목, info에 객체의 값 할당
  discussionTitleUrl.textContent = obj.title;
  discussionTitleUrl.href = obj.url;
  // 새 창에서 열리도록 속성 부여
  discussionTitleUrl.setAttribute("target", "_blank");
  discussionTitle.append(discussionTitleUrl);
  discussionInfo.textContent =
    obj.author + " | " + new Date(obj.createdAt).toLocaleString();

  // 부모 요소 content에 append
  discussionContent.append(discussionTitle, discussionInfo);

  // 체크표시
  // 살짝 응용하면 아이콘 넣을 수 있을 듯
  // fontawesome에서 아이콘 불러오기
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const checkIcon = document.createElement("i");
  checkIcon.className = "fa-circle-check";
  checkIcon.classList.add("fa-regular");
  // 조건문으로 답변 여부 확인 후 fa-regular -> fa-solid 결정
  if (obj.answer) {
    checkIcon.classList.replace("fa-regular", "fa-solid");
  }
  discussionAnswered.append(checkIcon);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 서버에서 데이터를 불러와 화면에 렌더링
fetch("http://localhost:4000/discussions")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    if (!localStorage.getItem("dummyData")) {
      saveLocalStorage(data);
    }

    // 로컬 스토리지 저장 함수
    function saveLocalStorage(obj) {
      localStorage.setItem("dummyData", JSON.stringify(obj));
    }

    // 로컬 스토리지에서 가져오는 함수
    function getLocalStorage(name) {
      return JSON.parse(localStorage.getItem(name));
    }

    let dataFromLocalStorage = getLocalStorage("dummyData");

    // 렌더링 함수
    const render = (element) => {
      for (let i = 0; i < dataFromLocalStorage.length; i += 1) {
        element.append(convertToDiscussion(dataFromLocalStorage[i]));
      }
      return;
    };

    // ul 요소에 data 배열의 모든 데이터를 화면에 렌더링합니다.
    const ul = document.querySelector("ul.discussions__container");
    render(ul);

    // submit 버튼을 눌렀을 때 디스커션이 agora 데이터 배열에 추가되어야 함
    // 추가된 게 렌더링되도록 convertDiscussion 함수 호출
    // 새 객체를 만들어 배열에 unshift하는 함수 생성
    // 버튼 클릭 시 함수 실행되도록 이벤트 핸들러 작성
    const questionForm = document.querySelector(".form");

    questionForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const inputName = event.target["name"];
      const inputTitle = event.target["title"];
      const inputQuestion = event.target["story"];

      const newObj = {
        id: "unique number",
        createdAt: new Date(),
        title: inputTitle.value,
        url: "#",
        author: inputName.value,
        bodyHTML:
          '<p dir="auto">블로그에 그날 배운 내용을 정리할 때 UrClass 에 있는 이미지를 인용해도 괜찮을까요 ??<br>\n저작권 문제가 있을 수 있어서 여쭤봅니다 !</p>',
        avatarUrl: "https://avatars.githubusercontent.com/u/79880249?s=64&v=4",
      };

      dataFromLocalStorage.unshift(newObj);
      saveLocalStorage(dataFromLocalStorage);
      ul.prepend(convertToDiscussion(newObj));

      // 렌더링 후에는 폼 비우기
      inputName.value = "";
      inputTitle.value = "";
      inputQuestion.value = "";
    });
  });
