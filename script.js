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

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitleH2 = document.createElement("h2");
  discussionTitleH2.className = "discussion__title";
  const discussionTitleA = document.createElement("a");
  discussionTitleA.href = obj.url;
  discussionTitleA.textContent = obj.title;
  discussionTitleH2.append(discussionTitleA);
  discussionContent.append(discussionTitleH2);

  const discussionDate = document.createElement("div");
  discussionDate.className = "discussion__information";
  discussionDate.textContent = obj.createdAt;
  discussionContent.append(discussionDate);

  const answerCheckbox = document.createElement("p");
  if(obj.answer === null){
    answerCheckbox.textContent = "🤍";
  } else {
    answerCheckbox.textContent = "❤️";
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
