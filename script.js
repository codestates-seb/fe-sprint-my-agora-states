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
  // avatarWrapper
  const $avatarImg = document.createElement("img");
  $avatarImg.className = "discussion__avatar--image"; // img 태그
  $avatarImg.setAttribute("alt", `avatar of ${obj.author || ""}`); // alt 속성
  $avatarImg.src =
    obj.avatarUrl || "https://github.com/identicons/jasonlong.png";
  avatarWrapper.appendChild($avatarImg);

  // discussionContent
  const $titleWrapper = document.createElement("h2");
  $titleWrapper.className = "discussion__title";
  const $title = document.createElement("a");
  const $discussionInfo = document.createElement("div");
  $discussionInfo.className = "discussion__information";

  $title.textContent = obj.title;
  $title.href = obj.url;
  $discussionInfo.textContent = `${obj.id}\t/\t${obj.createdAt}`;
  $titleWrapper.appendChild($title);
  discussionContent.append($titleWrapper, $discussionInfo);

  // discussionAnswered
  const $discussionAnswered = document.createElement("p");
  $discussionAnswered.textContent = "☑";
  discussionAnswered.appendChild($discussionAnswered);

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

// 질문 작성하는 로직
const $form = document.getElementById("form");
const $formName = document.getElementById("name");
const $formTitle = document.getElementById("title");

// submit 이벤트 캐치
$form.addEventListener("submit", (e) => {
  // 기존 submit 기능 중지시키기
  e.preventDefault();

  // 배열에 입력한 데이터를 추가하기
  const newDiscussion = {
    id: $formName.value,
    createdAt: new Date().toLocaleString(),
    title: $formTitle.value,
    url: "",
    author: $formName.value,
    answer: null,
    bodyHTML: "",
    avatarUrl: "",
  };
  // 배열 가장 앞에 넣어주기
  agoraStatesDiscussions.unshift(newDiscussion);
  console.log("배열 추가 확인", agoraStatesDiscussions);
  // 하나만 렌더링 해주기
  const li = convertToDiscussion(newDiscussion);
  ul.prepend(li); // 앞에 추가할 때는 prepend를 써준다.
});
