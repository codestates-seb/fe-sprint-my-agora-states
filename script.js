// 댭변 상태에 따라 아이콘 사용
const ANSWERED_MARK = "☑︎";
const UNANSERED_MARK = "◻︎";

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement("img");

  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarImg.className = "discussion__avatar--image";

  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";

  const discussionUrl = document.createElement("a");

  discussionUrl.href = obj.url;
  discussionUrl.textContent = obj.title;

  discussionTitle.append(discussionUrl);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";

  const createQuestionDate = new Date(obj.createdAt).toLocaleString();

  discussionInformation.textContent = `${obj.author} / ${createQuestionDate}`;

  discussionContent.append(discussionTitle, discussionInformation);

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const discussionIcon = document.createElement("p");

  if (obj.answer === null) {
    discussionIcon.textContent = UNANSERED_MARK;
  } else {
    discussionIcon.textContent = ANSWERED_MARK;
  }

  discussionAnswered.append(discussionIcon);

  // 자세히 보기 버튼
  const discussionAnswerButton = document.createElement("button");
  discussionAnswerButton.className = "discussion__answer__button";
  discussionAnswerButton.textContent = "자세히 보기";

  // 자세히 보기 버튼을 누르면 보이는 컨텐츠 영역
  const discussionAnswerContent = document.createElement("div");
  discussionAnswerContent.className = "discussion__answer__content";

  // 질문 제목
  const discussionQuestionTitle = document.createElement("h2");
  discussionQuestionTitle.className = "discussion__question__title";

  discussionQuestionTitle.textContent = `🙋‍♀️ ${obj.title}`;

  // 질문 내용
  const discussionQuestionDescription = document.createElement("div");
  discussionQuestionDescription.className = "discussion__question__description";

  discussionQuestionDescription.innerHTML = obj.bodyHTML;

  const discussionAnswerTitle = document.createElement("h2");
  const discussionAnswerInfo = document.createElement("div");
  const answerAvatarImage = document.createElement("img");
  const answerDate = document.createElement("p");

  discussionAnswerInfo.className = "discussion__answer__information";

  const discussionAnswerDescription = document.createElement("div");

  discussionAnswerTitle.textContent = "❣️ 답변";

  if (obj.answer != null) {
    discussionAnswerInfo.append(answerDate, answerAvatarImage);

    discussionAnswerDescription.innerHTML = obj.answer.bodyHTML;

    // 답변 제목
    discussionAnswerTitle.className = "discussion__answer__title";

    // 답변한 사람 아바타
    answerAvatarImage.className = "discussion__answer__avatar--image";

    // 답변한 날짜
    answerDate.className = "discussion__answer__date";
    const createAnswerDate = new Date(obj.answer.createdAt).toLocaleString();

    answerAvatarImage.src = obj.answer.avatarUrl;
    answerAvatarImage.alt = "avatar of" + obj.answer.author;
    answerDate.textContent = `${obj.answer.author} / ${createAnswerDate}`;

    // 답변 내용
    discussionAnswerDescription.className = "discussion__answer__description";
  }
  // 답변 내용이 없으면 보여줄 화면
  else {
    discussionAnswerDescription.textContent = "앗 답변이 없네요 😢";
  }

  discussionAnswerContent.append(
    discussionQuestionTitle,
    discussionQuestionDescription,
    discussionAnswerTitle,
    discussionAnswerInfo,
    discussionAnswerDescription
  );

  li.append(avatarWrapper, discussionContent, discussionAnswered, discussionAnswerContent, discussionAnswerButton);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  const pageNo = Number(getQueryString().pageNo || 1);

  for (let i = (pageNo - 1) * 10; i < pageNo * 10; i++) {
    const list = getDiscussionList();
    if (list[i] == null) {
      break;
    }
    element.append(convertToDiscussion(list[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

function getQueryString() {
  const qs = {};
  const qsList = window.location.search
    .slice(1)
    .split("&")
    .map((qs) => qs.split("="));

  for (let i = 0; i < qsList.length; i++) {
    qs[qsList[i][0]] = qsList[i][1];
  }

  return qs;
}
