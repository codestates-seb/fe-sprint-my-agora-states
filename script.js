const ul = document.querySelector("ul.discussions__container");
let getNewData = JSON.parse(localStorage.getItem("discussions"));

// 댓글 작성버튼 누를때
// 객체를 만들고 배열에 추가된다.
const makeNewDiscussion = (event) => {
  event.preventDefault();

  const newName = document.getElementById("name").value;
  const newTitle = document.getElementById("title").value;
  const newContent = document.getElementById("story").value;

  let time = new Date();
  function getToday() {
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return "작성시간 : " + year + "년 " + month + "월 " + day + "일";
  }

  // let randomNum = {
  //   Math.floor(Math.random() * 899999999 + 10000;)
  // }

  const newObj = {
    id: "new",
    createdAt: getToday(),
    title: newTitle,
    avatarUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg",
    author: newName,
    answer: null,
    bodyHTML: `<p>${newContent}</p>`,
  };

  agoraStatesDiscussions.unshift(newObj);
  localStorage.setItem("discussions", JSON.stringify(agoraStatesDiscussions));

  ul.innerHTML = "";
  render(ul);
};

window.onload = () => {
  getNewData = localStorage.getItem("discussions");
  if (getNewData !== null) {
    agoraStatesDiscussions = JSON.parse(getNewData);
  }
  render(ul);
};

const formButton = document.getElementById("submit");
formButton.addEventListener("click", makeNewDiscussion);

const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";

  const deleteButton = document.createElement("button");
  deleteButton.className = "discussion__content--delete";
  deleteButton.textContent = "삭제";
  deleteButton.addEventListener("click", function () {
    const index = agoraStatesDiscussions.indexOf(obj);
    if (index > -1) {
      agoraStatesDiscussions.splice(index, 1);
      localStorage.setItem(
        "discussions",
        JSON.stringify(agoraStatesDiscussions)
      );
      ul.innerHTML = "";
      render(ul);
    }
  });

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionTitle = document.createElement("h2");
  const discussionAnchor = document.createElement("a");
  discussionAnchor.textContent = obj.title;
  discussionAnchor.href = obj.url;
  discussionAnchor.target = "_blank";

  const avatarImg = document.createElement("img");
  avatarImg.classList.add("discussion__avatar--image");
  avatarImg.src = obj.avatarUrl;

  const discusstionId = document.createElement("div");
  discusstionId.textContent = obj.id;

  const discusstionCreatedAt = document.createElement("div");
  discusstionCreatedAt.textContent = obj.createdAt;

  const discussionAuthor = document.createElement("div");
  discussionAuthor.textContent = obj.author;

  discussionTitle.append(discussionAnchor);
  discussionContent.append(
    discussionTitle,
    discussionAuthor,
    discusstionCreatedAt
  );

  if (obj.answer === null) {
    discussionContent.append("답변없음");
  } else {
    discussionContent.append("답변있음");
  }

  avatarWrapper.append(avatarImg);
  li.append(avatarWrapper, discussionContent, discussionAnswered, deleteButton);
  return li;
};

const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i++) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
};
