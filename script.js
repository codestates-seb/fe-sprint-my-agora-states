window.addEventListener(
  "wheel",
  function (e) {
    e.preventDefault();
  },
  { passive: false }
);

var $html = $("html");

var page = 1;

var lastPage = $(".content").length;

$html.animate({ scrollTop: 0 }, 10);

$(window).on("wheel", function (e) {
  if ($html.is(":animated")) return;

  if (e.originalEvent.deltaY > 0) {
    if (page == lastPage) return;

    page++;
  } else if (e.originalEvent.deltaY < 0) {
    if (page == 1) return;

    page--;
  }
  var posTop = (page - 1) * $(window).height();

  $html.animate({ scrollTop: posTop });
});

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const hide = document.querySelector(".plus");
const form = document.querySelector(".form");
const author = document.querySelector("#name");
const title = document.querySelector("#title");
const story = document.querySelector("#story");

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

  //avatarWrapper
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);
  //discussionContent
  const contentTitleLink = document.createElement("a");
  const contentTitle = document.createElement("h2");
  contentTitle.className = "discussion__title";
  contentTitle.appendChild(contentTitleLink);
  contentTitleLink.href = obj.url;
  contentTitleLink.textContent = obj.title;
  discussionContent.append(contentTitle);
  const contentInfo = document.createElement("div");
  contentInfo.className = "discussion__information";
  contentInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionContent.append(contentInfo);
  //discussionAnswered
  const questionsComple = document.createElement("label");
  const checkbox = document.createElement("input");
  questionsComple.textContent = "답변완료";
  checkbox.type = "checkbox";
  checkbox.name = "question--complete";
  checkbox.value = "question--complete";
  if (obj.answer !== null) {
    checkbox.setAttribute("checked", true);
  } else {
    checkbox.checked = false;
  }
  questionsComple.appendChild(checkbox);
  discussionAnswered.append(questionsComple);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const newDiscussion = {
    createdAt: new Date(),
    title: title.value,
    author: author.value,
    answer: null,
    bodyHTML: story.value,
    avatarUrl:
      "https://cdn.pixabay.com/photo/2016/12/21/08/58/questions-1922476_1280.jpg",
  };

  ul.prepend(convertToDiscussion(newDiscussion));
  title.value = "";
  author.value = "";
  story.value = "";
});

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

function handleTitleClick() {
  form.classList.toggle("hide");
}

// toggle

hide.addEventListener("click", handleTitleClick);

var spanText = function spanText(text) {
  var string = text.innerText;
  var spaned = "";
  for (var i = 0; i < string.length; i++) {
    if (string.substring(i, i + 1) === " ")
      spaned += string.substring(i, i + 1);
    else spaned += "<span>" + string.substring(i, i + 1) + "</span>";
  }
  text.innerHTML = spaned;
};

var headline = document.querySelector("h1");

spanText(headline);
