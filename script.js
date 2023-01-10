//window.localStorage.clear();
const inputForm = document.querySelector(".form");

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const story = document.getElementById('story').value;
  let today = new Date();
  let inputAgoraDatas = [];
  const inputAgoraData = {
    avatarUrl: "https://images.unsplash.com/photo-1639628735078-ed2f038a193e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    title: title,
    url: "",
    author: name,
    createdAt: today.toLocaleTimeString(),
    answer: null
  }

  // localStorage
  if (window.localStorage.length > 0) {
    const getInputAgoraDatas = window.localStorage.getItem('inputAgoraDatas');
    const inputAgoraDatasArr = JSON.parse(getInputAgoraDatas);
    for(let i = 0; i < inputAgoraDatasArr.length; i++) {
      inputAgoraDatas.push(inputAgoraDatasArr[i]);
    }
    inputAgoraDatas.unshift(inputAgoraData);
    const inputAgoraDataString = JSON.stringify(inputAgoraDatas);
    window.localStorage.setItem('inputAgoraDatas',inputAgoraDataString);
  } else {
    inputAgoraDatas.push(inputAgoraData);
    const inputAgoraDataString = JSON.stringify(inputAgoraDatas);
    window.localStorage.setItem('inputAgoraDatas',inputAgoraDataString);
  }

  totalContentsArr.unshift(inputAgoraData);
  console.log(totalContentsArr.length);
  totalContents++;
  inputForm.reset();

  render(page);
});

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
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image";
  avatarImage.src = obj.avatarUrl;
  avatarImage.alt = `avatar of ${obj.author}`;

  avatarWrapper.append(avatarImage);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title"
  const discussionTitleATag = document.createElement("a");
  discussionTitleATag.href = obj.url;
  discussionTitleATag.textContent = obj.title;
  discussionTitle.append(discussionTitleATag);
  const discussionInformation = document.createElement("div");
  discussionInformation.className = 'discussion__information';
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;

  discussionContent.append(discussionTitle);
  discussionContent.append(discussionInformation);

  const discussionAnsweredPTag = document.createElement("p");
  discussionAnsweredPTag.textContent = obj.answer ? '💡' : '⏳';
  discussionAnswered.append(discussionAnsweredPTag);


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

const makeButton = (id) => {
  const button = document.createElement("button");
  button.classList.add("button");
  button.dataset.num = id;
  button.innerText = id;
  button.addEventListener("click", (e) => {
    window.scrollTo(0,0);
    Array.prototype.forEach.call(buttons.children, (button) => {
      if (button.dataset.num) button.classList.remove("active");
    });
    e.target.classList.add("active");
    renderContent(parseInt(e.target.dataset.num));
  });
  return button;
};

const contents = document.querySelector("ul.discussions__container");
const buttons = document.querySelector(".pagination");

let totalContentsArr = []

const makeTotalContentsArr = () => {
  const agoraDatas = window.localStorage.getItem('inputAgoraDatas');
  const agoraDataObj = JSON.parse(agoraDatas);

  if(agoraDataObj!==null) {
    for(let i = 0; i < agoraDataObj.length; i++) {
      totalContentsArr.push(agoraDataObj[i]);
    }
  }

  for(let i = 0; i < agoraStatesDiscussions.length; i++) {
    totalContentsArr.push(agoraStatesDiscussions[i]);
  }
  
  return totalContentsArr;
}

let totalContents = makeTotalContentsArr().length;    // 총 글 개수
const showContents = 10;  // 한 번에 보여줄 글의 개수
const showButton = 3; // 한 번에 보여줄 버튼 개수
const maxPage = Math.ceil(totalContents / showContents);    // 글을 모두 보여주기 위한 총 페이지 개수
let page = 1;   // 현재 페이지(시작: 1)


const renderContent = (page) => {
  while (contents.hasChildNodes()) {
    contents.removeChild(contents.lastChild);
  }

  for (let i = (page - 1) * showContents; i <= page * showContents && i <= totalContents; i++) {
    contents.appendChild(convertToDiscussion(totalContentsArr[i]));
  }
}

const renderButton = (page) => {
  while (buttons.hasChildNodes()) {
    buttons.removeChild(buttons.lastChild);
  }

  for (let id = page; id < page + showButton && id <= maxPage; id++) {
    buttons.appendChild(makeButton(id));
  }

  buttons.children[0].classList.add("active");

  buttons.prepend(prev);
  buttons.append(next);

  if (page - showButton < 1) buttons.removeChild(prev);
  if (page + showButton > maxPage) buttons.removeChild(next);
};

const goPrevPage = () => {
  window.scrollTo(0,0);
  page -= showButton;
  render(page);
};

const goNextPage = () => {
  window.scrollTo(0,0);
  page += showButton;
  render(page);
};

const prev = document.createElement("button");
prev.classList.add("button", "prev");
prev.innerHTML = '<';
prev.addEventListener("click", goPrevPage);

const next = document.createElement("button");
next.classList.add("button", "next");
next.innerHTML = '>';
next.addEventListener("click", goNextPage);


const render = (page) => {
  renderContent(page);
  renderButton(page);
};
render(page);
