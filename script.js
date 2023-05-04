let i = 0;
let start = 0;
let end = 10;

let submitBox = document.querySelector("#submitbox");
let str = {};

submitBox.onclick = function () {
  let masterName = document.querySelector(".inputbox_name");
  let masterTitle = document.querySelector(".inputbox_title");
  let masterQuestion = document.querySelector(".inputbox_question");

  str.author = masterName.value;
  str.title = masterTitle.value;
  str.bodyHTML = masterQuestion.value;
  agoraStatesDiscussions.unshift(str);
  str = {};
  const tweets = document.querySelectorAll(".discussion__container");
  tweets.forEach(function (tweet) {
    tweet.remove();
  });
  const ul = document.querySelector("ul.discussions__container");
  render(ul);
};

const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = agoraStatesDiscussions[i].avatarUrl;
  avatarImg.width = "64";
  avatarImg.height = "64";
  avatarWrapper.append(avatarImg);
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h5");
  discussionTitle.className = "discussion__title";
  const discussionTitleAtag = document.createElement("a");
  discussionTitleAtag.href = agoraStatesDiscussions[i].url;
  discussionTitle.append(discussionTitleAtag);
  discussionTitleAtag.textContent = agoraStatesDiscussions[i].title;
  const discussionInfo = document.createElement("div");
  discussionInfo.textContent = `${
    agoraStatesDiscussions[i].author
  } / ${new Date(
    agoraStatesDiscussions[i].createdAt || Date.now()
  ).toLocaleTimeString()}`;

  discussionContent.append(discussionTitle, discussionInfo);
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const checkBox = document.createElement("input");
  checkBox.className = "check";
  checkBox.type = "checkbox";
  discussionAnswered.append(checkBox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const render = (element) => {
  for (i = start; i < end; i += 1) {
    if (agoraStatesDiscussions[i]) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
  }

  const paginationBox = document.querySelector("#paginationbox");
  const prevButton = document.createElement("button");
  prevButton.className = "prevButton";
  prevButton.textContent = "<";
  prevButton.dataset.dir = "prev";
  prevButton.disabled = start === 0;
  const nextButton = document.createElement("button");
  nextButton.className = "nextButton";
  nextButton.textContent = ">";
  nextButton.dataset.dir = "next";
  nextButton.disabled = end >= agoraStatesDiscussions.length;

  paginationBox.innerHTML = "";
  paginationBox.append(prevButton, nextButton);

  return;
};

const ul = document.querySelector("ul.discussions__container");
const pageButtons = document.querySelector("#paginationbox");

render(ul, start, end);

pageButtons.addEventListener("click", (event) => {
  const target = event.target;
  if (target.tagName !== "BUTTON") return;

  if (target.dataset.dir === "prev" && start > 0) {
    start -= 10;
    end -= 10;
  } else if (
    target.dataset.dir === "next" &&
    end < agoraStatesDiscussions.length
  ) {
    start += 10;
    end += 10;
  }

  const tweets = document.querySelectorAll(".discussion__container");
  tweets.forEach(function (tweet) {
    tweet.remove();
  });

  render(ul, start, end);
});
