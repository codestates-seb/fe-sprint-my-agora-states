// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = obj => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container margin_h_10";

  const header = document.createElement("header");
  header.className = "padding_20";
  const discussion__avatar = document.createElement("div");
  discussion__avatar.className = "discussion__avatar";
  discussion__avatar.innerHTML = `<img class="discussion__avatar" src="${obj.avatarUrl}" alt="${obj.author}'s avatar" />`;
  const discussion__answered = document.createElement("div");
  discussion__answered.className = "discussion__answered";
  if (obj.answer != null) {
    discussion__answered.innerHTML = `<div class="discussion__answered"><p class="no hide">❔</p><p class="yes">❕</p></div>`;
  } else {
    discussion__answered.innerHTML = `<div class="discussion__answered"><p class="no">❔</p><p class="yes hide">❕</p></div>`;
  }
  const discussion__title = document.createElement("h2");
  discussion__title.className = "discussion__title";
  discussion__title.innerText = obj.title;
  const discussion__delete = document.createElement("div");
  discussion__delete.className = "discussion__delete";
  discussion__delete.innerHTML = `<p class="edit">✎</p><p class="delete">❌</p>`;
  header.append(discussion__avatar, discussion__answered, discussion__title, discussion__delete);

  const view = document.createElement("div");
  view.className = "discussion__view padding_20 hide";
  const article = document.createElement("article");
  article.className = "discussion__story margin_h_10";
  article.innerHTML = obj.bodyHTML;
  const edit__view = document.createElement("div");
  edit__view.className = "edit__view hide";
  edit__view.innerHTML = `
    <form action="" method="get" class="form">
      <input type="text" name="edit__title" class="edit__title padding_10" value="${obj.title}" required />
      <textarea class="edit__story padding_10 margin_h_10" name="edit__story" required>${obj.bodyHTML}</textarea>
      <input type="submit" class="edit__submit" value="edit" />
    </form>
  `;
  const answer__container = document.createElement("ul");
  answer__container.className = "answer__container";
  if (obj.answer != null) {
    const answer_list = document.createElement("li");
    answer_list.className = "answer__content";
    answer_list.innerHTML = `
        <hr />
        <header class="answer__header">
        <div class="answer__delete"><p class="edit">✎</p><p class="delete">❌</p></div>
        <div class="answer__avatar"><img class="discussion__avatar" src="${obj.answer.avatarUrl}" alt="${obj.answer.author}'s avatar" /></div>
        <div class="answer__author">${obj.answer.author}</div>
        </header>
        <div class="answer__content">${obj.answer.bodyHTML}</div>
      `;
    answer__container.append(answer_list);
  }
  const answer__form = document.createElement("form");
  answer__form.setAttribute("action", "");
  answer__form.setAttribute("method", "get");
  if (obj.answer != null) {
    answer__form.className = "form hide";
    answer__form.innerHTML = `
    <textarea class="answer padding_10 margin_h_10" name="answer" placeholder="답변을 작성하세요" required>${obj.answer.innerHTML}</textarea>
    <input type="submit" class="answer__submit" value="submit" />
  `;
  } else {
    answer__form.className = "form";
    answer__form.innerHTML = `
      <textarea class="answer padding_10 margin_h_10" name="answer" placeholder="답변을 작성하세요" required></textarea>
      <input type="submit" class="answer__submit" value="submit" />
    `;
  }
  answer__form.innerHTML = `
    <textarea class="answer padding_10 margin_h_10" name="answer" placeholder="답변을 작성하세요" required></textarea>
    <input type="submit" class="answer__submit" value="submit" />
  `;
  view.append(article, edit__view, answer__container, answer__form);
  li.append(header, view);

  // discussion__view toggle btn
  discussion__title.addEventListener("click", () => {
    view.classList.toggle("hide");
  });

  // answer__form submit
  answer__form.children[1].addEventListener("click", e => {
    e.preventDefault();
  });

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
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

// form submit
document.querySelector("#form").submit.addEventListener("click", e => {
  e.preventDefault();
  const form = document.querySelector("#form");
  const discussion = {
    id: "",
    createdAt: new Date(),
    title: form.title.value,
    url: "",
    author: "me",
    answer: null,
    bodyHTML: form.story.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4  ",
  };
  agoraStatesDiscussions.unshift(discussion);
  const ul = document.querySelector("ul.discussions__container");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  render(ul);
});
