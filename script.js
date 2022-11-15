// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

//아바타 영역 구성
  const avatarWrapper = document.createElement("div");
  const discussionContent = document.createElement("div");
  const discussionAnswered = document.createElement("div");

  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);

  //컨텐츠 영역 구성

  discussionContent.className = "discussion__content";

  // title에 url 링크로 제목
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";

  const discussionTitleLink = document.createElement("a");
  discussionTitleLink.href = obj.url;
  discussionTitleLink.textContent = obj.title;
  discussionTitle.append(discussionTitleLink);

  // author / createAt 시간 표시
  const discussionInfo = document.createElement("div");
  discussionInfo.className = "discussion__information";
  discussionInfo.textContent = `${obj.author} / ${obj.createdAt}`;
  discussionContent.append(discussionTitle, discussionInfo)

  //답변여부 영역

  discussionAnswered.className = "discussion__answered";
  const isAnswered = document.createElement("p")
  isAnswered.textContent = "☑"
  obj.answer ? discussionAnswered.textContent = "☑" :
  discussionAnswered.textContent = '☒';
  discussionAnswered.append(isAnswered)

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
render(ul)


// 버튼 클릭 시, 해당 내용이 객체로 배열 맨 앞에 추가되는 eventListener 
const submittedName = document.querySelector("#name")
const submittedTitle = document.querySelector("#title")
const submittedText = document.querySelector("#story")
const submitButton = document.querySelector(".form__submit > input")

submitButton.addEventListener('click', addToArray())

function addToArray() {
  agoraStatesDiscussions.unshift({

    })
}

// input 입력하여 배열에 추가 된 내용 preappend 하기 