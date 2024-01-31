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
  // img
  const avatarImg = document.createElement("img");
  avatarImg.className = 'discussion__avatar--image'
  avatarImg.src = obj.avatarUrl
  avatarImg.alt = 'avartar of ' + obj.author
  avatarWrapper.append(avatarImg)
  
  // 시간 표현 
  const formatDate = new Date(obj.createdAt).toLocaleString('ko-KR', { timeZone: 'UTC' });
  // discussion info
  const discussionTitle = document.createElement("h2")
  const discussionLink = document.createElement("a")
  discussionLink.href = obj.url
  discussionLink.textContent = `${obj.title}`
  discussionTitle.append(discussionLink)
  const discussionInfo = document.createElement('div')
  discussionInfo.className = 'discussion__information'
  discussionInfo.textContent = `${obj.author} / ${formatDate}`
  discussionContent.append(discussionTitle)
  discussionContent.append(discussionInfo)

  // answered
  const discussionAns = document.createElement('div')
  discussionAns.className = 'discussion__answered--checked'
  discussionAns.textContent = obj.answer ? "✅" : "❌"
  discussionAnswered.append(discussionAns)

  // answer toggle 
  const discussionAnsContent = document.createElement('div')
  discussionAnsContent.className = 'discussion__answered--contents'
  // discussionAnsContent.textContent = obj.answer ? obj.answer.bodyHTML : '';
  // discussionAnswered.append(discussionAnsContent)

  // 문자열을 DOM으로 변환.
  if(obj.answer) {
  const parsedHTML = new DOMParser().parseFromString(obj.answer.bodyHTML, 'text/html')
  for (const child of parsedHTML.body.childNodes) {
    discussionAnsContent.appendChild(child.cloneNode(true));
  }
  discussionAnswered.appendChild(discussionAnsContent);
  }

  // click toggle event
  li.addEventListener('click', (e) => {
    e.preventDefault()
    li.classList.toggle("active")
  })


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

// form
const form = document.querySelector('.form');
const nameInput = document.querySelector('#name');
const titleInput = document.querySelector('#title');
const storyInput = document.querySelector('#story');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const newDiscussion = {
    author: nameInput.value,
    title: titleInput.value,
    bodyHTML: storyInput.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/129926357?s=400&u=510f31940547e71fa8d3e5567d609148b8f9bb26&v=4",
    answer: null,
    createdAt: new Date(),
  }

  agoraStatesDiscussions.unshift(newDiscussion)
  ul.innerHTML = '';
  render(ul)

  nameInput.value = '';
  titleInput.value = '';
  storyInput.value = '';
})

const itemsPerPage = 10
const data = [ul]
