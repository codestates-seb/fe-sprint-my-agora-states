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

  //TITLE DOM 지정
  const title = document.createElement('h2')
  title.className = "discussion__title"

  //TITLE URL a 태그 지정
  const titleUrl = document.createElement('a')
  titleUrl.href = obj.url

  //TITLE 데이터 삽입
  titleUrl.textContent = obj.title

  //TITLE HTML 표현
  title.append(titleUrl)
  discussionContent.append(title)

  //AVATAR DOM 지정
  const avatar = document.createElement('img')
  avatar.className = 'discussion__avatar--image'

  //AVATAR 데이터 삽입
  avatar.src = obj.avatarUrl
  avatar.alt = "avatar of " + obj.author

  //AVATAR HTML 표현
  avatarWrapper.append(avatar)

  //DISCUSSION INFO (author, createdAT) 태그 지정
  const discussInfo = document.createElement('div')
  discussInfo.className = 'discussion__information'

  //DISCUSSION 데이터 삽입 타임스탬프 가공 (seconds가 안보이게)
  textYear = new Date(obj.createdAt).getFullYear()
  textMonth = new Date(obj.createdAt).getMonth() + 1
  textDate = new Date(obj.createdAt).getDate()
  textDay = new Date(obj.createdAt).getDay()
  textHour = new Date(obj.createdAt).getHours()
  textMin = new Date(obj.createdAt).getMinutes()
  const timeStamp = `${textYear}년 ${textMonth}월 ${textDate}일 ${String(textHour).padStart(2,'0')}시${String(textMin).padStart(2,'0')}분`
  discussInfo.textContent = `${obj.author} / ${timeStamp}`
  
  //DISCUSSION 표현
  discussionContent.append(discussInfo)
  
  //ANSWERED 이미 존재 함. 따라서 obj.answer 에 데이터가 있을 경우 ☑ 를 <p> 태그안에 넣어서 discussionAns에 삽입 ㄱ
  const discussAns = document.createElement('p')
  
  if(obj.answer === null) {
    answered = discussAns.textContent = "❎"
    discussionAnswered.append(answered)
  } else {
    answered = discussAns.textContent = '✅'
    discussionAnswered.append(answered)
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
render(ul);


//submit 기능구현
const form = document.querySelector('.form__submit')
const title = document.querySelector('.form__input--title > input')
const submitName = document.querySelector('.form__input--name > input')
const submitText = document.getElementById('story')

form.addEventListener("click", (event) => {
  event.preventDefault()
  const obj = {
    id: "unique id",
    createdAt: new Date(),
    title: title.value,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/44",
    author: submitName.value,
    answer: null,
    bodyHTML: submitText.value,
    avatarUrl:
    "https://avatars.githubusercontent.com/u/90553688?s=64&u=3c4e4dc2053d4977ac12b9cfc2667582f986d3d8&v=4",
  }
  saveAgora(obj) // 새로운 data local storage에 저장하기
  agoraStatesDiscussions.unshift(obj); // data 추가하기
  const newdiscussion = convertToDiscussion(obj) //data dom갱신하기
  ul.prepend(newdiscussion) // ul 화면에 추가하기
}
)

//Local Storage 에 저장
function saveAgora(obj) {
  localStorage.setItem("obj" , JSON.stringify(obj))
}

const savedAgora = localStorage.getItem("obj") // 로컬스토레지 긁어오기
agoraStatesDiscussions.unshift(savedAgora) // 로컬스토리지 데이터 기존 데이터에 추가하기
const parsedDiscuss = JSON.parse(savedAgora) // 써먹을려고 다시 오브젝트화 시킴
const savedDiscussion = convertToDiscussion(parsedDiscuss) 

ul.prepend(savedDiscussion)

//하지만 이전 데이터가 자꾸 지워짐;;

let newDiscussObj = []; // 이전 로컬스토리지를 저장하는 arr



