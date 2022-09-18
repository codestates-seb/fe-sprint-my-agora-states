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

// 🌈 페이지네이션 위한 변수
const pagenationContainer = document.querySelector('.pagination__container')

let currentPage = 1; // 현재 페이지
let totalCount = data.length; // 총 데이터(디스커션)의 갯수
const pageCount = 3; // 화면 하단에 나타날 페이지 버튼의 갯수
const limit = 5; // 한 페이지 당 나타낼 테이터(디스커션)의 갯수

// 총 페이지의 수 (마지막 페이지는 limit 개수보다 데이터의 수가 작아도 보여줘야 하므로 올림(ceil)을 한다. ))
let totalPage = Math.ceil(totalCount / limit) 

// 현재 페이지의 그룹 계산하기
let pageGroup = Math.ceil(currentPage / pageCount)

// 현재 페이지 그룹의 첫번째, 마지막 페이지 버튼 숫자 구하기
let lastNumber = pageGroup * pageCount 
// 만약 마지막 숫자가 총 페이지 수보다 크게 나오면 마지막 숫자를 총 페이지 수로 조정
if (lastNumber > totalCount) {  
  lastNumber = totalPage 
}
let firstNumber = lastNumber - (pageCount - 1) 




// 🌈 페이지네이션 요소(화면 하단의 페이지, <, > 버튼) 그려주기
const previousBtn = document.createElement("button")
previousBtn.classList.add('buttons')
previousBtn.setAttribute('id', `page_${firstNumber - 1}`)
previousBtn.textContent = `<`
pagenationContainer.append(previousBtn)

for (let i = firstNumber; i<= lastNumber; i++) {
  const pageBtn = document.createElement("button")
  pageBtn.classList.add('buttons')
  pageBtn.setAttribute('id', `page_${i}`)
  pageBtn.textContent = `${i}`; 
  pagenationContainer.append(pageBtn)
}

const nextBtn = document.createElement("button")
nextBtn.classList.add('buttons')
nextBtn.setAttribute('id', `page_${lastNumber + 1}`)
nextBtn.textContent = `>`
pagenationContainer.append(nextBtn)



 // 🌈 페이지네이션 버튼에 click 이벤트 설정, 이벤트 핸들러 함수 작성 (ING...) 
document.querySelectorAll('.buttons')[0].addEventListener('click', () => {
  console.log('이전 버튼')
})

document.querySelectorAll('.buttons')[pageCount+1].addEventListener('click', () => {
  console.log('다음 버튼')
})

for (let i = firstNumber; i<= lastNumber; i++) {
    document.querySelectorAll('.buttons')[i].addEventListener('click', () => {
    console.log(`${i}페이지`)
    render(ul, (i-1)*limit+1,i*limit+1) // (ING...) i=1일 경우 등...if문으로 나눠줄 것.
    })
}


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
// 🌈 페이지네이션 : 데이터(data)의 몇 번째 인덱스 요소부터(from) 몇 번쨰  인덱스 요소까지(to) 렌더링할 건지 인자로 받도록 함수 수정 
const render = (element, from, to) => {
  // 일단 ul 안의 내용 다 지우기
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  // 다시 하나씩 ul에 요소로 붙이기
  for (let i = from; i < to; i += 1) { 
    element.append(convertToDiscussion(data[i]));
  }
  return 
};

// 최초 렌더링 실행 (최초라서 인덱스 0부터 limit까지 )
render(ul, 0, limit); 

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

render(ul, 0, limit); // 새 데이터로 렌더링 // 🌈 새 디스커션 submit하면 무조건 첫 페이지로 돌아가니까 0부터 limit 까지

// input 창의 value들 초기화 (빈칸으로))
userId.value = ""
title.value = ""
question.value = ""
}

formSubmit.addEventListener( 'submit', submitQuestion )