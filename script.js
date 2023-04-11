// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
//console.log(agoraStatesDiscussions); //더미데이터


let data;

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
//일일이 반복문을 쓸수 없는 HTML로 하드코딩할수 없음 -> DOM을 이용하여 js로 HTML요소를 조작!
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
//DOM append메서드를 이용하여 이미지 요소도 아바타 래퍼에 추가

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


//위에서 생성한 <div>요소들을 li.discussion__container의 자식 요소로 append메서드로 추가해줬다.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};


//data배열의 모든 데이터를 화면에 렌더링하는 함수
const render = (element, from, to) => {
  //console.log(from, to)
  if(!from && !to) {
    from = 0
    to = data.length - 1
  }
  //다지우고 배열에 있는 내용 다 보여주기??
  while (element.firstChild){   // element.firstChild -> 트리에서 노드의 첫번째 자식을 보여주거나 노드가 자식이 없으면 null을 반환
    element.removeChild(element.firstChild) //removeChild() -> 자식 노드를 제거
  }
  for(let i= from; i< to; i += 1){
    element.append(convertToDiscussion(data[i]))
  }
  return
}

/*
// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
 // element.innerHTML = ""
  for (let i = 0; i < agoraStatesDiscussions.length; i++){
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};
*/




const dataFromLocalStorage = localStorage.getItem("agoraStatesDiscussions") //더미데이터를 웹 스토리지인 로컬스토리지에 저장
const ul = document.querySelector("ul.discussions__container")
//230411삭제
//ul.append(li)



if(dataFromLocalStorage){ //만약 더미데이터에서 가져올거라면
  data = JSON.parse(dataFromLocalStorage)
}else{                    //더미데이터가 아닌 서버에서 가져오는거라면
  fetch("http://localhost:4000/discussions")
  .then(res => res.json())
  .then(discussions => {
    data = discussions
    render(ul, 0, limit)
  })
}


//page nation을 위한 변수
let limit = 10,
page =1

//페이지네이션
const getPageStartEnd = (limit, page) => {
  const len = data.length - 1
  let pageStart = Number(page -1) * Number(limit)
  let pageEnd = Number(pageStart) + Number(limit)
  if(page <= 0){
    pageEnd = len
  }
  return { pageStart, pageEnd }
}

const buttons = document.querySelector(".buttons")
buttons.children[0].addEventListener("click", () => {
  if(page>1) {
    page = page -1
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page)
  render(ul, pageStart, pageEnd)
})

buttons.children[1].addEventListener("click", () => {
  if(limit * page < data.length - 1){
    page = page + 1
  }
  const { pageStart, pageEnd } = getPageStartEnd(limit, page)
  render(ul, pageStart, pageEnd)
})

buttons.children[2].addEventListener("click", () => {
  localStorage.removeItem("agoraStatesDiscussions")
  data = agoraStatesDiscussions.slice()
  limit = 10
  page = 1
  render(ul, 0, limit)
})

/*

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

*/


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