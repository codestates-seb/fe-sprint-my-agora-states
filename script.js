// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
const discussionThreadObj = {
  id: "",
  createdAt: "",
  title: "",
  url: null,
  author: "",
  answer: null,
  bodyHTML: '',
  avatarUrl: "../src/1.png"
}

//default avatar images to shuffle
const AvatDefaultUrls = [];
const imgNum = 12;
let imgIdx = 0;
for (let i = 0; i < imgNum; i++) AvatDefaultUrls[i] = `${i+1}.png`;
shuffle(AvatDefaultUrls);

//filter out all the notifications
//advanced: see which titles start with '[notice]...'
const filteredDiscussions = agoraStatesDiscussions.filter(d => d.author !== 'kimploo');
const noticeDiscussions = agoraStatesDiscussions.filter(d => d.author === 'kimploo');

//change all the date formats
filteredDiscussions.forEach(el => {
  el.createdAt = `${el.createdAt.substring(0, 10)} ${el.createdAt.substring(11, 19)}`
  el.date
})


console.log(filteredDiscussions);
// const updatedDiscussions = Array.from(agoraStatesDiscussions);
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
  for (let i = 0; i < filteredDiscussions.length; i += 1) {
    // element.append(convertToDiscussion(JSON.parse(sessionStorage.getItem('threads'))[i]));
    element.append(convertToDiscussion(filteredDiscussions[i]));
  }
  return;
};

const render2 = (el) => {
  for (let i = 0; i <noticeDiscussions.length; i += 1){
    el.append(convertToNotice(noticeDiscussions[i]));
  }
}

//convertNoticeDiscussions on the side
const convertToNotice = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  //fill in discussion content
  const disTitle = document.createElement('h2');
  disTitle.className = "discussion__title";
  const disInfo = document.createElement('div');
  disInfo.className = "discussion__information2";
  const disTitleLink = document.createElement('a');
  disTitleLink.href = obj.url;
  disTitle.append(disTitleLink);
  disTitleLink.textContent = obj.title;
  disInfo.textContent = obj.author;
  discussionContent.append(disTitle, disInfo);

  li.append(discussionContent);
  return li;
}


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// const ul2 = document.querySelector("ul.notice__container");
// render(ul2);



//Event Listeners for form input
const inputName = document.querySelector('#name');
const inputTitle = document.querySelector('#title');
const inputContent = document.querySelector('#story');
const inputSubmit = document.querySelector('#submit');
const formSubmit = document.querySelector('.form');
const testButton = document.querySelector('#ask-btn');
const formPopup = document.querySelector('.form__container');

//Validity Tests
let nameValid = titleValid = contentValid = false;
let submitValid = false;


//turn Toggle AskForm On and Off
function openAskForm(){
  formPopup.style.display = "flex";
  //turn display on
}

function closeAskForm(){
  formPopup.style.display = "none";
}

function closeAskFormCheck(e){
  if (e.target === formPopup){
    closeAskForm();
  }
}

// const newThread = Object.create(discussionThreadObj);



function formValidityTest(e){
  if(e.target.id === 'name'){
    nameValid = e.target.value !== '' ? true : false;
  }else if(e.target.id === 'title'){
    titleValid = e.target.value !== '' ? true : false;
  }else if(e.target.id === 'story'){
    contentValid = e.target.value !== '' ? true : false;
  }else{
    return;
  }
  if (nameValid && titleValid && contentValid) toggleOnOffElem(true, inputSubmit, 'disabled');
  else toggleOnOffElem(false, inputSubmit, 'disabled');

  // printFormValidity();
}

function printFormValidity(){
  console.log('name: ' + nameValid + ' ; title: ' + titleValid + ' ; content: ' + contentValid);

}

let toggleOnOffElem = function(show, elem, attr){
  let disabled = elem.hasAttribute(attr);
  // console.log('disabled: ' + disabled);
 if (disabled === show){
     if (show) elem.removeAttribute(attr);
     else elem.setAttribute(attr, attr);
 }
}

// function toggleSubmit(on, ){
//   if (inputSubmit.hasAttribute('disabled')) inputSubmit.removeAttribute('disabled');
//   else inputSubmit.setAttribute('disabled', 'disabled');
//   console.log('submit toggle');
// }

