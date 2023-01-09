// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // avatar
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  avatarWrapper.innerHTML = `
    <img
      class="discussion__avatar--image"
      src=${obj.avatarUrl}
      style="width: 48px; height: 48px ;"
      alt="avatar of ${obj.author}"
    />
  `;

  // content
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  discussionContent.innerHTML = `
    <h2 class="discussion__title">
      <a href="${obj.url ? obj.url : ""}">${obj.title}</a>
    </h2>
    <div class="discussion__information">
      ${obj.author} / ${obj.createdAt}
    </div>
  `;

  // answered
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  discussionAnswered.innerHTML = `<p>${obj.answer ? "☑" : "☐"}</p>`;

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    const li = convertToDiscussion(agoraStatesDiscussions[i]);
    element.append(li);
  }
  return;
};

const onCLickSubmit = () => {
  // form value를 가져오기
  const name = document.getElementById("name").value;
  const title = document.getElementById("title").value;
  const question = document.getElementById("question").value;

  // form 값이 비정상이면 안내하기
  if (name.length === 0 || title.length === 0 || question.length === 0) {
    alert("이름, 타이틀, 질문을 모두 입력해주세요.");
    return;
  }

  // form value로 부터 agoraStatesDiscussion 객체 만들기
  const discussion = {
    avatarUrl: "/img/user-regular.png",
    author: name,
    createdAt: "2023-01-09", // TODO: 날짜 제대로 넣기 (https://hianna.tistory.com/325),
    title: title,
    bodyHTML: `<p>${question}</p>`,
  };

  // 만든 객체를 agoraStatesDiscussion에 추가하기
  agoraStatesDiscussions.unshift(discussion);
  console.log(agoraStatesDiscussions);

  // 다시 렌더링 하기
  const ul = document.querySelector("ul.discussions__container");
  ul.innerHTML = "";
  render(ul);
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
