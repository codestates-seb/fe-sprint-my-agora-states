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

  // TODO
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of" + obj.author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);

  //content - title
  const contentTitle = document.createElement("h2");
  const contentLink = document.createElement("a");
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  contentTitle.className = "discussion__title";
  contentTitle.append(contentLink);
  discussionContent.append(contentTitle);

  // 삽질 ${new Date(obj.createdAt).toLocaleTimeString()} 을 길게 쓴것,
  // const date = new Date(obj.createdAt);
  // const hour = date.getHours();
  // const minute = date.getMinutes();
  // const second = date.getSeconds();
  // const getTime = `${hour < 12 ? "오전" : "오후"} ${
  //   hour < 10 ? `0${hour}` : hour && hour < 13 ? hour : hour - 12
  // }:${minute < 10 ? `0${minute}` : minute}:${
  //   second < 10 ? `0${second}` : second
  // }`;
  // contentInfomation.textContent = `${obj.author} | ${getTime}`;

  //content - infomation - date
  const contentInfomation = document.createElement("div");
  contentInfomation.textContent = `${obj.author} | ${new Date(
    obj.createdAt
  ).toLocaleTimeString()}`;
  contentInfomation.className = "discussion__information";
  discussionContent.append(contentInfomation);

  //check
  const ischeck = document.createElement("p");
  ischeck.textContent = obj.answer ? "✅" : "❎";
  discussionAnswered.append(ischeck);

  const ul = document.querySelector("ul.discussions__container");
  ul.append(li);

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
// 마지막에 fetch 줘야 에러안난다 // 아고라 서버파일에 서버를 켜야 fetch가 된다
fetch(`http://localhost:3001/discussions`)
  .then((res) => res.json())
  .then((json) => {
    agoraStatesDiscussions = json;
    const ul = document.querySelector("ul.discussions__container");
    render(ul);
  });
