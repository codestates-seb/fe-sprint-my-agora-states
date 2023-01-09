import { agoraStatesDiscussions } from "./data.js";
import $ from "./utils/selector.js";
import getDiscussionComponent from "./components/discussion.js";

function createDiscussions() {
  const discussions = [];

  for (const discussion of agoraStatesDiscussions) {
    discussions.push(getDiscussionComponent(discussion));
  }

  return discussions.join("");
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (target, element) => {
  target.innerHTML = element;

  return "discussions rendered succesfully";
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const discussionsContainer = $("ul.discussions__container");
const discussions = createDiscussions();
render(discussionsContainer, discussions);
