// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

let time = new Date();
if(localStorage.getItem('key') != undefined ) {
  let before_render = JSON.parse(localStorage.getItem('key'))
  for(let i = 0 ; i < before_render.length; i++) {
    agoraStatesDiscussions.unshift(before_render[i])
  }
}
let page = 1;
localStorage.getItem('page') == undefined ? page = 1 : page = Number(localStorage.getItem('page'))
document.getElementsByClassName('page__state__now')[0].textContent = page
document.getElementsByClassName('page__state__now')[1].textContent = page
let min_page = 1;
let max_page = Math.floor(agoraStatesDiscussions.length/10)+1
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  //img 부분
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement('img');
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  li.append(avatarWrapper);
  //---------
  //discussion content 부분
  const discussionContent = document.createElement("div");
  const discussionInfor = document.createElement("div")
  discussionInfor.className = 'discussion_information'
  discussionInfor.innerText = `${obj.author} / ${obj.createdAt}`

  discussionContent.className = "discussion__content";
  const discussion_link = document.createElement("a");
  discussion_link.href = obj.url
  discussion_link.target = "_blank";
  discussion_link.append(obj.title)
  const title = document.createElement("h2")
  title.className = 'discussion__title'
  title.append(discussion_link);
  discussionContent.append(title, discussionInfor)
  //-----------

  //discussion answer 부분
  const discussionAnswered = document.createElement("div");
  const discussion_ans = document.createElement("p");
  obj.answer != null ? discussion_ans.innerText = '✓': discussion_ans.innerText = 'X'
  discussionAnswered.className = "discussion__answered";
  discussionAnswered.append(discussion_ans)
  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = (page-1)*10; i < page*10; i += 1) {
    agoraStatesDiscussions[i] == undefined ? 1 : element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul)

let newObj = {
  id:'',
  createdAt:'',
  title:'',
  url:'',
  author:'',
  answer:'',
  bodyHTML:'',
  avatarUrl:'',
}

document.querySelector('#name').addEventListener('input',function (){
  newObj.author = document.querySelector("#name").value
})


document.querySelector('#title').addEventListener('input',function (){
  newObj.title = document.querySelector("#title").value
})

document.querySelector('#story').addEventListener('input',function (){
  newObj.bodyHTML = document.querySelector("#story").value
})

document.querySelector('.form__submit').addEventListener('click',function (){
  newObj.createdAt = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}T${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}Z`
  if(localStorage.getItem('key') != undefined) {
    let old_arr = JSON.parse(localStorage.getItem('key'))
    old_arr.push(newObj)
    localStorage.setItem('key',JSON.stringify(old_arr))
  } else {
    localStorage.setItem('key',JSON.stringify([newObj]))
  }
})

document.querySelector('.page__prev').addEventListener('click',function (){
  min_page == page ? page : page-=1;
  localStorage.setItem('page',page)
})

document.querySelector('.page__next').addEventListener('click',function (){
  max_page == page ? page : page+=1;
  localStorage.setItem('page',page)
})