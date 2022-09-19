
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.

const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // li요소의 클래스 이름 지정


      // 이미지  div 
  const avatarWrapper = document.createElement("div"); // 생성
  avatarWrapper.className = "discussion__avatar--wrapper"; // 클래스이름지정
      // 내용 div
  const discussionContent = document.createElement("div"); // 생성
  discussionContent.className = "discussion__content"; // 클래스이름지정
      // 체크박스 div
  const discussionAnswered = document.createElement("div"); // 생성
  discussionAnswered.className = "discussion__answered"; // 클래스이름지정

// 아바타 이미지라인
const avatarImg = document.createElement("img");  // 이미지 태그생성
  avatarImg.className = "discussion__avatar--image" // 이미지 클래스이름 지정
  avatarImg.src = obj.avatarUrl // 이미지에 넘어오는 오브젝트의 key값 avataUrl을 담는다.
  avatarImg.alt = 'avatar of' + obj.author; // 이미지에 넘어오는 오브젝트의 key값 author을 담는다.
  avatarWrapper.append(avatarImg); // 이미지 div에 이미지 태그를 자식요소로 추가

// 제목  
  const titleH2 = document.createElement("h2"); // h2 태그생성
  const titleA = document.createElement("a"); // a태그 생성
  titleH2.className = "discussion__title" // h2태그에 클래스이름 지정
  titleA.textContent = obj.title; // a태그에 오브젝트의 title 값할당
  titleA.href = obj.url; // a태그에 href에 url링크삽입
  titleH2.append(titleA); // h2태그에 a태그를 자식으로 추가
  
  // 내용라인
  const titlediv = document.createElement("div"); // 제목 div생성
  titlediv.className = "discussion__information"; // 제목div에 클래스 이름지정
  titlediv.textContent = `${obj.author}   /  ${new Date(obj.createdAt).toLocaleString()}` // 제목 div의 내용으로 오브젝트의 key author + creadAt 값할당
  discussionContent.append(titleH2,titlediv); // a태그를 자식으로 가진 h2와 div태그를 제목 div태그에 추가
  
// 체크박스라인
  const P = document.createElement("p"); // p태그 생성
  P.textContent = "☑"; // p태그 내용에 문자 할당
  discussionAnswered.append(P); // 체크 박스라인에 p태그추가

  li.append(avatarWrapper, discussionContent, discussionAnswered); // 위에서 할당한 div의(상위div) 값을 차례로 li에 할당
  return li; // div를 가진 li를 리턴

};



// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => { 
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) { // agoraStatesDiscussions의 개수만큼 반복
    let conv = convertToDiscussion(agoraStatesDiscussions[i]); // agoraStatesDiscussions의 0번째 부터
    element.append(conv); // ul에 추가
  }
  return;
};

// 잊지말자 
// append 는 배열에 추가 하는메서드!!
// prepend() html 추가하는 메서드 ??
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container"); // 모든 li를 감싸고 있는 ul에접근
render(ul); // 랜더함수에 ul을 인자로 전달


const form = document.querySelector(".form"); // form태그에 접근
let title = document.querySelector("#title"); // form태그의 자식중 id가 title인 자식에게 접근
let name = document.querySelector("#name"); // form태그의 자식중 id가 name인 자식에게접근
let story = document.querySelector("textarea[name=story]"); // form태그의 자식중 태그[이름=story]에게 접근


// HTMLFormElement: submit : 
// form 요소의 자체어서 발생했을 경우 실행이 되는 이벤트 submit
// submit 이벤트는 사용자가 버튼, 양식에서 편집하는 동안 발생함
// 해당 메서드는 직접호출하면 이벤트가 폼으로 전송되지않는다.
//https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
form.addEventListener('submit', (e) => { 
  e.preventDefault(); // 클릭시 기본이동을 막는 메서드
  
  let test = { // convertToDiscussion 함수에서 기본적으로 들어가는 값의 양식!
    id: "D_kwDOHOApLM4APjJi",
    createdAt: new Date(),
    title: title.value, // #title의 입력된 값을 돌려줌
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: name.value, // #name의 입력된 값을 돌려줌
    avatarUrl:
    "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }
  
  agoraStatesDiscussions.unshift(test) // unshift로 길이 추가 !!
  console.log(agoraStatesDiscussions)
  ul.prepend(convertToDiscussion(test)); // ul에 추가 하기전 test객체를 인자로 전달하여 convertToDiscussion 접근하여 형태를 갖춰 ul에 추가
  title.value = "";
  name.value = "";
  story.value = "";
  
})

let btns = document.querySelectorAll(".btns");
console.log(btns.target);


// btns.addEventListener("click",(()=>{
//   console.log
// })



 