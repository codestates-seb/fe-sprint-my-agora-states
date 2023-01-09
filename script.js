// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
const discussionThreadObj = {
  id: "",
  createdAt: "",
  title: "",
  url: null,
  author: "",
  answer: {
    id: "no one",
      createdAt: "no time",
      url: "",
      author: "kim something",
      bodyHTML:
        '',
      avatarUrl: "https://static.wikia.nocookie.net/drawception/images/c/c1/157050-1352610525.png/revision/latest?cb=20180620225806",
  },
  bodyHTML: '',
  avatarUrl: "../src/avatar1.png"
}

// const AvatDefaultImgs = '../src'
const AvatDefaultUrls = [];
const imgNum = 12;
let imgIdx = 0;
let imgLast = false;
for (let i = 0; i < imgNum; i++) AvatDefaultUrls[i] = `${i+1}.png`;
shuffle(AvatDefaultUrls);
// console.log(AvatDefaultUrls);


// const updatedDiscussions = Array.from(agoraStatesDiscussions);
// console.log(updatedDiscussions);
// window.sessionStorage.setItem('threads', JSON.stringify(updatedDiscussions));

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

  //create avatar image, and connect it to the data
  const avatImg = document.createElement('img');
  avatImg.src = obj.avatarUrl;
  avatImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatImg);

  //fill in discussion content
  const disTitle = document.createElement('h2');
  disTitle.className = "discussion__title";
  const disInfo = document.createElement('div');
  disInfo.className = "discussion__information";
  const disTitleLink = document.createElement('a');
  disTitleLink.href = obj.url;
  // console.log(disTitleLink);
  disTitle.append(disTitleLink);
  disTitleLink.textContent = obj.title;
  disInfo.textContent = obj.author  + " / " + obj.createdAt;
  discussionContent.append(disTitle, disInfo);

  //fill in discussed answered boolean
  const disAnswer = document.createElement('div');
  disAnswer.className = "discussion__answered";
  if (obj.answer) disAnswer.textContent = '☑';
  else disAnswer.textContent = '☒';
  discussionAnswered.append(disAnswer);


  li.append(discussionContent, avatarWrapper, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    // element.append(convertToDiscussion(JSON.parse(sessionStorage.getItem('threads'))[i]));
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    // console.log(agoraStatesDiscussions[i].avatarUrl);
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


//Event Listeners for form input
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputContent = document.querySelector('#story');
const inputSubmit = document.querySelector('#submit');
const formSubmit = document.querySelector('.form');

//on focus out, retrieve the textContent of the input
// inputName.addEventListener('focusout', (e)=>(saveText(e, 'newName')));
// inputTitle.addEventListener('focusout', (e)=>(saveText(e, 'newTitle')));
// inputContent.addEventListener('focusout', (e)=>(saveText(e, 'newContent')));
inputName.addEventListener('keyup', (e)=>(saveText(e, 'newName')));
inputTitle.addEventListener('keyup', (e)=>(saveText(e, 'newTitle')));
inputContent.addEventListener('keyup', (e)=>(saveText(e, 'newContent')));

//when clicked, save texts to object
inputSubmit.addEventListener('click', saveThread);
inputSubmit.addEventListener('click', clearInputText);
// formSubmit.addEventListener('submit', saveThread);

let newName;
let newTitle;
let newContent;
const newThread = Object.create(discussionThreadObj);
console.log(discussionThreadObj);

let newThreadInitialize = function(){
  // newName = '';
  // newTitle = '';
  // newContent = '';
  window.localStorage.setItem('newName', '');
  window.localStorage.setItem('newTitle', '');
  window.localStorage.setItem('newContent', '');
}
// window.localStorage.setItem('person', objString);
// window.localStorage.setItem('nums', arrString);

// newThreadInitialize();
//create an object to store the retrieved text info
//is there a way I could create an instance of this particular type of object?
function saveThread(e){
  e.preventDefault();
  console.log('did this work?');
  // const newThread = Object.create(discussionThreadObj);
  // const newThread = {};
  // newThread.author = newName;
  // newThread.title = newTitle;
  // newThread.bodyHTML = '<p dir="auto">' + newContent + '</p>';
  // console.log(newThread);


    newThread.author = window.localStorage.getItem('newName');
    newThread.title = window.localStorage.getItem('newTitle');
    newThread.bodyHTML = window.localStorage.getItem('newContent');
    newThread.avatarUrl = '../src/' + (AvatDefaultUrls[imgIdx] || '1.png');
    // console.log(newThread.avatarUrl);
    agoraStatesDiscussions.unshift(newThread);
    ul.prepend(convertToDiscussion(newThread));

    //if it's the last image, shuffle the image again
    if (imgIdx >= imgNum-1){
      console.log('img' + imgIdx + ' shuffle!');
      imgIdx = 0;
      shuffle(AvatDefaultUrls);
    }else{
      imgIdx++;
      console.log(imgIdx);
    }
    // addToThread(newThread);

  // console.log(newThread);

}

function addToThread(obj){
  // window.localStorage.setItem('newObj', JSON.stringify(obj));
  // agoraStatesDiscussions.unshift(obj);
  // window.sessionStorage.setItem('threads', JSON.stringify(updatedDiscussions));
  // savedDiscussions = JSON.parse(sessionStorage.getItem('threads'));
  // render(ul);
  // ul.prepend(convertToDiscussion(obj));
}

//save the text inside the text element
function saveText(e, stringVar){
  window.localStorage.setItem(stringVar, e.target.value);
  // stringVar = e.target.value;
  // console.log(stringVar);
}

function clearInputText(){
  inputName.value = '';
  inputTitle.value = '';
  inputContent.value = '';
  // inputName.textContent = '';
  // inputTitle.textContent = '';
  // inputContent.textContent = '';
}

//random shuffle function
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Used like so
// var arr = [2, 11, 37, 42];
// shuffle(arr);
// console.log(arr);