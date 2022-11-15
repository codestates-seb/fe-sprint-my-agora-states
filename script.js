// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";

  const innerImage = document.createElement('img')
  innerImage.className = "discussion__avatar--image"
  innerImage.src = obj.avatarUrl
  innerImage.alt = `avatar of ${obj.author}`
  avatarWrapper.appendChild(innerImage)

  // ---------------------------------------------------------

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const title = document.createElement('h2')
  title.className = "discussion__title"
  const link = document.createElement('a')
  link.href = obj.url
  link.innerText = obj.title
  title.appendChild(link)
  discussionContent.appendChild(title)

  const info = document.createElement('div')
  info.className = 'discussion__information'
  info.innerText = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`
  discussionContent.appendChild(info)

  // ---------------------------------------------------------

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  const check = document.createElement('div')
  check.className = "discussion__answered"
  const para = document.createElement('p')
  para.innerText = obj.answer?"☑":"☒"
  check.appendChild(para)
  discussionAnswered.appendChild(check)


  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.



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


const submitBtn = document.querySelector(".form__submit")
submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const obj = {
    id: "999",
    createdAt: new Date(),
    title: document.getElementById('title').value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: document.getElementById('name').value,
    answer: null,
    bodyHTML: document.getElementById('story').value,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4",
  }

  agoraStatesDiscussions.unshift(obj)
  ul.prepend(convertToDiscussion(obj))
})