console.log(agoraStatesDiscussions);

// 로컬 스토리지
let data; 
const localStorageData = localStorage.getItem("discussionData");
if(localStorageData) {
  data = JSON.parse(localStorageData) // 문자열을 자바스크립트 객체로 변환
} else {
  data = agoraStatesDiscussions.slice(); 
}

// 요소 지정
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


// 하나의 디스커션 데이터(객체)를 DOM(하나의 li)으로 변환
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

// 프로필
const avatarImage = document.createElement("img") //  img 태그 요소 만들고
avatarImage.className = "discussion__avatar--image"; // 클래스네임 지정
avatarImage.setAttribute("src", obj.avatarUrl) // src 속성
avatarImage.setAttribute("alt", `avatar of ${obj.author}`) // alt 속성
avatarWrapper.append(avatarImage) // avatarWrapper 요소에 append

// 디스커션 
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

// 1. 인자 안의 요소를 모두 지우고 -> 2. DOM으로 변환한 배열 형태의 데이터(data)를 인자에 하나씩 요소로 붙여서 렌더링하는 함수 
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

// 렌더링 실행
render(ul);

// 이벤트 핸들러 : 새 디스커션 객체(newObj)를 만들고 -> 데이터(data)에 추가 ->  로컬스토리지에 저장 -> 새 데이터로 렌더링
const submitQuestion = (e) => {
  e.preventDefault(); // submit과 동시에 다시 render가 되는 것을 막아준다. 
  
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


data.unshift(newObj) // 데이터 추가 (업데이트))

localStorage.setItem("discussionData", JSON.stringify(data)); // 추가된 원본 데이터 받아서 로컬 스토리지에 다시 저장

render(ul); // 새 데이터로 렌더링

// input 창의 value들 초기화 (빈칸으로))
userId.value = ""
title.value = ""
question.value = ""
}

formSubmit.addEventListener( 'submit', submitQuestion )