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

  // 아바타 이미지
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;

  avatarWrapper.append(avatarImg);

  // 컨텐츠
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";

  const discussionLink = document.createElement("a");
  discussionLink.href = obj.url;
  discussionLink.textContent = obj.title;

  discussionTitle.append(discussionLink);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;

  discussionTitle.append(discussionLink);
  discussionContent.append(discussionTitle, discussionInfo);

  // 답변 체크표시
  const discussionAnsChek = document.createElement("p");

  if (obj.answer === null) {
    discussionAnsChek.textContent = '☐'
  }
  else {
    discussionAnsChek.textContent = '☑'
  }

  discussionAnswered.append(discussionAnsChek);

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

const submitBtn = document.querySelector('input[type="submit"]');

let nameInput = document.querySelector('#name');
let titleInput = document.querySelector('#title');
let questionInput = document.querySelector('#story');


submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  let newobj = {
    id: "new id",
    createdAt: new Date(),
    title: titleInput.value,
    url: "#",
    author: nameInput.value,
    answer: null,
    bodyHTML: "new bodyHTML",
    avatarUrl:
      "https://e7.pngegg.com/pngimages/223/244/png-clipart-computer-icons-avatar-user-profile-avatar-heroes-rectangle.png",
  }
  agoraStatesDiscussions.unshift(newobj);
  ul.prepend(convertToDiscussion(newobj));
  nameInput.value = '';
  titleInput.value = '';
  questionInput.value = '';
});