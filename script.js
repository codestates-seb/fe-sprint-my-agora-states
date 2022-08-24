// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const submitButton= document.querySelector(".submit--button");
const form= document.querySelector(".form");
let guestCount=0;
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
// 프로필 이미지 불러오기
const avatarImg = document.createElement('img');
avatarImg.className ="discussion__avatar--image";
avatarImg.src = obj.avatarUrl;
avatarImg.alt = 'avatar of ' + obj.author;
avatarWrapper.append(avatarImg);


// 질문글 불러오기 - 글 제목
const discussionTitle = document.createElement('h2');
discussionTitle.classList ="discussion__title";
const titleUrl = document.createElement('a');
discussionTitle.append(titleUrl);
titleUrl.href=obj.url;
titleUrl.textContent=obj.title;
discussionContent.append(discussionTitle);


// 질문글 불러오기 - 작성자, 날짜
const discussionInformation = document.createElement('div');
discussionInformation.classList="discussion__information";
discussionContent.append(discussionInformation);
discussionInformation.textContent=`${obj.author} / ${new Date(obj.createdAt).toLocaleString()}`

// 답변 완료 여부 불러오기
const answerCheck = document.createElement('p');
discussionAnswered.append(answerCheck);
if(obj.answer){
  answerCheck.textContent='☑';
}
else{
  answerCheck.textContent='☒'
}

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

//제출했을 때 새 글 업로드
form.onsubmit=function(event){
 
  event.preventDefault();

  const username=document.querySelector("#name").value;
  const titlename=document.querySelector("#title").value;
  const questionContent=document.querySelector("#story").value;
  
  const newObj={
    id: "guset id",
    createdAt: new Date(),
    title: titlename,
    author: username,
    answer: null,
    bodyHTML:questionContent,
    avatarUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-zv1CdQ9aJSkWG_gAfiDJsM3hDkbK4KN9Lg&usqp=CAU",
  }
agoraStatesDiscussions.unshift(newObj);
ul.insertBefore(convertToDiscussion(agoraStatesDiscussions[0]), ul.firstChild); 
const objString = JSON.stringify(newObj); //로컬스토리지에 저장할 땐 객체 문자열로 변환
window.localStorage.setItem('guest'+guestCount, objString); //로컬스토리지에 저장
const savedNewObj=JSON.parse(window.localStorage.getItem('guest'+guestCount));

agoraStatesDiscussions.unshift(savedNewObj);
guestCount++; //게스트에 숫자 붙여주기
form.reset();
}

render(ul);

