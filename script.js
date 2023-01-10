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

  //이미지 가져오기
  const avatarImg = document.createElement("img")
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl
  avatarImg.alt = "avatar of" + obj.author
 
  avatarWrapper.append(avatarImg)

  //디스커션 가져오기
  const discussionTitle = document.createElement("h2")
  discussionTitle.className = "discussion__title"
  const discussionTitleA = document.createElement("a")
  discussionTitleA.href = obj.url
  discussionTitleA.textContent = obj.title

  discussionTitle.append(discussionTitleA)
  discussionContent.append(discussionTitle)

  //작성자 정보 가져오기
  const discussionInfo = document.createElement("div")
  discussionInfo.className = "discussion__information"
  discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`
  discussionContent.append(discussionInfo)

  //답변여부 가져오기
  const discussionAnswer = document.createElement("div")
  discussionAnswer.className = "discussion__answered"
  const checkbox = document.createElement("p")
  if (obj.answer !== null){
    checkbox.textContent = '😆'
  } else {checkbox.textContent = '😭'}
  discussionAnswer.append(checkbox)
  discussionAnswered.append(discussionAnswer)

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

// 새로 작성하면 추가
const form = document.querySelector("form.form")
const author = document.querySelector("div.form__input--name > input")
const title = document.querySelector("div.form__input--title > input")
const textbox = document.querySelector("div.form__textbox > textarea")

//submit이라는 이벤트 
form.addEventListener("submit", (event)=> {
  event.preventDefault() // 새로고침 방지 옛날에나 새로고침

  //새로운 배열 만들고
  const addObj = {
    id: "unknownUser",
    createdAt: new Date().toISOString(),
    title: title.value,
    url: "https://codestates.com/",
    author: author.value,
    bodyHTML:
      textbox.value,
    avatarUrl:
    "https://avatars.githubusercontent.com/u/119163273?v=4",
  }
  //data.js에 집어넣고
  agoraStatesDiscussions.unshift(addObj)
  //ul 싹 지우고 다시 렌더 하거나 (?)

  //li로 바꾸고 ul에 넣기
  const discussion = convertToDiscussion(addObj)
  ul.prepend(discussion)

  //입력값 초기화
  author.value = ''
  title.value = ''
  textbox.value = ''
})

  // //페이지네이션
  // const pageGroup = 