// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  
  let template = `
    <div class="discussion__avatar--wrapper">
      <img class="discussion__avatar--image" src=${obj.avatarUrl}/>
    </div>
    <div class="discussion__content">
      <a href=${obj.url}>
        <h2 class="discussion__title">${obj.title}</h2>
      </a>
      <div class="discussion__information">
        <span>${obj.author}</span> ${obj.createdAt}
      </div>
    </div>
    <div class="discussion__answered">
      <label class="cb" onclick="check(this)">
        <span class="c1"> </span>
        <span class="c2"> </span>
      </label>
    </div>
  `;
  li.innerHTML = template;
  return li;
};

let start = 0;

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  element.innerHTML = "";
  for (let i = start; i < count(start); i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
    if (agoraStatesDiscussions[i].answer !== null) {
      const label = element.childNodes[i%10].childNodes[5].childNodes[1]
      const span1 = label.childNodes[1];
      const span2 = label.childNodes[3];

      label.style.borderColor = "#34b93d";
      span1.style.height = "24px";
      span1.style.animation = "topcheck 0.4s ease 0s forwards";
      span1.style.height = "10px";
      span2.style.animation = "bottomcheck 0.2s ease 0s forwards";
    }
  }
  return;
};

function count(len) {
  if (len + 10 > agoraStatesDiscussions.length) {
    return agoraStatesDiscussions.length;
  } else {
    return len + 10;
  }
}

function check(e) {
  console.log(e.childNodes);
  e.style.borderColor = "#34b93d";
  e.childNodes[1].style.height = "24px";
  e.childNodes[1].style.animation = "topcheck 0.4s ease 0s forwards";
  e.childNodes[3].style.height = "10px";
  e.childNodes[3].style.animation = "bottomcheck 0.2s ease 0s forwards";
  return false;
}

function liSubmit() {
  const title = document.getElementById("title");
  const name = document.getElementById("name");
  const story = document.getElementById("story");
  let arr = JSON.parse(localStorage.getItem("list"));

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();
  let date = today.getDate();
  let hours = String(today.getHours()).padStart(2, "0");
  let minutes = String(today.getMinutes()).padStart(2, "0");
  let seconds = String(today.getSeconds()).padStart(2, "0");

  if (arr === null) {
    //처음 시작시
    arr = [];
    localStorage.setItem("count", 0);
  }

  if (title.value !== "" && name.value !== "" && story.value !== "") {
    arr.push({
      avatarUrl: iconLink,
      title: title.value,
      author: name.value,
      story: story.value,
      answer: null,
      createdAt:
        year +
        "년" +
        month +
        "월" +
        date +
        "일 " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
    });
    let change = JSON.stringify(arr);
    localStorage.setItem("list", change);
    let count = localStorage.getItem("count");
    count++;
    localStorage.setItem("count", count);

    agoraStatesDiscussions.unshift(
      JSON.parse(localStorage.getItem("list"))[count - 1]
    );
    render(ul);
    title.value = ''
    name.value = ''
    story.value = ''
  }
}

const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");
const icon = document.querySelector('.form__icon');

icon.innerHTML= "<img src='https://picsum.photos/id/0/80/80'>"
let iconLink = "https://picsum.photos/id/0/80/80";
let iconId = 0;

icon.addEventListener('click', function(){
  iconId = Math.floor(Math.random() * 1084);
  while(iconId === 1030){
    iconId = Math.floor(Math.random() * 1084);
  }
  iconLink = `https://picsum.photos/id/${iconId}/80/80`;
  icon.innerHTML=`<img src=https://picsum.photos/id/${iconId}/80/80>`;
});

leftArrow.addEventListener("click", function () {
  if (start !== 0) {
    start = start - 10;
  }
  render(ul);
});

rightArrow.addEventListener("click", function () {
  if (start + 10 < agoraStatesDiscussions.length) {
    start = start + 10;
  }
  render(ul);
});

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
if (JSON.parse(localStorage.getItem("list")) !== null) {
  for (let i = 0; i < JSON.parse(localStorage.getItem("list")).length; i++) {
    agoraStatesDiscussions.unshift(JSON.parse(localStorage.getItem("list"))[i]);
  }
}

render(ul);