//is there a way I could create an instance of this particular type of object?
function saveThread(e){
  e.preventDefault();
  // console.log('did this work?');
  //create an object to store the retrieved text info
  const newThread = Object.create(discussionThreadObj);

  //top thread
  let topThread = document.querySelector('.discussion__container');
  console.log(topThread);

  //timezone offset
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const timezoneDate = new Date(Date.now() - timezoneOffset);
  let isoDate = timezoneDate.toISOString();
  // isoDate = isoDate.slice(0, -1);

  //date parsing
  newThread.createdAt = `${isoDate.substring(0, 10)} ${isoDate.substring(11, 19)}`;
  // newThread.bodyHTML = '<p dir="auto">' + newContent + '</p>';

    newThread.author = window.localStorage.getItem('newName');
    newThread.title = window.localStorage.getItem('newTitle');
    newThread.bodyHTML = window.localStorage.getItem('newContent');
    newThread.avatarUrl = 'src/' + (AvatDefaultUrls[imgIdx] || '1.png');
    // newThread.createdAt = new Date(isoDate.slice(0, -1));
    filteredDiscussions.unshift(newThread);
    // ul.prepend(convertToDiscussion(newThread));
    ul.insertBefore(convertToDiscussion(newThread), topThread);

    //if it's the last image, shuffle the image again
    if (imgIdx >= imgNum-1){
      console.log('img' + imgIdx + ' shuffle!');
      imgIdx = 0;
      shuffle(AvatDefaultUrls);
    }else{
      imgIdx++;
      console.log(imgIdx);
    }

}

// function addToThread(obj){
//   // window.localStorage.setItem('newObj', JSON.stringify(obj));
//   // agoraStatesDiscussions.unshift(obj);
//   // window.sessionStorage.setItem('threads', JSON.stringify(updatedDiscussions));
//   // savedDiscussions = JSON.parse(sessionStorage.getItem('threads'));
//   // render(ul);
//   // ul.prepend(convertToDiscussion(obj));
// }

//save the text inside the text element

function saveText(e, stringVar){
  window.localStorage.setItem(stringVar, e.target.value);
}

function clearInputText(){
  inputName.value = '';
  inputTitle.value = '';
  inputContent.value = '';
  nameValid = titleValid = contentValid = false;
}

let newThreadInitialize = function(){
  window.localStorage.setItem('newName', '');
  window.localStorage.setItem('newTitle', '');
  window.localStorage.setItem('newContent', '');
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


//Advanced: function that creates addEventListeners with multiple functions
//on focus out, retrieve the textContent of the input
// inputName.addEventListener('focusout', (e)=>(saveText(e, 'newName')));
// inputTitle.addEventListener('focusout', (e)=>(saveText(e, 'newTitle')));
// inputContent.addEventListener('focusout', (e)=>(saveText(e, 'newContent')));
//on keyup, save event.value into local storage
inputName.addEventListener('keyup', e => saveText(e, 'newName'));
inputTitle.addEventListener('keyup', e =>saveText(e, 'newTitle'));
inputContent.addEventListener('keyup', e =>saveText(e, 'newContent'));

inputName.addEventListener('keyup', e => formValidityTest(e));
inputTitle.addEventListener('keyup', e => formValidityTest(e));
inputContent.addEventListener('keyup', e => formValidityTest(e));

inputSubmit.addEventListener('click', saveThread); //when clicked, save texts to object, then add obj to threadlist + DOM
inputSubmit.addEventListener('click', clearInputText);
inputSubmit.addEventListener('click', () => toggleOnOffElem(false, inputSubmit, 'disabled'));
inputSubmit.addEventListener('click', closeAskForm);

testButton.addEventListener('click', openAskForm); //ask something button click event
formPopup.addEventListener('click', closeAskFormCheck);
// formSubmit.addEventListener('submit', saveThread);

//opening windows
// function openWin(){

//   let popupWinWidth = 400;
//   let popupWinHeight = 200;
//   // Fixes dual-screen position, Most browsers, Firefox
//   const dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
//   const dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

//   const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
//   const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

//   const left = ((width / 2) - (popupWinWidth/ 2)) + dualScreenLeft;
//   const top = ((height / 2) - (popupWinHeight / 2)) + dualScreenTop;

//   // let left = (screen.width - popupWinWidth) / 2;
//   // let top = (screen.height - popupWinHeight) / 4;

//   let myBars = 'directories=no,location=no,menubar=no,status=no';

//   myBars += ',titlebar=no,toolbar=no';
//   let myOptions = 'scrollbars=no,width=' + popupWinWidth + ',height='+popupWinHeight+',resizeable=yes' + ',top=' + top + ',left=' + left;
//   let myFeatures = myBars + ',' + myOptions;
//   let myReadme = 'This is a test.'

//   let newWin = open('', 'myDoc', myFeatures);

//   newWin.document.writeln('<form>');
//   newWin.document.writeln('<table>');
//   newWin.document.writeln('<tr valign=TOP><td>');
//   newWin.document.writeln('<textarea cols=45 rows=7 wrap=SOFT>');
//   newWin.document.writeln(myReadme + '</textarea>');
//   newWin.document.writeln('</td></tr>');
//   newWin.document.writeln('<tr><td>');
//   newWin.document.writeln('<input type=BUTTON value="Close"');
//   newWin.document.writeln(' onClick="window.close()">');
//   newWin.document.writeln('</td></tr>');
//   newWin.document.writeln('</table></form>');
//   newWin.document.close();
//   newWin.focus();
//   }
// console.log(testButton);

//drop-down button disable
// const dropDowns = document.querySelectorAll('.dd-button');
// console.log(dropDowns);

// for(let d of dropDowns){
//   d.disabled = true;
// }