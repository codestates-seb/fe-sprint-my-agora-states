// @ts-check

import { convertToTime } from "./utils.js";

/**
 * @typedef { import("../@types/discussion").Discussion } Discussion
 * @typedef { import("../@types/discussion").Answer } Answer
 */

/**
 * 2023/01/09 - 아바타 생성 - by 1-blue
 * @param { string } url avatar url
 * @returns { HTMLImageElement } 완성된 img ( 아바타 )
 */
export const createAvatar = (url) => {
  const $$avatar = document.createElement("img");
  $$avatar.src = url;
  $$avatar.classList.add("avatar");

  return $$avatar;
};

/**
 * 2023/01/06 - 제목 생성 - by 1-blue
 * @param { string } title 제목
 * @param { string } url 질문 링크
 * @returns { HTMLAnchorElement } 완성된 a ( 제목 )
 */
export const createTitle = (title, url) => {
  const $$link = document.createElement("a");
  const $$title = document.createElement("h3");

  $$link.href = url;
  $$link.target = "_blank";
  $$link.classList.add("title-link");

  $$title.innerText = title;
  $$title.classList.add("title");

  $$link.append($$title);

  return $$link;
};

/**
 * 2023/01/06 - 작성자/작성시간 생성 - by 1-blue
 * @param { string } author 작성자
 * @param { string } createdAt 작성 시간
 * @returns { HTMLDivElement } 완성된 div ( 내부에 작성자와 작성시간이 들어가 있음 )
 */
export const createAuthorAndCreatedAt = (author, createdAt) => {
  const $$wrapper = document.createElement("div");
  const $$author = document.createElement("span");
  const $$createdAt = document.createElement("time");

  $$author.innerText = author;
  $$createdAt.innerText = convertToTime(new Date(createdAt));

  $$wrapper.classList.add("discussion__author__createdAt--wrapper");
  $$author.classList.add("author");
  $$createdAt.classList.add("createdAt");

  $$wrapper.append($$author, $$createdAt);

  return $$wrapper;
};

/**
 * 2023/01/06 - 질문에 대한 응답 여부 생성 - by 1-blue
 * @param { boolean } isAnswer
 * @returns { HTMLSpanElement } 응답 여부가 작성된 span
 */
export const createAnswered = (isAnswer) => {
  const $$answered = document.createElement("span");

  $$answered.innerText = isAnswer ? "☑" : "☐";

  $$answered.classList.add("answered");

  return $$answered;
};

/**
 * 2023/01/09 - 답변 생성 - by 1-blue
 * @param { Answer } answer
 * @returns { HTMLDivElement } 완성된 답변
 */
export const createAnwser = (answer) => {
  const $$answerWrapper = document.createElement("div");
  const $$avatar = createAvatar(answer.avatarUrl);
  const $$authorAndCreatedAt = createAuthorAndCreatedAt(
    answer.author,
    answer.createdAt
  );
  const $$content = document.createElement("div");

  $$answerWrapper.classList.add("discussion__answer--wrapper");
  $$content.innerHTML = answer.bodyHTML;

  // FIXME: 아 망했어
  const $$div = document.createElement("div");
  $$div.classList.add("answer-avatar-author-createdAt");

  $$div.append($$avatar, $$authorAndCreatedAt);

  $$answerWrapper.append($$div, $$content);

  return $$answerWrapper;
};

/**
 * 2023/01/09 - 답변 토글 버튼 생성 - by 1-blue
 * @param { HTMLDivElement } $$answerWrapper 답변 컨테이너
 * @returns { HTMLButtonElement } 답변 보기 버튼
 */
export const createToggleAnswerButton = ($$answerWrapper) => {
  const $$button = document.createElement("button");
  $$button.type = "button";
  $$button.innerText = "답변 보기";
  $$button.classList.add("answer-toggle-button");

  $$button.addEventListener("click", () => {
    $$answerWrapper.classList.toggle("answer-show");

    if ($$answerWrapper.classList.contains("answer-show")) {
      $$button.innerText = "답변 숨기기";
    } else {
      $$button.innerText = "답변 보기";
    }
  });

  return $$button;
};

/**
 * 2023/01/09 - discussion 생성 - by 1-blue
 *
 * @param { Discussion } discussion 질문 객체 ( Discussion )
 * @param { boolean } isHide display none; 여부
 * @returns { HTMLLIElement } 질문이 완성된 HTML 형태
 */
export const createDiscussion = (discussion, isHide = true) => {
  // 모두를 담은 태그 ( 아바타, 제목, 작성자, 작성시간, 응답여부, 응답 )
  const $$discussionContainer = document.createElement("li");
  $$discussionContainer.className = "discussion__container select-none";
  isHide && $$discussionContainer.classList.add("hide");

  // 응답을 제외한 것을 담을 태그 ( 아바타, 제목, 작성자, 작성시간, 응답여부 ( 레이아웃을 위함 ( 상/하단으로 나누기 위함 ) ) )
  const $$discussionWrapper = document.createElement("div");
  $$discussionWrapper.classList.add("discussion__wrapper");

  // 아바타를 담는 태그
  const $$avatarWrapper = document.createElement("div");
  $$avatarWrapper.className = "discussion__avatar--wrapper";
  // 제목/작성자/작성시간을 담는 태그
  const $$discussionContent = document.createElement("div");
  $$discussionContent.className = "discussion__content";
  // 응답여부를 담는 태그
  const $$discussionAnswered = document.createElement("div");
  $$discussionAnswered.className = "discussion__answered";

  // 아바타 / 제목 / 작성자/작성시간 / 질문응답여부 태그 생성
  const $$avatar = createAvatar(discussion.avatarUrl);
  const $$createdTitle = createTitle(discussion.title, discussion.url);
  const $$createdAuthorAndCreatedAt = createAuthorAndCreatedAt(
    discussion.author,
    discussion.createdAt
  );
  const $$createdAnswerd = createAnswered(!!discussion.answer);

  // 제목 / 작성자/작성시간 추가
  $$avatarWrapper.appendChild($$avatar);
  $$discussionContent.append($$createdTitle, $$createdAuthorAndCreatedAt);
  $$discussionAnswered.appendChild($$createdAnswerd);

  // 컨테이너 하위 wrapper에 추가 ( discussion 상단 )
  $$discussionWrapper.append(
    $$avatarWrapper,
    $$discussionContent,
    $$discussionAnswered
  );

  $$discussionContainer.appendChild($$discussionWrapper);

  // 질문이 있는 경우
  if (discussion.answer) {
    const $$answerWrapper = createAnwser(discussion.answer);
    const $$answerToggleButton = createToggleAnswerButton($$answerWrapper);

    $$discussionContainer.append($$answerWrapper, $$answerToggleButton);
  }

  return $$discussionContainer;
};
