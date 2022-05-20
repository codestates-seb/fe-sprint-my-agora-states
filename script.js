// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

if (localStorage.getItem("discussion") === null) {
  localStorage.setItem("discussion", JSON.stringify(agoraStatesDiscussions))
}
let localAgoraStatesDiscussions = JSON.parse(localStorage.getItem("discussion"))

console.log(localAgoraStatesDiscussions);
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

  //avatar 이미지 추가
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = `avatar of ${obj.author}`;

  //제목 추가
  const discussionTitle = document.createElement("h3");
  discussionTitle.className = "discussion__title";
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  //제목 링크
  const pageLink = document.createElement("a");
  pageLink.href = obj.url;
  pageLink.textContent = obj.title;

  //체크표시
  const answerChecked = document.createElement("p")
  if (obj.answer === null) {
    answerChecked.textContent = "ㅁ"
  } else answerChecked.textContent = "☑"

  //information 추가
  discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`

  avatarWrapper.append(avatarImg)
  discussionTitle.append(pageLink)
  discussionContent.append(discussionTitle, discussionInformation);
  discussionAnswered.append(answerChecked)
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < localAgoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(localAgoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 질문 접수
const submit = document.querySelector('input[type="submit"]');
const submitDelete = document.querySelector('#delete')
const submitName = document.querySelector('#name');
const submitTitle = document.querySelector('#title');
const submitStory = document.querySelector('#story');
let today = new Date();
const submitYourQuestion = () => {
  if (submitName.value === '') {
    return alert('이름을 입력하세요')
  } else if (submitTitle.value === '') {
    return alert('제목을 입력하세요')
  } else if (submitStory.value === '') {
    return alert('질문을 작성하세요')
  } else {
    localAgoraStatesDiscussions.unshift({
      id: "D_kwDOHOApLM4APnEw",
      createdAt: `${today.getFullYear()}-${00+today.getMonth()+1}-${today.getDate()}T${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}Z`,
      title: submitTitle.value,
      url: "",
      author: submitName.value,
      answer: null,
      bodyHTML: submitStory.value,
      avatarUrl:
        "https://avatars.githubusercontent.com/u/73211553?s=400&u=fa147173e936b86600ecfab5f59acdb0d9d611ba&v=4",
    })
  }
}

submit.onclick = function() {
  submitYourQuestion()
  localStorage.setItem("discussion", JSON.stringify(localAgoraStatesDiscussions));
}

submitDelete.onclick = function() {
  localAgoraStatesDiscussions.shift();
  localStorage.setItem("discussion", JSON.stringify(localAgoraStatesDiscussions));
  window.location.reload();
}
