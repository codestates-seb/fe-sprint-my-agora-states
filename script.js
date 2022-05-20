// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
const getData = () => {
  const localStorageData = localStorage.getItem("euisuk");
  if (localStorageData) {
    return JSON.parse(localStorageData);
  }
  return agoraStatesDiscussions;
};

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const dt = new Date(obj.createdAt);
  li.innerHTML = `
    <div class="discussion__avatar--wrapper">
      <img class="discussion__avatar--image"
        src="${obj.avatarUrl}"
        alt="avatar of kimploo">
    </div>
    <div class="discussion__content">
      <h2 class="discussion__title">
        <a href="${obj.url}">${obj.title}</a>
      </h2>
      <div class="discussion__information">${
        obj.author
      }/ ${dt.toLocaleString()}</div>
    </div>
    <div class="discussion__answered"><p>☑</p></div>
  `;
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  element.innerHTML = "";
  const data = getData();
  for (let i = 0; i < data.length; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const submit = document.querySelector("#submit");

let addDiscussion = function (event) {
  event.preventDefault();
  const data = getData();
  const name = document.querySelector("#name");
  const title = document.querySelector("#title");
  const obj = {};

  obj.id = "D_kwDOHOApLM4APjJi";
  obj.author = name.value;
  obj.title = title.value;
  obj.avatarUrl =
    "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4";
  data.unshift(obj);

  localStorage.setItem("euisuk", JSON.stringify(data));

  render(ul);
};
submit.addEventListener("click", addDiscussion);
//submit 누르면 배열을 localStorage 에 저장 render를 할때 localStorage 저장된 데이터를 가져옴 ,
