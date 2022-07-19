// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  //이 함수의 목적: li 뭉치를 새롭게 만든다 (왜 여기서 새로 만드는가...?)
  const avatarWrapper = document.createElement("div"); //아바타, 아이콘
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  //이미지, 대체 택스트
  const avatarImg = document.createElement("img");
  avatarImg.setAttribute("src", obj.avatarUrl);
  avatarImg.setAttribute("alt", obj.author);
  avatarWrapper.appendChild(avatarImg);

  //제목 내용 + 하이퍼링크
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.setAttribute("href", obj.url);
  titleAnchor.textContent = obj.title;

  discussionTitle.appendChild(titleAnchor);
  discussionContent.appendChild(titleAnchor);

  //아이디, 작성시간을 추가 정보로 넣자
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString("ko-KR")}`;

  discussionContent.appendChild(discussionInfo);

  //답변완료 체크박스를 넣자
  const answeredMark = document.createElement("p");
  answeredMark.textContent = obj.anwer ? "☑" : "⊠";
  discussionAnswered.appendChild(answeredMark);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li; //이건 왜 하는 걸까?
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
render(ul); //rendering: 브라우저에 우리가 그린 코드를 실행

//새로운 질문 올리기
const inputName = document.getElementById("name");
const inputTitle = document.getElementById("title");
const inputStory = document.getElementById("story");
const sumbit = document.getElementById("submit");

sumbit.addEventListener("click", (event) => {

  if (inputName.value && inputTitle.value && inputStory.value) {
    let confirmSubmit = window.confirm("새로운 질문을 제출합니다.");
    if (confirmSubmit === true) {
      event.preventDefault();
      const inputObj = {
        id: "unique id",
        author: inputName.value,
        title: inputTitle.value,
        bodyHTML: inputStory.value,
        createdAt: new Date().toLocaleString("ko-KR"),
        avatarUrl:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        answer: null,
        url: "#",
      };
      agoraStatesDiscussions.unshift(inputObj);
      // const newDiscussion = convertToDiscussion(inputObj);
      ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));
    } else {
      alert("제출을 그만둡니다.");
    }
  } else {
    window.alert("칸을 전부 채워주세요.");
  }
});
