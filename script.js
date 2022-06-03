
// data.js 파일의 agoraStatesDiscussions 배열을 렌더링 하는 part 시작//

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

  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg);
  avatarImg.className = "discussion__avatar--image"; // 추가한 부분

  const flexStart = document.createElement("div"); //flexStart추가
  flexStart.className = "flexstart"; //flexStart추가
  const discussionTitle = document.createElement("h2");
  const titleAnchor = document.createElement("a");
  titleAnchor.href = obj.url;
  titleAnchor.textContent = obj.title;
  discussionTitle.append(titleAnchor);
  flexStart.append(discussionTitle); //flexStart추가


  const flexEnd = document.createElement("div"); //flexEnd 추가
  flexEnd.className = "flexend"//flexEnd 추가
  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;
  flexEnd.append(discussionInformation); //flexEnd추가
  discussionContent.append(flexStart, flexEnd); //discussionTitle-> flexStart, discussionInformation -> flexEnd로 바꿈
 

  const checked = document.createElement("p");
  checked.textContent = obj.answer ? "☑" : "□";
  discussionAnswered.append(checked);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

// data.js 파일의 agoraStatesDiscussions 배열을 렌더링 하는 part 시작//





//변수 리스트 //
const nameInput = document.querySelector('.name_input');
const titleInput = document.querySelector('.title_input');
const textInput = document.querySelector('.text_input');
const submitBtn = document.querySelector('.inputsize');







//part1. 아이디, 질문 유효성 검사//
function isIndludeIndex(value){
  return value.indexOf('[') !== -1 && value.indexOf(']') !== -1; //true면 말머리 있음
}



// 새로운 질문 추가 part 시작 //

let newObj = {};
// submitBtn.onclick = function(){ //객체에 담기
//   if(isIndludeIndex(titleInput.value) === false){
//     alert('[질문 카테고리를 입력해주세요]');
//   }
//   else{
//     newObj.author = nameInput.value;
//     newObj.title = titleInput.value;
//     newObj.question = textInput.value; 
//     newObj.createdAt = Date.now(); 
//     newObj.avatarUrl = "https://kr.seaicons.com/wp-content/uploads/2016/03/Floppy-Disk-icon.png";

//     agoraStatesDiscussions.push(newObj);
//     render(ul);
//     // newObj = {};
//     nameInput.value ='';
//     titleInput.value ='';
//     textInput.value ='';
//   }
// }
function handleQSubmit(event){
  event.preventDefault();
    if(isIndludeIndex(titleInput.value) === false){
    alert('[질문 카테고리를 입력해주세요]');
  }
  else{
    newObj.author = nameInput.value;
    newObj.title = titleInput.value;
    newObj.question = textInput.value; 
    newObj.createdAt = Date.now(); 
    newObj.avatarUrl = "https://kr.seaicons.com/wp-content/uploads/2016/03/Floppy-Disk-icon.png";

    agoraStatesDiscussions.push(newObj);
    render(ul);
    // newObj = {};
    nameInput.value ='';
    titleInput.value ='';
    textInput.value ='';
  }
}
submitBtn.addEventListener("click", handleQSubmit);
// 새로운 질문 추가 part 끝 //
