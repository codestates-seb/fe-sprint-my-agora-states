// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li");
  li.className = "discussion__container";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = obj.author;
  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const title = document.createElement("h2");
  title.innerHTML = `<a href="${obj.url}"> ${obj.title}</a>`;
  const author = document.createElement("div");
  
  const date = document.createElement("div");
  date.className = "discussion__date";
  author.style.fontSize ='14px';
  author.textContent = obj.author +'/'+ obj.createdAt;
  discussionContent.append(title, author, date);

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const answer = document.createElement("p");
  const answerLabel = document.createElement("span");
  const answeredMark = document.createElement("span");
  answeredMark.textContent = obj.answer ? "☑" : "☒";
  answeredMark.style.marginLeft = "0px";
  answer.append(answerLabel, answeredMark);
  discussionAnswered.append(answer);

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

