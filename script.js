// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

//profile__image 생성
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}
const profileImageUrl = randomAvatarImg[getRandomInt(5)];
const profileImage = document.querySelector(".profile__image");
profileImage.src = profileImageUrl;

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const discussionMain = document.createElement("div");
  discussionMain.className = "discussion__main";
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
  const discussionA = document.createElement("a");
  discussionA.href = obj.url;
  discussionA.textContent = obj.title;
  discussionTitle.append(discussionA);
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt.slice(0, 10)} ${obj.createdAt.slice(11,16)}`;

  const discussionAnsweredImg = document.createElement("img");
  discussionAnsweredImg.className = "discussion__answered__img";
  if (obj.answer !== null) {
    discussionAnsweredImg.src = "./images/checked.png";
  } else {
    discussionAnsweredImg.src = "./images/unchecked.png";
  }
  discussionAnswered.append(discussionAnsweredImg);
  
  discussionContent.append(discussionTitle, discussionInformation);
  discussionMain.append(avatarWrapper, discussionContent, discussionAnswered);
  li.append(discussionMain);
  
  //answer
  convertToAnswer(obj, li);

  return li;
};

const convertToAnswer = (obj, li) => {
  //answer 
  const answerContainer = document.createElement("div");
  answerContainer.className = "discussion__answer__container";
  const answer = document.createElement("div");
  answer.className = "discussion__answer";
  const answerAvatarWrapper = document.createElement("div");
  answerAvatarWrapper.className = "answer__avatar--wrapper";
  const answerContent = document.createElement("div");
  answerContent.className = "answer__content";
  const answerEmojiWrapper = document.createElement("div");
  answerEmojiWrapper.className = "answer__emoji--wrapper";

  if (obj.answer !== null) {
    const answerAvatarImg = document.createElement("img");
    answerAvatarImg.className = "answer__avatar--image";
    answerAvatarImg.src = obj.answer.avatarUrl;
    answerAvatarWrapper.append(answerAvatarImg);

    const answerAuthor = document.createElement("h3");
    answerAuthor.className = "answer__author";
    answerAuthor.textContent = obj.answer.author;
    const answerInformation = document.createElement("div");
    answerInformation.className = "answer__information";
    answerInformation.textContent = `${obj.answer.createdAt.slice(0, 10)} ${obj.answer.createdAt.slice(11, 16)}`;
    answerContent.append(answerAuthor, answerInformation);

    const answerEmojiImg = document.createElement("img");
    answerEmojiImg.className = "answer__emoji--image";
    answerEmojiImg.src = "";
    answerEmojiWrapper.append(answerEmojiImg);

    answer.append(answerAvatarWrapper, answerContent, answerEmojiWrapper);
    answerContainer.append(answer);
    li.append(answerContainer);
  }

  return li;
}

//pagination
const pageContents = document.querySelector(".discussions__container");
const pageButtons = document.querySelector(".page__buttons");

let numOfContent = agoraStatesDiscussions.length;
const maxContent = 10;
const maxButton = 5;
const maxPage = Math.ceil(numOfContent / maxContent);
let page = 1;

const goPrevPage = () => {
  page -= maxButton;
  render(ul, page);
};

const goNextPage = () => {
  page += maxButton;
  render(ul, page);
};

const makePageButton = (id) => {
  const pageButton = document.createElement("button");
  pageButton.classList.add("page__button");
  pageButton.dataset.num = id;
  pageButton.innerText = id;
  pageButton.addEventListener("click", (e) => {
    Array.prototype.forEach.call(pageButtons.children, (pageButton) => {
      if (pageButton.dataset.num) pageButton.classList.remove("active");
    });
    e.target.classList.add("active");

    render(ul, parseInt(e.target.dataset.num));
    page = parseInt(e.target.dataset.num);
    window.scrollTo({top: 0, behavior: "smooth"});
  });
  return pageButton;
}

const renderPageButton = (page) => {
  while (pageButtons.hasChildNodes()) {
    pageButtons.removeChild(pageButtons.lastChild);
  }

  for (let id = page; id < page + maxButton && id <= maxPage; id++) {
    pageButtons.appendChild(makePageButton(id));
  }

  pageButtons.children[0].classList.add("active");
};

const renderLocalStorage = () => { //local Storage 데이터 agoraStatesDiscussions 배열에 추가
  for (let i = 0; i < localStorage.length; i++) {
    agoraStatesDiscussions.unshift(JSON.parse(localStorage[i.toString()]));
  }
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, page) => {   //pagination
  numOfContent = agoraStatesDiscussions.length;
  while (element.hasChildNodes()) { //ul 초기화
    element.removeChild(element.lastChild);
  }
  for (let id = (page - 1) * maxContent + 1; id <= page * maxContent && id <= numOfContent; id++) {
    element.append(convertToDiscussion(agoraStatesDiscussions[id-1]));
  }

  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
renderLocalStorage();
render(ul, page);
renderPageButton(page);

// 글 생성 기능
const makeNewDiscussion = (name, title, text) => { // 새로운 Discussion object 생성 후 반환
  const newDiscussion = {
    createdAt: new Date().toISOString(),
    url: "",
    answer: null,
    avatarUrl: profileImageUrl
  };
  newDiscussion.title = title;
  newDiscussion.author = name;
  newDiscussion.body = text;

  return newDiscussion;
}

const onDisussionSubmit = (event) => {
  event.preventDefault();
  console.log("submit clicked!");
  const inputName = document.querySelector("#name");
  const inputTitle = document.querySelector("#title");
  const inputText = document.querySelector("#story");

  if (inputName.value !== "" && inputTitle.value !== "" && inputText.value !== "") {
    //새로 입력한 discussion local storage에 저장
    const discussionObj = makeNewDiscussion(inputName.value, inputTitle.value, inputText.value);
    localStorage.setItem(localStorage.length.toString(), JSON.stringify(discussionObj));

    inputName.value = null;
    inputTitle.value = null;
    inputText.value = null;

    location.reload(); //페이지 새로고침
  }
}

const submitInput = document.querySelector(".form__submit>input");
submitInput.addEventListener("click", onDisussionSubmit);

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const onclickGoToPrevPage = () => {
  console.log(page);
  const Button = document.querySelector(".active");
  if (page - 1 >= 1) {
     Array.prototype.forEach.call(pageButtons.children, (Button) => {
      if (Button.dataset.num) Button.classList.remove("active");
     });
    document.querySelector(`.page__button:nth-child(${page - 1})`).classList.add("active");
    
     page = page - 1;
     render(ul, page);
     window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
const onclickGoToNextPage = () => {
  console.log(page);
  const Button = document.querySelector(".active");
  if (page + 1 <= maxPage) {
    Array.prototype.forEach.call(pageButtons.children, (Button) => {
      if (Button.dataset.num) Button.classList.remove("active");
    });
    document.querySelector(`.page__button:nth-child(${page + 1})`).classList.add("active");

    page = page + 1;
    render(ul, page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}
prev.addEventListener("click", onclickGoToPrevPage);
next.addEventListener("click", onclickGoToNextPage);