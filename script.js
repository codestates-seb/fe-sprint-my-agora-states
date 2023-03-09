// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  //agoraStatesDiscussions[i]
  // li 요소를 생성합니다.

  const li = document.createElement("li");
  li.classList.add("discussion__container", "swiper-slide");

  // div 요소를 생성합니다.
  const div = document.createElement("div");
  div.classList.add("discussion__content");

  // discussion__main 클래스를 가진 div 요소를 생성합니다.
  const discussionMain = document.createElement("div");
  discussionMain.classList.add("discussion__main");

  // h2 요소를 생성합니다.
  const h2 = document.createElement("h2");
  h2.classList.add("discussion__title");

  // a 요소를 생성합니다.
  const a = document.createElement("a");
  a.href = "https://github.com/codestates-seb/agora-states-fe/discussions/6";
  a.textContent = obj.title;

  // a 요소를 h2 요소에 추가합니다.
  h2.appendChild(a);

  // discussion__name 클래스를 가진 div 요소를 생성합니다.
  const discussionName = document.createElement("div");
  discussionName.classList.add("discussion__name");
  discussionName.textContent = obj.author;

  // discussionMain에 h2와 discussionName을 추가합니다.
  discussionMain.appendChild(h2);
  discussionMain.appendChild(discussionName);

  // discussion__information 클래스를 가진 div 요소를 생성합니다.
  const discussionInformation = document.createElement("div");
  discussionInformation.classList.add("discussion__information");
  discussionInformation.textContent = obj.info;

  // discussion__content에 discussionMain과 discussionInformation을 추가합니다.
  div.appendChild(discussionMain);
  div.appendChild(discussionInformation);

  // li 요소에 div 요소를 추가합니다.
  li.appendChild(div);

  return li;
};
const convertToDiscussion2 = (obj) => {
  //agoraStatesDiscussions[i]
  // li 요소를 생성합니다.

  const li = document.createElement("li");
  li.classList.add("discussion__container", "swiper-slide");

  // div 요소를 생성합니다.
  const div = document.createElement("div");
  div.classList.add("discussion__content");

  // discussion__main 클래스를 가진 div 요소를 생성합니다.
  const discussionMain = document.createElement("div");
  discussionMain.classList.add("discussion__main");

  // h2 요소를 생성합니다.
  const h2 = document.createElement("h2");
  h2.classList.add("discussion__title");

  // a 요소를 생성합니다.
  const a = document.createElement("a");
  a.href = "https://github.com/codestates-seb/agora-states-fe/discussions/6";
  a.textContent = obj.title;

  // a 요소를 h2 요소에 추가합니다.
  h2.appendChild(a);

  // discussion__name 클래스를 가진 div 요소를 생성합니다.
  const discussionName = document.createElement("div");
  discussionName.classList.add("discussion__name");
  discussionName.textContent = obj.author;

  // discussionMain에 h2와 discussionName을 추가합니다.
  discussionMain.appendChild(h2);
  discussionMain.appendChild(discussionName);

  // discussion__information 클래스를 가진 div 요소를 생성합니다.
  const discussionInformation = document.createElement("div");
  discussionInformation.classList.add("discussion__information");
  discussionInformation.textContent = obj.info;

  // discussion__content에 discussionMain과 discussionInformation을 추가합니다.
  div.appendChild(discussionMain);
  div.appendChild(discussionInformation);

  // li 요소에 div 요소를 추가합니다.
  li.appendChild(div);

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

//입력 폼 데이터 받기
const $form = document.querySelector(".form");
$form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formdata = new FormData($form); // 폼 데이터 가져오기

  const name = formdata.get("name"); //get 메서드로 value 값 가져오기
  const title = formdata.get("title");
  const info = formdata.get("story");

  const newdata = {
    author: name,
    title: title,
    info: info,
  };
  agoraStatesDiscussions.unshift(newdata);
  ul.prepend(convertToDiscussion2(agoraStatesDiscussions[0]));
  
  window.localStorage.setItem('newdata', newdata);
  console.log(localStorage.getItem('newdata'))

});




/*
 agoraStatesDiscussions.unshift(newdata);
 ul.prepend(convertToDiscussion(agoraStatesDiscussions[0]));


while (ul.firstChild) {
  ul.removeChild(ul.firstChild);
}
render(ul);

*/
