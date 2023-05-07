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
document.getElementsByClassName('page__number--now')[0].textContent = page
let min_page = 1;
let max_page = Math.floor(agoraStatesDiscussions.length/7)+1


//submit눌렀을때 저장할수있게 객체형태로 데이터 저장
let newObj = {
  id:'',
  createdAt:'',
  title:'',
  url:'',
  author:'',
  answer:'',
  bodyHTML:'',
  avatarUrl:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png',
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
  e.target.className == 'frontpage' && min_page == page ? undefined : e.target.className == 'frontpage' && min_page != page ? (page-=1,localStorage.setItem('page',page)) : undefined;
  e.target.className == 'backpage' && max_page == page ? undefined : e.target.className == 'backpage' && max_page != page ? (page+=1,localStorage.setItem('page',page)) : undefined;
})



// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper"; //이미지 클래스를 얘에다가 배분해야 됨

  const avatarImage = document.createElement("img"); 
	avatarImage.classList.add('discussion__avatar--image'); //클래스 지정
	avatarImage.src = obj.avatarUrl; // 소스
	avatarImage.alt = `avatar of ${obj.author}` // alt
	avatarWrapper.append(avatarImage); //상위태그에 배정

  li.append(avatarWrapper);
  

  const discussionContent = document.createElement("div");
  const discussionInformation = document.createElement("div")
  discussionContent.className = "discussion__content"; //디스커션 콘텐트 클래스 지정
  discussionInformation.className = "discussion__information";// 디스커션 인포 클래스 지정
  discussionInformation.innerText = `${obj.author} / ${obj.createdAt}`; // 디스커션 인포 내부 텍스트
  discussionContent.append(discussionInformation); //상위태그에 배정

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title"; // 디스커션 타이틀 클래스 생성
  discussionContent.append(discussionTitle); //상위태그에 배정

  const discussionLink = document.createElement("a");
  discussionLink.href = obj.url; //객체의 url을 href로(연결링크)
  discussionLink.innerText = obj.title; //객체의 title을 태그 내부 텍스트로
  discussionTitle.append(discussionLink); //상위태그에 배정

  li.append(discussionContent);


  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered"; // 태그명 p를 얘에다가 배분해야 되는데 대답 됐냐 안 됐냐에 따라서 체킹이 다르게
  const answerCheck = document.createElement("p");
  if(obj.answer === null){answerCheck.innerText = "□"} //답변 안 달렸으면 빈 박스
  else{answerCheck.innerText = "☑"} //아니면 체크박스
  discussionAnswered.append(answerCheck); //상위태그에 배정

  li.append(discussionAnswered);

  

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = (page-1)*7; i < page*7; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
