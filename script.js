// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("img");
  avatarWrapper.className = "discussion__avatar--wrapper";
  avatarWrapper.src = obj.avatarUrl;

  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";

  const avatarInf = document.createElement("div");
  avatarInf.className = "avatar_information";

  const avatarName = document.createElement("div");
  avatarName.textContent = obj.author;
  const avatarQuestion = document.createElement("a");
  avatarQuestion.textContent = obj.title;
  avatarQuestion.href = obj.url;

  const avatarTime = document.createElement("div");
  avatarTime.textContent =Math.floor((Date.now()-Date.parse(obj.createdAt))/86400000)+"일전";

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";



  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  avatarInf.append(avatarName,avatarTime)
  discussionContent.append(avatarInf,avatarQuestion)


  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};



// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 1; i <= agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i-1]));
  }
  return;
};

// 작업표시줄 클릭
let program = document.querySelector(".agora");
let blank = document.getElementById("blank");
let main = document.querySelector("main");

program.addEventListener("click", function(params) {
  let main = document.querySelector("main");
  if(main.classList.length === 0){
    program.classList.add("agora-active");
    main.classList.add("hide");
    blank.classList.remove("hide");
  }else{
    program.classList.remove("agora-active");
    main.classList.remove("hide");
    blank.classList.add("hide");

  }
});

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);


// 현재 시간 표시
function nowTime() {
  let nowTimeH = new Date().getHours();
  let nowTimeM = new Date().getMinutes();
  let daynight = "";
  if (nowTimeH > 13) {
    daynight = "PM";
    nowTimeH -= 12;
  } else if (nowTimeH > 12) {
    daynight = "PM";
  } else {
    daynight = "AM";
  }
  function numbersize(timeNumber) {
    if (timeNumber < 10) {
      return "0" + timeNumber;
    } else {
      return timeNumber;
    }
  }
  const time = document.getElementById("time");
  time.textContent = `${numbersize(nowTimeH)}:${numbersize(nowTimeM)} ${daynight}`;
  let update = setTimeout(nowTime, 1000);
}


// 글쓰기 기능
const writingBtn = document.getElementById("btn");
writingBtn.addEventListener("click", function(params) {
  const li = document.createElement("li"); // li 요소 생성

  event.preventDefault();
  let dataNow = new Date();
  let dataNowUTC = dataNow.toUTCString()
  console.log(dataNow);
  let writing = document.forms["writing"];
  let name1 = writing["name"].value;
  let title1 = writing["title"].value;
  let story1 = writing["story"].value;
  let add = {
    bodyHTML: "",
    answer: {
        bodyHTML: "",
        id: "",
        createdAt: "",
        url: "",
        author: "",
        avatarUrl: "",
    },
    id: "",
    createdAt: dataNowUTC,
    title: title1,
    url: story1,
    author: name1,
    avatarUrl: "./pngwing.com.png",
  }
  ul.prepend(convertToDiscussion(add));

  writing["name"].textContent= "";
  writing["title"].textContent = "";
  writing["story"].textContent = "";
})
