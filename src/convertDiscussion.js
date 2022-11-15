export const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성

  const avatarWrapper = document.createElement("div");
  const discussionContent = document.createElement("div");
  const discussionInformation = document.createElement("div");
  const discussionAnswered = document.createElement("div");
  const iconImg = document.createElement("img");
  const discussionTitle = document.createElement("h2");
  const discussionLink = document.createElement("a");
  const discussionInfo = document.createElement("div");
  const discussionAnsweredCheck = document.createElement("i");
  // 클래스 이름 지정
  li.className = "discussion__container";
  avatarWrapper.className = "discussion__avatar--wrapper";
  discussionContent.className = "discussion__content";
  discussionInformation.className = "discussion__information";
  discussionAnswered.className = "discussion__answered";
  iconImg.className = "discussion__avatar--image";
  discussionInfo.className = "discussion__information";

  //discussionWrapper
  iconImg.setAttribute("src", `${obj.avatarUrl}`);
  avatarWrapper.append(iconImg);
  //discussionContent
  discussionLink.setAttribute("href", `${obj.url}`);
  discussionLink.textContent = `${obj.title}`;
  discussionInfo.textContent = `${obj.author}/${obj.createdAt}`;
  discussionTitle.append(discussionLink);
  discussionContent.append(discussionTitle, discussionInfo);
  //discussionAnswered
  discussionAnsweredCheck.className = obj.answer
    ? "fa-solid fa-circle-check"
    : "fa-solid fa-circle-xmark";
  discussionAnswered.append(discussionAnsweredCheck);
  //li
  li.append(
    avatarWrapper,
    discussionContent,
    discussionInformation,
    discussionAnswered
  );
  return li;
};
