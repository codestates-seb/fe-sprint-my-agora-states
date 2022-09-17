// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

let data; 

// 로컬 스토리지에 데이터 있으면 => 업데이트 / 없으면 => agoraStatesDiscussions 복사(최초 1번, 처음 1번만 쓸 것이기 때문에 그냥 얕은 복사로. 주소값 같아도 상관없어서?)
const localStorageData = localStorage.getItem("discussionData");
if(localStorageData) {
  data = JSON.parse(localStorageData) // 문자열을 자바스크립트 객체로 변환
} else {
  data = agoraStatesDiscussions.slice(); 
}

const formSubmit = document.querySelector(".form")
const ul = document.querySelector("ul.discussions__container");

const userId = document.querySelector("#name")
const title = document.querySelector("#title")
const question = document.querySelector("#story")

// 현재 날짜, 시간 구하기
let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);
let hours = ('0' + today.getHours()).slice(-2); 
let minutes = ('0' + today.getMinutes()).slice(-2);
let seconds = ('0' + today.getSeconds()).slice(-2); 

let currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`


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
// 프로필
const avatarImage = document.createElement("img") //  img 태그 요소 만들고
avatarImage.className = "discussion__avatar--image"; // 클래스네임 지정
avatarImage.setAttribute("src", obj.avatarUrl) // src 속성
avatarImage.setAttribute("alt", `avatar of ${obj.author}`) // alt 속성
avatarWrapper.append(avatarImage) // avatarWrapper 요소에 append

// 질문 
const discussionTitle = document.createElement("h2")
discussionTitle.className = "discussion__title"
const discussionUrl = document.createElement("a")
discussionUrl.setAttribute("href", obj.url)
discussionUrl.textContent = obj.title;
discussionTitle.append(discussionUrl)
discussionContent.append(discussionTitle)

// 작성자 및 날짜
const discussionInformationContainer =  document.createElement("div")
discussionInformationContainer.className = "discussion__information__container"
const discussionInformation =  document.createElement("div")
discussionInformation.className = "discussion__information"
discussionInformation.textContent = `${obj.author} / ${obj.createdAt}`;
discussionInformationContainer.append(discussionInformation)
discussionContent.append(discussionInformationContainer)

// 체크 박스
const discussionAnsweredP =  document.createElement("p")
discussionAnswered.textContent = obj.answer ? `✅` :`❌`;
discussionAnswered.append(discussionAnsweredP)

li.append(avatarWrapper, discussionContent, discussionAnswered);
return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  // 일단 ul 안의 내용 다 지우기
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  // 다시 하나씩 ul에 요소로 붙이기
  for (let i = 0; i < data.length; i += 1) {
    element.append(convertToDiscussion(data[i]));
  }
  return 
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
render(ul);

// 이벤트 핸들러 : input의 밸류들을 모아 데이터에 추가
const submitQuestion = (e) => {
  e.preventDefault(); 

  let newObj= {
  id: "",
  createdAt: currentTime,
  title: title.value,
  url: "https://github.com/codestates-seb/agora-states-fe/discussions/3",
  author : userId.value,
  answer: null,
  bodyHTML: "",
  avatarUrl: "https://avatars.githubusercontent.com/u/87750478?s=64&v=4"
};

// ul.prepend(convertToDiscussion(newObj)) // 새 디스커션 요소 추가  (로컬 스토리지 없이 할 떄)
data.unshift(newObj) // 데이터 추가 (업데이트))

localStorage.setItem("discussionData", JSON.stringify(data)); // 추가된 원본 데이터 받아서 로컬 스토리지에 다시 저장

render(ul);

userId.value = ""
title.value = ""
question.value = ""
}

formSubmit.addEventListener( 'submit', submitQuestion )