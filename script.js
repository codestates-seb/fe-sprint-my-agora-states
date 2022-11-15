// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
const submit = document.querySelector(".submit");
const userInputName = document.querySelector("#name");
const userInputTitle = document.querySelector("#title");
const userInputStory = document.querySelector("#story");
let localStory = [];
let page = 1;
let limit = 10;
let block = 3;

function saveDiscussions() {
  localStorage.setItem("discussions", JSON.stringify(localStory));
}
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const img = document.createElement("img");
  img.src = obj.avatarUrl;
  img.alt = "avatar of " + obj.author;
  img.className = "discussion__avatar--image";
  avatarWrapper.append(img);

  const title = document.createElement("h2");
  const subtitle = document.createElement("a");
  title.className = "discussion__title";
  subtitle.href = obj.url;
  subtitle.textContent = obj.title;
  subtitle.className = "discussion__information";
  title.append(subtitle);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionContent.append(title, discussionInformation);

  const checked = document.createElement("p");
  checked.textContent = checked ? "☑" : "☒";
  discussionAnswered.append(checked);
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  ul.prepend(li);
  return li;
};

submit.addEventListener("click", (event) => {
  if (userInputTitle.value !== "") {
    let obj = {
      id: "jangjiwoo",
      createdAt: new Date(),
      author: userInputName.value,
      title: userInputTitle.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/94212747?s=64&u=145778e6dfbd813a6689a634ed3bb47f1bfa7b17&v=4",
      url: "https://github.com/codestates-seb/agora-states-fe/discussions",
      answer: null,
    };
    event.preventDefault();
    userInputName.value = "";
    userInputTitle.value = "";
    userInputStory.value = "";
    localStory.push(obj);
    saveDiscussions();
    convertToDiscussion(obj);
  }
});

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const ul = document.querySelector("ul.discussions__container");
const render = (element) => {
  let totalPage = Math.ceil(agoraStatesDiscussions.length / limit); //토탈페이지
  let now = (page - 1) * limit;
  let blockPage = limit * page;
  let blockGroup = Math.ceil(page / block);

  element.innerHTML = "";

  for (let i = now; i < blockPage; i++) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }

  let pageLast = blockGroup * block;

  const startPage = pageLast - (block - 1) <= 0 ? 1 : pageLast - (block - 1);
  //
  let endPage = blockGroup - 1 + block;

  endPage = endPage >= totalPage ? totalPage : endPage;

  let html = ``;

  if (startPage > 1) {
    html += `<div class = "pagenation_left">◀️</div>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    html += `<div class="paging-children" data-index="${i}">${i}</div>`;
  }
  if (endPage > startPage) {
    html += `<div class="pagenation_right">▶</div>`;
  }

  document.querySelector(".pagenation").innerHTML = html;
  document.querySelectorAll(".paging-children").forEach((ele) => {
    ele.addEventListener("click", () => {
      const dataIndex = ele.dataset.index;
      page = dataIndex;
      render(ul);
    });
  });
  if (document.querySelector(".pagenation_left")) {
    document.querySelector(".pagenation_left").addEventListener("click", () => {
      page = endPage - 1;
      render(ul);
    });
  }

  if (document.querySelector(".pagenation_right")) {
    document
      .querySelector(".pagenation_right")
      .addEventListener("click", () => {
        page = endPage + 1;
        render(ul);
      });
  }

  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.

render(ul);

localStorage.getItem("discussions");

if (localStorage.getItem("discussions")) {
  localStory = JSON.parse(localStorage.getItem("discussions"));
  for (let i = 0; i < localStory.length; i++) {
    convertToDiscussion(localStory[i]);
  }
}
