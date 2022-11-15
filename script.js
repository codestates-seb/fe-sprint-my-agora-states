// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const buttons = document.querySelector(".pageNumbBox")
const numberContent = 10;
const buttonNumb = 5;
let presentPage = 1;


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

  // 아바타 이ㅁㅣ지
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of '+obj.author;
  avatarImg.className = "discussion__avatar--image";
  avatarWrapper.append(avatarImg);



  //discussion 
  const titleContainer = document.createElement('h2');
  titleContainer.className = "discussion__title";

  const contentLink = document.createElement('a');
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  titleContainer.append(contentLink);
  discussionContent.append(titleContainer);

  const contentInfo = document.createElement('div');
  contentInfo.className = "discussion__information";
  contentInfo.textContent = obj.author+' / '+transTime(obj.createAt);
  discussionContent.append(contentInfo);

  // icon
  const yesIcon = document.createElement('i');
  const noIcon = document.createElement('i');
  const checkIcon = document.createElement('i');

  yesIcon.setAttribute('class',"fa-solid fa-circle-check");
  noIcon.setAttribute('class', "fa-regular fa-circle-check");
  checkIcon.setAttribute('class', "fa-solid fa-check-double");
  checkIcon.setAttribute('id', 'notice')


  if(obj.title.includes('[notice]')) {
    discussionAnswered.append(checkIcon);
  } else {
    if(obj.answer) {
      discussionAnswered.append(yesIcon);
    } else {
      discussionAnswered.append(noIcon);
    }
  }


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};




// 버튼 생성  호이스팅 주의... 아래에서 작성했다가 한참 해맸음 

const myBtn = (pageNum) => {
  const button = document.createElement('button');
  button.classList.add('page__number');
  if (pageNum === 'previous') {
    button.innerText = '<'
  } else if (pageNum === 'next') {
    button.innerText = '>'
  } else {
    button.innerText = pageNum;
  }

  button.addEventListener('click', (e)=> {
    for (const child of buttons.children) {
      if (Number(child.innerText)===presentPage) {
        child.classList.remove("clicked");
      }
    }
    e.target.classList.add('clicked');

    if(e.target.innerText === '<') {
      presentPage = Math.floor(presentPage/buttonNumb)*buttonNumb;
      renderButton(buttons, presentPage);
    } else if (e.target.innerText === '>') {
      presentPage = Math.ceil(presentPage/buttonNumb)*buttonNumb+1;
      renderButton(buttons, presentPage);
    } else {
      presentPage = Number(e.target.innerText);
    } renderDiscussion(ul, presentPage);
  })
  console.log(button);
  return button;
}



// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const renderDiscussion = (element, pageNum) => {
  while (element.children.length>1) {
    element.removeChild(element.lastChild);
  }

  let start = (pageNum - 1) * numberContent + 1;
  let end = Math.min(agoraStatesDiscussions.length, start+numberContent-1);
  for (let i = start; i <= end; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i-1])); 
  } 
  return;
};


// 버튼 렌더링 호이스팅 주의... 아래에서 작성했다가 한참 해맸음 

const renderButton = (element, pageNum) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }

  if(pageNum > buttonNumb) {
    element.append(myBtn('previous'));
  }

  let ready = Math.floor((pageNum-1)/buttonNumb)*buttonNumb+1;
  let pageTotal = Math.ceil((agoraStatesDiscussions.length/numberContent))
  let finish = Math.min(pageTotal, ready+buttonNumb-1);

  for (let i = ready; i <= finish; i += 1) {
    element.append(myBtn(i));
  }
  if (pageTotal > finish) {
    element.append(myBtn('next'))
  }
}


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
renderButton(buttons, presentPage);
renderDiscussion(ul, presentPage);

let userName = document.querySelector('input#name');  
let newTitle = document.querySelector('input#title');
let question = document.querySelector('#story');
let submitButton = document.forms['textbox'];


submitButton.addEventListener('submit', function(e){
  agoraStatesDiscussions.unshift({
    id: null,
    createAt: new Date().toISOString(),
    title: newTitle.value,
    url: null,
    author: userName.value,
    answer: null,
    bodyHTML: question.value,
    avatarUrl: "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4"
  })

  for (let i of submitButton){
    if(i.value === '막고라 신청하기'){
      continue;
    }
    i.value = '';
  }
    renderDiscussion(ul, presentPage);
    renderButton(buttons, presentPage);
    e.preventDefault();
  
});




// 시간

function transTime(string) {

  let time = new Date(string);

  if(time.toDateString()===new Date().toDateString()) {
    
    let hour = time.getHours();
    let resultTime = (hour>=12&&hour<24)? '오후':'오전';
    return `${resultTime} ${hour%12}: ${time.getMinutes()}: ${time.getSeconds()}`
  } else {
    return `${time.getFullYear()}. ${time.getMonth()+1}.${time.getDate()}`
  }
}