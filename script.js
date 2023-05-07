// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

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
  const avatarImg = document.createElement('img');
  // 이미지 요소 넣어주기
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  // agoraStatesDiscussions[0].author
  avatarWrapper.append(avatarImg);//만들고 넣기


  const contentTitle = document.createElement('h2');
  contentTitle.className = "discussion__title";
  const contentA = document.createElement('a');
  contentA.href = obj.urcl;
  contentA.innerHTML = obj.title;
  contentTitle.append(contentA);
  discussionContent.append(contentTitle)
  
  const contentInfo = document.createElement('div');
  const date = new Date(obj.createdAt);
  const writeDate = `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDay()}일 ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  contentInfo.className = "discussion__information";
  contentInfo.textContent = obj.author + " / " + writeDate;
  discussionContent.append(contentInfo);

  const answerCheck = document.createElement('div');
    const answerCheckBox = document.createElement('img');
    const getAnswer = document.querySelector('img.answeredImg');
    const answerCheckP = document.createElement('p');
    answerCheckBox.className = 'answeredImg';
    answerCheck.className = 'discussion__answered';
    answerCheckP.textContent = obj.answer ? "☑" : "x";
    answerCheck.append(answerCheckP);
    discussionAnswered.append(answerCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
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

const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log('submit 이벤트 발생했다!!')
  console.log(author.value, title.value, textbox.value)

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

  // agoraStatesDiscussions 객체 추가
  agoraStatesDiscussions.unshift(obj);

  // 화면 다 지우고 
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  // 다시 agoraStatesDiscussions 기반으로 화면에 보여주기 (렌더링)
  render(ul);
})