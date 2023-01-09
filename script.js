// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  console.log("obj: ", obj);
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
      <a href="https://github.com/codestates-seb/agora-states-fe/discussions/6">
        ${obj.title}
      </a>
    </h2>
    <div class="discussion__information">
      ${obj.author} / ${obj.createdAt}
    </div>
  `;

  // answered
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  discussionAnswered.innerHTML = `<p>${obj.answer === null ? "☐" : "☑"}</p>`;

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

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
