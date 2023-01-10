// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.

const check_Mark = "☑";
const uncheck_Mark = "☒";

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
// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);

//------------------------------------------------------------------//
function InputInform(name,title,story) {
  this.id = name;
  this.author = name;
  this.createdAt = new Date().toLocaleDateString();
  this.title = title;
  this.story = story;
  this.avatarUrl = "https://avatars.githubusercontent.com/u/104641096?v=4"
}
const submitBtn = document.querySelector('.form')

submitBtn.addEventListener("submit", (event) => {
event.preventDefault();

const newuser = document.querySelector("#username");
const newtitle = document.querySelector("#titlename");
const newtext = document.querySelector("#story");

const newObj = new InputInform(newuser.value,newtitle.value,newtext.value);
agoraStatesDiscussions.unshift(newObj);
newuser.value = null
newtitle.value = null
newtext.value = null

const discussion = convertToDiscussion(agoraStatesDiscussions[0]);
ul.prepend(discussion);
})
//------------------------------------------------------------------//


