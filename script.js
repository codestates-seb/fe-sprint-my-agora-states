// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "container_Box"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); //div 요소 생성
  avatarWrapper.className = "user_image"; // 프로필 사진

  const discussionContent = document.createElement("div"); //div 요소 생성
  discussionContent.className = "user_newDate"; // 제목 및 시간

  const discussionAnswered = document.createElement("div"); //div 요소 생성
  discussionAnswered.className = "discussion__answered"; // 체크박스

  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img'); //  이미지 삽입
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg); 


  const contentTitle = document.createElement('h4'); // 타이틀 삽입
  contentTitle.className = "discussion__title";
  discussionContent.append(contentTitle);


  const contentLink = document.createElement('a'); // 하이퍼링크 삽입
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  contentTitle.append(contentLink);


  const contentInformation = document.createElement('div'); // 닉네임,시간
  contentInformation.className = "discussion__information";
  contentInformation.textContent = `${obj.author} / ${new Date(obj.createdAt).toLocaleTimeString()}`;
  discussionContent.append(contentInformation);
// 시간을 표현할떄 .toLocaleTimeString() 메서드를 사용하여 간단한 시간만 표기하도록 수정.

  const contentAnswered = document.createElement('p'); // 답변 체크박스
  contentAnswered.className = "discussion__answered";
  discussionAnswered.append(contentAnswered);
  if( obj.answer === null ){
    contentAnswered.textContent = "❌";
  }else{
    contentAnswered.textContent = "✔";
  }




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

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);





const submitBtn = document.querySelector("#btn")

submitBtn.onclick = function() {

const newName = document.querySelector("#username")
const newTitel = document.querySelector("#titlename")
const newTextBox = document.querySelector("#story")

const newObj = {
  id: "new id",
  createdAt: new Date().toLocaleTimeString(),
  title: newTitel.value,
  url: "https://github.com/codestates-seb/agora-states-fe/discussions",
  author: newName.value,
  bodyHTML: newTextBox.value,
  avatarUrl: "https://avatars.githubusercontent.com/u/119921683?s=400&u=0c17e8eebe2418b610d6a3e4154a254088dd67a7&v=4",
}

agoraStatesDiscussions.unshift(newObj);

const discussion = convertToDiscussion(newObj);

ul.prepend(discussion); //.prepend()는 선택한 요소의 내용의 앞에 콘텐트를 추가합니다.

newName.value ="";
newTitel.value ="";
newTextBox.value ="";


}

