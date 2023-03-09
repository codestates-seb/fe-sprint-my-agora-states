// createElement 함수
function createEl(tagname, classname, textcontent) {
  const el = document.createElement(tagname);
  el.className = classname;
  el.textContent = textcontent;
  return el;
}

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = createEl("li", "discussion__container"); // 클래스 이름 지정

  const avatarWrapper = createEl("div", "discussion__avatar--wrapper");
  const discussionContent = createEl("div", "discussion__content");
  const discussionAnswered = createEl("div", "discussion__answered");
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = createEl("img", "discussion__avatar--image");

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  ul.append(li);
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
