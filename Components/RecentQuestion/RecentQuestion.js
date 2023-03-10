const convertToDiscussion = (obj) => {
    const li = document.createElement("li");
    li.className = "mini__discussion__container";

    const avatarWrapper = document.createElement("div");
    avatarWrapper.className = "mini__discussion__avatar--wrapper";
    const avatarImg = document.createElement('img');
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarWrapper.append(avatarImg);

    const discussionContent = document.createElement('div');
    discussionContent.className = "discussion__content";

    const discussionTitle = document.createElement('div');
    discussionTitle.className = "mini__discussion__title";
    discussionTitle.textContent = obj.title;

    const discussionInfo = document.createElement('div');
    discussionInfo.className = "discussion__info";

    const discussionAuthor = document.createElement('div');
    discussionAuthor.className = "mini__discussion__author";
    discussionAuthor.textContent = obj.author;
    const discussionDate = document.createElement('div');
    discussionDate.className = "mini__discussion__date";
    discussionDate.textContent = obj.createdAt;

    discussionInfo.append(discussionAuthor, discussionDate);
    discussionContent.append(discussionTitle, discussionInfo);

    li.append(avatarWrapper, discussionContent);
    return li;
  };

  const renderRecentQuestion = (element) => {
    for (let i = 0; i < 8; i += 1) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    return;
  };

  const renderHotTopicQuestion = (element) => {
    for (let i = 0; i < 4; i += 1) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    }
    return;
  }

  const RecentQuestionUL = document.querySelector("ul.recent-question-list");
  renderRecentQuestion(RecentQuestionUL);

  const HotTopicUL = document.querySelector("ul.hotTopic-list");
  renderHotTopicQuestion(HotTopicUL)