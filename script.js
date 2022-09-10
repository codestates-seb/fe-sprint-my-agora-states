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
  // 질문의 사진부분
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = obj.author;
  avatarWrapper.append(avatarImg);

  // 질문의 제목과 작성한 시간 부분
  const discussionTitle = document.createElement('h2');
  discussionTitle.className = 'discussion__title';
  const discussionContentLink = document.createElement('a');
  discussionContentLink.href = `${obj.url}`;
  discussionContentLink.textContent = `${obj.title}`;
  discussionTitle.append(discussionContentLink);

  const discussionInformation = document.createElement('div');
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionTitle, discussionInformation);

  // 질문의 답변여부 부분
  const isAnswered = document.createElement('p');
  if(obj.answer !== null) isAnswered.textContent = `☑`;
  else isAnswered.textContent = `☒`;
  discussionAnswered.append(isAnswered);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 디스커션 추가기능
const discussionInputId = document.querySelector(".form__input--name>#name");
const discussionInputTitle = document.querySelector(".form__input--title>#name");
const discussionInputText = document.querySelector(".form__textbox>#story");
const discussionSubmitButton = document.querySelector(".form__submit>input");

discussionSubmitButton.onclick = function() {
  const tmpObj = {
    id: null,
    createdAt: "2022-04-22T14:06:03Z",
    title: discussionInputTitle.value,
    url: null,
    author: discussionInputId.value,
    answer: null,
    bodyHTML: null,
    avatarUrl: null
  };
  agoraStatesDiscussions.push(tmpObj);
  // ul.append(convertToDiscussion(tmpObj));
}

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
