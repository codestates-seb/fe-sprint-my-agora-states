// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

//입력폼
const inputUserName = document.querySelector("#user-name");
const inputTitle = document.querySelector("#title-name");
const inputStory = document.querySelector("#story");
const submitBtn = document.querySelector("#submit");
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    inputUserName.value.length ||
    inputTitle.value.length ||
    inputStory.value.length
  ) {
    let obj = {
      id: "D_kwDOHOApLM4APjJi",
      createdAt: new Date(),
      title: inputTitle.value,
      author: inputUserName.value,
      bodyHTML: inputStory.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    };

    if (localStorage.getItem("newArray") !== null) {
      let out = JSON.parse(localStorage.newArray);
      out.unshift(obj);
      localStorage.setItem("newArray", JSON.stringify(out));
    } else {
      localStorage.setItem("newArray", JSON.stringify([obj]));
    }

    const array = JSON.parse(localStorage.newArray);
    const addObj = convertToDiscussion(...array);
    ul.prepend(addObj);

    makeStorage(JSON.parse(localStorage.newArray));
  }

  inputUserName.value = "";
  inputTitle.value = "";
  inputStory.value = "";
});

function makeStorage(array) {
  console.log(array.length, agoraStatesDiscussions.length);

  let result = [];
  // console.log(agoraStatesDiscussions[0]);
  // console.log(array[0]);
  if (JSON.stringify(agoraStatesDiscussions[0]) === JSON.stringify(array[0])) {
    result = agoraStatesDiscussions;
  } else {
    result = agoraStatesDiscussions.unshift(...array);
  }

  console.log(result);
  return result;
}

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
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = "avatar of " + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionTitleLink = document.createElement("a");
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink);
  discussionContent.append(discussionTitle);

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${new Date(
    obj.createdAt
  ).toLocaleString()}`;

  discussionContent.append(discussionInfo);

  const discussionAnswer = document.createElement("p");
  discussionAnswer.textContent = obj.answer ? "✅" : "❌";
  discussionAnswered.append(discussionAnswer);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const ul = document.querySelector("ul.discussions__container");
let currentNum = 1;

//페이징
const paging = (array) => {
  let lastNum = Math.ceil(array.length / 10);

  const pagingWrapper = document.createElement("section");
  pagingWrapper.className = "paging__wrapper";

  const pagingContainer = document.createElement("ul");
  pagingContainer.className = "paging__container";
  pagingWrapper.append(pagingContainer);

  for (let i = 1; i <= lastNum; i++) {
    const pagingList = document.createElement("li");
    pagingList.className = "page";
    pagingContainer.append(pagingList);
    pagingList.textContent = i;
    pagingList.addEventListener("click", function (e) {
      e.preventDefault();
      currentNum = e.target.textContent;
      e.target.classList.add("active");
      ul.replaceChildren();
      render(ul, currentNum);
    });
  }

  const prevBtn = document.createElement("span");
  prevBtn.className = "previous__button";
  prevBtn.textContent = "<";
  pagingWrapper.prepend(prevBtn);
  const nextBtn = document.createElement("span");
  nextBtn.className = "next__button";
  nextBtn.textContent = ">";
  pagingWrapper.append(nextBtn);

  prevBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentNum === 1) {
      currentNum = 1;
    } else {
      currentNum--;
    }
    ul.replaceChildren();
    render(ul, currentNum);
  });

  nextBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (currentNum >= lastNum) {
      currentNum = lastNum;
    } else {
      currentNum++;
    }
    ul.replaceChildren();
    render(ul, currentNum);
  });

  return pagingWrapper;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, num) => {
  if (localStorage.getItem("newArray") !== null) {
    makeStorage(JSON.parse(localStorage.newArray));
  }

  console.log(agoraStatesDiscussions);

  let pagingArray = agoraStatesDiscussions.slice((num - 1) * 10, num * 10);

  for (let i = 0; i < pagingArray.length; i += 1) {
    element.append(convertToDiscussion(pagingArray[i]));
  }

  // for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
  //   element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  // }

  return;
};

render(ul, currentNum);

const main = document.querySelector("main");
main.append(paging(agoraStatesDiscussions));

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// const ul = document.querySelector("ul.discussions__container");
// render(ul);
