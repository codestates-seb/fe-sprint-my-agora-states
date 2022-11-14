//입력 받은 요소의 자식 노드를 모두 삭제하는 함수
function removeAllchild(div) {
  while (div.hasChildNodes()) {
    div.removeChild(div.firstChild);
  }
}

// data load
// localStorage 데이터 읽기

function getAgoraStatesDiscussions() {
  let agoraStatesDiscussions = getLocalStorage("agoraStatesDiscussions");

  if (!agoraStatesDiscussions) {
    agoraStatesDiscussions = agoraStatesDiscussionsTestData;
    setLocalStorage("agoraStatesDiscussions", agoraStatesDiscussions);
  }

  return agoraStatesDiscussions;
}

function getLocalStorage(key) {
  const jsonString = localStorage.getItem(key);
  return JSON.parse(jsonString);
}

function setLocalStorage(key, value) {
  const jsonString = JSON.stringify(value);

  localStorage.setItem(key, jsonString);
}

export { removeAllchild, getAgoraStatesDiscussions, setLocalStorage };
