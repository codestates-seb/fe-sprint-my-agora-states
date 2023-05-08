// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj, i) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionCheckbox = document.createElement("input");
  const discussionAnswered = document.createElement("label");
  discussionCheckbox.type = "checkbox";
  discussionCheckbox.id = `checkbox${i}`;
  discussionCheckbox.classList.add("hide");
  discussionAnswered.htmlFor = (`checkbox${i}`);
  discussionAnswered.className = "discussion__answered";

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of' + obj.author;
  avatarWrapper.append(avatarImg);

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement("a");
  discussionLink.href = obj.url;
  discussionLink.innerText = obj.title;
  discussionTitle.append(discussionLink);
  discussionContent.append(discussionTitle);

  const timestamp = (obj) => {
    return obj.createdAt.replace('T', ' ').substring(0, 19);
  }

  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.innerText = obj.author + ' / ' + timestamp(obj);
  discussionContent.append(discussionInfo);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent, discussionCheckbox, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
// const render = (element) => {
//   for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
//     element.append(convertToDiscussion(agoraStatesDiscussions[i]));
//   }
//   return;
// };

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
// render(ul);

// submit 버튼을 누르면 질문을 올려주는 함수 
const addNewQuestion = (event) => {
  event.preventDefault();
  
  let newObj = {};
  const randomAvatarURL = [
    "https://avatars.githubusercontent.com/u/87750478?s=64&v=4",
    "https://avatars.githubusercontent.com/u/99641988?s=64&v=4",
    "https://avatars.githubusercontent.com/u/94212747?s=64&u=145778e6dfbd813a6689a634ed3bb47f1bfa7b17&v=4",
    "https://avatars.githubusercontent.com/u/25774030?s=64&v=4",
    "https://avatars.githubusercontent.com/u/101170012?s=64&v=4",
    "https://avatars.githubusercontent.com/u/96907839?s=64&v=4",
  ];

  let randomAvatar = randomAvatarURL[Math.floor(Math.random() * randomAvatarURL.length)];

  const offset = 1000 * 60 * 60 * 9
  newObj.createdAt = new Date((new Date()).getTime() + offset).toISOString();
  newObj.title = document.querySelector("#title").value;
  newObj.author = document.querySelector("#name").value;
  newObj.avatarUrl = randomAvatar;

  agoraStatesDiscussions.push(newObj);
  agoraStatesDiscussions = agoraStatesDiscussions.sort(function(obj1, obj2) {
    return new Date(obj2.createdAt).getTime() - new Date(obj1.createdAt).getTime();
  })

  ul.prepend(convertToDiscussion(newObj));

  document.querySelector('#name').value = "";
  document.querySelector('#title').value = "";
  document.querySelector('#story').value = "";
};

document.querySelector(".form__submit").addEventListener('click', (e) => {
  if (document.querySelector('#name').value === "") {
    alert('이름을 적어주세요.');
  } else if (document.querySelector('#title').value === "") {
    alert('제목을 적어주세요.');
  } else if (document.querySelector('#story').value === "") {
    alert('내용을 적어주세요.');
  } else {
    addNewQuestion(e);
    render(currentPage);
  }
});

// 페이지네이션 구현
const contents = document.querySelector(".discussions__container");
const buttons = document.querySelector(".pagination");

let totalContent = 41;
const displayedContent = 10;
let totalPage = Math.ceil(totalContent / displayedContent);

let currentPage = 1;
const pagePerGroup = 5;
let pageGroup = Math.ceil(currentPage / pagePerGroup);

const createBtn = (id) => {
  const button = document.createElement("button");
  
  button.classList.add("page__btn");
  button.dataset.num = id;
  button.innerText = id;
  
  button.addEventListener("click", (e) => {
    Array.prototype.forEach.call(buttons.children, (button) => {
      if (button.dataset.num) button.classList.remove("active");
    });
    e.target.classList.add("active");
    renderContent(parseInt(e.target.dataset.num));
  });
  
  return button;
}

const renderContent = (currentPage) => {
  totalContent = agoraStatesDiscussions.length;
  totalPage = Math.ceil(totalContent / displayedContent);

  while (contents.hasChildNodes()) {
    contents.removeChild(contents.lastChild);
  }

  for (let i = (currentPage - 1) * displayedContent; i < currentPage * displayedContent && i <= totalContent; i++) {
    ul.append(convertToDiscussion(agoraStatesDiscussions[i], i));
  }
}

// 페이지네이션 버튼 구현
const renderButton = (currentPage) => {
  totalContent = agoraStatesDiscussions.length;

  while (buttons.hasChildNodes()) {
    buttons.removeChild(buttons.lastChild);
  }

  for (let id = currentPage; id < currentPage + pagePerGroup && id <= totalPage; id++) {
    buttons.append(createBtn(id));
  }

  buttons.children[0].classList.add("active");
  
  const goPrevPage = () => {
    currentPage -= pagePerGroup;
    render(currentPage);
  };
  
  const goNextPage = () => {
    currentPage += pagePerGroup;
    console.log(currentPage, totalPage);
    render(currentPage);
  };
  
  const prev = document.createElement("div");
  prev.classList.add("prev");
  prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
  prev.addEventListener("click", goPrevPage);
  
  const next = document.createElement("div");
  next.classList.add("next");
  next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
  next.addEventListener("click", goNextPage);
  
  buttons.prepend(prev);
  buttons.append(next);
  
  // 이전, 다음 페이지 버튼이 필요한지 체크
  if (currentPage - pagePerGroup < 1) buttons.removeChild(prev);
  if (currentPage + pagePerGroup > totalPage) buttons.removeChild(next);
};

const render = (currentPage) => {
  renderContent(currentPage);
  renderButton(currentPage);
};

render(currentPage);
