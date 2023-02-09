// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
let agoraStatesDiscussions = []
const check_Mark = "☑";
const uncheck_Mark = "☒";
//----------------시간세팅------------------------------/
function printKorDate() {
  const today = new Date();
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const dayName = today.toLocaleDateString('ko-KR', {
    weekday: 'long',
  });
   //----------------시간세팅------------------------------/
  return `${dateString} ${dayName}`;
}

fetch("http://localhost:4000/discussions/")
  .then(response => response.json())
  .then(json => {
       agoraStatesDiscussions = json;
       console.log(agoraStatesDiscussions)
    const ul = document.querySelector("ul.discussions__container"); 
    render(ul); 
  })

 

  

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  //<div class="discussion__avatar--wrapper"></div>

  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  //<div class="discussion__answered"></div>

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  const photo = document.createElement('img');
  photo.src = obj.avatarUrl;
  photo.className = "discussion__avatar--image"
  photo.alt = "avatar of" + obj.author;
  avatarWrapper.append(photo);
/*-----------------------------------프로필사진-------------------------------------*/
 const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  //<div class="discussion__content"></div>
  const discussionTitle = document.createElement("h2");
  const titlelink = document.createElement('a');
  titlelink.href = obj.url
  titlelink.textContent = obj.title;
  discussionTitle.append(titlelink);
  discussionContent.append(discussionTitle);
/*-----------------------------------제목-------------------------------------*/
  const discussionInfo = document.createElement("div");
  discussionInfo.textContent = `${obj.author} /  ${new Date(obj.createdAt).toLocaleTimeString()}`
  discussionContent.append(discussionTitle, discussionInfo);
/*-----------------------------------날짜/글쓴이-------------------------------------*/
  const checked = document.createElement('p');
  checked.textContent = obj.answer ? check_Mark : uncheck_Mark ;
  discussionAnswered.append(checked);
  /*-----------------------------------체크박스-------------------------------------*/

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


//---------------------------새로운 디스커션 만들어주는 공장.-------------------------//
function InputInform(name,title,bodyHTML) {
  this.id = agoraStatesDiscussions[0].id +1;
  this.author = name;
  this.createdAt = new Date().toLocaleDateString();
  this.url = "https://github.com/parksubeom?tab=repositories"
  this.title = title;
  this.bodyHTML = bodyHTML;
  this.avatarUrl = "https://avatars.githubusercontent.com/u/104641096?v=4"
}
//--------------------------서브밋버튼 이벤트 시작---------------------------//
const submitBtn = document.querySelector('#button')
submitBtn.addEventListener("click", (event) => { // 서브밋버튼 이벤트 발생 시 동작.
  console.log('이벤트시작')
  //------------------------각 인풋박스 변수에 할당해주기-------------------//
  const newuser = document.querySelector("#username")
  const newtitle = document.querySelector("#titlename")
  const newtext = document.querySelector("#story")

//------------------Post로 넘겨 줄 새로운 discussion newObj로 포장하기-----------//
  const newObj = new InputInform(newuser.value,newtitle.value,newtext.value); // new Obj는 새로 작성된 게시물
//--------------------게시물 작성하고나면 input박스 청소해주기 ~ ---------------//
  newuser.value = null
  newtitle.value = null
  newtext.value = null
//------------------------서버로 POST요청 보내는 메서드---------------------------//
  fetch("http://localhost:4000/discussions/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newObj)
  })
  .then(response => response.json())
  .then((data) => {
    agoraStatesDiscussions = data;
    const ul = document.querySelector("ul.discussions__container"); 
    render(ul); 
  })
})
//------------------------------------------------------------------//


