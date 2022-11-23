const agoraStatesDiscussions = require("./data.js");

require("./style.css");
let currentPage = 0;
let lastPage = agoraStatesDiscussions.length;

const formContainer = document.querySelector(".form__submit");

const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const submitLoader = document.createElement("div");
  const submitButton = document.querySelector("#submit");
  submitLoader.className = "loader";
  const button = document.createElement("button");
  button.className = "submitButton";
  button.id = "loader";
  button.disabled = true;
  button.appendChild(submitLoader);
  formContainer.appendChild(button);
  submitButton.remove();
  const { name, title, story } = document.formAction;
  submitDis(name.value, title.value, story.value).then(() => {
    name.value = "";
    title.value = "";
    story.value = "";
  });
});

const submitDis = async (name, title, story) => {
  const createdAt = new Date();
  const { url } = await fetch("https://picsum.photos/200/300", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ul = document.querySelector("ul.discussions__container");
  const arr = localStorage.getItem("arr");
  if (!arr) {
    localStorage.setItem(
      "arr",
      JSON.stringify([{ name, title, story, createdAt, url }])
    );
  } else {
    let newArr = JSON.parse(arr);
    newArr.push({ name, title, story, createdAt, url });
    localStorage.setItem("arr", JSON.stringify(newArr));
  }
  ul.prepend(
    convertToDiscussion({ name, title, story, createdAt, url }, "submit")
  );
};

const convertToDiscussion = (obj, action) => {
  if (!obj) {
    return (currentPage = "");
  }
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const disTitle = document.createElement("h2");
  const disTitleA = document.createElement("a");
  const disInfo = document.createElement("div");
  const disCheckBox = document.createElement("input");
  disCheckBox.className = "discussion__answered";
  disCheckBox.type = "checkbox";
  avatarImg.max;
  disTitle.className = "discussion__title";
  disInfo.className = "discussion__information";
  if (action === "submit") {
    const submitButtonCre = document.createElement("input");
    const loader = document.querySelector("#loader");
    submitButtonCre.className = "submitButton";
    submitButtonCre.id = "submit";
    submitButtonCre.value = "Submit";
    submitButtonCre.type = "submit";
    loader.remove();
    formContainer.appendChild(submitButtonCre);
    const { name, title, story, createdAt, url } = obj;
    avatarImg.src = url;
    disInfo.textContent = `${name}/${createdAt}`;
    disTitleA.textContent = title;

    discussionContent.appendChild(disTitle);
    discussionContent.appendChild(disInfo);
    disTitle.appendChild(disTitleA);
    avatarWrapper.appendChild(avatarImg);
    li.append(
      avatarWrapper,
      disCheckBox,
      discussionContent,
      discussionAnswered
    );
    return li;
  } else if (action === "loaclStroageAppend") {
    const { name, title, story, createdAt, url } = obj;
    avatarImg.src = url;
    disInfo.textContent = `${name}/${createdAt}`;
    disTitleA.textContent = title;

    discussionContent.appendChild(disTitle);
    discussionContent.appendChild(disInfo);
    disTitle.appendChild(disTitleA);
    avatarWrapper.appendChild(avatarImg);
    li.append(
      avatarWrapper,
      disCheckBox,
      discussionContent,
      discussionAnswered
    );
    return li;
  } else {
    const { answer, author, avatarUrl, bodyHTML, createdAt, id, title, url } =
      obj;
    avatarImg.src = avatarUrl;
    disInfo.textContent = `${author}/${createdAt}`;
    disTitleA.href = url;
    disTitleA.textContent = title;
    // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
    discussionContent.appendChild(disTitle);
    discussionContent.appendChild(disInfo);
    disTitle.appendChild(disTitleA);
    avatarWrapper.appendChild(avatarImg);
    if (answer) {
      disCheckBox.checked = true;
    }
    li.append(
      avatarWrapper,
      disCheckBox,
      discussionContent,
      discussionAnswered
    );
    return li;
  }
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, count) => {
  for (let i = count; i < count + 10; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i], "free"));
  }
  if (currentPage === "") return;
  currentPage += 10;
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");

function observeLastChild(intersectionObserver) {
  const listChildren = document.querySelectorAll("li");
  listChildren.forEach((el) => {
    if (!el.nextSibling && currentPage < lastPage) {
      intersectionObserver.observe(el); // el에 대하여 관측 시작
    } else if (currentPage >= lastPage || currentPage === "") {
      document.querySelector(".loading-container").remove();
      intersectionObserver.disconnect();
    }
  });
}

const discussionArr = localStorage.getItem("arr");
if (discussionArr) {
  const arr = JSON.parse(discussionArr);
  const ulDis = document.querySelector("ul.discussions__container");
  for (let i = 0; i < arr.length; i++) {
    ulDis.prepend(convertToDiscussion(arr[i], "loaclStroageAppend"));
  }
}

render(ul, currentPage);
const observerOption = {
  root: null,
  rootMargin: "0px 0px 0px 0px",
  threshold: 0.5,
};

const io = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // entry.isIntersecting: 특정 요소가 뷰포트와 50%(threshold 0.5) 교차되었으면
    if (entry.isIntersecting) {
      // 다음 데이터 가져오기: 자연스러운 연출을 위해 setTimeout 사용
      setTimeout(() => {
        render(ul, currentPage);
        observer.unobserve(entry.target);
        observeLastChild(observer);
      }, 1000);
    }
  });
}, observerOption);

observeLastChild(io);
