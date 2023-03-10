const urlParams = new URL(location.href).searchParams;
let category = urlParams.get('category');

let categoryTitle = document.querySelector('.category-name');
categoryTitle.textContent = category;

console.log(agoraStatesDiscussions)

const convertToDiscussion = (obj) => {
    const li = document.createElement("li");
    li.className = "discussion__container";

    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "discussion__avatar--wrapper";
    const avatarImg = document.createElement('img');
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

    const discussionContent = document.createElement('div');
    discussionContent.className = "discussion__content";

    const discussionTitle = document.createElement('div');
    discussionTitle.className = "discussion__title";
    discussionTitle.textContent = obj.title;

    const discussionSummary = document.createElement('div');
    discussionSummary.className = "discussion__summary__";
    discussionSummary.innerHTML = obj.bodyHTML;

    const discussionInfo = document.createElement('div');
    discussionInfo.className = "discussion__info";

    const discussionAuthor = document.createElement('div');
    discussionAuthor.className = "discussion__author";
    discussionAuthor.textContent = obj.author;
    const discussionDate = document.createElement('div');
    discussionDate.className = "discussion__date";
    discussionDate.textContent = obj.createdAt;

    discussionInfo.append(discussionAuthor, discussionDate);
    discussionContent.append(discussionTitle, discussionInfo);

    li.append(avatarWrapper, discussionContent);
    return li;
  };

  const render = (element) => {
    for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    return;
  };

  const boardList = document.querySelector("ul.board-list");
  render(boardList);