// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  // 아바타 프로필 사진이 들어갈 <img> 요소를 추가하기!
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  // 질문, 글쓴이, 날짜 요소를 추가하기!
  const discussionTitle = document.createElement("h2"); //질문제목
  const discussionTitletext = document.createElement("a"); //링크
  discussionTitletext.href = obj.url;
  discussionTitletext.textContent = obj.title;
  discussionTitle.append(discussionTitletext);

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  //질문 글쓴이, 날짜 리터럴 선언
  discussionInformation.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleDateString()}`;
  //질문 내용
  discussionContent.append(discussionTitle, discussionInformation);

  //체크박스 넣기 (답변이 있고 없음에 이모지 출력)
  const answerCheckbox = document.createElement("p");
  if (obj.answer === null) {
    answerCheckbox.textContent = "🥺";
  } else {
    answerCheckbox.textContent = "😚";
  }
  discussionAnswered.append(answerCheckbox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
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
