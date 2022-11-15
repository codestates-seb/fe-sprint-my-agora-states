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
  const avatarImage = document.createElement("img");
  avatarImage.classList = "discussion__avatar--image";
  avatarImage.setAttribute('src', obj.avatarUrl)
  avatarImage.setAttribute('alt', "avatar of " + obj.author)
  avatarWrapper.append(avatarImage)

  const discussionTitle = document.createElement("h2");
  discussionTitle.classList = "discussion__title";
  const discussionTitleA = document.createElement("a");
  discussionTitleA.setAttribute('href', obj.url)
  discussionTitleA.target = '_blank'
  discussionContent.append(discussionTitle)
  discussionTitle.append(discussionTitleA)
  discussionTitleA.textContent = obj.title

  const discussionInfo = document.createElement("div");
  discussionInfo.classList = "discussion__information";

  let createdAt = new Date(obj.createdAt).toLocaleString()
  // console.log(createdAt)
  discussionInfo.textContent = obj.author + ' / ' + createdAt
  discussionContent.append(discussionInfo)

  const discussionAnsweredP = document.createElement("p");
  if (obj.answer) {
    discussionAnsweredP.textContent = '☑'
  } else {
    discussionAnsweredP.textContent = '☒'
  }
  discussionAnswered.append(discussionAnsweredP)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// span.. n개 추가
const spanMaker = (num) => {
  const span = document.createElement("span")
  // span.classList.add('discussion__page')
  span.textContent = num + 1
  return span
}

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element, num=1) => {
  let last = num * 10
  if (num === String(parseInt(agoraStatesDiscussions.length / 10) + 1)) {
    last = agoraStatesDiscussions.length
  }
  console.log(last)
  for (let i = (num - 1) * 10; i < last; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    // console.log(element)
    // console.log(i)
    // console.log(agoraStatesDiscussions[i])
  }
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
const discussionPages = document.querySelector('.discussion__pages')

for (let i = 1; i < (parseInt(agoraStatesDiscussions.length / 10) + 1); i++) {
  discussionPages.append(spanMaker(i))
}
for (let i = 0; i<Object.keys(localStorage).length; i++){
  let key = localStorage.key(i)
  let value = localStorage.getItem(key)
  agoraStatesDiscussions.unshift(JSON.parse(value))
  console.log({key, value})
}
render(ul);


const form = document.querySelector(".form")
console.log(submit)
form.addEventListener('submit', (event) => {
  let obj = {
    createdAt: new Date().toISOString(),
    title: document.querySelector('#title').value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/categories/javascript-node-js",
    author: document.querySelector('#name').value,
    avatarUrl:
      "https://item.kakaocdn.net/do/43d1b22365e58584e7c6c9b4f29cb6008b566dca82634c93f811198148a26065"
  }
  agoraStatesDiscussions.unshift(obj)
  localStorage.setItem(obj.createdAt, JSON.stringify(obj))
  alert('저장되었습니다!')
  ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]))
  document.querySelector('#title').value = ''
  document.querySelector('#name').value = ''
  document.querySelector('#story').value=''
  // render(ul, 1);
  pageReset(1)
  // console.log(agoraStatesDiscussions[0])
  // console.log(agoraStatesDiscussions.length)
  event.preventDefault()
})

const discussionWrapper = document.querySelector('.discussion__wrapper')
// Number(agoraarr.length / 10)+1
// 클릭하면 i+ (n-1)10
let discussionPage = document.querySelectorAll('.discussion__pages > span')
discussionPage.forEach((page) => {
  page.addEventListener('click', pageReset)
})

function pageReset(event) {
  let target = event.target
  if (event === 1){
    target = document.querySelector('.discussion__pages>span')
  }

  let ul = document.querySelector("ul.discussions__container");
  ul.remove()
  // 새로운 10개 채우기
  ul = document.createElement('ul')
  ul.classList.add('discussions__container')
  discussionWrapper.append(ul)
  render(ul, target.textContent)
  // console.log(page.textContent)
  discussionPage.forEach((page) => {
    page.classList.remove('discussion__page')
  })
  target.classList.add('discussion__page')
}



// 세 인풋 모두 채워져야 버튼 활성화
// let name = false;
// let title = false;
// let story = false;

// function exist(event) {
//   return event.target.value.length >= 2
// }
// const allInput = document.querySelectorAll('input')
// allInput.forEach((input) => {
//   input.addEventListener('keyup', (event) => {
//     if (exist(event)) {
//       if (name && title && story) {
//         event.removeAttribute('disabled')
//       }
//     } else {
//     event.setAttribute('disabled', true)
//     }
//   })
// })

