console.log(agoraStateDiscussions);

// Dom으로 classlist 와 class name 포함된 element 쭉 만들기
// <li>
// <div>
// <li>
// <div>

// 만들어진  element 들 append, appendChild 통해서 하나의 <li>형태로 만들어주기.

// textContent로 rendering 해야될 부분은 agoraStateDiscussions 에 있는 데이터들.
// `` 템플릿 리터럴 이용해서 그 부분들만 싹 바꿔치기해

// 위의 내용들을 함수화 시켜봐. 무슨 함수들을 만들어야할까?
// agoraStateDiscussions 라는 [] 배열을 받은다음에, 반복문으로 안에있는 obj 하나씩 돌아갈꺼야.
// 반복문 안의 함수는 obj안의 객체들에서 필요한 property의 value를 뽑은뒤에 -> textContent 으로 만들어줘야되.

// DOM 생성하는애.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // DOM 자식 요소들 만들고 위에 3가지에 적절히 붙이자.
  // avatar image
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.setAttribute("src", `${obj.avatarUrl}`);
  avatarImage.setAttribute("alt", `avatar of ${obj.author}`);
  avatarWrapper.append(avatarImage);

  // content
  const discussionTitleA = document.createElement("a");
  discussionTitleA.setAttribute("href", `${obj.url}`);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 렌덩링하는애.
const render = (el) => {
  // for(let i = 0; i < agoraStatesDiscussions.length; i++) {
  //   el.append(convertToDiscussion(agoraStatesDiscussions[i]))
  // }
  // return;
  for (let dis of agoraStatesDiscussions) {
    el.append(convertToDiscussion(dis));
  }
  return;
};
