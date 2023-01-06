// import getClock from 'clock.js'
const inputName = document.querySelector('#name')
const inputTitle = document.querySelector('#title')
const inputStory = document.querySelector('#story')
const submit = document.querySelector('input[type=submit]')
const ul = document.querySelector('ul.discussions__container')
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions)
let discussions = []

function getTime() {
  const date = new Date()
  const y = date.getFullYear()
  const m = String(date.getMonth()).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const hr = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const sec = String(date.getSeconds()).padStart(2, '0')
  return `${y}-${m}-${d}T${hr}:${min}:${sec}Z`
}
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement('li') // li 요소 생성
  li.className = 'discussion__container' // 클래스 이름 지정

  const avatarWrapper = document.createElement('div')
  avatarWrapper.className = 'discussion__avatar--wrapper'
  const avatarImg = document.createElement('img')
  avatarImg.className = 'discussion__avatar--img'
  const discussionContent = document.createElement('div')
  discussionContent.className = 'discussion__content'
  const discussionTitle = document.createElement('h2')
  discussionTitle.className = 'discussion__title'
  const discussionInformation = document.createElement('div')
  discussionInformation.className = 'discussion__information'
  const discussionAnswered = document.createElement('div')
  discussionAnswered.className = 'discussion__answered'
  discussionAnswered.innerHTML = '<p>☑</p>'

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  avatarImg.src = obj['avatarUrl']
  avatarImg.alt = 'avatar of ' + obj.author
  avatarWrapper.append(avatarImg)
  discussionTitle.innerText = obj['title']
  discussionInformation.innerText = `${obj['author']} / ${obj['createdAt']}`
  discussionContent.append(discussionTitle)
  discussionContent.append(discussionInformation)

  li.append(avatarWrapper, discussionContent, discussionAnswered)
  return li
}
function makingDiscussionObj(event) {
  let obj = {}
  obj['avatarUrl'] =
    'https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4'
  obj['author'] = inputName.value
  obj['title'] = inputTitle.value
  obj['story'] = inputStory.value
  obj['createdAt'] = getTime() //'2023-01-06T11:42:32Z'
  console.log(obj)
  inputName.value = ''
  inputTitle.value = ''
  inputStory.value = ''
  discussions.push(obj)
  localStorage.setItem('discussions', JSON.stringify(discussions))
  return obj
}
function openDiscussion(event) {
  event.preventDefault()
  let obj = makingDiscussionObj()
  ul.prepend(convertToDiscussion(obj))
}

function randerSavedDiscussions() {
  const savedDiscussions = localStorage.getItem('discussions')
  if (savedDiscussions) {
    const parsedDiscussions = JSON.parse(savedDiscussions)
    discussions = parsedDiscussions
    parsedDiscussions.forEach((discussion) => {
      ul.prepend(convertToDiscussion(discussion))
    })
  }
}
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]))
  }
  return
}

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render(ul)
randerSavedDiscussions()

submit.addEventListener('click', openDiscussion)
