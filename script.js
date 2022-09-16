// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);




let newDiscussion = document.createElement('div');
newDiscussion.textContent = 'hello';




//submit button 클릭시 새로운 데이터 보관




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
  

  let answerButton = document.createElement('button');
  let answerContent = document.createElement('div');
  let answerContainer = document.createElement('div');

  let pageButtonWrapper = document.createElement('div');
  pageButtonWrapper.classList.add("pagination__wrapper")
  let pageButton = document.createElement('button');
  pageButton.classList.add("papagination__button")
  let main = document.querySelector('main');

//create pagination buttons







  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.


  const submitButton = document.querySelector('.submit__button');


 //avatarWrapper 만들기
    let avatarImg = document.createElement('img');
    avatarImg.src = obj.avatarUrl;
    avatarImg.alt = 'avatar of ' + obj.author;
    avatarImg.classList.add('discussion__avatar--image')
    avatarWrapper.append(avatarImg);


  //discussionContent 만들기
    let discussionTitle = document.createElement('h2'); //디스커션 제목 생성
    let discussionTitleContent = document.createElement('a');
    discussionTitleContent.setAttribute('href',obj.url); //하이퍼링크 추가
    discussionTitleContent.textContent = obj.title; // 제목 내용 추가
    discussionTitle.append(discussionTitleContent); // 
    discussionTitle.classList.add('discussion__title'); //클래스 추가
    discussionContent.append(discussionTitle); // 

    let discussionInfo = document.createElement('div');// 디스커션 글쓴이, 게시 시각 생성
    discussionInfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleString()}` //디스커션 글쓴이 게시 시각 불러와서 내용 추가
    discussionInfo.classList.add('discussion__information')
    discussionContent.append(discussionInfo);
    discussionTitleContent.classList.add("discussionTitle");


  //discussionAnswered 만들기
    if(obj.answer !== null) {
      answerContainer.classList.add("answerContainer");
      // discussionAnswered.textContent = '☑'; 

      answerContainer.append(answerContent);
      discussionContent.append(answerContainer);
      discussionAnswered.classList.add('discussion__answered')


      answerButton.classList.add("answer__button");
      answerButton.textContent = "답변 보기"
      answerButton.classList.add("answerButton");
      answerContent.classList.add("answer__content");
      answerContent.innerHTML = obj.answer.bodyHTML;
      answerContent.classList.add('hide');

      let isShown = false

      answerButton.onclick = function () { //버튼 클릭하면 숨겼다 보였다 함
        if (isShown === false){
          answerContent.classList.remove('hide');
          answerButton.textContent = "답변 닫기"
        }
        else {
          answerContent.classList.add('hide');
          answerButton.textContent = "답변 보기"
        }
        isShown = !isShown;
      }
    }

    else {
      // discussionAnswered.textContent = '☐'
      answerContainer.append(answerContent);
      discussionContent.append(answerContainer);

      answerButton.classList.add("answer__button");
      answerButton.textContent = "답변 없음"
      answerButton.classList.add("answerButtonDisabled");
      answerButton.setAttribute("disabled","disabled")

    }




    

  li.append(avatarWrapper, discussionContent, discussionAnswered,answerButton);
  
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render1 = (element) => {
  
  let discussionContainer = document.querySelector(".discussions__container");
  
  // while (discussionContainer.hasChildNodes()) {
  //   discussionContainer.removeChild(discussionContainer.firstChild);
  // } 

    for (let i = 0; i < 10; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
};

//이하는 쌉 야매 페이지네이션 함수임. pageButton 한꺼번에 불러와서 pageButton.textContent로 데이터의 범위를 계산할려고 했는데 pageButton 이벤트 처리가 안됨...왜이럼? 이거되면 함수 한개만 있으면 되는데 안돼서 걍 야매로 버튼 개수별로 만듬

const render2 = (element) => {
  let discussionContainer = document.querySelector(".discussions__container");
  
  while (discussionContainer.hasChildNodes()) {
    discussionContainer.removeChild(discussionContainer.firstChild);
  }


    for (let i = 10; i < 20; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
};

const render3 = (element) => {
  let discussionContainer = document.querySelector(".discussions__container");
  
  while (discussionContainer.hasChildNodes()) {
    discussionContainer.removeChild(discussionContainer.firstChild);
  }


    for (let i = 20; i < 30; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
};

const render4 = (element) => {
  let discussionContainer = document.querySelector(".discussions__container");
  
  while (discussionContainer.hasChildNodes()) {
    discussionContainer.removeChild(discussionContainer.firstChild);
  }


    for (let i = 30; i < 40; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
};

const render5 = (element) => {
  let discussionContainer = document.querySelector(".discussions__container");
  
  while (discussionContainer.hasChildNodes()) {
    discussionContainer.removeChild(discussionContainer.firstChild);
  }


    for (let i = 40; i < 40 + agoraStatesDiscussions.length % 5; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    
    if(agoraStatesDiscussions.length % 5 < 10){
      
      let newData = {'title': "마지막 페이지 입니다.", 'url': "",'author': "", 'answer': null, 'avatarUrl': "https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png"};
      agoraStatesDiscussions.push(newData)
      element.append(convertToDiscussion(agoraStatesDiscussions[agoraStatesDiscussions.length-1]))
      break;
    }
  }
};


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render1(ul);

//현재 시각을 출력합니다
function printClock(){
  return new Date().toLocaleString();
}


//데이터의 시간 포맷을 바꿔줍니다. 
// function formatTime(str){
//   // 2022-05-16T01:02:17Z
//   // 01234567890123456789
//   let year = str.substring(0,4);
//   let month = 0;
//   let day = 0;
//   let ifAfternoon = '오전';
//   let time = 0;

//   if(str[5] === '0'){
//     month = str.substring(6,7);
//   }
//   else{
//     month = str.substring(5,7);
//   }
//   if(str[8] === '0'){
//     day = str.substring(8,9);
//   }
//   else{
//     day = str.substring(8,10);
//   }
//   if(Number(str.substring(11,13)) >= 13) {
//     time = (Number(str.substring(11,13)) - 12) + str.substring(13,str.length-1) 
//   }
//   else{
//     time = str.substring(12,str.length-1) 
//   }
//   if(Number(str.substring(11,13)) >= 12) {
//     ifAfternoon = '오후';
//   }
//   return (`${year}. ${month}. ${day}. ${ifAfternoon} ${time}`);
// }

//디폴트 discussion content에 현재 시각을 출력합니다. 
const timeFormat = document.querySelector(".timeFormat")
timeFormat.textContent = `kimploo / ${printClock()}`

