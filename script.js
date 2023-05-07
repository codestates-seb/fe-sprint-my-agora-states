// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = obj => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container margin_h_10 padding_20"; // 클래스 이름 지정

  //const avatarWrapper = document.createElement("div");
  //avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  discussionContent.innerHTML = `
    <header>
      <div class="discussion__answered"><p class="no">❔</p><p class="yes hide">❕</p></div>
      <h2 class="discussion__title">
        ${obj.title}
      </h2>
      <div class="discussion__delete"><p class="edit">✎</p><p class="delete">❌</p></div>
    </header>
    <div class="discussion__view hide">
      <article class="discussion__story margin_h_10">${obj.bodyHTML}</article>                
      <div class="edit__view hide">
        <form action="" method="get" class="form">
          <input type="text" name="edit__title" class="edit__title padding_10" value="[notice] 좋은 질문하는 법" required />
          <textarea class="edit__story padding_10 margin_h_10" name="edit__story" required>어떻게 하면 좋은 질문을 할 수 있을까요?</textarea>
          <input type="submit" class="edit__submit" value="edit" />
        </form>
      </div>
      <ul class="answer__container">
      </ul>
      <form action="" method="get" class="form">
        <textarea class="answer padding_10 margin_h_10" name="answer" placeholder="답변을 작성하세요" required></textarea>
        <input type="submit" class="answer__submit" value="submit" />
      </form>
    </div>`;

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(discussionContent);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = element => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

for (let discussion of document.querySelectorAll("li.discussion__container")) {
  discussion.querySelector("header").addEventListener("click", () => {
    discussion.querySelector(".discussion__view").classList.toggle("hide");
  });
}
