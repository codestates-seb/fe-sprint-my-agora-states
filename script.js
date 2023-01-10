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

   //답변이 있는 경우 체크박스 넣기
   const containerLabel = document.createElement("label");
   containerLabel.className ="container";

   const InputcheckBox = document.createElement("input");
   InputcheckBox.setAttribute("type", "checkbox");
   InputcheckBox.className="checkbox";
   const answered = document.createElement("div");
   answered.className ="checkmark discussion__answered";

   if (obj["answer"] !== null) {
    containerLabel.append(InputcheckBox);
    containerLabel.append(answered); 
   }


  const check = document.querySelector(".answer--wrapper");
  const dimmed = document.querySelector(".dim");
 

  InputcheckBox.onclick = function() {
    InputcheckBox.setAttribute("checked", "checked");
    check.classList.add("answer-style");
    dimmed.classList.add("dimmed");


    const popup = document.querySelector(".answer--wrapper");
    const answerSpace = document.createElement("div");
    answerSpace.className = "answerspace";
    popup.append(answerSpace);


//답변자 신상

   // X 버튼 추가
   const xBtn = document.createElement("button");
   xBtn.textContent = "✖";
   xBtn.className = "x-btn";
   answerSpace.append(xBtn);

   // 누르면 사라짐
   xBtn.onclick = function() {
    check.classList.remove("answer-style");
    dimmed.classList.remove("dimmed");
    xBtn.classList.remove("x-btn");
    xBtn.textContent ='';
   }


    //프로필 이미지 넣기
   const answernewImglink = obj["answer"]["avatarUrl"];
   const answernewImg = document.createElement("img");
   answernewImg.setAttribute("src", answernewImglink);
   answerSpace.append(answernewImg);
   
   // 아이디 넣기
   const answerID= obj["answer"]["author"];
   const answerid= document.createElement("div")
   answerid.className= "id";
   answerid.textContent= answerID;
   answerSpace.append(answerid);

   //시간 넣기
   const answerrealTime = document.createElement("div");
   answerrealTime.className = "real_time";
   const answertime = obj["answer"]["createdAt"];
   const answerdate = answertime.slice(2,10);
   const answerhour = answertime.slice(11,13);
   const answermin = answertime.slice(14,16);
   const answersec = answertime.slice(17,19);

   //12시가 넘어간 경우만 바꾸기
   if (Number(hour) > 12) {
    const newhour = Number(answerhour)-12;
    answerrealTime.textContent = `${answerdate} | 오후 ${newhour}:${answermin}:${answersec}`;
   }
   else {
    answerrealTime.textContent = `${answerdate} | 오전 ${answerhour}:${answermin}:${sec}`;
   }

   answerSpace.append(answerrealTime);
  

   //답변 보러가기 유도문구
   const answerdiscussionContent = document.createElement("div");
   answerdiscussionContent.textContent = '기다리던 답변이 작성되었어요! 아래 버튼을 클릭해 확인해요 : )';
   answerdiscussionContent.className ="haha";
   answerSpace.append(answerdiscussionContent);

   // 바로 보기 버튼에 링크 생성하기
   const viewRightnowContainer = document.createElement("div");
   viewRightnowContainer.className = "viewrightnow-continer"
   const viewRightnow = document.createElement("a");
   viewRightnow.className = "button viewrightnow"
   viewRightnowContainer.append(viewRightnow);
   viewRightnow.textContent = 'view right now';
   viewRightnow.setAttribute("href", obj["answer"]["url"]);
   answerSpace.append(viewRightnowContainer);
  }



   //프로필 이미지 넣기
   const newImglink = obj['avatarUrl'];
   const newImg = document.createElement("img");
   newImg.setAttribute("src", newImglink);
   avatarWrapper.append(newImg);
   
   // 아이디 넣기
   const ID= obj['author'];
   const id= document.createElement("div")
   id.className= "id";
   id.textContent= ID;

   //시간 넣기
   const realTime = document.createElement("div");
   realTime.className = "real_time";
   const time = obj['createdAt'];
   const date = time.slice(2,10);
   const hour = time.slice(11,13);
   const min = time.slice(14,16);
   const sec = time.slice(17,19);

   //12시가 넘어간 경우만 바꾸기
   if (Number(hour) > 12) {
    const newhour = Number(hour)-12;
    realTime.textContent = `${date} | 오후 ${newhour}:${min}:${sec}`;
   }
   else {
    realTime.textContent = `${date} | 오전 ${hour}:${min}:${sec}`;
   }
  
   //질문 내용 넣기, 
   //텍스트 길이가 긴 경우 말줄임표로 치환(45자)하고 더보기 넣기
   let content = obj['title'];
   if (obj['title'].length >= 45) {
    content = obj['title'].slice(0, 44) + ' ...';
   }
   discussionContent.textContent = content;

   // 더보기 버튼에 링크 생성하기
   const viewMoreContainer = document.createElement("div");
   viewMoreContainer.className = "viewmore-continer"
   const viewMore = document.createElement("a");
   viewMoreContainer.append(viewMore);

   viewMore.className = "viewmore";
   viewMore.textContent = 'view more';
   viewMore.setAttribute("href", obj["url"]);

  
  li.append(containerLabel, avatarWrapper, id, realTime, discussionContent, discussionAnswered, viewMoreContainer);
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



//입력하는 대로 하면에 나오도록

const enterQuestion = document.querySelector('form');
const inputID = document.querySelector('.inputid');
const inputTitle = document.querySelector('.title');
const inputQuestion = document.querySelector('.question');

enterQuestion.addEventListener("submit", (evnet) => {
  event.preventDefault(); //새로고침 방지

  const newObj = {};
  const date = new Date();
  const mkclock = date.toLocaleString('ko-kr');
  const clock = `${mkclock.slice(0,4)}-0${mkclock.slice(6,7)}-${mkclock.slice(9,11)}T${mkclock.slice(15)}Z`; 
  console.log(clock)

  newObj['avatarUrl'] = "jjang.jpg";
  newObj['author'] = inputID.value;
  newObj['title'] = inputTitle.value;
  newObj['answer'] = null;
  newObj['createdAt'] = clock;
  //2022-04-22T14:07:35Z
  //2023. 1. 10. 오전 4:02:17

  agoraStatesDiscussions.unshift(newObj);

  console.log(newObj);

  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  render(ul)
  
  inputID.value = '';
  inputTitle.value = '';
  inputQuestion.value = '';
})







