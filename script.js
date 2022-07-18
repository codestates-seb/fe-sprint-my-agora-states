// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__upper--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";


  //avatarWrapper에 프로필 사진 넣기
  const avatarImage = document.createElement("img");
    avatarImage.className = "discussion__upper--image";
    avatarImage.setAttribute("src", obj.avatarUrl)
    avatarImage.setAttribute("alt", `avatar of ${obj.author}`);

  avatarWrapper.append(avatarImage);

  //avatarWrapper에 프로필 텍스트 감싸는거 넣기
  const profileText = document.createElement("span");
  profileText.className = "discussion__upper--profile";
    //profileText에 사용자 닉네임 넣기
    const profileAuthor = document.createElement("div");
    profileAuthor.className = "discussion__upper--profile--author";
    profileAuthor.innerText = String(obj.author);
    profileText.append(profileAuthor);
    //profileText에 작성 시간 넣기
    const profileWrittenTime = document.createElement("div");
    profileWrittenTime.className = "discussion__upper--profile--writtentime";
      const timeText = `${obj.createdAt.slice(5,7)}.${obj.createdAt.slice(8,10)} ${obj.createdAt.slice(11,19)}`;
    profileWrittenTime.innerText = String(timeText);
    profileText.append(profileWrittenTime);
    //profileText avatarWrapper에 넣기
  avatarWrapper.append(profileText);
    
    //avatarWrapper에 answersheet 넣기
  const profileAnswer = document.createElement("span");
  profileAnswer.className = "discussion__upper--answersheet";
    //profileAnswer에 답변됨 박스 넣기
    const answered = document.createElement("div");
    answered.className = "discussion__upper--answersheet-answered";
      //answered에 초록 체크 넣기
      const checkbox = document.createElement("div");
      answered.append(checkbox);

    const notanswered = document.createElement("div");
    notanswered.className = "discussion__upper--answersheet-notanswered";
      //notanswered에 빨강 엑스 넣기
      const xbox = document.createElement("div");
      notanswered.append(xbox);

      //안보이게 할 박스 정하기
      console.log(obj.answer);
      obj.answer === null ? xbox.innerText = "❎" : checkbox.innerText = "✅";
    profileAnswer.append(answered);
    profileAnswer.append(notanswered);
  
  avatarWrapper.append(profileAnswer);



  const discussionLink = document.createElement("h2");
  discussionLink.className = "discussion__title";
    const discussionLinkText = document.createElement("a");
    discussionLinkText.setAttribute("href", obj.url);
    discussionLinkText.setAttribute("target", "_blank");
    discussionLinkText.className = "discussion__title--text";
    discussionLinkText.innerText = obj.title;
    discussionLink.append(discussionLinkText);


  const discussionWantedbox = document.createElement("div");
  discussionWantedbox.className = "discussion__wantedbox";
    const discussionWantedboxText = document.createElement("div")
    discussionWantedboxText.className = "discussion__wantedbox--text";
    discussionWantedboxText.innerText = "궁금해요!"
    discussionWantedbox.append(discussionWantedboxText);

    const discussionWantedButton = document.createElement("button");
    discussionWantedButton.className = "discussion__wantedbox--button";
    discussionWantedButton.innerText = "0"
    discussionWantedbox.append(discussionWantedButton);


  discussionContent.append(discussionLink);
  discussionContent.append(discussionWantedbox);
  

  li.append(avatarWrapper, discussionContent);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
