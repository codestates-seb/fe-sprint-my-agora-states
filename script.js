console.log(agoraStatesDiscussions);
// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

let time = new Date();
if(localStorage.getItem('key') != undefined) {
  let before_render = JSON.parse(localStorage.getItem('key'))
  for(let i = 0 ; i < before_render.length; i++) {
    agoraStatesDiscussions.unshift(before_render[i])
  }
}

let page = 1;
localStorage.getItem('page') == undefined ? page = 1 : page = Number(localStorage.getItem('page'))
document.getElementsByClassName('page__state__now')[0].textContent = page
let min_page = 1;
let max_page = Math.floor(agoraStatesDiscussions.length/10)+1

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

//page 구성 

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

//IMG 영역
 const avatarImg = document.createElement('img'); // img태그를 생성
 avatarImg.src = obj.avatarUrl; //obj안에 키 avatarUrl을 가져옴
 avatarImg.alt = 'avatar of' + obj.author; // alt 정보를 가져옴
 avatarWrapper.append(avatarImg); //avatarWrapper 요소 끝에 avatarImg를 삽입
 li.append(avatarWrapper)

 //제목 영역
 const contentTitle = document.createElement('h2') //h2태그 생성
 contentTitle.className = "discussion__title"; //h2의 class 이름을 discussion__title
 discussionContent.append(contentTitle);

//  //링크 넣기
const contentLink = document.createElement('a') //링크 태그 생성
contentLink.href = obj.url; //매개변수 obj에서 url키 가져오기.
contentLink.textContent = obj.title; //텍스트를 매개변수 obj의 키를 title을 불러옴
discussionContent.append(contentLink) //discussionContent에 contentLink를 삽입.

// //작성자, 시간 정보
const contentInfo = document.createElement('div');
contentInfo.className = 'discussion__information';
contentInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString('ko-kr')}`
discussionContent.append(contentInfo); 


//discussion__answered 영역
const contentAnswered = document.createElement('p')
contentAnswered.className = "discussion__answered";
if (obj.answer === null) {
  contentAnswered.textContent = '○'
} else {
  contentAnswered.textContent = '●'
}
discussionAnswered.append(contentAnswered) 

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = (page-1)*10; i < page*10; i += 1) {
    if(agoraStatesDiscussions[i] != undefined) {
      element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    } 
  }
  return;
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// 새로운 obj
let newObj = {
  id:'',
  createdAt:'',
  title:'',
  url:'',
  author:'',
  answer:'',
  bodyHTML:'',
  avatarUrl:'https://avatars.githubusercontent.com/u/79903256?s=64&v=4',
}

document.querySelector('#name').addEventListener('input', function() {
  newObj.author = document.querySelector('#name').value
})


document.querySelector('#title').addEventListener('input', function() {
  newObj.title = document.querySelector('#title').value
})

document.querySelector('#story').addEventListener('input', function() {
  newObj.bodyHTML = document.querySelector('#story').value
})



// submit 클릭시 data에 있는 정보에 추가.
document.querySelector('.form__submit').addEventListener('click',function() {
  newObj.createdAt = `${time.getFullYear()}. ${time.getMonth()+1}. ${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  if(localStorage.getItem('key') != undefined) {
    let old_obj = JSON.parse(localStorage.getItem('key'))
    old_obj.push(newObj)
    localStorage.setItem('key',JSON.stringify(old_obj))
  } else {
    localStorage.setItem('key',JSON.stringify([newObj]))
  }
})



document.querySelectorAll('.page__prev')[0].addEventListener('click',function (){
  min_page == page ? page : page-=1;
  localStorage.setItem('page',page)
})

document.querySelectorAll('.page__next')[0].addEventListener('click',function (){
  max_page == page ? page : page+=1;
  localStorage.setItem('page',page)
})

document.querySelectorAll('.page__prev')[1].addEventListener('click',function (){
  min_page == page ? page : page-=1;
  localStorage.setItem('page',page)
})

document.querySelectorAll('.page__next')[1].addEventListener('click',function (){
  max_page == page ? page : page+=1;
  localStorage.setItem('page',page)
})