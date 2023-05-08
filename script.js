// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.classList.add("discussion__container", "accordion", "accordion-flush");
  li.id = "accordionFlushExample";

  const accordionItem = document.createElement("div");
  accordionItem.className = "accordion-item";

  const accordionHeader = document.createElement("h2");
  accordionHeader.className = "accordion-header";

  const accordionBtn = document.createElement("button");
  accordionBtn.classList.add("accordion-button", "collapsed")
  accordionBtn.setAttribute("type", "button");
  accordionBtn.dataset.bsToggle = "collapse";
  accordionBtn.dataset.bsTarget = "#" + obj.id;
  accordionBtn.setAttribute("aria-expanded", "false");
  accordionBtn.setAttribute("aria-controls", obj.id);

  const questionContents = document.createElement("div");
  questionContents.className = "discussion__question_contents";

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.setAttribute("src", obj.avatarUrl);
  avatarImg.setAttribute("alt", `avartar of ${obj.author}`);

  avatarWrapper.append(avatarImg);

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__contents_title";

  const information = document.createElement("div");
  information.className = "discussion__information";
  information.textContent = `${obj.author} / ${obj.createdAt}`;

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const titleAnchor = document.createElement("a");
  titleAnchor.setAttribute("href", obj.url);
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);

  discussionContent.append(information, discussionTitle);
  questionContents.append(avatarWrapper, discussionContent);
  
  accordionBtn.append(questionContents);
  accordionHeader.append(accordionBtn);

  const collapseOne = document.createElement("div");
  collapseOne.id = obj.id;
  collapseOne.setAttribute("aria-labelledby", obj.id);
  collapseOne.classList.add("accordion-collapse", "collapse");
  collapseOne.dataset.bsParent = "#accordionFlushExample";

  const accordionBody = document.createElement("div");
  accordionBody.className = "accordion-body";
  accordionBody.innerHTML = obj.bodyHTML;

  collapseOne.append(accordionBody);
  accordionItem.append(accordionHeader, collapseOne);

  li.append(accordionItem);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const submitBtn = document.querySelector("#submit-btn");
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const author = e.target.form[0].value;
  const title = e.target.form[1].value;
  const content = e.target.form[2].value;
  const createdAt = new Date().toISOString();

  if (!author) {
    alert("이름을 입력해주세요.");
    return;
  }

  if (!title) {
    alert("제목을 입력해주세요.");
    return;
  }

  if (!content) {
    alert("질문을 입력해주세요.");
    return;
  }

  const template = {
    id: "D_" + title,
    createdAt,
    title,
    url: null,
    author,
    answer: null,
    bodyHTML: `<p>${content}</p>`,
    avatarUrl:
    "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  const liList = document.querySelectorAll('.discussion__container')
  for (let li of liList){
      li.remove()
  }

  agoraStatesDiscussions.unshift(template);
  console.log(agoraStatesDiscussions);
  render(ul);
})