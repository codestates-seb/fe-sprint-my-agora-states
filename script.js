let discussions;
if (localStorage.getItem("data") != null) {
  discussions = JSON.parse(localStorage.getItem("data"));
} else {
  discussions = agoraStatesDiscussions;
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj, index) => {
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
  view.className = "discussion__view padding_not_top_20 hide";
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
    answer__container.append(answer__render(obj.answer));
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
    if (answer__form.children[0].value != "") {
      const answer = {
        id: "",
        createdAt: new Date(),
        url: "",
        author: "kimploo",
        bodyHTML: answer__form.children[0].value,
        avatarUrl:
          "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
      };
      discussions[index].answer = answer;
      localStorage.setItem("data", JSON.stringify(discussions));
      answer__container.append(answer__render(answer));
      answer__form.classList.add("hide");
    }
  });

  // answer__render
  function answer__render(answer) {
    const answer_list = document.createElement("li");
    answer_list.className = "answer__content";
    answer_list.innerHTML = `
        <hr />
        <header class="answer__header">
        <div class="answer__delete"><p class="edit">✎</p><p class="delete">❌</p></div>
        <div class="answer__avatar"><img class="discussion__avatar" src="${answer.avatarUrl}" alt="${answer.author}'s avatar" /></div>
        <div class="answer__author">${answer.author}</div>
        </header>
        <div class="answer__content">${answer.bodyHTML}</div>
      `;
    return answer_list;
  }

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  return li;
};

// ul 요소에 discussions 배열의 pagenation에 맞는 자료를 데이터를 화면에 렌더링합니다.
let currentPage = 1;

const ul = document.querySelector("ul.discussions__container");
render(ul, currentPage);

function render(element, page) {
  for (let i = (page - 1) * 10; i < page * 10 && i < discussions.length; i += 1) {
    element.append(convertToDiscussion(discussions[i], i));
  }
  // 기존 pagenation을 초기화합니다.
  document.querySelector(".pagenation").innerHTML = "";
  pagenation(discussions, currentPage);
}

// form submit
document.querySelector("#form").submit.addEventListener("click", e => {
  e.preventDefault();
  const form = document.querySelector("#form");
  if (form.title.value != "" && form.story.value != "") {
    const discussion = {
      id: "",
      createdAt: new Date(),
      title: form.title.value,
      url: "",
      author: "kimploo",
      answer: null,
      bodyHTML: form.story.value,
      avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
    };
    discussions.unshift(discussion);
    localStorage.setItem("data", JSON.stringify(discussions));
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    render(ul, currentPage);
    form.title.value = "";
    form.story.value = "";
    form.querySelector(".discussion__error").classList.add("hide");
  } else {
    form.querySelector(".discussion__error").classList.remove("hide");
  }
});

function pagenation(discussions, page) {
  // 현재 게시물의 전체 개수가 10개 이하면 pagination을 숨깁니다.
  if (discussions.length <= 10) return;

  const totalPage = Math.ceil(discussions.length / 10);
  let pageGroup = Math.ceil(page / 10);

  let last = pageGroup * 10;
  let first = last - (10 - 1) <= 0 ? 1 : last - (10 - 1);
  if (last > totalPage) last = totalPage;
  let next = last + 1;
  let prev = first - 1;
  const fragmentPage = document.createDocumentFragment();

  //pagenation을 표시합니다.
  if (currentPage != 1) {
    let allpreli = document.createElement("li");
    allpreli.innerText = "<<";
    allpreli.addEventListener("click", () => {
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      currentPage = 1;
      render(ul, currentPage);
    });

    let preli = document.createElement("li");
    preli.innerText = "<";
    preli.addEventListener("click", () => {
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      currentPage -= 1;
      render(ul, currentPage);
    });

    fragmentPage.appendChild(allpreli);
    fragmentPage.appendChild(preli);
    fragmentPage.addEventListener("click", () => {
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      currentPage = 1;
      render(ul, currentPage);
    });
  }

  for (let i = first; i <= last; i++) {
    const li = document.createElement("li");
    li.innerText = i;
    if (i === currentPage) {
      li.classList.add("hilight");
    }
    li.addEventListener("click", () => {
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      currentPage = i;
      render(ul, currentPage);
    });
    fragmentPage.appendChild(li);
  }

  if (currentPage < totalPage) {
    let allendli = document.createElement("li");
    allendli.innerText = ">>";
    allendli.addEventListener("click", () => {
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      currentPage = totalPage;
      render(ul, currentPage);
    });

    let endli = document.createElement("li");
    endli.innerText = ">";

    endli.addEventListener("click", () => {
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      currentPage += 1;
      render(ul, currentPage);
    });
    fragmentPage.appendChild(endli);
    fragmentPage.appendChild(allendli);
  }

  document.querySelector(".pagenation").appendChild(fragmentPage);
}
