document.addEventListener("DOMContentLoaded", function() {
  // JavaScript 코드 실행
  localStorage.setItem("data", JSON.stringify(agoraStatesDiscussions));
});

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  //agoraStatesDiscussions[i]
 // li 요소 생성
const li = document.createElement("li");
li.classList.add("discussion__list");

// a 요소 생성
const aElement = document.createElement("a");
aElement.href = obj.url;
aElement.classList.add("discussion__title");
aElement.textContent = obj.title;

// a 요소를 li 요소의 자식으로 추가
li.appendChild(aElement);

// div 요소 생성
const discussionName = document.createElement("div");
discussionName.classList.add("discussion__name");
discussionName.textContent = obj.author;

// div 요소 추가
li.appendChild(discussionName);

// div 요소 생성
const discussionBtn = document.createElement("div");
discussionBtn.classList.add("discussion__btn");

// div 요소 추가
li.appendChild(discussionBtn);

// 생성된 요소를 적절한 위치에 추가
const parentElement = document.querySelector(".discussions__container");
parentElement.appendChild(li);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  let localdata = JSON.parse(localStorage.getItem("data"));

  for (i = 0; i < localdata.length; i += 1) {
    element.append(convertToDiscussion(localdata[i]));
  }
  return;
};

const ul = document.querySelector("ul.discussions__container");
render(ul);

//2. 폼 제출 시 데이터 출력
const $form = document.querySelector(".form");
$form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formdata = new FormData($form); // 폼 데이터 가져오기

  const name = formdata.get("name"); //get 메서드로 value 값 가져오기
  const title = formdata.get("title");

  const newdata = {
    author: name,
    title: title,
  };

  let localdata = JSON.parse(localStorage.getItem("data")); //로컬 데이터 가져오기
  localdata.unshift(newdata); //가져온 로컬 데이터에 새로운 데이터 추가해주기 (currentdata는 배열형태)
  localStorage.setItem("data", JSON.stringify(localdata)); //추가된 로컬데이터 다시 등록해주기

  ul.prepend(convertToDiscussion(localdata[0])); //추가된 데이터 렌더해주기

  document.querySelector("#title").value = "";
  document.querySelector("#name").value = "";
});

// 3. x버튼 누르면 지워지게
//문제: delete 먼저 잡고 추가하면 추가된 delete 버튼 인식 못함. > document에 이벤트 리스너 달고 클래스명 포함되어 있을때만 찾기
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("discussion__btn")) {
    let localdata = JSON.parse(localStorage.getItem("data"));
    let target = e.target;
    const targetlist = target.parentElement;
    const childarr = Array.from(ul.children);
    const index = childarr.indexOf(targetlist); //클릭한 버튼의 리스트가 몇번째 인덱스인지 찾기

    localdata.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(localdata)); //로컬에 데이터 삭제

    console.log(index);

    target.parentElement.remove();
  }
});

// 마우스 따라다니는 원

// 원을 가리키는 변수
const circle = document.querySelector(".circle");

// 마우스 이벤트 처리
document.addEventListener("mousemove", (e) => {
  // 스크롤 위치 고려하기
  const scrollX = window.scrollX;
  const scrollY = window.scrollY;
  const mouseX = e.pageX - scrollX;
  const mouseY = e.pageY - scrollY;

  // 원 위치 설정
  circle.style.left = mouseX + "px";
  circle.style.top = mouseY + "px";
});
