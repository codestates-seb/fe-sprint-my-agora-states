//localStorage로 변환해보장
//localStorage INSERT
const DATA_KEY = "DUMMY";
const LOCAL_STORAGE = window.localStorage;

let isInit = JSON.parse(LOCAL_STORAGE.getItem("init"));
if (isInit) {
  LOCAL_STORAGE.setItem(DATA_KEY, JSON.stringify(agoraStatesDiscussions));
  LOCAL_STORAGE.setItem("init", JSON.stringify(true));
}
