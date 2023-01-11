// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "container_Box"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div"); //div 요소 생성
  avatarWrapper.className = "user_image"; // 프로필 사진 div

  const discussionContent = document.createElement("div"); //div 요소 생성
  discussionContent.className = "user_text"; //텍스트컨텐츠 div

  const discussionAnswered = document.createElement("div"); //div 요소 생성
  discussionAnswered.className = "user_newDate"; // 날짜 및 시간 div
  discussionAnswered.textContent = `${new Date(obj.createdAt).toLocaleTimeString()}`;



  
  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const avatarImg = document.createElement('img'); //  이미지 삽입
  avatarImg.className = "discussion__avatar--image"
  avatarImg.src = obj.avatarUrl;
  avatarImg.alt = 'avatar of ' + obj.author;
  avatarWrapper.append(avatarImg); 

  const contentuserNmae = document.createElement('div'); // 닉네임 삽입
  contentuserNmae.className = "user_Name";
  contentuserNmae.textContent = obj.author;
  discussionContent.append(contentuserNmae);

  const checkBox = document.createElement('div'); // 체크박스 삽입
  checkBox.className = "checkBox";
  discussionContent.append(checkBox);


  const contentLink = document.createElement('div'); // 텍스트 타이틀 삽입
  contentLink.className = "titleText";
  contentLink.href = obj.url;
  contentLink.textContent = obj.title;
  discussionContent.append(contentLink);




  if( obj.answer !== null ){
    checkBox.textContent = "답변완료";
  }else{
    checkBox.textContent = "미응답";
    checkBox.style.backgroundColor = "#cecece";
    checkBox.style.border = "1px solid #b3b3b3"
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
submitBtn.classList.remove('btnX') 
submitBtn.onclick = function() {

const newName = document.querySelector("#username")
const newTitel = document.querySelector("#titlename")
const newTextBox = document.querySelector("#story")

const newObj = {
  id: "new id",
  createdAt: new Date(),
  title: newTitel.value,
  url: "https://github.com/codestates-seb/agora-states-fe/discussions",
  author: newName.value,
  bodyHTML: newTextBox.value,
  avatarUrl: "https://avatars.githubusercontent.com/u/119921683?s=400&u=0c17e8eebe2418b610d6a3e4154a254088dd67a7&v=4",
}

agoraStatesDiscussions.unshift(newObj);

const discussion = convertToDiscussion(newObj);


if(newName.value.length === 0 && newTitel.value.length ===0 && newTextBox.value.length === 0){
  submitBtn.classList.toggle('btnX') 
 
} else {
  ul.prepend(discussion); //.prepend()는 선택한 요소의 내용의 앞에 콘텐트를 추가합니다.

  newName.value ="";
  newTitel.value ="";
  newTextBox.value ="";
  submitBtn.classList.remove('btnX') 
}

}

