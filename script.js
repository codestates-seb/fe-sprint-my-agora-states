// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
const form = document.querySelector("form");
const title = document.querySelector("input#title");
const author = document.querySelector("input#name");
const question = document.querySelector("textarea#story");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const dataLocalStorge = localStorage.getItem("data");
  const newDiscussion = {
    id: "unique",
    createdAt: "2022-05-16T02:09:52Z",
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: author.value,
    answer: {
      id: "DC_kwDOHOApLM4AKg6M",
      createdAt: "2022-05-16T02:09:52Z",
      url: "https://github.com/codestates-seb/agora-states-fe/discussions/45#discussioncomment-2756236",
      author: "Kingsenal",
      bodyHTML:
        '<p dir="auto">안녕하세요. <a class="user-mention notranslate" data-hovercard-type="user" data-hovercard-url="/users/dubipy/hovercard" data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="https://github.com/dubipy">@dubipy</a> 님!<br>\n코드스테이츠 교육 엔지니어 권준혁 입니다. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji></p>\n<p dir="auto">질문 주신 내용은 노드 환경이 구성되어 있지 않기 때문에 발생되는 문제로 확인됩니다.</p>\n<p dir="auto"><code class="notranslate">brew unlink node &amp;&amp; brew link node</code></p>\n<p dir="auto">노드를 연결해 보시고 안된다면</p>\n<p dir="auto"><code class="notranslate">brew link --overwrite node</code></p>\n<p dir="auto">이 명령어를 그 다음에도 안된다면 접근권한 문제일 가능성이 큽니다.</p>\n<p dir="auto"><code class="notranslate">$ sudo chmod 776 /usr/local/lib</code> 접근 권한 변경 후<br>\n<code class="notranslate">$ brew link --overwrite node</code> 다시 연결을 해보세요 !</p>\n<p dir="auto">그럼에도 안된다면 다시 한 번 더 질문을 남겨주세요 !</p>\n<p dir="auto">답변이 되셨다면 내용을 간략하게 정리해서 코멘트를 남기고 answered를 마크해주세요 <g-emoji class="g-emoji" alias="white_check_mark" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2705.png">✅</g-emoji><br>\n감사합니다.<g-emoji class="g-emoji" alias="rocket" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f680.png">🚀</g-emoji><br>\n코드스테이츠 교육 엔지니어 권준혁</p>',
      avatarUrl: "https://avatars.githubusercontent.com/u/79903256?s=64&v=4",
    },
    bodyHTML: story.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  };
  ul.prepend(convertToDiscussion(newDiscussion));
  title.value = "";
  author.value = "";
  question.value = "";
});
// document.getElementsByTagName("form")[0].onsubmit = function () {
//   let inputName = this.name.value;
//   let inputTitle = this.title.value;
//   let inputContent = this.story.value;
//   let object1 = {
//     name: inputName,
//     title: inputTitle,
//     content: inputContent,
//   };
//   localStorage.setItem("data", JSON.stringify(object1));
//   console.log(localStorage.getItem("data"));
// };
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

  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarWrapper.append(avatarImg);
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__content";
  discussionContent.append(discussionTitle);

  const discussionLink = document.createElement("a");
  discussionLink.href = obj.url;
  discussionLink.textContent = obj.title;
  discussionContent.append(discussionLink);

  const discussionAuthor = document.createElement("div");
  discussionAuthor.textContent = `${obj.author} / ${
    obj.createdAt.split("T")[0]
  } ${obj.createdAt.split("T")[1].slice(0, -1)}`;
  discussionContent.append(discussionAuthor);

  const discussionCheckbox = document.createElement("p");
  discussionCheckbox.textContent = obj.answer ? "☑" : "◻︎";
  discussionAnswered.append(discussionCheckbox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const currentPage = 1;
let totalCount = agoraStatesDiscussions.length;
const pageCount = 5;
const limit = 8;

//총 페이지 갯수 계산
let totalPage = Math.ceil(totalCount / limit);
//현재 페이지의 그룹 계산
let pageGroup = Math.ceil(currentPage / pageCount);
//현재 페이지 그룹의 첫번째/마지막 숫자 구하기
let lastNumber = pageGroup * pageCount;
if (lastNumber > totalPage) {
  lastNumber = totalPage;
}
let firstNumber = lastNumber - (pageCount - 1);
const next = lastNumber + 1;
const prev = firstNumber - 1;
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };
const render = (element) => {
  for (let i = 0; i < limit - 1; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};
const render2 = (element) => {
  const button = document.createElement("button");
  button.classList.add("button");
  button.className = element;
  button.innerText = element;
  button.addEventListener("click", (e) => {
    Array.prototype.forEach.call(Pagebutton.children, (button) => {
      if (button.className) button.classList.remove("active");
    });
    e.target.classList.add("active");
    renderContent(parseInt(e.target.className));
  });
  return button;
};

//리스트 초기화
const renderContent = (currentPage) => {
  while (ul.hasChildNodes()) {
    ul.removeChild(ul.lastChild);
  }
  for (
    let i = (currentPage - 1) * limit;
    i < currentPage * limit && i <= agoraStatesDiscussions.length;
    i++
  ) {
    ul.appendChild(convertToDiscussion(agoraStatesDiscussions[i]));
  }
};

//버튼 리스트 초기화
const renderButton = (currentPage) => {
  while (Pagebutton.hasChildNodes()) {
    Pagebutton.removeChild(Pagebutton.lastChild);
  }
  for (
    let i = currentPage;
    i < currentPage + pageCount && i <= totalPage;
    i++
  ) {
    Pagebutton.appendChild(render2(i));
  }
  Pagebutton.children[0].classList.add("active");
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
//render(ul);

const Pagebutton = document.querySelector(".Pagebutton");
//render2(Pagebutton);

renderContent(currentPage);
renderButton(currentPage);

var particles = document.getElementById("animation");
var border = ["50%", "0%"];
var colors = ["#FF6B6B", "#FFE66D", "#4472CA"];

function createParticle(event) {
  var x = event.clientX;
  var y = event.clientY;
  var color = Math.floor(Math.random() * 3);

  var div = document.createElement("div");
  div.style.position = "absolute";
  div.style.marginLeft = x + "px";
  div.style.marginTop = y + "px";
  div.style.width = "10px";
  div.style.borderTop = "5px solid transparent";
  div.style.borderRight = "5px solid transparent";
  div.style.borderLeft = "5px solid transparent";
  div.style.borderBottom = "10px solid " + colors[color];
  div.style.animation = "move 5s ease-in infinite";
  particles.appendChild(div);
  setTimeout(function () {
    div.remove();
  }, 5000);
}

function getParticles() {
  var np = document.documentElement.clientWidth / 40;
  particles.innerHTML = "";
  for (var i = 0; i < np; i++) {
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    //console.log(w, h);
    let rndw = Math.floor(Math.random() * w) + 1;
    let rndh = Math.floor(Math.random() * 1) + 1;
    if (rndw > 1200) {
      rndw = rndw - 100;
    }
    if (rndh > 800) {
      rndw = rndw - 200;
    }
    var widthpt = Math.floor(Math.random() * 8) + 5;
    var hegihtpt = Math.floor(Math.random() * 8) + 5;
    var opty = Math.floor(Math.random() * 4) + 1;
    var anima = Math.floor(Math.random() * 12) + 8;
    var bdr = Math.floor(Math.random() * 2);
    var color = Math.floor(Math.random() * 3);

    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.marginLeft = rndw + "px";
    div.style.marginTop = rndh + "px";
    div.style.width = widthpt + "px";
    div.style.height = hegihtpt + "px";
    div.style.opacity = opty;
    div.style.backgroundColor = colors[color];
    div.style.borderRadius = border[bdr];
    div.style.animation = "move " + anima + "s ease-in infinite";
    particles.appendChild(div);
  }
}

function main(event) {
  getParticles();
  particles.addEventListener("click", createParticle);
}

window.addEventListener("resize", main);
window.addEventListener("load", main);
