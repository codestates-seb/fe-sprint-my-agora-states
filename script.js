const agoraStatesDiscussions = JSON.parse(localStorage.getItem('arr')); // 로컬스토리지에 저장

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
// convertToDiscussion = (obj) => li
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
  
  // 아바타 사진
  const avatarImg = document.createElement("img");
  avatarImg.src = obj.avatarUrl ? obj.avatarUrl : 'default img'; // data.js 에 있는 avatarUrl의 Object 주소값
  avatarImg.alt = 'avatar of ' + obj.author; // 이미지를 대체할 텍스트를 명시 , 이미지가 없을 시 'avatar of xxx' 출력
  avatarWrapper.append(avatarImg);

  // 제목
  const questionTitle = document.createElement("h2"); // index.html 에 제목에 h3 값을 주었으니 여기서도 h2 값을 줬습니다.
  const titlelink = document.createElement("a"); // 링크를 안넣어주니 클릭 효과가 사라져 넣어주었습니다.
  titlelink.href = obj.url;
  titlelink.textContent = obj.title; // data.js에 있는 title 를 출력 해줍니다.
  questionTitle.append(titlelink);
  discussionContent.append(questionTitle);

  // 닉네임 , 날짜
  const avatarinfo = document.createElement("div");
  avatarinfo.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`
  discussionContent.append(avatarinfo);

  //체크 박스
  const checkBox = document.createElement("p");
  checkBox.textContent = obj.answer ? "☑" : "☒"; // true 면 체크박스 , false 면 x박스 만약 data.js answer 에 null 값이 있으면 false 이므로 x박스 , 박스 모양은 유니코드 사용 했습니다.
  if (checkBox.textContent === "☑") {
    checkBox.style.color = "green"
  } else {
    checkBox.style.color ="red"
  }
  discussionAnswered.append(checkBox);

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// 10개씩 페이지네이션 기능
const ul = document.querySelector("ul.discussions__container");
let startNum = 0;
const cnt = 10;
const num = agoraStatesDiscussions.length / 10 - 1
const onClick = (e) => {
  e.preventDefault();
  startNum = Number(e.target.value) * cnt;
  render(ul)
}
const pageRender = () => {
  let div = ''
  for (let i = 0; i < num + 1; i++) {
    div += `<button id="page_index_${i}" value=${i} onclick="onClick(event)">${i + 1} </button>`;
  }
  document.getElementById('page').innerHTML = div;
}
pageRender()

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  element.innerHTML = '';
  for (let i = startNum; i < startNum + cnt; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]))
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
//const ul = document.querySelector("ul.discussions__container");
render(ul);

// 데이터 추가 및 문서 내용 가져오기
const form = document.querySelector("form.form");
const author = form.querySelector("div.form__input--name > input");
const title = form.querySelector("div.form__input--title > input");
const textbox = form.querySelector("div.form__textbox > textarea");

// submit 이라는 이벤트가 있습니다.
form.addEventListener("submit", (event) => {
  // 브라우저 기본 동작을 막는다. submit을 누를 시 새로고침 되는걸 방지
  event.preventDefault();
  const newData = {
    id: "unique id" + Math.round(Math.random() * 100000),
    createdAt: new Date().toISOString(), //현재 시간
    title: title.value ,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions",
    author: author.value ,
    bodyHTML: textbox.value ,
    avatarUrl: "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4"

    
  }
  agoraStatesDiscussions.unshift(newData);
  localStorage.setItem('arr', JSON.stringify(agoraStatesDiscussions));
  
  const newdiscussion = convertToDiscussion(newData);

  ul.prepend(newdiscussion);

})



  // ul에 있는거 및 첫번째 자식만 지우고 싶을때 

  // while (ul.firstChild) {
  //   ul.removeChild(ul.firstChild);
  // }
  // ul.innerHTML =''
  // render(ul)



// author.onkeyup = (event) => {   //확인
//   console.log(event)
//   console.log(event.target)
//   console.log(event.target.value)
//   console.log(author.value)
// }
