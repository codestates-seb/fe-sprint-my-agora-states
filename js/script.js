// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
import agoraStatesDiscussions from "./data.js";
import convertToDiscussion from "./fragment.js"; // 개별 돔 생성
import countQ from "./formInput.js";

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.

const render = (element) => {
  let allDiscussions = [];
  if (JSON.parse(localStorage.getItem("allQ")) == null) {
    allDiscussions = [...agoraStatesDiscussions];
  } else {
    allDiscussions = [
      ...JSON.parse(localStorage.getItem("allQ")),
      ...agoraStatesDiscussions,
    ];
  }
  element.append(convertToDiscussion(allDiscussions));
  countQ(allDiscussions.length);
  return;
};
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
