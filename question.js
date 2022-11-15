import { convertToDiscussion , render } from "./script.js"
import {agoraStatesDiscussions} from './data.js'

const submitBtn = document.querySelector(".submitBtn");
const ul = document.querySelector("ul.discussions__container");
submitBtn.addEventListener("click", startWork)
//그리기
let localStorageArray = [];
const my__questions = "myQandA"
const savedData = JSON.parse(localStorage.getItem(my__questions));
if(savedData !== null){
    const parsedSavedData = JSON.parse(localStorage.getItem(my__questions));
    parsedSavedData.forEach((savedData)=>{
    ul.prepend(convertToDiscussion(savedData))
});
localStorageArray = parsedSavedData;
}   
    
function setLocalStorage(){
    localStorage.setItem(my__questions,JSON.stringify(localStorageArray))
}
function startWork(e){
    // e.preventDefault()
    const nameInput = document.querySelector(".input__name");
    const questionTitle = document.querySelector(".input__title");
    const question = document.querySelector("#story");
    
   const date = new Date().toISOString() //string메소드로 깔끔하게 정리하기,
    if(nameInput.value === "" || question.value === "" || questionTitle.value === ""){
        return ;
    }
    const obj = {
        id: "sjij067dd",
        createdAt: date, 
        title: questionTitle.value,
        url: "https://github.com/codestates-seb/agora-states-fe/discussions/3",
        author: nameInput.value,
        answer : null,
        bodyHTML:'<h1 dir="auto">Question Template</h1>\n<h3 dir="auto">제목은 질문의 맥락을 파악할 수 있게 작성해주세요. 아래의 예시를 참고해주세요.</h3>\n<blockquote>\n<p dir="auto">토이 18번 문제가 이해가 잘 안됩니다. (X)<br>\n토이 18_getItemFromTwoSortedArrays 레퍼런스에서 O(logK)로직의 조건문들이 이해가 잘 되지 않습니다.(O)</p>\n</blockquote>\n<p dir="auto">--------------- 여기서부터 복사하세요 ---------------</p>\n<ul dir="auto">\n<li>\n<p dir="auto">운영 체제: 예) macOS, Ubuntu</p>\n</li>\n<li>\n<p dir="auto">Node.js 버전(<code class="notranslate">node -v</code>): 예)v14.16.0</p>\n</li>\n<li>\n<p dir="auto">현재 어떤 챕터/연습문제/과제를 진행 중이고, 어떤 문제에 부딪혔나요?</p>\n</li>\n<li>\n<p dir="auto">어떠한 부분에서 이해가 안 되었나요?</p>\n</li>\n<li>\n<p dir="auto">에러 코드를 붙여넣기 해 주세요.</p>\n</li>\n<li>\n<p dir="auto">에러가 출력된 곳에서, 이유라고 생각하는 부분을 열 줄 이내로 붙여넣기 해 주세요. (잘 모르겠으면 에러라고 생각하는 곳을 넣어주세요)<br>\n```jsx<br>\n//여기에 작성해 주세요<br>\n```</p>\n</li>\n<li>\n<p dir="auto">검색했던 링크가 있다면 첨부해 주세요.</p>\n</li>\n</ul>\n<hr>\n<h2 dir="auto">saved reply 사용법</h2>\n<blockquote>\n<p dir="auto">잠깐! saved reply란?<br>\n원하는 문구를 저장해서 간단하게 꺼내 쓸 수 있는 github discussions만의 기능입니다.<br>\n매번 질문 템플릿을 복사하지 말고, 저장한 뒤에 꺼내서 쓰세요!</p>\n</blockquote>\n<ol dir="auto">\n<li>Discussions에서 newdiscussion 버튼을 클릭합니다.</li>\n</ol>\n<p><a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/59815596/113290773-0fa1b780-932d-11eb-81fe-f031408bfc9f.png"><img width="1071" alt="스크린샷 2021-04-01 오후 8 57 36" src="https://user-images.githubusercontent.com/59815596/113290773-0fa1b780-932d-11eb-81fe-f031408bfc9f.png" style="max-width: 100%;"></a></p>\n<ol start="2" dir="auto">\n<li>에디터의 맨 오른쪽 "꺾인 화살표" 모양을 클릭합니다.</li>\n</ol>\n<p><a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/59815596/113253588-6349dc00-9300-11eb-9065-d483b86cd773.png"><img width="735" alt="1" src="https://user-images.githubusercontent.com/59815596/113253588-6349dc00-9300-11eb-9065-d483b86cd773.png" style="max-width: 100%;"></a></p>\n<ol start="3" dir="auto">\n<li>이러한 창이 나오게 됩니다.</li>\n</ol>\n<p><a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/59815596/113253613-6ba21700-9300-11eb-8e93-59cf45121822.png"><img width="1021" alt="2" src="https://user-images.githubusercontent.com/59815596/113253613-6ba21700-9300-11eb-8e93-59cf45121822.png" style="max-width: 100%;"></a></p>\n<ol start="4" dir="auto">\n<li>제목(본인이 구분하기에 편한 이름)을 작성하고, 위에 있는 템플릿을 복사하여 내용에 붙여넣은 뒤, Add saved reply 버튼을 클릭하면 템플릿이 저장됩니다.</li>\n</ol>\n<p><a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/59815596/113253654-7eb4e700-9300-11eb-90ff-8d1bc1a1f5cf.png"><img width="775" alt="3" src="https://user-images.githubusercontent.com/59815596/113253654-7eb4e700-9300-11eb-90ff-8d1bc1a1f5cf.png" style="max-width: 100%;"></a></p>\n<ol start="5" dir="auto">\n<li>사용하실 때, 에디터의 맨 오른쪽 "꺾인 화살표" 모양을 클릭하면 저장해 두었던 템플릿이 나옵니다. 클릭해서 사용하시면 됩니다.</li>\n</ol>\n<p><a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/59815596/113253666-85435e80-9300-11eb-9224-736a8625c84c.png"><img width="718" alt="4" src="https://user-images.githubusercontent.com/59815596/113253666-85435e80-9300-11eb-9224-736a8625c84c.png" style="max-width: 100%;"></a></p>\n<ol start="6" dir="auto">\n<li>완성</li>\n</ol>\n<p><a target="_blank" rel="noopener noreferrer" href="https://user-images.githubusercontent.com/59815596/113253681-8c6a6c80-9300-11eb-9409-b299de50aea3.png"><img width="720" alt="5" src="https://user-images.githubusercontent.com/59815596/113253681-8c6a6c80-9300-11eb-9409-b299de50aea3.png" style="max-width: 100%;"></a></p>',
        avatarUrl:"https://avatars.githubusercontent.com/u/96907839?s=64&v=4",
      }
    localStorageArray.push(obj)
    const putQuestion = convertToDiscussion(obj) 
    ul.prepend(putQuestion);
    putQuestion.scrollIntoView({behavior:'smooth',block:'center'})
    setLocalStorage()
}

const page = document.querySelector(".discussions__container")
// if(wholePage.children.length > 10){
//   //1부터 10까지 
//   ul.append()
// };
//태그 총 수 
const wholeItems = page.children;
let newArr = [...wholeItems];
console.log(newArr[0]);
const wholeItemscount =page.children.length
console.log(page.children);

//게시판에 그릴 아이템 10개 
const visibleItems = 10
let currentPage = 1
//총 페이지 개수
const wholePages = Math.ceil(wholeItems.length / visibleItems);
console.log(wholePages);

function Display(items,perpages,page){

  let start = perpages * (currentPage - 1); // 시작 줄은  현재 페이지 *보여줄아이템하면됨 어차피 20번대줄이면 20번부터 시작할거기 때문 
  let row_end = perpages*page;
  console.log(start,row_end);
   let paginatedItems = items.slice(start,row_end) //한페이지에 나올 줄 만큼만 slice
   console.log(paginatedItems);
  for(let i = 0;i < start + row_end ; i++){
    console.log(paginatedItems[i]);
  }
}
Display(newArr,visibleItems,wholePages)