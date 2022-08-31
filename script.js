// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__upper--wrapper";
    
  //avatarWrapper에 프로필 사진 넣기
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__upper--image";
  avatarImage.setAttribute("src", obj.avatarUrl)
  avatarImage.setAttribute("alt", `avatar of ${obj.author}`);
  
  avatarWrapper.append(avatarImage);
  
  //avatarWrapper에 프로필 텍스트 감싸는거 넣기
  const profileText = document.createElement("span");
  profileText.className = "discussion__upper--profile";
  //profileText에 사용자 닉네임 넣기
  const profileAuthor = document.createElement("div");
  profileAuthor.className = "discussion__upper--profile--author";
  profileAuthor.innerText = String(obj.author);
  profileText.append(profileAuthor);
  //profileText에 작성 시간 넣기
  const profileWrittenTime = document.createElement("div");
  profileWrittenTime.className = "discussion__upper--profile--writtentime";
  const timeText = `${obj.createdAt.slice(5,7)}.${obj.createdAt.slice(8,10)} ${obj.createdAt.slice(11,19)}`;
  profileWrittenTime.innerText = String(timeText);
  profileText.append(profileWrittenTime);
  //profileText avatarWrapper에 넣기
  avatarWrapper.append(profileText);
  
  //avatarWrapper에 answersheet 넣기
  const profileAnswer = document.createElement("span");
  profileAnswer.className = "discussion__upper--answersheet";
  //profileAnswer에 답변됨 박스 넣기
  const answered = document.createElement("div");
  answered.className = "discussion__upper--answersheet-answered";
  //answered에 초록 체크 넣기
  const checkbox = document.createElement("div");
  answered.append(checkbox);
  
  const notanswered = document.createElement("div");
  notanswered.className = "discussion__upper--answersheet-notanswered";
  //notanswered에 빨강 엑스 넣기
  const xbox = document.createElement("div");
  notanswered.append(xbox);
  
  //안보이게 할 박스 정하기
  obj.answer === null ? xbox.innerText = "❎" : checkbox.innerText = "✅";
  profileAnswer.append(answered);
  profileAnswer.append(notanswered);
  
  avatarWrapper.append(profileAnswer);
  


  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  

  const discussionLink = document.createElement("h2");
  discussionLink.className = "discussion__title";
    const discussionLinkText = document.createElement("a");
    discussionLinkText.setAttribute("href", obj.url);
    discussionLinkText.setAttribute("target", "_blank");
    discussionLinkText.className = "discussion__title--text";
    discussionLinkText.innerText = obj.title;
    discussionLink.append(discussionLinkText);


  const discussionWantedbox = document.createElement("div");
  discussionWantedbox.className = "discussion__wantedbox";
    const discussionWantedboxText = document.createElement("div")
    discussionWantedboxText.className = "discussion__wantedbox--text";
    discussionWantedboxText.innerText = "궁금해요!"
    discussionWantedbox.append(discussionWantedboxText);

    const discussionWantedButton = document.createElement("button");
    discussionWantedButton.className = "discussion__wantedbox--button";
    discussionWantedButton.innerText = "0"
    discussionWantedbox.append(discussionWantedButton);


  discussionContent.append(discussionLink);
  discussionContent.append(discussionWantedbox);
  

  li.append(avatarWrapper, discussionContent);
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

// submit을 누르면 id, 지금시간, 제목을 ul 밑에 li로 추가함
const form = document.querySelector("form.form");
const inputID = document.querySelector("#name");
const inputTitle = document.querySelector("#title");
const inputText = document.querySelector("#story");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  //시간 만들기
  const nowATimes = new Date();
  const year = nowATimes.getFullYear();
  const month = ('0' + (nowATimes.getMonth() + 1)).slice(-2);
  const day = ('0' + (nowATimes.getDate() + 1)).slice(-2);
  const hours = ('0' + nowATimes.getHours()).slice(-2);
  const minutes = ('0' + nowATimes.getMinutes()).slice(-2);
  const seconds = ('0' + nowATimes.getSeconds()).slice(-2);
  const inputCreatedAt = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;


  const obj = {
    id: "unique ID",
    createdAt: inputCreatedAt,
    title: inputTitle.value,
    url: "",
    author: inputID.value,
    answer: null,
    bodyHTML: inputText.value,
    avatarUrl:
      "https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1586271210/noticon/sageach1qrmmyfufwli1.gif",
  
  }
  agoraStatesDiscussions.unshift(obj);
  console.log(agoraStatesDiscussions)
  const newDiscussion = convertToDiscussion(obj);
  ul.prepend(newDiscussion);

  inputID.value ="";
  inputTitle.value = "";
  inputText.value = "";
})


//궁금해요 버튼 클릭 시 숫자 올라가게 만들기
const wantedButton = document.querySelectorAll(".discussion__wantedbox--button");

const plusCounter = (e) => {
  const currentNum = parseInt(e.target.innerText, 10);
  e.target.innerText = currentNum + 1;
}

for (const button of wantedButton) {
  button.addEventListener("click", plusCounter);
}
// 반복문을 사용해 querySelectorAll에 addEventListener 적용하는 법