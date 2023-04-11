// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);

window.onload = function() {
  // const urlParams = new URL(location.href).searchParams;
  // const name = urlParams.get('name');
  // const title = urlParams.get('title');
  // const story = urlParams.get('story');
  addLocalstorage();
}


// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  // 질문
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  // 답변
  const Answer = document.createElement("div");
  Answer.className = "answer";

  // 질문 이미지
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.classList.add('discussion__avatar--image');
  avatarWrapper.append(avatarImg);

  // 질문 제목과 작성자/날짜
  const discussion__title = '<h2 class="discussion__title"><a href="'+obj.url+'">'+obj.title+'</a></h2>';
  const discussion__information = '<div class="discussion__information">'+obj.author+' / '+obj.createdAt+'</div>';
  discussionContent.innerHTML+=discussion__title+discussion__information;

  // 답변 유무를 확인하여 존재하는 답변 출력
  if(obj.answer === null) {
    discussionAnswered.innerHTML+="<img src='https://cdn-icons-png.flaticon.com/512/3247/3247297.png' width='17px'>";
  } else {
    discussionAnswered.innerHTML+="<img src='https://cdn-icons-png.flaticon.com/512/6325/6325553.png' width='20px'>";
    Answer.classList.add('exit');
    // Answer.innerHTML += obj.answer.bodyHTML;
    Answer.append(addAnswer(obj.answer));
  }

  li.append(avatarWrapper, discussionContent, discussionAnswered, Answer);
  return li;
};

//  답변이 있을 경우 답변을 출력해주는 함수
const addAnswer = (obj) => {
  const fragElement = document.createDocumentFragment("div");

  const isAnswer = document.createElement("div");
  isAnswer.className = "answer__isAnswer--wrapper";
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "answer__avatar--wrapper";

  const answerLink = document.createElement("a");
  answerLink.className = 'answer__link';
  const discussionContent = document.createElement("div");
  discussionContent.className = "answer__content";
  // 답변 기호
  isAnswer.innerHTML = "<img src='https://as2.ftcdn.net/v2/jpg/05/28/00/07/1000_F_528000768_Ro4XI3y2bwJD9Jr2W3Ic5oQ6IvubKhRu.webp' width='12px'>";

  // 답변 이미지
  const avatarImg = document.createElement('img');
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarImg.classList.add('answer__avatar--image');
  avatarWrapper.append(avatarImg);

  // 답변 작성자 / 날짜와 답변 내용
  answerLink.href = obj.url;
  answerLink.append(discussionContent);
  const answer__information = '<div class="answer__information">'+obj.author+' / '+obj.createdAt+'</div>';
  const answer_content = obj.bodyHTML;
  discussionContent.innerHTML+=(answer_content+answer__information);
  

  fragElement.append(isAnswer,avatarWrapper, answerLink)
  return fragElement
}

// submit 실행 시 Local storage에 값 추가하는 함수
const inputBtn = document.querySelector('.form__submit');
inputBtn.onclick = function() {
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const story = document.getElementById('story').value;
  
  // 현재 시간 구하기
  const today = new Date();
  const year = today.getFullYear(); // 년도
  const month = today.getMonth() > 9 ? today.getMonth()+1:'0'+(today.getMonth()+1);  // 월
  const date = today.getDate() > 9 ? today.getDate():'0'+today.getDate();  // 날짜
  const hours = today.getHours() > 9 ? today.getHours():'0'+today.getHours();; // 시
  const minutes = today.getMinutes() > 9 ? today.getMinutes():'0'+today.getMinutes();;  // 분
  const seconds = today.getSeconds() > 9 ? today.getSeconds():'0'+today.getSeconds();; // 초

  const createdAt = `${year}-${month}-${date}T${hours}:${minutes}:${seconds}Z`;

  if(name === '' || title === '' || story === '') {
    return;
  }
  // 저장할 객체 생성
  const obj = {
    avatarUrl : "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
    url : 'https://naver.com',
    author : name,
    title : title,
    story : story,
    createdAt : createdAt,
    answer : null
  }

  // Local storage 이용해서 값 추가하기
  const getDiscussString = window.localStorage.getItem('discuss');

  if(getDiscussString === null) {
    window.localStorage.setItem('discuss', JSON.stringify([obj]));
  } else {
    const getDiscussArr = JSON.parse(getDiscussString);
    getDiscussArr.push(obj);
    window.localStorage.setItem('discuss', JSON.stringify(getDiscussArr));
  }
};

// local storage에 값이 있으면 화면에 출력하는 함수
const addLocalstorage = () => {
  const getDiscussString = window.localStorage.getItem('discuss');

  if(getDiscussString === null) {
    return;
  }

  const getDiscussArr = JSON.parse(getDiscussString);
  const ul = document.querySelector("ul.discussions__container");
  
  // console.log(getDiscussArr);
  for(let i=0;i<getDiscussArr.length;i++) {
    ul.prepend(convertToDiscussion(getDiscussArr[i]));
  }
}


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

// opacity input 을 이용해 투명도 조절
document.querySelector('#opacity').addEventListener('input',e=>{
  const container = document.querySelectorAll('.discussion__container');
  for(let ele of container) {
    ele.style.backgroundColor = `rgba(255,255,255,${e.target.value*0.1})`;
  }
});