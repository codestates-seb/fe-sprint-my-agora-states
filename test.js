// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
// console.log(agoraStatesDiscussions);
import {agoraStatesDiscussions} from './data.js'
export { convertToDiscussion , render } 
console.log(agoraStatesDiscussions);
const newAgora = [...agoraStatesDiscussions]
console.log(newAgora);
console.log(newAgora[0]);
console.log(agoraStatesDiscussions.length);
// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const {id,createdAt,title,url,author,answer,bodyHTML,avatarUrl} = obj


  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
 //사진
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const img = document.createElement("img")
  img.setAttribute("class","discussion__avatar--image");
  img.setAttribute("src",avatarUrl);
  avatarWrapper.append(img);
  
  //제목
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const h2 = document.createElement("h2")
  h2.setAttribute("class","discussion__title")
  const title1 = document.createElement("a")
  title1.setAttribute("href",url)
  title1.innerText = title
  h2.append(title1)
  discussionContent.append(h2)

  //id , 올린날짜
  const idDiv = document.createElement("div");
  idDiv.setAttribute("class","discussion__information");
  idDiv.innerText = `${author} / ${createdAt}`
  discussionContent.append(idDiv);

  //
  const discussionAnswered = document.createElement("div");
  const answerBox = document.createElement("p")
  discussionAnswered.className = "discussion__answered";
 if(answer === null){
  answerBox.innerHTML = `<i class="fa-sharp fa-solid fa-check"></i>`
 }else{
  answerBox.innerHTML = `<i class="fa-sharp fa-solid fa-xmark"></i>`
 };
 discussionAnswered.append(answerBox)

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
//사진

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

const nameInput = document.querySelector(".input__name");
const questionTitle = document.querySelector(".input__title");
const question = document.querySelector("#story");
const li = document.createElement("li");


// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

const Page = document.querySelector(".discussions__container")
// if(wholePage.children.length > 10){
//   //1부터 10까지 
//   ul.append()
// };
//태그 총 수 
const wholeItems = page.children.length;
//게시판에 그릴 아이템 10개 
const visibleItems = 10
//총 페이지 개수
const wholePages = wholeItems / visibleItems
function Display(items,wrapper,rows_per_pages,page){
  render()
}