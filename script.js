// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
//localStorage에 저장 있으면 저장하지 않음
if (!localStorage.getItem("agoraStatesDiscussions")) {
  localStorage.setItem(
    "agoraStatesDiscussions",
    JSON.stringify(agoraStatesDiscussions)
  );
}
//테스트
let newObj = {
  title: "지영바보",
  author: "이한길",
  createdAt: new Date().toISOString(),
  avatarUrl: "https://avatars.githubusercontent.com/u/53474999?v=4",
};
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
  //img 생성 및 추가
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);
  //discussion__content title, info 생성 및 추가
  const title = document.createElement("h2");
  title.className = "discussion__title";
  title.innerHTML = `<a href = "${obj.url}">${obj.title}</a>`;
  const info = document.createElement("div");
  info.className = "discussion__information";

  //timeFormat을 설정했지만 이미 함수가 있었다.
  // info.textContent = `${obj.author} / ${timeFormat(obj.createdAt)}`;

  info.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;
  discussionContent.append(title, info);
  // console.log(answer);
  const check = obj.answer ? `☑${Object.keys(obj.answer).length}` : `☒0`;

  discussionAnswered.append(check);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  const arrAgora = JSON.parse(localStorage.getItem("agoraStatesDiscussions"));
  for (let i = 0; i < arrAgora.length; i += 1) {
    element.append(convertToDiscussion(arrAgora[i]));
  }
  return;
};

//데이터 추가하기
// agoraStatesDiscussions.unshift({
//   title: "지영바보",
//   author: "이한길",
//   createdAt: "2022-05-15T09:28:00Z",
//   avatarUrl: "https://avatars.githubusercontent.com/u/53474999?v=4",
// });

// // const addDiscussions = () => {};

// let form = document.querySelector(".form");
// let formSubmit = document.querySelector(".form__submit");

// formSubmit.addEventListener("click", function () {
//   console.log("서브밋 눌림");
// });

//데이터 추가하기
let formSubmit = document.querySelector(".form__submit");
let inputName = document.querySelector("#name");
let inputTitle = document.querySelector("#title");
let inputStory = document.querySelector("#story");
formSubmit.addEventListener("click", function () {
  if (inputTitle.value && inputName.value && inputStory.value) {
    alert("등록하시겠습니까?");
    let newObj = {
      title: inputTitle.value,
      author: inputName.value,
      createdAt: new Date().toISOString(),
      // createdAt: "2022-05-15T09:28:00Z",
      avatarUrl: "https://avatars.githubusercontent.com/u/53474999?v=4",
    };
    newAgoraStatesDiscussions = JSON.parse(
      localStorage.getItem("agoraStatesDiscussions")
    );
    console.log(newAgoraStatesDiscussions);
    newAgoraStatesDiscussions.unshift(newObj);

    localStorage.setItem(
      "agoraStatesDiscussions",
      JSON.stringify(newAgoraStatesDiscussions)
    );
    inputName.value = "";
    inputTitle.value = "";
    inputStory.value = "";
    ul.innerHTML = "";
    render(ul);
  } else {
    alert("모든 입력을 완료해주세요");
  }
  // ul.append(convertToDiscussion(newObj));
  // return;
});

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다. 이걸 제일 마지막에 하기
const ul = document.querySelector("ul.discussions__container");
render(ul);

function timeFormat(str) {
  time = str.split(/T|-|:|Z/);

  if (parseInt(time[3]) > 13) {
    time[3] = `오후 ${time[3] - 12}`;
  } else {
    time[3] = `오전 ${time[3]}`;
  }

  return `${time.slice(0, 3).join("-")} ${time.slice(3, 6).join(":")}`;
}
