let time = new Date();

//렌더링 이전에 로컬스토리지가 비어있지 않다면 data.js안의 agorastatesDiscussions앞에 추가
if(localStorage.getItem('key') != undefined ) {
  let before_render = JSON.parse(localStorage.getItem('key'))
  for(let i = 0 ; i < before_render.length; i++) {
    agoraStatesDiscussions.unshift(before_render[i])
  }
}

//page를 기준으로 agorastatesDiscussions안의 내용들을 뽑기 위해 page설정
let page = 1;
localStorage.getItem('page') == undefined ? page = 1 : page = Number(localStorage.getItem('page'))
document.getElementsByClassName('page__state__now')[0].textContent = page
document.getElementsByClassName('page__state__now')[1].textContent = page
let min_page = 1;
let max_page = Math.floor(agoraStatesDiscussions.length/10)+1

//submit눌렀을때 저장할수있게 객체형태로 데이터 저장
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

//이름태그안에 키를 입력 할때 마다 위의 newObj안에 name에 값을 변경시킴
document.querySelector('#name').addEventListener('input',function (){
  newObj.author = document.querySelector("#name").value
})

//타이틀태그안에 키를 입력 할때 마다 위의 newObj안에 title에 값을 변경시킴
document.querySelector('#title').addEventListener('input',function (){
  newObj.title = document.querySelector("#title").value
})

//내용태그안에 키를 입력 할때 마다 위의 newObj안에 story에 값을 변경시킴
document.querySelector('#story').addEventListener('input',function (){
  newObj.bodyHTML = document.querySelector("#story").value
})

//submit을 누르면 로컬스토리지에 저장
document.querySelector('.form__submit').addEventListener('click',function (){
  newObj.createdAt = `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}T${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}Z`
  if(localStorage.getItem('key') != undefined) {
    let old_arr = JSON.parse(localStorage.getItem('key'))
    old_arr.push(newObj)
    localStorage.setItem('key',JSON.stringify(old_arr))
  } else {
    localStorage.setItem('key',JSON.stringify([newObj]))
  }
})

//page의 값을 prev버튼과 next버튼을 통해서 감소 증가를 시키고 page값 또한 로컬스토리지에 저장
document.addEventListener('click',function (e){
  e.target.className == 'page__prev' && min_page == page ? undefined : e.target.className == 'page__prev' && min_page != page ? (page-=1,localStorage.setItem('page',page)) : undefined;
  e.target.className == 'page__next' && max_page == page ? undefined : e.target.className == 'page__next' && max_page != page ? (page+=1,localStorage.setItem('page',page)) : undefined;
})

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
    agoraStatesDiscussions[i] != undefined ? element.append(convertToDiscussion(agoraStatesDiscussions[i])) : undefined;
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector('ul.discussions__container');
render(ul)

