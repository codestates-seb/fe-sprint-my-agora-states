// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.classList.add("discussion__avatar--wrapper");

  const discussionContent = document.createElement("div");
  discussionContent.classList.add("discussion__content");

  const discussionAnswered = document.createElement("div");
  discussionAnswered.classList.add("discussion__answered");

  const avatarimage = document.createElement("img"); //아바타 이미지 할당
  avatarimage.classList.add("discussion__avatar--image");
  avatarimage.setAttribute("src", obj.avatarUrl); //이미지 주소 할당
  avatarimage.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarimage); //avatarWrapper에 avatarimage를 자식으로 추가

  const title = document.createElement("h2");
  title.classList.add("discussion__title");
  const Url = document.createElement("a"); //url 정보가 담긴 a태그
  Url.setAttribute("href", obj.url);
  Url.textContent = obj.title;
  title.append(Url);

  const information = document.createElement("div");
  information.classList.add("discussion__information");
  information.textContent = obj.author + "/" + obj.createdAt;

  discussionContent.append(title, information); //title과 information(유저id,날짜)를 discussionContent의 자식으로 추가

  const answered = document.createElement("p");
  answered.textContent = "☑";
  discussionAnswered.append(answered); //answered를 discussionAnswered의 자식으로 추가

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let index in agoraStatesDiscussions) {
    element.append(convertToDiscussion(agoraStatesDiscussions[index]));
  }
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
