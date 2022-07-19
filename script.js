// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

// 로컬스토리지 비우기
// localStorage.clear();  

let agoraArray = agoraStatesDiscussions;

const inputString = localStorage.getItem('InputInfo');
const parsInputString = JSON.parse(inputString);


if(localStorage.getItem('InputInfo') !== null){
  agoraArray = parsInputString.slice(0,parsInputString.length - agoraStatesDiscussions.length);
  agoraArray = [...agoraArray,...agoraStatesDiscussions];
  
}

// 버튼 모음
const submit = document.querySelector('.form__submit');
const prevBtn = document.querySelector('.prev__btn');
const nextBtn = document.querySelector('.next__btn');


const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputStory = document.querySelector('#story');
const ul = document.querySelector("ul.discussions__container");


// input이 모두 안 비어있으면 true
const inputIsTrue = () => inputName.value.length !== 0 && inputTitle.value.length !== 0 && inputStory.value.length !== 0;

// 시간 Form 변경하는 함수
const convertTime = (date) =>{
  let timelist = date.split(','); // ['7/19/2022', ' 10:01:33 AM']
  let timeSplit = timelist[1].split(' '); // ['', '10:01:33', 'AM']
  let yearSplit = timelist[0].split('/'); // ['7', '19', '2022']
  let year = yearSplit[2];
  let month = yearSplit[0];
  let day = yearSplit[1];
  let ampm = timeSplit[2];
  let time = timeSplit[1];

  if(ampm === 'AM'){
    ampm = '오전';
  } else{
    ampm = '오후';
  }
  
  return `${year}.${month}.${day} ${ampm} ${time}`
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 사용자 아바타 이미지 DOM
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImg = document.createElement("img");
  avatarImg.className = "discussion__avatar--image";
  avatarImg.setAttribute('src', obj.avatarUrl);
  avatarImg.setAttribute('alt', `avatar of ${obj.author}`)

  avatarWrapper.append(avatarImg);
  
  // 사용자 질문 DOM
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement('a');
  discussionLink.setAttribute('href', obj.url);
  discussionLink.textContent = obj.title;
  discussionTitle.append(discussionLink);


  // information 설정 
  const discussionInfor = document.createElement("div");
  discussionInfor.className = "discussion__information";
  // new Date(obj.createdAt).toLocaleString() <- 한국 시간으로 표현됨.
  const time = new Date(obj.createdAt).toLocaleString();
  discussionInfor.textContent = `${obj.author} / ${convertTime(time)}`;

  // 사용자 대답 DOM
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const answerCheck = document.createElement('p');
  if(obj.answer !== null){
    answerCheck.textContent = '☑';
  }else{
    answerCheck.textContent = '☐';
  }

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  discussionContent.append(discussionTitle, discussionInfor);
  discussionAnswered.append(answerCheck);

  li.append(avatarWrapper, discussionContent, discussionAnswered);

  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
let page = 1;
const render = (element) => {
      for (let i = (page-1)*10; i < agoraArray.length; i += 1) {
      element.append(convertToDiscussion(agoraArray[i]));
    }
  // if(agoraArray.length - page*10 >= 0){
  //   for (let i = (page-1)*10; i < page*10; i += 1) {
  //     element.append(convertToDiscussion(agoraArray[i]));
  //   }
  // } else{
  //   for (let i = (page-1)*10; i < agoraArray.length; i += 1) {
  //     element.append(convertToDiscussion(agoraArray[i]));
  //   }
  // }
  return;
};

const remove = (element) => {
  while(element.children.length > 10){
    console.log(element.removeChild(element.firstChild));

    // element.removeChild(element.firstChild)
  }
  return;
}

// 클릭시 추가하는 부분이 실행되어야함.
submit.onclick = () => {
  let date = new Date();
  const obj = {};
  obj.author = inputName.value;
  obj.title = inputTitle.value;
  obj.story = inputStory.value;
  obj.answer = null;
  obj.avatarUrl = "https://avatars.githubusercontent.com/u/12145019?s=64&u=5c97f25ee02d87898457e23c0e61b884241838e3&v=4";
  obj.createdAt = date.toLocaleString();
  
  if(inputIsTrue()){
    agoraArray.unshift(obj);
    // 맨앞에 추가하는 속성
    ul.prepend(convertToDiscussion(obj));
    localStorage.setItem('InputInfo',JSON.stringify(agoraArray))
  }
  console.log(agoraArray);
  console.log(localStorage);
}

prevBtn.onclick = () => {
  if(page > 1){ 
    page -= 1;
    nextBtn.removeAttribute('disabled');
    // render(ul);
    // remove(ul);
  }
  if(page === 1){
    prevBtn.setAttribute('disabled', true);
  }

  

  console.log(page);
}

nextBtn.onclick = () => {
  if(page <= Math.floor(agoraArray.length/10)){
    page += 1;
    prevBtn.removeAttribute('disabled');
    // render(ul);
    // remove(ul);
  }
  if(page === Math.floor(agoraArray.length/10)+1){
    
    nextBtn.setAttribute('disabled', true);
  }
  

  console.log(page);
}

// console.log(storageObj);
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
// agoraStatesDiscussions = newagoraDiscussions();

render(ul);


