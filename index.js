const $ = (selector) => document.querySelector(selector);

const ul = $("ul.discussions__container");

const convertToDiscussion = (name, img, story) => {
  const li = document.createElement("li");
  li.className = "discussion__container";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  avatarWrapper.innerText = name;

  const discussionContent = document.createElement("img");
  discussionContent.className = "discussion__content";
  discussionContent.src = img;

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  discussionAnswered.innerText = story;

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    const data = agoraStatesDiscussions[i];
    element.append(convertToDiscussion(data.title, data.avatarUrl, data.id));
  }
  return;
};

const handleSubmit = (e) => {
  e.preventDefault();

  const name = $("#name").value;
  const title = $("#title").value;
  const story = $("#story").value;
  ul.append(convertToDiscussion(name, title, story));
};

$(".form").addEventListener("submit", handleSubmit);

render(ul);
