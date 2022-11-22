// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
let data;
const dataFromLocalStorage = localStorage.getItem("agoraStatesDiscussions");
if (dataFromLocalStorage) {
  data = JSON.parse(dataFromLocalStorage);
} else {
  data = agoraStatesDiscussions.slice();
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

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img');
  avatarWrapper.append(avatarImg);
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;

  const Title1 = document.createElement('h2');
  Title1.className = 'discussion__title';
  discussionContent.append(Title1);
  const Title2 = document.createElement('a')
  Title1.append(Title2);
  Title2.href = obj.url;
  Title2.textContent = obj.title;

  const information = document.createElement('div');
  information.className = 'discussion__information'
  discussionContent.append(information);
  information.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`

  const checked = document.createElement("p");
  discussionAnswered.append(checked);
  checked.textContent = obj.answer ? "☑︎" : "☒";


  // 답변 클릭이벤트
  const open = document.querySelectorAll(".discussion_box");
  open.forEach((open, index) => {
    const button = open.querySelector('p')
    const answer = open.querySelector('.anwser')
    button.onclick = () => {
      if (button.textContent === "☑︎") {
        if (answer.style.display !== 'block') {
          answer.style.display = 'block';
          console.log('true');
        }
        else {
          answer.style.display = 'none';
          console.log('false')
        }
        console.log(index);
      }
    }
  });


  const discussionbox = document.createElement('div')
  discussionbox.className = "discussion_box";
  const anwser = document.createElement('div')
  anwser.className = "anwser";
  const anwser_name = document.createElement('div')
  anwser_name.className = "anwser_name";
  const anwser_url = document.createElement('div')
  anwser_url.className = "anwser_url";
  const anwser_content = document.createElement('div')
  anwser_content.className = "anwser_content";
  anwser.append(anwser_name, anwser_url, anwser_content)

  anwser_name.textContent = obj.author;
  anwser_url.textContent = obj.url;
  anwser_content.textContent = obj.bodyHTML;

  discussionbox.append(li)
  discussionbox.append(anwser)
  return discussionbox;
};

// const formform = document.querySelector(".form");

// formform.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const name = formform.querySelector("#name").value;
//   const title = formform.querySelector("#title").value;
//   const textbox = formform.querySelector("#textbox").value;

//   const newObj = {
//     id: "new id",
//     createdAt: new Date(),
//     title: title,
//     url: "https://github.com/codestates-seb/agora-states-fe/discussions/6",
//     author: name,
//     bodyHTML: textbox,
//     avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"
//   }

//   agoraStatesDiscussions.unshift(newObj);

//   const discussion = convertToDiscussion(newObj);

//   ul.prepend(discussion);

//   formform.querySelector("#name").value = "";
//   formform.querySelector("#title").value = "";
//   formform.querySelector("#textbox").value = "";

// }
// )

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, from, to) => {
  console.log(from, to);
  if (!from && !to) {
    from = 0;
    to = data.length - 1;
  }
  // 다 지우고 배열에 있는 내용 다 보여주기
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  for (let i = from; i < to; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return;
};
// 페이지네이션을 위한 변수
let limit = 5,
  page = 1;

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul, 0, limit);

const getPageStartEnd = (limit, page) => {
  const len = data.length - 1;
  let pageStart = Number(page - 1) * Number(limit);
  let pageEnd = Number(pageStart) + Number(limit);
  if (page <= 0) {
    pageStart = 0;
  }
  if (pageEnd >= len) {
    pageEnd = len;
  }
  return { pageStart, pageEnd };
};

const buttons = document.querySelector(".buttons");
buttons.children[0].addEventListener("click", () => {
  if (page > 1) {
    page = page - 1;
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});

buttons.children[1].addEventListener("click", () => {
  if (limit * page < data.length - 1) {
    page = page + 1;
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page);
  render(ul, pageStart, pageEnd);
});

buttons.children[2].addEventListener("click", () => {
  localStorage.removeItem("agoraStatesDiscussions");
  data = agoraStatesDiscussions.slice();
  limit = 5;
  page = 1;
  render(ul, 0, limit);
});

// 문서의 내용을 확인해야 합니다.
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const obj = {
    id: "unique id",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value,
    answer: null,
    bodyHTML: textbox.value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  };
  data.unshift(obj);

  // 로컬스토리지에 저장
  localStorage.setItem("agoraStatesDiscussions", JSON.stringify(data));

  // 렌더링
  render(ul, 0, limit);

  form.querySelector("#name").value = "";
  form.querySelector("#title").value = "";
  form.querySelector("#textbox").value = "";
});


// a태그에 타겟 블랭크 주기..
window.onload = function () {
  let anchors = document.querySelectorAll('a');
  for (let i = 0; i < anchors.length; i++) {
    anchors[i].setAttribute('target', '_blank');
  }
}



