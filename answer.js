const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // avatar
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  // content
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  // answered
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarImg.classList.add("discussion__avatar--image");
  avatarWrapper.append(avatarImg);

  const contentTitle = document.createElement("h3");
  contentTitle.className = "discussion__title";
  const contentUrl = document.createElement("a");
  contentUrl.href = obj.url;
  contentUrl.textContent = obj.title;
  contentTitle.append(contentUrl);

  const contentInfo = document.createElement("div");
  contentInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  contentInfo.className = "discussion__information";

  discussionContent.append(contentTitle, contentInfo);

  const answered = document.createElement("div");
  answered.className = "discussion__answered";
  const answeredCheck = document.createElement("p");
  answeredCheck.textContent = obj.answer ? "☑" : "❏";

  answered.append(answeredCheck);
  discussionAnswered.append(answered);

  // 자세히 보기/닫기 버튼으로 질문과 답변 보기/닫기
  // 질문(bodyHTML)과 답변(answer.bodyHTML) - 스크롤
  // 또한 질문 title 이 길어서 펼쳤을 때 따로 제공하기
  // 답변이 없다면 답변없음 보여주기

  // // 자세히 보기 버튼
  // const discussionAnswerButton = document.createElement("button");
  // discussionAnswerButton.className = "discussion__answer__button";
  // discussionAnswerButton.textContent = "자세히 보기";

  // // 자세히 보기 버튼을 누르면 보이는 컨텐츠 영역
  // const discussionAnswerContent = document.createElement("div");
  // discussionAnswerContent.className = "discussion__answer__content";

  // // 질문 제목
  // const discussionQuestionTitle = document.createElement("h2");
  // discussionQuestionTitle.className = "discussion__question__title";

  // discussionQuestionTitle.textContent = `${obj.title}`;

  // // 질문 내용
  // const discussionQuestionDescription = document.createElement("div");
  // discussionQuestionDescription.className = "discussion__question__description";

  // discussionQuestionDescription.innerHTML = obj.bodyHTML;

  // const discussionAnswerTitle = document.createElement("h2");
  // const discussionAnswerInfo = document.createElement("div");
  // const answerAvatarImage = document.createElement("img");
  // const answerDate = document.createElement("p");

  // discussionAnswerInfo.className = "discussion__answer__information";

  // const discussionAnswerDescription = document.createElement("div");

  // discussionAnswerTitle.textContent = "답변";

  // if (obj.answer != null) {
  //   discussionAnswerInfo.append(answerDate, answerAvatarImage);

  //   discussionAnswerDescription.innerHTML = obj.answer.bodyHTML;

  //   // 답변 제목
  //   discussionAnswerTitle.className = "discussion__answer__title";

  //   // 답변한 사람 아바타
  //   answerAvatarImage.className = "discussion__answer__avatar--image";

  //   // 답변한 날짜
  //   answerDate.className = "discussion__answer__date";
  //   const createAnswerDate = new Date(obj.answer.createdAt).toLocaleString();

  //   answerAvatarImage.src = obj.answer.avatarUrl;
  //   answerAvatarImage.alt = "avatar of" + obj.answer.author;
  //   answerDate.textContent = `${obj.answer.author} / ${createAnswerDate}`;

  //   // 답변 내용
  //   discussionAnswerDescription.className = "discussion__answer__description";
  // }
  // // 답변 내용이 없으면 보여줄 화면
  // else {
  //   discussionAnswerDescription.textContent = "답변이 없습니다.";
  // }

  // discussionAnswerContent.append(
  //   discussionQuestionTitle,
  //   discussionQuestionDescription,
  //   discussionAnswerTitle,
  //   discussionAnswerInfo,
  //   discussionAnswerDescription
  // );

  li.append(
    avatarWrapper,
    discussionContent,
    discussionAnswered
    // discussionAnswerContent,
    // discussionAnswerButton
  );

  return li;
};
