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

  const avatarImg = document.createElement('img')
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl
  avatarImg.alt = 'avatar of ' + obj.author
  avatarWrapper.append(avatarImg)

//title
  const contentTitle = document.createElement('h2')
  contentTitle.className = "discussion__title"
  discussionContent.append(contentTitle)
//link
  const contentLink = document.createElement('a')
  contentLink.href = obj.url
  contentLink.textContent = obj.title
  contentTitle.append(contentLink)
//info
  const contentInformation = document.createElement('div')
  contentInformation.className = "discussion__information"
  contentInformation.textContent = obj.author
  discussionContent.append(contentInformation)

//checkbox
  const contentAnswered = document.createElement('p')
  contentAnswered.className = "discussion__answered"
  discussionAnswered.append(contentAnswered)
  if( obj.answer === null ){
    contentAnswered.textContent = "✔️"
  }else{
    contentAnswered.textContent = "✏️"
  }
//date
  contentInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString("ko-KR")}`


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // element.innerHTML = ""
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


//입력 데이터를 가져와 data.js의 객체에 agoraStatesDiscussions객체로 넣어준다???
const form = document.querySelector("form")
const submitName = document.querySelector('#name')
const submitTitle = document.querySelector('#title')
const submitStory = document.querySelector('#story')

// form.addEventListener("submit", function(e){
//   e.preventDefault() //이벤트객체의 기존의 기능을 차단하겠다 써밋의 리다이렉션을 막아줌
//   console.log(form.name.value)
//   console.log(form.title.value)
//   console.log(form.story.value)
// })

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const obj = {
    id : "unique id",
    createdAt: new Date().toISOString(),
    title: submitTitle.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/6",
    author: submitName.value,
    answer: 'x',
    bodyHTML: submitStory.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
  }

agoraStatesDiscussions.unshift(obj)
const newDiscussion = convertToDiscussion(obj) //위 디스커션 추가 함수 적용
ul.prepend(newDiscussion)
submitTitle.value = ""
submitName.value = ""
submitStory.value = "" 
})


// const h2 = document.getElementsByTagName('h2')

// const handleHover = function(){
//   h2.style.color = 'red'
// }

// h2.addEventListener('hover', handleHover)



// 모달 열기
function modalOpen() {
  document.querySelector('.modal_wrap').style.display = 'block';
  document.querySelector('.modal_background').style.display = 'block';
}

// 모달 끄기
function modalClose() {
  document.querySelector('.modal_wrap').style.display = 'none';
  document.querySelector('.modal_background').style.display = 'none';
}


//버튼 클릭리스너 달기
document.querySelector('#modal_btn').addEventListener('click', modalOpen);
document.querySelector('.modal_close').addEventListener('click', modalClose);